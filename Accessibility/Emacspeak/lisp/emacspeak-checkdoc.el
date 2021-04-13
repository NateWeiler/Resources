;;; emacspeak-checkdoc.el --- Speech-enable checkdoc  -*- lexical-binding: t; -*-
;;; $Id$
;;; $Author: tv.raman.tv $
;;; Description:Speech-enable checkdoc
;;; Keywords: Emacspeak, Speak, Spoken Output, maintain code 
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

;;; Commentary:
;; 
;;{{{  Introduction

;;; Speech-enable checkdoc.el

;;}}}
;;; Code:
(cl-declaim  (optimize  (safety 0) (speed 3)))
(require 'emacspeak-preamble)
;;}}}
;;{{{ implementation

(provide 'emacspeak-checkdoc-advice)

;;; checkdoc-advice.el ends here

(defadvice read-event (before emacspeak-checkdoc pre act comp)
  (let ((dtk-stop-immediately nil)) 
    (dtk-stop)
    (emacspeak-speak-line) 
    (emacspeak-speak-message-again)))

;;}}}
(provide 'emacspeak-checkdoc)
;;{{{ end of file

;;; local variables:
;;; folded-file: t
;;; end:

;;}}}
