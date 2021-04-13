;;; plain-voices.el --- Define various device independent voices in terms of Plain codes  -*- lexical-binding: t; -*-
;;; $Author: tv.raman.tv $
;;; Description:  Module to set up Plain voices and personalities
;;; Keywords: Voice, Personality, Plain
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
;;; This module defines the various voices used in voice-lock mode.
;;; This module is Plain  i.e. suitable for a device  for which you haven't yet implemented appropriate voice-locking controls

;;}}}
;;{{{ required modules

;;; Code:
(require 'cl-lib)
(cl-declaim  (optimize  (safety 0) (speed 3)))
(cl-declaim  (optimize  (safety 0) (speed 3)))
(require 'acss-structure)
(require 'tts)

;;}}}
;;;{{{  Top-level TTS  switcher

;;;### autoload
(defun plain ()
  "Select Plain TTS server."
  (interactive)
  (dtk-select-server "plain")
  (dtk-initialize))

;;;### autoload

;;}}}
;;{{{ Forward declarations:

;;; From dtk-speak.el:

(defvar tts-default-speech-rate)
(defvar plain-default-speech-rate 75)
(defvar dtk-speech-rate-step)
(defvar dtk-speech-rate-base)

;;}}}
;;{{{  voice table

(defvar plain-default-voice-string ""
  "Plain string for  default voice --set to be a no-op.")

(defvar plain-voice-table (make-hash-table)
  "Association between symbols and strings to set Plain voices.
The string can set any  parameter.")

(defun plain-define-voice (name command-string)
  "Define a Plain voice named NAME.
This voice will be set   by sending the string
COMMAND-STRING to the TTS server."
  (cl-declare (special plain-voice-table))
  (puthash  name command-string  plain-voice-table))

(defun plain-get-voice-command (name)
  "Retrieve command string for  voice NAME."
  (cl-declare (special plain-voice-table))
  (cond
   ((listp name)
    (mapconcat #'plain-get-voice-command name " "))
   (t (or  (gethash name plain-voice-table)
           plain-default-voice-string))))

(defun plain-voice-defined-p (name)
  "Check if there is a voice named NAME defined."
  (cl-declare (special plain-voice-table))
  (gethash name plain-voice-table))

;;}}}
;;{{{ voice definitions

;;; the nine predefined voices:
(plain-define-voice 'paul "")
(plain-define-voice 'harry "")
(plain-define-voice 'dennis "")
(plain-define-voice 'frank "")
(plain-define-voice 'betty "")
(plain-define-voice 'ursula "")
(plain-define-voice 'rita "")
(plain-define-voice 'wendy "")
(plain-define-voice 'kit "")

;;}}}
;;{{{  the inaudible voice

;;; no special code needed --handled by Emacspeak engine.

(plain-define-voice 'inaudible "")

;;}}}
;;{{{  Mapping css parameters to Plain codes

;;{{{ voice family codes

(defvar plain-family-table nil
  "Association list of Plain voice names and control codes.")

(defun plain-set-family-code (name code)
  "Set control code for voice family NAME  to CODE."
  (cl-declare (special plain-family-table))
  (when (stringp name) (setq name (intern name)))
  (setq plain-family-table
        (cons (list name code)
              plain-family-table)))

(defun plain-get-family-code (name)
  "Get control code for voice family NAME."
  (cl-declare (special plain-family-table))
  (when (stringp name)
    (setq name (intern name)))
  (or (cadr (assq  name plain-family-table))
      ""))

(plain-set-family-code 'paul "")
(plain-set-family-code 'harry "")
(plain-set-family-code 'dennis "")
(plain-set-family-code 'frank "")
(plain-set-family-code 'betty "")
(plain-set-family-code 'ursula "")
(plain-set-family-code 'wendy "")
(plain-set-family-code 'rita "")
(plain-set-family-code 'kid "")

;;}}}
;;{{{  hash table for mapping families to their dimensions

(defvar plain-css-code-tables (make-hash-table)
  "Hash table holding vectors of Plain codes.
Keys are symbols of the form <FamilyName-Dimension>.
Values are vectors holding the control codes for the 10 settings.")

(defun plain-css-set-code-table (family dimension table)
  "Set up voice FAMILY.
Argument DIMENSION is the dimension being set,
and TABLE gives the values along that dimension."
  (cl-declare (special plain-css-code-tables))
  (let ((key (intern (format "%s-%s" family dimension))))
    (puthash  key table plain-css-code-tables)))

(defun plain-css-get-code-table (family dimension)
  "Retrieve table of values for specified FAMILY and DIMENSION."
  (cl-declare (special plain-css-code-tables))
  (let ((key (intern (format "%s-%s" family dimension))))
    (gethash key plain-css-code-tables)))

;;}}}
;;{{{ volume

(defvar plain-gain-table (make-vector  10 "")
  "Maps CSS volume settings to actual synthesizer codes.")

;;}}}
;;{{{  average pitch

;;; Average pitch for standard male voice is 122hz --this is mapped to
;;; a setting of 5.
;;; Average pitch varies inversely with speaker head size --a child
;;; has a small head and a higher pitched voice.
;;; We change parameter head-size in conjunction with average pitch to
;;; produce a more natural change 

;;{{{  paul average pitch

(let ((table (make-vector 10 "")))
  (mapcar
   (function
    (lambda (setting)
      (aset table
            (cl-first setting)
            (format "") ;no-op -- change to taste
            )))
   '(
     (0 96 115)
     (1 101 112)
     (2 108 109)
     (3 112 106)
     (4 118 103)
     (5 122  100)
     (6 128 98)
     (7 134 96)
     (8 140 94)
     (9 147 91)
     ))
  (plain-css-set-code-table 'paul 'average-pitch table))

;;}}}
;;{{{  harry average pitch
;;; Harry  has a big head --and a lower pitch for the middle setting

(let ((table (make-vector 10 "")))
  (mapcar
   (function
    (lambda (setting)
      (aset table
            (cl-first setting)
            (format "") ; no-op --- change to taste
            )))
   '(
     (0 50 125)
     (1 59 123)
     (2 68 121)
     (3 77 120)
     (4 83  118)
     (5 89 115)
     (6 95 112)
     (7 110 105)
     (8 125 100)
     (9 140 95)
     ))
  (plain-css-set-code-table 'harry 'average-pitch table))

;;}}}
;;{{{  betty average pitch

(let ((table (make-vector 10 "")))
  (mapcar
   (function
    (lambda (setting)
      (aset table
            (cl-first setting)
            (format ""); no-op --- change to taste
            )))
   '(
     (0 160 115)
     (1 170 112)
     (2 181 109)
     (3 192 106)
     (4 200 103)
     (5 208  100)
     (6 219 98)
     (7 225  96)
     (8 240 94)
     (9 260  91)
     ))
  (plain-css-set-code-table 'betty 'average-pitch table))

;;}}}

(defun plain-get-average-pitch-code (value family)
  "Get  AVERAGE-PITCH for specified VALUE and  FAMILY."
  (or family (setq family 'paul))
  (if value
      (aref (plain-css-get-code-table family 'average-pitch)
            value)
    ""))

;;}}}
;;{{{  pitch range

;;;  Standard pitch range is 100 and is  mapped to
;;; a setting of 5.
;;; A value of 0 produces a flat monotone voice --maximum value of 250
;;; produces a highly animated voice.
;;; Additionally, we also set the assertiveness of the voice so the
;;; voice is less assertive at lower pitch ranges.
;;{{{  paul pitch range

(let ((table (make-vector 10 "")))
  (mapcar
   (function
    (lambda (setting)
      (aset table
            (cl-first setting)
            (format ""); no-op --- chagne to taste.
            )))
   '(
     (0 0 0)
     (1 20 10)
     (2 40 20)
     (3 60 30)
     (4 80 40)
     (5 100 50)
     (6 137 60)
     (7 174 70)
     (8 211 80)
     (9 250 100)
     ))
  (plain-css-set-code-table 'paul 'pitch-range table))

;;}}}
;;{{{  harry pitch range

(let ((table (make-vector 10 "")))
  (mapcar
   (function
    (lambda (setting)
      (aset table
            (cl-first setting)
            (format ""); no-op --- change to taste
            )))
   '(
     (0 0 0)
     (1 16 20)
     (2 32 40)
     (3 48 60)
     (4 64 80)
     (5 80 100)
     (6 137 100)
     (7 174 100)
     (8 211 100)
     (9 250 100)
     ))
  (plain-css-set-code-table 'harry 'pitch-range table))

;;}}}
;;{{{  betty pitch range

(let ((table (make-vector 10 "")))
  (mapcar
   (function
    (lambda (setting)
      (aset table
            (cl-first setting)
            (format ""); no-op --- change to taste
            )))
   '(
     (0 0 0)
     (1 50 10)
     (2 80 20)
     (3 100 25)
     (4 110 30)
     (5 140 35)
     (6 165 57)
     (7 190 75)
     (8 220 87)
     (9 250 100)
     ))
  (plain-css-set-code-table 'betty 'pitch-range table))

;;}}}
(defun plain-get-pitch-range-code (value family)
  "Get pitch-range code for specified VALUE and FAMILY."
  (or family (setq family 'paul))
  (if value
      (aref (plain-css-get-code-table family 'pitch-range)
            value)
    ""))

;;}}}
;;{{{  stress

;;;  we vary four parameters
;;; The hat rise which controls the overall shape of the F0 contour
;;; for sentence level intonation and stress,
;;; The stress rise that controls the level of stress on stressed
;;; syllables,
;;; the baseline fall for paragraph level intonation
;;; and the quickness --a parameter that controls whether the final
;;; frequency targets are completely achieved in the phonetic
;;; transitions.
;;{{{  paul stress

(let ((table (make-vector 10 "")))
  (mapcar
   (function
    (lambda (setting)
      (aset table
            (cl-first setting)
            (format "") ; no-op --- edit to taste
            )))
   '(
     (0  0 0 0 0)
     (1 3 6  20 3)
     (2 6 12  40 6)
     (3 9 18  60 9)
     (4 12 24 80 14)
     (5 18 32  100 18)
     (6 34 50 100 20)
     (7 48  65 100 35)
     (8 63 82 100 60)
     (9 80  90 100  40)
     ))
  (plain-css-set-code-table 'paul 'stress table))

;;}}}
;;{{{  harry stress

(let ((table (make-vector 10 "")))
  (mapcar
   (function
    (lambda (setting)
      (aset table
            (cl-first setting)
            (format "") ; no-op --- change to taste
            )))
   '(
     (0  0 0 0 0)
     (1 4 6 2 2)
     (2 8 12 4 4)
     (3 12 18 6 6)
     (4 16 24 8 8)
     (5 20 30 10 9)
     (6 40  48 32 16)
     (7 60 66 54 22)
     (8 80 78 77 34)
     (9 100 100 100 40)
     ))
  (plain-css-set-code-table 'harry 'stress table))

;;}}}
;;{{{  betty stress

(let ((table (make-vector 10 "")))
  (mapcar
   (function
    (lambda (setting)
      (aset table
            (cl-first setting)
            (format "") ; no-op --- change to taste.
            )))
   '(
     (0  1 1 0 0)
     (1 3 4 11 0)
     (2 5 8 22 0)
     (3 8 12 33 0)
     (4 11  16 44 0)
     (5 14 20 55 0)
     (6 35 40 65 10)
     (7 56 80 75 20)
     (8 77 90 85 30)
     (9 100 100 100 40)
     ))
  (plain-css-set-code-table 'betty 'stress table))

;;}}}
(defun plain-get-stress-code (value family)
  (or family (setq family 'paul))
  (if value
      (aref (plain-css-get-code-table family 'stress)
            value)
    ""))

;;}}}
;;{{{  richness

;;; Smoothness and richness vary inversely.
;;; a  maximally smooth voice produces a quieter effect
;;; a rich voice is "bright" in contrast.
;;{{{  paul richness

(let ((table (make-vector 10 "")))
  (mapcar
   (function
    (lambda (setting)
      (aset table (cl-first setting)
            (format "") ; no-op --- change to taste
            )))
   '(
     (0 0 100)
     (1 14 80)
     (2 28 60)
     (3 42 40)
     (4 56 20)
     (5 70  3)
     (6 60 24)
     (7 70 16)
     (8 80 8 20)
     (9 100  0)
     ))
  (plain-css-set-code-table 'paul 'richness table))

;;}}}
;;{{{  harry richness

(let ((table (make-vector 10 "")))
  (mapcar
   (function
    (lambda (setting)
      (aset table (cl-first setting)
            (format "") ; no-op --- change to taste
            )))
   '(
     (0 100 0)
     (1 96 3)
     (2 93 6)
     (3 90 9)
     (4 88 11)
     (5 86 12)
     (6 60 24)
     (7 40 44)
     (8 20 65)
     (9 0 70)
     ))
  (plain-css-set-code-table 'harry 'richness table))

;;}}}
;;{{{  betty richness

(let ((table (make-vector 10 "")))
  (mapcar
   (function
    (lambda (setting)
      (aset table (cl-first setting)
            (format "") ; no-op -- change to taste.
            )))
   '(
     (0 0 100)
     (1 8 76)
     (2 16 52)
     (3 24  28)
     (4 32 10)
     (5 40 4)
     (6 50 3)
     (7 65 3)
     (8 80 8 2)
     (9 100  0)
     ))
  (plain-css-set-code-table 'betty 'richness table))

;;}}}

(defun plain-get-richness-code (value family)
  (or family (setq family 'paul))
  (if value
      (aref (plain-css-get-code-table family 'richness)
            value)
    ""))

;;}}}
;;{{{  punctuations

(defun plain-get-punctuations-code (value)
  "Return string needed to set specified punctuations mode."
  (if value
      (format "") ; no-op --- change to taste
    ""))

;;}}}

;;}}}
;;{{{  plain-define-voice-from-speech-style

(defun plain-define-voice-from-speech-style (name style)
  "Define NAME to be a Plain voice as specified by settings in STYLE."
  (let* ((family(acss-family style))
         (command
          (concat 
           (plain-get-family-code family)
           (plain-get-punctuations-code (acss-punctuations style))
           (when (or (acss-average-pitch style)
                     (acss-pitch-range style)
                     (acss-stress style)
                     (acss-richness style))
             (concat "  "
                     (plain-get-average-pitch-code (acss-average-pitch style) family)
                     (plain-get-pitch-range-code (acss-pitch-range style) family)
                     (plain-get-stress-code (acss-stress style) family)
                     (plain-get-richness-code (acss-richness style) family))))))
    (plain-define-voice name command)))

;;}}}
;;{{{ list voices

(defun plain-list-voices ()
  "List defined voices."
  (cl-declare (special plain-voice-table))
  (cl-loop for k being the hash-keys of plain-voice-table
           collect   k))

;;}}}
;;{{{ configurater
;;;###autoload
(defun plain-configure-tts ()
  "Configures TTS environment to use Plain family of synthesizers."
  (cl-declare (special  plain-default-speech-rate
                        tts-default-speech-rate
                        tts-default-voice))
  (setq tts-default-voice 'paul)
  (fset 'tts-list-voices 'plain-list-voices)
  (fset 'tts-voice-defined-p 'plain-voice-defined-p)
  (fset 'tts-get-voice-command 'plain-get-voice-command)
  (fset 'tts-voice-defined-p 'plain-voice-defined-p)
  (fset 'tts-define-voice-from-speech-style 'plain-define-voice-from-speech-style)
  (setq tts-default-speech-rate plain-default-speech-rate)
  (set-default 'tts-default-speech-rate plain-default-speech-rate))

;;}}}
;;{{{ tts-env for Plain:
;;;###autoload
(defun plain-make-tts-env  ()
  "Constructs a TTS environment for Plain."
  (cl-declare (special plain-default-speech-rate))
  (make-tts-env
   :name :plain :default-voice 'paul
   :default-speech-rate plain-default-speech-rate
   :list-voices #'plain-list-voices
   :acss-voice-defined-p #'plain-voice-defined-p
   :get-acss-voice-command #'plain-get-voice-command
   :define-voice-from-acss #'plain-define-voice-from-speech-style
   :speech-rate-base 100 :speech-rate-step 10))

(tts-env-set :plain  (plain-make-tts-env))

;;}}}
(provide 'plain-voices)
;;{{{  emacs local variables

;;; local variables:
;;; folded-file: t
;;; end:

;;}}}
