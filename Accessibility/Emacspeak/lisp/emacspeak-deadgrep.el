;;; emacspeak-deadgrep.el --- Speech-enable DEADGREP  -*- lexical-binding: t; -*-
;;; $Author: tv.raman.tv $
;;; Description:  Speech-enable DEADGREP An Emacs Interface to deadgrep
;;; Keywords: Emacspeak,  Audio Desktop deadgrep
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
;;;Copyright (C) 1995 -- 2007, 2011, T. V. Raman
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
;;; MERCHANTABILITY or FITNDEADGREP FOR A PARTICULAR PURPOSE.  See the
;;; GNU General Public License for more details.
;;;
;;; You should have received a copy of the GNU General Public License
;;; along with GNU Emacs; see the file COPYING.  If not, write to
;;; the Free Software Foundation, 675 Mass Ave, Cambridge, MA 02139, USA.

;;}}}
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;;{{{  introduction

;;; Commentary:
;;; DEADGREP ==  Front-end to ripgrep.

;;; Code:

;;}}}
;;{{{  Required modules

(require 'cl-lib)
(cl-declaim  (optimize  (safety 0) (speed 3)))
(require 'emacspeak-preamble)

;;}}}
;;{{{ Map Faces:

(voice-setup-add-map
 '(
   (deadgrep-filename-face voice-bolden)
   (deadgrep-match-face voice-animate)
   (deadgrep-meta-face voice-annotate)
   (deadgrep-regexp-metachar-face voice-lighten)
   (deadgrep-search-term-face voice-highlight)))

;;}}}
;;{{{ Interactive Commands:

(defadvice deadgrep-toggle-file-results (after emacspeak pre act comp)
  "Provide auditory feedback."
  (when (ems-interactive-p)
    (emacspeak-speak-line)
    (emacspeak-auditory-icon
     (if (get-text-property (1+ (line-end-position)) 'invisible) 'off 'on))))

(defadvice deadgrep (after emacspeak pre act comp)
  "Provide auditory feedback."
  (when (ems-interactive-p)
    (emacspeak-speak-mode-line)))

(cl-loop
 for f in 
 '(deadgrep-visit-result-other-window deadgrep-visit-result )
 do
 (eval
  `(defadvice ,f (after emacspeak pre act comp)
     "Provide auditory feedback."
     (when (ems-interactive-p)
       (emacspeak-auditory-icon 'select-object)
       (emacspeak-speak-line)
       (emacspeak-auditory-icon 'open-object)))))

(cl-loop
 for f in 
 '(
   deadgrep-forward-match deadgrep-forward
   deadgrep-backward-match deadgrep-backward)
 do
 (eval
  `(defadvice ,f (after emacspeak pre act comp)
     "Provide auditory feedback."
     (when (ems-interactive-p)
       (let ((emacspeak-show-point t))
         (emacspeak-auditory-icon 'large-movement)
         (emacspeak-speak-line))))))

;;}}}
(provide 'emacspeak-deadgrep)
;;{{{ end of file

;;; local variables:
;;; folded-file: t
;;; end:

;;}}}
