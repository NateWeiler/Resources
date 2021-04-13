;;; emacspeak-ediary.el --- Speech-enable ediary  -*- lexical-binding: t; -*-
;;; $Id$
;;; $Author: tv.raman.tv $
;;; Description:  Emacspeak speech-enabler for ediary 
;;; Keywords: Emacspeak, diary
;;{{{  LCD Archive entry:

;;; LCD Archive Entry:
;;; emacspeak| T. V. Raman |raman@cs.cornell.edu
;;; A speech interface to Emacs |
;;; $Date: 2007-09-01 15:30:13 -0700 (Sat, 01 Sep 2007) $ |
;;;  $Revision: 4074 $ |
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
;;; ediary is a special mode for editing your.diary file.
;;; This module speech-enables ediary
;;; Code:
;;}}}
;;{{{ required modules

;;; Code:

(cl-declaim  (optimize  (safety 0) (speed 3)))
(require 'emacspeak-preamble)

;;}}}
;;{{{ advice interactive commands

(defvar emacspeak-ediary-commands-that-speak-entry
  '(
    ediary-entry-earlier      ediary-modify-entry
    ediary-time-block-longer        ediary-previous-entry       ediary-boe
    ediary-point-on-entry-date-p   ediary-next-entry   ediary-block-longer
    ediary-time-block-earlier     ediary-eoe     ediary-time-block-shorter
    ediary-time-earlier        ediary-block-later        ediary-kill-entry
    ediary-block-earlier      ediary-entry-later      ediary-block-shorter
    ediary-time-later     ediary-time-block-later)
  "Commands that should speak the entry when done.")

(cl-loop for f in emacspeak-ediary-commands-that-speak-entry
         do
         (eval
          `(defadvice ,f (after emacspeak pre act comp)
             "Speak the entry."
             (when (ems-interactive-p)
               (emacspeak-speak-line)
               (emacspeak-auditory-icon 'select-object)))))

;;}}}
(provide 'emacspeak-ediary)
;;{{{ end of file

;;; local variables:
;;; folded-file: t
;;; end:

;;}}}
