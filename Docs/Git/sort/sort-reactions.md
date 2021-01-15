A userscript that sorts comments by reaction

* The userscript adds a block of buttons under the first post.
  * The sort block is not visible when an issue has less than 2 reactions.
  * Block Avatar:
    * The initial avatar shows an up & down arrow to indicate no default reaction or sort is applied.
    * Clicking on this avatar will toggle the view of the reaction selection block.
    * Once you choose a reaction from the block, it becomes your set preference and the block avatar.
    * A small round sort icon will appear in the bottom right corner. Clicking on it will change the sort.
  * Clicking on a sort reaction button or avatar sort icon will sort the comments by the selected reaction: "+1", "-1", "laugh", "hooray", "confused" and "heart".
  * One extra button is included (speak no evil 🙊 monkey):
    * Clicking it will sort the comments using a calculated value based on all reactions for that comment.
    * The calculated values are as follows: "👍", "🎉" &amp; "❤️" = `+1`; "😄" = `+0.5`; "😕" = `-0.5`; "👎" = `-1`.
  * The first click applies a descending sort, the second an ascending sort and the third click restores the comment order.
  * Comments without a reaction and comments with the same (calculated) number of reactions will be added depending on its original order ([stable sort](https://en.wikipedia.org/wiki/Sorting_algorithm#Stability)).
* Progressively loaded comments:
  * The "load more comments" button will be moved to the top, immediately under the sort block. For easy access.
  * New comments are supposed to be included in the sort, but you may need to resort the column anyway. I'll troubleshoot the mutations script and fix this soon.
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-sort-reactions.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/38354-github-sort-reactions) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Sort_Reactions).

## Screenshots

![github-sort-reactions-block](https://user-images.githubusercontent.com/136959/37052947-77e45c2e-2140-11e8-8185-66c52b221086.gif)

![github-sort-buttons](https://user-images.githubusercontent.com/136959/37052861-373a814e-2140-11e8-92f9-5c6fb57de7ba.gif)

![github-sort-reactions](https://user-images.githubusercontent.com/136959/36067966-2affc1f0-0e8f-11e8-8bb7-991d3cd83827.gif)

## Change Log

### Version 0.2.14 (2020-05-25)

* Fix error on PR pages.

### Version 0.2.12 &ndash; 0.2.13 (2019-09-26)

* Move block back under original comment.
* Style tweaks.

### Version 0.2.11 (2019-05-23)

* Fix path to GitHub emoji assets.

### Version 0.2.10 (2019-02-16)

* Update GitHub icon.

### Version 0.2.9 (2019-01-28)

* Update mutation script.

### Version 0.2.8 (2018-10-05)

* Update mutation script.

### Version 0.2.7 (2018-09-22)

* Change class prefix; to better work with the `github-issue-comments.user.js` script.

### Version 0.2.6 (2018-05-17)

* Update mutation script.

### Version 0.2.5 (2018-05-10)

* Update mutation script.

### Version 0.2.4 (2018-05-08)

* Correct unsorted comments for all reactions. Fixes [issue #42](https://github.com/Mottie/GitHub-userscripts/issues/42).

### Version 0.2.3 (2018-04-12)

* Correct unsorted comment order. Fixes [issue #42](https://github.com/Mottie/GitHub-userscripts/issues/42).

### Version 0.2.2 (2018-04-09)

* Update mutation script url.

### Version 0.2.1 (2018-03-11)

* Update mutations version.
* Fix JS error & code cleanup.

### Version 0.2.0 (2018-03-06)

* Multiple enhancements; closes [issue #39](https://github.com/Mottie/GitHub-userscripts/issues/39):
  * Make sort reaction block collapsible.
  * Added sort button to avatar.
  * Store user selected reaction for sorting.

### Version 0.1.0 (2018-02-10)

* Initial commit.
