# Package

The `rclone` pre-compiled binary package is available for [Termux](https://termux.com/). You can install it with 

`pkg install rclone`

# Compilation

or you can compile and run manually. It doesn't require root. You can do it this way:

Update packages

```
-bash-4.4$ apt update
Get:1 http://termux.net stable InRelease [1684 B]
Get:2 http://termux.net stable/main all Packages [3592 B]
Get:3 http://termux.net stable/main arm Packages [46.7 kB]
Fetched 51.9 kB in 1s (36.2 kB/s)  
Reading package lists... Done
Building dependency tree       
Reading state information... Done
18 packages can be upgraded. Run 'apt list --upgradable' to see them.
```

Install Go

```
-bash-4.4$ apt install golang git
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following packages were automatically installed and are no longer required:
  libisl libmpc libmpfr
Use 'apt autoremove' to remove them.
The following packages will be upgraded:
  golang
1 upgraded, 0 newly installed, 0 to remove and 17 not upgraded.
Need to get 23.2 MB of archives.
After this operation, 4096 B of additional disk space will be used.
Get:1 http://termux.net stable/main arm golang arm 2:1.7.4-1 [23.2 MB]
Fetched 23.2 MB in 4s (4914 kB/s) 
(Reading database ... 12400 files and directories currently installed.)
Preparing to unpack .../golang_2%3a1.7.4-1_arm.deb ...
Unpacking golang (2:1.7.4-1) over (2:1.7.3) ...
Setting up golang (2:1.7.4-1) ...
```

Set GOPATH

```
-bash-4.4$ export GOPATH=`pwd`/go
-bash-4.4$ mkdir go
```

Compile (this took a couple of minutes on my phone)

```
-bash-4.4$ go get -u -v github.com/ncw/rclone
github.com/ncw/rclone (download)
runtime/internal/sys
runtime/internal/atomic
runtime
[snip]
github.com/ncw/rclone/s3
github.com/ncw/rclone/fs/all
github.com/ncw/rclone
```

Find the rclone binary in `go/bin/rclone`

```
bash-4.4$ ./go/bin/rclone version
rclone v1.35-DEV
```