A userscript that adds filters that toggle the view of repo files by extension

* A group of buttons are added above the repository files, each one is set to filter a file name extension.
* In v1.1.0, extension subcategories are now separate, e.g. "user.js" and "js" target different files.
* The filters are *only visible* when there is more than one type of file extension present in the folder.
* Files with no extension will be labeled as "&laquo;no-ext&raquo;".
* Click on one or more filters to toggle the view of the files.
* Hovering over the filter will show the number of files found for that extension.
* Filter selections will be saved between sessions.
* Special Filters:
  * The "&laquo;all&raquo;" filter button toggles the view of all files.
  * The "&laquo;no-ext&raquo;" filter button toggles all files that do not have an extension. It is only added if such files exist.
  * The "&laquo;dot-files&raquo;" filter button toggles all dot-files (e.g. `.gitignore`, `.gitattributes`, etc). It is only added if such files exist.
  * The "&laquo;min&raquo;" filter button toggles all files with a `.min.` in the name. It is only added if such files exist.
* Made to work along with the [[GitHub image preview]] userscript; requires image-preview version 1.1.10+ for the best experience.
* Inspired by [hide-files-on-github](https://github.com/sindresorhus/hide-files-on-github) extension &amp; a bunch of code copied from the github-diff-files-filter userscript.
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-files-filter.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/30940-github-files-filter) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Files_Filter).
* To do:
  * Add toggle for submodule and dot-folders.

## Screenshots

![github-file-filter-basic](https://user-images.githubusercontent.com/136959/27523289-df5c68e0-59f1-11e7-91e1-1f9f8edbeaa8.gif)

![github-file-filter-min](https://user-images.githubusercontent.com/136959/27523303-f2b72de4-59f1-11e7-9ce8-6e0224855755.gif)

## Change Log

### Version 2.1.1 (2020-07-13)

* Remove optional chaining.

### Version 2.1.0 (2020-07-11)

* Update for repo files grid.

### Version 2.0.1 (2020-03-24)

* Fix filter block location selector.

### Version 2.0.0 (2019-09-22)

* Change toggle button.
* Fix image preview interaction.
* Add <kbd>Ctrl</kbd> + click for single filter. See [issue #97](https://github.com/Mottie/GitHub-userscripts/issues/97).

### Version 1.1.8 (2019-02-17)

* Filters work after using go back. Fixes [issue #77](https://github.com/Mottie/GitHub-userscripts/issues/77).

### Version 1.1.7 (2019-02-16)

* Maintain case-sensitive names. Fixes [issue #76](https://github.com/Mottie/GitHub-userscripts/issues/76).
* Update GitHub icon.

### Version 1.1.6 (2019-01-28)

* Update mutation script.

### Version 1.1.5 (2019-01-11)

* Strikethrough applied filter names. See [PR #68](https://github.com/Mottie/GitHub-userscripts/pull/68).

### Version 1.1.4 (2018-10-05)

* Update mutation script.

### Version 1.1.3 (2018-07-23)

* Limit subcategories.
  * Ignore version numbers ("1.0" and "1.0.0").
  * Strings with periods (e.g. "vs.").
  * See https://github.com/tpn/pdfs.

### Version 1.1.2 (2018-06-01)

* Don't hide image preview up tree link.

### Version 1.1.0 &amp; 1.1.1 (2018-05-22)

* Code cleanup.
* Add selected and hover styling. See [issue #46](https://github.com/Mottie/GitHub-userscripts/issues/46).
* Split out extension subcategories, e.g. "user.js" is now separate from "js".
* Add focused button styling. See [issue #46](https://github.com/Mottie/GitHub-userscripts/issues/46).

### Version 1.0.4 (2018-05-17)

* Update mutation script.

### Version 1.0.3 (2018-05-10)

* Update mutation script.

### Version 1.0.2 (2018-04-09)

* Update mutation script url.

### Version 1.0.1 (2018-02-04)

* Update selector to match GitHub change.

### Version 1.0.0 (2018-01-18)

* Update assets.

### Version 0.1.2 (2017-10-08)

* Update mutation script url.

### Version 0.1.1 (2017-07-10)

* Sort extensions with special filters first. Test on https://github.com/rbsec/sslscan, where the ".1" extension *was* appearing between the ":" filters.

### Version 0.1.0 (2017-06-26)

* Initial commit.
