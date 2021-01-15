A userscript that makes some lists & markdown tables sortable

* This userscript makes the following content sortable; links to some example pages (install the userscript first!):
  * Markdown tables - on [`https://github.com/(:user|:org)/:repo`](https://github.com/Mottie/GitHub-userscripts) and [`https://github.com/(:user|:org)/:repo/wiki`](https://github.com/openstyles/stylus/wiki/Stylish-Alternatives) pages
  * Repo files table - [`https://github.com/(:user|:org)/:repo`](https://github.com/Mottie/GitHub-userscripts) (sort content, message or age columns)
  * Feed Activity - [`https://github.com`](https://github.com) (recent & all)
  * Main Sidebar - [`https://github.com`](https://github.com) (Repositories & Your teams)
  * Pinned Repos - [`https://github.com/:org`](https://github.com/StylishThemes) & [`https://github.com/:user`](https://github.com/Mottie)
  * Organization repos - [`https://github.com/:org`](https://github.com/jquery) (inline with search input)
  * Organization people - [`https://github.com/orgs/:org/people`](https://github.com/orgs/jquery/people) (inline with search input)
  * Organization outside collaborators (own orgs) - `https://github.com/orgs/:org/outside-collaborators`
  * Organization teams (own orgs) - `https://github.com/orgs/:org/teams`
  * Organization team repos - `https://github.com/orgs/:org/teams/:team/repositories`
  * Organization team members - `https://github.com/orgs/:org/teams/:team/members`
  * Organization projects - `https://github.com/:org/projects`
  * User repos - [`https://github.com/:user?tab=repositories`](https://github.com/Mottie?tab=repositories).
  * User stars - [`https://github.com/:user?tab=stars`](https://github.com/Mottie?tab=stars).
  * User Followers - [`https://github.com/:user?tab=followers`](https://github.com/Mottie?tab=followers).
  * User Following - [`https://github.com/:user?tab=following`](https://github.com/Mottie?tab=following).
  * Watching - [`https://github.com/watching`](https://github.com/watching).
  * Subscriptions - [`https://github.com/notifications/subscriptions`](https://github.com/notifications/subscriptions).
  * Repo stargazers - [`https://github.com/:user/:repo/stargazers`](https://github.com/Mottie/GitHub-userscripts/stargazers).
  * Repo watchers - [`https://github.com/:user/:repo/watchers`](https://github.com/Mottie/GitHub-userscripts/watchers).
* The script uses [tinysort](http://tinysort.sjeiti.com/):
  * Therefore, only a ascending or descending sort of the list can be applied.
  * The only way to reset the sort is to reload the page.
  * Sorting of dates will work if all dates are within the same year; *dates that span years will not sort properly* - this is a limitation of the tinysort plugin.
* The sort *only applies to the elements on the current page*; lists that continue on to other pages are not included.
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-sort-content.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/21373-github-sort-content) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Sort_Content).

\* NOTES \*

* In v3.0+, the [`https://github.com/:user?tab=stars`](https://github.com/Mottie?tab=stars) and [`https://github.com/watching`](https://github.com/watching) pages sort the content using the repository name, and **not** the owner of the repo.
* Columns containing dates will not sort as expected because the [tinysort](https://github.com/Sjeiti/TinySort/issues/68) library does not support it natively.

## Screenshots

Markdown table

![github-sort-content-table](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/images/github-sort-content-table.gif)

Organization repos/people (only the current page)

![github-sort-content-organization](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/images/github-sort-content-organization.gif)

Following/You Know

![github-sort-content-following](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/images/github-sort-content-following.gif)

## Change Log

### Version 3.1.1 (2020-08-08)

* Fix JS error.

### Version 3.1.0 (2020-07-11)

* Updated tinysort.
* Update repo files - GitHub changed the table into divs.
* Removed `https://github.com/:user/followers`, `https://github.com/:user/followers/you_know`,
  `https://github.com/:user/following` and `https://github.com/:user/following/you_know` because
  paths were completely removed
* Added `https://github.com/notifications/subscriptions`.
* Switched to use `aria-sort` attribute vs class name of sort direction.

### Version 3.0.2 (2019-11-10)

* Update selectors. Fixes [issue #104](https://github.com/Mottie/GitHub-userscripts/issues/104).

### Version 3.0.1 (2019-09-22)

* Prevent adding duplicate thead.

### Version 3.0.0 (2019-09-01)

* Rewrite script to ease updating of constantly changing class names & markup; thanks GitHub!
* Sort indicators have *all* been moved to the left of the sortable block; previously positioned to the right, and adjusted to make room for admin buttons.
* Add support to team members, team repos, repos & project pages.
* Changed the [`https://github.com/:user?tab=stars`](https://github.com/Mottie?tab=stars) and [`https://github.com/watching`](https://github.com/watching) pages to sort the content using the repository name, and **not** the owner of the repo.
* Lots of code cleanup.
* Fixes [issue #99](https://github.com/Mottie/GitHub-userscripts/issues/99).

### Version 2.0.5 (2019-03-29)

* Update header selector.

### Version 2.0.4 (2019-02-16)

* Update GitHub icon.

### Version 2.0.3 (2019-01-28)

* Update mutation script.

### Version 2.0.1 & 2.0.2 (2018-10-05)

* Update mutation script.
* Add support for gist.github.com. See [PR #61](https://github.com/Mottie/GitHub-userscripts/pull/61); thanks [@AviSynthPlus](https://github.com/AviSynthPlus)!

### Version 2.0.0 (2018-06-03)

* Complete rewrite for new layout.

### Version 1.2.9 (2018-05-17)

* Update mutation script.

### Version 1.2.8 (2018-05-10)

* Update mutation script.

### Version 1.2.7 (2018-04-12)

* Code cleanup.
* Fix user/org sorting.

### Version 1.2.6 (2018-04-09)

* Update mutation script url.

### Version 1.2.5 (2018-01-30)

* Update GM4 polyfill.

### Verison 1.2.4 (2017-12-13)

* Add GM4 polyfill & update assets.
* Add sort to Your Teams.

### Version 1.2.3 (2017-10-11)

* Fix sort container selectors.

### Version 1.2.2 (2017-10-08)

* Update mutation script url.
* Fix linting issues.

### Version 1.2.1 (2017-07-14)

* Prevent duplicate header on browser back (Chrome).

### Version 1.2.0 (2017-07-03)

* Make repo file list sortable. Fixes [issue #24](https://github.com/Mottie/GitHub-userscripts/issues/24).

### Version 1.1.6 (2017-05-16)

* Change license to MIT.

### Version 1.1.5 (2017-03-25)

* Fix linting.

### Version 1.1.4 (2017-01-13)

* Remove extra css definitiion.

### Version 1.1.3 (2017-01-11)

* Clean up "closest" function.
* Update to match layout changes.

### Version 1.1.2 (2016-12-31)

* Remove unnecessary log.

### Version 1.1.1 (2016-12-28)

* Clean up linting issues.

### Version 1.1.0 (2016-09-15)

* Add sort to user navigation bar (Overview, Repositories, Stars, Followers & Following).

### Version 1.0.8 (2016-09-12)

* Beautified.

### Version 1.0.7 (2016-09-03)

* Add sort to [watching list](https://github.com/watching).

### Version 1.0.6 (2016-09-02)

* Clean up code & Fix sorting issue on main page repo boxes.

### Version 1.0.4 & 1.0.5 (2016-08-20)

* Include background no-repeat with sorted arrows. Fixes [issue #5](https://github.com/Mottie/GitHub-userscripts/issues/5).
* Update user repo tab class name. See [issue #5](https://github.com/Mottie/GitHub-userscripts/issues/5).

### Version 1.0.3 (2016-07-29)

* Prevent JS error when clicking on the TOC userscript arrows.

### Version 1.0.2 (2016-07-21)

* Add following/follower list sort.

### Version 1.0.1 (2016-07-17)

* Add missing !important flag & screenshot.

### Version 1.0.0 (2016-07-13)

* Initial commit.
