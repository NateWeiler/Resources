;;; emacspeak-transient.el --- Speech-enable TRANSIENT  -*- lexical-binding: t; -*-
;;; $Author: tv.raman.tv $
;;; Description:  Speech-enable TRANSIENT An Emacs Interface to transient
;;; Keywords: Emacspeak,  Audio Desktop transient
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
;;; MERCHANTABILITY or FITNTRANSIENT FOR A PARTICULAR PURPOSE.  See the
;;; GNU General Public License for more details.
;;;
;;; You should have received a copy of the GNU General Public License
;;; along with GNU Emacs; see the file COPYING.  If not, write to
;;; the Free Software Foundation, 675 Mass Ave, Cambridge, MA 02139, USA.

;;}}}
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;;{{{  introduction

;;; Commentary:
;;; TRANSIENT ==  Transient commands --- used by magit and friends.
;;; This module speech-enables transient.

;;; @subsection Introduction
;;; 
;;; Package Transient is similar to package Hydra in the sense that it can
;;; be used to create a sequence of chained/hierarchical commands that are
;;; invoked via a sequence of keys. It is used by Magit for dispatching to
;;; the various Git commands.
;;; Speech-enabling package Transient results in the various interactive
;;; commands producing auditory feedback. Transient
;;;shows an ephemeral window with the currently available commands,
;;; Emacspeak speech-enables transient--show to speak that content.
;;; 
;;; Finally, this module defines a new minor mode called
;;; transient-emacspeak  that  enables  interactive browsing of the
;;; contents displayed temporarily. Note that without this
;;; functionality, learning complex packages like Magit would be difficult
;;; because  the list of available commands (potentially very long) gets
;;; spoken in its entirety by the advice on transient--show.
;;; 
;;; @subsection Browsing Contents Of transient--show
;;; 
;;; When executing a command defined via Transient --- e.g. command
;;; Magit-dispatch and friends, press @kbd {C-z} (transient-suspend) to
;;; temporarily suspend   the currently active transient. Emacspeak now
;;; displays a  *transient-emacspeak* buffer that displays the contents of the
;;; most recently displayed transient choices. Pressing @kbd {C-c} resumes
;;; the transient; Pressing @kbd{C-q} quits the transient.
;;; 
;;; Code:

;;}}}
;;{{{  Required modules

(require 'cl-lib)
(cl-declaim  (optimize  (safety 0) (speed 3)))
(require 'emacspeak-preamble)
(require 'derived)
;;}}}
;;{{{Map Faces:

(voice-setup-set-voice-for-face 'transient-separator  'inaudible)

(voice-setup-add-map 
 '(
   (transient-argument voice-animate)
   (transient-disabled-suffix voice-smoothen)
   (transient-enabled-suffix voice-brighten)
   (transient-heading voice-bolden)
   (transient-inactive-argument voice-smoothen-extra)
   (transient-inactive-value voice-smoothen-extra)
   (transient-key voice-highlight)
   (transient-mismatched-key voice-monotone)
   (transient-nonstandard-key voice-monotone)
   (transient-unreachable voice-monotone)
   (transient-unreachable-key voice-monotone)
   (transient-value voice-brighten)))
;;}}}
;;{{{ Advice Interactive Commands:

(defadvice transient-toggle-common (after emacspeak pre act comp)
  "Provide auditory feedback."
  (cl-declare (special transient-show-common-commands))
  (when (ems-interactive-p)
    (dtk-stop)
    (emacspeak-auditory-icon
     (if transient-show-common-commands 'on 'off))))

(defadvice transient-resume (after emacspeak pre act comp)
  "Provide auditory feedback."
  (when (ems-interactive-p)
    (dtk-stop)
    (emacspeak-auditory-icon 'open-object)))

(cl-loop
 for f in
 '(transient-quit-all transient-quit-one transient-quit-seq )
 do
 (eval
  `(defadvice ,f (after emacspeak pre act comp)
     "Provide auditory feedback."
     (when (ems-interactive-p)
       (dtk-stop)
       (emacspeak-auditory-icon 'close-object)
       (when (eq major-mode 'emacspeak-transient-mode) (bury-buffer))
       (emacspeak-speak-mode-line)))))

(cl-loop
 for f in
 '(transient-save transient-set)
 do
 (eval
  `(defadvice ,f (after emacspeak pre act comp)
     "Provide auditory feedback."
     (when (ems-interactive-p)
       (emacspeak-auditory-icon 'save-object)
       (dtk-stop)))))

(cl-loop
 for f in
 '(transient-history-next
   transient-history-prev)
 do
 (eval
  `(defadvice ,f (after emacspeak pre act comp)
     "Provide auditory feedback."
     (when (ems-interactive-p)
       (dtk-stop)
       (emacspeak-auditory-icon 'select-object)))))

(define-derived-mode emacspeak-transient-mode special-mode
  "Browse current transient choices"
  "emacspeak integration with Transient."
  (cl-declare (special transient-sticky-map))
  (use-local-map transient-sticky-map)
  (local-set-key "q" 'bury-buffer)
  (local-set-key (kbd "C-c") 'transient-resume))

(defvar emacspeak-transient-cache nil
  "Cache of the last Transient buffer contents.")

(defadvice transient--show (after emacspeak pre act comp)
  "Provide auditory feedback."
  (when (window-live-p transient--window)
    (with-current-buffer (window-buffer transient--window)
      (setq emacspeak-transient-cache
            (buffer-substring (point-min)  (point-max)))
      (emacspeak-auditory-icon 'open-object)
      (emacspeak-speak-buffer))))

(defadvice transient-suspend (around emacspeak pre act comp)
  "Pop to *Transient-emacspeak* buffer where the message emitted by
the transient can be browsed.
Press `C-c' to resume the suspended transient."
  (cl-declare (special emacspeak-transient-cache))
  (cond
   ((ems-interactive-p)
    (let ((buff (get-buffer-create "*Transient-Emacspeak*"))
          (inhibit-read-only t))
      ad-do-it
      (emacspeak-auditory-icon 'close-object)
      (with-current-buffer buff
        (erase-buffer)
        (insert "C-c to resume, C-g to quit.\n\n")
        (insert emacspeak-transient-cache)
        (goto-char (point-min))
        (emacspeak-transient-mode))
      (switch-to-buffer buff)
      (emacspeak-speak-mode-line)))
   (t ad-do-it))
  ad-return-value)

;;}}}
;;{{{Hooks:

(defun emacspeak-transient-post-hook ()
  "Actions to execute after transient is done."
  (cl-declare (special transient--stack))
  (unless transient--stack
    (dtk-stop)
    (emacspeak-auditory-icon 'task-done)
    (emacspeak-speak-mode-line)))

(add-hook 'post-transient-hook 'emacspeak-transient-post-hook)

;;}}}
(provide 'emacspeak-transient)
;;{{{ end of file

;;; local variables:
;;; folded-file: t
;;; end:

;;}}}
