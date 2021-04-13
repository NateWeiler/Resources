;;; emacspeak-espn.el --- ESPN API  Client  -*- lexical-binding: t; -*-
;;; $Id: emacspeak-espn.el 4797 2007-07-16 23:31:22Z tv.raman.tv $
;;; $Author: tv.raman.tv $
;;; Description:  ESPN API Client
;;; Keywords: Emacspeak,  Audio Desktop ESPN
;;{{{  LCD Archive entry:

;;; LCD Archive Entry:
;;; emacspeak| T. V. Raman |raman@cs.cornell.edu
;;; A speech interface to Emacs |
;;; $Date: 2007-05-03 18:13:44 -0700 (Thu, 03 May 2007) $ |
;;;  $Revision: 4532 $ |
;;; Location undetermined
;;;

;;}}}
;;{{{  Copyright:
;;;Copyright (C) 1995 -- 2015, T. V. Raman
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
;;; MERCHANTABILITY or FITNESPN FOR A PARTICULAR PURPOSE.  See the
;;; GNU General Public License for more details.
;;;
;;; You should have received a copy of the GNU General Public License
;;; along with GNU Emacs; see the file COPYING.  If not, write to
;;; the Free Software Foundation, 675 Mass Ave, Cambridge, MA 02139, USA.

;;}}}
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;;{{{  introduction

;;; Commentary:
;;; ESPN ==  ESPN Sport Network.
;;; API:   http://developer.espn.com/overview
;;; Get yourself an API key and set it via custom.

;;}}}
;;{{{  Required modules

(require 'cl)
(declaim  (optimize  (safety 0) (speed 3)))
(require 'emacspeak-preamble)
(require 'derived)
(require 'g-utils)

;;}}}
;;{{{ Customizations:

(defgroup emacspeak-espn nil
  "ESPN API Client."
  :group 'emacspeak)

(defcustom emacspeak-espn-api-key nil
  "Web API  key for this application."
  :type
  '(choice :tag "Key: "
           (const :tag "Unspecified" nil)
           (string :tag "API Key: "))
  :group 'emacspeak-espn)

;;}}}
;;{{{ URL REST End-Points:

(defvar emacspeak-espn-sports-url
  (format "http://api.espn.com/v1/sports?apikey=%s"
          emacspeak-espn-api-key)
  "URL end-point for retrieving list of sports.")

;;}}}
(provide 'emacspeak-espn)
;;{{{ end of file

;;; local variables:
;;; folded-file: t
;;; byte-compile-dynamic: t
;;; end:

;;}}}
