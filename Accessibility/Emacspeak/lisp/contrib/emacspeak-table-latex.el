;; -*- lexical-binding: t; -*-
(require 'pymacs) 
;;;###autoload
(defvar  emacspeak-table-latex-py-helper
  (expand-file-name  "emacspeak-table"
                     (file-name-directory load-file-name))
  "PyMacs helper script.")

(defun emacspeak-table-display-latex-table-in-region (start end)
  "Recognize tabular data in current region and display it in table
browsing mode in a a separate buffer.
emacspeak table mode is designed to let you browse tabular data using
all the power of the two-dimensional spatial layout while giving you
sufficient contextual information.  The tables subdirectory of the
emacspeak distribution contains some sample tables --these are the
CalTrain schedules.  Execute command `describe-mode' bound to
\\[describe-mode] in a buffer that is in emacspeak table mode to read
the documentation on the table browser."
  (interactive "r")
  (declare (special emacspeak-table-latex-py-helper))
  (pymacs-load emacspeak-table-latex-py-helper)
  (let ((buffer-undo-list t)
        (buffer
         (get-buffer-create (format  "table-%s" (or (buffer-name) "scratch"))))
        (table nil)
        (data nil)
        (i 0)
        (j 0)
        (count 0)
        (row-start 1)
        (column-start 1)
        (text (buffer-substring start end)))
    (save-current-buffer
      (setq table (emacspeak-table-make-table
                   (emacspeak-table-parse-latex-table text))))
    (save-current-buffer
      (set-buffer buffer)
      (let ((inhibit-read-only t))
        (erase-buffer)
        (set (make-local-variable 'emacspeak-table) table)
        (set (make-local-variable 'positions) (make-hash-table))
        (setq count (1-  (emacspeak-table-num-columns table)))
        (loop for row across (emacspeak-table-elements table)
              do
              (loop for element across row
                    do
                    (setf
                     (gethash
                      (intern (format "element:%s:%s" i j ))
                      positions)
                     (point))
                    (insert
                     (format "%s%s"
                             (emacspeak-table-this-element table i j )
                             (if (=  j count)
                                 "\n"
                               "\t")))
                    (put-text-property column-start (point)
                                       'column j)
                    (setq column-start (point))
                    (incf j))
              (setq j 0)
              (put-text-property row-start (point) 'row i)
              (setq row-start (point))
              (incf i))
        (emacspeak-table-mode)
        (goto-char (point-min))))
    (switch-to-buffer buffer)
    (rename-buffer
     (format "%sX%s-%s"
             (emacspeak-table-num-rows emacspeak-table)
             (emacspeak-table-num-columns emacspeak-table)
             (buffer-name buffer) ))))
 
 
 
