A userscript that toggles diff/PR and commit comments

* Comment block:
  * Each comment block now has a clickable toggle arrow in the upper right corner.
  * Click to collapse or expand the comment block.
  * Use <kbd>Shift</kbd> + click to collapse or expand all comment blocks in the file.
* File block:
  * Show/Hide:
    * The ugly checkbox with a "Show comments" label is replaced with a "Show or hide all comments in this file" button.
    * Click to show or completely hide all the comment blocks in the file.
    * Use <kbd>Shift</kbd> + click to show or completely hide all the comment blocks in the file.
  * Expand/Collapse:
    * An "Expand or collapse all comments in this file" button was added next to the show/hide button.
    * Click to expand or collapse all the comments blocks in the file.
    * Use <kbd>Shift</kbd> + click to collapse or expand all comment blocks on the page.
* Pull Request Toolbar/Sticky Header
  * Show/Hide:
    * A "Show or hide all comments" button was added next to the "Unified/Split" button.
    * Click to show or completely hide all the comment blocks on the page.
  * Expand/Collapse:
    * A "Expand or collapse all comments" button was added next to the "Unified/Split" button.
    * Click to expand or collapse all the comment blocks on the page.
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-toggle-diff-comments.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/36237-github-toggle-diff-comments) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Toggle_Diff_Comments).

## Screenshot

![](https://user-images.githubusercontent.com/136959/33812149-89f21b48-dde0-11e7-8f7a-be3821988fc1.gif)

## Change Log

### Version 0.3.0 (2020-09-29)

* Update selectors. Closes [issue #122](https://github.com/Mottie/GitHub-userscripts/issues/122).
* Don't hide open editors. See [issue #121](https://github.com/Mottie/GitHub-userscripts/issues/121).

### Version 0.2.0 (2020-05-25)

* Rewrite using new selectors. Fixes [issue #109](https://github.com/Mottie/GitHub-userscripts/issues/109).

### Version 0.1.8 (2019-02-16)

* Update GitHub icon.

### Version 0.1.7 (2019-01-28)

* Update mutation script.

### Version 0.1.6 (2018-10-05)

* Update mutation script.

### Version 0.1.5 (2018-05-17)

* Update mutation script.

### Version 0.1.4 (2018-05-10)

* Update mutation script.

### Version 0.1.3 (2018-04-09)

* Update mutation script url.

### Version 0.1.2 (2018-01-30)

* Update GM4 polyfill.

### Version 0.1.1 (2017-12-17)

* Only show global toggles with comments.
* Use tooltips.
* Use correct `@grant` setting.
* Include commit pages.

### Version 0.1.0 (2017-12-10)

* Initial commit
