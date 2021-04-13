# How to work with dynamically loaded content on GitHub

> originally posted in [issue #15](https://github.com/Mottie/GitHub-userscripts/issues/15#issuecomment-289214684).

## Table of Contents

* [Individual solutions](#individual-solutions)
  * [Main content (pjax) containers](#main-content-pjax-containers)
  * [Progressive containers](#progressive-containers)
    * [Diff files](#diff-files)
    * [Discussion blocks](#discussion-blocks)
    * [Previews](#previews)
* [Global solution](#global-solution)
  * [Events](#events)
  * [Usage](#usage)

## Individual solutions

### Main content (`pjax`) containers

GitHub pages contain a "main" content block that gets updated when changing pages on GitHub.

* A `#js-pjax-container` is updated for general GitHub pages.
* A `#js-repo-pjax-container` is updated for repo pages.
* And a `#gist-pjax-container` is updated on Gist pages.

There are probably more, but in general you can always target the container using an attribute selector:

```js
const container = document.queryselector("[data-pjax-container]");
```

Once the container has been updated, a `pjax:end` event fires.

Update your script as follows:

```js
function updateMyScript() {
  // do something
}
document.addEventListener("pjax:end", updateMyScript);
```

There are other [`pjax:` events](https://github.com/defunkt/jquery-pjax/#events) available which may prove to be useful.

Additional problems arise:

* Loading pages using a third party extension like [Octotree](https://github.com/buunguyen/octotree/) doesn't fire off the "pjax:end" event. Octotree fires off it's own custom events "octotree:end", but I was not successful at binding a listener for this event.
* Some pages contain sub-content that is dynamically loaded. GitHub calls these progressive containers...

### Progressive containers

On certain pages, extra content is loaded after the `pjax:end` event fires. This content is "progressively" loaded. Sadly, figuring out when the content has completed loading isn't as easy as using an event listener.

The following pages have progressive containers:

#### Diff files

Within a pull request, three tabs are available.

![](https://cloud.githubusercontent.com/assets/136959/25029112/da8da4f6-207f-11e7-9b81-00b9595828f5.png)

Changing between the tabs still triggers the "pjax:end" event; but within the "Files changed" tab are more containers that load additional content. In this case, the containers have the class name of "js-diff-progressive-container":

```html
<div id="files" class="diff-view commentable">

  <div class="js-diff-progressive-container">

    <!-- preloaded file diffs; each file has an anchor + div -->
    <a name="diff-{SHA-0}"></a>
    <div id="diff-0" class="file js-file js-details-container Details show-inline-notes">
      <div class="file-header"><!-- ... --></div>
      <div class="js-file-content Details-content--shown">
        <div class="data highlight blob-wrapper">
          <table class="diff-table"><!-- ... --></table>
        </div>
      </div>
    </div>

    <!-- up to 3 more file diffs preloaded in this container -->
  </div>

  <div class="js-diff-progressive-container">
    <!-- Additional files loaded here -->
  </div>
  <!-- More "js-diff-progressive-container" elements may be added -->

</div>
```

The first container *usually* has content, up to 4 files, but not always. More content is loaded into additional `.js-diff-progressive-container` divs dynamically - I've seen a diff with a total of 12 progressive container divs.

Within these containers are the file containers. At times, file containers will be for large and generated files which have a `.js-diff-load-container` element inside. When a user clicks inside these containers, more content is loaded:

![](https://cloud.githubusercontent.com/assets/136959/25029119/ef8e9a04-207f-11e7-8774-fba4f08eac91.png)

To detect when additional content has loaded, set up `MutationObserver` on the `.js-diff-progressive-container` and `.js-diff-load-container` elements. Ideally, changes that do not involve either the `.js-diff-load-container` or `.blob-wrapper` elements *directly* should be ignored; But there is one exception. The `.blob-wrapper` element is contained inside of the diff load container and is rendered for each file in the diff.

```js
let debounce;
// Observe progressively loaded diff content
Array.from(document.querySelectorAll(`
  .js-diff-progressive-container,
  .js-diff-load-container`
)).forEach(target => {
  new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      // preform checks before adding code wrap to minimize function calls
      const tar = mutation.target;
      if (tar && (
          tar.classList.contains("js-diff-progressive-container") ||
          tar.classList.contains("js-diff-load-container") ||
          tar.classList.contains("blob-wrapper")
        )
      ) {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          updateMyScript();
        }, 500);
      }
    });
  }).observe(target, {
    childList: true,
    subtree: true
  });
});
```

A debounce is added inside the mutation callback to prevent multiple calls when multiple containers are modified, e.g. when your script modifies the content.

#### Discussion blocks

When issue discussions get really long, a "View more" (`.timeline-progressive-disclosure-button`) button is added in the timeline ([example](https://github.com/isaacs/github/issues/215#issuecomment-110343438)) to allow progressive loading of comments. This button loads 200 additional comments, so listening for a button click isn't the best solution because the button is replaced by a new one once it has been used and the event is fired off before any additional content has completed rendering.

![](https://cloud.githubusercontent.com/assets/136959/25029162/5680703e-2080-11e7-9f9c-c50a33d8c47b.png)

In this situation, a mutation observer must target the `.js-discussion` wrapper element for updates. As for the diff files, it would be ideal to ignore all changes that do not directly change the wrapper. For example, the mutation observer will trigger when a user selects a reaction for a comment.

```js
let debounce;
// Observe progressively loaded comments
Array.from(document.querySelectorAll(".js-discussion")).forEach(target => {
  new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      // preform checks before adding code wrap to minimize function calls
      if (mutation.target === target) {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          updateMyScript();
        }, 500);
      }
    });
  }).observe(target, {
    childList: true,
    subtree: true
  });
});
```

This code includes a debounce method to prevent multiple calls to your script in rapid succession.

\* The code was updated in v0.2.1 to add a `.discussion-item` class. When an issue/PR is closed, reopened or merged, a new discussion item is added but the outer `.js-discussion` is not altered directly. This change will likely (not tested) cause the "ghmo:comments" event to trigger when a comment is edited.

#### Previews

Comment previews fire off a "preview:setup" event on the `document` when a "Preview" tab is either **hovered** or **clicked**. You could check if the preview tab is active before calling the update code, but either way, a delay would be necessary to allow time for processing of syntax highlighting and other rendering of the preview content.

```js
// "preview:render" only fires when using the hotkey :(
// "preview:setup" fires on hover & click of comment preview tab
document.addEventListener("preview:setup", () => {
  setTimeout(() => {
    // must include some rendering time...
    // 200 ms seems to be enough for a 1100+ line markdown file
    updateMyScript();
  }, 500);
});
```

This method still isn't ideal...

There is a also a "preview:render" event that is triggered on the `document`, but this event only fires when the user enables the preview using the keyboard shortcut (<kbd>ctrl shift p</kbd>).

The best solution in this case would be to attach a mutation observer, *after a `pjax:end`*, and watch the `.js-preview-body` element.

```js
let debounce;
Array.from(document.querySelectorAll(".js-preview-body")).forEach(target => {
  new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      // preform checks before adding code wrap to minimize function calls
      if (mutation.target === target) {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          updateMyScript();
        }, 500);
      }
    });
  }).observe(target, {
    childList: true,
    subtree: true
  });
});
```

## Global solution

Having a few usersripts that attach mutation observers shouldn't have any noticable performance effect; but when numerous userscripts are active on a single page, you may notice a change in performance. Attaching an event listener to the "pjax:end" event is a relatively good solution unless you use Octotree extensively, or your script needs to monitor progressively loaded content.

At one point, many of the userscripts in this repository were using a combination of "pjax:end" listeners and mutations observers. The code was adding and removing mutation observers, on `pjax:start` and `pjax:end` respectively, as some elements would not be present until content was loaded.

To make maintenance of all the code easier, a single ["mutations.js" file](https://github.com/Mottie/GitHub-userscripts/blob/master/mutations.js) file was created. In it, the "pjax:end" event is ignored, and a generalized mutation observer is attached to the `document`. The observer watches for specific changes on the page and triggers a unique event on the `document` for each specific event. Take a look at the most up-to-date version of this code by clicking on the provided link.

### Events

The script triggers the following `document` events:

| Event | Description |
|-------|-------------|
| `ghmo:container` | Triggered after `[data-pjax-container]` changes; this replaces the "pjax:end" event |
| `ghmo:preview`   | Triggered after an issue or pull request comment preview tab has completed rendering |
| `ghmo:comments`  | Triggered after progressively loaded comments have completed rendering |
| `ghmo:diff`      | Triggered after progressively loaded diff files have completed rendering |

### Usage

When using this script, make sure to ignore any events that fire after you manipulate the DOM directly inside of the targeted element:

* Any `[data-pjax-container]`
* Preview wrapper `.js-preview-body`
* Progressively loaded comment wrapper `.js-discussion`
* Progressively loaded diff content wrappers
  * `.js-diff-progressive-container`
  * `.data.blob-wrapper`
  * `.js-diff-load-container`

This can be done using a flag:

```js
// set this flag outside of the script
let busy = false;

function updateMyScript() {
  if (busy) {
    return;
  }
  busy = true;
  const label = document.createElement("span");
  label.textContent = "preview mode";
  label.className = "position-and-style-me";
  // appending elements directly to the preview will trigger a mutation event;
  // we are using the busy flag to prevent calling this script repeatedly during
  // this process
  Array.from(document.querySelectorAll(".js-preview-body")).forEach(el => {
    el.appendChild(label);
  });
  busy = false;
}

document.addEventListener("ghmo:preview", updateMyScript);
```
