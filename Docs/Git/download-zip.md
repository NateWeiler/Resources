A userscript adds download links so that downloaded filenames include the SHA

* This userscript works on:
  * Main repo page "Clone or Download" dropdown. The download link is modified.
  * Repo commits page. Each commit can be downloaded as a zip file.
* The dropdown may not show any content if the repo doesn't specifically define a release
  * https://github.com/Mottie/GitHub-userscripts/releases - doesn't define releases
  * https://github.com/xojs/xo/releases - defines releases & default assets
  * https://github.com/Maximus5/ConEmu/releases - defines releases & includes extra assets
* The zip is downloaded using the api, so the file name may or may not include the last tag associated with the commit.
* See [issue #62](https://github.com/Mottie/GitHub-userscripts/issues/62).
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-download-zip.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/373514-github-download-zip) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Download_ZIP).

## Examples

| URL | Name of downloaded file | Details |
|------|--------------------------|---------|
| https://api.github.com/repos/Mottie/GitHub-userscripts/zipball/master | Mottie-GitHub-userscripts-v1.0.214-0-gae48ca9.zip | user + repo + last tag + #? + "g" + SHA of last commit |
| https://api.github.com/repos/Mottie/GitHub-userscripts/zipball/v1.0.208 | Mottie-GitHub-userscripts-v1.0.208-0-gaa9b2db.zip | user + repo + associated tag + #? + "g" + SHA of tagged version |
| https://api.github.com/repos/Mottie/GitHub-userscripts/zipball/31340a9 | Mottie-GitHub-userscripts-v1.0.211-3-g31340a9.zip | user + repo + last tag + #? + "g" + SHA of last commit |
| https://api.github.com/repos/mozilla/pdf.js/zipball/gh-pages | mozilla-pdf.js-078f568.zip | user + repo + SHA of last commit in that branch |

## Screenshots

![github-download-zip](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/images/github-download-zip.gif)

![github-download-zip-commits](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/images/github-download-zip-commits.png)

## Change Log

### Version 0.2.5 (2020-03-27)

* Fixed section alignment.
* Fixed error & no results handling.
* Included zip & tarball in results.

### Version 0.2.4 (2019-10-19)

* Stop wrap on commits page.

### Version 0.2.3 (2019-06-07)

* Update loading icon.
* Prevent JS error on click.

### Version 0.2.0 &ndash; 0.2.2 (2019-05-05)

* Use non-truncated path. Fixes [issue #81](https://github.com/Mottie/GitHub-userscripts/issues/81).
* Add release links dropdown. Closes [issue #62](https://github.com/Mottie/GitHub-userscripts/issues/62).
* Fix message for no releases.
* Prevent truncated branch name usage. See [issue #81](https://github.com/Mottie/GitHub-userscripts/issues/81).

### Version 0.1.2 (2019-02-16)

* Fixfor GitHub Download Zip stopped working due to GH changes. See [issue #72](https://github.com/Mottie/GitHub-userscripts/issues/72) & [pull #73](https://github.com/Mottie/GitHub-userscripts/pull/73); thanks [@CollinChaffin](https://github.com/CollinChaffin)!
* Prevent duplicate buttons. Fixes [issue #74](https://github.com/Mottie/GitHub-userscripts/issues/74).
* Update GitHub icon.

### Version 0.1.1 (2019-01-28)

* Update mutation script.

### Version 0.1.0 (2018-10-22)

* Initial commit.
