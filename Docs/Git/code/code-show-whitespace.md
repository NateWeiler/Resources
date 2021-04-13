A userscript that shows whitespace (space, tabs and carriage returns) in code blocks

* All spaces and tabs are shown.
* It works on repo file and diff-view pages, and gist pages.
* A toggle button is added to each file block and allows you to enable or disable the whitespace view.
* It does not interfere with the selection, copying & pasting of the code.
* <del>A CSS tab-size of `2` is set by this script. This will be overridden by [GitHub-Dark](https://github.com/StylishThemes/GitHub-Dark) tab settings</del>.
* <del>This script is not fully compatible with the [[GitHub code folding]] userscript as they interfere with each other</del>.
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-code-show-whitespace.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/28454-github-code-show-whitespace) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Code_Show_Whitespace).

## Screenshots

### File view

![](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/images/github-code-show-whitespace.gif)

### Diff view

![](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/images/github-code-show-whitespace-diff.gif)

## Change Log

### Version 1.2.10 (2019-07-02)

* Fix PR button alignment. Closes [issue #91](https://github.com/Mottie/GitHub-userscripts/issues/91).
* No button for new gists.

### Version 1.2.9 (2019-06-07)

* Update selectors for GitHub changes.

### Version 1.2.8 (2019-04-28)

* Fix alignment in new diff layout.

### Version 1.2.7 (2019-02-17)

* Hide extra `<br>` in code. Fixes [issue #65](https://github.com/Mottie/GitHub-userscripts/issues/65).

### Version 1.2.6 (2019-02-16)

* Update GitHub icon.

### Version 1.2.5 (2019-01-28)

* Update mutation script.

### Version 1.2.4 (2018-10-05)

* Update mutation script.

### Version 1.2.2 & 1.2.3 (2018-08-02)

* Hide extra leading space in diffs. Partially revert https://github.com/Mottie/GitHub-userscripts/commit/813ca673488b0d67cd347bc7b8f4d5e40d2ec787.
* Only hide first wrapped space in expanded blocks.

### Version 1.2.0 & 1.2.1 (2018-07-31)

* Fix JS error. Only seen when used with a certain chrome extension.
* Diffs signs now use a pseudo-element.
* Add show whitespace option. Closes [issue #53](https://github.com/Mottie/GitHub-userscripts/issues/53).
* Speed up DOM interaction. Start using `requestAnimationFrame` with a generator.
* Fix GM command issues & other silly mistakes.

### Version 1.1.10 (2018-05-17)

* Update mutation script.

### Version 1.1.9 (2018-05-10)

* Update mutation script.

### Version 1.1.8 (2018-04-09)

* Update mutation script url.

### Version 1.1.7 (2018-01-30)

* Update GM4 polyfill.

### Version 1.1.6 (2017-12-17)

* Tooltips show below sticky header.

### Version 1.1.5 (2017-12-14)

* Add GM4 polyfill & update assets.

### Version 1.1.3 &ndash; 1.1.4 (2017-12-05)

* Use updated mutations script. Fixes [issue #33](https://github.com/Mottie/GitHub-userscripts/issues/33).
* Use smaller icon.

### Version 1.1.1 &ndash; 1.1.2 (2017-10-11)

* Hide leading space in diff. See [issue #27](https://github.com/Mottie/GitHub-userscripts/issues/27).
* Fix expanded &amp; diff rows.

### Version 1.1.0 (2017-10-03)

* Fix weird alignment issues in markdown files. See [issue #27](https://github.com/Mottie/GitHub-userscripts/issues/27).
* Fix alignment for no-extension files. See [issue #27](https://github.com/Mottie/GitHub-userscripts/issues/27).
* Remove all tab-size adjustments.

### Version 1.0.0 (2017-10-01)

* Show all whitespace. Fixes [issue #27](https://github.com/Mottie/GitHub-userscripts/issues/27).

### Version 0.1.8 (2017-09-22)

* Include trailing whitespace.

### Version 0.1.7 (2017-09-02)

* Properly add whitespace to all lines.

### Version 0.1.6 (2017-05-16)

* Change license to MIT.

### Version 0.1.5 (2017-04-21)

* Update mutation url.

### Version 0.1.2 - 0.1.4 (2017-04-13)

* Switch to using mutations.js.

### Version 0.1.1 (2017-03-27)

* Add to gist pages.

### Version 0.1.0 (2017-03-26)

* Initial commit
