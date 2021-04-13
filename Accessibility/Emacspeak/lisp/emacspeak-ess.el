;;; emacspeak-ess.el --- Speech-enable ESS: Emacs Speaks Statistics  -*- lexical-binding: t; -*- 
;;; $Id$
;;; $Author: tv.raman.tv $
;;; Description:  Speech-enable ESS An Emacs Interface to R and others
;;; Keywords: Emacspeak,  Audio Desktop Statistics, R
;;{{{  LCD Archive entry:

;;; LCD Archive Entry:
;;; emacspeak| T. V. Raman |raman@cs.cornell.edu
;;; A speech interface to Emacs |
;;; $Date: 2007-09-01 15:30:13 -0700 (Sat, 01 Sep 2007) $ |
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

;;; Commentary:
;;; ESS == Emacs Speaks Statistics
;;; This module makes ESS speak.

;;}}}
;;{{{  Required modules

(require 'cl-lib)
(cl-declaim  (optimize  (safety 0) (speed 3)))
(require 'emacspeak-preamble)

;;}}}
;;{{{ Advice edeitor to speak

(defadvice ess-indent-command(after emacspeak pre act comp)
  "Speak the line."
  (when (ems-interactive-p)
    (emacspeak-speak-line)))

(defadvice ess-smart-underscore (around emacspeak pre act comp)
  "Speak what you inserted."
  (cond
   ((ems-interactive-p)
    (let ((orig (point)))
      ad-do-it
      (dtk-speak (buffer-substring orig (point)))))
   (t ad-do-it))
  ad-return-value)
(unless (and (boundp 'post-self-insert-hook)
             post-self-insert-hook
             (memq 'emacspeak-post-self-insert-hook post-self-insert-hook))
  (defadvice ess-electric-brace (after emacspeak pre act comp)
    "Speak what you inserted.
Cue electric insertion with a tone."
    (when (ems-interactive-p)
      (let ((emacspeak-speak-messages nil))
        (emacspeak-speak-this-char last-input-event)
        (dtk-tone 800 100 t)))))

;;}}}
;;{{{ Structure commands 

(cl-loop for f in
         '(ess-beginning-of-function ess-end-of-function)
         do
         (eval
          `(defadvice ,f (after emacspeak pre act comp)
             "Produce auditory feedback."
             (when (ems-interactive-p)
               (emacspeak-auditory-icon 'large-movement)
               (emacspeak-speak-line)))))

(defadvice ess-mark-function (after emacspeak pre act comp)
  "Provide auditory feedback."
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'select-object)
    (message "Marked function containing %s lines."
             (count-lines (point) (mark)))))

(defadvice ess-indent-exp  (after emacspeak pre act)
  "Provide auditory feedback."
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'fill-object)
    (message "Indented current s expression ")))

;;}}}
;;{{{ Evaluators

(cl-loop for f in
         '(
           ess-eval-function ess-eval-buffer
           ess-eval-function-and-go ess-eval-buffer-and-go
           ess-eval-chunk ess-eval-chunk-and-go
           ess-eval-line ess-eval-line-and-go
           ess-eval-paragraph ess-eval-paragraph-and-go
           ess-eval-paragraph-and-step
           ess-eval-region ess-eval-region-and-go
           ess-eval-line-and-step ess-eval-function-or-paragraph-and-step)
         do
         (eval
          `
          (defadvice ,f (after emacspeak pre act comp)
            "Provide auditory feedback."
            (when (ems-interactive-p)
              (emacspeak-auditory-icon 'select-object)))))

;;}}}
;;{{{ Switchers
(defadvice ess-display-help-on-object(after emacspeak pre act
                                            comp)
  "Announce help."
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'help)
    (message "Displayed help in other window.")))
(cl-loop for f in
         '(
           ess-switch-to-ess ess-switch-to-end-of-ESS)
         do
         (eval
          `(defadvice ,f (after emacspeak pre act comp)
             "Provide auditory feedback."
             (when (ems-interactive-p)
               (emacspeak-auditory-icon 'select-object)
               (emacspeak-speak-mode-line)))))

;;}}}
;;{{{ set up programming mode:

(add-hook 'ess-mode-hook 'emacspeak-setup-programming-mode)

;;}}}
(provide 'emacspeak-ess)
;;{{{ end of file

;;; local variables:
;;; folded-file: t
;;; end:

;;}}}
