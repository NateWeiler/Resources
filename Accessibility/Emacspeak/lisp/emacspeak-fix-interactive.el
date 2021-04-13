;;; emacspeak-fix-interactive.el --- Make  Emacs' builtin prompts   speak  -*- lexical-binding: t; -*-
;;; $Id$
;;; $Author: tv.raman.tv $
;;; Description: Fixes functions that use interactive to prompt for args.
;;; Approach suggested by hans@cs.buffalo.edu
;;; Keywords: Emacspeak, Advice, Automatic advice, Interactive
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

(require 'cl-lib)
(cl-declaim  (optimize  (safety 0) (speed 3)))
(require 'advice)
(require 'dtk-speak)
;;{{{  Introduction:

;;; Commentary:
;;; Emacs commands that use the 'interactive spec
;;; to read interactive arguments are a problem for Emacspeak.
;;;  This is because the prompting for the arguments is done from C
;;; See (callint.c) in the Emacs sources.
;;; Advising the various input functions,
;;; e.g. read-file-name therefore will not help.
;;; This module defines a function that solves this problem.
;;; emacspeak-fix-commands-that-use-interactive needs to be called
;;; To speech enable such functions.
;;; Code:

;;}}}
;;{{{  functions that are  fixed.

(defvar emacspeak-commands-dont-fix-regexp
  (concat
   "^ad-Orig\\|^mouse\\|^scroll-bar\\|^tpu-\\|^set\ "
   "\\|^face\\|^frame\\|^font"
   "\\|^color\\|^timer")
  "Regular expression matching function names whose interactive spec should not be fixed.")
;;;###autoload
(defun emacspeak-should-i-fix-interactive-p  (sym)
  "Predicate to test if this function should be fixed. "
  (and
   (not (string-match emacspeak-commands-dont-fix-regexp (symbol-name sym)))
   (commandp sym)
   (not (get  sym 'emacspeak-checked-interactive))
   (not (eq 'byte-compile-obsolete (get sym 'byte-compile)))
   (functionp (indirect-function sym))
   (stringp (cl-second (interactive-form  sym)))))

(defun emacspeak-fix-commands-that-use-interactive ()
  "Auto advises interactive commands to speak prompts."
  (mapatoms 'emacspeak-fix-interactive-command-if-necessary))

(defun ems-prompt-without-minibuffer-p (prompt)
  "Check if this interactive prompt uses the minibuffer."
  (string-match  "^\\*?[ckK]" prompt))

(defvar emacspeak-fix-interactive-problematic-functions nil
  "Functions whose interactive prompt we will need to fix by hand
because auto-advising was not possible.")

(defun emacspeak-fix-interactive (sym)
  "Auto-advice interactive command to speak its prompt.
Fix the function definition of sym to make its interactive form
speak its prompts. This function needs to do very little work as
of Emacs 21 since all interactive forms except `c' and `k' now
use the minibuffer."
  (cl-declare (special emacspeak-fix-interactive-problematic-functions))
  (let* ((prompts
          (split-string
           (cl-second (interactive-form  sym))
           "\n"))
         (count (cl-count-if 'ems-prompt-without-minibuffer-p  prompts)))
                                        ;memoize call
    (put sym 'emacspeak-checked-interactive t)
                                        ; advice if necessary
    (cond
     ((zerop count) t)                  ;do nothing
     ((cl-notany #'(lambda (s) (string-match "%s" s))
                 prompts)
                                        ; generate auto advice
      (put sym 'emacspeak-auto-advised t)
      (eval
       `(defadvice ,sym
            (before  emacspeak-auto pre act  protect compile)
          "Automatically defined advice to speak interactive prompts. "
          (interactive
           (nconc
            ,@(mapcar
               #'(lambda (prompt)
                   `(let ((dtk-stop-immediately nil)
                          (emacspeak-speak-messages nil))
                      (when (ems-prompt-without-minibuffer-p ,prompt)
                        (emacspeak-auditory-icon 'open-object)
                        (tts-with-punctuations 'all
                                               (dtk-speak
                                                (or (substring ,prompt 1) ""))))
                      (call-interactively
                       #'(lambda (&rest args)
                           (interactive ,prompt)
                           args) nil)))
               prompts))))))
     (t
      ;; cannot handle automatically -- tell developer
      ;; since subsequent prompts use earlier args e.g.global-set-key
      (push sym emacspeak-fix-interactive-problematic-functions)
      (message "Not auto-advising %s" sym))))
  t)


;;;###autoload
(defun  emacspeak-fix-interactive-command-if-necessary (command)
  "Fix command if necessary."
  (when (emacspeak-should-i-fix-interactive-p  command)
    (emacspeak-fix-interactive command)))

;;}}}
;;{{{  fixing all commands defined in a given module:
;;;###autoload
(defun emacspeak-fix-commands-loaded-from (module)
  "Fix all commands loaded from a specified module."
  (interactive
   (list
    (locate-library
     (completing-read "Fix library: "
                      'locate-file-completion
                      (cons load-path (get-load-suffixes))))))
  (dolist
      (item (cl-rest (assoc module load-history)))
    (and (listp item)
         (eq 'defun (car item))
         (symbolp (cdr item))
         (not (eq 'byte-compile-obsolete
                  (get (cdr item) 'byte-compile)))
         (commandp (cdr item))
         (emacspeak-fix-interactive-command-if-necessary (cdr item))))
  (when (called-interactively-p 'interactive)
    (message "Fixed interactive commands defined in module %s" module)))

(defvar emacspeak-load-history-pointer nil
  "Internal variable used by command
emacspeak-fix-all-recent-commands to track load-history.")

(defun emacspeak-fix-all-recent-commands ()
  "Fix recently loaded interactive commands.
This command looks through `load-history' and fixes commands if necessary.
Memoizes call in emacspeak-load-history-pointer to memoize this call. "
  (interactive)
  (cl-declare (special load-history emacspeak-load-history-pointer))
  (unless (eq emacspeak-load-history-pointer load-history)
    (let ((lh load-history))
;;; cdr down lh till we hit emacspeak-load-history-pointer
      (while (and lh
                  (not (eq lh emacspeak-load-history-pointer)))
;;; fix commands in this module
        (emacspeak-fix-commands-loaded-from lh)
        (when (called-interactively-p 'interactive)
          (message "Fixed commands in %s" (cl-first (cl-first lh))))
        (setq lh (cl-rest lh)))
;;;memoize for future call
      (setq emacspeak-load-history-pointer load-history))
    (when (called-interactively-p 'interactive)
      (message "Fixed recently defined  interactive commands")))
  t)

;;}}}
;;{{{Enumerate commands that are fixed:
(defun emacspeak-fix-interactive-commands-that-are-fixed ()
  "Return list of commands that are auto-advised."
  (let ((result nil))
    (mapatoms
     #'(lambda (sym)
         (when (get sym 'emacspeak-auto-advised)
           (cl-pushnew sym result))))
    result))

;;}}}
(provide 'emacspeak-fix-interactive)
;;{{{  end of file
;;; local variables:
;;; folded-file: t
;;; end:

;;}}}
