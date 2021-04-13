A userscript that adds a button to insert RTL text blocks in comments

* It only works on issue & gist comment pages.
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-rtl-comments.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/20542-github-rtl-comment-blocks) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_RTL_Comment_Blocks).

## Screenshot

![github-rtl-comments](https://cloud.githubusercontent.com/assets/136959/16100976/ce7d1070-3327-11e6-91bd-403e75e679bd.gif)

## Change Log

### Version 1.3.0 (2020-07-11)

* Update to work with GM4. Fixes [issue #114](https://github.com/Mottie/GitHub-userscripts/issues/114).

### Version 1.2.17 (2019-02-16)

* Update GitHub icon.

### Version 1.2.16 (2019-01-28)

* Update mutation script.

### Version 1.2.15 (2018-10-05)

* Update mutation script.

### Version 1.2.14 (2018-05-17)

* Update mutation script.

### Version 1.2.13 (2018-05-10)

* Update mutation script.

### Version 1.2.12 (2018-04-09)

* Update mutation script url.

### Version 1.2.11 (2018-01-18)

* Update assets.

### Version 1.2.10 (2017-10-08)

* Update mutation script url.

### Version 1.2.9 (2017-05-16)

* Change license to MIT.

### Version 1.2.8 (2017-04-21)

* Update mutation url.

### Version 1.2.5 - 1.2.7 (2017-04-13)

* Switch to using mutations.js.

### Version 1.2.4 (2017-03-25)

* Use pjax event & move caret code.

### Version 1.2.2 (2017-01-11)

* Clean up "closest" function.

### Version 1.2.1 (2016-12-28)

* Clean up linting issues.

### Version 1.2.0 (2016-06-24)

* Include in Gists comments.
* Reduce update calls on preview.

### Version 1.1.1 (2016-06-16)

* Remove `unicode-bidi` setting on RTL content.
* Apply formatting after comment edit.

### Version 1.1.0 (2016-06-15)

* Replace `&rlm;` and `&lrm;` within markdown with a div.
* Include `unicode-bidi:isolate;`
* Force LTR inside code blocks.
* Start using some ES6 code.
* See https://github.com/dear-github/dear-github/issues/147 for details.

### Version 1.0.0 (2016-06-13)

* Initial commit
