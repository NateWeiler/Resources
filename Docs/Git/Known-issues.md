## [GitHub Show Repo Issues](https://github.com/Mottie/GitHub-userscripts/wiki/GitHub-issue-counts) is missing some repos!

* Also known as GitHub issue counts.
* This userscript uses GitHub's REST API v3 because their GraphQL API v4 *requires* an authentication token; adding this token would be quite a hassle for the end user.
* Sadly the REST API response for a user's list of repositories only includes thirty (random?) repositories and sometimes not all of a user's repositories are included.
* This is currently the only userscript with this problem.

## [GitHub Code Guides](https://github.com/Mottie/GitHub-userscripts/wiki/GitHub-code-guides) are broken in Chrome!

* **RESOLVED!** Chrome has fixed this rendering bug! :tada:
* You may not see any guides, or the guides are ugly and blurry.
* The problem is an issue with Webkit's linear gradient rendering.
  * Original issue: [GitHub-userscripts issue #10 comment](https://github.com/Mottie/GitHub-userscripts/issues/10#issuecomment-313202506).
  * Bug as reported to Chromium: [bugs.chromium.org #729727](https://bugs.chromium.org/p/chromium/issues/detail?id=729727).
* The guides will *flicker* as the page is resized

  ![gif](https://user-images.githubusercontent.com/136959/29995665-6243ffe6-8fb4-11e7-9def-ba9da0a9b07d.gif)
