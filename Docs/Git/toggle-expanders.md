A userscript that toggles all expanders when one expander is shift-clicked

* This userscript works on repository commit, release, pull request & compare pages.
* Toggle expanders (`…`)
  * Click to toggle a single expander as normally.
  * Use <kbd>Shift</kbd> + Click on an expander to toggle all expanders within a date block (**New behavior in v2.0.0**)
  * Use (<kbd>Ctrl</kbd> or <kbd>&#x2318;</kbd>) + <kbd>Shift</kbd> + Click on an expander to toggle *all* expanders on the page (**New behavior in v2.0.0**).
  * Example page: https://github.com/torvalds/linux/commits/master (<kbd>Shift</kbd> + click on a commit title ellipsis).
* Resolved <del>Outdated</del> reviews (added v1.1.0; updated v2.0.0)
  * Click to toggle the resolved review as normally.
  * Use <kbd>Shift</kbd> + Click to toggle all outdated blocks *within* a single review.
  * Use (<kbd>Ctrl</kbd> or <kbd>&#x2318;</kbd>) + <kbd>Shift</kbd> + Click to toggle all resolved blocks on the page.
* The script was inspired by this thread: https://github.com/dear-github/dear-github/issues/193 and [pull #22](https://github.com/Mottie/GitHub-userscripts/pull/22).
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-toggle-expanders.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/23303-github-toggle-expanders) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Toggle_Expanders).

-----

* Compare pages
  * Click to toggle a single expander as normally.
  * Use <kbd>Shift</kbd> + Click on an expander to toggle *all* expanders on the page.
  * In this case, adding the <kbd>Ctrl</kbd> key does not change the behavior. [As requested](https://github.com/Mottie/GitHub-userscripts/issues/87).

## Screenshot

### Expanders

![github-toggle-expanders](https://github.com/Mottie/GitHub-userscripts/blob/master/images/github-toggle-expanders.gif)

### Outdated Reviews

![github-toggle-expanders-outdated](https://user-images.githubusercontent.com/136959/27198292-2f2436b4-51d7-11e7-8bfa-03d7a184ae8e.gif)

## Change Log

### Version 2.0.1 (2020-12-18)

* Update selector. Closes [issue #131](https://github.com/Mottie/GitHub-userscripts/issues/131).
### Version 2.0.0 (2019-09-02)

Update to use new GitHub class names:
* Changed commit, release & pull request behavior:
  * Using <kbd>Shift</kbd> + Click on an expander only toggles the other expanders within a date block.
  * Using (<kbd>Ctrl</kbd> or <kbd>&#x2318;</kbd>) + <kbd>Shift</kbd> + Click on an expander now toggles all expanders.
* Fixes issues [#100](https://github.com/Mottie/GitHub-userscripts/issues/100), [#101](https://github.com/Mottie/GitHub-userscripts/issues/101) & [#87](https://github.com/Mottie/GitHub-userscripts/issues/87).

### Version 1.2.0 (2019-06-13)

* Allow shift-click only on compare. Fixes [issue #87](https://github.com/Mottie/GitHub-userscripts/issues/87).

### Version 1.1.4 (2019-02-16)

* Update GitHub icon.

### Version 1.1.3 (2018-08-15)

* Update for [GitHub's details component](https://github.com/github/details-menu-element).

### Version 1.1.2 (2018-08-13)

* Support Cmd + Shift + Click for Macs. See [pull #54](https://github.com/Mottie/GitHub-userscripts/pull/54); thanks [@vmphipps](https://github.com/vmphipps)!

### Version 1.1.1 (2018-01-18)

* Update assets.
* Fix lint issue.

### Version 1.1.0 (2017-06-15)

* Add support for toggling outdated pull request reviews. See [pull #22](https://github.com/Mottie/GitHub-userscripts/pull/22); thanks [@cmalard](https://github.com/cmalard)!

### Version 1.0.6 (2017-05-16)

* Change license to MIT.

### Version 1.0.5 (2017-05-14)

* Update to work in releases pages; thanks [@darkred](https://github.com/darkred)!

### Version 1.0.4 (2017-03-25)

* Fix linting.

### Version 1.0.3 (2017-01-11)

* Clean up `closest` function.
* Use `classList` toggle.

### Version 1.0.2 (2016-09-29)

* Target selectors inside of commit lists. Fixes [issue #8](https://github.com/Mottie/GitHub-userscripts/issues/8).

### Version 1.0.0 - 1.0.1 (2016-09-17)

* Initial commit.
* Fix URL.
