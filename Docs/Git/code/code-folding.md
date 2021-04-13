A userscript that adds code folding to GitHub files

* This code only works on GitHub files (with line numbers), not in markdown code.
* Works for both space and tab indentation.
* This code was modified from the [GitHub Code Folding](https://github.com/noam3127/github-code-folding) Chrome extension by [@noam3127](https://github.com/noam3127) (MIT license).
* Clicking on an arrow will collapse a section of code with the same indentation level.
* Using <kbd>Shift</kbd> click on an arrow will collapse *all* sections of the same code indentation level.
* After collapsing a code block, click on either the arrow (left side) or on the ellipsis (right side), to re-expand the code block.
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-code-folding.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/26109-github-code-folding) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Code_Folding).

## Screenshot

![github-code-folding](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/images/github-code-folding.gif)

## Change Log

### Version 1.1.1 (2020-05-12)

* Improve arrow transition. See [PR #111](https://github.com/Mottie/GitHub-userscripts/pull/111); thanks [@yuezk](https://github.com/yuezk)!
* Reduce arrow container width.

### Version 1.1.0 (2019-06-07)

* Updated selectors to match new GitHub class names.
* Added support for gists.
* General code cleanup.

### Version 1.0.18 (2019-02-16)

* Update GitHub icon.

### Version 1.0.17 (2019-01-28)

* Update mutation script.

### Version 1.0.16 (2018-10-05)

* Update mutation script.

### Version 1.0.15 (2018-05-28)

* Make github-code-folding.user.js work on mobile layout. See [PR #47](https://github.com/Mottie/GitHub-userscripts/pull/47); thanks [@zb3](https://github.com/zb3)!
* Reformat & version bump.

### Version 1.0.14 (2018-05-17)

* Update mutation script.

### Version 1.0.13 (2018-05-10)

* Update mutation script.

### Version 1.0.12 (2018-04-09)

* Update mutation script url.

### Version 1.0.11 (2018-02-27)

* Fix arrow position.

### Version 1.0.10 (2018-01-30)

* Update GM4 polyfill.

### Version 1.0.9 (2017-12-14)

* Add GM4 polyfill & update assets.

### Version 1.0.8 (2017-10-08)

* Remove incorrect code padding.

### Version 1.0.7 (2017-10-08)

* Update mutation script url.

### Version 1.0.6 (2017-09-02)

* Position ellipsis above code guides.
* Append collapse arrow (prevent interference with whitespace userscript).

### Version 1.0.5 (2017-05-16)

* Change license to MIT.

### Version 1.0.4 (2017-04-21)

* Update mutation url.

### Version 1.0.1 - 1.0.3 (2017-04-13)

* Switch to using mutations.js.

### Version 1.0.0 (2017-03-25)

* Use pjax event & fix linting.

### Version 0.1.1 (2017-01-11)

* Clean up "closest" function.
* Use `classList` toggle.

### Version 0.1.0 (2016-12-28)

* Initial commit
