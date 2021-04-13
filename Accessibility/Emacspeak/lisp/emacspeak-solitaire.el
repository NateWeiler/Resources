;;; emacspeak-solitaire.el --- Speech enable Solitaire game  -*- lexical-binding: t; -*-
;;; $Id$
;;; $Author: tv.raman.tv $ 
;;; Description: Auditory interface to solitaire
;;; Keywords: Emacspeak, Speak, Spoken Output, solitaire
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

;;; Copyright (c) 1995 -- 2018, T. V. Raman
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

(cl-declaim  (optimize  (safety 0) (speed 3)))
(require 'emacspeak-preamble)
(require 'solitaire)
;;}}}
;;{{{  Introduction 
;;; Commentary:
;;; Auditory interface to solitaire
;;; Code:
;;}}}
;;{{{  Communicate state

(defun emacspeak-solitaire-current-row ()
  (cl-declare (special solitaire-start-y))
  (+ 1 (/ 
        (- (solitaire-current-line)
           solitaire-start-y)
        2)))

(defun emacspeak-solitaire-current-column()
  (cl-declare (special solitaire-start-x))
  (let ((c (current-column)))
    (+ 1
       (/ (- c solitaire-start-x)
          4))))

(defun emacspeak-solitaire-speak-coordinates ()
  "Speak coordinates of current position"
  (interactive)
  (dtk-speak
   (format "%s at %s %s "
           (cl-case(char-after (point))
             (?o "stone")
             (?. "hole"))
           (emacspeak-solitaire-current-row)
           (emacspeak-solitaire-current-column)))
  (emacspeak-auditory-icon
   (emacspeak-solitaire-cell-to-icon (format "%c" (following-char)))))

(defun emacspeak-solitaire-speak-stones ()
  "Speak number of stones remaining."
  (interactive)
  (cl-declare (special solitaire-stones))
  (dtk-speak (format "%d stones" solitaire-stones)))

(defun emacspeak-solitaire-stone  () (dtk-tone 400 150))

(defun emacspeak-solitaire-hole () (dtk-tone 800 100))
(defun emacspeak-solitaire-speak-row ()
  "Speak current row."
  (interactive)
  (emacspeak-speak-line))

(defun emacspeak-solitaire-cell-to-icon (cell)
  "Map Solitaire cell to auditory icon."
  (cond
   ((string= cell ".") 'close-object)
   ((string= cell "o") 'item)))

(defun emacspeak-solitaire-show-row ()
  "Audio format current row."
  (interactive)
  (let ((cells
         (split-string
          (buffer-substring (line-beginning-position) (line-end-position)))))
    (emacspeak-play-auditory-icon-list (mapcar #'emacspeak-solitaire-cell-to-icon cells))))

(defun emacspeak-solitaire-show-column ()
  "Audio format current column."
  (interactive)
  (save-excursion
    (let ((row (emacspeak-solitaire-current-row))
          (column (emacspeak-solitaire-current-column))
          (cells nil))
;;; move to top row 
      (cl-loop for i  from 1 to(- row 1) do (solitaire-up))
      (cl-case (char-after (point))
        (?o (push "o" cells))
        (?. (push "." cells)))
      (cond
       ((and (>= column 3) (<= column 5))
        (cl-loop
         for count from 2 to 7 do
         (solitaire-down)
         (cl-case (char-after (point))
           (?o (push "o" cells))
           (?. (push "." cells)))))
       (t
        (cl-loop
         for count from 2 to 3 do
         (solitaire-down)
         (cl-case (char-after (point))
           (?o (push "o" cells))
           (?. (push "." cells))))))
      (setq cells (nreverse cells))
      (emacspeak-play-auditory-icon-list (mapcar #'emacspeak-solitaire-cell-to-icon cells)))))

;;}}}
;;{{{ advice commands

;;}}}
;;{{{ advice commands

(defvar emacspeak-solitaire-autoshow nil
  "*T means rows and columns are toned as we move")

(defadvice solitaire-left (after emacspeak pre act comp)
  "Provide auditory feedback"
  (when (ems-interactive-p)
    (let ((dtk-stop-immediately nil))
      (emacspeak-auditory-icon 'select-object)
      (and emacspeak-solitaire-autoshow (emacspeak-solitaire-show-column))
      (emacspeak-solitaire-speak-coordinates))))

(defadvice solitaire-right (after emacspeak pre act comp)
  "Provide auditory feedback"
  (when (ems-interactive-p)
    (let ((dtk-stop-immediately nil))
      (emacspeak-auditory-icon 'select-object)
      (and emacspeak-solitaire-autoshow  (emacspeak-solitaire-show-column))
      (emacspeak-solitaire-speak-coordinates))))

(defadvice solitaire-up (after emacspeak pre act comp)
  "Provide auditory feedback"
  (when (ems-interactive-p)
    (let ((dtk-stop-immediately nil))
      (emacspeak-auditory-icon 'select-object)
      (and emacspeak-solitaire-autoshow (emacspeak-solitaire-show-row))
      (emacspeak-solitaire-speak-coordinates))))

(defadvice solitaire-down (after emacspeak pre act comp)
  "Provide auditory feedback"
  (when (ems-interactive-p)
    (let ((dtk-stop-immediately nil))
      (emacspeak-auditory-icon 'select-object)
      (and emacspeak-solitaire-autoshow (emacspeak-solitaire-show-row))
      (emacspeak-solitaire-speak-coordinates))))

(defadvice solitaire-center-point (after emacspeak pre act comp)
  "Provide auditory feedback"
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'large-movement)
    (emacspeak-solitaire-speak-coordinates)))

(defadvice solitaire-move (after emacspeak pre act comp)
  "Provide auditory feedback"
  (emacspeak-auditory-icon 'item)
  (emacspeak-solitaire-speak-coordinates))

(defun emacspeak-solitaire-setup()
  "Emacspeak provides an auditory interface to the solitaire game.
As you move you hear the coordinates and state of the current cell.
Moving a stone produces an auditory icon.
You can examine the state of the board by using
`r' and `c' to listen to the row and column respectively.
Emacspeak produces tones to indicate the state --a higher pitched beep
indicates a hole.
Rows and columns are displayed aurally by
grouping the tones to provide structure.
Emacspeak specific commands:
               \\[emacspeak-solitaire-show-column] emacspeak-solitaire-show-column
\\[emacspeak-solitaire-show-row]                emacspeak-solitaire-show-row
               \\[emacspeak-solitaire-speak-coordinates]  emacspeak-solitaire-speak-coordinates"
  (delete-other-windows)
  (emacspeak-auditory-icon 'open-object)
  (emacspeak-solitaire-setup-keymap)
  (message "Welcome to Solitaire"))

(add-hook
 'solitaire-mode-hook
 #'emacspeak-solitaire-setup)
(defadvice solitaire-quit (after emacspeak pre act comp)
  "Provide auditory feedback"
  (when (ems-interactive-p)
    (emacspeak-auditory-icon 'task-done)
    (emacspeak-speak-mode-line)))

;;}}}
;;{{{  add keybindings

(defun emacspeak-solitaire-setup-keymap ()
  "Setup emacspeak keybindings for solitaire"
  (cl-declare (special solitaire-mode-map))
  (define-key solitaire-mode-map "/" 'emacspeak-solitaire-speak-stones)
  (define-key solitaire-mode-map "." 'emacspeak-solitaire-speak-coordinates)
  (define-key solitaire-mode-map "R" 'emacspeak-solitaire-speak-row)
  (define-key solitaire-mode-map "r" 'emacspeak-solitaire-show-row)
  (define-key solitaire-mode-map "c" 'emacspeak-solitaire-show-column)
  (define-key solitaire-mode-map "f" 'solitaire-move-right)
  (define-key solitaire-mode-map "b" 'solitaire-move-left)
  (define-key solitaire-mode-map "p" 'solitaire-move-up)
  (define-key solitaire-mode-map "n" 'solitaire-move-down)
  (define-key solitaire-mode-map "l" 'solitaire-right)
  (define-key solitaire-mode-map "h" 'solitaire-left)
  (define-key solitaire-mode-map "k" 'solitaire-up)
  (define-key solitaire-mode-map "j" 'solitaire-down))

;;}}}

(provide 'emacspeak-solitaire)
;;{{{ end of file 

;;; local variables:
;;; folded-file: t
;;; end: 

;;}}}
