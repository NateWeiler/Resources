A userscript that adds a repo issues count to the user repository &amp; organization page (`https://github.com/:user`)

* This script makes it easy to see the total number of open issues & pull requests for each repository.
* It works on both user & organization pages.
* It now includes pinned repositories, but only those repositories for the user. Pinned repos for other organizations will not show an issue count.
* Known issue: not all repositories will get an issue link - see [[known issues]] for details.
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-issue-counts.user.js) to install from GitHub; or install from [GreasyFork](https://greasyfork.org/en/scripts/15560-github-show-repo-issues) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Show_Repo_Issues).

## Screen shots

![github-issue-counts](https://cloud.githubusercontent.com/assets/136959/21301601/af93bbac-c574-11e6-88d4-691d66a04f21.gif)

## Change Log

### Version 3.0.17 (2019-02-16)

* Update GitHub icon.

### Version 3.0.16 (2019-01-28)

* Update mutation script.

### Version 3.0.15 (2018-10-05)

* Update mutation script.

### Version 3.0.14 (2018-05-17)

* Update mutation script.

### Version 3.0.13 (2018-05-10)

* Update mutation script.

### Version 3.0.12 (2018-04-09)

* Update mutation script url.

### Version 3.0.11 (2018-01-18)

* Update assets.

### Version 3.0.10 (2017-10-08)

* Update mutation script url.

### Version 3.0.9 (2017-06-27)

* Fix relative URLs. Fixes a problem encountered on https://github.com/zenhubio/ where the issue links would duplicate the user and become https://github.com/zenhubio/ZenHubIO/issues.
* Add issue links to all repos on page. Include pinned & complete repo list when both are visible on a page.

### Version 3.0.8 (2017-05-16)

* Change license to MIT.

### Version 3.0.7 (2017-04-21)

* Update mutation url.

### Version 3.0.4 - 3.0.6 (2017-04-13)

* Switch to using mutations.js.

### Version 3.0.3 (2017-04-09)

* Target the last div in repo list. A 4th div was added when topics were introduced.

### Version 3.0.2 (2017-03-25)

* Use pjax event & fix linting.

### Version 3.0.1 (2017-03-12)

* Add issue icon to correct position in pinned cards.

### Version 3.0.0 (2016-12-18)

* Update to support new (not that new) repo page layout.
* Add support for "own" pinned repos.
* Rewritten in javascript ES2015.

### Version 2.3.2 (2016-05-25)

* Prevent JS error on "github.com/stars" page.

### Version 2.3.1 (2016-04-11)

* Add `@connect` setting ([ref](https://greasyfork.org/en/forum/discussion/7853/devs-tampermonkeys-upcoming-support-of-connect-may-break-scripts-with-gm-xmlhttprequest#latest)).

### Version 2.3.0 (2016-03-24)

* Moved code to [GitHub-userscripts](https://github.com/Mottie/GitHub-userscripts)

### Version 2.2.0 (2015-12-27)

* Fix link to issues.
* Add mutation observer. Fixes [issue #2](https://github.com/Mottie/Github-show-repo-issues/issues/2).
* Rewritten in plain JS (no jQuery).
* Add inline svg instead of background - allows hover color.
* Add busy flag & comparisons in mutation observer to reduce function calls.
* Removed entry limitation since only one call to the API is needed.

### Version 2.1.1 (2015-12-26)

* Update screenshot.
* Use base64 encoded icon for Firefox. Fixes [issue #1](https://github.com/Mottie/Github-show-repo-issues/issues/1).

### Version 2.1.0 (2015-12-25)

* Use user repos list to get issue count.
* Now works without page reload.
* Add package.json.

### Version 2.0.1 (2015-12-25)

* Include organization page.

### Version 2.0 (2015-12-25)

* Rewritten for new layout.
* Changed icon to svg.

### Version 1.2 (2013-01-08)

* Modified script to work with ajax tabs.

### Version 1.1 (2012-11-23)

* Added a location check, otherwise Chrome injects the script into every page.

### Version 1.0 (2012-10-15)

* Updated script to match the new profile page.

### Version 1.0.2 beta (2012-05-09)

* Updated script to use Github API v3, as v2 is supposed to be terminated 5/2012 ([ref](https://github.com/blog/1090-github-api-moving-on)).

### Version 1.0.1 beta (2012-05-09)

* Modified icon positioning to fit the github changes made by replacing images with font icons.

### Version 1.0 beta (2012-01-17)

* Working in Chrome now, YAY!
* Renamed script to "github-issue-counts.user.js" to make it automatically install per the instructions.
* Copied the installation instructions from [skratchdot](https://github.com/skratchdot/github-repo-counts.user.js).

### Version 0.9 alpha (2012-01-16)

* Initial post.
* Not working in Chrome for some reason =/
