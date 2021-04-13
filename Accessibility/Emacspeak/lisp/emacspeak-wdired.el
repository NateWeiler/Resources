;;; emacspeak-wdired.el --- Speech-enable wdired  -*- lexical-binding: t; -*-
;;; $Id$
;;; $Author: tv.raman.tv $
;;; Description:  Emacspeak extension to speech-enable WDIRED
;;; Keywords: Emacspeak, Multimedia
;;{{{  LCD Archive entry:

;;; LCD Archive Entry:
;;; emacspeak| T. V. Raman |raman@cs.cornell.edu
;;; A speech interface to Emacs |
;;; $Date: 2007-08-25 18:28:19 -0700 (Sat, 25 Aug 2007) $ |
;;;  $Revision: 4074 $ |
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

;;{{{  Introduction

;;; Commentary:
;;; Speech-enable wdired to permit in-place renaming of groups of files.

;;}}}
;;{{{ required modules

(cl-declaim  (optimize  (safety 0) (speed 3)))
(require 'emacspeak-preamble)
(require 'emacspeak-dired)

;;}}}
;;{{{ Advice interactive commands.

(cl-loop for c in
         '(wdired-next-line wdired-previous-line)
         do
         (eval
          `(defadvice ,c (after emacspeak pre act comp)
             "Provide spoken feedback."
             (when (ems-interactive-p)
               (emacspeak-auditory-icon 'select-object)
               (emacspeak-dired-speak-line)))))

(defadvice wdired-upcase-word (after emacspeak pre act comp)
  "Provide spoken feedback."
  (when (ems-interactive-p)
    (tts-with-punctuations 'some
                           (dtk-speak "upper cased file name. "))))
(defadvice wdired-capitalize-word (after emacspeak pre act comp)
  "Provide spoken feedback."
  (when (ems-interactive-p)
    (tts-with-punctuations 'some
                           (dtk-speak "Capitalized file name. "))))
(defadvice wdired-downcase-word (after emacspeak pre act comp)
  "Provide spoken feedback."
  (when (ems-interactive-p)
    (tts-with-punctuations 'some
                           (dtk-speak "Down cased file
  name. "))))

(defadvice wdired-toggle-bit (after emacspeak pre act comp)
  "Provide spoken feedback."
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'button)
    (dtk-speak "Toggled permission bit.")))

(defadvice wdired-abort-changes (after emacspeak pre act comp)
  "Provide auditory feedback."
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'close-object)
    (tts-with-punctuations 'some
                           (dtk-speak "Cancelling  changes. "))))

(defadvice wdired-finish-edit (after emacspeak pre act comp)
  "Provide auditory feedback."
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'save-object)
    (tts-with-punctuations 'some
                           (dtk-speak "Committed changes. "))))

(defadvice wdired-change-to-wdired-mode (after emacspeak pre act
                                               comp)
  "Provide auditory feedback."
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'open-object)
    (tts-with-punctuations 'some
                           (dtk-speak "Entering writeable dir ed mode. "))))

;;}}}

(provide 'emacspeak-wdired)
;;{{{ end of file

;;; local variables:
;;; folded-file: t
;;; end:

;;}}}
