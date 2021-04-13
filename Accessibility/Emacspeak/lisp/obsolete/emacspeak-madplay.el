;;; emacspeak-madplay.el --- Control madplay from Emacs  -*- lexical-binding: t; -*-
;;; $Id$
;;; $Author: tv.raman.tv $
;;; Description: Controlling madplay from emacs 
;;; Keywords: Emacspeak, madplay
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

;;; Copyright (c) 1995 -- 2015, T. V. Raman
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

;;{{{ Introduction:

;;; Commentary:

;;; Defines a simple derived mode for interacting with
;;; madplay.
;;; madplay navigation commands  work via single keystrokes.

;;; Code:

;;}}}
;;{{{  Required modules

(require 'emacspeak-preamble)
(require 'emacspeak-aumix)
(require 'desktop)
(require 'dired)
;;}}}
;;{{{ define a derived mode for madplay interaction 
(defvar emacspeak-madplay-process nil
  "Process handle to madplay." )
(make-variable-buffer-local 'emacspeak-madplay-process)

;;;###autoload

(define-prefix-command 'emacspeak-madplay-prefix-command
  'emacspeak-madplay-mode-map)

(define-derived-mode emacspeak-madplay-mode special-mode 
                     "Madplay Interaction"
  "Major mode for madplay interaction. \n\n
\\{emacspeak-madplay-mode-map}"
  (setq emacspeak-madplay-process (get-buffer-process (current-buffer))))

(declaim (special emacspeak-madplay-mode-map))

(defvar emacspeak-madplay-madplay-keys
  (list
   ?f ?b ?p ?s
   ?+ ?- ?q ?t)
  "Keys accepted by madplay.")
;;;###autoload
(defun emacspeak-madplay-madplay-command (char)
  "Execute Madplay command."
  (interactive "cMadplay Command:")
  (declare (special emacspeak-madplay-process))
  (let*  ((buffer (process-buffer emacspeak-madplay-process))
          (mark nil))
    (save-current-buffer
      (set-buffer buffer)
      (setq mark (point-max))
      (process-send-string
       emacspeak-madplay-process
       (format "%c" char))
      (accept-process-output emacspeak-madplay-process 1)
      (message "%s"
               (buffer-substring mark (point-max))))))
;;;###autoload
(defun emacspeak-madplay-madplay-call-command ()
  "Call appropriate madplay command."
  (interactive)
  (declare (special emacspeak-madplay-buffer-name))
  (emacspeak-madplay-madplay-command last-input-event)
  (when (char-equal last-input-event ?q)
    (emacspeak-aumix-reset)
    (emacspeak-auditory-icon 'close-object)
    (when (equal emacspeak-madplay-buffer-name (buffer-name))
      (bury-buffer))
    (emacspeak-speak-mode-line)))

(define-key emacspeak-madplay-mode-map  "o" 'emacspeak-madplay)
(loop for c in emacspeak-madplay-madplay-keys
      do
      (define-key emacspeak-madplay-mode-map   (format
                                                "%c" c)
        'emacspeak-madplay-madplay-call-command))
(define-key emacspeak-madplay-mode-map [left]
  'emacspeak-aumix-wave-decrease)
(define-key emacspeak-madplay-mode-map [right] 'emacspeak-aumix-wave-increase)

;;}}}
;;{{{ emacspeak-madplay

(defcustom emacspeak-madplay-program
  (expand-file-name "amadplay"
                    emacspeak-etc-directory)
  "Script to invoke madplay.
Emacspeak comes with a sample amadplay script in etc/amadplay
  that 
sets up madplay to pipe output to alsa."
  :type 'string
  :group 'emacspeak-madplay)

(defcustom emacspeak-madplay-media-directory
  (expand-file-name "~/mp3/")
  "Directory to look for media files."
  :type 'directory
  :group 'emacspeak-madplay)
(defvar emacspeak-madplay-buffer-name "madplay"
  "Name of madplay buffer.")

;;;###autoload
(defun emacspeak-madplay (resource)
  "Play specified resource using madplay.
Resource is an  MP3 file or directory containing mp3 files.
The player is placed in a buffer in emacspeak-madplay-mode."
  (interactive
   (list
    (expand-file-name
     (read-file-name "MP3 Resource: "
                     (if 
                         (string-match (format ".*%s.*"
                                               emacspeak-madplay-media-directory
                                               )
                                       (expand-file-name default-directory))
                         default-directory
                       emacspeak-madplay-media-directory)
                     (when (eq major-mode 'dired-mode)
                       (dired-get-filename))))))
  (declare (special emacspeak-madplay-process
                    emacspeak-madplay-buffer-name
                    emacspeak-madplay-media-directory))
  (when (and emacspeak-madplay-process
             (eq 'run (process-status
                       emacspeak-madplay-process))
             (y-or-n-p "Stop currently playing music? "))
    (delete-process emacspeak-madplay-process)
    (setq emacspeak-madplay-process nil))
  (let ((process-connection-type t)
        (read-file-name-completion-ignore-case t)
        (buffer (get-buffer-create
                 emacspeak-madplay-buffer-name)))
    (save-current-buffer
      (set-buffer buffer)
      (erase-buffer)
      (setq emacspeak-madplay-process
            (cond
             ((file-directory-p resource)
              (apply 'start-process
                     "madplay" emacspeak-madplay-buffer-name
                     emacspeak-madplay-program
                     (directory-files
                      (expand-file-name resource)
                      'full
                      "\\(mp3$\\)\\|\\(MP3$\\)")))
             (t (start-process
                 "madplay" emacspeak-madplay-buffer-name
                 emacspeak-madplay-program
                 (expand-file-name resource))))))
    (switch-to-buffer buffer)
    (emacspeak-madplay-mode)))

;;}}}
(provide 'emacspeak-madplay)
;;{{{ end of file 

;;; local variables:
;;; folded-file: t
;;; byte-compile-dynamic: nil
;;; end: 

;;}}}
