;; -*- lexical-binding: nil; -*-
(augment-load-path "go-mode.el" "go-mode")
(require 'go-mode)
(when (featurep 'yasnippet)
  (add-to-list
   'yas-snippet-dirs (expand-file-name "yasnippet-go" emacs-personal-library)))

(add-hook 'before-save-hook 'gofmt-before-save)
(add-hook
 'go-mode-hook
 #'(lambda ()
     (local-set-key (kbd "C-c C-r") 'go-remove-unused-imports)
     (local-set-key (kbd "C-c C-g") 'go-goto-imports)
     (local-set-key (kbd "C-c C-f") 'gofmt)
     (local-set-key (kbd "C-c C-k") 'godoc)))

(augment-load-path "goflymake"  "go-flymake")
(when (featurep 'flycheck)
  (require 'go-flycheck "go-flycheck" 'no-error))
;; (condition-case nil
;;     (progn
;;   (load "go-oracle/oracle")
;;   (add-hook 'go-mode-hook 'go-oracle-mode))
;;   (error "not loading go oracle support"))
