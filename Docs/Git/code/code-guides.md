A userscript that allows you to add one or more vertical guidelines to the code

* The userscript adds guideline(s) to code blocks.
* Customize the guideline position, color and width.
* Add as many guidelines as you desire.
* By default, one guide is set at 80 characters.
* Guidelines are added as a background linear gradient with multiple stops.
* It will not interfere if you copy & paste the code.
* The script was inspired by this thread: https://github.com/isaacs/github/issues/738.
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-code-guides.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/22674-github-code-guides) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Code_Guides).
* ~NOTE: A [Chrome linear gradients bug](https://bugs.chromium.org/p/chromium/issues/detail?id=729727) currently makes the guide(s) invisible or blurry - See the [[known issues]] page for more details~.
* ~See [this issue](https://github.com/Mottie/GitHub-userscripts/issues/10) as to why the guidelines don't always line up (in diff files)~.
* ~The userscript adds CSS to use a monospace font in all comment textareas~. Removed in v1.1.0. Use the [toggle](https://greasyfork.org/en/scripts/18787-github-monospace-font-toggle) instead.

## Screenshot

### Repo file

![github-code-guides](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/images/github-code-guides.png)

### Diff

![github-code-guides-diff](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/images/github-code-guides-diff.gif)

\* The misaligned guides inside the expanded content still align with the set position.

## Customization

### Guidelines

* Guidelines are set using a background linear gradient set using the [`ch` unit](https://www.w3.org/TR/css3-values/#ch), the width of the font's zero glyph ([see browser support](http://caniuse.com/#feat=ch-unit)).
* Because the `ch` unit is used, the font *must* be monospace or the guidelines will not be accurately set.
* The specific values used are adjusted as follows:
  * <del>To align the guides *after* the setting, we need to add `13px` (for padding)</del> Removed in v1.1.7.
  * The minimum width of the guideline is `0.2ch` because if any less, the guideline is not visible.
  * See the example section below to see that a guideline set to `80ch` with a `0.2ch` width is converted into a background linear gradient definition with stops at `81ch` and `81.2ch`.
  * The extra `1ch` is added to move the guides *after* the character column which indicates the maximum line length.
* I know the following method of adding guides isn't great, but it's a quick and dirty method to add guides.

To change the setting in Greasymonkey:

* Click on the Greasymonkey addon icon.
* Select "User Script Commands..."
* Choose "Set code guideline position & color".
  * A prompt will open asking you to enter a guideline object.
  * Enter a *valid* JSON string following the example format shown in the example section.

  ![github-code-guides-firefox](https://cloud.githubusercontent.com/assets/136959/18025051/78a3f742-6be2-11e6-8aaf-6e2d8959fbd5.png)

In Tampermonkey:

* Click on the Tampermonkey extension icon.
* Choose "Set code guideline position & color".
  * A prompt will open asking you to enter a guideline object.
  * Enter a *valid* JSON string following the example format shown in the example section.

  ![github-code-guides-chrome](https://cloud.githubusercontent.com/assets/136959/18025053/78aab0f0-6be2-11e6-8092-18b2f2257df7.png)

### Font

* Enter a font that is installed on your system; the script will not load external fonts.
* Font names are added to a font stack with the entered name first.
* The other fonts listed in the stack are (in order): Consolas, "Liberation Mono", Menlo, Courier and monospace.

To change the setting in Greasymonkey:

* Click on the Greasymonkey addon icon.
* Select "User Script Commands..."
* Choose "Set code guideline default font".
  * A prompt will open asking you to enter a font name.
  * Do it.

In Tampermonkey:

* Click on the Tampermonkey extension icon.
* Choose "Set code guideline default font".
  * A prompt will open asking you to enter a font name.
  * Do it.

### TabSize

* Tab size option added in v1.1.4.
* A default tab size of `2` is set. Use the Greasemonkey/Tampermonkey settings panel to modify it.
* If you are using GitHub Dark, this setting will be overwritten by the GitHub Dark tab setting.

## Examples

### Default guideline

```js
[{
  "chars" : 80,
  "color" : "rgba(0, 0, 0, .3)",
  "width" : 0.2
}]
```

Resulting CSS (see the Guidelines section above to see why these values are used)

```css
.blob-code {
  background: linear-gradient(
    to right,
    transparent          0%,
    transparent          calc(81.0ch),
    rgba(255, 0, 0, 0.3) calc(81.0ch),
    rgba(255, 0, 0, 0.3) calc(81.2ch),
    transparent          calc(81.2ch),
    transparent          100%
  ) !important;
}
```

### Two guidelines

```js
/* example css of two guidelines at 80 and 84 characters
  (84 used in case you indent using spaces) */
[{
  "chars" : 80,
  "color" : "rgba(255, 130, 0, .3)",
  "width" : 0.2
}, {
  "chars" : 84,
  "color" : "rgba(255, 0, 0, .3)",
  "width" : 0.2
}]
```

Resulting CSS (see the Guidelines section above to see why these values are used)

```css
.blob-code {
  background: linear-gradient(
    to right,
    transparent            0%,
    transparent            calc(81.0ch),
    rgba(255, 0, 130, 0.3) calc(81.0ch),
    rgba(255, 0, 130, 0.3) calc(81.2ch),
    transparent            calc(81.2ch),

    transparent            calc(85.0ch),
    rgba(255, 0, 0, 0.3)   calc(85.0ch),
    rgba(255, 0, 0, 0.3)   calc(85.2ch),
    transparent            calc(85.2ch),
    transparent            100%
  ) !important
}
```

## Troubleshooting

* If after updating the guideline position & color value, no guidelines appear, then
  * Check the "chars" value. It will be ignored if set to zero, or if it is within character width of the previous guideline (e.g. "81" and "81.2").
  * Re-check the color values. No color validation is done, so any error in this setting will cause the browser to ignore the entire guideline definition.
  * Width's less than 0.2 character width are not visible. The script does attempt to prevent values less than this setting.

* For all other problems, check the development console for errors.

## Change Log

### Version 1.1.14 (2020-07-11)

* Restore guides.

### Version 1.1.13 (2020-04-01)

* Restore diff +/- markers.

### Version 1.1.12 (2020-03-24)

* Realign & stop interference with GitHub-Dark.

### Version 1.1.11 (2019-02-16)

* Update GitHub icon.

### Version 1.1.10 (2018-01-18)

* Update assets.

### Version 1.1.9 (2017-12-01)

* Guides no longer prevent text selection. Fixes [issue #32](https://github.com/Mottie/GitHub-userscripts/issues/32).

### Version 1.1.7 &ndash; 1.1.8 (2017-09-02)

* Fix alignment issues.
* Set guide after indicated character.

### Version 1.1.6 (2017-05-16)

* Change license to MIT.

### Version 1.1.5 (2017-04-13)

* Clarify option name in menu.
* Meta: update screenshots.

### Version 1.1.3 - 1.1.4 (2017-04-11)

* Fix position accuracy; alignment is still slightly off. See [issue #10](https://github.com/Mottie/GitHub-userscripts/issues/10).
* Add tab size option & fix paddings.

### Version 1.1.2 (2017-03-25)

* Fix linting.

### Version 1.1.1 (2017-01-31)

* Fix overflow of content on blame pages.

### Version 1.1.0 (2016-09-29)

* Remove guides &amp; monospace font from textarea. Fixes [issue #9](https://github.com/Mottie/GitHub-userscripts/issues/9).
* No guides on non-code lines. Fixes [issue #10](https://github.com/Mottie/GitHub-userscripts/issues/10).

### Version 1.0.1 (2016-09-12)

* Beautify.

### Version 1.0.0 (2016-08-27)

* Initial commit
