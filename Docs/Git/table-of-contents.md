A userscript that adds a table of contents to both readme and wiki pages.

* NOTE: When **updating to v2.0+**, you may have to reset the popup (<kbd>g</kbd> + <kbd>r</kbd>) as the positioning method has changed.
* A draggable popup window is automatically added when rendered markdown is detected; there must be at least **three anchors** before the TOC is created.
* The TOC will refresh while switching between pages, and previewing markdown changes.
* **Move (drag-and-drop)**: Click and hold on the header to move the TOC window. If it gets moved and you can't get it back, use the keyboard shortcut to reset the position.
* **Toggle Window**
  * Click on the header icon to toggle the window between the upper right corner and its last position.
  * Double-click on the header text to toggle the window.
  * Or, use the keyboard shortcut to toggle the view.
* **Toggle Entries**
  * Each anchor within the rendered markdown will be included in the TOC window.
  * Click on the arrow next to the anchor link to toggle the sub-group.
  * <kbd>Shift</kbd> + Click on the arrow next to the anchor to toggle *all* same level items.
  * Some anchor link text may be truncated, hover over the link to see the full title.
* To modify the "Table of Contents" text, open the userscript addon popup window and look for the "Set Table of Contents Title" setting.
* **Keyboard commands:**
  * Press <kbd>Esc</kbd> to "hide" the TOC in the upper right corner.
  * Press <kbd>g</kbd> + <kbd>t</kbd>, within one second of each other, to toggle the TOC view.
  * Press <kbd>g</kbd> + <kbd>r</kbd>, within one second of each other, to reset the TOC position.
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-toc.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/18344-github-toc) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Table_of_Contents).
* Then test it on [this page](https://github.com/sinatra/sinatra).

## Screenshot

![github-toc](https://cloud.githubusercontent.com/assets/136959/14096460/8f05ae3e-f52e-11e5-9194-8506ffb2068e.gif)

## Change Log

### Version 2.0.5 (2020-08-08)

* Don't include sidebar headers. Closes [issue #124](https://github.com/Mottie/GitHub-userscripts/issues/124).

### Version 2.0.3 &ndash; 2.0.4 (2020-07-23)

* Double-click header to toggle. Closes [issue #118](https://github.com/Mottie/GitHub-userscripts/issues/118).
* Hide on header double-click (fix).

### Version 2.0.2 (2020-07-16)

* Fix Google translate broken links. Closes [issue #117](https://github.com/Mottie/GitHub-userscripts/issues/117).

### Version 2.0.1 (2019-09-05)

* Fix title update DOM target. See [issue #102](https://github.com/Mottie/GitHub-userscripts/issues/102).

### Version 2.0.0 (2019-09-02)

* Position popup based on window center:
  * This may cause some issues with previously saved positions, thus the major version bump.
  * Make sure to reset the position using the hot keys <kbd>g</kbd> + <kbd>r</kbd> (unless you remapped the hotkeys).
  * Position is maintained even if the window is resized, except for narrower screens.
  * Closes [issue #102](https://github.com/Mottie/GitHub-userscripts/issues/102).
  * When the popup is reset, it hugs the right side of the screen, even on resize.

### Version 1.3.2 &ndash; 1.3.4 (2019-04-28)

* Update TOC position due to GitHub design update. See [PR #80](https://github.com/Mottie/GitHub-userscripts/pull/80); thanks [@ottnorml](https://github.com/ottnorml)!
* Fix header alignment.
* Code Cleanup.
* Fix clickable toggle area.

### Version 1.3.1 (2019-03-29)

* Update header selector.

### Version 1.3.0 (2019-02-16)

* Make compatible with GM4. Fixes [issue #69](https://github.com/Mottie/GitHub-userscripts/issues/69).
* Reduce minimum headers from 2 to 1.
* Update GitHub icon.

### Version 1.2.21 (2019-01-28)

* Update mutation script.

### Version 1.2.20 (2018-10-05)

* Update mutation script.

### Version 1.2.19 (2018-09-19)

* Update TOC position due to Github design update (compare [PR #43](https://github.com/Mottie/GitHub-userscripts/pull/43)). See [PR #55](https://github.com/Mottie/GitHub-userscripts/pull/55); thanks [@ottnorml](https://github.com/ottnorml)!

### Version 1.2.18 (2018-08-01)

* When collapsed, add padding to header & align button.
* Darken collapsed button.

### Version 1.2.17 (2018-06-16)

* Change class names to prevent addon conflicts. Fixes [issue #48](https://github.com/Mottie/GitHub-userscripts/issues/48).

### Version 1.2.16 (2018-05-17)

* Update mutation script.

### Version 1.2.15 (2018-05-10)

* Update mutation script.

### Version 1.2.14 (2018-04-16)

* Move TOC start position. See [PR #43](https://github.com/Mottie/GitHub-userscripts/pull/43); thanks [@ottnorml](https://github.com/ottnorml)!

### Version 1.2.13 (2018-04-09)

* Update mutation script url.

### Version 1.2.12 (2018-01-18)

* Update assets.

### Version 1.2.11 (2017-10-08)

* Update mutation script url.

### Version 1.2.10 (2017-08-22)

* Update to use new header class.

### Version 1.2.9 (2017-05-16)

* Change license to MIT.

### Version 1.2.8 (2017-04-21)

* Update mutation url.

### Version 1.2.5 - 1.2.7 (2017-04-13)

* Switch to using mutations.js.

### Version 1.2.4 (2017-04-04)

* Include Gist pages.

### Version 1.2.3 (2017-03-31)

* Collapse arrow now correctly groups sub-headers.

### Version 1.2.2 (2017-03-25)

* Use pjax event & fix linting.
* Add link to docs.

### Version 1.2.1 (2016-12-28)

* Clean up linting issues.

### Version 1.2.0 (2016-07-29)

* Add z-index to icon ([fixed header style](https://github.com/StylishThemes/GitHub-FixedHeader)) & convert to ES6

### Version 1.1.2 (2016-07-05)

* Arrows will again collapse content.

### Version 1.1.1 (2016-06-06)

* Only clicking on an arrow will toggle the sub-group.

### Version 1.1.0 (2016-06-06)

* <kbd>Shift</kbd> + Click now toggles all same level items.
* Don't show TOC when less than 3 listings.
* Code cleanup.

### Version 1.0.1 (2016-05-25)

* Prevent JS errors on pages with no ".header".

### Version 1.0.0 (2016-03-28)

* Initial commit
