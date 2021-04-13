;;; emacspeak-speak.el --- Implements Emacspeak's core speech services  -*- lexical-binding: t; -*-
;;; $Id$
;;; $Author: tv.raman.tv $
;;; Description:  Contains the functions for speaking various chunks of text
;;; Keywords: Emacspeak,  Spoken Output
;;{{{  LCD Archive entry:

;;; LCD Archive Entry:
;;; emacspeak| T. V. Raman |raman@cs.cornell.edu
;;; A speech interface to Emacs |
;;; $Date: 2008-08-18 16:25:05 -0700 (Mon, 18 Aug 2008) $ |
;;;  $Revision: 4552 $ |
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

;;{{{  Introduction:

;;; Commentary:

;;; This module defines the core speech services used by emacspeak.
;;; It depends on the speech server interface modules
;;; It protects other parts of emacspeak
;;; from becoming dependent on the speech server modules

;;; Code:

;;}}}
;;{{{  Required modules

(require 'cl-lib)
(require 'seq)
(cl-declaim  (optimize  (safety 0) (speed 3)))
(require 'custom)
(require 'ido)
(require 'time-date)
(require 'rect)
(require 'voice-setup)
(require 'thingatpt)
(require 'dtk-speak)
(require 'dtk-unicode)
(require 'emacspeak-pronounce)
(require 'sox-gen)
(eval-when-compile
  (require 'shell)
  (require 'calendar)
  (require 'which-func)
  )

;;}}}
;;{{{  custom group

(defgroup emacspeak-speak nil
  "Basic speech output commands."
  :group 'emacspeak)

;;}}}
;;{{{ This line:

(defsubst ems--this-line ()
  "Return current line as string."
  (buffer-substring (line-beginning-position) (line-end-position)))

;;}}}
;;{{{Helper: Log Message Quietly
(defun ems--log-message (m)
  "Log a message without echoing it."
  (let ((inhibit-read-only t))
    (with-current-buffer (messages-buffer)
      (goto-char (point-max))
      (insert (format "%s\n" m)))))

;;}}}
;;{{{ Helper: voicify string
(defsubst ems-voiceify-string (string personality)
  "Apply personality PERSONALITY to STRING."
  (put-text-property 0 (length string)
                     'personality personality string))

;;}}}
;;{{{Read JSON file:

(defsubst ems--json-read-file (filename)
  "Use native json implementation if available to read json file."
  (cond
   ((fboundp 'json-parse-buffer)
    (with-current-buffer (find-file-noselect filename)
      (goto-char (point-min))
      (prog1
          (json-parse-buffer :object-type 'alist)
        (kill-buffer ))))
   (t (json-read-file filename))))

;;}}}
;;{{{ Per-Mode Punctuations:

(defvar emacspeak-speak-mode-punctuation-table
  (make-hash-table :test #'eq)
  "Store mode-specific punctuation mode setting.")

(defun ems-get-mode-punctuation-setting (mode)
  "Return punctuation setting for specified mode MODE."
  (cl-declare (special emacspeak-speak-mode-punctuation-table))
  (gethash mode emacspeak-speak-mode-punctuation-table))

(defun ems-set-mode-punctuation-setting (mode value)
  "Set punctuation setting for specified mode MODE to value VALUE."
  (cl-declare (special emacspeak-speak-mode-punctuation-table))
  (puthash mode value emacspeak-speak-mode-punctuation-table))

;;}}}
;;{{{  line, Word and Character echo

(defcustom emacspeak-line-echo nil
  "If t, then emacspeak echoes lines as you type.
You can use \\[emacspeak-toggle-line-echo] to set this
option."
  :group 'emacspeak-speak
  :type 'boolean)

(ems-generate-switcher 'emacspeak-toggle-line-echo
                       'emacspeak-line-echo
                       "Toggle state of  Emacspeak  line echo.
Interactive PREFIX arg means toggle  the global default value, and then set the
current local  value to the result.")

(defcustom emacspeak-word-echo t
  "If t, then emacspeak echoes words as you type.
You can use \\[emacspeak-toggle-word-echo] to toggle this
option."
  :group 'emacspeak-speak
  :type 'boolean)

(ems-generate-switcher 'emacspeak-toggle-word-echo
                       'emacspeak-word-echo
                       "Toggle state of  Emacspeak  word echo.
Interactive PREFIX arg means toggle  the global default value, and then set the
current local  value to the result.")

(defcustom emacspeak-character-echo t
  "If t, then emacspeak echoes characters  as you type.
You can
use \\[emacspeak-toggle-character-echo] to toggle this
setting."
  :group 'emacspeak-speak
  :type 'boolean)

(ems-generate-switcher 'emacspeak-toggle-character-echo
                       'emacspeak-character-echo
                       "Toggle state of  Emacspeak  character echo.
Interactive PREFIX arg means toggle  the global default value, and then set the
current local  value to the result.")

;;}}}
;;{{{Echo Typing Chars:

(defun emacspeak-post-self-insert-hook ()
  "Speaks the character if emacspeak-character-echo is true.
See  command emacspeak-toggle-word-echo bound to
\\[emacspeak-toggle-word-echo].
Speech flushes as you type."
  (cl-declare (special last-command-event 
                       emacspeak-character-echo emacspeak-word-echo))
  (when buffer-read-only (dtk-speak "Buffer is read-only. "))
  (when
      (and (eq (preceding-char) last-command-event) ; Sanity check.
           (not executing-kbd-macro)
           (not noninteractive))
    (let ((display (get-char-property (1- (point)) 'display)))
      (dtk-stop)
      (cond
       ((stringp display) (dtk-say display))
       ((and emacspeak-word-echo
             (= (char-syntax last-command-event)32))
        (save-excursion
          (condition-case nil
              (forward-word -1)
            (error nil))
          (emacspeak-speak-word)))
       (emacspeak-character-echo
        (emacspeak-speak-this-char (preceding-char)))))))

(add-hook 'post-self-insert-hook 'emacspeak-post-self-insert-hook)

;;}}}
;;{{{ Shell Command Helper:

(defcustom emacspeak-speak-messages t
  "Option indicating if messages are spoken.  If nil,
emacspeak will not speak messages as they are echoed to the
message area.  You can use command
`emacspeak-toggle-speak-messages' bound to
\\[emacspeak-toggle-speak-messages]."

  :group 'emacspeak-speak
  :type 'boolean)

;;; Emacspeak silences messages from shell-command when called non-interactively.
;;; This replacement is used within Emacspeak to invoke commands
;;; whose output we want to hear.

(defun emacspeak-shell-command (command)
  "Run shell command COMMANDAND speak its output."
  (interactive "sCommand:")
  (cl-declare (special default-directory))
  (let ((directory default-directory)
        (output (get-buffer-create "*Emacspeak Shell Command*")))
    (with-current-buffer output
      (erase-buffer)
      (setq default-directory directory)
      (ems-with-messages-silenced
       (shell-command command output))
      (emacspeak-auditory-icon 'open-object)
      (dtk-speak (buffer-string)))))

;;}}}
;;{{{ Utility command to run and tabulate shell output

(defvar emacspeak-speak-run-shell-command-history nil
  "Records history of commands used so far.")

;;;###autoload
(defun emacspeak-speak-run-shell-command (command &optional read-as-csv)
  "Invoke shell COMMAND and display its output as a table. The
results are placed in a buffer in Emacspeak's table browsing
mode. Optional interactive prefix arg read-as-csv interprets the
result as csv. . Use this for running shell commands that produce
tabulated output. This command should be used for shell commands
that produce tabulated output that works with Emacspeak's table
recognizer. Verify this first by running the command in a shell
and executing command `emacspeak-table-display-table-in-region'
normally bound to \\[emacspeak-table-display-table-in-region]."
  (interactive
   (list
    (read-from-minibuffer "Shell command: "
                          nil           ;initial input
                          nil           ; keymap
                          nil           ;read
                          'emacspeak-speak-run-shell-command-history)
    current-prefix-arg))
  (let ((buffer-name (format "%s" command))
        (start nil)
        (end nil))
    (shell-command command buffer-name)
    (cl-pushnew command
                emacspeak-speak-run-shell-command-history :test 'string-equal)
    (save-current-buffer
      (set-buffer buffer-name)
      (untabify (point-min) (point-max))
      (setq start (point-min)
            end (1- (point-max)))
      (condition-case nil
          (cond
           (read-as-csv (emacspeak-table-view-csv-buffer (current-buffer)))
           (t (emacspeak-table-display-table-in-region start end)))
        (error
         (progn
           (message "Output could not be tabulated correctly")
           (switch-to-buffer buffer-name)))))))

;;}}}
;;{{{ Notifications:

(defun emacspeak--notifications-init ()
  "Init Notifications stream."
  (let ((buffer (get-buffer-create "*Notifications*")))
    (with-current-buffer buffer
      (special-mode)
      buffer)))

(defvar emacspeak-notifications-buffer
  (emacspeak--notifications-init)
  "Notifications buffer. Retains at most `emacspeak-notifications-max lines.")

(defun emacspeak-view-notifications ()
  "Display notifications."
  (interactive)
  (cl-declare (special emacspeak-notifications-buffer))
  (unless (buffer-live-p emacspeak-notifications-buffer)
    (setq emacspeak-notifications-buffer (emacspeak--notifications-init)))
  (emacspeak-auditory-icon 'open-object)
  (funcall-interactively #'pop-to-buffer emacspeak-notifications-buffer))

(defconst emacspeak-notifications-max 128
  "Number of notifications to retain.")

(defun emacspeak-notifications-truncate ()
  "Trim notifications buffer."
  (cl-declare (special emacspeak-notifications-buffer emacspeak-notifications-max))
  (with-current-buffer emacspeak-notifications-buffer
    (let ((lines (count-lines (point-min) (point-max)))
          (inhibit-read-only t))
      (when (> lines emacspeak-notifications-max)
        (goto-char (point-min))
        (forward-line (- lines emacspeak-notifications-max))
        (delete-region (point-min) (point))))))

(defun emacspeak-log-notification (text)
  "Log a notification."
  (cl-declare (special emacspeak-notifications-buffer))
  (unless (buffer-live-p emacspeak-notifications-buffer)
    (setq emacspeak-notifications-buffer (emacspeak--notifications-init)))
  (with-current-buffer emacspeak-notifications-buffer
    (let ((inhibit-read-only t))
      (goto-char (point-max))
      (insert (format "%s\n" text)))))

(defvar emacspeak-notifications-gc-timer
  (run-at-time 1800 1800 #'emacspeak-notifications-truncate)
  "Idle timer that runs every 30 minutes to cleanup notifications.")

;;}}}
;;{{{ Completion helper:

(defun emacspeak-speak-completions-if-available ()
  "Speak completions if available."
  (interactive)
  (let ((completions (get-buffer "*Completions*")))
    (cond
     ((and completions
           (window-live-p (get-buffer-window completions)))
      (save-current-buffer
        (set-buffer completions)
        (emacspeak-auditory-icon 'help)
        (dtk-chunk-on-white-space-and-punctuations)
        (next-completion 1)
        (tts-with-punctuations
         'all
         (dtk-speak (buffer-substring (point) (point-max))))))
     (t (emacspeak-speak-line)))))

;;}}}
;;{{{  Macros

;;; Save read-only and modification state, perform some actions and
;;; restore state

(defmacro ems-set-personality-temporarily (start end value &rest body)
  "Temporarily set personality.
Argument START   specifies the start of the region to operate on.
Argument END specifies the end of the region.
Argument VALUE is the personality to set temporarily
Argument BODY specifies forms to execute."
  (declare (indent 1) (debug t))
  `(let ((saved-personality (get-text-property ,start 'personality)))
     (with-silent-modifications
       (unwind-protect
           (progn
             (put-text-property
              (max (point-min) ,start)
              (min (point-max) ,end)
              'personality ,value)
             ,@body)
         (put-text-property
          (max (point-min) ,start)
          (min (point-max) ,end) 'personality saved-personality)))))

(defmacro ems-set-pause-temporarily (start end duration &rest body)
  "Temporarily set property pause.
Argument START   specifies the start of the region to operate on.
Argument END specifies the end of the region.
Argument duration specifies duration in milliseconds.
Argument BODY specifies forms to execute."
  (declare (indent 1) (debug t))
  `(let ((saved-pause (get-text-property ,start 'pause)))
     (with-silent-modifications
       (unwind-protect
           (progn
             (put-text-property
              (max (point-min) ,start)
              (min (point-max) ,end)
              'pause ,duration)
             ,@body)
         (put-text-property
          (max (point-min) ,start)
          (min (point-max) ,end) 'pause saved-pause)))))

(defmacro ems-with-errors-silenced (&rest body)
  "Evaluate body  after temporarily silencing auditory error feedback."
  (declare (indent 1) (debug t))
  `(let ((emacspeak-speak-errors nil)
         (emacspeak-speak-messages nil))
     ,@body))

;;}}}
;;{{{ getting and speaking text ranges

(defun emacspeak-speak-get-text-range (prop)
  "Return text range  around   point  as determined by property `prop'."
  (let* ((end (next-single-property-change (point) prop nil (point-max)))
         (start (previous-single-property-change end prop nil (point-min))))
    (buffer-substring start end)))

(defun emacspeak-speak-text-range (property)
  "Speak text range identified by this PROPERTY."
  (interactive)
  (dtk-speak (emacspeak-speak-get-text-range property)))

;;}}}
;;{{{  Apply audio annotations

(defun emacspeak-audio-annotate-paragraphs ()
  "Set property auditory-icon at front of all paragraphs."
  (save-excursion
    (goto-char (point-max))
    (with-silent-modifications
      (let ((sound-cue 'paragraph))
        (while (not (bobp))
          (backward-paragraph)
          (put-text-property (point) (+ 2 (point))
                             'auditory-icon sound-cue))))))

(defcustom emacspeak-speak-paragraph-personality voice-animate
  "Personality used to mark start of paragraph."
  :group 'emacspeak-speak
  :type 'symbol)

(defvar-local  emacspeak-speak-voice-annotated-paragraphs nil
  "Records if paragraphs in this buffer have been voice annotated.")

(defun emacspeak-speak-voice-annotate-paragraphs ()
  "Locate paragraphs and voice annotate the first word.
Here, paragraph is taken to mean a chunk of text preceded by a blank line.
Useful to do this before you listen to an entire buffer."
  (interactive)
  (cl-declare (special emacspeak-speak-paragraph-personality
                       emacspeak-speak-voice-annotated-paragraphs))
  (when
      (and  emacspeak-speak-paragraph-personality
            (null emacspeak-speak-voice-annotated-paragraphs)) ; memoized
    (save-excursion
      (goto-char (point-min))
      (condition-case nil
          (let ((start nil)
                (blank-line "\n[ \t\n\r]*\n")
                (inhibit-point-motion-hooks t)
                (inhibit-modification-hooks t)
                (deactivate-mark nil))
            (with-silent-modifications
              (while (re-search-forward blank-line nil t)
                (skip-syntax-forward " ")
                (setq start (point))
                (unless (get-text-property start 'personality)
                  (skip-syntax-forward "^ ")
                  (put-text-property
                   start (point)
                   'personality emacspeak-speak-paragraph-personality)))))
        (error nil))
      (setq emacspeak-speak-voice-annotated-paragraphs t))))

;;}}}
;;{{{  sync emacspeak and TTS:

(defun ems-sync-mode-punctuation-setting (mode)
  "Update per-mode punctuation setting if needed."
  (cl-declare (special dtk-punctuation-mode))
  (let ((p (ems-get-mode-punctuation-setting mode)))
    (when (and p (not (eq p dtk-punctuation-mode)))
      (dtk-set-punctuations p))))

(cl--defalias 'emacspeak-dtk-sync 'dtk-interp-sync)
;;;###autoload
(defun emacspeak-speak-set-mode-punctuations (setting)
  "Set punctuation mode for all buffers in current mode."
  (interactive
   (list
    (intern (completing-read "Punctuation Mode: " '(all none some)))))
  (cl-declare (special major-mode))
  (ems-set-mode-punctuation-setting major-mode setting)
  (ems-sync-mode-punctuation-setting major-mode)
  (when (called-interactively-p 'interactive)
    (message "Set punctuations to %s in %s" setting mode-name)
    (emacspeak-auditory-icon 'select-object)))

;;}}}
;;{{{ helper function --decode ISO date-time used in ical:

(defvar emacspeak-speak-iso-datetime-pattern
  "[0-9]\\{8\\}\\(T[0-9]\\{6\\}\\)Z?"
  "Regexp pattern that matches ISO date-time.")

(defun emacspeak-speak-decode-iso-datetime (iso)
  "Return a speakable string description."
  (cl-declare (special emacspeak-speak-time-format-string))
  (let ((year (read (substring iso 0 4)))
        (month (read (substring iso 4 6)))
        (day (read (substring iso 6 8)))
        (hour 0)
        (minute 0)
        (second 0))
    (when (> (length iso) 12) ;; hour/minute
      (setq hour (read (substring iso 9 11)))
      (setq minute (read (substring iso 11 13))))
    (when (> (length iso) 14) ;; seconds
      (setq second (read (substring iso 13 15))))
    (when (and (> (length iso) 15) ;; utc specifier
               (char-equal ?Z (aref iso 15)))
      (setq second (+ (car (current-time-zone
                            (encode-time second minute hour day month
                                         year))) second)))
    ;; create the decoded date-time
    (condition-case nil
        (format-time-string emacspeak-speak-time-format-string
                            (encode-time second minute hour day month
                                         year))
      (error iso))))

;;}}}
;;{{{ helper function --decode rfc 3339 date-time

(defvar emacspeak-speak-rfc-3339-datetime-pattern
  "[0-9]\\{4\\}-[0-9]\\{2\\}-[0-9]\\{2\\}T[0-9]\\{2\\}:[0-9]\\{2\\}:[0-9]\\{2\\}\\(\\.[0-9]\\{3\\}\\)?\\([zZ]\\|\\([+-][0-9]\\{2\\}:[0-9]\\{2\\}\\)\\)"
  "Regexp pattern that matches RFC 3339 date-time.")

(defun ems-speak-rfc-3339-tz-offset (rfc-3339)
  "Return offset in seconds from UTC given an RFC-3339 time.
  Timezone spec is of the form -08:00 or +05:30 or [zZ] for UTC.
Value returned is compatible with `encode-time'."
  (cond
   ((string-match "[zZ]" (substring rfc-3339 -1))
    t)
   (t                                ;compute positive/negative offset
                                        ;in seconds
    (let ((fields
           (mapcar
            'read
            (split-string (substring rfc-3339 -5) ":"))))
      (*
       (if (string-match "-" (substring rfc-3339 -6))
           -60
         60)
       (+ (* 60 (cl-first fields))
          (cl-second fields)))))))

(defun emacspeak-speak-decode-rfc-3339-datetime (rfc-3339)
  "Return a speakable string description."
  (cl-declare (special emacspeak-speak-time-format-string))
  (let ((year (read (substring rfc-3339 0 4)))
        (month (read (substring rfc-3339 5 7)))
        (day (read (substring rfc-3339 8 10)))
        (hour (read (substring rfc-3339 11 13)))
        (minute (read (substring rfc-3339 14 16)))
        (second (read (substring rfc-3339 17 19)))
        (tz (ems-speak-rfc-3339-tz-offset rfc-3339)))
    ;; create the decoded date-time
    (condition-case nil
        (format-time-string emacspeak-speak-time-format-string
                            (encode-time second minute hour day month
                                         year tz))
      (error rfc-3339))))

;;}}}
;;{{{  url link pattern:

(defcustom emacspeak-speak-embedded-url-pattern
  "<https?:[^ \t]*>"
  "Pattern to recognize embedded URLs."
  :type 'string
  :group 'emacspeak-speak)

;;}}}
;;{{{  Actions

;;; Setting value of property 'emacspeak-action to a list
;;; of the form (before | after function)
;;; function to be executed before or after the unit of text at that
;;; point is spoken.

(defvar emacspeak-action-mode nil
  "Determines if action mode is active.
Non-nil value means that any function that is set as the
value of property action is executed when the text at that
point is spoken.")

(make-variable-buffer-local 'emacspeak-action-mode)

;;; Record in the mode line
(or
 (assq 'emacspeak-action-mode minor-mode-alist)
 (setq minor-mode-alist
       (append minor-mode-alist
               '((emacspeak-action-mode " Action")))))

;;; Return the appropriate action hook variable that defines actions
;;; for this mode.

(defun emacspeak-action-get-action-hook (mode)
  "Retrieve action hook.
Argument MODE defines action mode."
  (intern (format "emacspeak-%s-actions-hook" mode)))

;;; Execute action at point
(defun emacspeak-handle-action-at-point (&optional pos)
  "Execute action specified at point."
  (cl-declare (special emacspeak-action-mode))
  (setq pos (or pos (point)))
  (let ((action-spec (get-text-property (point) 'emacspeak-action)))
    (when (and emacspeak-action-mode action-spec)
      (condition-case nil
          (funcall action-spec)
        (error (message "Invalid actionat %s" (point)))))))

(ems-generate-switcher 'emacspeak-toggle-action-mode
                       'emacspeak-action-mode
                       "Toggle state of  Emacspeak  action mode.
Interactive PREFIX arg means toggle  the global default value, and then set the
current local  value to the result.")

;;}}}
;;{{{ Showing the point:

(defvar emacspeak-show-point nil
  " If T, then command  `emacspeak-speak-line' indicates position of point by an
aural highlight.  You can use
command `emacspeak-toggle-show-point' bound to
\\[emacspeak-toggle-show-point] to toggle this setting.")

(ems-generate-switcher 'emacspeak-toggle-show-point
                       'emacspeak-show-point
                       "Toggle state of  Emacspeak-show-point.
Interactive PREFIX arg means toggle  the global default value, and then set the
current local  value to the result.")

;;}}}
;;{{{ compute percentage into the buffer:

(defun emacspeak-get-current-percentage-into-buffer ()
  "Return percentage of position into current buffer."
  (let* ((pos (point))
         (total (buffer-size))
         (percent (if (> total 50000)
                      ;; Avoid overflow from multiplying by 100!
                      (/ (+ (/ total 200) (1- pos)) (max (/ total 100) 1))
                    (/ (+ (/ total 2) (* 100 (1- pos))) (max total 1)))))
    percent))

(defun emacspeak-get-current-percentage-verbously ()
  "Return percentage of position into current buffer as a string."
  (let ((percent (emacspeak-get-current-percentage-into-buffer)))
    (cond
     ((= 0 percent) " top ")
     ((= 100 percent) " bottom ")
     (t (format " %d%% " percent)))))

(defun emacspeak-goto-percent (percent)
  "Move to end  PERCENT of buffer like in View mode.
Display is centered at point.
Also set the mark at the position where point was."
  (interactive "nPercent:")
  (push-mark)
  (goto-char
   (if percent
       (+ (point-min)
          (floor (* (- (point-max) (point-min)) 0.01
                    (max 0 (min 100 (prefix-numeric-value percent))))))
     (point-max)))
  (recenter)
  (emacspeak-auditory-icon 'large-movement)
  (emacspeak-speak-line))

;;}}}
;;{{{  indentation:

(defcustom emacspeak-audio-indentation nil
  "Option indicating if line indentation is cued.
If non-nil , then speaking a line indicates its indentation.
You can use  command `emacspeak-toggle-audio-indentation' bound
to \\[emacspeak-toggle-audio-indentation] to toggle this
setting.."
  :group 'emacspeak-speak
  :type 'boolean)

(make-variable-buffer-local 'emacspeak-audio-indentation)

;;; Indicate indentation.
;;; Argument indent   indicates number of columns to indent.

(defun ems--tone-indent (indent)
  "Produce tone indent."
  (when (> indent 1)
    (let ((duration (+ 50 (* 20 indent)))
          (dtk-stop-immediately nil))
      (dtk-tone 250 duration))))

(defvar emacspeak-audio-indentation-methods
  '(("speak" . "speak")
    ("tone" . "tone"))
  "Possible methods of indicating indentation.")

(defcustom emacspeak-audio-indentation-method 'speak
  "Current technique used to cue indentation.  Default is
`speak'.  You can specify `tone' for producing a beep
indicating the indentation.  Automatically becomes local in
any buffer where it is set."
  :group 'emacspeak-speak
  :type '(choice
          (const :tag "Ignore" nil)
          (const :tag "speak" speak)
          (const :tag "tone" tone)))

(make-variable-buffer-local
 'emacspeak-audio-indentation-method)
;;;###autoload
(ems-generate-switcher 'emacspeak-toggle-audio-indentation
                       'emacspeak-audio-indentation
                       "Toggle state of  Emacspeak  audio indentation.
Interactive PREFIX arg means toggle  the global default value, and then set the
current local  value to the result.
Specifying the method of indentation as `tones'
results in the Dectalk producing a tone whose length is a function of the
line's indentation.  Specifying `speak'
results in the number of initial spaces being spoken.")

;;}}}
;;{{{ filtering columns

(defcustom emacspeak-speak-line-column-filter nil
  "List that specifies columns to be filtered.
The list when set holds pairs of start-col.end-col pairs
that specifies the columns that should not be spoken.
Each column contains a single character --this is inspired
by cut -c on UNIX."
  :group 'emacspeak-speak
  :type '(choice
          (const :tag "None" nil)
          (repeat :tag "Filter Specification"
                  (list
                   (integer :tag "Start Column")
                   (integer :tag "End Column")))))

(defvar emacspeak-speak-filter-table (make-hash-table)
  "Hash table holding persistent filters.")

(make-variable-buffer-local 'emacspeak-speak-line-column-filter)

(defvar emacspeak-speak-line-invert-filter nil
  "Non-nil means the sense of `filter' is inverted when filtering
columns in a line --see
command emacspeak-speak-line-set-column-filter.")

(make-variable-buffer-local 'emacspeak-speak-line-invert-filter)

(ems-generate-switcher 'emacspeak-toggle-speak-line-invert-filter
                       'emacspeak-speak-line-invert-filter
                       "Toggle state of   how column filter is interpreted.
Interactive PREFIX arg means toggle  the global default value, and then set the
current local  value to the result.")

(defun emacspeak-speak-line-apply-column-filter (line &optional invert-filter)
  (cl-declare (special emacspeak-speak-line-column-filter))
  (let ((filter emacspeak-speak-line-column-filter)
        (l (length line))
        (pair nil)
        (personality (if invert-filter nil
                       'inaudible)))
    (with-silent-modifications
      (when invert-filter
        (put-text-property 0 l
                           'personality 'inaudible line))
      (while filter
        (setq pair (pop filter))
        (when (and (<= (cl-first pair) l)
                   (<= (cl-second pair) l))
          (put-text-property (cl-first pair)
                             (cl-second pair)
                             'personality personality
                             line))))
    line))

(defun emacspeak-speak-persist-filter-entry (k v)
  (insert
   (format
    "(puthash
(intern \"%s\")
'%s
emacspeak-speak-filter-table)\n" k v)))

(defcustom emacspeak-speak-filter-persistent-store
  (expand-file-name ".filters"
                    emacspeak-resource-directory)
  "File where emacspeak filters are persisted."
  :type 'file
  :group 'emacspeak-speak)

(defvar emacspeak-speak-filters-loaded-p nil
  "Records if we    have loaded filters in this session.")

(defun emacspeak-speak-lookup-persistent-filter (key)
  "Lookup a filter setting we may have persisted."
  (cl-declare (special emacspeak-speak-filter-table))
  (gethash (intern key) emacspeak-speak-filter-table))

(defun emacspeak-speak-set-persistent-filter (key value)
  "Persist filter setting for future use."
  (cl-declare (special emacspeak-speak-filter-table))
  (setf (gethash (intern key) emacspeak-speak-filter-table)
        value))

(defun emacspeak-speak-persist-filter-settings ()
  "Persist emacspeak filter settings for future sessions."
  (cl-declare (special emacspeak-speak-filter-persistent-store
                       emacspeak-speak-filter-table))
  (emacspeak--persist-variable
   'emacspeak-speak-filter-table
   emacspeak-speak-filter-persistent-store))

(defun emacspeak-speak-load-filter-settings ()
  "Load emacspeak filter settings."
  (cl-declare (special emacspeak-speak-filter-persistent-store
                       emacspeak-speak-filter-table
                       emacspeak-speak-filters-loaded-p))
  (unless emacspeak-speak-filters-loaded-p
    (load-file emacspeak-speak-filter-persistent-store)
    (setq emacspeak-speak-filters-loaded-p t)
    (add-hook 'kill-emacs-hook 'emacspeak-speak-persist-filter-settings)))

(defun emacspeak-speak-line-set-column-filter (filter)
  "Set up filter for selectively speaking or ignoring portions of lines.
The filter is specified as a list of pairs.
For example, to filter  columns 1 -- 10 and 20 -- 25,
specify filter as
((0 9) (20 25)). Filter settings are persisted across sessions.  A
persisted filter is used as the default when prompting for a filter.
This allows one to accumulate a set of filters for specific files like
/var/adm/messages and /var/adm/maillog over time.
Option emacspeak-speak-line-invert-filter determines
the sense of the filter. "
  (interactive
   (list
    (progn
      (emacspeak-speak-load-filter-settings)
      (read-minibuffer
       (format
        "Specify columns to %s: "
        (if emacspeak-speak-line-invert-filter
            " speak"
          "filter out"))
       (format "%s"
               (if (buffer-file-name)
                   (emacspeak-speak-lookup-persistent-filter (buffer-file-name))
                 ""))))))
  (cond
   ((and (listp filter)
         (cl-every
          #'(lambda (l)
              (and (listp l)
                   (= 2 (length l))))
          filter))
    (setq emacspeak-speak-line-column-filter filter)
    (when (buffer-file-name)
      (emacspeak-speak-set-persistent-filter (buffer-file-name) filter)))
   (t
    (message "Unset column filter")
    (setq emacspeak-speak-line-column-filter nil))))

;;}}}
;;{{{  Speak units of text

(defun emacspeak-speak-region (start end)
  "Speak region.
Argument START  and END specify region to speak."
  (interactive "r")
  (cl-declare (special emacspeak-speak-voice-annotated-paragraphs
                       inhibit-point-motion-hooks))
  (let ((inhibit-point-motion-hooks t)
        (inhibit-modification-hooks t)
        (deactivate-mark nil))
    (when (not emacspeak-speak-voice-annotated-paragraphs)
      (save-restriction
        (narrow-to-region start end)
        (emacspeak-speak-voice-annotate-paragraphs)))
    (emacspeak-handle-action-at-point)
    (dtk-stop)
    (dtk-speak (buffer-substring start end))))

(defun emacspeak-speak-string (string personality)
  "Apply personality to string and speak it."
  (put-text-property 0 (length string)
                     'personality personality string)
  (dtk-speak string))

(defvar emacspeak-horizontal-rule "^\\([=_-]\\)\\1+$"
  "Regular expression to match horizontal rules in ascii text.")

(put 'emacspeak-horizontal-rule 'variable-interactive
     "sEnterregular expression to match horizontal rule: ")

(defvar emacspeak-decoration-rule
  "^[ \t!@#$%^&*()<>|_=+/\\,.;:-]+$"
  "Regular expressions to match lines that are purely decorative ascii.")

(put 'emacspeak-decoration-rule 'variable-interactive
     "sEnterregular expression to match lines that are decorative ASCII: ")

(defvar emacspeak-unspeakable-rule
  "^[^0-9a-zA-Z]+$"
  "Pattern to match lines of special chars.
This is a regular expression that matches lines containing only
non-alphanumeric characters.  emacspeak will generate a tone
instead of speaking such lines when punctuation mode is set
to some.")

(put 'emacspeak-unspeakable-rule 'variable-interactive
     "sEnterregular expression to match unspeakable lines: ")

(defcustom emacspeak-speak-maximum-line-length 512
  "Threshold for determining `long' lines.
Emacspeak will ask for confirmation before speaking lines
that are longer than this length.  This is to avoid accidentally
opening a binary file and torturing the speech synthesizer
with a long string of gibberish."
  :group 'emacspeak-speak
  :type 'number)

(make-variable-buffer-local 'emacspeak-speak-maximum-line-length)

(defvar emacspeak-speak-blank-line-regexp
  "^[[:space:]]+$"
  "Pattern that matches white space.")
;;; Forward Declaration:
(defvar linum-mode nil)

;;;###autoload
(defun emacspeak-speak-line (&optional arg)
  "Speaks current line.  With prefix ARG, speaks the rest of the line
from point.  Negative prefix optional arg speaks from start of line to
point.  Voicifies if option `voice-lock-mode' is on.  Indicates
indentation with a tone or a spoken message if audio indentation is in
use see `emacspeak-toggle-audio-indentation' bound to
\\[emacspeak-toggle-audio-indentation].  Indicates position of point
with an aural highlight if option `emacspeak-show-point' is turned on
--see command `emacspeak-toggle-show-point' bound to
\\[emacspeak-toggle-show-point].  Lines that start hidden blocks of text,
e.g.  outline header lines, or header lines of blocks created by
command `emacspeak-hide-or-expose-block' are indicated with auditory
icon ellipses. Presence of additional presentational overlays (created
via property display, before-string, or after-string) is indicated
with auditory icon `more'.  These can then be spoken using command
\\[emacspeak-speak-overlay-properties]."
  (interactive "P")
  (cl-declare (special voice-animate voice-indent linum-mode
                       dtk-stop-immediately dtk-punctuation-mode
                       dtk-cleanup-repeats
                       emacspeak-speak-line-invert-filter emacspeak-speak-blank-line-regexp
                       emacspeak-speak-maximum-line-length emacspeak-show-point
                       emacspeak-decoration-rule emacspeak-horizontal-rule
                       emacspeak-unspeakable-rule emacspeak-audio-indentation))
  (when (listp arg) (setq arg (car arg)))
  (when dtk-stop-immediately (dtk-stop))
  (let ((inhibit-field-text-motion t)
        (dtk-cleanup-repeats
         (cond
          ((and emacspeak-show-point
                (= ?\) (char-syntax (following-char)))))
          (t dtk-cleanup-repeats)))
        (inhibit-read-only t)
        (inhibit-point-motion-hooks t)
        (inhibit-modification-hooks t)
        (icon (get-char-property (point) 'auditory-icon))
        (before (get-char-property (point) 'before-string))
        (after (get-char-property (point) 'after-string))
        (display (get-char-property (point) 'display))
        (start nil)
        (end nil)
        (line nil)
        (orig (point))
        (linenum
         (when
             (or (bound-and-true-p display-line-numbers)
                 (bound-and-true-p linenum-mode))
           (line-number-at-pos)))
        (indent nil))
    (setq start (line-beginning-position)
          end (line-end-position))
;;;determine what to speak based on prefix arg
    (cond
     ((null arg))
     ((> arg 0) (setq start orig))
     (t (setq end orig)))
    (when icon (emacspeak-auditory-icon icon))
    (when emacspeak-show-point
      (emacspeak-auditory-icon
       (cond
        ((bolp) 'left)
        ((eolp) 'right)
        (t 'tick-tick))))
    (setq line
          (if emacspeak-show-point
              (ems-set-pause-temporarily
               orig (1+ orig) 5
               (ems-set-personality-temporarily
                orig (1+ orig) voice-animate
                (buffer-substring start end)))
            (buffer-substring start end)))
    (when (and (null arg) emacspeak-speak-line-column-filter)
      (setq
       line
       (emacspeak-speak-line-apply-column-filter
        line emacspeak-speak-line-invert-filter)))
    (when emacspeak-audio-indentation (setq indent (current-indentation)))
    (when (and (null arg) emacspeak-audio-indentation
               (eq emacspeak-audio-indentation-method 'tone))
      (ems--tone-indent indent))
    (when (or (invisible-p end)
              (get-text-property start 'emacspeak-hidden-block))
      (emacspeak-auditory-icon 'ellipses))
    (when (or display before after) (emacspeak-auditory-icon 'more))
    (cond
;;; C1..C5
     ((string-equal "" line)
      (dtk-tone 130.8 150 'force))
     ((string-match emacspeak-speak-blank-line-regexp line) ;only white space
      (dtk-tone 261.6 150 'force))
     ((and (not (eq 'all dtk-punctuation-mode))
           (string-match emacspeak-horizontal-rule line))
      (dtk-tone 523.3 150 t))
     ((and (not (eq 'all dtk-punctuation-mode))
           (string-match emacspeak-decoration-rule line))
      (dtk-tone 1047 150 t))
     ((and (not (eq 'all dtk-punctuation-mode))
           (string-match emacspeak-unspeakable-rule line))
      (dtk-tone 2093 150 t))
     (t
      (let*
          ((l (length line))
           (speakable ;; should we speak this line?
            (cond
             ((or selective-display
                  (< l emacspeak-speak-maximum-line-length)
                  (get-text-property start 'speak-line))
              t)
             ((y-or-n-p (format "Speak  this  %s long line? " l))
              (setq emacspeak-speak-maximum-line-length (1+ l))
              (with-silent-modifications
                (put-text-property start end 'speak-line t))
              t))))
        (when speakable
          (when
              (and (null arg) indent (> indent 0)
                   (eq 'speak emacspeak-audio-indentation-method))
            (setq indent (format "indent %d" indent))
            (setq indent (propertize indent 'personality voice-indent))
            (setq line (concat indent line)))
          (when linenum
            (setq linenum (format "%d" linenum))
            (setq linenum (propertize linenum 'personality voice-lighten))
            (setq line (concat linenum line)))
          (dtk-speak line)))))))

(defun emacspeak-speak-overlay-properties ()
  "Speak display, before-string or after-string property if any."
  (interactive)
  (let ((before (get-char-property (point) 'before-string))
        (after (get-char-property (point) 'after-string))
        (display (get-char-property (point) 'display))
        (result nil))
    (setq result
          (concat
           (when (stringp display) display)
           (when (stringp before) before)
           (when (stringp after) after)))
    (cond
     ((or (null result) (= 0 (length result)))
      (message "No speakable overlay properties here."))
     (t
      (emacspeak-auditory-icon 'ellipses)
      (dtk-speak result)))))

;;;###autoload
(defun emacspeak-speak-visual-line ()
  "Speaks current visual line.
Cues the start of a physical line with auditory icon `left'."
  (interactive)
  (cl-declare (special dtk-stop-immediately emacspeak-show-point))
  (when dtk-stop-immediately (dtk-stop))
  (let ((inhibit-field-text-motion t)
        (inhibit-read-only t)
        (start nil)
        (end nil)
        (inhibit-point-motion-hooks t)
        (inhibit-modification-hooks t)
        (line nil)
        (orig (point)))
    (cond
     ((looking-at "^ *") (emacspeak-auditory-icon 'left))
     ((looking-at " *$") (emacspeak-auditory-icon 'right)))
    (save-excursion
      (beginning-of-visual-line)
      (setq start (point))
      (end-of-visual-line)
      (setq end (point))
      (setq line
            (if emacspeak-show-point
                (ems-set-personality-temporarily
                 orig (1+ orig)
                 voice-animate (buffer-substring start end))
              (buffer-substring start end)))
      (dtk-speak line))))

(defvar emacspeak-speak-last-spoken-word-position nil
  "Records position of the last word that was spoken.
Local to each buffer.  Used to decide if we should spell the word
rather than speak it.")

(make-variable-buffer-local 'emacspeak-speak-last-spoken-word-position)
(defun emacspeak-speak-spell-word (word)
  "Spell WORD."
  (cl-declare (special voice-animate))
  (let ((result "")
        (char-string ""))
    (cl-loop for char across word
             do
             (setq char-string (format "%c " char))
             (when (and (<= ?A char)
                        (<= char ?Z))
               (put-text-property 0 1
                                  'personality voice-animate
                                  char-string)
               (setq char-string (format "cap %s " char-string)))
             (setq result
                   (concat result
                           char-string)))
    (dtk-speak result)))

;;;###autoload
(defun emacspeak-speak-spell-current-word ()
  "Spell word at  point."
  (interactive)
  (emacspeak-speak-spell-word (word-at-point)))

;;;###autoload
(defun emacspeak-speak-word (&optional arg)
  "Speak current word.
With prefix ARG, speaks the rest of the word from point.
Negative prefix arg speaks from start of word to point.
If executed  on the same buffer position a second time, the word is
spelled out  instead of being spoken."
  (interactive "P")
  (cl-declare (special emacspeak-speak-last-spoken-word-position))
  (when (listp arg) (setq arg (car arg)))
  (emacspeak-handle-action-at-point)
  (save-excursion
    (let ((orig (point))
          (inhibit-point-motion-hooks t)
          (inhibit-modification-hooks t)
          (inhibit-field-text-motion  t)
          (start nil)
          (end nil)
          (speaker 'dtk-speak))
      (forward-word 1)
      (setq end (point))
      (backward-word 1)
      (setq start (min orig (point)))
      (cond
       ((null arg))
       ((> arg 0) (setq start orig))
       ((< arg 0) (setq end orig)))
      ;; select speak or spell
      (cond
       ((and (called-interactively-p 'interactive)
             (eq emacspeak-speak-last-spoken-word-position orig))
        (setq speaker 'emacspeak-speak-spell-word)
        (setq emacspeak-speak-last-spoken-word-position nil))
       (t (setq emacspeak-speak-last-spoken-word-position orig)))
      (funcall speaker (buffer-substring start end)))))

(defun emacspeak-is-alpha-p (c)
  "Check if argument C is an alphabetic character."
  (and (= ?w (char-syntax c))
       (dtk-unicode-char-untouched-p c)))

;;{{{  phonemic table

(defvar emacspeak-char-to-phonetic-table
  '(
    ("1" . "one")
    ("2" . "two")
    ("3" . "three")
    ("4" . "four")
    ("5" . "five")
    ("6" . "six")
    ("7" . "seven")
    ("8" . "eight")
    ("9" . "nine")
    ("0" .  "zero")
    ("a" . "alpha")
    ("b" . "bravo")
    ("c" . "charlie")
    ("d" . "delta")
    ("e" . "echo")
    ("f" . "foxtrot")
    ("g" . "golf")
    ("h" . "hotel")
    ("i" . "india")
    ("j" . "juliet")
    ("k" . "kilo")
    ("l" . "lima")
    ("m" . "mike")
    ("n" . "november")
    ("o" . "oscar")
    ("p" . "poppa")
    ("q" . "quebec")
    ("r" . "romeo")
    ("s" . "sierra")
    ("t" . "tango")
    ("u" . "uniform")
    ("v" . "victor")
    ("w" . "whisky")
    ("x" . "xray")
    ("y" . "yankee")
    ("z" . "zulu")
    ("A" . "cap alpha")
    ("B" . "cap bravo")
    ("C" . "cap charlie")
    ("D" . "cap delta")
    ("E" . "cap echo")
    ("F" . "cap foxtrot")
    ("G" . "cap golf")
    ("H" . "cap hotel")
    ("I" . "cap india")
    ("J" . "cap juliet")
    ("K" . "cap kilo")
    ("L" . "cap lima")
    ("M" . "cap mike")
    ("N" . "cap november")
    ("O" . "cap oscar")
    ("P" . "cap poppa")
    ("Q" . "cap quebec")
    ("R" . "cap romeo")
    ("S" . "cap sierra")
    ("T" . "cap tango")
    ("U" . "cap uniform")
    ("V" . "cap victor")
    ("W" . "cap whisky")
    ("X" . "cap xray")
    ("Y" . "cap yankee")
    ("Z" . "cap zulu"))
  "Mapping from characters to their phonemic equivalents.")

(defun emacspeak-get-phonetic-string (char)
  "Return the phonetic string for this CHAR or its upper case equivalent.
char is assumed to be one of a--z."
  (cl-declare (special emacspeak-char-to-phonetic-table))
  (let ((char-string (char-to-string char)))
    (or (cdr
         (assoc char-string emacspeak-char-to-phonetic-table))
        (dtk-unicode-full-name-for-char char)
        char-string)))

;;}}}
;;{{{ Speak Chars:

(defun emacspeak-speak-this-char (char)
  "Speak this CHAR."
  (when char
    (cond
     ((emacspeak-is-alpha-p char) (dtk-letter (char-to-string char)))
     ((> char 128) (emacspeak-speak-char-name char))
     (t (dtk-dispatch (dtk-char-to-speech char))))))
;;;###autoload
(defun emacspeak-speak-char (&optional prefix)
  "Speak character under point.
Pronounces character phonetically unless  called with a PREFIX arg."
  (interactive "P")
  (let ((char (following-char))
        (display (get-char-property (point) 'display))
        (icon (get-char-property (point) 'auditory-icon)))
    (when icon (emacspeak-auditory-icon icon))
    (when display
      (emacspeak-auditory-icon 'ellipses)
      (and (listp display) (message "%s" (car display))))
    (when char
      (cond
       ((stringp display) (dtk-speak display))
       ((> char 128) (emacspeak-speak-char-name char))
       ((and (not prefix)
             (emacspeak-is-alpha-p char))
        (dtk-speak (emacspeak-get-phonetic-string char)))
       (t (emacspeak-speak-this-char char))))))

;;;###autoload
(defun emacspeak-speak-preceding-char ()
  "Speak character before point."
  (interactive)
  (let ((char (preceding-char))
        (display (get-char-property (1- (point)) 'display)))
    (when char
      (cond
       ((stringp display) (dtk-speak display))
       ((> char 128) (emacspeak-speak-char-name char))
       (t (emacspeak-speak-this-char char))))))

;;;###autoload
(defun emacspeak-speak-char-name (char)
  "tell me what this is"
  (interactive)
  (dtk-speak (dtk-unicode-name-for-char char)))

;;}}}
;;{{{ emacspeak-speak-display-char

;;;###autoload
(defun emacspeak-speak-display-char (&optional prefix)
  "Display char under point using current speech display table.
Behavior is the same as command `emacspeak-speak-char'
bound to \\[emacspeak-speak-char]
for characters in the range 0--127.
Optional argument PREFIX  specifies that the character should be spoken phonetically."
  (interactive "P")
  (cl-declare (special dtk-display-table))
  (let ((char (following-char)))
    (cond
     ((and dtk-display-table
           (> char 127))
      (dtk-dispatch (aref dtk-display-table char)))
     (t (emacspeak-speak-char prefix)))))

;;}}}
;;{{{ emacspeak-speak-set-display-table

(defvar emacspeak-speak-display-table-list
  '(("iso ascii" . "iso ascii")
    ("default" . "default"))
  "Available speech display tables.")

;;;###autoload
(defun emacspeak-speak-set-display-table (&optional prefix)
  "Sets up buffer specific speech display table that controls how
special characters are spoken. Interactive prefix argument causes
setting to be global."
  (interactive "P")
  (cl-declare (special dtk-display-table
                       dtk-iso-ascii-character-to-speech-table
                       emacspeak-speak-display-table-list))
  (let ((type (completing-read
               "Select speech display table: "
               emacspeak-speak-display-table-list
               nil t))
        (table nil))
    (cond
     ((string-equal "iso ascii" type)
      (setq table dtk-iso-ascii-character-to-speech-table))
     (t (setq table nil)))
    (cond
     (prefix
      (setq-default dtk-display-table table)
      (setq dtk-display-table table))
     (t (setq dtk-display-table table)))))

;;}}}
;;;###autoload
(defun emacspeak-speak-sentence (&optional arg)
  "Speak current sentence.
With prefix ARG, speaks the rest of the sentence  from point.
Negative prefix arg speaks from start of sentence to point."
  (interactive "P")
  (when (listp arg) (setq arg (car arg)))
  (save-excursion
    (let ((orig (point))
          (inhibit-point-motion-hooks t)
          (inhibit-modification-hooks t)
          (start nil)
          (end nil))
      (forward-sentence 1)
      (setq end (point))
      (backward-sentence 1)
      (setq start (point))
      (emacspeak-handle-action-at-point)
      (cond
       ((null arg))
       ((> arg 0) (setq start orig))
       ((< arg 0) (setq end orig)))
      (dtk-speak (buffer-substring start end)))))

;;;###autoload
(defun emacspeak-speak-sexp (&optional arg)
  "Speak current sexp.
With prefix ARG, speaks the rest of the sexp  from point.
Negative prefix arg speaks from start of sexp to point. "
  (interactive "P")
  (when (listp arg) (setq arg (car arg)))
  (save-excursion
    (let ((orig (point))
          (inhibit-point-motion-hooks t)
          (inhibit-modification-hooks t)
          (start nil)
          (end nil))
      (condition-case nil
          (forward-sexp 1)
        (error nil))
      (setq end (point))
      (condition-case nil
          (backward-sexp 1)
        (error nil))
      (setq start (point))
      (cond
       ((null arg))
       ((> arg 0) (setq start orig))
       ((< arg 0) (setq end orig)))
      (emacspeak-auditory-icon 'select-object)
      (dtk-speak (buffer-substring start end)))))

;;;###autoload
(defun emacspeak-speak-page (&optional arg)
  "Speak a page.
With prefix ARG, speaks rest of current page.
Negative prefix arg will read from start of current page to point.
If option  `voice-lock-mode' is on, then it will use any defined personality."
  (interactive "P")
  (when (listp arg) (setq arg (car arg)))
  (save-excursion
    (let ((orig (point))
          (inhibit-point-motion-hooks t)
          (start nil)
          (end nil))
      (mark-page)
      (setq start (point))
      (emacspeak-handle-action-at-point)
      (setq end (mark))
      (cond
       ((null arg))
       ((> arg 0) (setq start orig))
       ((< arg 0) (setq end orig)))
      (dtk-speak (buffer-substring start end)))))

;;;###autoload
(defun emacspeak-speak-paragraph (&optional arg)
  "Speak paragraph.
With prefix arg, speaks rest of current paragraph.
Negative prefix arg will read from start of current paragraph to point.
If voice-lock-mode is on, then it will use any defined personality. "
  (interactive "P")
  (when (listp arg) (setq arg (car arg)))
  (save-excursion
    (let ((orig (point))
          (inhibit-point-motion-hooks t)
          (start nil)
          (end nil))
      (forward-paragraph 1)
      (setq end (point))
      (backward-paragraph 1)
      (setq start (point))
      (emacspeak-handle-action-at-point)
      (cond
       ((null arg))
       ((> arg 0) (setq start orig))
       ((< arg 0) (setq end orig)))
      (dtk-speak (buffer-substring start end)))))

;;}}}
;;{{{  Speak buffer objects such as help, completions minibuffer etc

;;;###autoload
(defun emacspeak-speak-buffer (&optional arg)
  "Speak current buffer  contents.
With prefix ARG, speaks the rest of the buffer from point.
Negative prefix arg speaks from start of buffer to point.
 If voice lock mode is on, the paragraphs in the buffer are
voice annotated first,  see command `emacspeak-speak-voice-annotate-paragraphs'."
  (interactive "P")
  (cl-declare (special emacspeak-speak-voice-annotated-paragraphs
                       inhibit-point-motion-hooks))
  (let ((inhibit-point-motion-hooks t))
    (when (not emacspeak-speak-voice-annotated-paragraphs)
      (emacspeak-speak-voice-annotate-paragraphs))
    (when (listp arg) (setq arg (car arg)))
    (dtk-stop)
    (let ((start nil)
          (end nil))
      (cond
       ((null arg)
        (setq start (point-min)
              end (point-max)))
       ((> arg 0)
        (setq start (point)
              end (point-max)))
       (t (setq start (point-min)
                end (point))))
      (dtk-speak (buffer-substring start end)))))

;;;###autoload
(defun emacspeak-speak-other-buffer (buffer)
  "Speak specified buffer.
Useful to listen to a buffer without switching  contexts."
  (interactive
   (list
    (read-buffer "Speak buffer: "
                 nil t)))
  (save-current-buffer
    (set-buffer buffer)
    (emacspeak-speak-buffer)))

;;;###autoload
(defun emacspeak-speak-front-of-buffer ()
  "Speak   the buffer from start to   point"
  (interactive)
  (emacspeak-speak-buffer -1))

;;;###autoload
(defun emacspeak-speak-rest-of-buffer ()
  "Speak remainder of the buffer starting at point"
  (interactive)
  (emacspeak-auditory-icon 'select-object)
  (emacspeak-speak-buffer 1))

;;;###autoload
(defun emacspeak-speak-help (&optional arg)
  "Speak help buffer if one present.
With prefix arg, speaks the rest of the buffer from point.
Negative prefix arg speaks from start of buffer to point."
  (interactive "P")
  (let ((help-buffer (get-buffer "*Help*")))
    (cond
     (help-buffer
      (emacspeak-auditory-icon 'help)
      (save-current-buffer
        (set-buffer help-buffer)
        (emacspeak-speak-buffer arg)))
     (t (emacspeak-auditory-icon 'button)
        (dtk-speak "First ask for help")))))

;;;###autoload

;;;###autoload
(defun emacspeak-speak-minibuffer (&optional arg)
  "Speak the minibuffer contents
 With prefix arg, speaks the rest of the buffer from point.
Negative prefix arg speaks from start of buffer to point."
  (interactive "P")
  (let ((minibuff (window-buffer (minibuffer-window))))
    (save-current-buffer
      (set-buffer minibuff)
      (emacspeak-speak-buffer arg))))

;;;###autoload
(defun emacspeak-get-current-completion ()
  "Return the completion string under point in the *Completions* buffer."
  (let (beg end)
    (if (and (not (eobp)) (get-text-property (point) 'mouse-face))
        (setq end (point) beg (1+ (point))))
    (if (and (not (bobp)) (get-text-property (1- (point)) 'mouse-face))
        (setq end (1- (point)) beg (point)))
    (if (null beg)
        (error "No current  completion "))
    (setq beg (or
               (previous-single-property-change beg 'mouse-face)
               (point-min)))
    (setq end (or (next-single-property-change end 'mouse-face) (point-max)))
    (buffer-substring beg end)))

;;}}}
;;{{{ mail check
(defcustom emacspeak-mail-spool-file
  (expand-file-name
   (user-login-name)
   (if (boundp 'rmail-spool-directory)
       rmail-spool-directory
     "/usr/spool/mail/"))
  "Mail spool file examined  to alert you about newly
arrived mail."
  :type '(choice
          (const :tag "None" nil)
          (file :tag "Mail drop location"))
  :group 'emacspeak-speak)

(defcustom emacspeak-voicemail-spool-file
  nil
  "Mail spool file examined  to alert you about newly
arrived voicemail."
  :type '(choice
          (const :tag "None" nil)
          (file :tag "VoiceMail drop location"))
  :group 'emacspeak-speak)

(defun emacspeak-get-file-size (filename)
  "Return file size for file FILENAME."
  (or (nth 7 (file-attributes filename))
      0))

(defvar emacspeak-mail-last-alerted-time (list 0 0)
  "Least  significant 16 digits of the time when mail alert was last issued.
Alert the user only if mail has arrived since this time in the
  future.")

(defun emacspeak-mail-get-last-mail-arrival-time (f)
  "Return time when mail  last arrived."
  (if (file-exists-p f)
      (nth 5 (file-attributes f))
    0))

(defcustom emacspeak-mail-alert-interval 300
  "Interval in seconds between mail alerts for the same pending
  message."
  :type 'integer
  :group 'emacspeak-speak)
(defun emacspeak-mail-alert-user-p (f)
  "Predicate to check if we need to play an alert for the specified spool."
  (cl-declare (special emacspeak-mail-last-alerted-time
                       emacspeak-mail-alert-interval))
  (let* ((mod-time (emacspeak-mail-get-last-mail-arrival-time f))
         (size (emacspeak-get-file-size f))
         (result (and (> size 0)
                      (or
                       (null emacspeak-mail-last-alerted-time)
                       (time-less-p emacspeak-mail-last-alerted-time mod-time) ; new mail
                       (time-less-p     ;unattended mail
                        (time-add emacspeak-mail-last-alerted-time
                                  (list 0 emacspeak-mail-alert-interval))
                        (current-time))))))
    (when result
      (setq emacspeak-mail-last-alerted-time (current-time)))
    result))

(defun emacspeak-mail-alert-user ()
  "Alerts user about the arrival of new mail."
  (cl-declare (special emacspeak-mail-spool-file emacspeak-voicemail-spool-file))
  (when (and emacspeak-mail-spool-file
             (emacspeak-mail-alert-user-p emacspeak-mail-spool-file))
    (emacspeak-auditory-icon 'new-mail))
  (when (and emacspeak-voicemail-spool-file
             (emacspeak-mail-alert-user-p emacspeak-voicemail-spool-file))
    (emacspeak-auditory-icon 'voice-mail)))

(defcustom emacspeak-mail-alert t
  "Option to indicate cueing of new mail.
If t, emacspeak will alert you about newly arrived mail
with an auditory icon when
displaying the mode line.
You can use command
`emacspeak-toggle-mail-alert' bound to
\\[emacspeak-toggle-mail-alert] to set this option.
If you have online access to a voicemail drop, you can have a
  voice-mail alert set up by specifying the location of the
  voice-mail drop via custom option
emacspeak-voicemail-spool-file."
  :group 'emacspeak-speak
  :type 'boolean)

(ems-generate-switcher 'emacspeak-toggle-mail-alert
                       'emacspeak-mail-alert
                       "Toggle state of  Emacspeak  mail alert.
Interactive PREFIX arg means toggle  the global default value, and then set the
current local  value to the result.
Turning on this option results in Emacspeak producing an auditory icon
indicating the arrival  of new mail when displaying the mode line.")

;;}}}
;;{{{ Cache Voicefied mode-names

(defvar emacspeak-voicefied-mode-names
  (make-hash-table :test 'eq)
  "Hash table mapping mode-names to their voicefied equivalents.")

(defun emacspeak-get-voicefied-mode-name (m-name)
  "Return voicefied version of mode-name `m-name'"
  (cl-declare (special emacspeak-voicefied-mode-names))
  (let* ((mode-name-str
          (if (stringp m-name)
              m-name
            (format-mode-line m-name)))
         (result (gethash mode-name-str emacspeak-voicefied-mode-names)))
    (or result
        (progn
          (setq result (copy-sequence mode-name-str))
          (put-text-property 0 (length result)
                             'personality voice-animate result)
          (puthash mode-name-str result emacspeak-voicefied-mode-names)
          result))))

;;}}}
;;{{{ Cache Voicefied buffer-names

(defvar emacspeak-voicefied-buffer-names
  (make-hash-table :test 'eq)
  "Hash table mapping buffer-names to their voicefied equivalents.")

(defun emacspeak-get-voicefied-buffer-name (buffer-name)
  "Return voicefied version of this buffer-name."
  (cl-declare (special emacspeak-voicefied-buffer-names))
  (let ((result (gethash buffer-name emacspeak-voicefied-buffer-names)))
    (or result
        (progn
          (setq result (copy-sequence buffer-name))
          (put-text-property 0 (length result)
                             'personality voice-lighten-medium result)
          (puthash buffer-name result emacspeak-voicefied-buffer-names)
          result))))

(defvar emacspeak-voicefied-recursion-info
  (make-hash-table :test 'eq)
  "Hash table mapping recursive-depth levels  to their voicefied equivalents.")

(defun emacspeak-get-voicefied-recursion-info (level)
  "Return voicefied version of this recursive-depth level."
  (cl-declare (special emacspeak-voicefied-recursion-info))
  (cond
   ((zerop level) nil)
   (t
    (let ((result (gethash level emacspeak-voicefied-recursion-info)))
      (or result
          (progn
            (setq result (format " Recursive Edit %d " level))
            (put-text-property 0 (length result)
                               'personality voice-smoothen result)
            (puthash level result emacspeak-voicefied-buffer-names)
            result))))))

(defvar emacspeak-voicefied-frame-info
  (make-hash-table)
  "Hash table mapping frame names  levels  to their voicefied equivalents.")

(defun emacspeak-get-voicefied-frame-info (frame)
  "Return voicefied version of this frame name."
  (cl-declare (special emacspeak-voicefied-frame-info))
  (cond
   ((= (length (frame-list)) 1) nil)
   (t
    (let ((frame-name (frame-parameter frame 'name))
          (frame-info nil))
      (or (gethash frame-name emacspeak-voicefied-frame-info)
          (progn
            (setq frame-info (format " %s " frame-name))
            (put-text-property 0 (length frame-info)
                               'personality voice-lighten-extra frame-info)
            (puthash frame-name frame-info emacspeak-voicefied-frame-info)
            frame-info))))))

;;}}}
;;{{{  Speak mode line information

;;;compute current line number
(defun emacspeak-get-current-line-number ()
  (let ((start (point)))
    (save-excursion
      (save-restriction
        (widen)
        (goto-char (point-min))
        (+ 1 (count-lines start (point)))))))

;;; make line-number-mode buffer local
(cl-declaim (special line-number-mode))
(make-variable-buffer-local 'line-number-mode)
(setq-default line-number-mode nil)

;;; make column-number-mode buffer local
(cl-declaim (special column-number-mode))
(make-variable-buffer-local 'column-number-mode)
(setq-default column-number-mode nil)
;;{{{   mode line speaker

(defun emacspeak-speak-which-function ()
  "Speak which function we are on.  Uses which-function from
which-func without turning that mode on.  We actually use
semantic to do the work."
  (interactive)
  (require 'semantic "semantic" 'no-error)
  (when (featurep 'semantic)
    (require 'which-func)
    (message (or
              (which-function)
              "Not inside a function."))))

(defun emacspeak-speak-buffer-info ()
  "Speak buffer information."
  (message "Buffer has %s lines and %s characters %s "
           (count-lines (point-min) (point-max))
           (- (point-max) (point-min))
           (if (= 1 (point-min))
               ""
             "with narrowing in effect. ")))
(voice-setup-map-face 'header-line 'voice-bolden)

(defun emacspeak--sox-multiwindow (corners)
  "Takes `window-edges' and plays a sound cue based on position of current window with respect to
the overall window layout."
  (let
      ((tr 0)
       (mr (/ (frame-height) 2))
       (br (1- (frame-height)))
       (lc 0)
       (mc (/ (frame-width) 2))
       (rc (frame-width)))
    (cond
     ((equal corners `(,lc ,tr ,mc ,br))
      (sox-multiwindow)
      'left-half)
     ((equal corners `(,mc ,tr ,rc ,br))
      (sox-multiwindow 'swap)
      'right-half)
     ((equal corners `(,lc ,tr ,rc ,mr))
      (sox-multiwindow nil 2)
      'top-half)
     ((equal corners `(,lc ,mr ,rc ,br))
      (sox-multiwindow nil 1.3)
      'bottom-half)
     ((equal corners `(,lc ,tr ,mc ,mr))
      (sox-multiwindow nil 2.5)
      'top-left)
     ((equal corners `(,mc ,tr ,rc ,mr))
      (sox-multiwindow t 2.5)
      'top-right)
     ((equal corners `(,lc ,mr ,mc ,br))
      (sox-multiwindow nil 0.9)
      'bottom-left)
     ((equal corners `(,mc ,mr ,rc ,br))
      (sox-multiwindow 'swap 0.9)
      'bottom-right)
     ((and (zerop (cl-first corners))
           (zerop (cl-second corners))
           (= rc (cl-third corners)))
      (sox-multiwindow nil 2)
      'top-half)
     ((and (zerop (cl-first corners))
           (= rc (cl-third corners))
           (= br (cl-fourth corners)))
      (sox-multiwindow nil 1.3)
      'bottom-half)
     ((and (zerop (cl-first corners))
           (zerop (cl-second corners))
           (= br (cl-fourth corners)))
      (sox-multiwindow)
      'left-half)
     ((and (zerop (cl-second corners))
           (= rc (cl-third corners))
           (= br (cl-fourth corners)))
      (sox-multiwindow 'swap)
      'right-half)
     (t ""))))

(defun emacspeak-speak-mode-line (&optional buffer-info)
  "Speak the mode-line.
Speaks header-line if that is set when called non-interactively.
Interactive prefix arg speaks buffer info."
  (interactive "P")
  (cl-declare (special mode-name major-mode vc-mode
                       global-visual-line-mode visual-line-mode
                       header-line-format global-mode-string
                       column-number-mode line-number-mode
                       emacspeak-mail-alert mode-line-format))
  (with-current-buffer (window-buffer (selected-window))
    (force-mode-line-update)
    (when (and visual-line-mode (not global-visual-line-mode)) (sox-chime 2 2))
    (when emacspeak-mail-alert (emacspeak-mail-alert-user))
    (cond
     ((and header-line-format (not (called-interactively-p 'interactive)))
      (emacspeak-speak-header-line))
     (buffer-info (emacspeak-speak-buffer-info))
     (t                                 ; main branch
      (let ((global-info (downcase (format-mode-line global-mode-string)))
            (window-count (length (window-list)))
            (vc-state (when (and vc-mode (buffer-file-name)) (vc-state (buffer-file-name))))
            (frame-info (emacspeak-get-voicefied-frame-info (selected-frame)))
            (recursion-info (emacspeak-get-voicefied-recursion-info (recursion-depth)))
            (dir-info
             (when (or (eq major-mode 'shell-mode)
                       (eq major-mode 'comint-mode))
               (abbreviate-file-name default-directory))))
        (when (> window-count 1) (emacspeak--sox-multiwindow (window-edges)))
        (setq
         window-count
         (if (> window-count 1)
             (format " %s " window-count)
           nil))
        (cond
         ((stringp mode-line-format) (dtk-speak mode-line-format))
         (t                             ;process modeline
          (unless (zerop (length global-info))
            (put-text-property
             0 (length global-info) 'personality voice-bolden-medium global-info))
          (tts-with-punctuations
           'all
           (unless                     ; avoid pathological case
               (and buffer-read-only (buffer-modified-p))
             (when (and buffer-file-name (buffer-modified-p))
               (emacspeak-auditory-icon 'modified-object))
             (when buffer-read-only (emacspeak-auditory-icon 'unmodified-object)))
           (dtk-speak
            (concat
             dir-info
             (emacspeak-get-voicefied-buffer-name (buffer-name))
             (when window-count (propertize window-count 'personality voice-smoothen))
             (when vc-mode (propertize vc-mode 'personality voice-smoothen))
             (when vc-state (format " %s " vc-state))
             (when line-number-mode
               (format "line %d" (emacspeak-get-current-line-number)))
             (when column-number-mode
               (format "Column %d" (current-column)))
             (emacspeak-get-voicefied-mode-name mode-name)
             (emacspeak-get-current-percentage-verbously)
             global-info frame-info recursion-info))))))))))

(defun emacspeak-speak-current-buffer-name ()
  "Speak name of current buffer."
  (tts-with-punctuations 'all
                         (dtk-speak
                          (buffer-name))))

;;}}}
;;;Helper --return string describing coding system info

(defcustom emacspeak-speak-default-os-coding-system
  `(prefer-utf-8-unix undecided-unix ,(default-value 'buffer-file-coding-system))
  "List of coding systems on this platform."
  :type '(repeat
          (symbol :tag "Coding system"))
  :group 'emacspeak-speak)

(defun ems-get-buffer-coding-system ()
  "Return buffer coding system info if relevant.
If emacspeak-speak-default-os-coding-system is set and contains  the
current coding system, then we return an empty string."
  (cl-declare (special buffer-file-coding-system voice-lighten
                       emacspeak-speak-default-os-coding-system))
  (if (memq buffer-file-coding-system emacspeak-speak-default-os-coding-system)
      ""
    (propertize (format "%s" buffer-file-coding-system) 'personality voice-lighten)))

;;;###autoload
(defun emacspeak-speak-minor-mode-line (&optional log-msg)
  "Speak the minor mode-information.
Optional  interactive prefix arg `log-msg' logs spoken info to *Messages*."
  (interactive "P")
  (cl-declare (special minor-mode-alist))
  (force-mode-line-update)
  (let ((cs (ems-get-buffer-coding-system)) (info
                                             (mapconcat
                                              #'(lambda (item)
                                                  (let ((var (car item))
                                                        (value (cadr item)))
                                                    (if (and (boundp var) (eval var))
                                                        (format-mode-line value)
                                                      "")))
                                              minor-mode-alist
                                              " ")))
    (when log-msg (ems--log-message info))
    (dtk-speak (concat info cs))))

(cl--defalias 'emacspeak-speak-line-number 'what-line)

;;;###autoload
(defun emacspeak-speak-buffer-filename (&optional filename)
  "Speak name of file being visited in current buffer.
Speak default directory if invoked in a dired buffer,
or when the buffer is not visiting any file.
Interactive prefix arg `filename' speaks only the final path
component.
The result is put in the kill ring for convenience."
  (interactive "P")
  (let ((location (or (buffer-file-name)
                      default-directory)))
    (when filename
      (setq location
            (file-name-nondirectory location)))
    (kill-new location)
    (dtk-speak
     location)))

;;}}}
;;{{{ Speak header-line

(defcustom emacspeak-use-header-line t
  "Use default header line defined  by Emacspeak for buffers that
dont customize the header."
  :type 'boolean
  :group 'emacspeak)

(defvar emacspeak-header-line-format
  '((:eval (buffer-name)))
  "Default header-line-format defined by Emacspeak.
Displays name of current buffer.")

(defun emacspeak-speak-header-line ()
  "Speak header line if set."
  (interactive)
  (cl-declare (special header-line-format))
  (cond
   (header-line-format
    (let ((window-count (length (window-list))))
      (emacspeak-auditory-icon 'item)
      (when (> window-count 1) (sox-multiwindow))
      (dtk-speak (format-mode-line header-line-format))))
   (t (dtk-speak "No header line."))))

;;;###autoload
(defun emacspeak-toggle-header-line ()
  "Toggle Emacspeak's default header line."
  (interactive)
  (cl-declare (special emacspeak-header-line-format
                       header-line-format))
  (if header-line-format
      (setq header-line-format nil)
    (setq header-line-format emacspeak-header-line-format))
  (emacspeak-auditory-icon (if header-line-format 'on 'off))
  (message "Turned %s default header line."
           (if header-line-format 'on 'off)))

;;}}}
;;{{{  Speak text without moving point

;;; Functions to browse without moving:
(defun emacspeak-read-line-internal (arg)
  "Read a line without moving.
Line to read is specified relative to the current line, prefix args gives the
offset. Default  is to speak the previous line. "
  (save-excursion
    (cond
     ((zerop arg) (emacspeak-speak-line))
     ((zerop (forward-line arg))
      (emacspeak-speak-line))
     (t (dtk-speak "Not that many lines in buffer ")))))

;;;###autoload
(defun emacspeak-read-previous-line (&optional arg)
  "Read previous line, specified by an offset, without moving.
Default is to read the previous line. "
  (interactive "p")
  (emacspeak-read-line-internal (- (or arg 1))))

;;;###autoload
(defun emacspeak-read-next-line (&optional arg)
  "Read next line, specified by an offset, without moving.
Default is to read the next line. "
  (interactive "p")
  (emacspeak-read-line-internal (or arg 1)))

(defun emacspeak-read-word-internal (arg)
  "Read a word without moving.
word  to read is specified relative to the current word, prefix args gives the
offset. Default  is to speak the previous word. "
  (save-excursion
    (cond
     ((= arg 0) (emacspeak-speak-word))
     ((forward-word arg)
      (skip-syntax-forward " ")
      (emacspeak-speak-word 1))
     (t (dtk-speak "Not that many words ")))))

;;;###autoload
(defun emacspeak-read-previous-word (&optional arg)
  "Read previous word, specified as a prefix arg, without moving.
Default is to read the previous word. "
  (interactive "p")
  (emacspeak-read-word-internal (- (or arg 1))))

;;;###autoload
(defun emacspeak-read-next-word (&optional arg)
  "Read next word, specified as a numeric  arg, without moving.
Default is to read the next word. "
  (interactive "p")
  (emacspeak-read-word-internal (or arg 1)))

;;}}}
;;{{{  Speak misc information e.g. time, version, current-kill  etc

(defcustom emacspeak-speak-time-format-string
  "%H:%M   on %A, %B %_e, %Y "
  "Format string that specifies how the time should be spoken.
See the documentation for function
`format-time-string'"
  :group 'emacspeak-speak
  :type 'string)

;;{{{ world clock

(defcustom emacspeak-speak-zoneinfo-directory
  "/usr/share/zoneinfo/"
  "Directory containing timezone data."
  :type 'directory
  :group 'emacspeak-speak)
;;;###autoload
(defun emacspeak-speak-world-clock (zone &optional set)
  "Display current date and time  for specified zone.
Optional second arg `set' sets the TZ environment variable as well."
  (interactive
   (list
    (let ((completion-ignore-case t)
          (ido-case-fold t)
          (read-file-name-completion-ignore-case t))
      (read-file-name
       "Timezone: "
       emacspeak-speak-zoneinfo-directory))
    current-prefix-arg))
  (cl-declare (special emacspeak-speak-time-format-string
                       emacspeak-speak-zoneinfo-directory))
  (when (and set
             (= 16 (car set)))
    ;; two interactive prefixes from caller
    (setenv "TZ" zone))
  (emacspeak-shell-command
   (format "export TZ=%s; date +\"%s\""
           zone
           (concat emacspeak-speak-time-format-string
                   (format
                    " in %s, %%Z, %%z "
                    (substring zone (length emacspeak-speak-zoneinfo-directory)))))))

;;}}}
;;;###autoload
(defun emacspeak-speak-time (&optional world)
  "Speak the time.
Optional interactive prefix arg `C-u'invokes world clock.
Timezone is specified using minibuffer completion.
Second interactive prefix sets clock to new timezone."
  (interactive "P")
  (cl-declare (special emacspeak-speak-time-format-string))
  (emacspeak-auditory-icon 'time)
  (cond
   (world (call-interactively 'emacspeak-speak-world-clock))
   (t
    (tts-with-punctuations
     'some
     (dtk-notify-speak
      (format-time-string emacspeak-speak-time-format-string
                          (current-time) (getenv "TZ")))))))

;;;###autoload
(defun emacspeak-speak-seconds-since-epoch (seconds)
  "Speaks time value specified as seconds  since epoch, e.g. as from float-time."
  (interactive
   (list
    (read-minibuffer "Seconds: "
                     (word-at-point))))
  (cl-declare (special emacspeak-speak-time-format-string))
  (message
   (format-time-string
    emacspeak-speak-time-format-string (seconds-to-time seconds))))

;;;###autoload
(defun emacspeak-speak-microseconds-since-epoch (ms)
  "Speaks time value specified as microseconds  since epoch, e.g. as from float-time."
  (interactive
   (list
    (read-minibuffer "MicroSeconds: " (word-at-point))))
  (let ((seconds (/ ms 1000000)))
    (emacspeak-speak-seconds-since-epoch seconds)))

;;;###autoload
(defun emacspeak-speak-milliseconds-since-epoch (ms)
  "Speaks time value specified as milliseconds  since epoch, e.g. as from float-time."
  (interactive
   (list
    (read-minibuffer "MilliSeconds: " (word-at-point))))
  (let ((seconds (/ ms 1000)))
    (emacspeak-speak-seconds-since-epoch seconds)))

;;;###autoload
(defun emacspeak-speak-date-as-seconds (time)
  "Read time value as a human-readable string, return seconds.
Seconds value is also placed in the kill-ring."
  (interactive "sTime: ")
  (let ((result (float-time (apply 'encode-time (parse-time-string time)))))
    (message "%s" result)
    (kill-new result)
    result))

(defvar emacspeak-codename
  (propertize "WorkAtHomeDog" 'face 'bold)
  "Code name of present release.")

(defun emacspeak-setup-get-revision ()
  "Get SHA checksum of current revision that is suitable for spoken output."
  (let ((default-directory emacspeak-directory))
    (if (and (executable-find "git")
             (file-exists-p (expand-file-name ".git" emacspeak-directory)))
        (propertize
         (shell-command-to-string "git show -s --pretty=format:%h HEAD ")
         'personality voice-smoothen)
      "")))

(defvar emacspeak-version
  (concat "52.0,   " emacspeak-codename)
  "Version number for Emacspeak.")

;;;###autoload
(defun emacspeak-speak-version (&optional speak-rev)
  "Announce version information for running emacspeak.
Optional interactive prefix arg `speak-rev' speaks only the Git revision number."
  (interactive "P")
  (cl-declare (special emacspeak-version emacspeak-sounds-directory
                       emacspeak-use-auditory-icons))
  (let ((signature "Emacspeak "))
    (when
        (and (null speak-rev) emacspeak-use-auditory-icons
             (executable-find "mplayer"))
      (start-process
       "mp3" nil "mplayer"
       (expand-file-name "emacspeak.mp3" emacspeak-sounds-directory)))
    (tts-with-punctuations
     'some
     (dtk-speak-and-echo
      (concat
       signature
       (if speak-rev
           (emacspeak-setup-get-revision)
         (concat emacspeak-version " " (emacspeak-setup-get-revision))))))))

;;;###autoload
(defun emacspeak-speak-current-kill (&optional count)
  "Speak the current kill entry.
This is the text that will be yanked in
by the next \\[yank]. Prefix numeric arg, COUNT, specifies that the
text that will be yanked as a result of a \\[yank] followed by count-1
\\[yank-pop] be spoken. The kill number that is spoken says what
numeric prefix arg to give to command yank."
  (interactive "p")
  (let ((context
         (format "kill %s "
                 (if current-prefix-arg (+ 1 count) 1))))
    (put-text-property 0 (length context)
                       'personality voice-annotate context)
    (dtk-speak
     (concat
      context
      (current-kill (if current-prefix-arg count 0) t)))))

;;;###autoload
(defun emacspeak-zap-tts ()
  "Send this command to the TTS directly."
  (interactive)
  (dtk-dispatch
   (read-from-minibuffer "Enter TTS command string: ")))

(defun emacspeak-speak-string-to-phone-number (string)
  "Convert alphanumeric phone number to true phone number.
Argument STRING specifies the alphanumeric phone number."
  (setq string (downcase string))
  (let ((i 0))
    (cl-loop for character across string
             do
             (aset string i
                   (cl-case character
                     (?a ?2)
                     (?b ?2)
                     (?c ?2)
                     (?d ?3)
                     (?e ?3)
                     (?f ?3)
                     (?g ?4)
                     (?h ?4)
                     (?i ?4)
                     (?j ?5)
                     (?k ?5)
                     (?l ?5)
                     (?m ?6)
                     (?n ?6)
                     (?o ?6)
                     (?p ?7)
                     (?r ?7)
                     (?s ?7)
                     (?t ?8)
                     (?u ?8)
                     (?v ?8)
                     (?w ?9)
                     (?x ?9)
                     (?y ?9)
                     (?q ?1)
                     (?z ?1)
                     (otherwise character)))
             (cl-incf i))
    string))

;;;###autoload
(defun emacspeak-dial-dtk (number)
  "Prompt for and dial a phone NUMBER with the Dectalk."
  (interactive "sEnter phone number to dial:")
  (let ((dtk-stop-immediately nil))
    (dtk-dispatch (format "[:dial %s]"
                          (emacspeak-speak-string-to-phone-number number)))
    (sit-for 4)))

;;}}}
;;{{{ Ordinal Numbers:

(defun emacspeak-speak-ordinal (n)
  "Return ordinal number for n"
  (format
   (concat
    "%d"
    (if (memq n '(11 12 13)) "th"
      (let ((last-digit (% n 10)))
        (cl-case last-digit
          (1 "st")
          (2 "nd")
          (3 "rd")
          (otherwise "th")))))
   n))

;;}}}
;;{{{ speaking marks

;;; Intelligent mark feedback for emacspeak:
;;;

;;;###autoload
(defun emacspeak-speak-current-mark (count)
  "Speak the line containing the mark.
With no argument, speaks the line containing the mark--this is
where `exchange-point-and-mark' \\[exchange-point-and-mark] would
jump.  Numeric prefix arg 'COUNT' speaks line containing mark 'n'
where 'n' is one less than the number of times one has to jump
using `set-mark-command' to get to this marked position.  The
location of the mark is indicated by an aural highlight achieved
by a change in voice personality."
  (interactive "p")
  (unless (mark) (error "No marks set in this buffer"))
  (when (and current-prefix-arg (> count (length mark-ring)))
    (error "Not that many marks in this buffer"))
  (let ((line nil)
        (pos nil)
        (context
         (format "mark %s "
                 (if current-prefix-arg count 0))))
    (put-text-property 0 (length context)
                       'personality voice-annotate context)
    (setq pos
          (if current-prefix-arg
              (elt mark-ring (1- count))
            (mark)))
    (save-excursion
      (goto-char pos)
      (ems-set-personality-temporarily
       pos (1+ pos) voice-animate
       (setq line (ems--this-line))))
    (dtk-speak
     (concat context line))))

;;}}}
;;{{{ speaking personality chunks

;;;###autoload
(defun emacspeak-speak-this-personality-chunk ()
  "Speak chunk of text around point that has current
personality."
  (interactive)
  (let ((start (dtk-previous-style-change (point)))
        (end (dtk-next-style-change (point))))
    (emacspeak-speak-region
     (if  start (1+ start) (point-min))
     (or  end  (point-max)))))

;;;###autoload
(defun emacspeak-speak-next-personality-chunk ()
  "Moves to the front of next chunk having current personality.
Speak that chunk after moving."
  (interactive)
  (let ((this-end (dtk-next-style-change (point) (point-max)))
        (next-start nil))
    (cond
     ((and (< this-end (point-max))
           (setq next-start
                 (dtk-next-style-change this-end (point-max))))
      (goto-char next-start)
      (forward-char 1)
      (emacspeak-speak-this-personality-chunk))
     (t (error "No more chunks with current personality.")))))

;;; this helper is here since text-property-any doesn't work
;;; backwards

(defun ems-backwards-text-property-any (max min property
                                            value)
  "Scan backwards from max till we find specified property
                                               setting.
Return buffer position or nil on failure."
  (let ((result nil)
        (start max)
        (continue t))
    (save-excursion
      (while (and continue
                  (not
                   (or (< (point) min)
                       (bobp))))
        (backward-char 1)
        (setq start (previous-single-property-change (point) property))
        (if (null start)
            (setq continue nil)
          (setq continue
                (not (eq value
                         (get-text-property start property)))))
        (or continue
            (setq result start)))
      result)))

;;;###autoload
(defun emacspeak-speak-previous-personality-chunk ()
  "Moves to the front of previous chunk having current personality.
Speak that chunk after moving."
  (interactive)
  (let ((this-start (dtk-previous-style-change (point))))
    (cond
     ((and (> this-start (point-min))
           (goto-char (dtk-previous-style-change (point)))
           (backward-char 1)
           (emacspeak-speak-this-personality-chunk)))
     (t (error "No previous  chunks with current personality.")))))

(defun emacspeak-speak-face-interval-and-move ()
  "Speaks region delimited by text in current face, and moves past the chunk."
  (interactive)
  (let ((face (get-char-property (point) 'face))
        (start (point))
        (end nil))
;;; skip over opening delimiter
    (goto-char (next-single-char-property-change start 'face))
    (when (eobp) (error "End of buffer"))
    (setq end
          (or
           (text-property-any (point) (point-max)
                              'face face)
           (point-max)))
    (dtk-speak
     (buffer-substring start end))
    (goto-char end)
    (emacspeak-auditory-icon 'large-movement)))

;;}}}
;;{{{ speaking face   chunks

;;;###autoload
(defun emacspeak-speak-this-face-chunk ()
  "Speak chunk of text around point that has current face."
  (interactive)
  (let ((start (previous-single-property-change (point) 'face))
        (end (next-single-property-change (point) 'face )))
    (emacspeak-speak-region
     (if  start (1+ start) (point-min))
     (or end (point-max)))))

;;;###autoload
(defun emacspeak-speak-next-face-chunk ()
  "Moves to the front of next chunk having current style.
Speak that chunk after moving."
  (interactive)
  (let ((face (get-text-property (point) 'face))
        (this-end (next-single-property-change (point) 'face))
        (next-start nil))
    (cond
     ((and (< this-end (point-max))
           (setq next-start (next-single-property-change this-end 'face)))
      (goto-char next-start)
      (when (eq face  (get-text-property (point) 'face))
        (emacspeak-speak-this-face-chunk)))
     (t (message "No more chunks with current face.")))))

;;;###autoload
(defun emacspeak-speak-previous-face-chunk ()
  "Moves to the front of previous chunk having current face.
Speak that chunk after moving."
  (interactive)
  (let ((face (get-text-property (point) 'face))
        (this-start (previous-single-property-change (point)  'face))
        (prev-end nil))
    (cond
     ((and (> this-start (point-min))
           (setq prev-end
                 (previous-single-property-change (1- this-start) 'face)))
      (goto-char prev-end)
      (when (eq face (get-text-property (point) 'face))
        (emacspeak-speak-this-face-chunk)))
     (t (error "No previous  chunks with current face.")))))

;;}}}
;;{{{  Execute command repeatedly,

;;;###autoload
(defun emacspeak-execute-repeatedly (command)
  "Execute COMMAND repeatedly."
  (interactive
   (list (read-command "Command to execute repeatedly:")))
  (let ((key "")
        (pos (point))
        (continue t)
        (message (format "Press space to execute %s again" command)))
    (while continue
      (call-interactively command)
      (cond
       ((= (point) pos) (setq continue nil))
       (t (setq pos (point))
          (setq key
                (let ((dtk-stop-immediately nil))
                  (read-key-sequence message)))
          (when (and (stringp key)
                     (not (= 32 (string-to-char key))))
            (dtk-stop)
            (setq continue nil)))))
    (dtk-speak "Exited continuous mode ")))

;;;###autoload
(defun emacspeak-speak-continuously ()
  "Speak a buffer continuously.
First prompts using the minibuffer for the kind of action to
perform after speaking each chunk.  E.G.  speak a line at a time
etc.  Speaking commences at current buffer position.  Pressing
\\[keyboard-quit] breaks out, leaving point on last chunk that
was spoken.  Any other key continues to speak the buffer."
  (interactive)
  (let ((command
         (key-binding (read-key-sequence "Press navigation key to repeat: "))))
    (unless command (error "You specified an invalid key sequence.  "))
    (emacspeak-execute-repeatedly command)))

;;;###autoload
(defun      emacspeak-speak-browse-buffer-by-style (&optional browse)
  "Browse current buffer by style.
Default is to speak chunk having current style.
Interactive prefix arg `browse'  repeatedly browses  through
  chunks having same style as the current text chunk."
  (interactive "P")
  (cond
   (browse
    (emacspeak-execute-repeatedly
     'emacspeak-speak-next-personality-chunk))
   (t (emacspeak-speak-this-personality-chunk))))

;;}}}
;;{{{  skimming

;;;###autoload
(defun emacspeak-speak-skim-buffer ()
  "Skim the current buffer  a paragraph at a time."
  (interactive)
  (emacspeak-execute-repeatedly 'forward-paragraph))

;;}}}
;;{{{ comint

;;;###autoload
(defun emacspeak-completion-pick-completion ()
  "Pick completion and return safely where we came from."
  (interactive)
  (cl-declare (special completion-reference-buffer))
  (let ((completion-ignore-case t))
    (choose-completion-string (emacspeak-get-current-completion) completion-reference-buffer))
  (emacspeak-auditory-icon 'select-object)
  (cond
   ((not (or
          (window-minibuffer-p)
          (one-window-p)
          (window-dedicated-p (selected-window))))
    (delete-window)
    (bury-buffer "*Completions*")
    (other-window 1))
   (t
    (kill-buffer "*Completions*")))
  (emacspeak-speak-line))

(defcustom emacspeak-comint-autospeak t
  "Says if comint output is automatically spoken.
You can use
  `emacspeak-toggle-comint-autospeak` bound to
  \\[emacspeak-toggle-comint-autospeak] to toggle this
setting."
  :group 'emacspeak-speak
  :type 'boolean)
(make-variable-buffer-local 'emacspeak-comint-autospeak)

(ems-generate-switcher 'emacspeak-toggle-comint-autospeak
                       'emacspeak-comint-autospeak
                       "Toggle state of Emacspeak comint autospeak.
When turned on, comint output is automatically spoken.  Turn this on if
you want your shell to speak its results.  Interactive
PREFIX arg means toggle the global default value, and then
set the current local value to the result.")

;;;###autoload
(defun emacspeak-toggle-inaudible-or-comint-autospeak ()
  "Toggle comint-autospeak when in a comint buffer.
Otherwise call voice-setup-toggle-silence-personality which toggles the
personality under point."
  (interactive)
  (cond
   ((derived-mode-p 'comint-mode) (funcall-interactively #'emacspeak-toggle-comint-autospeak))
   (t (funcall-interactively #'voice-setup-toggle-silence-personality))))

(defvar emacspeak-comint-output-monitor nil
  "Switch to monitor comint output.
When turned on,  comint output will be spoken even when the
buffer is not current or its window live.")

(make-variable-buffer-local 'emacspeak-comint-output-monitor)

;;;###autoload
(ems-generate-switcher 'emacspeak-toggle-comint-output-monitor
                       'emacspeak-comint-output-monitor
                       "Toggle state of Emacspeak comint monitor.
When turned on, comint output is automatically spoken.  Turn this on if
you want your shell to speak its results.  Interactive
PREFIX arg means toggle the global default value, and then
set the current local value to the result.")

(defun emacspeak-comint-speech-setup ()
  "Set up splitting of speech into chunks in comint modes."
  (cl-declare (special comint-mode-map
                       emacspeak-use-header-line))
  (when emacspeak-use-header-line
    (setq header-line-format
          '((:eval
             (format "%s  %s"
                     (abbreviate-file-name default-directory)
                     (propertize (buffer-name) 'personality voice-annotate))))))
  (dtk-set-punctuations 'all)
  (define-key comint-mode-map "\C-o" 'switch-to-completions)
  (emacspeak-pronounce-refresh-pronunciations))

(add-hook 'comint-mode-hook 'emacspeak-comint-speech-setup)

;;}}}
;;{{{   quieten messages

(ems-generate-switcher 'emacspeak-toggle-speak-messages
                       'emacspeak-speak-messages
                       "Toggle the state of whether emacspeak echoes messages.")

;;}}}
;;{{{  Moving across fields:

;;; Fields are defined by property 'field

;;; helper function: speak a field
(defun emacspeak-speak-field (start end)
  "Speaks field delimited by arguments START and END."
  (cl-declare (special voice-annotate))
  (let ((header (or (get-text-property start 'field-name) "")))
    (dtk-speak
     (concat
      (progn (put-text-property 0 (length header)
                                'personality voice-annotate
                                header)
             header)
      " "
      (buffer-substring start end)))))

(defun emacspeak-speak-current-field ()
  "Speak current field."
  (interactive)
  (emacspeak-speak-region (field-beginning)
                          (field-end)))

(defun emacspeak-speak-next-field ()
  "Move to and speak next field."
  (interactive)
  (cl-declare (special inhibit-field-text-motion))
  (let ((inhibit-field-text-motion t)
        (start nil))
    (skip-syntax-forward "^ ")
    (skip-syntax-forward " ")
    (setq start (point))
    (save-excursion
      (skip-syntax-forward "^ ")
      (emacspeak-speak-field start (point)))))

;;;###autoload
(defun emacspeak-speak-previous-field ()
  "Move to previous field and speak it."
  (interactive)
  (cl-declare (special inhibit-field-text-motion))
  (let ((inhibit-field-text-motion t)
        (start nil))
    (skip-syntax-backward " ")
    (setq start (point))
    (skip-syntax-backward "^ ")
    (emacspeak-speak-field (point) start)))

(defun emacspeak-speak-current-column ()
  "Speak the current column."
  (interactive)
  (message "Point at column %d" (current-column)))

(defun emacspeak-speak-current-percentage ()
  "Announce the percentage into the current buffer."
  (interactive)
  (message "Point is  %d%% into  the current buffer"
           (emacspeak-get-current-percentage-into-buffer)))

;;}}}
;;{{{  Speak the last message again:

(defvar emacspeak-speak-message-again-should-copy-to-kill-ring t
  "If set, asking for last message will copy it to the kill ring.")

;;;###autoload
(defun emacspeak-speak-message-again (&optional from-message-cache)
  "Speak the last message from Emacs once again.
The message is also placed in the kill ring for convenient yanking
if `emacspeak-speak-message-again-should-copy-to-kill-ring' is set."
  (interactive "P")
  (cl-declare (special emacspeak-last-message
                       emacspeak-speak-message-again-should-copy-to-kill-ring))
  (cond
   (from-message-cache
    (dtk-speak emacspeak-last-message)
    (when (and (called-interactively-p 'interactive)
               emacspeak-speak-message-again-should-copy-to-kill-ring)
      (kill-new emacspeak-last-message)))
   (t
    (save-current-buffer
      (set-buffer "*Messages*")
      (goto-char (point-max))
      (skip-syntax-backward " >")
      (emacspeak-speak-line)
      (when (and (called-interactively-p 'interactive)
                 emacspeak-speak-message-again-should-copy-to-kill-ring)
        (kill-new (ems--this-line)))))))

(defun emacspeak-announce (announcement)
  "Speak the ANNOUNCEMENT, if possible.
Otherwise just display a message."
  (message announcement))

;;}}}
;;{{{  Using emacs's windows usefully:

;;Return current window contents
(defun emacspeak-get-window-contents ()
  "Return window contents."
  (let ((start nil))
    (save-excursion
      (move-to-window-line 0)
      (setq start (point))
      (move-to-window-line -1)
      (end-of-line)
      (buffer-substring start (point)))))

;;;###autoload
(defun emacspeak-speak-window-information ()
  "Speaks information about current window."
  (interactive)
  (message "Current window has %s lines and %s columns with
top left %s %s "
           (window-height)
           (window-width)
           (cl-first (window-edges))
           (cl-second (window-edges))))

;;;###autoload
(defun emacspeak-speak-current-window ()
  "Speak contents of current window.
Speaks entire window irrespective of point."
  (interactive)
  (emacspeak-speak-region (window-start) (window-end)))

;;;###autoload
(defun emacspeak-speak-other-window (&optional arg)
  "Speak contents of `other' window.
Speaks entire window irrespective of point.
Semantics  of `other' is the same as for the builtin Emacs command
`other-window'.
Optional argument ARG  specifies `other' window to speak."
  (interactive "nSpeak window")
  (save-excursion
    (save-window-excursion
      (other-window arg)
      (save-current-buffer
        (set-buffer (window-buffer))
        (emacspeak-speak-region
         (max (point-min) (window-start))
         (min (point-max) (window-end)))))))

;;;###autoload
(defun emacspeak-speak-next-window ()
  "Speak the next window."
  (interactive)
  (emacspeak-speak-other-window 1))

;;;###autoload
(defun emacspeak-speak-previous-window ()
  "Speak the previous window."
  (interactive)
  (emacspeak-speak-other-window -1))

;;;###autoload
(defun emacspeak-owindow-scroll-up ()
  "Scroll up the window that command `other-window' would move to.
Speak the window contents after scrolling."
  (interactive)
  (let ((window (selected-window)))
    (other-window 1)
    (call-interactively 'scroll-up)
    (select-window window)))

;;;###autoload
(defun emacspeak-owindow-scroll-down ()
  "Scroll down  the window that command `other-window' would move to.
Speak the window contents after scrolling."
  (interactive)
  (let ((window (selected-window)))
    (other-window 1)
    (call-interactively 'scroll-down)
    (select-window window)))

;;;###autoload
(defun emacspeak-owindow-next-line (count)
  "Move to the next line in the other window and speak it.
Numeric prefix arg COUNT can specify number of lines to move."
  (interactive "p")
  (setq count (or count 1))
  (let ((residue nil))
    (save-current-buffer
      (set-buffer (window-buffer (next-window)))
      (end-of-line)
      (setq residue (forward-line count))
      (cond
       ((> residue 0) (message "At bottom of other window "))
       (t (set-window-point (get-buffer-window (current-buffer))
                            (point))
          (emacspeak-speak-line))))))

;;;###autoload
(defun emacspeak-owindow-previous-line (count)
  "Move to the next line in the other window and speak it.
Numeric prefix arg COUNT specifies number of lines to move."
  (interactive "p")
  (setq count (or count 1))
  (let ((residue nil))
    (save-current-buffer
      (set-buffer (window-buffer (next-window)))
      (end-of-line)
      (setq residue (forward-line (- count)))
      (cond
       ((> 0 residue) (message "At top of other window "))
       (t (set-window-point (get-buffer-window (current-buffer))
                            (point))
          (emacspeak-speak-line))))))

;;;###autoload
(defun emacspeak-owindow-speak-line ()
  "Speak the current line in the other window."
  (interactive)
  (save-current-buffer
    (set-buffer (window-buffer (next-window)))
    (goto-char (window-point))
    (emacspeak-speak-line)))

;;;###autoload
(defun emacspeak-speak-predefined-window (&optional arg)
  "Speak one of the first 10 windows on the screen.
Speaks entire window irrespective of point.
In general, you'll never have Emacs split the screen into more than
two or three.
Argument ARG determines the 'other' window to speak.
Semantics  of `other' is the same as for the builtin Emacs command
`other-window'."
  (interactive "P")
  (cl-declare (special last-input-event))
  (let* ((window-size-change-functions nil)
         (window
          (cond
           ((not (called-interactively-p 'interactive)) arg)
           (t
            (condition-case nil
                (read (format "%c" last-input-event))
              (error nil))))))
    (or (numberp window)
        (setq window
              (read-number "Window   between 1 and 9 to speak" 1)))
    (setq window (1- window))
    (save-excursion
      (save-window-excursion
        (other-window window)
        (emacspeak-speak-region (window-start) (window-end))))))

;;}}}
;;{{{  Intelligent interactive commands for reading:

;;; Prompt the user if asked to prompt.
;;; Prompt is:
;;; press 'b' for beginning of unit,
;;; 'r' for rest of unit,
;;; any other key for entire unit
;;; returns 1, -1, or nil accordingly.
;;; If prompt is nil, does not prompt: just gets the input

(defun emacspeak-ask-how-to-speak (unit-name prompt)
  "Argument UNIT-NAME specifies kind of unit that is being spoken.
Argument PROMPT specifies the prompt to display."
  (if prompt
      (message
       (format "Press s to speak start of %s, r for rest of  %s. \
 Any  key for entire %s "
               unit-name unit-name unit-name)))
  (let ((char (read-char)))
    (cond
     ((= char ?s) -1)
     ((= char ?r) 1)
     (t nil))))

;;;###autoload
(defun emacspeak-speak-buffer-interactively ()
  "Speak the start of, rest of, or the entire buffer.
's' to speak the start.
'r' to speak the rest.
any other key to speak entire buffer."
  (interactive)
  (emacspeak-speak-buffer
   (emacspeak-ask-how-to-speak "buffer" (sit-for 1))))

;;;###autoload
(defun emacspeak-speak-help-interactively ()
  "Speak the start of, rest of, or the entire help.
's' to speak the start.
'r' to speak the rest.
any other key to speak entire help."
  (interactive)
  (emacspeak-speak-help
   (emacspeak-ask-how-to-speak "help" (sit-for 1))))

;;;###autoload
(defun emacspeak-speak-line-interactively ()
  "Speak the start of, rest of, or the entire line.
's' to speak the start.
'r' to speak the rest.
any other key to speak entire line."
  (interactive)
  (emacspeak-speak-line
   (emacspeak-ask-how-to-speak "line" (sit-for 1))))

;;;###autoload
(defun emacspeak-speak-paragraph-interactively ()
  "Speak the start of, rest of, or the entire paragraph.
's' to speak the start.
'r' to speak the rest.
any other key to speak entire paragraph."
  (interactive)
  (emacspeak-speak-paragraph
   (emacspeak-ask-how-to-speak "paragraph" (sit-for 1))))

;;;###autoload
(defun emacspeak-speak-page-interactively ()
  "Speak the start of, rest of, or the entire page.
's' to speak the start.
'r' to speak the rest.
any other key to speak entire page."
  (interactive)
  (emacspeak-speak-page
   (emacspeak-ask-how-to-speak "page" (sit-for 1))))

;;;###autoload
(defun emacspeak-speak-word-interactively ()
  "Speak the start of, rest of, or the entire word.
's' to speak the start.
'r' to speak the rest.
any other key to speak entire word."
  (interactive)
  (emacspeak-speak-word
   (emacspeak-ask-how-to-speak "word" (sit-for 1))))

;;;###autoload
(defun emacspeak-speak-sexp-interactively ()
  "Speak the start of, rest of, or the entire sexp.
's' to speak the start.
'r' to speak the rest.
any other key to speak entire sexp."
  (interactive)
  (emacspeak-speak-sexp
   (emacspeak-ask-how-to-speak "sexp" (sit-for 1))))

;;}}}
;;{{{  emacs rectangles and regions:

(eval-when-compile (require 'rect))
;;; These help you listen to columns of text. Useful for tabulated data
;;;###autoload
(defun emacspeak-speak-rectangle (start end)
  "Speak a rectangle of text.
Rectangle is delimited by point and mark.  When call from a
program, arguments specify the START and END of the rectangle."
  (interactive "r")
  (require 'rect)
  (dtk-speak-list (extract-rectangle start end)))

;;; helper function: emacspeak-put-personality
;;; sets property 'personality to personality
(defun emacspeak-put-personality (start end personality)
  "Apply specified personality to region delimited by START and END.
Argument PERSONALITY gives the value for property personality."
  (put-text-property start end 'personality personality))

;;; Compute table of possible voices to use in completing-read
;;; We rely on dectalk-voice-table as our default voice table.
;;; Names defined in this --- and other voice tables --- are
;;; generic --and  not device specific.
;;;

(defun emacspeak-possible-voices ()
  "Return possible voices."
  (cl-declare (special dectalk-voice-table))
  (cl-loop for key being the hash-keys of dectalk-voice-table
           collect (cons
                    (symbol-name key)
                    (symbol-name key))))

;;;###autoload
(defun emacspeak-voiceify-rectangle (start end &optional personality)
  "Voicify the current rectangle.
When calling from a program,arguments are
START END personality
Prompts for PERSONALITY  with completion when called interactively."
  (interactive "r")
  (require 'rect)
  (require 'emacspeak-personality)
  (let ((personality-table (emacspeak-possible-voices)))
    (when (called-interactively-p 'interactive)
      (setq personality
            (read
             (completing-read "Use personality: "
                              personality-table nil t))))
    (with-silent-modifications
      (operate-on-rectangle
       #'(lambda (start-seg _begextra _endextra)
           (emacspeak-put-personality start-seg (point) personality))
       start end nil))))

;;;###autoload
(defun emacspeak-voiceify-region (start end &optional personality)
  "Voicify the current region.
When calling from a program,arguments are
START END personality.
Prompts for PERSONALITY  with completion when called interactively."
  (interactive "r")
  (require 'emacspeak-personality)
  (let ((personality-table (emacspeak-possible-voices)))
    (when (called-interactively-p 'interactive)
      (setq personality
            (read
             (completing-read "Use personality: "
                              personality-table nil t))))
    (put-text-property start end 'personality personality)))

(defun emacspeak-put-text-property-on-rectangle (start end prop value)
  "Set property to specified value for each line in the rectangle.
Argument START and END specify the rectangle.
Argument PROP specifies the property and VALUE gives the
value to apply."
  (require 'rect)
  (operate-on-rectangle
   #'(lambda (start-seg _begextra _endextra)
       (put-text-property start-seg (point) prop value))
   start end nil))

;;}}}
;;{{{  Matching delimiters:

;;; A modified blink-matching-open that always displays the matching line
;;; in the minibuffer so emacspeak can speak it.
;;;Helper: emacspeak-speak-blinkpos-message

(defun emacspeak-speak-blinkpos-message (blinkpos)
  "Speak message about matching blinkpos."
  (ems-set-pause-temporarily
   blinkpos (1+ blinkpos) 5
   (ems-set-personality-temporarily
    blinkpos (1+ blinkpos) voice-animate
    (tts-with-punctuations
     'all
     (dtk-speak-and-echo
      (concat
       "Matches "
       (cond
;;; Show what precedes the open in its line, if anything.
        ((save-excursion
           (skip-chars-backward " \t")
           (not (bolp)))
         (buffer-substring (line-beginning-position) (1+ blinkpos)))
;;; Show what follows the open in its line, if anything.
        ((save-excursion
           (forward-char 1)
           (skip-chars-forward " \t")
           (not (eolp)))
         (buffer-substring blinkpos (line-end-position)))
;;; Otherwise show the previous nonblank line.
        (t
         (concat
          (buffer-substring
           (progn
             (backward-char 1)
             (skip-chars-backward "\n \t")
             (line-beginning-position))
           (progn (end-of-line)
                  (skip-chars-backward " \t")
                  (point)))
;;; Replace the newline and other whitespace with `...'.
          "..."
          (buffer-substring blinkpos (1+ blinkpos)))))))))))

;;; The only change to emacs' default blink-matching-paren is the
;;; addition of the call to helper emacspeak-speak-blinkpos-message
;;; This matcher if from emacs 19 from memory.

(defun emacspeak-blink-matching-open ()
  "Move cursor momentarily to the beginning of the sexp before point.
Also display match context in minibuffer."
  (interactive)
  (when (and (> (point) (point-min))
             blink-matching-paren
             ;; Verify an even number of quoting characters precede the close.
             (= 1 (logand 1 (- (point)
                               (save-excursion
                                 (forward-char -1)
                                 (skip-syntax-backward "/\\")
                                 (point))))))
    (let* ((oldpos (point))
           (blink-matching-delay 5)
           blinkpos
           message-log-max  ; Don't log messages about paren matching.
           matching-paren
           open-paren-line-string)
      (save-excursion
        (save-restriction
          (if blink-matching-paren-distance
              (narrow-to-region (max (minibuffer-prompt-end)
                                     (- (point) blink-matching-paren-distance))
                                oldpos))
          (condition-case ()
              (let ((parse-sexp-ignore-comments
                     (and parse-sexp-ignore-comments
                          (not blink-matching-paren-dont-ignore-comments))))
                (setq blinkpos (scan-sexps oldpos -1)))
            (error nil)))
        (and blinkpos
             ;; Not syntax '$'.
             (not (eq (syntax-class (syntax-after blinkpos)) 8))
             (setq matching-paren
                   (let ((syntax (syntax-after blinkpos)))
                     (and (consp syntax)
                          (eq (syntax-class syntax) 4)
                          (cdr syntax)))))
        (cond
         ((not (or (eq matching-paren (char-before oldpos))
                   ;; The cdr might hold a new paren-class info rather than
                   ;; a matching-char info, in which case the two CDRs
                   ;; should match.
                   (eq matching-paren (cdr (syntax-after (1- oldpos))))))
          (message "Mismatched parentheses"))
         ((not blinkpos)
          (if (not blink-matching-paren-distance)
              (message "Unmatched parenthesis")))
         ((pos-visible-in-window-p blinkpos)
          ;; Matching open within window, temporarily move to blinkpos but only
          ;; if `blink-matching-paren-on-screen' is non-nil.
          (and blink-matching-paren-on-screen
               (save-excursion
                 (goto-char blinkpos)
                 (emacspeak-speak-blinkpos-message blinkpos)
                 (sit-for blink-matching-delay))))
         (t
          (save-excursion
            (goto-char blinkpos)
            (setq open-paren-line-string
                  ;; Show what precedes the open in its line, if anything.
                  (if (save-excursion
                        (skip-chars-backward " \t")
                        (not (bolp)))
                      (buffer-substring (line-beginning-position)
                                        (1+ blinkpos))
                    ;; Show what follows the open in its line, if anything.
                    (if (save-excursion
                          (forward-char 1)
                          (skip-chars-forward " \t")
                          (not (eolp)))
                        (buffer-substring blinkpos
                                          (line-end-position))
                      ;; Otherwise show the previous nonblank line,
                      ;; if there is one.
                      (if (save-excursion
                            (skip-chars-backward "\n \t")
                            (not (bobp)))
                          (concat
                           (buffer-substring (progn
                                               (skip-chars-backward "\n \t")
                                               (line-beginning-position))
                                             (progn (end-of-line)
                                                    (skip-chars-backward " \t")
                                                    (point)))
                           ;; Replace the newline and other whitespace with `...'.
                           "..."
                           (buffer-substring blinkpos (1+ blinkpos)))
                        ;; There is nothing to show except the char itself.
                        (buffer-substring blinkpos (1+ blinkpos)))))))
          (message "Matches %s"
                   (substring-no-properties
                    open-paren-line-string))
          (sit-for blink-matching-delay)))))))

(defun emacspeak-use-customized-blink-paren ()
  "A customized blink-paren to speak  matching opening paren.
We need to call this in case Emacs is anal and loads its own
builtin blink-paren function which does not talk."
  (interactive)
  (fset 'blink-matching-open (symbol-function 'emacspeak-blink-matching-open))
  (and (called-interactively-p 'interactive)
       (message "Using customized blink-paren function provided by Emacspeak.")))

;;}}}
;;{{{  Auxillary functions:

(defun emacspeak-kill-buffer-carefully (buffer)
  "Kill BUFFER BUF if it exists."
  (and buffer
       (get-buffer buffer)
       (buffer-name (get-buffer buffer))
       (kill-buffer buffer)))

(defun emacspeak-overlay-get-text (o)
  "Return text under overlay OVERLAY.
Argument O specifies overlay."
  (save-current-buffer
    (set-buffer (overlay-buffer o))
    (buffer-substring (overlay-start o) (overlay-end o))))

;;}}}
;;{{{ Speaking spaces

;;;###autoload
(defun emacspeak-speak-spaces-at-point ()
  "Speak the white space at point."
  (interactive)
  (cond
   ((not (= 32 (char-syntax (following-char))))
    (message "Not on white space"))
   (t
    (let ((orig (point))
          (start (save-excursion
                   (skip-syntax-backward " ")
                   (point)))
          (end (save-excursion
                 (skip-syntax-forward " ")
                 (point))))
      (message "Space %s of %s"
               (1+ (- orig start)) (- end start))))))

;;}}}
;;{{{  completion helpers

;;{{{ switching to completions window from minibuffer:

(defun emacspeak-get-minibuffer-contents ()
  "Return contents of the minibuffer."
  (save-current-buffer
    (set-buffer (window-buffer (minibuffer-window)))
    (minibuffer-contents-no-properties)))

;;; Make all occurrences of string inaudible
(defun emacspeak-make-string-inaudible (string)
  (unless (string-match "^ *$" string)
    (with-silent-modifications
      (save-excursion
        (goto-char (point-min))
        (save-match-data
          (with-silent-modifications
            (while (search-forward string nil t)
              (put-text-property (match-beginning 0)
                                 (match-end 0)
                                 'personality 'inaudible))))))))

;;;###autoload
(defun emacspeak-switch-to-reference-buffer ()
  "Switch back to buffer that generated completions."
  (interactive)
  (cl-declare (special completion-reference-buffer))
  (if completion-reference-buffer
      (switch-to-buffer completion-reference-buffer)
    (error "Reference buffer not found."))
  (when (called-interactively-p 'interactive)
    (emacspeak-speak-line)
    (emacspeak-auditory-icon 'select-object)))

;;;###autoload
(defun emacspeak-completions-move-to-completion-group ()
  "Move to group of choices beginning with character last
typed. If no such group exists, then we try to search for that
char, or dont move. "
  (interactive)
  (cl-declare (special last-input-event))
  (let ((pattern
         (format
          "[ \t\n]%s%c"
          (or (emacspeak-get-minibuffer-contents) "")
          last-input-event))
        (input (format "%c" last-input-event))
        (case-fold-search t))
    (when (or (re-search-forward pattern nil t)
              (re-search-backward pattern nil t)
              (search-forward input nil t)
              (search-backward input nil t))
      (skip-syntax-forward " ")
      (emacspeak-auditory-icon 'search-hit))
    (dtk-speak (emacspeak-get-current-completion))))

(defun emacspeak-completion-setup-hook ()
  "Set things up for emacspeak."
  (with-current-buffer standard-output
    (goto-char (point-min))
    (emacspeak-make-string-inaudible (emacspeak-get-minibuffer-contents))
    (emacspeak-auditory-icon 'help)))

(add-hook 'completion-setup-hook 'emacspeak-completion-setup-hook)

(cl-declaim (special completion-list-mode-map))
(define-key completion-list-mode-map "\C-o" 'emacspeak-switch-to-reference-buffer)
(define-key completion-list-mode-map " " 'next-completion)
(define-key completion-list-mode-map "\C-m" 'choose-completion)
(define-key completion-list-mode-map "\M-\C-m" 'emacspeak-completion-pick-completion)
(let ((chars
       "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"))
  (cl-loop for char across chars
           do
           (define-key completion-list-mode-map
             (format "%c" char)
             'emacspeak-completions-move-to-completion-group)))

;;}}}

;;}}}
;;{{{ mark convenience commands

(defun emacspeak-mark-speak-mark-line ()
  (cl-declare (special voice-animate))
  (emacspeak-auditory-icon 'mark-object)
  (ems-set-personality-temporarily (point) (1+ (point))
                                   voice-animate
                                   (emacspeak-speak-line)))

;;;###autoload

;;;###autoload
(defun emacspeak-mark-backward-mark ()
  "Cycle backward through the mark ring."
  (interactive)
  (cl-declare (special mark-ring))
  (unless mark-ring (error "Mark ring is empty."))
  (let ((target (elt mark-ring (1- (length mark-ring)))))
    (when target
      (setq mark-ring
            (cons (copy-marker (mark-marker))
                  (nbutlast mark-ring 1)))
      (set-marker (mark-marker) (point) (current-buffer))
      (goto-char (marker-position target))
      (move-marker target nil)
      (when (called-interactively-p 'interactive)
        (emacspeak-mark-speak-mark-line)))))

;;}}}
;;{{{ speaking an extent of text delimited by specified char

;;;###autoload
(defun emacspeak-speak-and-skip-extent-upto-char (char)
  "Search forward from point until we hit char.
Speak text between point and the char we hit."
  (interactive (list (read-char "Char: ")))
  (let ((start (point))
        (goal nil))
    (save-excursion
      (cond
       ((search-forward (format "%c" char)
                        (point-max)
                        'no-error)
        (setq goal (point))
        (emacspeak-speak-region start goal)
        (emacspeak-auditory-icon 'select-object))
       (t (error "Could not find %c" char))))
    (when goal (goto-char goal))))

;;;###autoload
(defun emacspeak-speak-and-skip-extent-upto-this-char ()
  "Speak extent delimited by point and last character typed."
  (interactive)
  (cl-declare (special last-input-event))
  (emacspeak-speak-and-skip-extent-upto-char last-input-event))

;;}}}
;;{{{  speak message at time
;;;###autoload
(defun emacspeak-speak-message-at-time (time message)
  "Set up ring-at-time to speak message at specified time.
Provides simple stop watch functionality in addition to other things.
See documentation for command run-at-time for details on time-spec."
  (interactive
   (list
    (read-from-minibuffer "Time specification:  ")
    (read-from-minibuffer "Message: ")))
  (run-at-time
   time nil
   #'(lambda (m)
       (message m)
       (dtk-notify-speak m)
       (when emacspeak-use-auditory-icons (emacspeak-play-auditory-icon 'alarm))
       (sox-tones))
   message)
  (message "Set alarm for %s" time)
  (emacspeak-auditory-icon 'button))

;;}}}
;;{{{ Directory specific settings

(defcustom emacspeak-speak-directory-settings
  ".espeak.el"
  "Name of file that holds directory specific settings."
  :group 'emacspeak-speak
  :type 'string)
;;;###autoload
(defun emacspeak-speak-load-directory-settings (&optional dir)
  "Load a directory specific Emacspeak settings file.
This is typically used to load up settings that are specific to
an electronic book consisting of many files in the same
directory."
  (cl-declare (special emacspeak-speak-directory-settings default-directory))
  (unless dir (setq dir default-directory))
  (let ((res (locate-dominating-file dir emacspeak-speak-directory-settings)))
    (when
        (and res
             (file-exists-p (expand-file-name emacspeak-speak-directory-settings res)))
      (load (expand-file-name emacspeak-speak-directory-settings res))
      (emacspeak-auditory-icon 'task-done))))

;;}}}
;;{{{ silence:

(defcustom emacspeak-silence-hook nil
  "Functions run after emacspeak-silence is called."
  :type '(repeat function)
  :group 'emacspeak)

;;;###autoload
(defun emacspeak-silence ()
  "Silence is golden. Stop speech, and pause/resume any media
streams. Runs `emacspeak-silence-hook' which can be used to
configure which media players get silenced or paused/resumed."
  (interactive)
  (cl-declare (special emacspeak-silence-hook))
  (dtk-stop)
  (run-hooks 'emacspeak-silence-hook))

;;}}}
;;{{{ Search

(defcustom emacspeak-search 'emacspeak-websearch-accessible-google
  "Default search engine."
  :type 'function
  :group 'emacspeak)

(defun emacspeak-search ()
  "Call search defined in \\[emacspeak-search]."
  (interactive)
  (cl-declare (special emacspeak-search))
  (call-interactively emacspeak-search))

;;}}}
;;{{{ Network interface utils:

(defun ems-get-active-network-interfaces ()
  "Return  names of active network interfaces."
  (when (fboundp 'network-interface-list)
     (seq-uniq (mapcar #'car (network-interface-list)))))

(defvar emacspeak-speak-network-interfaces-list
  (ems-get-active-network-interfaces)
  "Used when prompting for an interface to query.")

(defun ems-get-ip-address (dev)
  "get the IP-address for device DEV "
  (setq dev
        (or dev
            (completing-read
             "Device: "
             (ems-get-active-network-interfaces) nil t)))
  (format-network-address
   (car (network-interface-info dev))
   'omit-port))

;;}}}
;;{{{ Show active network interfaces

;;;###autoload
(defun emacspeak-speak-hostname ()
  "Speak host name."
  (interactive)
  (message (system-name)))

;;;###autoload
(defun emacspeak-speak-show-active-network-interfaces (&optional address)
  "Shows all active network interfaces in the echo area.
With interactive prefix argument ADDRESS it prompts for a
specific interface and shows its address. The address is
also copied to the kill ring for convenient yanking."
  (interactive "P")
  (kill-new
   (message
    (if address
        (ems-get-ip-address nil)
      (mapconcat #'identity 
                 (ems-get-active-network-interfaces)
                 " ")))))

;;}}}
;;{{{ Smart date prompers:

(defun emacspeak-speak-collect-date (prompt time-format-string)
  "Smart date collector.
Prompts with `prompt'.
`time-format-string' is format argument for format-time-string.
This function is sensitive to calendar mode when prompting."
  (let ((default (format-time-string time-format-string))) ; today is default
    (when (eq major-mode 'calendar-mode)
                                        ;get smart default from calendar
      (let ((date (calendar-cursor-to-nearest-date)))
        (setq default (format-time-string time-format-string
                                          (apply 'encode-time 0 0
                                                 0
                                                 (cl-second date)
                                                 (cl-first date)
                                                 (list (cl-third date)))))))
    (read-from-minibuffer prompt
                          default
                          nil nil nil
                          default)))

(defun emacspeak-speak-read-date-year/month/date ()
  "Return today as yyyy/mm/dd"
  (emacspeak-speak-collect-date "Date:"
                                "%Y/%m/%d"))

(defun emacspeak-speak-date-YearMonthDate ()
  "Return today as yyyymmdd"
  (emacspeak-speak-collect-date "Date:"
                                "%Y%m%d"))

(defun emacspeak-speak-date-month/date ()
  "Return today as mm/dd"
  (emacspeak-speak-collect-date "Date:"
                                "%m/%d"))

(defun emacspeak-speak-year-month-date ()
  "Return today as yyyy-mm-dd"
  (emacspeak-speak-collect-date "Date:"
                                "%Y-%m-%d"))
;;}}}
;;{{{ AppLauncher for use in X:
;;{{{ Navigating completions:

(defun emacspeak-minibuffer-next-completion ()
  "Move to next available minibuffer completion."
  (interactive)
  (or (get-buffer "*Completions*") (minibuffer-completion-help))
  (when (get-buffer "*Completions*")
    (with-current-buffer (get-buffer "*Completions*")
      (let ((voice-lock-mode nil))
        (funcall-interactively #'next-completion 1)))))

(defun emacspeak-minibuffer-previous-completion ()
  "Move to previous available minibuffer completion."
  (interactive)
  (or (get-buffer "*Completions*") (minibuffer-completion-help))
  (when (get-buffer "*Completions*")
    (with-current-buffer (get-buffer "*Completions*")
      (let ((voice-lock-mode nil))
        (funcall-interactively #'previous-completion 1)))))

;;; Hacked out of choose-completion
(defun emacspeak--choose-completion ()
  "Choose the completion at point."
  (interactive)
  (let ((buffer completion-reference-buffer)
        (base-position completion-base-position)
        (insert-function completion-list-insert-choice-function)
        (choice
         (save-excursion
           (let (beg end)
             (cond
              ((and (not (eobp)) (get-text-property (point) 'mouse-face))
               (setq end (point) beg (1+ (point))))
              ((and (not (bobp))
                    (get-text-property (1- (point)) 'mouse-face))
               (setq end (1- (point)) beg (point)))
              (t (error "No completion here")))
             (setq beg (previous-single-property-change beg 'mouse-face))
             (setq end (or (next-single-property-change end 'mouse-face)
                           (point-max)))
             (buffer-substring-no-properties beg end)))))
    (unless (buffer-live-p buffer) (error "Destination buffer is dead"))
    (with-current-buffer buffer
      (choose-completion-string choice buffer base-position insert-function))))

(defun emacspeak-minibuffer-choose-completion ()
  "Choose current completion."
  (interactive)
  (when (get-buffer "*Completions*")
    (with-current-buffer (get-buffer "*Completions*")
      (message "%s" (thing-at-point 'symbol))
      (emacspeak--choose-completion))))

(define-key minibuffer-local-completion-map "\C-n" 'emacspeak-minibuffer-next-completion)
(define-key minibuffer-local-completion-map "\C-p" 'emacspeak-minibuffer-previous-completion)
(define-key minibuffer-local-completion-map (kbd "C-@") 'emacspeak-minibuffer-choose-completion)
(define-key minibuffer-local-completion-map
  (kbd "C-SPC") 'emacspeak-minibuffer-choose-completion)

;;}}}
;;{{{ Open Emacspeak Info Pages:

(defun emacspeak-open-info ()
  "Open Emacspeak Info Manual."
  (interactive)
  (cl-declare (special emacspeak-info-directory))
  (funcall-interactively #'info (expand-file-name "emacspeak.info" emacspeak-info-directory) "*Emacspeak Info*"))

;;}}}
;;{{{ Describe help map:
;;;###autoload
(defun describe-help-keys ()
  "Show bindings under C-h."
  (interactive)
  (describe-bindings "\C-h")
  (emacspeak-auditory-icon 'help)
  (with-current-buffer (window-buffer (selected-window))
    (emacspeak-speak-mode-line)))

;;}}}
;;{{{Utility: Persist variable to a file:
(defun emacspeak--persist-variable (var file)
  "Persist variable  `var' to file `FILE'.
Arranges for `VAR' to be restored when `file' is loaded."
  (interactive)
  (when (and (not noninteractive) (boundp var))
    (let ((buffer (find-file-noselect file))
          (print-length nil)
          (print-level nil))
      (with-current-buffer buffer
        (erase-buffer)
        (insert ";;; Auto-generated.\n\n")
        (insert (format "(setq %s \n" var))
        (if (listp (symbol-value var)) (insert "'"))
        (pp (symbol-value var) (current-buffer))
        (insert (format ") ;;; set %s\n\n" var))
        (save-buffer)))))

;;}}}
;;{{{Text Mode Pronunciations:

(emacspeak-pronounce-add-dictionary-entry
      'text-mode
      (concat " -" emacspeak-pronounce-number-pattern)
      (cons
       #'re-search-forward
       #'(lambda (number)
           (concat
            " minus "
            (substring number 1)))))

;;}}}
(provide 'emacspeak-speak)
;;{{{ end of file

;;; local variables:
;;; folded-file: t
;;; end:

;;}}}
