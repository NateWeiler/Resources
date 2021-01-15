A userscript that adds a color swatch next to the code color definition

* It works in comment previews and code pages.
* Supports hex, rgb, rgba, hsl, hsla and all named colors.
* Additional support for colors set inside strings (e.g. javascript or canvas).
* It does not interfere if you copy & paste the code.
* In v2+:
  * You can use <kbd>Tab</kbd> to navigate between swatches.
  * Pressing <kbd>Space</kbd> and <kbd>Enter</kbd> will toggle the popup (when focused).
  * Pressing <kbd>Esc</kbd> will close *all* popups.
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-code-colors.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/18141-github-code-colors) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Code_Colors).

## Screenshot

![github-code-color](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/images/github-code-colors.gif)

## Examples

Test these examples once the userscript is installed

* [colors](https://github.com/Mottie/color-bundle/blob/master/color.js)
* [brand-colors](https://github.com/reimertz/brand-colors/blob/master/data/brandColors.json)

### CSS

```css
.style {
  background: #123456;
  color: rgb( 255,128,64);
  border-left: 1px hsla(65, 100%, 50%, 1) solid;
  border-right-color: maroon;
  box-shadow: 3px 3px hsl( 128, 30%, 50% );
  text-shadow: 2px 5px rgba(255, 0,  183,0.5);
}
```

### Javascript (Canvas)

```js
// code slightly modified from the source:
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#A_globalAlpha_example
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  // draw background
  ctx.fillStyle = 'gold';
  ctx.fillRect(0,0,75,75);
  ctx.fillStyle = '#6C0';
  ctx.fillRect(75,0,75,75);
  ctx.fillStyle = '#09F';
  ctx.fillRect(0,75,75,75);
  ctx.fillStyle = 'hsl(12, 100%, 50%)';
  ctx.fillRect(75,75,75,75);
  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  // set transparency value
  ctx.globalAlpha = 0.2;

  // Draw semi transparent circles
  for (i=0;i<7;i++){
    ctx.beginPath();
    ctx.arc(75,75,10+10*i,0,Math.PI*2,true);
    ctx.fill();
  }
}
draw();
```

## Change Log

### Version 2.0.4 (2019-07-31)

* Add copy to clipboard buttons to popup.
* Fix linting issue.

### Version 2.0.3 (2019-07-25)

* Fix horizontal overflow. Closes [issue #96](https://github.com/Mottie/GitHub-userscripts/issues/96).

### Version 2.0.2 (2019-07-24)

* Fix text selection in popup. See [issue #95](https://github.com/Mottie/GitHub-userscripts/issues/95).

### Version 2.0.1 (2019-07-23)

* Fix issue comment submit.

### Version 2.0.0 (2019-07-23)

* Clicking on the color swatch will now open a popup showing the same color in different formats:
  * Associated named color (if any)
  * Hex format
  * RGB and RGBA (if alpha < 1) formats
  * HSL and HSLA (if alpha < 1) formats
  * HWB format
  * CMYK format
* The swatches can be opened by clicking or through tab navigation and pressing <kbd>Space</kbd> or <kbd>Enter</kbd>
* Close all swatches by pressing <kbd>Esc</kbd>
* And it works in any markdown comment preview
* Completes [issue #95](https://github.com/Mottie/GitHub-userscripts/issues/95) request

### Version 1.2.5 (2019-02-16)

* Update GitHub icon.

### Version 1.2.4 (2019-01-28)

* Update mutation script.

### Version 1.2.3 (2018-10-05)

* Update mutation script.

### Version 1.2.2 (2018-08-13)

* Prevent adding a swatch to JS `Math.tan`.

### Version 1.2.1 (2018-07-31)

* Fix JS error. Only seen when used with a certain chrome extension.

### Version 1.2.0 (2018-07-16)

* Speed up DOM interaction.
* Code cleanup & start using `requestAnimationFrame` with a generator.

### Version 1.1.16 (2018-05-17)

* Update mutation script.

### Version 1.1.15 (2018-05-10)

* Update mutation script.

### Version 1.1.14 (2018-04-09)

* Update mutation script url.

### Version 1.1.13 (2018-01-30)

* Update GM4 polyfill.

### Version 1.1.12 (2017-12-14)

* Add GM4 polyfill & update assets.

### Version 1.1.11 (2017-11-23)

* Ignore nested color blocks

### Version 1.1.10 (2017-10-08)

* Update mutation script url.

### Version 1.1.9 (2017-09-22)

* Prevent JS error on invalid css colors.

### Version 1.1.8 (2017-05-16)

* Change license to MIT.

### Version 1.1.7 (2017-04-21)

* Update mutation url.

### Version 1.1.4 &ndash; 1.1.6 (2017-04-13)

* Switch to using mutations.js.

### Version 1.1.3 (2017-04-05)

* Rgb(a) colors show again.
* Support [hex with alpha channel](http://caniuse.com/#feat=css-rrggbbaa).

### Version 1.1.2 (2017-03-29)

* Fix misspelled color name.

### Version 1.1.1 (2017-03-25)

* Use pjax & preview events.

### Version 1.1.0 (2016-09-12)

* Add "grey" color names.
* Beautified.

### Version 1.0.2 (2016-08-20)

* General cleanup & update to es6.

### Version 1.0.1 (2016-03-25)

* Support unix style hex colors (e.g. `0x9988aa`).
* Support colors inside strings.
* Cache regex in loop.

### Version 1.0.0 (2016-03-24)

* Moved code to [GitHub-userscripts](https://github.com/Mottie/GitHub-userscripts)

### Version 0.1.0 &ndash; 0.1.2 (2016-03-20)

* Initial commit.
* Add userscript meta data.
* Remove flag preventing updates after ajax load.
* Include named colors.
