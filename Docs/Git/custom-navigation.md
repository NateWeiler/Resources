A userscript that allows you to customize GitHub's main navigation bar

* The navigation bars that can be customized separately with this userscript include:
  * GitHub's main navigation bar found on the feed, user, organization and all repository pages.
  * GitHub's gist subdomain.
  * Works great along with the [GitHub-FixedHeader userstyle](https://github.com/StylishThemes/GitHub-FixedHeader) installed.
* Open the custom navigation settings panel to allow moving of links into or out of the navigation bar by dragging and dropping the links.
* Add new custom links as desired.
* JSON code can be copied from or pasted into this userscript settings panel to make it easy to transfer your custom navigation bar to and from other computers.
* By default, only the icons are shown in the main navigation bar, but text can be included.
* <del>The search bar will shrink to a minimum of 200 pixels to allow as many links as possible in the main navigation bar. Beyond that, the right-side menu (notifications, new dropdown and avatar dropdown) will shift down</del>.
* GitHub specific pages (about, blog, business, explore, open-source, personal, and subdomains like `help.github.com`) use a different header navigation layout, and are not currently modified by this userscript.
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-custom-navigation.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/20830-github-custom-navigation) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Custom_Navigation).

## Screenshots

GitHub - Before
![github-custom-navigation-before](https://cloud.githubusercontent.com/assets/136959/16217347/3fab54c8-3738-11e6-8b6e-cbf0a360ddd2.png)

GitHub - After
![github-custom-navigation-after](https://cloud.githubusercontent.com/assets/136959/16217335/1aaa6970-3738-11e6-9791-4e1c1f61f8d3.png)

Gist - Before
![github-custom-navigation-gist-before](https://cloud.githubusercontent.com/assets/136959/16217823/bc1a3390-373c-11e6-98d8-130ce78ee448.png)

Gist - After
![github-custom-navigation-gist-after](https://cloud.githubusercontent.com/assets/136959/16217822/bc0b27f6-373c-11e6-861c-33dedd68a0c2.png)

## Setup

### Open the settings panel

* Click on the custom navigation settings icon (![github-custom-navigation-settings-icon](https://cloud.githubusercontent.com/assets/136959/16215002/ad0c598c-3723-11e6-8475-0bd0b0100f1e.png)) which is added to the header by default.
*  Or, open the settings panel by clicking on your avatar and selecting "Custom Nav Settings"

    ![github-custom-navigation-menu](https://cloud.githubusercontent.com/assets/136959/16254231/56bba7fa-3803-11e6-881d-6fb5137133df.png)


* Add a hash (`#github-custom-nav-settings`) to the window location to open the panel: [click here](#github-custom-nav-settings).

### Close the panel

* Click the (`x`) button in the settings panel header.
* Click outside the settings panel or main navigation bar.
* Press the <kbd>Esc</kbd> (escape) key at any time.

## Usage

* Drag and drop the link blocks between GitHub's main navigation bar and the custom navigation settings panel link block

![github-custom-navigation-usage](https://cloud.githubusercontent.com/assets/136959/16253396/eac0039a-37fb-11e6-8200-5e727915297c.gif)

* Most "popular" GitHub pages are included as default links in this userscript.
* Add as many custom links as you want, but remember you are limited in the number of links that can be added to the main navigation. Add too many and the right menu will get pushed down.
* If you feel like a default link is missing, then please [open an issue](https://github.com/Mottie/GitHub-userscripts/issues) to let me know.
* **Note** The "ZenHub ToDo" link is only useful if you are using the [ZenHub](https://www.zenhub.com/) extension/addon in your browser. It is left in as a default link for this userscript as an example.

## Settings

### Panel Elements

![github-custom-header-menu](https://cloud.githubusercontent.com/assets/136959/16275320/2585d3e2-386f-11e6-91bc-ccfbee1af4d3.png)

#### Header

* The code (`{}`) button
  * Toggles the view of a textarea containing the JSON code equivalent of the current settings.
  * Copy the JSON from or paste JSON into this textarea to transfer your customizations to and from other computers.
  * See the [JSON block](#json-block) section below for details about the JSON itself.
* The close (`x`) button will close the settings panel and restore the original scroll position of the page.

#### Link Block

* Available links will be shown immediately below the header.
* Click and release to select the link and reveal its properties in the properties block.
* Click and hold the mouse to drag, then drop the links up into GitHub's header navigation.
* Links within the GitHub header can in turn be clicked and dragged back into the link block.
* With the exception of the separator "link", there can only be one link on the page at a time, i.e. links can either be in GitHub's main navigation bar, or in the settings panel link block, not both.
* Multiple separator "links" can be added to GitHub's main navigation bar. When the settings panel is closed, the separator becomes a 2 pixel wide border.

#### Properties block

* When a link is selected, the URL, tooltip, hotkey and content inputs are updated with the link properties.
* Edit the properties to change the behavior or appearance of the link.

##### URL

* Enter the *full* URL of the desired page; otherwise the links would not be useful when used on a gist page.
* Or, enter a hash (e.g. `#readme`) to target a specific anchor on the page.
* The custom navigation settings panel is opened by adding a hash of `#github-custom-nav-settings`; this hash is immediately removed after the panel opens to prevent issues with the hash `#` itself being removed on page reload.
* A placeholder `${me}` can be added within the URL.
  * The placeholder is automatically replaced with the currently logged in user.
  * It is used in the url for the profile (`https://github.com/${me}`) and gist stars (`https://gist.github.com/${me}/starred`) links.

##### Tooltip

* Enter any text to be displayed in a tooltip when hovering over a link.
* Any HTML will show up as plain text. It will not be rendered.
* Add a `&#10;` or `&#xA;` in the tooltip to force a carriage return.

##### Hotkey

* **A hotkey is a keyboard key or sequence of keys that when pressed will apply the associated URL**.
* The hotkey method is native to GitHub, so **please read this entire block to learn about the quirks**.
* Only a sequence of hotkeys will work in GitHub's hotkey module; e.g. `g g` means that the `g` key is pressed &amp; released, then the `g` key is pressed &amp; released again.
* More than two hotkeys in the sequence is also valid; e.g. `"g 1 2"`.
* Hotkey combinations (e.g. `ctrl+q`) *can not* be used.
* **Note:** Hot key combinations, the way GitHub has it set up works as follows... when you include a modifier key like <kbd>shift</kbd>, the modifier key is first pressed *then* released, followed by the pressing and releasing of the next key.

  That being said, this method does not appear to work for the <kbd>alt</kbd> key in Windows because pressing that key once takes focus away from the browser window and applies it to the browser menu. Pressing it a second time will return focus to the window, but then this appears to break the hotkey sequence.

  Your results may vary.

* Key or key sequence:
  * From looking at the GitHub source, it appears the following keys are permitted to be used as a hotkey:
    <kbd>backspace</kbd>, <kbd>tab</kbd>, <kbd>enter</kbd>, <kbd>shift</kbd>, <kbd>ctrl</kbd>, <kbd>alt</kbd>, <kbd>pause</kbd>, <kbd>capslock</kbd>, <kbd>esc</kbd>, <kbd>space</kbd>, <kbd>pageup</kbd>, <kbd>pagedown</kbd>, <kbd>end</kbd>, <kbd>home</kbd>, <kbd>left</kbd>, <kbd>up</kbd>, <kbd>right</kbd>, <kbd>down</kbd>, <kbd>insert</kbd>, <kbd>del</kbd>, <kbd>0</kbd>, <kbd>1</kbd>, <kbd>2</kbd>, <kbd>3</kbd>, <kbd>4</kbd>, <kbd>5</kbd>, <kbd>6</kbd>, <kbd>7</kbd>, <kbd>8</kbd>, <kbd>9</kbd>, <kbd>a</kbd>, <kbd>b</kbd>, <kbd>c</kbd>, <kbd>d</kbd>, <kbd>e</kbd>, <kbd>f</kbd>, <kbd>g</kbd>, <kbd>h</kbd>, <kbd>i</kbd>, <kbd>j</kbd>, <kbd>k</kbd>, <kbd>l</kbd>, <kbd>m</kbd>, <kbd>n</kbd>, <kbd>o</kbd>, <kbd>p</kbd>, <kbd>q</kbd>, <kbd>r</kbd>, <kbd>s</kbd>, <kbd>t</kbd>, <kbd>u</kbd>, <kbd>v</kbd>, <kbd>w</kbd>, <kbd>x</kbd>, <kbd>y</kbd>, <kbd>z</kbd>, <kbd>meta</kbd>, <kbd>0</kbd>, <kbd>1</kbd>, <kbd>2</kbd>, <kbd>3</kbd>, <kbd>4</kbd>, <kbd>5</kbd>, <kbd>6</kbd>, <kbd>7</kbd>, <kbd>8</kbd>, <kbd>9</kbd>, <kbd>*</kbd>, <kbd>+</kbd>, <kbd>-</kbd>, <kbd>.</kbd>, <kbd>/</kbd>, <kbd>f1</kbd>, <kbd>f2</kbd>, <kbd>f3</kbd>, <kbd>f4</kbd>, <kbd>f5</kbd>, <kbd>f6</kbd>, <kbd>f7</kbd>, <kbd>f8</kbd>, <kbd>f9</kbd>, <kbd>f10</kbd>, <kbd>f11</kbd>, <kbd>f12</kbd>, <kbd>numlock</kbd>, <kbd>scroll</kbd>, <kbd>=</kbd>, <kbd>,</kbd>, <kbd>-</kbd>, <kbd>.</kbd>, <kbd>/</kbd>, <kbd>`</kbd>, <kbd>[</kbd>, <kbd>&#92;</kbd>, <kbd>]</kbd>, <kbd>'</kbd>
* Modifiable keys:
  * These keys can be added (as a sequence, not a combo) after an <kbd>alt</kbd>, <kbd>ctrl</kbd>, <kbd>meta</kbd> or <kbd>shift</kbd> key.
    <kbd>)</kbd>, <kbd>!</kbd>, <kbd>@</kbd>, <kbd>#</kbd>, <kbd>$</kbd>, <kbd>%</kbd>, <kbd>^</kbd>, <kbd>&</kbd>, <kbd>*</kbd>, <kbd>(</kbd>, <kbd>A</kbd>, <kbd>B</kbd>, <kbd>C</kbd>, <kbd>D</kbd>, <kbd>E</kbd>, <kbd>F</kbd>, <kbd>G</kbd>, <kbd>H</kbd>, <kbd>I</kbd>, <kbd>J</kbd>, <kbd>K</kbd>, <kbd>L</kbd>, <kbd>M</kbd>, <kbd>N</kbd>, <kbd>O</kbd>, <kbd>P</kbd>, <kbd>Q</kbd>, <kbd>R</kbd>, <kbd>S</kbd>, <kbd>T</kbd>, <kbd>U</kbd>, <kbd>V</kbd>, <kbd>W</kbd>, <kbd>X</kbd>, <kbd>Y</kbd>, <kbd>Z</kbd>, <kbd>:</kbd>, <kbd>+</kbd>, <kbd><</kbd>, <kbd>_</kbd>, <kbd>></kbd>, <kbd>?</kbd>, <kbd>~</kbd>, <kbd>{</kbd>, <kbd>|</kbd>, <kbd>}</kbd>, <kbd>&quot;</kbd>

##### Content

* Enter the content to be added inside the link.
  * Content can include text (e.g. "Home").
  * And/or HTML (e.g. `<img>` or `<svg>`, etc)
* When adding an SVG, the `class="octicon"` is not required; the script adds the class automatically. It is needed to maintain alignment.
* Images and SVG will only be limited in height; a max height of 16 pixels is enforced.
* To use GitHub Octicons:
  * View the [full list here](https://octicons.github.com/); remember the name.
  * Find and download the octicon [from here](https://github.com/primer/octicons/tree/master/lib/svg).
  * Optimize the SVG using [SVGOMG](https://jakearchibald.github.io/svgomg/).
  * Open the Optimized SVG in a text editor and copy & paste the content into the input.
* When adding an `<img>`:
  * First enter `<img src="">` into the content input.
  * To add a link to the image:
    * GitHub has a content security policy preventing you from linking to outside sources, so upload the image into a GitHub comment.
    * Copy the URL from inside the parenthesis (e.g. `![](https://cloud.githubusercontent.com/assets/...)`).
    * Then paste it into the `src` attribute.
    * Example: `<img src="https://cloud.githubusercontent.com/assets/...">`.
  * Alternatively, you can add a data URI, if the file isn't too big/complex:
    * Go to https://www.base64-image.de/
    * Use the "Image Optimization" selector and enable optimization.
    * Drag your JPG, PNG, GIF or BMP file into the target.
    * Once the progress bar has filled, click on the "copy image" button to copy the data URL to your clipboard.
    * Now paste the data URI into the `src` attribute in the input.
    * Example: `<img src="data:image/png;base64,...">`.

#### JSON block

* Clicking the code button (`{}`) in the settings panel header will toggle the view of a textarea that contains the current custom navigation settings in JSON format.

    ![github-custom-navigation-json-code](https://cloud.githubusercontent.com/assets/136959/16254366/c67659b8-3804-11e6-8846-6ff61bc87420.png)

* Copy this JSON to other computers to transfer your desired settings quickly and easily.
* Note: changes to the JSON will only be applied
  * If the JSON is valid. You can [check it here](http://jsonlint.com/).
  * Immediately after content is pasted into the textarea (<kbd>Ctrl</kbd> or <kbd title="Command">&#8984;</kbd> + <kbd>v</kbd>).
  * If you want to edit the JSON instead of using the main settings panel, then edit, select all (<kbd>Ctrl</kbd> or <kbd title="Command">&#8984;</kbd> + <kbd>a</kbd>), copy (<kbd>Ctrl</kbd> or <kbd title="Command">&#8984;</kbd> + <kbd>c</kbd>) and then repaste the JSON into the textarea.
  * If the JSON is invalid or missing required definitions, you'll see an error message in the console (Press <kbd>F12</kbd> to open it).
* JSON object parts:
  * `"github"` (**required**, even if it is only an empty array) is an array containing the selected links (in order) to be displays on github pages.
  * `"gists"` (**required**, even if it is only an empty array) is an array containing the selected links (in order) to be displayed in the gist subdomain.
  * `"currentLink"` (optional) points to the currently selected link which is displaying its parameters in the settings panel. This value is dynamically changed whenever a new link is checked.
  * `"items"` (**required**, even if it is only an empty object) is an object containing each link's parameters. The key used is arbitrary, but when a new custom link is added via the custom navigation settings panel, the key always starts with "custom" followed by an index. Feel free to rename these, but keep all the names unique!

  Here are the default settings. This is the JSON seen when the content is reset.

  <details>
  <summary>defaults</summary>

  <!-- leave a blank line above -->
  ```js
  {
    "github": [
      "pr",
      "issues",
      "gist",
      "separator",
      "stars",
      "watching",
      "separator",
      "profile",
      "blog",
      "menu"
    ],
    "gists": [
      "gistall",
      "giststars",
      "github",
      "separator",
      "pr",
      "issues",
      "stars",
      "watching",
      "separator",
      "profile",
      "blog",
      "menu"
    ],
    "currentLink": "pr",
    "items": {
      "blog": {
        "url": "https://github.blog",
        "tooltip": "Blog",
        "hotkey": "",
        "content": "<svg class='octicon' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' height='16' viewBox='0 0 16 16' width='16'><path d='M9 9H8c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1H6c-.55 0-1 .45-1 1v2h1v3c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-3h1v-2c0-.55-.45-1-1-1zM7 7h1v1H7V7zm2 4H8v4H7v-4H6v-1h3v1zm2.09-3.5c0-1.98-1.61-3.59-3.59-3.59A3.593 3.593 0 0 0 4 8.31v1.98c-.61-.77-1-1.73-1-2.8 0-2.48 2.02-4.5 4.5-4.5S12 5.01 12 7.49c0 1.06-.39 2.03-1 2.8V8.31c.06-.27.09-.53.09-.81zm3.91 0c0 2.88-1.63 5.38-4 6.63v-1.05a6.553 6.553 0 0 0 3.09-5.58A6.59 6.59 0 0 0 7.5.91 6.59 6.59 0 0 0 .91 7.5c0 2.36 1.23 4.42 3.09 5.58v1.05A7.497 7.497 0 0 1 7.5 0C11.64 0 15 3.36 15 7.5z'/></svg>"
      },
      "explore": {
        "url": "https://github.com/explore",
        "tooltip": "Explore",
        "hotkey": "",
        "content": "<svg class='octicon' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' height='16' viewBox='0 0 16 16' width='16'><path d='M10 1c-.17 0-.36.05-.52.14C8.04 2.02 4.5 4.58 3 5c-1.38 0-3 .67-3 2.5S1.63 10 3 10c.3.08.64.23 1 .41V15h2v-3.45c1.34.86 2.69 1.83 3.48 2.31.16.09.34.14.52.14.52 0 1-.42 1-1V2c0-.58-.48-1-1-1zm0 12c-.38-.23-.89-.58-1.5-1-.16-.11-.33-.22-.5-.34V3.31c.16-.11.31-.2.47-.31.61-.41 1.16-.77 1.53-1v11zm2-6h4v1h-4V7zm0 2l4 2v1l-4-2V9zm4-6v1l-4 2V5l4-2z'></path></svg>"
      },
      "gist": {
        "url": "https://gist.github.com/",
        "tooltip": "Gist",
        "hotkey": "",
        "content": "<svg class='octicon' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' height='16' viewBox='0 0 12 16' width='12'><path d='M7.5 5L10 7.5 7.5 10l-.75-.75L8.5 7.5 6.75 5.75 7.5 5zm-3 0L2 7.5 4.5 10l.75-.75L3.5 7.5l1.75-1.75L4.5 5zM0 13V2c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v11c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1zm1 0h10V2H1v11z'></path></svg>"
      },
      "gistall": {
        "url": "https://gist.github.com/discover",
        "tooltip": "Discover Gists",
        "hotkey": "",
        "content": "<svg class='octicon' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' height='16' viewBox='0 0 12 16' width='12'><path d='M7.5 5L10 7.5 7.5 10l-.75-.75L8.5 7.5 6.75 5.75 7.5 5zm-3 0L2 7.5 4.5 10l.75-.75L3.5 7.5l1.75-1.75L4.5 5zM0 13V2c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v11c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1zm1 0h10V2H1v11z'></path></svg>"
      },
      "giststars": {
        "url": "https://gist.github.com/${me}/starred",
        "tooltip": "Starred Gists",
        "hotkey": "",
        "content": "<svg class='octicon' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' height='16' viewBox='0 0 14 16' width='14'><path d='M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z'></path></svg>"
      },
      "github": {
        "url": "https://github.com",
        "tooltip": "GitHub",
        "hotkey": "",
        "content": "<svg class='octicon' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' height='16' viewBox='0 0 16 16' width='16'><path d='M14.7 5.34c.13-.32.55-1.59-.13-3.31 0 0-1.05-.33-3.44 1.3-1-.28-2.07-.32-3.13-.32s-2.13.04-3.13.32c-2.39-1.64-3.44-1.3-3.44-1.3-.68 1.72-.26 2.99-.13 3.31C.49 6.21 0 7.33 0 8.69 0 13.84 3.33 15 7.98 15S16 13.84 16 8.69c0-1.36-.49-2.48-1.3-3.35zM8 14.02c-3.3 0-5.98-.15-5.98-3.35 0-.76.38-1.48 1.02-2.07 1.07-.98 2.9-.46 4.96-.46 2.07 0 3.88-.52 4.96.46.65.59 1.02 1.3 1.02 2.07 0 3.19-2.68 3.35-5.98 3.35zM5.49 9.01c-.66 0-1.2.8-1.2 1.78s.54 1.79 1.2 1.79c.66 0 1.2-.8 1.2-1.79s-.54-1.78-1.2-1.78zm5.02 0c-.66 0-1.2.79-1.2 1.78s.54 1.79 1.2 1.79c.66 0 1.2-.8 1.2-1.79s-.53-1.78-1.2-1.78z'/></svg>"
      },
      "integrations": {
        "url": "https://github.com/integrations",
        "tooltip": "Integrations",
        "hotkey": "",
        "content": "<svg class='octicon' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' height='16' viewBox='0 0 14 16' width='14'><path d='M3 6c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h8c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1H3zm8 1.75L9.75 9h-1.5L7 7.75 5.75 9h-1.5L3 7.75V7h.75L5 8.25 6.25 7h1.5L9 8.25 10.25 7H11v.75zM5 11h4v1H5v-1zm2-9C3.14 2 0 4.91 0 8.5V13c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V8.5C14 4.91 10.86 2 7 2zm6 11H1V8.5c0-3.09 2.64-5.59 6-5.59s6 2.5 6 5.59V13z'></path></svg>"
      },
      "issues": {
        "url": "https://github.com/issues",
        "tooltip": "Issues",
        "hotkey": "g i",
        "content": "<svg class='octicon' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' height='16' viewBox='0 0 14 16' width='14'><path d='M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z'></path></svg>"
      },
      "menu": {
        "url": "#github-custom-nav-settings",
        "tooltip": "Open Custom Navigation Settings",
        "hotkey": "",
        "content": "<svg class='octicon' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' height='16' viewBox='0 0 14 16' width='14'><path d='M8.79 15H6.553l-.7-1.91-.608-.247-1.835.905-1.585-1.556.892-1.83-.25-.595L.5 9.127V6.933l1.944-.676.25-.597-.922-1.802L3.358 2.3l1.865.876.624-.248.638-1.93H8.73l.697 1.91.61.246 1.838-.905 1.58 1.555-1.114 2.317-2.714.65-.203-.24c-.444-.524-1.098-.824-1.794-.824C6.34 5.708 5.294 6.736 5.294 8c0 1.264 1.047 2.292 2.334 2.292.6 0 1.17-.224 1.604-.63l.18-.165 2.93.4 1.156 2.24-1.58 1.564-1.868-.88-.625.25L8.79 15zm-1.52-1h.78l.556-1.68 1.48-.592 1.62.765.553-.547-.583-1.13-1.93-.264c-.597.48-1.34.74-2.118.74-1.85 0-3.354-1.477-3.354-3.292 0-1.815 1.503-3.292 3.353-3.292.89 0 1.73.342 2.356.95l1.643-.394.6-1.25-.555-.546-1.598.786-1.455-.592L8.014 2h-.79L6.67 3.68l-1.48.59-1.622-.762-.556.546.802 1.566-.603 1.432-1.692.59v.763l1.71.558.603 1.43-.775 1.593.556.546 1.596-.788 1.456.593L7.27 14z'/></svg>"
      },
      "pr": {
        "url": "https://github.com/pulls",
        "tooltip": "Pull Requests",
        "hotkey": "g p",
        "content": "<svg class='octicon' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' height='16' viewBox='0 0 12 16' width='12'><path d='M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z'></path></svg>"
      },
      "profile": {
        "url": "https://github.com/${me}",
        "tooltip": "Profile",
        "hotkey": "",
        "content": "<svg class='octicon' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' height='16' viewBox='0 0 8 16' width='8'><path d='M7 6H1c-.55 0-1 .45-1 1v5h2v3c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-3h2V7c0-.55-.45-1-1-1zm0 5H6V9H5v6H3V9H2v2H1V7h6v4zm0-8c0-1.66-1.34-3-3-3S1 1.34 1 3s1.34 3 3 3 3-1.34 3-3zM4 5c-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2 0 1.11-.89 2-2 2z' fill-rule='evenodd'/></svg>"
      },
      "settings": {
        "url": "https://github.com/settings/profile",
        "tooltip": "Settings",
        "hotkey": "",
        "content": "<svg class='octicon' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' height='16' viewBox='0 0 14 16' width='14'><path d='M14 8.77v-1.6l-1.94-.64-.45-1.09.88-1.84-1.13-1.13-1.81.91-1.09-.45-.69-1.92h-1.6l-.63 1.94-1.11.45-1.84-.88-1.13 1.13.91 1.81-.45 1.09L0 7.23v1.59l1.94.64.45 1.09-.88 1.84 1.13 1.13 1.81-.91 1.09.45.69 1.92h1.59l.63-1.94 1.11-.45 1.84.88 1.13-1.13-.92-1.81.47-1.09L14 8.75v.02zM7 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z'></path></svg>"
      },
      "stars": {
        "url": "https://github.com/stars",
        "tooltip": "Stars",
        "hotkey": "",
        "content": "<svg class='octicon' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' height='16' viewBox='0 0 14 16' width='14'><path d='M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z'></path></svg>"
      },
      "trending": {
        "url": "https://github.com/trending",
        "tooltip": "Trending",
        "hotkey": "",
        "content": "<svg class='octicon' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' height='16' viewBox='0 0 12 16' width='12'><path d='M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z'></path></svg>"
      },
      "watching": {
        "url": "https://github.com/watching",
        "tooltip": "Watching",
        "hotkey": "",
        "content": "<svg class='octicon' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' height='16' viewBox='0 0 16 16' width='16'><path d='M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z'></path></svg>"
      },
      "zenhub": {
        "url": "#todo",
        "tooltip": "ZenHub ToDo",
        "hotkey": "",
        "content": "<svg class='octicon' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' height='16' viewBox='0 0 50 50' width='16'><path d='M29.17 45.988L13.82 21.218h10.56l-1.1-17.206 13.498 24.77h-9.514'/></svg>"
      }
    }
  }
  ```
</details>

### Footer

#### New Link

* Using this button will add a new link inside the link block and select it.
* Initially, the url, tooltip and hotkey properties will be empty.
* The content property is set with a placeholder (an asterisk) by default.
* Within the JSON, new links will have a key name of "custom" plus an index to keep the names unique.

#### Destroy

* Using this button will completely remove the selected link from GitHub's main navigation *and* the link block.
* This button effectively removes the link from the list.
* The removed link can not be restored.
* Note: To move a link between GitHub's main navigation and the setting panel link block, drag-and-drop the link.

#### Reset

* Using this button will restore the default configuration.
* All custom settings & added links will be removed. They can not be restored unless you saved a copy of the JSON code.
* GitHub's main navigation will be returned to the its initial state.

#### Restore

* Using this button will restore any missing entries from the default configuration.
* Modified entries will not be changed.
* This is useful if the userscript has been modified to include new entries. Outdated entries will not be removed unless you use the "Reset" button.

## Change Log

### Version 1.1.9 (2020-05-10)

* Fix navigation bar height. Closes [issue #110](https://github.com/Mottie/GitHub-userscripts/issues/110).

### Version 1.1.8 (2019-06-02)

* Use new GitHub classes.

### Version 1.1.7 (2019-04-06)

* Update header menu selector & layout.

### Version 1.1.6 (2019-03-29)

* Update header selector.

### Version 1.1.5 (2019-02-16)

* Update GitHub icon.

### Version 1.1.4 (2019-01-30)

* Updated the Blog site URL.

### Version 1.1.3 (2018-11-22)

* Target new header.

### Version 1.1.2 (2018-07-24)

* Adjust JSON button tooltip direction. This is an issue when [GitHub fixed header](https://github.com/StylishThemes/GitHub-FixedHeader) is active.

### Version 1.1.1 (2018-05-27)

* Update marketplace icon (removed the clock).

### Version 1.1.0 (2018-02-11)

* Tweak explore & marketplace icons.
* Add restore links method & code cleanup.

### Version 1.0.19 (2018-02-10)

* Add 'Marketplace' and 'Explore' to the defaults; See [pull #37](https://github.com/Mottie/GitHub-userscripts/pull/37).

### Version 1.0.18 (2018-01-18)

* Update assets.

### Version 1.0.17 (2017-10-03)

* Fix linting issue.

### Version 1.0.16 (2017-10-01)

* Set link minimum width.

### Version 1.0.15 (2017-08-22)

* Update to use new header classes.

### Version 1.0.14 (2017-07-21)

* Remove input width adjustment.

### Version 1.0.13 (2017-07-20)

* Use new GitHub classnames.

### Version 1.0.12 (2017-06-24)

* Minor cleanup.
* Prevent JS error on 404 page.

### Version 1.0.11 (2017-05-16)

* Change license to MIT.

### Version 1.0.10 (2017-04-13)

* Update dragula to v3.7.2.

### Version 1.0.9 (2017-03-31)

* Fix setting's panel dark header icons.
* Add advanced search default item.

### Version 1.0.8 (2017-03-25)

* Fix linting.

### Version 1.0.7 (2016-12-28)

* Clean up linting issues.

### Version 1.0.6 (2016-09-16)

* Use new GitHub class names.
* Change to leading tabs.

### Version 1.0.5 (2016-09-12)

* Update for new header styling. See [issue #4](https://github.com/Mottie/GitHub-userscripts/issues/4).

### Version 1.0.4 (2016-08-10)

* Set overflow visible. See [issue #4](https://github.com/Mottie/GitHub-userscripts/issues/4).

### Version 1.0.3 (2016-07-21)

* Fix css to limit image & svg size.

### Version 1.0.2 (2016-06-25)

* Fix behavior on wiki pages (especially this documentation page).

### Version 1.0.1 (2016-06-24)

* Fix overly tall inputs.

### Version 1.0.0 (2016-06-22)

* Initial commit.
