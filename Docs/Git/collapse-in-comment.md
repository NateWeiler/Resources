A userscript that adds a header that can toggle long code and quote blocks in comments

* The block header:
  * Allows the toggling of the long code & quote block views.
  * Includes the code language based on the syntax highlighting class name; if highlighting is not applied, "Block" is used as the default name.
  * Includes the number of lines within the block.
  * Click the header to toggle the view of the content immediately below the header.
  * Use <kbd>Shift</kbd> + Click to toggle all the view of all blocks within the same issue comment.
  * Use <kbd>Shift</kbd> + (<kbd>Ctrl</kbd> or <kbd>&#x2318;</kbd>) + Click to toggle all blocks on the page.
* Can be used along with the [[GitHub-collapse-markdown]] userscript.
* Use the userscript addon to change these settings (see screenshot below):
  * **"Set GitHub Collapse in Comment Max Lines"** to the number of lines within a block needed to add a header (set to `10` by default).
  * **"Set GitHub Collapse in Comment Initial State"** to `expanded` to not have the blocks initially collapsed (`collapsed` by default).
  * After changing either option, make sure to reload the page (<kbd>Shift</kbd> + <kbd>F5</kbd>) to have the updated setting take effect.
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-collapse-in-comment.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/20973-github-collapse-in-comment) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Collapse_In_Comment).
* Or, you can install it as a browser addon. Check out [Octopatcher](https://github.com/Mottie/Octopatcher)!

## Screenshot

![](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/images/github-collapse-in-comment.gif)

## Change Log

### Version 1.0.20 (2019-02-16)

* Update GitHub icon.

### Version 1.0.19 (2019-01-28)

* Update mutation script.

### Version 1.0.18 (2018-10-05)

* Update mutation script.

### Version 1.0.17 (2018-08-13)

* Support Cmd + Shift + Click for Macs.

### Version 1.0.16 (2018-05-17)

* Update mutation script.

### Version 1.0.15 (2018-05-10)

* Update mutation script.

### Version 1.0.14 (2018-04-09)

* Update mutation script url.

### Version 1.0.13 (2018-01-18)

* Extract syntax type from class name.
* Update assets.

### Version 1.0.12 (2017-10-08)

* Update mutation script url.

### Version 1.0.11 (2017-05-16)

* Change license to MIT.

### Version 1.0.10 (2017-04-21)

* Update mutation url.

### Version 1.0.7 - 1.0.9 (2017-04-13)

* Switch to using mutations.js.

### Version 1.0.6 (2017-03-25)

* Use pjax & preview events.

### Version 1.0.5 (2017-01-11)

* Clean up "closest" function.
* Use `classList` toggle.

### Version 1.0.4 (2016-10-03)

* Show current state when changing option. See [issue #12](https://github.com/Mottie/GitHub-userscripts/issues/12).

### Version 1.0.3 (2016-10-02)

* Change initial state choices to "collapsed" or "expanded". See [issue #12](https://github.com/Mottie/GitHub-userscripts/issues/12).

### Version 1.0.2 (2016-09-12)

* Beautify.

### Version 1.0.1 (2016-07-30)

* Improve accessibility of header.
* Fix squished collapsed arrow.

### Version 1.0.0 (2016-06-27)

* Initial commit.
