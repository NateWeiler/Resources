A userscript that adds a color picker to the label color input

* This script only works on the `github.com/:user/:repo/labels` page.
* [ColorPicker](http://www.dematte.at/colorPicker/) is the plugin applied to the label color inputs.
* RGB, HSV, HSL, Hex, CMYK, CMY, XYZ and Lab color entry are all supported.
* The alpha channel is disabled because labels can only be set as a solid color.
* Save up to 8 color swatches.
* Please read the [ColorPicker documentation](https://github.com/PitPik/colorPicker) for additional details.
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-label-color-picker.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/23270-github-label-color-picker) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Label_Color_Picker).

## Screenshot

![github-label-color-picker](https://cloud.githubusercontent.com/assets/136959/18604929/07306c6c-7c4a-11e6-8bb7-39f93f5bbb30.gif)

## Editing Swatch Colors

### Notes:

* The ColorPicker plugin allows the saving a maximum of 8 swatches. If you want to add more, please discuss it with the author of the [ColorPicker plugin](https://github.com/PitPik/colorPicker/issues).
* Internally, the swatches are saved in a strict `"rgba(255,255,255,1)"` format, but because I like you I made this userscript accept hex values as well as rgba colors. Please be aware that after saving, all hex colors are coverted into their rgba equivalent - the alpha channel is always set to `1` - and therefore the next time you edit the settings, they will be in that format.
* To save a color swatch in the popup, click on the far right swatch with a circle. This will remove the eighth swatch!

### Editing:

* Click on the GreaseMonkey/Tampermonkey icon in the browser to open the popup.
* Select the "Set label ColorPicker swatch colors" setting.
* A prompt will open with and input containing the currently set swatch values. Acceptable formats include:
  * `#123456`.
  * `#123`.
  * `rgba(255, 255, 255, 1)`.
  * All single and double quotes will be ignored.
* Each entry must be separated by a comma, any spaces are ignored.
* Edit and click "OK".
* Reload the page to update the swatch colors.

## Change Log

### Version 1.0.7 (2019-07-25)

* Fix popup location.

### Version 1.0.6 (2019-02-16)

* Update GitHub icon.

### Version 1.0.5 (2018-05-16)

* Restore functionality due to recent GitHub layout changes. See [pull #45](https://github.com/Mottie/GitHub-userscripts/pull/45); thanks [@darkred](https://github.com/darkred)!
* Actively update swatch & preview label.

### Version 1.0.4 (2018-01-18)

* Update assets.

### Version 1.0.3 (2017-05-16)

* Change license to MIT.

### Version 1.0.2 (2017-03-25)

* Fix linting.

### Version 1.0.1 (2016-12-28)

* Clean up linting issues.
* Fix `renderCallback` to update the input color value.

### Version 1.0.0 (2016-09-16)

* Initial commit
