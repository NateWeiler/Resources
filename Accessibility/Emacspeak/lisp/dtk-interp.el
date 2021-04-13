;;; dtk-interp.el --- Language specific (e.g. TCL) interface to speech server  -*- lexical-binding: t; -*- 
;;; $Id$
;;; $Author: tv.raman.tv $
;;; Description:  Interfacing to the speech server
;;; Keywords: TTS, Dectalk, Speech Server
;;{{{  LCD Archive entry:

;;; LCD Archive Entry:
;;; emacspeak| T. V. Raman |raman@cs.cornell.edu
;;; A speech interface to Emacs |
;;; $Date: 2008-03-11 18:41:19 -0700 (Tue, 11 Mar 2008) $ |
;;;  $Revision: 4670 $ |
;;; Location undetermined
;;;

;;}}}
;;{{{  Copyright:

;;;Copyright (C) 1995 -- 2018, T. V. Raman
;;; All Rights Reserved.
;;;
;;; This file is not part of GNU Emacs, but the same permissions apply.
;;;
;;; GNU Emacs is free software; you can redistribute it and/or modify
;;; it under the terms of the GNU General Public License as published by
;;; the Free Software Foundation; either version 2, or (at your option)
;;; any later version.
;;;
;;; GNU Emacs is distributed in the hope that it will be useful,
;;; but WITHOUT ANY WARRANTY; without even the implied warranty of
;;; MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
;;; GNU General Public License for more details.
;;;
;;; You should have received a copy of the GNU General Public License
;;; along with GNU Emacs; see the file COPYING.  If not, write to
;;; the Free Software Foundation, 675 Mass Ave, Cambridge, MA 02139, USA.

;;}}}
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;;{{{ introduction
;;; Commentary:
;;; All requests to the speech server are factored out into
;;; this module.
;;; These calls are declared here as defun so they are
;;; inlined by the byte compiler.
;;; This  keeps the code efficient,
;;; but gives us the flexibility to call out to different
;;; speech servers.

;;; Code:
;;}}}
;;{{{ requires

(require 'cl-lib)

(cl-declaim  (optimize  (safety 0) (speed 3)))

;;}}}
;;{{{ Forward declarations:
;;; From dtk-speak.el

(defvar dtk-speaker-process)
(defvar dtk-punctuation-mode)
(defvar dtk-capitalize)
(defvar dtk-allcaps-beep)
(defvar dtk-split-caps)
(defvar dtk-speech-rate)

;;}}}
;;{{{ macros
(defmacro tts-with-voice (voice &rest body)
  "Set voice temporarily and execute body."
  (declare (indent 1) (debug t))
  `(progn
     (dtk-interp-queue-code (tts-voice-reset-code))
     (dtk-interp-queue-code
      (cond
       ((symbolp ,voice)
        (tts-get-voice-command
         (if (boundp ,voice)
             (symbol-value ,voice)
           ,voice)))
       ((listp ,voice)
        (mapconcat #'(lambda (v)
                       (tts-get-voice-command
                        (if (boundp v)
                            (symbol-value v)
                          v)))
                   ,voice
                   " "))
       (t "")))
     ,@body
     (dtk-interp-queue-code (tts-voice-reset-code))))  

(defmacro tts-with-punctuations (setting &rest body)
  "Safely set punctuation mode for duration of body form."
  (declare (indent 1) (debug t))
  `(let ((save-punctuation-mode dtk-punctuation-mode))
     (unwind-protect
         (unless (eq ,setting save-punctuation-mode)
           (dtk-interp-set-punctuations ,setting)
           (setq dtk-punctuation-mode ,setting))
       ,@body
       (unless (eq ,setting save-punctuation-mode)
         (setq dtk-punctuation-mode save-punctuation-mode)
         (dtk-interp-set-punctuations ,setting)))))

;;}}}
;;{{{ silence

(defun dtk-interp-silence (duration force)
  (cl-declare (special dtk-speaker-process))
  (process-send-string dtk-speaker-process
                       (format "sh %d%s\n"
                               duration
                               (if force "\nd" ""))))

;;}}}
;;{{{  tone

(defun dtk-interp-tone (pitch duration &optional force)
  (cl-declare (special dtk-speaker-process))
  (process-send-string dtk-speaker-process
                       (format "t %d %d%s\n"
                               pitch duration
                               (if force "\nd" ""))))
;;}}}
;;{{{  queue

(defun dtk-interp-queue (text)
  (cl-declare (special dtk-speaker-process))
  (unless (string-match "^[\s]+$" text)
    (process-send-string dtk-speaker-process (format "q {%s }\n" text))))

(defun dtk-interp-queue-code (code)
  (cl-declare (special dtk-speaker-process))
  (process-send-string dtk-speaker-process
                       (format "c {%s }\n" code)))

(defun dtk-interp-queue-set-rate (rate)
  (cl-declare (special dtk-speaker-process))
  (process-send-string dtk-speaker-process
                       (format "r {%s}\n" rate)))

;;}}}
;;{{{  speak

(defun dtk-interp-speak ()
  (cl-declare (special dtk-speaker-process))
  (process-send-string dtk-speaker-process "d\n"))

;;}}}
;;{{{ say

(defun dtk-interp-say (string)
  (cl-declare (special dtk-speaker-process))
  (process-send-string dtk-speaker-process (format "tts_say { %s}\n" string)))

;;}}}

;;{{{ stop

(defun dtk-interp-stop ()
  (cl-declare (special dtk-speaker-process))
  (process-send-string dtk-speaker-process "s\n"))

;;}}}
;;{{{ sync

(defun dtk-interp-sync ()
  (cl-declare (special dtk-speaker-process
                       dtk-punctuation-mode dtk-speech-rate
                       dtk-capitalize dtk-split-caps
                       dtk-allcaps-beep))
  (process-send-string
   dtk-speaker-process
   (format "tts_sync_state %s %s %s %s %s\n"
           dtk-punctuation-mode
           (if dtk-capitalize 1 0)
           (if dtk-allcaps-beep 1 0)
           (if dtk-split-caps 1 0)
           dtk-speech-rate)))

;;}}}
;;{{{  letter

(defun dtk-interp-letter (letter)
  (cl-declare (special dtk-speaker-process))
  (process-send-string dtk-speaker-process
                       (format "l {%s}\n" letter)))

;;}}}
;;{{{  language

(defun dtk-interp-next-language (&optional say_it)
  (cl-declare (special dtk-speaker-process))
  (process-send-string dtk-speaker-process
                       (format "set_next_lang %s\n" say_it)))

(defun dtk-interp-previous-language (&optional say_it)
  (cl-declare (special dtk-speaker-process))
  (process-send-string dtk-speaker-process
                       (format "set_previous_lang %s\n" say_it)))

(defun dtk-interp-language (language say_it)
  (cl-declare (special dtk-speaker-process))
  (process-send-string dtk-speaker-process
                       (format "set_lang %s %s \n" language say_it)))

(defun dtk-interp-preferred-language (alias language)
  (cl-declare (special dtk-speaker-process))
  (process-send-string dtk-speaker-process
                       (format "set_preferred_lang %s %s \n" alias language)))

(defun dtk-interp-list-language ()
  (cl-declare (special dtk-speaker-process))
  (process-send-string dtk-speaker-process
                       (format "list_lang\n")))

;;}}}
;;{{{  rate

(defun dtk-interp-say-version ()
  "Speak version."
  (cl-declare (special dtk-speaker-process))
  (process-send-string dtk-speaker-process "version\n"))

(defun dtk-interp-set-rate (rate)
  (cl-declare (special dtk-speaker-process))
  (process-send-string dtk-speaker-process
                       (format "tts_set_speech_rate %s\n"
                               rate)))

;;}}}
;;{{{ character scale

(defun dtk-interp-set-character-scale (factor)
  (cl-declare (special dtk-speaker-process))
  (process-send-string dtk-speaker-process
                       (format "tts_set_character_scale %s\n"
                               factor)))

;;}}}
;;{{{  split caps

(defun dtk-interp-toggle-split-caps (flag)
  (cl-declare (special dtk-speaker-process))
  (process-send-string dtk-speaker-process
                       (format "tts_split_caps %s\n"
                               (if flag 1 0))))

;;}}}
;;{{{ capitalization

(defun dtk-interp-toggle-capitalization (flag)
  (cl-declare (special dtk-speaker-process))
  (process-send-string dtk-speaker-process
                       (format "tts_capitalize  %s\n"
                               (if flag 1 0))))

;;}}}
;;{{{ allcaps beep

(defun dtk-interp-toggle-allcaps-beep (flag)
  (cl-declare (special dtk-speaker-process))
  (process-send-string dtk-speaker-process
                       (format "tts_allcaps_beep  %s\n"
                               (if flag 1 0))))

;;}}}
;;{{{ punctuations

(defun dtk-interp-set-punctuations (mode)
  (cl-declare (special dtk-speaker-process))
  (process-send-string
   dtk-speaker-process
   (format "tts_set_punctuations %s\nd\n" mode)))

;;}}}
;;{{{ reset

(defun dtk-interp-reset-state ()
  (cl-declare (special dtk-speaker-process))
  (process-send-string dtk-speaker-process "tts_reset \n"))

;;}}}
(provide 'dtk-interp)
;;{{{  local variables

;;; local variables:
;;; folded-file: t
;;; end:

;;}}}
