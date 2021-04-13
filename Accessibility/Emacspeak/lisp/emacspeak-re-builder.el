;;; emacspeak-re-builder.el --- speech-enable re-builder  -*- lexical-binding: t; -*-
;;; $Id$
;;; $Author: tv.raman.tv $
;;; Description:   extension to speech enable re-builder
;;; Keywords: Emacspeak, Audio Desktop
;;{{{  LCD Archive entry:

;;; LCD Archive Entry:
;;; emacspeak| T. V. Raman |raman@cs.cornell.edu
;;; A speech interface to Emacs |
;;; $Date: 2007-08-25 18:28:19 -0700 (Sat, 25 Aug 2007) $ |
;;;  $Revision: 4532 $ |
;;; Location undetermined
;;;

;;}}}
;;{{{  Copyright:

;;; Copyright (C) 1995 -- 2018, T. V. Raman<raman@cs.cornell.edu>
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
;;{{{ Introduction

;;; Commentary: 

;;; Speech-enable re-builder.
;;; Will be used to advantage in efficiently setting up outline
;;; regexp wizards

;;}}}

;;{{{ required modules
;;; Code:

(cl-declaim  (optimize  (safety 0) (speed 3)))
(require 'emacspeak-preamble)

;;}}}
;;{{{ Map faces to personalities 
(voice-setup-add-map
 '(
   (reb-match-0 voice-lock-overlay-0)
   (reb-match-1 voice-lock-overlay-1)
   (reb-match-2 voice-lock-overlay-2)
   (reb-match-3 voice-lock-overlay-3)
   ))
;;}}}
;;{{{ Speech-enable interactive commands.

(defadvice  re-builder (after emacspeak pre act comp)
  "Speak status information."
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'open-object)
    (emacspeak-speak-line)))

(defadvice reb-quit (after emacspeak pre act comp)
  "Provide auditory feedback."
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'close-object)))

(defadvice reb-next-match (after emacspeak pre act comp)
  "Speak matched line."
  (when (ems-interactive-p)
    (let ((emacspeak-show-point t))
      (save-excursion
        (set-buffer reb-target-buffer)
        (emacspeak-speak-line)
        (emacspeak-auditory-icon 'large-movement)))))

(defadvice reb-prev-match (after emacspeak pre act comp)
  "Speak matched line."
  (when (ems-interactive-p)
    (let ((emacspeak-show-point t))
      (save-excursion
        (set-buffer reb-target-buffer)
        (emacspeak-speak-line)
        (emacspeak-auditory-icon 'large-movement)))))

(defadvice reb-toggle-case (after emacspeak pre act comp)
  "Provide spoken feedback."
  (when (ems-interactive-p)
    (save-excursion
      (set-buffer reb-target-buffer)
      (emacspeak-auditory-icon (if case-fold-search 'on 'off)))))

(defadvice reb-copy (after emacspeak pre act comp)
  "Provide auditory feedback."
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'yank-object)))

(defadvice reb-enter-subexp-mode (after emacspeak pre act comp)
  "Provide auditory feedback."
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'open-object)))

(defadvice reb-quit-subexp-mode (after emacspeak pre act comp)
  "Provide auditory feedback."
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'close-object)))

(defadvice reb-auto-update (after emacspeak pre act comp)
  "Provide spoken feedback after update is done."
  (when (buffer-live-p reb-target-buffer)
    (with-current-buffer reb-target-buffer
      (with-silent-modifications
        (mapc #'(lambda (o) (overlay-put o 'auditory-icon 'item))  reb-overlays))))
  (emacspeak-speak-message-again))

;;}}}
(provide 'emacspeak-re-builder)
;;{{{ end of file

;;; local variables:
;;; folded-file: t
;;; end:

;;}}}
