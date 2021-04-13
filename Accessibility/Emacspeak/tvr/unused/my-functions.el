;;;$Id: my-functions.el,v 1.3 2002/08/25 15:35:11 tvraman Exp raman $(require 'cl)
(defalias 'my-debug 'toggle-debug-on-error)

(defun my-thanks-mail-signature()
  "insert thanks , --Raman at the end of mail message"
  (interactive)
  (goto-char (point-max))
  (insert
   (format "\n Thanks, \n --%s\n" (user-full-name))))

(defun tex-tie-current-word(n)
  (interactive "P")
  "Tie the next n  words."
  (or n (setq n 1))
  (while
      (> n 0)
    (setq n (- n 1))
    (forward-word 1)
    (delete-horizontal-space)
    (insert-char 126 1)
    )
  (forward-word 1))

(defun  byte-compile-current-buffer()
  "byte compile current buffer"
  (interactive)
  (byte-compile-file  (buffer-file-name )))

(defun load-current-file ()
  (interactive)
  "load file into emacs"
  (load-file (buffer-file-name)))

(defun end-of-word(arg)
  "move to end of word"
  (interactive "P")
  (if arg
      (forward-word arg)
    (forward-word 1)))

(defun comma-at-end-of-word()
  (interactive)
  "Move point to end of word and put a comma."
  (forward-word 1)
  (insert-char
   (string-to-char ",") 1))

(defun lacheck-buffer-file()
  (interactive)
  "Lacheck file visited in current buffer"
  (compile (format "lacheck %s"
                   (buffer-file-name (current-buffer)))))

(defun next-interactive-defun ()
  "Move point to the next interactive defun"
  (interactive)
  (end-of-defun)
  (re-search-forward "^ *(interactive")
  (beginning-of-defun)
  (emacspeak-speak-line))

(defun display-pod-as-manpage (filename)
  "Create a virtual manpage in Emacs from the Perl Online Documentation."
  (interactive
   (list
    (expand-file-name
     (read-file-name "Enter name of POD file: "))))
  (require 'man)
  (let* ((pod2man-args (concat filename " | nroff -man "))
         (bufname (concat "Man " filename))
         (buffer (generate-new-buffer bufname)))
    (save-excursion
      (set-buffer buffer)
      (let ((process-environment (copy-sequence process-environment)))
        ;; Prevent any attempt to use display terminal fanciness.
        (setenv "TERM" "dumb")
        (set-process-sentinel
         (start-process pod2man-program buffer "sh" "-c"
                        (format (cperl-pod2man-build-command) pod2man-args))
         'Man-bgproc-sentinel)))))

(provide 'my-functions)
