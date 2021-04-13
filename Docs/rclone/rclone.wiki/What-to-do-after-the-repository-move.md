# Repo move from github.com/ncw/rclone to github.com/rclone/rclone

On 2019-07-28 we moved the rclone repo from `github.com/ncw/rclone` to `github.com/rclone/rclone` as part of the maturing process of the rclone project.

Here are some instructions on how to fix-up your development environment

## How to fix up your repository

If you have the `GOPATH` environment variable set or all your code is under `~/go/src/github.com/ncw/rclone` then do this to move the code to its new place, if not, just `cd` into the directory that contains the code.

```
cd ${GOPATHx:-${HOME}/go}
mkdir -p src/github.com/rclone
mv src/github.com/ncw/rclone src/github.com/rclone/rclone
cd src/github.com/rclone/rclone
```

### Fixup the origin for the git repo

```
git remote set-url origin git@github.com:rclone/rclone.git
```

Test with

```
git checkout master
git pull
```

You will need to pull to get the code to build again.

If you are working on a branch say `myfeature` then you will need to rebase it on master

```
git checkout myfeature
git rebase master
# fix conflicts
```

The conflicts should be easy to fix as they will all be in package imports.