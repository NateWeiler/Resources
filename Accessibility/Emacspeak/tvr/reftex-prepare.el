;; -*- lexical-binding: nil; -*-
;(load-library "reftex")
(eval-after-load "reftex"
`(progn
(setq reftex-enable-partial-scans t)
(setq reftex-save-parse-info t)
(setq reftex-use-multiple-selection-buffers t)
(setq reftex-plug-into-AUCTeX t)
(setq reftex-extra-bindings t)
(setq bib-cite-use-reftex-view-crossref t)
))(setq reftex-use-multiple-selection-buffers t)
