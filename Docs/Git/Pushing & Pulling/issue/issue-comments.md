A userscript that adds a popup menu that allows toggling comments

* It only works on issue and pull request comment pages.
* Items include just about all timeline entries including title, label, milestone and other changes.
* There is also an option to toggle reactions and "+1" comments; it does include (any) emoji only comments and comments like "+1!!!!!!".
* Toggle comments from specific users by clicking on their avatar in the popup menu.
* Menu items that do not have content to hide will appear darker, except for the "Hide +1s" menu item (added v1.0.12).
* All menu settings are saved except for specific user that have their comments hidden.
* In v1.4.2, there are new/updated review entries:
  - `Reviews (All)` - hides _all_ reviews. This also includes review requests, approvals and change requests.
  - `Reviews (Outdated)` - hides only outdated reviews; but may include current reviews depending on the wrapper (see [issue #105](https://github.com/Mottie/GitHub-userscripts/issues/105#issuecomment-587430979)).
  - `Reviews (Resolved)` - hides only resolved reviews, which usually means they are outdated. Also may include other reviews depending on the grouping.
  - `Reviews (Current)` - hides only current reviews; but again it may include other review types.
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-issue-comments.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/18503-github-toggle-issue-comments) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Issue_Comments).

## Screenshot

![github-issue-comments-in-action](https://user-images.githubusercontent.com/136959/45923506-fdb64280-bead-11e8-9018-e6b4521d4e14.gif)

![github-issue-comments-active-items](https://user-images.githubusercontent.com/136959/45923503-fd1dac00-bead-11e8-8429-8cf4e7c9ba86.png)

### Menu (with ZenHub installed)

![github-issue-comments-zenhub](https://user-images.githubusercontent.com/136959/45923504-fdb64280-bead-11e8-9d3a-5d2e4a007ca4.png)

### Reaction text

Note: repeat +1s removed, so this number may not match the "Hide +1s" value.

![github-issue-comments-reaction-text](https://user-images.githubusercontent.com/136959/45923505-fdb64280-bead-11e8-8cca-ecdb2d2b2f0b.png)

## Change Log

### Version 1.4.4 (2020-03-06)

* Add Jenkins auto-merge & inactive deployments.

### Version 1.4.3 (2020-02-29)

* Use correct function name to fix hide plus 1 & reactions.
* Fix redefined variable.

### Version 1.4.2 (2020-02-18)

* Code cleanup
* Fixes for PR comments: commits, reviews, resolved, merged & integrations.
* Fix +1 comments display. See [issue #84](https://github.com/Mottie/GitHub-userscripts/issues/84). 

### Version 1.4.0 &amp; 1.4.1 (2020-02-16)

* Updated selectors (timeline classes changed).
* Add "Mentioned" menu item.
* Add "Resolved" menu item.
* Fix last comment avatar not being included.
* General code cleanup.
* See [issue #105](https://github.com/Mottie/GitHub-userscripts/issues/105).
* Fix reaction feature.
* Only force display of existing reactions. See [issue #84](https://github.com/Mottie/GitHub-userscripts/issues/84).

### Version 1.3.8 (2019-05-23)

* Fix path to GitHub emoji assets. Fixes [issue #84](https://github.com/Mottie/GitHub-userscripts/issues/84).

### Version 1.3.7 (2019-02-16)

* Update GitHub icon.

### Version 1.3.6 (2019-01-28)

* Update mutation script.

### Version 1.3.5 (2018-11-15)

* Add project changes toggle.

### Version 1.3.4 (2018-10-05)

* Fix avatar duplication & updating. See [issue #60](https://github.com/Mottie/GitHub-userscripts/issues/60).
* Add toggle for similar comments.

### Version 1.3.3 (2018-10-05)

* Strikethrough applied filter names. See [issue #59](https://github.com/Mottie/GitHub-userscripts/issues/59).
* Fix avatar toggle & append new on update. See [issue #60](https://github.com/Mottie/GitHub-userscripts/issues/60).
* Update mutation script.

### Version 1.3.2 (2018-09-24)

* Fix reaction item visibility. See [issue #58](https://github.com/Mottie/GitHub-userscripts/issues/58).

### Version 1.3.1 (2018-09-23)

* Detect & show "+1 comments". See [issue #58](https://github.com/Mottie/GitHub-userscripts/issues/58).
* Highlight unhidden +1 comments.
* Add more ignorable key words.

### Version 1.3.0 (2018-09-22)

* Ignore sort reactions block. Fixes [issue #57](https://github.com/Mottie/GitHub-userscripts/issues/57).
* Show toggle button instead of checkmark.
* Add only active toggle. Closes [issue #58](https://github.com/Mottie/GitHub-userscripts/issues/58).
* Update screenshot images.

### Version 1.2.3 (2018-09-21)

* Prevent JS error reported in [issue #56](https://github.com/Mottie/GitHub-userscripts/issues/56).

### Version 1.2.2 (2018-06-26)

* Add more key words to ignore.

### Version 1.2.1 (2018-05-17)

* Update mutation script.

### Version 1.2.0 (2018-05-10)

* Add internal checks to prevent JS errors.
* Swap checkmark behavior. See [issue #44](https://github.com/Mottie/GitHub-userscripts/issues/44).
* Check more words for comments to hide.
* Update mutation script.

### Version 1.1.5 (2018-04-09)

* Update mutation script url.

### Version 1.1.4 (2018-01-18)

* Update assets.

### Version 1.1.3 (2017-10-20)

* Update reference selector. Fixes [issue #28](https://github.com/Mottie/GitHub-userscripts/issues/28).

### Version 1.1.1 &ndash; 1.1.2 (2017-10-10)

* Fix js error & replace header.
* Fix another js error.

### Version 1.1.0 (2017-10-08)

* Add Reviews (all &amp; outdated) toggle.
* Show active button while content is hidden.
* Update mutation script url.

### Version 1.0.27 (2017-06-05)

* Update avatar logo class name. Fixes [issue #20](https://github.com/Mottie/GitHub-userscripts/issues/20).

### Version 1.0.26 (2017-05-16)

* Change license to MIT.

### Version 1.0.25 (2017-04-21)

* Update mutation url.

### Version 1.0.22 - 1.0.24 (2017-04-13)

* Switch to using mutations.js.

### Version 1.0.21 (2017-03-25)

* Use pjax event & optimize observers.

### Version 1.0.20 (2017-01-11)

* Clean up "closest" function.

### Version 1.0.19 (2016-12-28)

* Clean up linting issues.

### Version 1.0.18 (2016-07-17)

* Add "cmon" & "come on" to list of words to ignore.

### Version 1.0.17 (2016-07-11)

* Fix JS error when first comment doesn't have a reaction.

### Version 1.0.16 (2016-07-09)

* Add unicode thumbs up which later get replaced by an image in Windows.
* Always show first comment reactions.

### Version 1.0.15 (2016-06-28)

* Fix JS error that pops up when you toggle selections that have content.

### Version 1.0.13 & 1.0.14 (2016-06-16)

* Prevent JS error when no items exist.
* Prevent JS error in closest function.

### Version 1.0.12 (2016-06-14)

* Update menu UI.
  * Show bold menu text only when an item is checked.
  * Fade out menu items when no related elements are detected (except hide +1).
  * Requested by darkred ([ref](https://greasyfork.org/en/forum/discussion/10021/)).
* Code clean up, using more ES6.

### Version 1.0.11 (2016-06-13)

* Add check to prevent javascript errors.

### Version 1.0.10 (2016-06-06)

* Use native element matches.

### Version 1.0.9 (2016-05-25)

* Remove parentheses from reaction count.

### Version 1.0.8 (2016-05-24)

* Hide more comments, but don't count authors twice.

### Version 1.0.7 (2016-05-23)

* Do not remove link only comments (see [these comments](https://github.com/isaacs/github/issues/618#issuecomment-200869630)).
* Add hidden +1 count to top post. Requested [here](https://github.com/isaacs/github/issues/64).
* Auto update after "View more" comments is used (see [a link here](https://github.com/isaacs/github/issues/215#issuecomment-110343438)).

### Version 1.0.5 & 1.0.6 (2016-05-22)

* Include a count of hidden items in the menu.
* Only run script on issue pages.

### Version 1.0.4 (2016-05-19)

* Remove regex test, use replace instead. Hide plus 1 was including "Fixes gh-123" comments.

### Version 1.0.3 (2016-05-17)

* Fix checkmark wrap in Firefox ([ref](https://greasyfork.org/en/forum/discussion/9166/x)).

### Version 1.0.2 (2016-04-10)

* Include "pleeeassseee" comments when removing +1s.

### Version 1.0.1 (2016-04-07)

* Consider any emoji as a +1 (e.g. cake, tada, etc)
* Update selections after (ajax) page change.
* Prevent JS error with a solitary empty comment.

### Version 1.0.0 (2016-04-04)

* Initial commit
