A userscript that replaces relative times with a static time formatted as you like it

* The userscript replaces all of GitHub's relative time text with a static date and time.
* Change the settings by opening the userscript menu and look for a "Set GitHub static time format" option.
* The date format is customizable using:
  * Date format using Moment.js' [display formating](https://momentjs.com/docs/#/displaying/format/).
  * Moment.js supported locales ([ref](http://momentjs.com/#multiple-locale-support)).
* Changes to the settings will automatically apply to all dates on the page.
* Closing the settings panel:
  * If the panel is closed using the <kbd>Esc</kbd> key, clicking outside the panel, or clicking the Cancel button, all changes will revert to use the settings prior to the panel opening.
  * Changes will only be saved after pressing the Save button.
* By default, the locale is set to `en` and date format is set to `LLL`.
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-static-time.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/29239-github-static-time) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Static_Time).

## Screenshot

![](https://cloud.githubusercontent.com/assets/136959/25360578/5a2a6626-290f-11e7-8743-2e8f2578f1f4.gif)

\* Note: the menu setting is "Set GitHub static time format"

## Change Log

### Version 1.0.7 (2019-02-16)

* Update GitHub icon.

### Version 1.0.5 & 1.0.6 (2019-01-28)

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

### Version 0.1.3 (2017-10-08)

* Update mutation script url.
* Fix linting issues.

### Version 0.1.2 (2017-06-10)

* Prevent JS error after browser back arrow.
* Add container update delay. Needed to allow rendering of repo file list.

### Version 0.1.1 (2017-05-16)

* Change license to MIT.
* Fix linting.

### Version 0.1.0 (2017-04-24)

* Initial commit
