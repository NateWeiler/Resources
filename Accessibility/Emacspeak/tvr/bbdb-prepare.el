;; -*- lexical-binding: nil; -*-

;(load-library "bbdb-autoloads")
(eval-after-load "bbdb"
  `(progn
     ;; Configuration for bbdb
     (setq bbdb-ignore-some-messages-alist
           '(
             ("From" . "delivery system")
             ("From" . "delivery")
             ("From" . "listmaster")
             ("From" . "mailer-daemon")
             ("From" . "operator")
             ("From" . "post office")
             ("From" . "postmaster")
             ("From" . "root")
             ("From" . "admin")
             ("From" . "online")
             ("From" . "alert")
             ("From" . "webmaster")
             ("From" . "administ")
             ("From" . "daemon")))

     (setq bbdb-ignore-most-messages-alist
           '(
             ("To"   . "raman")))
     (setq bbdb-completion-type 'primary-or-name)

                                        ; Always save BBDB without asking
     (setq bbdb-offer-save 'always)

     ;; For bbdb-print

     (setq bbdb-use-pop-up nil)
     (setq bbdb-canonicalize-redundant-nets-p t)

     (when (featurep 'vm)
       (when (fboundp 'bbdb-save-db)
         (add-hook 'vm-quit-hook 'bbdb-save-db)))
     ))
