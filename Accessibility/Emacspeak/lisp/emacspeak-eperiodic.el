;;; emacspeak-eperiodic.el --- Speech-enable Periodic Table  -*- lexical-binding: t; -*-
;;; $Id$
;;; $Author: tv.raman.tv $
;;; Description:  Emacspeak speech-enabler for Periodic Table
;;; Keywords: Emacspeak, periodic  Table
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
;;; eperiodic produces an interactive periodic table of elements
;;; and can be found at 
;;; http://vegemite.chem.nottingham.ac.uk/~matt/emacs/eperiodic.el
;;; Code:
;;}}}
;;{{{ required modules

;;; Code:

(cl-declaim  (optimize  (safety 0) (speed 3)))
(require 'emacspeak-preamble)
;;}}}
;;{{{ Forward decls:
(declare-function eperiodic-get-element-property  "ext:eperiodic.el" (e prop))
(declare-function eperiodic-element-at "ext:eperiodic.el" (&optional pos))

;;}}}
;;{{{ faces and voices 
(voice-setup-add-map
 '(
   (eperiodic-discovered-after-face voice-smoothen)
   (eperiodic-discovered-before-face voice-brighten)
   (eperiodic-discovered-in-face voice-lighten)
   (eperiodic-f-block-face voice-lighten-medium)
   (eperiodic-gas-face voice-lighten-extra)
   (eperiodic-group-number-face voice-lighten)
   (eperiodic-header-face voice-bolden)
   (eperiodic-liquid-face voice-smoothen)
   (eperiodic-p-block-face voice-monotone)
   (eperiodic-period-number-face voice-lighten)
   (eperiodic-s-block-face voice-smoothen-medium)
   (eperiodic-solid-face voice-bolden-extra)
   (eperiodic-unknown-face voice-bolden-and-animate)))

;;}}}
;;{{{ helpers 

(defun emacspeak-eperiodic-name-element-at-point ()
  "Returns name of current element."
  (cl-declare (special eperiodic-element-properties))
  (let ((name 
         (cdr
          (assoc 'name
                 (cdr (assoc (eperiodic-element-at)
                             eperiodic-element-properties)))))
        (face (get-text-property (point) 'face))
        (personality (get-text-property (point) 'personality)))
    (add-text-properties  0 (length name)
                          (list 'face face 'personality
                                personality)
                          name)
    name))

;;}}}
;;{{{ additional  commands

(defun emacspeak-eperiodic-previous-line ()
  "Move to next row and speak element."
  (interactive)
  (forward-line -1)
  (call-interactively 'eperiodic-next-element))

(defun emacspeak-eperiodic-next-line ()
  "Move to next row and speak element."
  (interactive)
  (forward-line 1)
  (call-interactively 'eperiodic-next-element))

(defun emacspeak-eperiodic-speak-current-element ()
  "Speak element at point."
  (interactive)
  (dtk-speak (emacspeak-eperiodic-name-element-at-point)))

(defun emacspeak-eperiodic-goto-property-section ()
  "Mark position and jump to properties section."
  (interactive)
  (push-mark (point))
  (goto-char
   (text-property-any (point) (point-max)
                      'face 'eperiodic-header-face))
  (forward-line 2)
  (emacspeak-speak-line)
  (emacspeak-auditory-icon 'large-movement))
(cl-declaim (special eperiodic-mode-map))
(when (boundp 'eperiodic-mode-map)
  (define-key eperiodic-mode-map " " 'emacspeak-eperiodic-speak-current-element)
  (define-key  eperiodic-mode-map "x" 'emacspeak-eperiodic-goto-property-section)
  (define-key eperiodic-mode-map "n" 'emacspeak-eperiodic-next-line)
  (define-key eperiodic-mode-map "p" 'emacspeak-eperiodic-previous-line)
  (define-key eperiodic-mode-map "l"
    'emacspeak-eperiodic-play-description)
  )
;;}}}
;;{{{  listen off the web:
(defcustom emacspeak-eperiodic-media-location 
  "http://www.webelements.com/webelements/elements/media/snds-description/%s.rm"
  "Location of streaming media describing elements."
  :type 'url
  :group 'emacspeak-eperiodic)

(defun emacspeak-eperiodic-play-description ()
  "Play audio description from WebElements."
  (interactive)
  (cl-declare (special emacspeak-eperiodic-media-location))
  (let ((e (eperiodic-element-at)))
    (unless e  (error "No element under point."))
    (emacspeak-m-player
             (format  emacspeak-eperiodic-media-location
                      (eperiodic-get-element-property e 'symbol))
             nil)))

;;}}}
;;{{{ advice interactive commands

(defadvice eperiodic-find-element (after emacspeak pre act comp)
  "Provide auditory feedback."
  (when  (ems-interactive-p)
    (emacspeak-eperiodic-speak-current-element)
    (emacspeak-auditory-icon 'large-movement)))

(defadvice eperiodic-previous-element (after emacspeak pre act comp)
  "Provide auditory feedback."
  (when (ems-interactive-p)
    (dtk-speak (emacspeak-eperiodic-name-element-at-point))
    (emacspeak-auditory-icon 'large-movement)))

(defadvice eperiodic-next-element (after emacspeak pre act comp)
  "Provide auditory feedback."
  (when (ems-interactive-p)
    (dtk-speak (emacspeak-eperiodic-name-element-at-point))
    (emacspeak-auditory-icon 'large-movement)))
(defadvice eperiodic (after emacspeak pre act comp)
  "Provide spoken feedback."
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'open-object)
    (emacspeak-speak-mode-line)))
(defadvice eperiodic-move (after emacspeak pre act comp)
  "Provide auditory feedback."
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'select-object)))

(defadvice eperiodic-show-element-info (after emacspeak pre act comp)
  "Speak displayed info."
  (when (ems-interactive-p)
    (let ((b (get-buffer "*EPeriodic Element*")))
      (unless b
        (error "Cannot find displayed info."))
      (save-current-buffer
        (set-buffer b)
        (emacspeak-speak-buffer)))))

(defadvice eperiodic-bury-buffer (after emacspeak pre act comp)
  "Provide auditory feedback."
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'close-object)
    (emacspeak-speak-mode-line)))

(defadvice eperiodic-cycle-view (after emacspeak pre act comp)
  "Provide auditory feedback."
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'select-object)
    (message "View %s"
             eperiodic-colour-element-function)))

;;}}}
(provide 'emacspeak-eperiodic)
;;{{{ end of file

;;; local variables:
;;; folded-file: t
;;; end:

;;}}}
