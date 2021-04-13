;;; emacspeak/maillog.el --- Speech friendly interface to /var/log/maillog  -*- lexical-binding: t; -*-
;;;$Id$
;;; $Author$
;;; Description:  Emacspeak extension to speech enable maillog
;;; Keywords: forms
;;{{{  LCD Archive entry:

;;; LCD Archive Entry:
;;; emacspeak| T. V. Raman |raman@cs.cornell.edu
;;; A speech interface to Emacs |
;;; $Date$ |
;;;  $Revision$ |
;;; Location undetermined
;;;

;;}}}
;;{{{  Copyright:
;;;Copyright (C) 1995, 1996, 1997, 1998   T. V. Raman  
;;; Copyright (c) 1994, 1995 by Digital Equipment Corporation.
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
;;{{{  setup forms

(setq forms-read-only t)

(setq forms-file
      (read-file-name  "maillog  file: "
                       "/var/log/"
                       "/var/log/maillog"))



(setq forms-number-of-fields 9)
(setq forms-read-only nil)
(setq forms-field-sep
      ",")
(setq forms-format-list
      (list
       "Message: "2
       "\n"
       "Date: "1 "\n"
3 "\n"
4 "\n"
5 "\n"
6 "\n"
7 "\n"
8 "\n"
9 "\n"
))

;;}}}
;;{{{ end of file

;;; local variables:
;;; folded-file: t
;;; end:

;;}}}
