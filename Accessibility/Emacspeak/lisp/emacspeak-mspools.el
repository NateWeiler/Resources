;;; emacspeak-mspools.el --- Speech enable MSpools -- Monitor multiple mail drops  -*- lexical-binding: t; -*-
;;; $Id$
;;; $Author: tv.raman.tv $ 
;;; Description: Auditory interface to mail spool tracker
;;; Keywords: Emacspeak, Speak, Spoken Output, mspools
;;{{{  LCD Archive entry: 

;;; LCD Archive Entry:
;;; emacspeak| T. V. Raman |raman@cs.cornell.edu 
;;; A speech interface to Emacs |
;;; $Date: 2008-06-21 10:50:41 -0700 (Sat, 21 Jun 2008) $ |
;;;  $Revision: 4532 $ | 
;;; Location undetermined
;;;

;;}}}
;;{{{  Copyright:

;;; Copyright (c) 1995 -- 2018, T. V. Raman
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

;;{{{  Required modules

(cl-declaim  (optimize  (safety 0) (speed 3)))
(require 'emacspeak-preamble)
;;}}}
;;{{{  Introduction
;;; Commentary:
;;; Speech-enable  mspools --a package that lets you monitor
;;; multiple maildrops
;;; Code:
;;}}}
;;{{{ advice

(defadvice mspools-show (after emacspeak pre act comp)
  "Provide auditory feedback"
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'open-object)
    (emacspeak-speak-mode-line)))
(defadvice mspools-quit (after emacspeak pre act comp)
  "Provide auditory feedback"
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'close-object)
    (emacspeak-speak-mode-line)))

(defadvice mspools-revert-buffer (after emacspeak pre act comp)
  "Provide auditory feedback"
  (emacspeak-auditory-icon 'select-object)
  (emacspeak-speak-line))
;;}}}
;;{{{Smarter Spool-Size:
;;; Smarter sppol-size compute functions.
;;; These show the number of messages in a spool.

(defun mspools-compute-size (file)
  (let ((message-log-max nil)
        (inhibit-message t)
        (emacspeak-speak-messages nil)))
  (read (shell-command-to-string (format "grep '^From ' %s | wc -l" file))))

(defun mspools-size-folder (spool)
  "Return (SPOOL . SIZE ) iff SIZE of spool file is non-zero."
  (cl-declare (special mspools-folder-directory))
  (let ((size (mspools-compute-size (expand-file-name  spool mspools-folder-directory))))
    (unless (zerop size) (cons spool size))))

;;}}}
;;{{{ keymaps
(cl-declaim (special mspools-mode-map))
(cl-eval-when (load)
  (require 'emacspeak-keymap)
  )

;;}}}
(provide 'emacspeak-mspools)

;;{{{ end of file 

;;; local variables:
;;; folded-file: t
;;; end: 

;;}}}
