;;; emacspeak-url-template.el --- Create library of URI templates -*- lexical-binding: t; -*-
;;; $Id$
;;; $Author: tv.raman.tv $
;;; Description: Implement library of URI templates
;;; Keywords: Emacspeak, Audio Desktop
;;{{{ LCD Archive entry:

;;; LCD Archive Entry:
;;; emacspeak| T. V. Raman |raman@cs.cornell.edu
;;; A speech interface to Emacs |
;;; $Date: 2008-08-14 11:23:31 -0700 (Thu, 14 Aug 2008) $ |
;;; $Revision: 4626 $ |
;;; Location undetermined
;;;

;;}}}
;;{{{ Copyright:

;;; Copyright (C) 1995 -- 2018, T. V. Raman<raman@cs.cornell.edu>
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
;;; MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
;;; GNU General Public License for more details.
;;;
;;; You should have received a copy of the GNU General Public License
;;; along with GNU Emacs; see the file COPYING. If not, write to
;;; the Free Software Foundation, 675 Mass Ave, Cambridge, MA 02139, USA.

;;}}}
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;;{{{ Introduction:

;;; Commentary:

;;; It is often useful to have ``parametrized hot list entries''
;;; i.e., hotlist entries that are ``templates'' for the
;;; actual URL.
;;; The user provides values for the parametrized portions
;;; of the URL e.g. the date.
;;; See @xref{URL Templates}, for details on the URL templates
;;; that are presently defined.

;;; Code:

;;}}}
;;{{{ required modules
(require 'cl-lib)
(eval-when-compile (require 'subr-x))
(cl-declaim  (optimize  (safety 0) (speed 3)))
(require 'emacspeak-preamble)
(require 'emacspeak-webutils)
(require 'gweb)
(require 'g-utils)
(require 'emacspeak-we)
(require 'emacspeak-xslt)
(eval-when-compile (require 'calendar))
;;}}}
;;{{{ structures

(cl-defstruct (emacspeak-url-template
               (:constructor emacspeak-url-template-constructor))
  name ;Human-readable name
  template ;template URL string
  generators ; list of param generator
  post-action ;action to perform after opening
  documentation ;resource documentation
  fetcher ; custom fetcher
  dont-url-encode)

;;}}}
;;{{{ Helpers

(defun emacspeak-url-template-url (ut)
  "Instantiate URL identified by URL template."
  (let ((url
         (apply 'format
                (emacspeak-url-template-template ut)
                (mapcar
                 #'(lambda (g)
                     (let ((input nil))
                       (setq input
                             (cond
                              ((stringp g)
                               (if (emacspeak-url-template-dont-url-encode ut)
                                   (read-from-minibuffer g)
                                 (url-encode-url (read-from-minibuffer g))))
                              (t (funcall g))))
                       input))
                 (emacspeak-url-template-generators ut)))))
    url))

;;}}}
;;{{{ persistent store

(defvar emacspeak-url-template-table (make-hash-table :test 'equal)
  "Stores URL templates. ")

(defun emacspeak-url-template-set (key ut)
  "Add specified template to key. "
  (cl-declare (special emacspeak-url-template-table))
  (setf (gethash key emacspeak-url-template-table) ut))

;;;###autoload
(defun emacspeak-url-template-get (key)
  "Lookup key and return corresponding template. "
  (cl-declare (special emacspeak-url-template-table))
  (gethash key emacspeak-url-template-table))

;;}}}
;;{{{ define resources

;;;###autoload
(defun emacspeak-url-template-define (name template
                                           &optional generators post-action
                                           documentation fetcher
                                           dont-url-encode)
  "Define a URL template.

name Name used to identify template
template Template URI with `%s' for slots
generators List of prompters.
 Generators are strings or functions.
 String values specify prompts.
 Function values are called to obtain values.
post-action Function called to apply post actions.
 Possible actions include speaking the result.
fetcher Unless specified, browse-url retrieves URL.
 If specified, fetcher is a function of one arg
 that is called with the URI to retrieve.
documentation Documents this template resource.
dont-url-encode if true then url arguments are not url-encoded "
  (cl-declare (special emacspeak-url-template-table))
  (emacspeak-url-template-set
   name
   (emacspeak-url-template-constructor
    :name name
    :template template
    :generators generators
    :post-action post-action
    :documentation documentation
    :fetcher fetcher
    :dont-url-encode dont-url-encode)))

;;;###autoload
(defun emacspeak-url-template-load (file)
  "Load URL template resources from specified location."
  (interactive
   (list
    (read-file-name "Load URL templates from file: "
                    emacspeak-resource-directory)))
  (condition-case nil
      (progn
        (load
         (expand-file-name file emacspeak-resource-directory)))
    (error (message "Error loading resources from %s "
                    file))))

(defun emacspeak-url-template-save (file)
  "Save out url templates."
  (interactive
   (list
    (read-file-name "Save URL templates to: " emacspeak-resource-directory)))
  (cl-declare (special emacspeak-resource-directory))
  (let ((print-level nil)
        (print-length nil)
        (buffer (find-file-noselect
                 (expand-file-name file emacspeak-resource-directory))))
    (with-current-buffer buffer
      (setq buffer-undo-list t)
      (erase-buffer)
      (cl-loop
       for key being the hash-keys of emacspeak-url-template-table do
       (insert
        (format
         "\n(setf
 (gethash %s emacspeak-url-template-table)\n %s)"
         (prin1-to-string key)
         (prin1-to-string (emacspeak-url-template-get key)))))
      (basic-save-buffer)
      (kill-buffer buffer))))

;;}}}
;;; template resources
;;{{{ fedex, UPS

(emacspeak-url-template-define
 "fedex packages"
 "http://www.fedex.com/cgi-bin/tracking?link=6&pv=ja&action=track&ftc_3=null&template_type=ftc&language=english&last_action=track&ascend_header=1&cntry_code=us&initial=x&mps=y&ascend_header=1&cntry_code=us&initial=x&tracknumber_list=%s"
 (list "Tracking Number: ")
 nil
 "Display package tracking information from Fedex.")

(emacspeak-url-template-define
 "UPS Packages"
 "http://wwwapps.ups.com/WebTracking/processInputRequest?HTMLVersion=5.0&sort_by=status&tracknums_displayed=5&TypeOfInquiryNumber=T&loc=en_US&InquiryNumber1=%s&InquiryNumber2=&InquiryNumber3=&InquiryNumber4=&InquiryNumber5=&track.x=0&track.y=0&AgreeToTermsAndConditions=yes"
 (list "Tracking Number: ")
 nil
 "Display package tracking information from UPS."
 #'(lambda (url)
     (emacspeak-we-extract-by-class "dataTable" url 'speak)))

;;}}}
;;{{{ amazon

(emacspeak-url-template-define
 "Amazon Product Details By ASIN"
 "https://amazon.com/o/dt/upda-1.0-i/tg/aa/upda/item/-/%s"
 (list "ASIN Or ISBN: ")
 nil
 "Retrieve product details from Amazon by either ISBN or ASIN.")

;;}}}
;;{{{ old time radio

(emacspeak-url-template-define
 "Old Time Radio"
 "http://www.oldtimeradioprograms.com"
 nil
 nil
 "This months Old Time Radio Programming"
 #'(lambda (url)
     (emacspeak-we-extract-nested-table-list
      (list 2 3)
      url)))

;;}}}
;;{{{ Guardian Feed Directory:
(emacspeak-url-template-define
 "Guardian RSS Feeds Directory"
 "http://rss2.io/lists/guardian.opml"
 nil nil
 "Guardian Feeds  Directory"
 #'emacspeak-feeds-opml-display)

;;}}}
;;{{{ bbc

(emacspeak-url-template-define
 "BBC World News Summary"
 "http://opml.radiotime.com/Tune.ashx?c=pbrowse&id=p193595"
 nil nil
 "BBC World News Summary"
 #'emacspeak-feeds-opml-display)

(emacspeak-url-template-define
 "BBC Program Guide (not maintained)"
 "http://downloads.bbc.co.uk/podcasts/ppg.xml"
 nil nil
 "Display interactive BBC Program Guide."
 #'(lambda (url)
     (emacspeak-xslt-view-xml
      (emacspeak-xslt-get "bbc-ppg.xsl") url)))
(emacspeak-url-template-define
 "BBC Podcast Directory"
 "http://www.bbc.co.uk/podcasts.opml"
                                        ;"http://www.bbc.co.uk/radio/opml/bbc_podcast_opml.xml"
 nil nil
 "BBC PodCast Directory"
 #'emacspeak-feeds-opml-display)

;;}}}
;;{{{ html5irc

(emacspeak-url-template-define
 "html5IRC"
 "http://krijnhoetmer.nl/irc-logs/whatwg/%s"
 (list 'emacspeak-speak-date-YearMonthDate)
 nil
 "Show HTML5 IRC log.")

;;}}}
;;{{{ google image search:

(emacspeak-url-template-define
 "Google Image Search"
 "http://www.google.com/search?gbv=1&bih=&biw=&hl=en&tbm=isch&btnG=Search+Images&q=%s"
 (list "Search:")
 nil
 "Google Image Search"
 #'(lambda (url)
     (emacspeak-we-extract-by-id "res" url 'speak)))

;;}}}
;;{{{ Google Trends:

(emacspeak-url-template-define
 "Google Trends"
 "https://www.google.com/trends/hottrends/atom/feed?pn=p1"
 nil nil
 "Google Trends"
 #'emacspeak-feeds-rss-display)

;;}}}
;;{{{ utils:

(defun emacspeak-url-template-setup-content-filter ()
  "Set up content filter in displayed page."
  (cl-declare (special emacspeak-we-xpath-filter emacspeak-we-paragraphs-xpath-filter))
  (setq emacspeak-we-xpath-filter emacspeak-we-paragraphs-xpath-filter))

;;}}}
;;{{{ webmaster tools
(emacspeak-url-template-define
 "Google Webmaster Page Analysis"
 "https://www.google.com/webmasters/tools/pageanalysis?siteUrl=%s"
 (list "URL To Analyze: ")
 nil
 "Page Analysis From Google Webmaster tools.")

;;}}}
;;{{{ Anonimize google search
(emacspeak-url-template-define
 "Sign in to Google"
 "https://accounts.google.com/ServiceLogin?hl=en&continue=https://www.google.com/"
 nil
 nil
 "Login to Google.")

(emacspeak-url-template-define
 "Anonymize Google Search"
 "https://www.google.com/accounts/Logout"
 nil
 nil
 "Logout from Google to do an anonymous search.")

;;}}}
;;{{{Basic Google:

(emacspeak-url-template-define
 "Google Basic"
 "https://www.google.com/search?num=25&gbv=1&q=%s"
 (list #'gweb-google-autocomplete)
 #'(lambda nil
     (search-forward "Search Tools")
     (forward-line 1)
     (emacspeak-auditory-icon 'open-object)
     (emacspeak-speak-rest-of-buffer))
 "Light-weight Google search.")

;;; forward declaration:
(defvar gweb-my-zip nil)
(emacspeak-url-template-define
 "Google Weather"
 (format "https://www.google.com/search?num=25&gbv=1&q=weather+%s"
         gweb-my-zip)
 nil
 #'(lambda nil
     (search-forward "Search Tools")
     (forward-line 1)
     (emacspeak-auditory-icon 'open-object)
     (emacspeak-speak-rest-of-buffer))
 "Light-weight Google search.")
;;}}}
;;{{{ Calendar Mobile:

;;}}}
;;{{{ google patent search:

(emacspeak-url-template-define
 "Patent Search From Google"
 "https://www.google.com/patents?ie=ISO-8859-1&q=%s"
 (list "Google For Patents: ")
 #'(lambda nil
     (search-forward " Patent Search" nil t)
     (beginning-of-line)
     (emacspeak-speak-rest-of-buffer))
 "Perform patent search via Google"
 #'(lambda (url)
     (emacspeak-we-extract-by-id "center_col" url 'speak)))

;;}}}
;;{{{ seeking alpha stock search

(emacspeak-url-template-define
 "Seeking Alpha Stock Search"
 "http://seekingalpha.com/search/?cx=001514237567335583750%%3Acdhc2yeo2ko&cof=FORID%%3A11%%3BNB%%3A1&q=%s"
 (list "Company:")
 nil
 "Seeking Alpha search."

 #'(lambda (url)
     (emacspeak-we-extract-by-id "content_section" url 'speak))
 )

;;}}}
;;{{{ google finance

(emacspeak-url-template-define
 "Finance Google Search"
 "https://finance.google.com/finance?q=%s"
 (list "Finance Search: ")
 nil
 "Display content from Google Finance."
 #'(lambda (url)
     (emacspeak-we-extract-by-id "res" url 'speak)))

;;}}}
;;{{{ google scholar

(emacspeak-url-template-define
 "Google Scholar"
 "https://scholar.google.com/scholar?ie=UTF-8&oe=UTF-8&hl=en&btnG=Search&num=25&q=%s"
 (list "Google Scholar Search: ")
 nil
 "Google Scholar Search"
 #'(lambda (url)
     (emacspeak-we-extract-by-class "gs_r" url 'speak)))

;;}}}
;;{{{ google translation service

;;}}}
;;{{{ dictionary.com:
(emacspeak-url-template-define
 "Dictionary Lookup"
 "http://dictionary.reference.com/search?q=%s"
 (list "Dictionary Lookup: ")
 #'(lambda ()
     (search-forward "entries found for " nil t)
     (emacspeak-speak-line))
 "Dictionary Lookup"
 #'(lambda (url)
     (emacspeak-webutils-without-xsl
         (browse-url url))))

;;}}}
;;{{{ NY Times
(emacspeak-url-template-define
 "NY Times RSS Feeds"
 "http://www.nytimes.com/services/xml/rss/nyt/index.opml"
 nil
 nil
 "Display browsable list of NY Times RSS Feeds."
 #'(lambda (url)
     (let ((buffer
            (emacspeak-xslt-xml-url
             (emacspeak-xslt-get "opml.xsl")
             url)))
       (save-current-buffer
         (set-buffer buffer)
         (browse-url-of-buffer)))))

(emacspeak-url-template-define
 "NY Times Mobile"
 "https://mobile.nytimes.com"
 nil
 #'(lambda ()
     (emacspeak-url-template-setup-content-filter)
     (emacspeak-speak-buffer))
 "NYTimes Mobile Site"
 #'(lambda (url)
     (emacspeak-we-xslt-filter "//article" url)))

;;}}}
;;{{{ google OverviewOfNews

(emacspeak-url-template-define
 "html Google News Search"
 "https://news.google.com/news?hl=en&ned=tus&q=%s&btnG=Google+Search"
 (list #'gweb-news-autocomplete)
 #'(lambda ()
     (emacspeak-url-template-setup-content-filter)
     (emacspeak-speak-rest-of-buffer))
 "Search Google news.")

(defun emacspeak-url-template-google-atom-news-display (feed-url)
  "View Google Atom news feed pulled using Curl."
  (cl-declare (special emacspeak-atom-view-xsl
                       g-curl-program g-curl-common-options))
  (emacspeak-webutils-autospeak)
  (g-display-result
   (format
    "%s %s    '%s' 2>/dev/null"
    g-curl-program g-curl-common-options feed-url)
   emacspeak-atom-view-xsl))

(emacspeak-url-template-define
 "Google News Search"
 "https://news.google.com/atom/search?hl=en-US&q=%s&btnG=Google+Search&gl=US&ceid=US:en "
 (list #'gweb-news-autocomplete)
 nil
 "Search Google news."
 #'emacspeak-url-template-google-atom-news-display)

(defvar emacspeak-url-template-google-transcoder-url
  "https://www.google.com/gwt/n?_gwt_noimg=1&output=xhtml&u=%s"
  "URL for obtaining mobile transcoder page views.")

(emacspeak-url-template-define
 "Google Transcoder"
 emacspeak-url-template-google-transcoder-url
 (list
  #'(lambda ()
      (read-from-minibuffer "URL: "
                            (or (browse-url-url-at-point)
                                "http://"))))
 'emacspeak-speak-buffer
 "Transcode site via Google.")

;;}}}
;;{{{ Google Structured Data Parser:

;;}}}
;;{{{ Google Archive Search

;;}}}
;;{{{ cnet news

(emacspeak-url-template-define
 "Tech News From CNet"
 "http://feeds.feedburner.com/cnet/tcoc"
 nil
 'emacspeak-url-template-setup-content-filter
 "Display tech news from CNET"
 #'emacspeak-feeds-rss-display)

(emacspeak-url-template-define
 "PodCast CNet"
 "http://podcast-files.cnet.com/podcast/cnet_podcast_%s.mp3"
 (list
  #'(lambda nil
      (read-from-minibuffer
       "Date: "
       (format-time-string "%m%d%y"))))
 nil
 "Play Podcast from CNET"
 #'(lambda (url)
     (emacspeak-m-player url)))

;;}}}
;;{{{ yahoo daily news
(emacspeak-url-template-define
 "Yahoo RSSNews"
 "http://news.yahoo.com/rss"
 nil
 #'(lambda ()
     (emacspeak-pronounce-add-buffer-local-dictionary-entry
      "http://rss.news.yahoo.com/rss/" ""))
 "News  From Yahoo As RSS."
 #'emacspeak-feeds-rss-display)

;;}}}
;;{{{ w3c

(emacspeak-url-template-define
 "w3c IRC Logs"
 "http://www.w3.org/%s-%s-irc "
 (list
  #'(lambda nil
      (emacspeak-speak-collect-date "Date: "
                                    "%Y/%m/%d"))
  "Channel Name: ")
 #'(lambda ()
     (let ((inhibit-read-only t))
       (flush-lines "has joined #" (point-min) (point-max))
       (flush-lines "has left #" (point-min) (point-max))))
 "Use this to pull up the
archived logs from the W3C IRC. You need to know the exact
name of the channel.")

(emacspeak-url-template-define
 "w3c Lists"
 "http://lists.w3.org/Archives/Member/%s/%s/"
 (list
  'emacspeak-url-template-get-w3c-group
  'emacspeak-url-template-get-w3c-year/month)
 nil
 "Use this to pull up the
archived mail from the W3C list. You need to know the exact
name of the list.")

(defun emacspeak-url-template-get-w3c-group ()
  "Get name of W3C group "
  (read-from-minibuffer "W3C group: "
                        "w3c-"))

(defun emacspeak-url-template-get-w3c-year/month ()
  "Get year/month"
  (emacspeak-speak-collect-date "Date range: "
                                "%Y%h"))

;;}}}
;;{{{ cnn

(emacspeak-url-template-define
 "CNN PodCasts"
 "http://www.cnn.com/services/podcasting/"
 nil
 nil
 "List CNN Podcast media links.")
(defun emacspeak-url-template-cnn-content (url)
  "Extract CNN content."
  (emacspeak-we-extract-by-class
   "zn-body__paragraph" url 'speak))

(emacspeak-url-template-define
 "CNN Content"
 "http://www.cnn.com/us"
 nil
 #'(lambda nil
     (cl-declare (special emacspeak-we-url-executor))
     (eww-display-dom-by-element 'h3)
     (setq
      emacspeak-we-url-executor 'emacspeak-url-template-cnn-content))
 "Filter down to CNN content area."
 #'(lambda (url)
     (emacspeak-we-extract-by-class "column" url 'speak)))

(emacspeak-url-template-define
 "CNN Headlines"
 "http://rss.cnn.com/rss/cnn_latest.rss"
 nil
 #'(lambda nil
     (cl-declare (special emacspeak-we-url-executor))
     (setq
      emacspeak-we-url-executor 'emacspeak-url-template-cnn-content))
 "News Headlines From CNN"
 #'emacspeak-feeds-rss-display)

(emacspeak-url-template-define
 "Money Headlines From CNN"
 "https://cnn.com/business"
 nil
 #'(lambda nil
     (cl-declare (special emacspeak-we-url-executor))
     (eww-display-dom-by-element 'h3)
     (setq
      emacspeak-we-url-executor 'emacspeak-url-template-cnn-content))
 "Money Headlines From CNN")

(emacspeak-url-template-define
 "world CNN Content"
 "http://www.cnn.com/world"
 nil
 #'(lambda nil
     (cl-declare (special emacspeak-we-url-executor))
     (eww-display-dom-by-element 'h3)
     (setq
      emacspeak-we-url-executor 'emacspeak-url-template-cnn-content))
 "Filter down to CNN content area."
 #'(lambda (url)
     (emacspeak-we-extract-by-class "column" url 'speak)))

(emacspeak-url-template-define
 "CNN Market Data "
 "http://money.cnn.com/markets/data/"
 nil
 #'(lambda nil
     (cl-declare (special emacspeak-we-url-executor))
     (setq
      emacspeak-we-url-executor 'emacspeak-url-template-cnn-content))
 "Market data filtered from CNN Money"
 #'(lambda (url)
     (emacspeak-we-extract-by-role
      "main" 
      url 'speak)))

;;}}}
;;{{{ sourceforge

(emacspeak-url-template-define
 "sourceforge project"
 "http://sourceforge.net/projects/%s"
 (list "Project name")
 nil
 "Open specified project page at SourceForge.")

(emacspeak-url-template-define
 "sourceforge browse mirrors"
 "http://prdownloads.sourceforge.net/%s/?sort_by=date"
 (list "Project name")
 nil
 "Retrieve download page at Sourceforge for specified project.")

(emacspeak-url-template-define
 "sourceforge Download"
 "http://prdownloads.sourceforge.net/%s"
 (list "File: project/filename: ")
 nil
 "Download specified file."
 'browse-url
 'dont-url-encode)

;;}}}
;;{{{ MLB scores
(declare-function emacspeak-wizards-mlb-standings  "emacspeak-wizards" nil)
;;; standings:

(emacspeak-url-template-define
 "MLB Scorecard"
                                        ;"http://gd.mlb.com/components/game/mlb/%s/master_scoreboard.xml"
 "http://gd.mlb.com/components/game/mlb/%s/scoreboard.xml"
 (list
  #'(lambda nil
      (let ((date
             (emacspeak-speak-collect-date
              "Date: "
              "%Y-%m-%d"))
            (fields nil)
            (result nil))
        (setq fields (split-string date "-"))
        (setq result
              (format
               "year_%s/month_%s/day_%s"
               (cl-first fields)
               (cl-second fields)
               (cl-third fields)))
        result))
  )
 'emacspeak-speak-buffer
 "Show MLB Scorecard."
 #'(lambda (url)
     (emacspeak-xslt-view-xml
      (emacspeak-xslt-get "mlb-scorecard.xsl")
      url)))

(emacspeak-url-template-define
 "MLB standings"
 "http://www.mlb.com/NASApp/mlb/mlb/standings/index.jsp" ;;; dummy
 nil
 nil
 "Display MLB standings."
 #'(lambda (_url)
     (emacspeak-wizards-mlb-standings)))

(emacspeak-url-template-define
 "Baseball Game Index"
                                        ;"http://gd.mlb.com/components/game/%s"
 "http://gd.mlb.com/components/game/mlb/%s/"
 (list
  #'(lambda nil
      (let ((date
             (emacspeak-speak-collect-date "Date: "
                                           "%Y-%m-%d"))
            (fields nil)
            (result nil))
        (setq fields (split-string date "-"))
        (setq result
              (format
               "year_%s/month_%s/day_%s/"
               (cl-first fields)
               (cl-second fields)
               (cl-third fields)))
        result)))
 nil
 "Display baseball Play By Play."
 )

(emacspeak-url-template-define
 "Baseball Highlights"
 "http://gd2.mlb.com/components/game/mlb/%s_%smlb_%smlb_1/media/mobile.xml"
 (list
  #'(lambda nil
      (let ((date
             (emacspeak-speak-collect-date
              "Date: "
              "%Y-%m-%d"))
            (fields nil)
            (result nil))
        (setq fields (split-string date "-"))
        (setq result
              (format
               "year_%s/month_%s/day_%s/gid_%s_%s_%s"
               (cl-first fields)
               (cl-second fields)
               (cl-third fields)
               (cl-first fields)
               (cl-second fields)
               (cl-third fields)))
        result))
  "Visiting Team: "
  "Home Team: ")
 nil
 "Display baseball Video Highlights."
 #'(lambda (url)
     (emacspeak-webutils-autospeak)
     (emacspeak-xslt-view-xml
      (emacspeak-xslt-get "mlb-media.xsl") url)))

(emacspeak-url-template-define
 "Baseball Game Details"
 "http://gd2.mlb.com/components/game/mlb/%s_%smlb_%smlb_1/"
 (list
  #'(lambda nil
      (let ((date
             (emacspeak-speak-collect-date
              "Date: "
              "%Y-%m-%d"))
            (fields nil)
            (result nil))
        (setq fields (split-string date "-"))
        (setq result
              (format
               "year_%s/month_%s/day_%s/gid_%s_%s_%s"
               (cl-first fields)
               (cl-second fields)
               (cl-third fields)
               (cl-first fields)
               (cl-second fields)
               (cl-third fields)))
        result))
  "Visiting Team: "
  "Home Team: ")
 nil
 "Display baseball Play By Play.")

(defun emacspeak-url-dtemplate--mlb-play-by-play (url)
  "Display Play By Play details for an MLB game.
JSON is retrieved from `url'."
  (let ((inhibit-read-only t)
        (buffer (get-buffer-create "*Baseball Play By Play*"))
        (plays (g-json-from-url url)))
    (with-current-buffer buffer
      (erase-buffer)
      (insert (prin1-to-string plays))
      (special-mode)
      (goto-char (point-min)))
    (funcall-interactively #'switch-to-buffer buffer)))

(emacspeak-url-template-define
 "Baseball Box Scores"
 "http://gd2.mlb.com/components/game/mlb/%s_%smlb_%smlb_1/boxscore.json"
 (list
  #'(lambda nil
      (let ((date
             (emacspeak-speak-collect-date
              "Date: "
              "%Y-%m-%d"))
            (fields nil)
            (result nil))
        (setq fields (split-string date "-"))
        (setq result
              (format
               "year_%s/month_%s/day_%s/gid_%s_%s_%s"
               (cl-first fields)
               (cl-second fields)
               (cl-third fields)
               (cl-first fields)
               (cl-second fields)
               (cl-third fields)))
        result))
  "Visiting Team: "
  "Home Team: ")
 nil
 "Display baseball Play By Play."
 #'emacspeak-url-dtemplate--mlb-play-by-play)

(emacspeak-url-template-define
 "Baseball scores"
 "http://gd.mlb.com/components/game/mlb/%s_%smlb_%smlb_1/boxscore.html"
 (list
  #'(lambda nil
      (let ((date
             (emacspeak-speak-collect-date
              "Date: "
              "%Y-%m-%d"))
            (fields nil)
            (result nil))
        (setq fields (split-string date "-"))
        (setq result
              (format
               "year_%s/month_%s/day_%s/gid_%s_%s_%s"
               (cl-first fields)
               (cl-second fields)
               (cl-third fields)
               (cl-first fields)
               (cl-second fields)
               (cl-third fields)))
        result))
  "Visiting Team: "
  "Home Team: ")
 nil
 "Display baseball scores."
 )

;;}}}
;;{{{ NBA Standings:
(declare-function emacspeak-wizards-nba-standings  "emacspeak-wizards" nil)
(emacspeak-url-template-define
 "NBA  standings"
 "http://www.nba.com/NASApp/nba/nba/standings/index.jsp" ;;; dummy
 nil
 nil
 "Display NBA standings."
 #'(lambda (_url)
     (emacspeak-wizards-nba-standings)))

;;}}}
;;{{{ Listening to Air Traffic control

(emacspeak-url-template-define
 "Air Traffic Control"
 "http://www.liveatc.net/search?icao=%s"
 (list "Airport Code: ")
 nil
 "Find live streams for Air Traffic Control."
 #'(lambda (url)
     (emacspeak-we-extract-by-class
      "col1wrap"
      url
      'speak)))

;;}}}
;;{{{ times of india

(emacspeak-url-template-define
 "Times Of India"
 "http://www.timesofindia.com"
 nil
 nil
 "Retrieve Times Of India."
 #'(lambda (url)
     (emacspeak-we-extract-by-id "content" url 'speak)))

;;}}}
;;{{{ weather underground

(emacspeak-url-template-define
 "Weather forecast from Weather Underground"
 "http://mobile.wunderground.com/cgi-bin/findweather/getForecast?query=%s"
 (list
  #'(lambda ()
      (read-from-minibuffer "Zip: "
                            (bound-and-true-p gweb-my-zip))))
 #'(lambda ()
     (with-demoted-errors
         (eww-display-dom-by-class "city-body"))
     (goto-char (point-min))
     (emacspeak-speak-buffer))
 "Weather forecast from weather underground mobile.")

;;}}}
;;{{{ airport conditions:
(emacspeak-url-template-define
 "Airport conditions"
 "http://www.fly.faa.gov/flyfaa/flyfaaindex.jsp?ARPT=%s&p=0"
 (list "Airport Code:")
 nil
 "Display airport conditions from the FAA."
 #'(lambda (url)
     (emacspeak-we-extract-table-by-match "Status"
                                          url 'speak)))

;;}}}
;;{{{ emacs wiki search

(emacspeak-url-template-define
 "EmacsWiki Search"
 "http://www.emacswiki.org/cgi-bin/wiki?search=%s"
 (list "Search EmacsWiki For: ")
 #'(lambda nil
     (search-forward "Result page" nil t)
     (emacspeak-speak-line))
 "EmacsWiki Search")

;;}}}
;;{{{ wordnet

(emacspeak-url-template-define
 "WordNet Search"
 "http://wordnetweb.princeton.edu/perl/webwn?s=%s&o1=1&o8=1&o0=1&sub=Search+WordNet"
 (list "WordNet Define: ")
 #'(lambda ()
     (search-forward "(gloss)")
     (forward-line 1)
     (emacspeak-speak-rest-of-buffer))
 "Look up term in WordNet.")

;;}}}
;;{{{ Radio station streams

(emacspeak-url-template-define
 "StreamWorld Radio"
 "http://provisioning.streamtheworld.com/pls/%s.pls"
 (list
  #'(lambda () (upcase (read-from-minibuffer "Station ID: "))))
 nil
 "Play radio stream.
Example: kcbsFM.
Format is stationid+AM/FM."
 #'(lambda (url)
     (emacspeak-m-player url 'playlist)))

;;}}}
;;{{{ Bing RSS

(emacspeak-url-template-define
 "Bing Search"
 "http://www.bing.com/search?format=rss&q=%s%s"
 (list
  "Bing Search: "
  #'(lambda ()
      (let ((choice
             (completing-read "Date Restrict d w m y: "
                              '("d" "w" "m" "y"))))
        (cond
         ((string= "" choice) "")
         (t (format "&tbs=qdr:%s" choice))))))
 nil
 "Bing results as RSS feed."
 #'emacspeak-feeds-rss-display)

(emacspeak-url-template-define
 "Bing News"
 "http://www.bing.com:80/news/search?q=%s&format=RSS"
 (list "Bing Search: ")
 nil
 "Bing News results as RSS feed."
 #'emacspeak-feeds-rss-display)

;;}}}
;;{{{ GitHub Search

(emacspeak-url-template-define
 "GitHub Code Search"
 "https://github.com/search?q=%s&type=Code&utf8=✓"
 (list "GitHub Code Search:")
 nil
 "GitHub Code Search.
Query can include filters such as:

<term>: Query Term.
extension:<ext> Filter by file extension
-filename:<pattern> Filter out files matching pattern.")
(declare-function emacspeak-eww-next-h "emacspeak-eww" (&optional speak))
(emacspeak-url-template-define
 "GitHub Search"
 "https://github.com/search?q=%s"
 (list "Query: ")
 #'(lambda ()
     (emacspeak-eww-next-h)
     (emacspeak-speak-rest-of-buffer))
 "Perform a GitHub Search.")

;;}}}
;;{{{ TuneIn: streamId->URL
;;; wget -O t    "http://stream.radiotime.com/listen.stream?streamIds=4299203"
(emacspeak-url-template-define
 "TuneIn Radio"
 "http://opml.radiotime.com/Tune.ashx?id=%s"
 (list "StreamId: ")
 nil
 "Translate StreamId to playable stream."
 #'(lambda (url)
     (kill-new url)
     (message "%s" url))
 "TuneIn Helper.")

(emacspeak-url-template-define
 "RadioTime Browser"
 "http://opml.radiotime.com/"
 nil
 nil
 "RadioTime Entry point."
 #'emacspeak-feeds-opml-display)

(emacspeak-url-template-define
 "RadioTime Search"
 "http://opml.radiotime.com/Search.ashx?query=%s"
 (list "Search: ")
 nil
 "RadioTime Search."
 #'emacspeak-feeds-opml-display)

(defvar emacspeak-url-template--radiotime-categories
  '("world" "music" "sports" "podcasts"
    "local" "talk" "sports" "lang"
    "podcast""popular" "best")
  "Categories from Radio Time.")

(emacspeak-url-template-define
 "RadioTime Categories"
 "http://opml.radiotime.com/browse.ashx?c=%s"
 (list
  #'(lambda ()
      (completing-read "Category: " emacspeak-url-template--radiotime-categories)))
 nil
 "RadioTime Categories ."
 #'emacspeak-feeds-opml-display)

;;}}}
;;{{{ OpenLibrary

(emacspeak-url-template-define
 "OpenLibrary"
 "https://openlibrary.org/search?subject_facet=Accessible+book&q=%s&has_fulltext=true"
 (list "Query: ")
 nil
 "Open Library Search")

;;}}}
;;{{{ GoLang.org:
(defvar emacspeak-url-template-go-base
  "http://golang.org/"
  "Base REST end-point for Golang.org")

(emacspeak-url-template-define
 "GoLang Browse"
 (concat emacspeak-url-template-go-base "pkg")
 nil
 'emacspeak-speak-buffer
 "Browse GoLang package documentation.")

(emacspeak-url-template-define
 "GoLang Lookup"
 (concat emacspeak-url-template-go-base "pkg/%s")
 (list "Go Package: ")
 'emacspeak-speak-buffer
 "Lookup GoLang package documentation.")

(emacspeak-url-template-define
 "GoLang Search"
 (concat emacspeak-url-template-go-base "search?q=%s")
 (list "Go Package: ")
 'emacspeak-speak-buffer
 "Search GoLang package documentation.")

;;}}}
;;{{{ FreeSound.org:

(emacspeak-url-template-define
 "FreeSound"
 "http://freesound.org/search/?q=%s"
 (list "Search FreeSound: ")
 nil
 "Search FreeSound.")

;;}}}
;;{{{ Interactive commands

;;;###autoload
(defun emacspeak-url-template-open (ut)
  "Fetch resource identified by URL template."
  (cl-declare (special emacspeak-web-post-process-hook))
  (let ((fetcher (or (emacspeak-url-template-fetcher ut) 'browse-url))
        (url (emacspeak-url-template-url ut))
        (action (emacspeak-url-template-post-action ut)))
    (when action (add-hook 'emacspeak-web-post-process-hook action))
    (kill-new url)
    (funcall fetcher url)))

(defun emacspeak-url-template-help-internal (name)
  "Display and speak help."
  (with-output-to-temp-buffer "*Help*"
    (princ name)
    (princ "\n\n")
    (princ
     (emacspeak-url-template-documentation
      (emacspeak-url-template-get name)))
    (save-current-buffer
      (set-buffer standard-output)
      (fill-region (point-min)
                   (point-max)))
    (help-print-return-message))
  (emacspeak-speak-help)
  (emacspeak-auditory-icon 'help))
(defun emacspeak-url-template-generate-name-setter (name)
  "Generate a setter that sets emacspeak-eww-url-template
to specified name for use as a callback."
  (eval
   `#'(lambda ()
        (cl-declare (special emacspeak-eww-url-template))
        (setq emacspeak-eww-url-template ',name))))

;;;###autoload
(defun emacspeak-url-template-fetch (&optional documentation)
  "Fetch a pre-defined resource.
Use Emacs completion to obtain a list of available resources.
Resources typically prompt for the relevant information
before completing the request.
Optional interactive prefix arg displays documentation for specified resource."
  (interactive "P")
  (let ((completion-ignore-case t)
        (case-fold-search  t)
        (name nil))
    (setq name
          (completing-read
           "Resource: "
           (hash-table-keys  emacspeak-url-template-table)
           nil
           'must-match))
    (cond
     (documentation (emacspeak-url-template-help-internal name))
     (t
      (add-hook
       'emacspeak-web-post-process-hook
       (emacspeak-url-template-generate-name-setter name))
      (emacspeak-url-template-open (emacspeak-url-template-get name))))))

(defun emacspeak-url-template-help ()
  "Display documentation for a URL template.
Use Emacs completion to obtain a list of available
resources."
  (interactive)
  (cl-declare (special emacspeak-url-template-table))
  (let ((completion-ignore-case t)
        (name nil))
    (setq name
          (completing-read "Resource: "
                           emacspeak-url-template-table))
    (emacspeak-url-template-help-internal name)))

;;}}}
;;{{{ Generate texinfo documentation for all defined url

(defun emacspeak-url-template-generate-texinfo-documentation (buffer)
  "Generates texinfo section documenting all defined URL templates."
  (cl-declare (special emacspeak-url-template-table))
  (with-current-buffer buffer
    (insert
     "@node URL Templates \n@section URL Templates\n\n")
    (insert
     (format
      "
This section documents a total of %d URL Templates.\n\n"
      (hash-table-count emacspeak-url-template-table)))
    (insert
     (format
      "All of these URL templates can be invoked via command
 @kbd{M-x emacspeak-url-template-fetch} normally bound to
 @kbd{%s}.
This command prompts for the name of the template, and completion
 is available via Emacs' minibuffer completion.
Each URL template carries out the following steps:
@itemize @bullet
@item Prompt for the relevant information.
@item Fetch the resulting URL using an appropriate fetcher.
@item Set up the resulting resource with appropriate
 customizations.
@end itemize
"
      (mapconcat #'key-description
                 (where-is-internal
                  'emacspeak-url-template-fetch)
                 " ")))
    (let*
        ((case-fold-search  t)
         (keys
          (sort
           (cl-loop for k being the hash-keys of emacspeak-url-template-table collect k)
           'string-lessp)))
      (insert "@enumerate \n\n")
      (cl-loop
       for key in keys do
       (insert
        (format "@item @b{%s}\n\n" key))
       (insert
        (emacspeak-url-template-documentation
         (emacspeak-url-template-get key))))
      (insert "\n\n@end enumerate\n\n"))))

;;}}}
;;{{{ wikiData:

(emacspeak-url-template-define
 "Wiki Data Search"
 "https://www.wikidata.org/w/index.php?search=%s"
 (list "WikiData Query: ")
 #'(lambda nil
     (re-search-forward "^Result")
     (forward-line 1)
     (emacspeak-speak-rest-of-buffer))
 "Search WikiData.")

;;}}}
;;{{{ Search NLS Bard:

(defun emacspeak-url-template-nls-auth-info()
  "Get the email and password forNls if it already exists
in `auth-sources'. If not present, ask for email and password,
and create an entry in the `auth-sources'.
Returns a cons cell where the car is email, and the cdr is password."
  (let* ((auth-source-creation-prompts
          '((user . "Your BARD NLSUserID: ")
            (secret . "Your BARD NLS password: ")))
         (found
          (nth 0
               (auth-source-search
                :max 1
                :host "nlsbard.loc.gov"
                :port 'https
                :create t
                :require '(:username :secret)))))
    (when found
      (let ((user (plist-get found :user))
            (secret (plist-get found :secret))
            (save-function (plist-get found :save-function)))
        (when (functionp save-function) (funcall save-function))
        (when (functionp secret)
          (setq secret (funcall secret)))
        (cons user secret)))))

(defvar emacspeak-url-template-nls-authenticated nil
  "Record if we have authenticated in this Emacs session.")
(declare-function mml-compute-boundary "mml" (cont))
(declare-function mm-url-encode-www-form-urlencoded "mm-url" (pairs))

(defun emacspeak-url-template-nls-ensure-auth ()
  "Fetch our auth tokens, then sign in."
  (cl-declare (special emacspeak-url-template-nls-authenticated))
  (unless emacspeak-url-template-nls-authenticated
    (let* ((token (emacspeak-url-template-nls-auth-info))
           (boundary (mml-compute-boundary nil))
           (values
            (list
             (cons "url_return" nil)
             (cons "submit" nil)
             (cons "login" (cdr token))
             (cons "password" (car token))))
           (url-request-method "POST")
           (url-request-extra-headers
            (list
             (cons "Content-Type"
                   (concat "multipart/form-data; boundary=" boundary))))
           (url-request-data
            (mm-url-encode-www-form-urlencoded values)))
      (setq emacspeak-url-template-nls-authenticated t)
      (eww-browse-url
       "https://nlsbard.loc.gov:443/nlsbardprod/login/NLS"))))

(defun emacspeak-url-template-nls-add-to-wishlist  (book)
  "Add book under point to wishlist."
  (interactive (list  (emacspeak-webutils-read-this-url)))
  (let  ((add nil))
    (unless book (error "No Book URL specified"))
    (setq add
          (replace-regexp-in-string "download/detail" "wishlist/add" book))
    (message "Adding book to wishlist.")
    (emacspeak-auditory-icon 'progress)
    (eww add)))

(emacspeak-url-template-define
 "NLS Bard Search"
 "https://nlsbard.loc.gov/nlsbardprod/search/collection/page/1/sort/s/srch/%s/local/0"
 (list "Search For: ")
 #'(lambda nil
     (cl-declare (special emacspeak-we-url-executor))
     (setq emacspeak-we-url-executor #'emacspeak-url-template-nls-add-to-wishlist)
     (emacspeak-speak-mode-line))
 "Search NLS Bard Catalog. Login once before using this template."
 #'(lambda (url)
     (eww-browse-url url)))

(emacspeak-url-template-define
 "NLS Bard Popular"
 "https://nlsbard.loc.gov:443/nlsbardprod/search/most_popular/page/1/sort/s/srch/most_popular/local/0"
 nil
 #'(lambda nil
     (cl-declare (special emacspeak-we-url-executor))
     (setq emacspeak-we-url-executor #'emacspeak-url-template-nls-add-to-wishlist)
     (emacspeak-speak-mode-line))
 "NLS Bard Catalog: Most Popular. Login once before using this
template."
 #'(lambda (url)
     (eww-browse-url url)))

(emacspeak-url-template-define
 "NLS Bard Recent"
 "https://nlsbard.loc.gov/mainpage/srch_recentlyadded"
 nil
 #'(lambda nil
     (cl-declare (special emacspeak-we-url-executor))
     (setq emacspeak-we-url-executor #'emacspeak-url-template-nls-add-to-wishlist)
     (emacspeak-speak-mode-line))
 "NLS Bard Catalog: Recently Added. Login once before using this
template."
 #'(lambda (url)
     (eww-browse-url url)))

;;}}}
;;{{{ Bloomberg:
(emacspeak-url-template-define
 "Bloomberg Stock  Lookup"
 "http://www.bloomberg.com/quote/%s"
 (list "Lookup Ticker:Country")
 nil
 "Lookup Stock Quote information on Bloomberg. Ticker is of the form goog:us")

;;}}}
;;{{{ Washington Post

(defun emacspeak-url-template-wapost-content (url)
  "Extract article content from WApost."
  (emacspeak-we-extract-by-class
   "article-body content-format-ans "
   url 'speak))

(emacspeak-url-template-define
 "Washington Post"
 "https://www.washingtonpost.com/"
 nil
 #'(lambda nil
     (cl-declare (special emacspeak-we-url-executor))
     (setq emacspeak-we-url-executor
           'emacspeak-url-template-wapost-content))
 "Washington Post Contents"
 #'(lambda (url)
     (emacspeak-we-extract-by-class-list
      '("headline xx-small highlight-style bulleted text-align-inherit " "headline normal normal-style text-align-inherit "
        "no-skin flex-item flex-stack normal-air text-align-left wrap-text equalize-height-target"
        "headline " "blurb normal normal-style ")
      url
      'speak)))

;;}}}
;;{{{ ArchWiki

(emacspeak-url-template-define
 "ArchWiki Search"
 "https://wiki.archlinux.org/index.php/%s"
 (list "Search: ")
 #'(lambda ()
     (emacspeak-eww-next-h)
     (emacspeak-speak-rest-of-buffer))
 "Search Linux ArchWiki")

;;}}}
;;{{{Reddit Tools:

(declare-function shr-url-at-point "shr" (image-url))
(declare-function emacspeak-google-canonicalize-result-url "emacspeak-google" (url))
(declare-function emacspeak-google-result-url-prefix "emacspeak-google" nil)

(emacspeak-url-template-define
 "Reddit At Point."
 "" nil nil
 "Open RSS Feed for Reddit URL under point."
 #'(lambda (_url)
     (let* ((u
             (or
              (shr-url-at-point nil)
              (browse-url-url-at-point)
              (read-from-minibuffer "URL:")))
            (url
             (if (string-prefix-p (emacspeak-google-result-url-prefix) u)
                 (emacspeak-google-canonicalize-result-url u)
               u)))
       (cl-assert url t "No URL under point.")
       (cl-assert
        (string-match "https://www.reddit.com" url) t
        "Does not look like a Reddit URL")
       (emacspeak-webutils-autospeak)
       (emacspeak-feeds-atom-display (concat url ".rss")))))

(emacspeak-url-template-define
 "Reddit Search."
 "https://www.reddit.com/search.rss?q=%s&sort=new&t=all"
 (list "Reddit Search:")
 nil
 "Reddit Search Results Feed."
 #'emacspeak-feeds-atom-display)

(emacspeak-url-template-define
 "Reddit By Topic."
 "https://www.reddit.com/r/%s/.rss"
 (list "Topic:")
 nil
 "Open RSS Feed for Reddit Topic."
 #'emacspeak-feeds-atom-display)

(emacspeak-url-template-define
 "Reddit Front Page."
 "https://www.reddit.com/.rss"
 nil
 nil
 "Open  Feed for Reddit  Front Page."
 #'emacspeak-feeds-atom-display) 

;;}}}
;;{{{Hacker News:

(emacspeak-url-template-define
 "Hacker  News Frontpage"
 "https://hnrss.org/frontpage"
 nil nil
 "Display Hacker News Front Page"
 #'emacspeak-feeds-rss-display)


(emacspeak-url-template-define
 "Hacker  News Search"
 "https://hnrss.org/newest?q=%s"
 (list "Hacker News Search:")
 nil
 "Display Hacker News Front Page"
 #'emacspeak-feeds-rss-display)


;;}}}
;;{{{Youtube News:

(declare-function eww-display-dom-by-element "emacspeak-eww" (tag))
(declare-function eww-display-dom-by-class "emacspeak-eww" (class))

(emacspeak-url-template-define
 "Youtube News"
 "https://www.youtube.com/news?disable_polymer=1"
 nil
 #'(lambda nil (eww-display-dom-by-element 'h3))
 "News Headlines From Youtube")

;;}}}
;;{{{Currency Conversion:

(defcustom emacspeak-url-template-currency-base
  "USD"
  "Currency to use as the base when doing currency conversion."
  :type 'string
  :group 'emacspeak-url-template)

(defcustom emacspeak-url-template-currency-list
  "EUR,INR,GBP,USD,CAD"
  "List of currencies for which we request rates by default."
  :type 'string
  :group 'emacspeak-url-template)

(defun ems--exchange-rates-to-org (url)
  "Display retrieved rates as an org buffer."
  (let-alist (g-json-from-url url)
    (let ((buffer
           (get-buffer-create
            (format "* Currency Rates In  %s On %s" .base .date)))
          (inhibit-read-only  t))
      (with-current-buffer buffer
        (erase-buffer)
        (cl-loop
         for r in .rates do
         (insert
          (format "%s %.2f\n" (car r) (cdr r))))
        (goto-char (point-min))
        (setq buffer-read-only t))
      (pop-to-buffer buffer)
      (emacspeak-auditory-icon 'open-object)
      (emacspeak-speak-buffer))))

(emacspeak-url-template-define
 "Currency Converter"
 "https://api.exchangeratesapi.io/latest?base=%s&symbols=%s"
 (list
  #'(lambda nil
      (cl-declare (special emacspeak-url-template-currency-base))
      (upcase
       (read-from-minibuffer "Base:" emacspeak-url-template-currency-base)))
  #'(lambda nil
      (cl-declare (special emacspeak-url-template-currency-list))
      (upcase
       (read-from-minibuffer "Currencies:" emacspeak-url-template-currency-list))))
 nil
 "Currency Converter. Currencies can be a comma-separated list of
codes."
 #'ems--exchange-rates-to-org)

;;}}}
;;{{{CIA World Fact Book:

(defvar ems--wfb-cc-codes nil
  "Association list  ofWorld Fact Book Country Codes.")

(defun ems--xsl-wfb-cc ()
  "Get WFB CC Codes using XSLT."
  (cl-declare (special ems--wfb-cc-codes))
  (let ((u "https://www.cia.gov/library/publications/the-world-factbook/"))
    (setq
     ems--wfb-cc-codes
     (read (emacspeak-xslt-url (emacspeak-xslt-get "wfb-cc.xsl") u)))))

(declare-function dom-from-url "dom-addons" (url))

(defun ems--el-wfb-cc ()
  "Get WFB CC Codes using Elisp."
  (cl-declare (special ems--wfb-cc-codes))
  (let ((u "https://www.cia.gov/library/publications/the-world-factbook/"))
    (setq
     ems--wfb-cc-codes
     (cl-loop
      for  o in (dom-by-tag (dom-from-url u) 'option)
      when (dom-attr o 'data-place-code )
      collect
      (cons (string-trim (dom-text o)) (dom-attr o 'data-place-code ))))))

(defun ems--read-wfb-cc-code ()
  "Return 2-letter country code using completing-read.
Builds up alist of codes if needed the first time."
  (cl-declare (special ems--wfb-cc-codes))
  (unless ems--wfb-cc-codes (ems--el-wfb-cc))
  (cdr (assoc (completing-read "Country:"ems--wfb-cc-codes) ems--wfb-cc-codes)))

(emacspeak-url-template-define
 "CIA World Fact Book"
 "https://www.cia.gov/library/publications/resources/the-world-factbook/geos/print_%s.html"
 (list #'(lambda nil (ems--read-wfb-cc-code)))
     #'emacspeak-speak-buffer
     "Open CIA World Fact Book For Specified Country.")

(emacspeak-url-template-define
 "CIA Leaders Of The World"
 "https://www.cia.gov/library/publications/resources/world-leaders-1/%s.html"
 (list #'(lambda nil
           (upcase (ems--read-wfb-cc-code))))
 #'(lambda nil
     (search-forward "Last Update")
     (goto-char (line-end-position))
     (forward-line 1)
     (emacspeak-speak-rest-of-buffer))
     "Open CIA World Leaders  For Specified Country.")

;;}}}
;;{{{Air Quality From Wunderground

(emacspeak-url-template-define
 "AQI From Wunderground"
 "https://www.wunderground.com/health/us/%s"
 (list
  #'(lambda ()
      (read-from-minibuffer "state/city/zip: " "ca/san-jose/95123")))
 nil
 "Air quality from Wunderground"
 #'(lambda (url)
     (emacspeak-we-extract-by-class
      "small-6" url 'speak))
 'dont-encode)

;;}}}



(provide 'emacspeak-url-template)
;;{{{ end of file

;;; local variables:
;;; folded-file: t
;;; end:

;;}}}
