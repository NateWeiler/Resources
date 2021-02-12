This is a write-up of my experience with use of a utility called vshadow to integrate rclone with Microsoft Volume Shadow Copy Service (VSS).

## Motivation

The intention of using vshadow and VSS with rclone is to make the uploading of large file sets to cloud storage more robust. **It is, of course, not intended to be used as a backup solution, not any more than rclone itself is!**
Some of the same challanges apply for syncing/transferring large file sets, as with backup, so with some "edits"
we can use the description from [Microsoft TechNet Library](https://docs.microsoft.com/en-gb/windows-server/storage/file-server/volume-shadow-copy-service):
> ~~Backing up and restoring~~ *Syncing* critical business data can be very complex due to the following issues:
>  - The data usually needs to be ~~backed up~~ *synced* while the applications that produce the data are still running.
>    This means that some of the data files might be open or they might be in an inconsistent state.
>  - If the data set is large, it can be difficult to ~~back up~~ *sync* all of it at one time.

A [basic solution](#basic-use-of-vshadow-with-rclone) is quite simple, but it is disregarding error handling, which
in worst case would lead rclone to delete your files from the destination. I'm discussing some of the issues here,
and describe improvements, so that the [complete solution](#the-resulting-version-of-execcmd-can-be-something-like-this)
should be quote safe to use as-is.

## Background

### VSS

From [Wikipedia](https://en.wikipedia.org/wiki/Shadow_Copy):
> Shadow Copy (also known as Volume Snapshot Service, Volume Shadow Copy Service or VSS) is a technology included
> in Microsoft Windows that can create backup copies or snapshots of computer files or volumes, even when they are
> in use. It is implemented as a Windows service called the Volume Shadow Copy service. A software VSS provider
> service is also included as part of Windows to be used by Windows applications. Shadow Copy technology requires
> either the Windows NTFS or ReFS filesystems in order to create and store shadow copies. Shadow Copies can be
> created on local and external (removable or network) volumes by any Windows component that uses this technology,
> such as when creating a scheduled Windows Backup or automatic System Restore point.

From [Microsoft in Windows Developer Center](https://docs.microsoft.com/en-gb/windows/win32/vss/volume-shadow-copy-service-portal):
> The Volume Shadow Copy Service (VSS) is a set of COM interfaces that implements a framework to allow volume
> backups to be performed while applications on a system continue to write to the volumes.

#### Use in Windows

VSS is in use in Windows for various features, most notably the System Protection feature.
The System Protection feature in Windows regularly creates what it calls "system restore points", which are basically
VSS shadow copies of your drive. It can be used to restore your entire system, or to restore previous versions of
individual files through the Previous Versions pane in file properties. By default, System Protection is turned
on for system drive (C: drive), and allowed to use up to 5% of its storage capacity.
When the limit is reached, it will automatically delete the oldest restpore points. You can manually delete restore points
from the System Protection pane in the System Properties dialog in Windows, and the Disk Clean-up will also delete old restore points.

### Vshadow

VShadow is a command-line tool that you can use to query, create and manage many aspects of volume shadow copies.
It is not included in Windows, but in Windows SDK which you would normally install as part of Visual Studio, but can
also download and install from [Microsoft Developer Downloads](https://developer.microsoft.com/en-us/windows/downloads/).

It is actually intended as a sample for demonstrating the use of the [Volume Shadow Copy Service](https://docs.microsoft.com/en-gb/windows/win32/vss/volume-shadow-copy-service-portal) (VSS) COM API.
It even bears the name "Volume Shadow Copy **sample client**", still, but even so it is highly usable.

For more information about the VShadow tool and its command-line options,
see [VShadow Tool and Sample](https://docs.microsoft.com/en-gb/windows/win32/vss/vshadow-tool-and-sample)
and [VShadow Tool Examples](https://docs.microsoft.com/en-gb/windows/win32/vss/vshadow-tool-examples).

The source code (C++) is published in [Windows classic samples](https://github.com/microsoft/Windows-classic-samples/tree/master/Samples/VShadowVolumeShadowCopy) repository, with Visual Studio project file ready
for building (requires ATL, but other than that no external dependencies).

## Using vshadow with rclone

The vshadow utility from Microsoft can be used to integrate external utilities like rclone
with VSS. It is not an entirely straight forward proces, nor a very elegant solution, but
it will most likely get you to a solution that you can live with. 

### Basic use of vshadow

Vshadow can be used with command-line argument `-nw` ("no writers") to create a temporary read-only
snapshot that will be destroyed immediately when the program completes. Sounds kind of useless?
Well, it also has the command-line argument `-exec` where you can specify an executable,
which will often be a batch script, that it should run before returning. This executable will then
be able to access the temporary snapshot. The snapshot are identified with a GUID and lives inside
Windows as a kind of hidden hard disk volume device. So how can the executable find it? Well there
is a third command-line argument third argument `-script` where you can name a batch script that
vshadow will write a set of environment variables identifying the snapshot. The generated
script is a valid batch script containing `SET` statements, so if you in the `-exec` argument
specifies a batch script you it can include a `CALL` statement referencing the generated file
named according to `-script`. Now evaluating environment variable `%SHADOW_DEVICE_1%` in your
`-exec` script will return the device name of the temporary snapshot! So then we are close, but
the last challenge is how to actually access the shadow device. Most regular file commands and programs
cannot access it by the device name directly! Some do actually: COPY can be used to copy
a file directly using `copy %VSHADOW_DEVICE_1%\somefile.txt C:\somefile_bak.txt`, but DIR
does not work etc so you will probably not get to do what you want. Luckily the built-in
`MKLINK` utility are able to create a directory symbolic link with the snapshot device as target,
and then you can "mount" it to a regular directory path on your C: drive.

One tip to test out your command step by step is to add `PAUSE` statements in the batch
script specified to the `-exec` option. Then you vshadow will suspend during execution
until you press a key, and you can e.g. use another Command Prompt instance to interact with
temporary snapshot.

Another trick to test this out interactively is to specify a "blocking" command in the `-exec`
argument. For example, if you specify `notepad.exe` then after vshadow has created the
snapshot it start the regular Notepad application and then wait for it to exit before
cleaning up the snapshot! So now you can just leave the notepad window open, start another
Command Prompt and access the snapshot. When you are done you just close the Notepad Window,
and the snapshot is gone.

```
vshadow.exe -nw -script=setvars.cmd -exec=C:\Windows\System32\notepad.exe C:
```

Instead of notepad, you can also start a new instance of the "Command Interpreter".
Then vshadow will start a new command prompt inside the one you started vshadow
from, so it appears as if vshadow has just suspended and you can interact with
the command prompt. Now to resume vshadow, to let it clean up (remove the snapshot)
you type `exit` to get out of the "inner" command prompt.

```
vshadow.exe -nw -script=setvars.cmd -exec=C:\Windows\System32\cmd.exe C:
```

Another alternative is to make the snapshot "persistent", by adding the `-p` option. Then
it will not be removed automatically when vshadow command has completed, it will
even persists across restarts, so you can play around with it as long as you want.

Create it:

```
vshadow.exe -p -nw -script=setvars.cmd C:
```

Load the generated script containing environment variables:

```
setvars.cmd
```

Mount it:

```
vshadow -el=%SHADOW_ID_1%,T:
```

Remove it:

```
vshadow -ds=%SHADOW_ID_1%
```

### Basic use of vshadow with rclone

Let's say that we want to sync a directory `C:\Data\` to the cloud. Using rclone you would normally
execute `rclone sync C:\Data\ remote:Data`. To make this command read source files from a VSS snapshot,
you can create a batch script with the following content:

```
rem Load the variables from a temporary script generated by vshadow.exe
call "%~dp0setvars.cmd" || exit /b 1

rem Create the symbolic link to the snapshot (the backslash after SHADOW_DEVICE_1 is important!)
mklink /d C:\Snapshot\ %SHADOW_DEVICE_1%\ || exit /b 1

rem Execute rclone with the source C:\Snapshot\Data containing a snapshot of C:\Data
rclone sync C:\Snapshot\Data\ remote:Data

rem Delete the symbolic link
rmdir C:\Snapshot\

rem Delete the temporary file created by vshadow.exe
del "%~dp0setvars.cmd"
```

If you save this script as `exec.cmd` you could now execute the following command from the same
directory:

```
vshadow.exe -nw -script=setvars.cmd -exec=exec.cmd C:
```

Or, if you want a single-click solution; create a second batch script in the same directory,
which executes this command - but with full paths of both file references to avoid issues with
changing working directory:

```
vshadow.exe -nw -script="%~dp0setvars.cmd" -exec="%~dp0exec.cmd" C:
```

When the vshadow.exe command is executed, possibly from your single-click wrapper script, it will:
1. Create a read-only snapshot of your `C:` drive.
2. Generate a file named `setvars.cmd` containing variables identifying the snapshot created.
3. Execute `exec.cmd`, which will:
    1. Load variables from `setvars.cmd`.
    2. Mount (symbolic link) the snapshot identified by the loaded variables.
    3. Execute the rclone command to sync from the snapshot.
    4. Unmount the snapshot (delete the symbolic link).
    5. Delete the generated `setvars.cmd` file.
4. Delete the snapshot.

#### Additional comments

Clarifications:
- Vshadow must be run with administrator privileges, so with UAC enabled you must start `vsshadow.exe` or the wrapper script using the "Run as administrator" option.
- The path `C:\Snapshot\` is a temporary symbolic link only accessible while exec.cmd is running, you will see
it in Windows Explorer until the sync is completed. But the directory is read-only, because the
`vshadow.exe` command included the command line argument `-nw` ("no writers").
- The contents of `C:\Snapshot\` that rclone sees, is a mirror image of `C:\`, meaning there will be a
directory `C:\Snapshot\Program Files` mirroring `C:\Program Files` etc. If this is confusing, read
about improvements below.
- Upon successful return vshadow will print message "Snapshot creation done.". This just means everything
went well: It created the snapshot AND executed our script AND the snapshot was automatically deleted.
Upon failure it will print message "Aborting the backup..." but this does not mean anything, because there
is no backup to abort (in read-only/no writers mode) so it is not skipping anything that it would else do
on a successful run
(see [source1](https://github.com/microsoft/Windows-classic-samples/blob/master/Samples/VShadowVolumeShadowCopy/cpp/util.h#L692-L697),
[source2](https://github.com/microsoft/Windows-classic-samples/blob/master/Samples/VShadowVolumeShadowCopy/cpp/shadow.cpp#L881-L910)
and [source3](https://github.com/microsoft/Windows-classic-samples/blob/master/Samples/VShadowVolumeShadowCopy/cpp/create.cpp#L154-L157) for proof).

About error handling and robustness:
- Wherever the batch scripts are referenced, we prefix their names with `%~dp0` to make absolute paths
assuming they are in the same directory as the script they are referenced from, and surrounding with double
quotes in case there are spaces in the path. This will prevent any surprises when running from different
working directories, e.g. "Run as administrator" is notorious for always setting working directory to `C:\Windows\System32`.
- The mklink command returns error when the link path (`C:\Snapshot\`) already exists, and this is important to
handle. If we let the script just continue, rclone will try to sync a subfolder named data (`C:\Snapshot\Data`).
If this does not exist then rclone will just abort with error, so that is ok. Worse if this path does exists,
then rclone will actually sync it. What is normally expected in `C:\Snapshot\Data` is a snapshot of `C:\Data`.
In worst case this has previously been successfully synced to `remote:Data`, and after the last sync this new
folder `C:\Snapshot\Data` has been created with content that is not at all similar to what is in `C:\Data`.
The result is that the current sync will end up deleting everything from `remote:Data` and upload whatever is in
`C:\Snapshot\Data`. A lot of "ifs" here, perhaps a bit paranoid to expect it, but unless the link path is
very carefully chosen it could happen.
- The mklink command does not verify the link target, so even if the variable `%SHADOW_DEVICE_1%` contains an invalid
value or for some reason is empty, the mklink command will succeed. The following rclone sync command using the
link as source will then simply fail (`Failed to sync: directory not found`), so this so ok.

### Improvements

It may be confusing that `C:\Snapshot\` is a mirror image of `C:\`, and when referring `C:\Snapshot\Data` it is
a mirror of `C:\Data`. When writing more complex scripts this confusion may easily lead to bugs. You may find
it less confusing if you create an alias `T:` that you can use when referrring to the snapshot. This can easily
be done using the built-in `SUBST`command: Add `subst T: C:\` (error handling discussed later) before the
`rclone sync` command and `subst T: /d` after, and change the sync command to use `T:` instead
of `C:`: `rclone sync T:\Snapshot\Data\ remote:Data`.

Instead of just making `T:` an alias to the entire `C:` drive, you can make it an alias directly into the
snapshot image at `C:\Snapshot\`. Then the paths on `C:` you would normally use with rclone directly without vss,
now becomes identical when used on the snapshot `T:`. This may be even less confusing: `T:` is now the image of
`C:`.  This has the additional benefit of not increasing the path lengths of the source paths that rclone gets
to work with, in case that could hit some limit.

Proper error handling is still recommended, early abort when any of the commands fail. In addition to the original
example we now have an additional `subst` command that we must consider. It is the same situation with `subst` as
with the `mklink` command, as discussed above: If we let the script just continue if the drive already is in use,
rclone will sync whatever is on it with potential destructive effect on existing data at the destination. We now
perform the same mklink command as before and then subst, but if subst fail we should not just abort but first
delete the link created by mklink. This makes the script code a bit more complex.

Another improvements is to return a proper exit code (`ERRORLEVEL`). The `vsshadow.exe` utility will check the
exit code from the `-exec` script it executes, and if the script returns nonzero then `vsshadow.exe` will also
return a non-zero exit code (but not the one returned by the script, see below), whch you then can check from
the top level script (if it is a bit more complex than our `vs.cmd`).

##### The resulting version of `exec.cmd` can be something like this:

```
setlocal enabledelayedexpansion
call "%~dp0setvars.cmd" || set exit_code=!errorlevel!&&goto end
mklink /d C:\Snapshot\ %SHADOW_DEVICE_1%\ || set exit_code=!errorlevel!&&goto end
subst T:\ C:\Snapshot\ || set exit_code=!errorlevel!&&goto remove_link
rclone sync T:\Data\ remote:Data
set exit_code=%errorlevel%
subst T: /d
:remove_link
rmdir C:\Snapshot\
:end
del "%~dp0setvars.cmd"
exit /b %exit_code%
```

If everything goes fine until the rclone command, then the exit code from rclone is what will be returned.
If the removal of virtual drive (`subst T: /d`) and directory symbolic link (`rmdir C:\Snapshot\`) fails it is
just ignored. This will lead to the drive/directory being left accessible after the script has completed, and
if you run the script again it will abort with error because the path/drive is already in use. You could add
a check of the result from these two commands too. For example just write an additional warning
(append `||echo WARNING: Manual cleanup required`), or also set the exit code if any of these fails
(append `||set exit_code=!errorlevel!&&echo WARNING: Manual cleanup required`), depending if you see this
as something that should be reported as an error or since the rclone command passed you consider it more of
a success.

### Alternative variants

An alternative to using the SUBST command to create an alias, is to create a network share that you access
via localhost. This can be done by replacing the `rclone sync C:\Snapshot\Data\ remote:Data` line with something
like this (could be extended with similar error handling as above):

```
net share Snapshot=C:\Snapshot
rclone sync \\localhost\Snapshot\Data\ remote:Data
net share Snapshot /delete
```

A rather different approach could be to create the snapshot as a persistent one, using the `-p` option, as
described in [Basic use of vshadow](#basic-use-of-vshadow). Then our `-exec` script could actually execute vshadow again
to let it perform the mounting, using the `-el` or `-er` option. You would have to explicitely delete
the snapshot again by executing vshadow again, using the `-ds` option. Perhaps it would be possible to
run the command to remove snapshot from the `-exec` script? I haven't tried this.

### Exit codes

Exit codes from vshadow.exe:
* 0 - Success
* 1 - Object not found
* 2 - Runtime Error 
* 3 - Memory allocation error

(https://github.com/microsoft/Windows-classic-samples/blob/master/Samples/VShadowVolumeShadowCopy/cpp/shadow.cpp#L28-L34)

Exit codes from rclone.exe:
* 0 - success
* 1 - Syntax or usage error
* 2 - Error not otherwise categorised
* 3 - Directory not found
* 4 - File not found
* 5 - Temporary error (one that more retries might fix) (Retry errors)
* 6 - Less serious errors (like 461 errors from dropbox) (NoRetry errors)
* 7 - Fatal error (one that more retries won’t fix, like account suspended) (Fatal errors)
* 8 - Transfer exceeded - limit set by --max-transfer reached

(https://rclone.org/docs/#list-of-exit-codes)