A userscript that allows you to add custom GitHub keyboard hotkeys

* New in version 1.1.0: Added a checkbox to each hotkey, checking it will open the hotkey page in a new browser tab.
* Keyboard shortcuts are added using GitHub's "hotkey" method.
* A hotkey will not execute any code, it is set up to only be associated with a URL.
* Custom hotkeys in this userscript can be scoped to specific GitHub URLs so they only work on those pages.
* Adding a definition using this script *will* override GitHub's built-in hotkeys, so please be aware of this fact!
* It might be best to use a key sequence that GitHub doesn't already use (e.g. <kbd>g</kbd> <kbd>1</kbd>, <kbd>g</kbd> <kbd>2</kbd>, etc).
* JSON code can be copied from or pasted into this userscript settings panel to make it easy to transfer your hotkeys to and from other computers.
* Definitions set by this userscript are *not* added to GitHub's "Keyboard shortcuts" panel (opened by pressing <kbd>?</kbd>).
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-custom-hotkeys.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/18675-github-custom-hotkeys) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Custom_Hotkeys).

## Screenshot

<img src="https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/images/github-hotkeys-settings.png" width="400" />

## Setup

### Open the settings panel

* Open the settings panel by pressing "F1" (default setting). Feel free to change this hotkey as desired.
* Or, click on your avatar and select "GitHub Hotkey Settings".

   ![](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/images/github-hotkeys-menu.png)

### Panel Elements

<img src="https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/images/github-hotkeys-panel-elements.png" width="400" />

#### Header

* The help (`?`) button will open this wiki page.
* The code (`{}`) button will toggle the view of a textarea containing the JSON code equivalent of the current settings.
* The close (`x`) button will save the settings and close the panel.

#### Scope block

Each scope block contains:
* An editable label (except for the first block).
* A delete (`x`) button next to the label to completely remove that scope.
* A `+ Click to add a new hotkey` button which adds a new hotkey block.

Below the last scope block is a `+ Click to add a new scope` button to add a new scope block.

#### Hotkey block

Each hotkey block contains:
* A hotkey, URL input &amp; new tab checkbox.
* A delete (`x`) button to the right of the inputs will remove the hotkey block.

Below the last hotkey block is a `+ Click to add a new hotkey` button to add a new hotkey block.

### Add or edit a Scope

* **A scope is a grouping of hotkeys that will only be applied to a set URL**.
* The "All of GitHub..." scope applies to all GitHub pages and subdomains.
* A custom scope can be added to:
  * Target a specific page (e.g. `http://github.com/search`, or `{root}/search` using a placeholder).
  * Target a type of page (e.g. `{repo}/issue` will only apply to the issue pages of the current repository).
* To add a new scope, click on the `+ Click to add a new scope` button at the bottom of the settings panel.
* Click on the `Enter Scope` label to edit the scope.
* A scope with an invalid URL will silently fail &amp; any hotkeys within the scope will be ignored.
* Closing the settings panel will update all changes which will be immediately available for use.

### Add or edit a Hotkey

