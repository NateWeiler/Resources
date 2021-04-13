;;; emacspeak-autoload.el --- Emacspeak Autoload Generator  -*- lexical-binding: t; -*-
;;; $Id$
;;; $Author: tv.raman.tv $
;;; Description:  autoload Wizard for the emacspeak desktop
;;; Keywords: Emacspeak,  Audio Desktop autoload
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
;;;Copyright (C) 1995 -- 2018, T. V. Raman
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

;;{{{  introduction

;;; generate autoloads for emacspeak

;;}}}
;;{{{  Required modules

(require 'cl-lib)
(require 'autoload)
(require 'cus-dep)
;;}}}
;;{{{ Variables

(cl-declaim (special emacspeak-lisp-directory))
(defvar emacspeak-auto-autoloads-file
  (expand-file-name "emacspeak-loaddefs.el" emacspeak-lisp-directory)
  "File that holds automatically generated autoloads for
Emacspeak.")

(defvar emacspeak-auto-custom-file
  (expand-file-name "cus-load.el" emacspeak-lisp-directory)
  "File that holds automatically generated custom dependencies for
Emacspeak.")

;;}}}
;;{{{ generate autoloads

(defun emacspeak-auto-generate-autoloads ()
  "Generate emacspeak autoloads."
  (cl-declare (special  emacspeak-auto-autoloads-file emacspeak-lisp-directory))
  (let ((dtk-quiet t)
        (generated-autoload-file emacspeak-auto-autoloads-file))
    (update-directory-autoloads emacspeak-lisp-directory)))

;;}}}
;;{{{ custom dependencies:

(defun emacspeak-auto-custom-make-dependencies ()
  "Generate emacspeak custom deps."
  (cl-declare (special  emacspeak-auto-custom-file))
  (let ((dtk-quiet t)
        (generated-custom-dependencies-file emacspeak-auto-custom-file))
    (custom-make-dependencies)))

;;}}}
(provide 'emacspeak-autoload)
;;{{{ end of file

;;; local variables:
;;; folded-file: t
;;; end:

;;}}}
