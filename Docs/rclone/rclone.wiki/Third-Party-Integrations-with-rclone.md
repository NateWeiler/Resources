# Third Party Integrations with rclone

This page documents projects which use rclone for some purpose. If you have a project using rclone then please feel free to add a section on it here. This should include a URL and a paragraph of description.

- [HashBackup](#hashbackup)
- [rhttpserve](#rhttpserve)
- [RcloneBrowser](#rclonebrowser)
- [rclone_jobber](#rclonejobber)
- [Unified Cloud Storage](#unified-cloud-storage)
- [Doomsday Machine](#doomsday-machine)
- [PlexInTheCloud](#plexinthecloud)
- [rclonesync V2](#rclonesync-v2)
- [RcloneOSX](#rcloneosx)
- [rclone4pi - Easy Install onto a Raspberry Pi](#rclone4pi---easy-install-onto-a-raspberry-pi)
- [UpBack](#upback)
- [Rclone Explorer](#rclone-explorer)
- [RCX - Rclone for Android](#rcx---rclone-for-android)
- [vim-netranger (beta)](#vim-netranger-beta)
- [Polo File Manager](#polo-file-manager)
- [python-rclone](#python-rclone)
- [Sprinkle](#sprinkle)
- [PyFiSync](#pyfisync)
- [rsinc](#rsinc)
- [Docker images](#docker-images)
- [restic](#restic)
- [Motuz](#motuz)
- [rclone-rc-web-gui](#rclone-rc-web-gui)
- [PyClone](#pyclone)
- [syncrclone](#syncrclone)

## HashBackup

http://www.hashbackup.com

HashBackup is an efficient multi-threaded command-line backup system for Linux, FreeBSD, and OSX. 

Features: scales to huge backups, multiple versions of files, file retention, combining small files into larger arc files, splitting huge files, variable-block dedup, local encryption, mountable backups (fuse), backup verification, and support for many storage systems: local disks, Amazon S3, Google Storage, Backblaze B2, Rackspace Cloud Files, WebDAV, ftp, rsync, ssh, and imap/email. Backups are sent to one or more destinations as the backup occurs and new destinations are automatically populated with earlier backup data. Rclone can be used as a transport protocol for storage systems not natively supported by HashBackup.

## rhttpserve

https://github.com/brandur/rhttpserve

A tiny HTTP server that can serve files out of any rclone remote. Includes a command line utility to generate time expiring Ed25519-based signed URLs (similar to a signed S3 URL) that will be verified by the server before it agrees to send a file.

This one is sort of "meware" in that it's largely created to be personally useful, but could potentially be interesting to someone else.

## RcloneBrowser

A simple cross-platform GUI for rclone: https://mmozeiko.github.io/RcloneBrowser/
Works on Windows, macOS and GNU/Linux.

NOTE: while Martin Mozeiko seems that has not abandoned the code, he showed also he is not actually maintaining it.

DR,TL: go directly to https://github.com/kapitainsky/RcloneBrowser/releases

If you enjoy reading:
There have been some clones/forks, and have kept more or less alive the browser.
Last fork, quite improved, available on 20191004, here https://github.com/kapitainsky/RcloneBrowser/releases (based on DinCahill fork)
https://github.com/DinCahill/RcloneBrowser (based on AndyIbanez fork)
https://github.com/AndyIbanez/RcloneBrowser (fork of MMozeiko founding code)

There is a "Docker container including RClone Browser with GUI interface" - https://hub.docker.com/r/romancin/rclonebrowser/ - it is based in noabody fork.
noabody fork is not there anymore ... https://github.com/noabody/RcloneBrowser (based on DinCahill fork)

## rclone_jobber

[rclone_jobber.sh](https://github.com/wolfv6/rclone_jobber) is a backup script.
A [backup script tutorial](https://github.com/wolfv6/rclone_jobber/blob/master/rclone_jobber_tutorial.org) includes backup-job and restore-job examples for a home computer.

Features:
Options to archive old backup files in their original hierarchy,
Abort if job is already running (maybe previous run didn't finish),
Pop-up for error conditions,
Logging,
Free.

## Unified Cloud Storage (Not update since July 2017)

An Android App to manage data on different cloud storage providers. It uses rclone in the background to connect to different cloud drives.
https://play.google.com/store/apps/details?id=ch.ethz.idsc.unifiedcloudstorage

## Doomsday Machine

[Doomsday Machine](https://github.com/johnjones4/Doomsday-Machine-2) is a tool for backing up many cloud services to a local machine including IMAP email, Evernote, Google Contacts, Todoist, GitHub projects, LastPass data, and others. It uses RClone as one of the many tools that perform a nightly backup of services to a Docker container and then archives the backup for long term storage.

## PlexInTheCloud

[PlexInTheCloud](https://github.com/chrisanthropic/PlexInTheCloud) is a series of bash scripts to install & configure: Plex, nzbget, sickrage, couchpotato, mylar, with rclone mounted Google Drive storage and full post-processing on your VPS (virtual private server). Includes a wiki with clear documentation

## rclonesync V2

[rclonesync.py](https://github.com/cjnaz/rclonesync-V2) provides bi-directional sync capability utilizing delta checks (new, newer, deleted) on the Remote and Local filesystems. Several safety checks are implemented to protect against accidental data loss, including filesystem access health checks and `--max-deletes` limits. rclonesync works with both Python 2.7 and 3.x. I run it periodically as a cron job to sync the cloud services with a local drive which is Samba-served on my LAN. Note that the official Dropbox and Drive services generally do not play well with network shared filesystems, and rclonesync solves this problem.

## RcloneOSX

[RcloneOSX](https://github.com/rsyncOSX/rcloneosx) is a macOS GUI utilizing rclone. It is compiled with support for macOS 10.11 - 10.14 (Mojave). RcloneOSX executes rclone tasks as single tasks, as batch tasks and by schedule.

## rclone4pi - Easy Install onto a Raspberry Pi

[rclone4pi](https://github.com/pageauc/rclone4pi) includes an automated bash install script that can be run from a [curl command](https://github.com/pageauc/rclone4pi/wiki#quick-install) or [manually](https://github.com/pageauc/rclone4pi/wiki#manual-install). [Wiki](https://github.com/pageauc/rclone4pi/wiki) instructions are provided that includes setting up a [Cloud Storage Service](https://github.com/pageauc/rclone4pi/wiki#how-to-configure-a-remote-storage-service). A demo [***rclone-sync.sh***](https://github.com/pageauc/rclone4pi/blob/master/rclone-sync.sh) script is provided. It can be run manually or added as a [crontab](https://github.com/pageauc/rclone4pi/wiki#how-to-automate-rclone) and prevents multiple instances of rclone from running. This avoids running multiple instances of the same sync job.

## UpBack

[UpBack](https://github.com/DavideRossi/upback) is a two way synchronization utility based on rclone. It assumes a star topology for your backup, that means a remote storage that is synchronized with multiple clients (your workstation, laptop, HTPC, ...).

## Rclone Explorer

_No development activity since November 2018. Of the various forks [RCX](#rcx---rclone-for-android) is the only one currently being maintained._

[Rclone Explorer](https://github.com/kaczmarkiewiczp/rcloneExplorer) is an Android application for rclone. It's capable of displaying remote content, uploading and downloading files, opening and streaming files, file editing (move, rename, delete), as well as serving remotes over HTTP.

## RCX - Rclone for Android

[RCX](https://github.com/x0b/rcx) is the continuation of rcloneExplorer. It includes support for newer Android versions, external storage devices, bug and security fixes and is available on Google Play. 

## vim-netranger (beta)

[vim-netranger](https://github.com/ipod825/vim-netranger) is a [ranger](https://github.com/ranger/ranger)-like system/cloud tui file browser for Vim/Neovim. It supports basic file operations (cp, mv, rename, delete) for both local files and any remote file supported by rclone.

## Polo File Manager

[Polo File Manager](https://teejee2008.github.io/polo/) is an advanced file manager for Linux written in Vala. It supports multiple panes (single, dual, quad) with multiple tabs in each pane, archive creation, extraction and browsing, cloud storage access via rclone, running and managing KVM images, modifying PDF documents and image files, booting ISO files in KVM, and writing ISO files to USB drives.

## python-rclone

[python-rclone](https://pypi.org/project/python-rclone/) is a python client library for rclone.

## Sprinkle
[Sprinkle](https://mmontuori.github.io/sprinkle/) is a volume clustering utility. It presents all the RClone available volumes as a single clustered volume. It supports 1-way sync mainly for
backup and recovery. Sprinkle uses the excellent [RClone](https://rclone.org) software for cloud volume access.
Features:
* Consolidate multiple cloud drives into a single virtual drive
* Sprinkle your backup across multiple cloud drives
* Minimize cost by stacking multiple free cloud drives into single one
* Run as Unix daemon with custom schedules for seamless backups of important files
* Developed in Python for extreme multi-platform flexibility

## PyFiSync

[PyFiSync](https://github.com/Jwink3101/PyFiSync) is a Python-based utility to provide robust bi-directional sync on macOS/Unix/Linux platforms. As of version `20190509.0`, PyFiSync can support rclone-based remotes as long as they support ModTime. (It can also support rsync-based remotes for improved transfer efficiency when not used with rclone). rclone (or rsync) is used as a file transfer while sync logic occurs in Python.

Features:

* Robust file tracking including moves and deletes
* All files to be deleted or overwritten are backed up *before* any destructive operations occur
* While sync is not atomic, interruptions or failures result in a recoverable state (see the [FAQs](https://github.com/Jwink3101/PyFiSync/blob/master/FAQs.md) for an enumeration of situations)
* *Extensive* test suite including a huge number of edge cases and odd situations
* Tested on Python 2.7.16 and 3.6.8
* No dependancies besides rclone

**Note**: Check out [syncrclone](https://github.com/Jwink3101/syncrclone) by the same author for a tool designed around rclone from the ground up.

## rsinc

_A tiny, hackable, two-way cloud synchronisation client for Linux_

[Rsinc](https://github.com/ConorWilliams/rsinc) extends rclone to two-way / bi-directional synchronisation. Rsinc tracks file moves and saves bandwidth. Rsinc uses only file hashes and sizes to track files thus avoiding unreliable time stamps. 

Features:

* Two-way syncing 
* Tracks file moves and performs compound move/updates
* **Selective** syncing for improved speed
* Multiprocess' uploads/downloads/moves/deletes in parallel
* Recovery mode
* Dry-run mode 
* Crash detection and recovery
* Automatic first run detection and resolution
* Git-like `.rignore` system supporting regular expressions for ignoring files
* Uses file hashes to track changes
* Case checking for clouds (OneDrive) that are case insensitive
* Colourful CLI

## Docker images

See https://github.com/rclone/rclone/wiki/Docker-images

## restic

https://restic.net/

restic is a program that does backups right - the design goals are to make backups easy, fast, verifiable, secure, efficient and secure.

rclone is featured as a [restic backend](https://restic.readthedocs.io/en/stable/030_preparing_a_new_repo.html#other-services-via-rclone). Backing up rclone remotes [is in the idea phase](https://github.com/restic/restic/issues/2529).

## Motuz

[Motuz](https://github.com/FredHutch/motuz) is not only a fully functional web interface for rclone but a multi-user infrastructure for large scale data movements between on premise and cloud or between different storage systems on premise. You can trigger a multi TB copy job, logout and then wait for an email notification when the copy job is done. Many scientists need to verify the file checksums after copying data and Motuz provides an easy to use interface for that use case. Please checkout these [animated gifs](https://github.com/FredHutch/motuz) to see how it works. Motuz also provides a REST api. AWS has written a [blog post about Motuz](https://aws.amazon.com/blogs/publicsector/how-fred-hutch-unlocks-siloed-data-open-source-software/)

## rclone-rc-web-gui

https://github.com/retifrav/rclone-rc-web-gui

A web-based GUI for [rclone rc](https://rclone.org/rc/). Minimalistic design based on a two-panel file-manager layout. Supports copy/move/delete operations and creating new folders. Has a basic queue functionality.

## PyClone

PyClone is a Python package that wraps rclone and provides a threaded interface for an installation at the host or container level.

You can install this in your projects with, `pip install PyClone`

* [Package](https://pypi.org/project/pyclone/)
* [Documentation](https://ltgiv.gitlab.io/pyclone/)
* [Source](https://gitlab.com/ltgiv/pyclone)
* [Tracker](https://gitlab.com/ltgiv/pyclone/issues)

An example for processing output from rclone that's stored as a dictionary:

```python
#!/usr/bin/env python

import pyclone
import time

rclone    =    pyclone.PyClone()

rclone.sync( source='/mnt/familyPhotos', remote='googleDrive', path='/backups/familyPhotos' )

while rclone.tailing():

    if rclone.readline():
        print( rclone.line )

    time.sleep( 0.5 )

rclone.stop()
```
## syncrclone

[syncrclone](https://github.com/Jwink3101/syncrclone), developed by the same author of [PyFiSync](https://github.com/Jwink3101/PyFiSync) can do bona-fide two-way synchronization between any two rclone remotes. It has a lot of the same features as PyFiSync but was designed from the ground up to use rclone. This means the algorithm is simpler since it doesn't need to try to track moved *and* modified files.

* Fully non-interactive actions
* Backups before anything destructive
* *Extensive* test suite including a huge number of edge cases and odd situations
* Lots of conflict resolution optiosn
* Can work with remotes that do not support modtime (though it is more robust with it)
* Can use past sync state to accelerate checksum computation on any remote