;;;$Id$  -*- lexical-binding: t; -*-

;(load-library "rng-auto")
(setq auto-mode-alist
      (cons '("\\.\\(xml\\|xsl\\|rng\\|xhtml\\|html\\)\\'" . nxml-mode)
            auto-mode-alist))

(defcustom nxml-xmlindent-program "xmlindent"
  "XML indent tool."
  :type 'string
  :group 'nxml)

(defcustom nxml-xmlindent-spaces 2
  "Number of spaces to use for each indent level."
  :type 'number
  :group 'nxml)

(defun nxml-xmlindent-visited-file ()
  "Reindents visited file and updates buffer."
  (interactive)
  (let ((this-file (buffer-file-name)))
    (unless this-file
      (error "Not visiting a file."))
    (save-buffer)
    (shell-command
     (format "%s -w -i %s %s"
             nxml-xmlindent-program
             nxml-xmlindent-spaces
             this-file))
    (revert-buffer nil 'quietly)
    (nxml-mode)))
(when (boundp 'nxml-mode-map)
(define-key nxml-mode-map "\C-x\C-i" 'nxml-xmlindent-visited-file))

(defalias 'xml-mode 'nxml-mode)
(defalias 'xhtml-mode 'nxml-mode)
(defalias 'html-mode 'nxml-mode)
(defalias 'sgml-mode 'nxml-mode)
(mapc
     (lambda (pair)
       (if (or (eq (cdr pair) 'xml-mode)
               (eq (cdr pair) 'sgml-mode)
               (eq (cdr pair) 'html-mode))
           (setcdr pair 'nxml-mode)))
     magic-mode-alist)

(mapc
     #'(lambda (pair)
       (if (or (eq (cdr pair) 'xml-mode)
               (eq (cdr pair) 'sgml-mode)
               (eq (cdr pair) 'html-mode))
           (setcdr pair 'nxml-mode)))
     auto-mode-alist)
;(setq xml-based-modes (cons 'nxml-mode xml-based-modes))