* **A hotkey is a keyboard key or sequence of keys that when pressed will apply the associated URL**.
* Hotkeys can only be added inside a defined scope.
* Hotkeys will not be active outside their scope.
* To add a hotkey, click on the `+ Click to add a new hotkey` button inside the desired scope.
* Two inputs will be added for every entry, because a hotkey is a combination of the a keyboard key (or sequence) and a URL.
* Enter any hotkey or sequence of hotkeys. Please review the [valid hotkeys](#valid-hotkeys) section below.
* Enter the target URL (full URL, URL using a placeholder, or hash) to be applied after the sequence has been completed (e.g. `{repo}/issues` - see the [valid hotkey URLs](#valid-hotkey-urls) section below.
* Closing the settings panel will update all changes which will be immediately available for use.

### Add or edit JSON

![](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/images/github-hotkeys-code.png)

* In the hotkey settings panel header is a code (`{}`) button which will toggle the view of a textarea that contains the current hotkey settings in JSON format.
* Copy this JSON to other computers to transfer your desired settings quickly and easily.
* Note: changes to the JSON will only be applied
  * If the JSON is valid
  * Immediately after content is pasted into the textarea (<kbd>ctrl</kbd> or <kbd>Command</kbd> <kbd>v</kbd>).
  * If you want to edit the JSON instead of using the main settings panel, then edit, select all, copy and then repaste the JSON into the textarea.

### Remove a scope

* To remove a scope, click the delete (`x`) button to the right of the scope label. The `x` will turn red when hovered.
* Any hotkeys within the scope will be removed &amp; can not be restored.

### Remove a hotkey

* To remove a hotkey block, click the delete (`x`) button to the right of the hotkey inputs. The `x` will turn red when hovered.
* Any values within the hotkey and url inputs will be remove &amp; can not be restored.

### Remove all hotkeys & scopes

* To remove all hotkey settings &amp; scopes, click on the code (`{}`) button to reveal the textarea.
* Enter `[]`.
* All hotkeys &amp; scopes will be removed from the panel.
* Any active hotkeys applied to the page will be removed once the settings panel is closed.

### Valid Hotkeys

* **Update**: Get more details from https://github.com/github/hotkey.
  * Multiple hotkeys are separated by a `,`.
  * Key combinations are separated by a `+`, e.g. `Control+q,Meta+q`
  * Key sequences are separated by a space; e.g. `g g` means that the `g` key is pressed &amp; released, then the `g` key is pressed &amp; released again.
* More than two hotkeys in the sequence is also valid; e.g. `"g 1 2"`.
* Hotkey combinations (e.g. `Control+q`) can be used. Modifier key names are named on their [`key` value](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values).

#### Key or key sequence

From looking at the source, it appears the following keys are permitted:

<kbd>backspace</kbd>, <kbd>tab</kbd>, <kbd>enter</kbd>, <kbd>shift</kbd>, <kbd>ctrl</kbd>, <kbd>alt</kbd>, <kbd>pause</kbd>, <kbd>capslock</kbd>, <kbd>esc</kbd>, <kbd>space</kbd>, <kbd>pageup</kbd>, <kbd>pagedown</kbd>, <kbd>end</kbd>, <kbd>home</kbd>, <kbd>left</kbd>, <kbd>up</kbd>, <kbd>right</kbd>, <kbd>down</kbd>, <kbd>insert</kbd>, <kbd>del</kbd>, <kbd>0</kbd>, <kbd>1</kbd>, <kbd>2</kbd>, <kbd>3</kbd>, <kbd>4</kbd>, <kbd>5</kbd>, <kbd>6</kbd>, <kbd>7</kbd>, <kbd>8</kbd>, <kbd>9</kbd>, <kbd>a</kbd>, <kbd>b</kbd>, <kbd>c</kbd>, <kbd>d</kbd>, <kbd>e</kbd>, <kbd>f</kbd>, <kbd>g</kbd>, <kbd>h</kbd>, <kbd>i</kbd>, <kbd>j</kbd>, <kbd>k</kbd>, <kbd>l</kbd>, <kbd>m</kbd>, <kbd>n</kbd>, <kbd>o</kbd>, <kbd>p</kbd>, <kbd>q</kbd>, <kbd>r</kbd>, <kbd>s</kbd>, <kbd>t</kbd>, <kbd>u</kbd>, <kbd>v</kbd>, <kbd>w</kbd>, <kbd>x</kbd>, <kbd>y</kbd>, <kbd>z</kbd>, <kbd>meta</kbd>, <kbd>0</kbd>, <kbd>1</kbd>, <kbd>2</kbd>, <kbd>3</kbd>, <kbd>4</kbd>, <kbd>5</kbd>, <kbd>6</kbd>, <kbd>7</kbd>, <kbd>8</kbd>, <kbd>9</kbd>, <kbd>*</kbd>, <kbd>+</kbd>, <kbd>-</kbd>, <kbd>.</kbd>, <kbd>/</kbd>, <kbd>f1</kbd>, <kbd>f2</kbd>, <kbd>f3</kbd>, <kbd>f4</kbd>, <kbd>f5</kbd>, <kbd>f6</kbd>, <kbd>f7</kbd>, <kbd>f8</kbd>, <kbd>f9</kbd>, <kbd>f10</kbd>, <kbd>f11</kbd>, <kbd>f12</kbd>, <kbd>numlock</kbd>, <kbd>scroll</kbd>, <kbd>=</kbd>, <kbd>,</kbd>, <kbd>-</kbd>, <kbd>.</kbd>, <kbd>/</kbd>, <kbd>`</kbd>, <kbd>[</kbd>, <kbd>&#92;</kbd>, <kbd>]</kbd>, <kbd>'</kbd>

#### Modifiable keys

These keys can be added (as a sequence, not a combo) after an <kbd>alt</kbd>, <kbd>ctrl</kbd>, <kbd>meta</kbd> or <kbd>shift</kbd> key.

<kbd>)</kbd>, <kbd>!</kbd>, <kbd>@</kbd>, <kbd>#</kbd>, <kbd>$</kbd>, <kbd>%</kbd>, <kbd>^</kbd>, <kbd>&</kbd>, <kbd>*</kbd>, <kbd>(</kbd>, <kbd>A</kbd>, <kbd>B</kbd>, <kbd>C</kbd>, <kbd>D</kbd>, <kbd>E</kbd>, <kbd>F</kbd>, <kbd>G</kbd>, <kbd>H</kbd>, <kbd>I</kbd>, <kbd>J</kbd>, <kbd>K</kbd>, <kbd>L</kbd>, <kbd>M</kbd>, <kbd>N</kbd>, <kbd>O</kbd>, <kbd>P</kbd>, <kbd>Q</kbd>, <kbd>R</kbd>, <kbd>S</kbd>, <kbd>T</kbd>, <kbd>U</kbd>, <kbd>V</kbd>, <kbd>W</kbd>, <kbd>X</kbd>, <kbd>Y</kbd>, <kbd>Z</kbd>, <kbd>:</kbd>, <kbd>+</kbd>, <kbd><</kbd>, <kbd>_</kbd>, <kbd>></kbd>, <kbd>?</kbd>, <kbd>~</kbd>, <kbd>{</kbd>, <kbd>|</kbd>, <kbd>}</kbd>, <kbd>&quot;</kbd>

**Note:**

**Ok, this is *really* weird**, but it is how GitHub set it up... when you use a modifier key like <kbd>shift</kbd>, the modifier key is first pressed *then* released, followed by the pressing and releasing of the next key.

That being said, this method does not appear to work for the <kbd>alt</kbd> key in Windows because pressing that key once takes focus away from the browser window. Pressing it a second time will return focus, but then this appears to break the hotkey sequence.

Your results may vary.

### Valid Hotkey URLs

The following placeholders can be used within the hotkey scope &amp; URL.

| Placeholder  | Description                                                                                |
|--------------|--------------------------------------------------------------------------------------------|
| `{root}`     | Always points to `https://github.com`                                                      |
| `{origin}`   | Points to the (sub)domain, e.g on any gist page it will be `https://gist.github.com`       |
| `{me}`       | Points to your user profile page. This uses your login name.                               |
| `{m}`        | Contains your user name.                                                                   |
| `{user}`     | Points to the current user profile page, e.g. `https://github.com/Mottie`                  |
| `{u}`        | Contains the current user name, e.g. `Mottie`                                              |
| `{repo}`     | Points to the current repo home page, e.g. `https://github.com/Mottie/GitHub-userscripts`  |
| `{r}`        | Contains the current repo name, e.g. `GitHub-userscripts`                                  |
| `{tab}`      | Points to the current repo tab, e.g. `https://github.com/Mottie/GitHub-userscripts/issues` |
| `{t}`        | Contains the current tab name, e.g. `issues`                                               |
| `{upstream}` | Points to the upstream repository only if the current repository is a fork.                |
| `{issue}`    | Contains the current issue number, if on an issue page.                                    |
| `{issue+#}` or `{issue-#}` | Gets replaces with the current issue number plus or minus a number.<br>Here are some examples:<ul><li>`{issue+1}` points to the current issue plus one</li><li>`{issue+10}` points to the current issue number plus ten.</li><li>`{issue-1}` points to the current issue minus one.</li></ul> |
| `{page+#}` or `{page-#}` | Gets replaces the page search parameter with the page plus or minus a number.<br>Here are some examples:<ul><li>`{page+1}` points to the current page plus one</li><li>`{page+10}` points to the current page number plus ten.</li><li>`{page-1}` points to the current page minus one.</li></ul> |
| `{branch}`   | Contains the currently selected branch (added in v1.0.25)                                 |
| `{commit}`   | Contains the current commit SHA (added in v1.0.25)                                        |

* If the placeholder data doesn't exist, then the URL is considered invalid and associated hotkeys will not be applied.
* For example, if a hotkey is in the "All of GitHub..." scope and can not be defined, then the hotkey will not work; e.g. when the browser is set to `http://github.com`, then the `{repo}` placeholder will not be valid and any associated hotkeys will not be active.
* Hotkey URLs can also contain hash tags. This userscript opens the settings panel when a `#hotkey-settings` hash exists in the URL.

## Closing the settings panel

Any of the following actions will close the custom hotkey settings panel:

* Press <kbd>Esc</kbd>.
* Click outside the panel.
* Click the close (`x`) key in the header.

Before the panel disappears, all settings are saved. So do not close the browser tab if any changes were made to these settings.

## Examples

Here is a basic hotkey example (paste this JSON into the code window)

```js
{
  "all": [
    { "f1" : "#hotkey-settings" },
    { "g g": "{repo}/graphs/code-frequency" },
    { "g p": "{repo}/pulse" },
    { "g u": [ "{user}", true ] },
    { "g s": "{upstream}" },
    { "c m": "{repo}/compare/{branch}...master" },
    { "c m": "{repo}/compare/{commit}...master" }
  ],
  "{repo}/issues": [
    { "g right": "{issue+1}" },
    { "g left": "{issue-1}" }
  ],
  "{root}/search": [
    { "g right": "{page+1}" },
    { "g left": "{page-1}" }
  ]
}
```

* The `"all"` scope refers to hotkeys that are applied to all GitHub pages, including subdomains.
* The "f1" entry opens the hotkeys settings panel for this userscript; alternatively, click on your avatar in the upper right corner and select "GitHub Hotkey Settings".
* The first entry `"g g"` is the sequence of <kbd>g</kbd> followed by another <kbd>g</kbd> key pressed and released separately. Use a space between key definitions if more than one hotkey is added.
* The second entry `"g p"` is already set by GitHub as a hotkey that goes to the current repository's pull request page. This setting **will** override the original and the key sequence will go to the pulse page instead.
* `"g u"`
  * **UPDATED in v1.1.0** this entry includes an array.
  * The first array value points to the owner of the current repo. Use a `{me}` placeholder instead of `{user}` to point to your own profile page.
  * The second value of the array will _always_ be `true`; this indicated that the hotkey will open a new tab.
  * If the hotkey does not open in a new browser tab, then the entry will not be an array.
* The `"g s"` hotkey example will only work when viewing a forked repository, otherwise the `{upstream}` hotkey sequence will not be active.
* Using `"c m"` from a commit or branch view will take you to the compare page. Added in v1.0.25; see [PR #82](https://github.com/Mottie/GitHub-userscripts/pull/82) for examples.
* There are special placeholders in the custom scopes:
  * `{issue+#}` and `{issue-#}` - these placeholders will only work on issue pages, allowing incrementing or decrementing the current issue number. It can not determine if the targeted issue is open or closed.
  * `{page+#}` and `{page-#}` - these placeholders only work when a search query (`?q=`) is active in the current URL. It increments or decrements the result page number.

## Change Log

### Version 1.1.1 (2020-08-10)

* Fix JS error. Closes [issue #125](https://github.com/Mottie/GitHub-userscripts/issues/125).

### Version 1.1.0 (2020-08-08)

* General code cleanup & improved accessibility.
* Updated UI to show "Hotkey" & "URL" in a tooltip, not inline text.
* Add new tab checkbox
  * When checked, using the hotkey will open page in a new browser tab.
  * Closes [issue #123](https://github.com/Mottie/GitHub-userscripts/issues/123).
  * This change is backwards compatible with existing saved JSON, but the updated JSON will not work in older versions of this userscript.

### Version 1.0.25 (2019-05-12)

* Add "{branch}" and "{commit}". See [PR #82](https://github.com/Mottie/GitHub-userscripts/pull/82); thanks [@dale3h](https://github.com/dale3h)!

### Version 1.0.24 (2019-03-29)

* Update header selector.

### Version 1.0.23 (2019-02-16)

* Update GitHub icon.

### Version 1.0.22 (2019-02-01)

* Update reserved names list.

### Version 1.0.21 (2019-01-28)

* Update reserved names list.

### Version 1.0.20 (2019-01-11)

* Fix default graph code link.

### Version 1.0.19 (2018-09-19)

* Update reserved names list.

### Version 1.0.18 (2018-06-26)

* Update reserved names list.

### Version 1.0.17 (2018-06-09)

* Update reserved names list.

### Version 1.0.16 (2018-05-08)

* Update reserved names list.

### Version 1.0.15 (2018-05-01)

* Update reserved names list.

### Version 1.0.14 (2018-04-10)

* Update reserved names list.

### Version 1.0.13 (2018-04-02)

* Add build for reserved names & update.

### Version 1.0.12 (2018-02-10)

* Update GitHub reserved names.

### Version 1.0.11 (2018-01-24)

* Fix JSON selection.
* Prevent wrapping on zoom.

### Version 1.0.10 (2018-01-18)

* Update assets.

### Version 1.0.9 (2017-09-22)

* Update reserved names
* Prevent reserved name partial matches. Fixes [issue #26](https://github.com/Mottie/GitHub-userscripts/issues/26).
* Fix the "{me}" reference. See [issue #26](https://github.com/Mottie/GitHub-userscripts/issues/26).
* Fix other placeholder issues
  * Pull requests are now treated as an issue.
  * Extract `page=#` or `p=#` from query string.

### Version 1.0.8 (2017-09-02)

* Include reserved names version.

### Version 1.0.7 (2017-08-22)

* Update to use new header class.

### Verison 1.0.6 (2017-06-24)

* Update list of reserved (non-user) pages

### Version 1.0.5 (2017-05-16)

* Change license to MIT.

### Version 1.0.4 (2017-04-13)

* Add additional non-user pages.

### Version 1.0.3 (2017-03-25)

* Fix linting.

### Version 1.0.2 (2017-03-12)

* Add additional non-user page.

### Version 1.0.0 & 1.0.1 (2016-09-12)

* Convert to ES6 & beautify.
* More ES6 cleanup.
* Fix JS error on pages with no header.

### Version 0.2.5 (2016-07-22)

* Correct default settings. Fixes [issue #3](https://github.com/Mottie/GitHub-userscripts/issues/3).

### Version 0.2.4 (2016-07-11)

* Add another non-user page.

### Version 0.2.3 (2016-07-05)

* Add more non-user pages.

### Version 0.2.2 (2016-06-21)

* Add missing comma!

### Version 0.2.1 (2016-05-25)

* Add more non-user pages.

### Version 0.2.0 (2016-05-25)

* Add more to the list of non-user pages (e.g. "github.com/contact").

### Version 0.1.0 (2016-04-10)

* Initial commit
