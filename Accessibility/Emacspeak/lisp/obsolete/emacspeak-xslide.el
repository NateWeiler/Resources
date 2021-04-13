;;; emacspeak-xslide.el --- Speech enable  XSL authoring  -*- lexical-binding: t; -*-
;;; $Id$
;;; $Author: tv.raman.tv $
;;; Description:   extension to speech enable xslide
;;; Keywords: Emacspeak, Audio Desktop
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

;;; Copyright (C) 1995 -- 2015, T. V. Raman<raman@cs.cornell.edu>
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

;;{{{ required modules

(require 'emacspeak-preamble)
;;}}}
;;{{{  Introduction:

;;; Commentary:
;;; xslide is an emacs package for authoring and maintaining
;;; XSL stylesheets
;;; xslide is at http://www.mulberrytech.com/xsl/xslide/index.html
;;; this module speech-enables xslide

;;; Code:

;;}}}
;;{{{  speech-enable interactive commands
(unless (and (boundp 'post-self-insert-hook)
             post-self-insert-hook
             (memq 'emacspeak-post-self-insert-hook post-self-insert-hook))
  (defadvice xsl-electric-apos (after emacspeak pre act comp)
    "Speak char we inserted."
    (when (ems-interactive-p )
      (emacspeak-speak-this-char (preceding-char)))))

(defadvice xsl-electric-quote (after emacspeak pre act comp)
  "Speak char we inserted."
  (when (ems-interactive-p )
    (emacspeak-speak-this-char (preceding-char))))
(defadvice xsl-electric-lsqb (after emacspeak pre act comp)
  "Speak char we inserted."
  (when (ems-interactive-p )
    (emacspeak-speak-this-char (preceding-char))))
(defadvice xsl-electric-lpar (after emacspeak pre act comp)
  "Speak char we inserted."
  (when (ems-interactive-p )
    (emacspeak-speak-this-char (preceding-char))))

(defadvice xsl-electric-lcub (after emacspeak pre act comp)
  "Speak char we inserted."
  (when (ems-interactive-p )
    (emacspeak-speak-this-char (preceding-char))))
(defadvice xsl-electric-less-than (after emacspeak pre act comp)
  "Speak char we inserted."
  (when (ems-interactive-p )
    (emacspeak-speak-this-char (preceding-char))))

(defadvice xsl-electric-slash (after emacspeak pre act comp)
  "Speak char we inserted."
  (when (ems-interactive-p )
    (emacspeak-speak-this-char (preceding-char))))

(defadvice xsl-complete (around emacspeak pre act com)
  "Say what you completed"
  (let ((prior (point ))
        (emacspeak-speak-messages nil))
    (emacspeak-kill-buffer-carefully "*Completions*")
    ad-do-it
    (if (> (point) prior)
        (tts-with-punctuations
         'all
         (if (> (length (emacspeak-get-minibuffer-contents)) 0)
             (dtk-speak (emacspeak-get-minibuffer-contents))
           (emacspeak-speak-line)))
      (emacspeak-speak-completions-if-available))
    ad-return-value))
(defadvice xsl-mode (after emacspeak pre act comp)
  "set up for voice locking."
  (emacspeak-xsl-voice-lock-setup)
  (dtk-set-punctuations 'all))

(defun emacspeak-xsl-voice-lock-setup()
  "Setup voice locking for xsl mode."
  'no-op)

;;}}}
;;{{{ voice locking

(defvar xsl-alternate-personality
  voice-animate
  "Personality used in xsl highlighting.")

(defcustom xsl-fo-alternate-personality voice-monotone
  "Personality used in XSL highlighting."
  :group 'emacspeak-xslide)

(defcustom xsl-other-element-personality voice-animate
  "Personality used in XSL highlighting."
  :group 'emacspeak-xslide)

(defvar xsl-xsl-main-personality voice-bolden
  "Personality used for highlighting in XSL.")

;;}}}
(provide 'emacspeak-xslide)
;;{{{ end of file

;;; local variables:
;;; folded-file: t
;;; byte-compile-dynamic: nil
;;; end:

;;}}}
