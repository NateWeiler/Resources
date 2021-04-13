;;; emacspeak-tdtd.el --- Speech enable  DTD authoring  -*- lexical-binding: t; -*- 
;;; $Id$
;;; $Author: tv.raman.tv $
;;; Description:   extension to speech enable tdtd 
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

;;{{{ required modules

(cl-declaim  (optimize  (safety 0) (speed 3)))
(require 'emacspeak-preamble)
;;}}}
;;{{{  Introduction:

;;; Commentary:
;;; tdtd is an emacs package for authoring and maintaining
;;; XML and SGML DTDs
;;; tdtd is at http://www.mulberrytech.com/tdtd/index.html
;;; this module speech-enables tdtd

;;; Code:

;;}}}
;;{{{  speech-enable interactive commands

(defadvice dtd-mode (after emacspeak pre act comp)
  "set up for voice locking."
  (emacspeak-tdtd-voice-lock-setup)
  (dtk-set-punctuations 'all))

(defun emacspeak-tdtd-voice-lock-setup()
  "Setup voice locking for tdtd mode."
  (cl-declare (special 
               dtd-xml-flag 
               dtd-decl-flag dtd-sys-decl-flag))
  (cond
   (dtd-xml-flag)
   (dtd-decl-flag
    )
   (dtd-sys-decl-flag
    )
   (t
    )))

;;}}}
(provide 'emacspeak-tdtd)
;;{{{ end of file

;;; local variables:
;;; folded-file: t
;;; end:

;;}}}
