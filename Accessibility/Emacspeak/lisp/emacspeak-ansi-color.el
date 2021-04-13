;;; emacspeak-ansi-color.el --- Speech-enable ansi-color terminal  -*- lexical-binding: t; -*-
;;; $Id$
;;; $Author: tv.raman.tv $
;;; Description:  Emacspeak module for ansi-color
;;; Keywords: Emacspeak, ansi-color
;;{{{  LCD Archive entry:

;;; LCD Archive Entry:
;;; emacspeak| T. V. Raman |raman@cs.cornell.edu
;;; A speech interface to Emacs |
;;; $Date: 2007-12-09 17:51:46 -0800 (Sun, 09 Dec 2007) $ |
;;;  $Revision: 4502 $ |
;;; Location undetermined
;;;

;;}}}
;;{{{  Copyright:

;;; Copyright (C) 1995 -- 2018, T. V. Raman
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

;;{{{  Introduction:

;;; Commentary:

;;; Module ansi-color (bundled with Emacs 21)
;;; handles ansi escape sequences and turns them into
;;; appropriate faces.
;;;This is useful in things like shell buffers.
;;; This module maps ansi codes to the appropriate voices.

;;}}}
;;{{{ required modules

;;; Code:
(require 'cl-lib)
(cl-declaim  (optimize  (safety 0) (speed 3)))
(require 'emacspeak-preamble)
;;}}}
;;{{{ color to voice

(defun emacspeak-ansi-color-to-voice (face-spec)
  "Return a voice corresponding to specified face-spec."
  (cl-declare (special ansi-color-names-vector ansi-color-faces-vector))
  (condition-case nil
      (let* ((voice-name nil)
             (color (cdr (assq 'foreground-color  face-spec)))
             (color-index
              (when color
                (cl-position  color ansi-color-names-vector
                              :test #'string-equal)))
             (style nil)
             (color-parameter nil))
        (setq style (make-acss))
        (setq color-parameter
              (if color-index
                  (+ 1 color-index)
                1))
        (setf (acss-average-pitch style) color-parameter)
        (setf (acss-pitch-range style) color-parameter)
        (setf (acss-richness style) color-parameter)
        (setf (acss-stress style) color-parameter)
        (setq voice-name (acss-personality-from-speech-style  style))
        voice-name)
    (error nil)))

;;}}}
;;{{{ advice interactive commands

(defadvice ansi-color-for-comint-mode-on (after emacspeak
                                                pre act comp)
  "Provide auditory feedback."
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'on)
    (message "Ansi escape sequences will be processed.")))

(defadvice ansi-color-for-comint-mode-off (after emacspeak
                                                 pre act comp)
  "Provide auditory feedback."
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'off)
    (message "Ansi escape sequences will not be processed.")))

;;}}}
(provide 'emacspeak-ansi-color)
;;{{{ end of file

;;; local variables:
;;; folded-file: t
;;; end:

;;}}}
