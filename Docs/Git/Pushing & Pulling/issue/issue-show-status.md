## **Deprecated**

GitHub added this functionality on [2019.01.04](https://blog.github.com/changelog/2019-01-04-sticky-coversation-headers/); this userscript is no longer required!

---

A userscript that adds an obvious indicator showing if an issue or pull request is open or closed

* The userscript adds a label to the top of the issue and pull request side bar indicating the status of the issue: open, closed or merged.
* A `position:sticky` style is applied to the issue and pull request side bar to keep the information in view.
* A class name of "github-issue-status-open", "github-issue-status-closed" or "github-issue-status-merged" is also added to the `body` to allow custom styling via a userstyle.
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-issue-show-status.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/30268-github-issue-show-status) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Issue_Show_Status).

## Screenshot

### Before

![github-issue-show-status-before](https://cloud.githubusercontent.com/assets/136959/26712539/eb983b7a-472c-11e7-884e-3d3750899419.gif)

### After

![github-issue-show-status-after](https://cloud.githubusercontent.com/assets/136959/26712526/dee3c700-472c-11e7-9128-5573cd137f46.gif)

## Change Log

### Version 1.0.6 (2019-02-16)

* Update GitHub icon.

### Version 1.0.5 (2019-01-28)

* Update mutation script.

### Version 1.0.4 (2018-10-05)

* Update mutation script.

### Version 1.0.3 (2018-05-17)

* Update mutation script.

### Version 1.0.2 (2018-05-10)

* Update mutation script.

### Version 1.0.1 (2018-04-09)

* Update mutation script url.

### Version 1.0.0 (2018-01-18)

* Update assets.

### Version 0.1.2 (2017-08-22)

* Prevent js error.

### Version 0.1.1 (2017-06-03)

* Use updated mutations.js version; the newer version will indicate when a new item (e.g. an issue status change) has been added to the discussion.

### Version 0.1.0 (2017-06-02)

* Initial commit
