A userscript that allows the previewing of repository images.

* This script adds the ability to preview images (png, jpg, jpeg, gif, tif, tiff, bmp, webp and svg).
* There are two preview modes:
  * Mini preview where the image maximum size is around 180 pixels x 130 pixels in size.
  * Full height image preview (870 pixels maximum width with proportional height).
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-image-preview.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/19773-github-image-preview) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Image_Preview).

## Screenshot

![image-preview](https://cloud.githubusercontent.com/assets/136959/15345789/c60ba684-1c77-11e6-86fd-dada166324e6.gif)

## Change Log

### Version 2.0.3 (2020-08-08)

* Prevent JS error.

### Version 2.0.2 (2020-07-13)

* Remove optional chaining.
* Fix non-image alignment.

### Version 2.0.1 (2020-07-12)

* Fix preview target. Closes [issue #116](https://github.com/Mottie/GitHub-userscripts/issues/116)

### Version 2.0.0 (2020-07-11)

* Update to match repo files grid.

### Version 1.2.4 (2019-09-22)

* Remove console error & cleanup.

### Version 1.2.3 (2019-06-07)

* Update loading icon.

### Version 1.2.2 (2019-02-16)

* Update GitHub icon.

### Version 1.2.1 (2019-01-28)

* Update mutation script.

### Version 1.2.0 (2018-10-20)

* Switch to lazy loading of SVG images.

### Version 1.1.18 (2018-10-05)

* Update mutation script.

### Version 1.1.17 (2018-06-01)

* Maintain view state more reliably & code clean up.
* Add title tooltips & more clean up.
* Add class to up tree link; needed so files-filter doesn't hide it.

### Version 1.1.16 (2018-05-22)

* Use button element for accessibility.

### Version 1.1.15 (2018-05-17)

* Update mutation script.

### Version 1.1.14 (2018-05-10)

* Update mutation script.

### Version 1.1.13 (2018-04-09)

* Update mutation script url.

### Version 1.1.12 (2018-01-18)

* Update assets.

### Version 1.1.11 (2017-10-08)

* Update mutation script url.

### Version 1.1.10 (2017-06-26)

* Handle symlink directories.
* Add a class for folder tiles.

### Version 1.1.9 (2017-05-16)

* Change license to MIT.

### Version 1.1.8 (2017-04-21)

* Update mutation url.

### Version 1.1.5 - 1.1.7 (2017-04-13)

* Switch to using mutations.js.

### Version 1.1.4 (2017-03-25)

* Use pjax event & fix linting.

### Version 1.1.3 (2016-12-21)

* Reduce image tile margin.

### Version 1.1.2 (2016-09-24)

* Adjust preview card size after GitHub changes.

### Version 1.1.0 - 1.1.1 (2016-09-16)

* Change "btn-group" to "BtnGroup" (GitHub update).
* Beautify.
* One more button class tweak.

### Version 1.0.9 (2016-07-28)

* Fixed a selector, then went crazy (converted to ES6).

### Version 1.0.8 (2016-07-28)

* Style tweaks.

### Version 1.0.7 (2016-06-07)

* Ignore case on image types.

### Version 1.0.6 (2016-05-22)

* Support submodules & non-links.
* Add link colors to non-image files.

### Version 1.0.5 (2016-05-21)

* Move file extension text over the file icon.

### Version 1.0.4 (2016-05-19)

* Fix file extension display:
  * Ignore extensionless files (e.g. "LICENSE").
  * Ignore files starting with a period (e.g. ".gitignore").

### Version 1.0.3 (2016-05-18)

* Add `@connect` setting to prevent popup warnings.

### Version 1.0.2 (2016-05-18)

* Show file extension for non-image files.

### Version 1.0.1 (2016-05-18)

* Increase check display mode delay on init.

### Version 1.0.0 (2016-05-17)

* Initial commit
