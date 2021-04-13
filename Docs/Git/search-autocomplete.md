A userscript that adds autocomplete search filters to GitHub

* Searching on GitHub is complicated, and there are over 50 filters to choose from. This userscript makes them a little easier to use.
* Search filter information obtained from the pages listed on https://help.github.com/categories/search/.
* If something isn't working, please review GitHub's search documentation linked above.
* Autocomplete searchs are applied to the following search inputs:
  * All pages on in the github domain with a search bar in the header.
  * https://github.com/search/
  * https://github.com/search/advanced
  * https://github.com/:user/:repo/issues
  * https://github.com/:user/:repo/pulls
  * https://gist.github.com/search
  * https://gist.github.com/search?q=css (added v0.1.5)
* To use:
  * Enter `?` to get a full list of filters.
  * Press <kbd>Enter</kbd>, or click on the filter to choose it.
  * Enter the search term, or press <kbd>&rarr;</kbd> (right arrow) to open up a secondary list of terms &amp; examples.
* NOTE: Issues do occur when using this userscript along with the [Awesome Autocomplete for GitHub](https://chrome.google.com/webstore/detail/awesome-autocomplete-for/djkfdjpoelphhdclfjhnffmnlnoknfnd) browser addon/extension:
  * The popup for this userscript overlaps the Awesome Autocomplete's popup.
  * Pressing <kbd>Tab</kbd> or <kbd>Enter</kbd> to select a dropdown item in this userscript's dropdown will also select Awesome Autocomplete's current selection and jump to that page. To bypass this problem, click on the selection using your mouse.
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-search-autocomplete.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/28592-github-search-autocomplete) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Search_Autocomplete).

## Screen shot

![](https://cloud.githubusercontent.com/assets/136959/24570197/e02272e8-162f-11e7-9ec5-9f70f1820112.gif)

## Change Log

### Version 1.0.2 (2019-05-19)

* Partially fix GitHub Dark styling. Fixes [issue #83](https://github.com/Mottie/GitHub-userscripts/issues/83).

### Version 1.0.1 (2019-02-16)

* Update GitHub icon.

### Version 1.0.0 (2018-01-18)

* Update assets.

### Version 0.1.5 (2017-05-17)

* Add gist search results page.

### Version 0.1.4 (2017-05-16)

* Change license to MIT.

### Version 0.1.3 (2017-05-10)

* Remove initialization flag.
* Remove trailing colon from logical operators (AND, OR, NOT).

### Version 0.1.2 (2017-04-13)

* Update jQuery v3.2.1.

### Version 0.1.0 & 0.1.1 (2017-03-31)

* Initial commit.
* Fix linting issues
