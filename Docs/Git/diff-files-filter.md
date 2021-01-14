A userscript that adds filters that toggle diff & PR files by extension

* A group of buttons are added above diff & pull request files, each one is set to filter a file name extension.
* The filters are *only visible* when there is more than one type of file extension present in the folder.
* Files with no extension will be labeled as "&laquo;no-ext&raquo;".
* Click on one or more buttons to toggle the view of the files.
* Hovering over the filter will show the number of files of that type.
* Special Filters:
  * The "&laquo;all&raquo;" filter button toggles the view of all files.
  * The "&laquo;no-ext&raquo;" filter button toggles all files that do not have an extension. It is only added if such files exist.
  * The "&laquo;dot-files&raquo;" filter button toggles all dot-files (e.g. `.gitignore`, `.gitattributes`, etc). It is only added if such files exist.
  * The "&laquo;renamed&raquo;" filter button toggles all files that have been either renamed or moved; these files may or may not have been edited (added v1.1.0).
  * The "&laquo;min&raquo;" filter button toggles all min files (e.g. `.min.js`, `.min.css`, etc); It is only added if such files exist (added v2.1.0).
* Original idea from the [Github Pr Filter](https://github.com/danielhusar/github-pr-filter) extension.
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-diff-files-filter.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/26191-github-diff-files-filter) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Diff_Files_Filter).
* After installing, try the userscript on this page: [repo inital commit](https://github.com/Mottie/GitHub-userscripts/commit/eaefd49fcc5fad1c97f6c86ad2dfb39b99f87a50).

## Screenshot

![github-diff-files-filter](https://cloud.githubusercontent.com/assets/136959/21579359/b9f47c5c-cf70-11e6-9b06-1960ec8949d1.gif)

## Change Log

### Version 2.1.2 (2020-07-11)

* Update selectors. Fixes [issue #113](https://github.com/Mottie/GitHub-userscripts/issues/113).

### Version 2.1.1 (2019-07-21)

* Fix folders filter; previously would hide mid-path files.

### Version 2.1.0 (2019-03-29)

* Add "min" file filter.

### Version 2.0.2 (2019-02-16)

* Update GitHub icon.

### Version 2.0.1 (2019-01-28)

* Update mutation script.

### Version 2.0.0 (2019-01-11)

* Include folder filter (accidentally published). It works, but the results are not 100% reliable.

### Version 1.1.1 (2018-10-05)

* Update mutation script.

### Version 1.1.0 (2018-06-23)

* Add «renamed» filter. This allows toggling of files that have renamed or moved. These files may or may not have been edited.

### Version 1.0.3 (2018-05-17)

* Update mutation script.

### Version 1.0.2 (2018-05-10)

* Update mutation script.

### Version 1.0.1 (2018-04-09)

* Update mutation script url.

### Version 1.0.0 (2018-01-18)

* Update assets.

### Version 0.1.9 (2017-10-08)

* Update mutation script url.
* Fix linting issues.

### Version 0.1.8 (2017-05-16)

* Change license to MIT.

### Version 0.1.7 (2017-04-21)

* Update mutation url.

### Version 0.1.4 - 0.1.6 (2017-04-13)

* Allow updating of filters.
* Switch to using mutations.js.
* Added tooltip showing the number of files for each filter.

### Version 0.1.3 (2017-03-25)

* Use pjax event & fix linting.

### Version 0.1.2 (2017-01-11)

* Clean up "closest" function.

### Version 0.1.1 (2016-01-02)

* Check for empty arrays, then check type length.

### Version 0.1.0 (2016-12-31)

* Initial commit.
