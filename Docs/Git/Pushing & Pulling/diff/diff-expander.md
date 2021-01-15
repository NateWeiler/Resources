## **Deprecated**

GitHub added this feature on [Jan 30, 2019](https://twitter.com/github/status/1090684311492165632)!

---

A userscript that adds more diff code expanding buttons

* Without this userscript, the code expanders on a diff page work by expanding code blocks *up*, except for the last expander.
* With this userscript:
  * More expander buttons are added that will allow expanding the code in either direction.
  * Included with every expander button is the range of code lines, for the left column, that it will load.
* Limitations & confusing points:
   * GitHub's server will return a maximum of 20 lines of code.
   * Because diffs have before and after line numbers, it would be difficult to show the range of both columns due to alignment and space limitations. This userscript will only show the "before" diff line number range (left column).
   * Overlapping ranges may cause confusion. In this screenshot, the top expander will load the code for lines 21 to 40, while the bottom expander will load lines 34 to 53. Once the expander is clicked, the range will adjust.<br>
     ![](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/images/github-diff-expander-overlap.png)
   * Within each file, the range shown in the last expander will start with the next left column line number, but end with the maximum line number for either the left or right column. This is due to the range provided by the expander link.<br>
     ![](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/images/github-diff-expander-range.gif)
* Click [this link](https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-diff-expander.user.js) to install from GitHub; or, install from [GreasyFork](https://greasyfork.org/en/scripts/369373-github-diff-expander) or [OpenUserJS](https://openuserjs.org/scripts/Mottie/GitHub_Diff_Expander).

## Screenshots

<table>
  <thead><tr><th>Before</th><th>After</th></tr></thead>
  <tbody>
    <tr>
      <td><img src="https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/images/github-diff-expander-before.png" alt="before"></td>
      <td><img src="https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/images/github-diff-expander-after.gif" alt="after"></td>
    </tr>
  </tbody>
</table>

## Change Log

### Version 0.1.3 (2019-02-16)

* Update GitHub icon.

### Version 0.1.2 (2019-01-28)

* Update mutation script.

### Version 0.1.1 (2018-10-05)

* Update mutation script.

### Version 0.1.0 (2018-06-09)

* Initial commit
