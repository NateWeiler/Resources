A userscript that adds a font file preview

* This script adds the ability to preview fonts & glyphs.
* Currently ony OpenType (otf), TrueType (ttf) and Web Open (woff; not woff2) font formats are supported.
* [opentype.js](http://opentype.js.org/) is used for font rendering and the preview code has been blatantly copied from the [font inspector](http://opentype.js.org/font-inspector.html) and [glyph inspector](http://opentype.js.org/glyph-inspector.html) demos (Copyright © 2015 Frederik De Bleser; MIT license).
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-font-preview.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/20479-github-font-preview) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Font_Preview).
* After installing, try the userscript on one of these pages:
  * [Font-Awesome](https://github.com/FortAwesome/Font-Awesome/tree/master/webfonts)
  * [material-design-iconic-font](https://github.com/zavoloklom/material-design-iconic-font/tree/master/dist/fonts)
  * [Google fonts](https://github.com/google/fonts)
  * [FontSquirrel fonts](https://github.com/Jolg42/FontSquirrel-Fonts)
  * [Hack](https://github.com/chrissimpkins/Hack/tree/master/build)
  * Adobe [source-code-pro](https://github.com/adobe-fonts/source-code-pro)
  * [ionicons](https://github.com/driftyco/ionicons/tree/master/fonts)
  * [FiraCode](https://github.com/tonsky/FiraCode/tree/master/distr)

## Screenshot

![github-font-preview](https://cloud.githubusercontent.com/assets/136959/15997539/fac278ca-30fa-11e6-8ecf-7e95f5ff9694.gif)

## Change Log

### Version 1.0.22 (2019-06-07)

* Update selectors for GitHub changes & cleanup.

### Version 1.0.21 (2019-02-16)

* Update GitHub icon.

### Version 1.0.20 (2019-01-28)

* Update mutation script.

### Version 1.0.19 (2018-10-05)

* Update mutation script.

### Version 1.0.18 (2018-05-17)

* Update mutation script.

### Version 1.0.17 (2018-05-10)

* Update mutation script.

### Version 1.0.16 (2018-04-09)

* Update mutation script url.

### Version 1.0.15 (2018-01-18)

* Update assets.
* Fix lint issue.

### Version 1.0.14 (2017-10-08)

* Update mutation script url.

### Version 1.0.13 (2017-05-16)

* Change license to MIT.

### Version 1.0.12  (2017-04-21)

* Update mutation url.

### Version 1.0.9 - 1.0.11 (2017-04-13)

* Switch to using mutations.js.

### Version 1.0.8 (2017-03-25)

* Use pjax event & fix linting.

### Version 1.0.7 (2016-12-28)

* Clean up linting issues.

### Version 1.0.6 (2016-12-27)

* Fix GitHub font preview mini glyph fill. See [pull #14](https://github.com/Mottie/GitHub-userscripts/pull/14); thanks [@emabrey](https://github.com/emabrey)!

### Version 1.0.5 (2016-07-30)

* Fix HR css breaking page layouts.

### Version 1.0.4 (2016-07-21)

* Catch javascript error on diff pages.

### Version 1.0.3 (2016-06-20)

* Limit height of font data blocks.

### Version 1.0.2 (2016-06-12)

* Add UI improvements
  * Add loading indicator.
  * Toggle arrows & points in glyph preview.
  * Toggle glyph index/unicode.
  * Increase font size of glyph index/unicode.
  * Add color to pagination.
  * Increase size of glyph blocks.
  * Prevent glyph data from displaying "undefined" values.

### Version 1.0.1 (2016-06-11)

* Show "Undefined" for empty font tables; usually the Font Variations (`fvar`) table.

### Version 1.0.0 (2016-06-11)

* Initial commit
