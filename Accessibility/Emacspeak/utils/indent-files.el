;;; indent.el --- Indent Emacspeak Source Code.  -*- lexical-binding: t; -*-

(require 'cl-lib)

(defun batch-indent-files ()
  "Batch indent  elisp files in directory."
  (let ((file-list (directory-files default-directory nil "\\.el$")))
    (setq-default indent-tabs-mode nil)
    (cl-loop
     for f in file-list do
     (let ((indent-tabs-mode nil))
       (find-file f)
       (emacs-lisp-mode)
       (goto-char (point-min))
       (while (re-search-forward "( +" (point-max) 'no-error)
         (unless
             (or
              (char-equal ?\\ (char-before (match-beginning 0)))
              (char-equal ?? (char-before (match-beginning 0))))
         (replace-match "(")))
       (goto-char (point-min))
       (while (re-search-forward " +)" (point-max) 'no-error)
         (unless
             (or
              (char-equal ??  (char-before (match-beginning 0)))
              (char-equal ?\\  (char-before (match-beginning 0))))
           (replace-match ")")))
       (indent-region (point-min) (point-max))
       (shell-command-on-region (point-min) (point-max)
                                "cat -s" (current-buffer) 'replace)
       (untabify (point-min) (point-max))
       (save-buffer)))))

(batch-indent-files)
