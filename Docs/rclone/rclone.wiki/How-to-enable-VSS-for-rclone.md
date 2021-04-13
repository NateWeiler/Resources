**the goal of this wiki to show you how easy it is to enable VSS for rclone or any windows app.**

***
**Background**

As per [Wikipedia](https://en.wikipedia.org/wiki/Shadow_Copy):
> Volume Snapshot Service or VSS is a technology included in Microsoft Windows that can create backup copies or snapshots of computer files or volumes, even when they are in use. A snapshot is a read-only point-in-time copy of the volume. Snapshots allow the creation of consistent backups of a volume, ensuring that the contents do not change and are not locked while the backup is being made.

***
**Use case**

I use rclone to copy very large files created by Veeam Backup and Replication which can take 24+ hours, depending on the size of the files and internet speeds. 

If Veeam backup software would run again while rclone is still uploading, Veeam would modify the set of files that rclone is still uploading, resulting in a corrupted and uselss set of backup files. Or if I wanted rclone to check a set of large sized files, Veeam might run again and modify the local files while rclone is still checking and generate errors in the log files.

So I create a VSS read-only point-in-time snapshot and have rclone use that as the source.
Now rclone can takes its time, upload, sync, check or whatever and not be concerned that the data will be modified:
- The snapshot's files are never in-use. rclone will not get an error about in-use files.
- The snapshot's files are never locked. rclone will not get an error about locked files.

***
**How to**

Let's say that we want to sync `c:\data\` to the cloud.

1 - Create a file named `vs.cmd`:

    vshadow.exe -nw -script=setvars.cmd -exec=exec.cmd c:

2 - Create a file named `exec.cmd` file:

    rem Load the the variables created by vshadow.exe
    call setvars.cmd

    rem Create the symbolic link to the snapshot (the backslash after shadow_device_1 is important!)
    mklink /d c:\snapshot\ %shadow_device_1%\

    rem Execute rclone with the source as c:\snapshot\data\, not c:\data\
    rclone sync c:\snapshot\data\ dest:data

    rem Delete the symbolic link
    rmdir c:\snapshot\

To run the sync execute `vs.cmd` (1), which will:
1. Execute `vshadow.exe`, which will:
   1. Create the snapshot
   2. Create a file named `setvars.cmd` with some variables identifying the snapshot created
   3. Execute `exec.cmd`, which will:
      1. Load variables from `setvars.cmd`
      2. Mount the snapshot identified by the variables
      3. Execute the rclone command to sync from the snapshot
      4. Unmount the snapshot
   4. Delete the snapshot

Note:
- The `vs.cmd` must be run with administrator privileges.
- The path `c:\snapshot\` is a temporary symbolic link only accessible while exec.cmd is running.
- The contents of `c:\snapshot\` that rclone sees, is a mirror image of `c:\`, meaning there will be a directory `c:\snapshot\Program Files` mirroring `c:\Program Files` etc.
- When exec.cmd exits, the snapshot is removed by Windows operating system.

***
**Variants**

It may be confusing that `c:\snapshot\` is a mirror image of `c:\`, and when writing more complex scripts this confusion may easily lead to bugs. Here are some alternative variants of `exec.cmd` that could make it clearer.

1 - Use SUBST command to make an alias of `c:`

(a) You may find it less confusing if you create an alias `t:` that you can use when referrring to the snapshot:
```
call setvars.cmd
mklink /d c:\snapshot\ %shadow_device_1%\ 
subst t: c:\
rclone sync t:\snapshot\data\ dest:data
subst t: /d
rmdir c:\snapshot\
```

(b) Alternatively, instead of just making `t:` an alias to the entire `c:` drive, you can make it an alias directly into the snapshot image at `c:\snapshot\`. Then the paths on `c:` you would normally use with rclone directly without vss, now becomes identical when used on the snapshot `t:`. This has the additional benefit of not increasing the path lengths of the source paths that rclone gets to work with, in case that could hit some limit.
```
call setvars.cmd
mklink /d c:\snapshot\ %shadow_device_1%\ 
subst t:\data\ c:\snapshot\
rclone sync t:\ dest:data
subst t: /d
rmdir c:\snapshot\
```

2 - Use NET USE command
```
call setvars.cmd
mklink /d c:\snapshot\ %shadow_device_1%\ 
net share snapshot=c:\
rclone sync \\localhost\snapshot\data\ dest:data
net share snapshot /delete
rmdir c:\snapshot\
```

3 - Create a new drive letter

This is what I do as this is the most reliable and least code needed.
Create a new drive and use that for the mount point.
Most computers will not have free space to create a new drive. So shrink your c: drive by just 1MB and use that space to create new partition and name it the b: drive. Since the b: drive will only be used to mount the vss point, 1MB is plenty of space.
```
call setvars.cmd
mklink /d b:\snapshot\ %shadow_device_1%\
rclone sync b:\snapshot\data\ dest:data
rmdir b:\snapshot\
```

Good luck and if you have any questions or comments, please do not hesitate to contact me.
Create a post at the forum and put the "VSS question" in the subject and I will answer.


***
**Details**


Now for the boring details.

Vshadow.exe is part of the Window SDK which can be download free from Micro$oft at https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk. You will have to install the SDK and search for vshadow.exe. Tho the SDK is for windows 10, it runs fine on Windows Server 2019, including the free Windows Server Hyper-V edition, which I love!

As for more detail as to what vshadow.exe is doing, check out https://docs.microsoft.com/en-us/windows/win32/vss/vshadow-tool-examples
