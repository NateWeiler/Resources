# Service File
```ini
[Unit]
Description=RClone mount of users remote %i using filesystem permissions
Documentation=http://rclone.org/docs/
After=network-online.target


[Service]
Type=notify
#Set up environment
Environment=REMOTE_NAME="%i"
Environment=REMOTE_PATH="/"
Environment=MOUNT_DIR="%h/%i"
Environment=RCLONE_CONF="%h/.config/rclone/rclone.conf"
Environment=RCLONE_TEMP_DIR="/tmp/rclone/%u/%i"

#Default arguments for rclone mount. Can be overridden in the environment file
Environment=RCLONE_MOUNT_ATTR_TIMEOUT="1s"
#TODO: figure out default for the following parameter
Environment=RCLONE_MOUNT_DAEMON_TIMEOUT="UNKNOWN_DEFAULT"
Environment=RCLONE_MOUNT_DIR_CACHE_TIME="60m"
Environment=RCLONE_MOUNT_DIR_PERMS="0777"
Environment=RCLONE_MOUNT_FILE_PERMS="0666"
Environment=RCLONE_MOUNT_GID="%G"
Environment=RCLONE_MOUNT_MAX_READ_AHEAD="128k"
Environment=RCLONE_MOUNT_POLL_INTERVAL="1m0s"
Environment=RCLONE_MOUNT_UID="%U"
Environment=RCLONE_MOUNT_UMASK="022"
Environment=RCLONE_MOUNT_VFS_CACHE_MAX_AGE="1h0m0s"
Environment=RCLONE_MOUNT_VFS_CACHE_MAX_SIZE="off"
Environment=RCLONE_MOUNT_VFS_CACHE_MODE="off"
Environment=RCLONE_MOUNT_VFS_CACHE_POLL_INTERVAL="1m0s"
Environment=RCLONE_MOUNT_VFS_READ_CHUNK_SIZE="128M"
Environment=RCLONE_MOUNT_VFS_READ_CHUNK_SIZE_LIMIT="off"
#TODO: figure out default for the following parameter
Environment=RCLONE_MOUNT_VOLNAME="UNKNOWN_DEFAULT"

#Overwrite default environment settings with settings from the file if present
EnvironmentFile=-%h/.config/rclone/%i.env

#Check that rclone is installed
ExecStartPre=/usr/bin/test -x /usr/bin/rclone

#Check the mount directory
ExecStartPre=/usr/bin/test -d "${MOUNT_DIR}"
ExecStartPre=/usr/bin/test -w "${MOUNT_DIR}"
#TODO: Add test for MOUNT_DIR being empty -> ExecStartPre=/usr/bin/test -z "$(ls -A "${MOUNT_DIR}")"

#Check the rclone configuration file
ExecStartPre=/usr/bin/test -f "${RCLONE_CONF}"
ExecStartPre=/usr/bin/test -r "${RCLONE_CONF}"
#TODO: add test that the remote is configured for the rclone configuration

#Mount rclone fs
ExecStart=/usr/bin/rclone mount \
            --config="${RCLONE_CONF}" \
#See additional items for access control below for information about the following 2 flags
#            --allow-other \
#            --default-permissions \
            --cache-tmp-upload-path="${RCLONE_TEMP_DIR}/upload" \
            --cache-chunk-path="${RCLONE_TEMP_DIR}/chunks" \
            --cache-workers=8 \
            --cache-writes \
            --cache-dir="${RCLONE_TEMP_DIR}/vfs" \
            --cache-db-path="${RCLONE_TEMP_DIR}/db" \
            --no-modtime \
            --drive-use-trash \
            --stats=0 \
            --checkers=16 \
            --bwlimit=40M \
            --cache-info-age=60m \
            --attr-timeout="${RCLONE_MOUNT_ATTR_TIMEOUT}" \
#TODO: Include this once a proper default value is determined
#           --daemon-timeout="${RCLONE_MOUNT_DAEMON_TIMEOUT}" \
            --dir-cache-time="${RCLONE_MOUNT_DIR_CACHE_TIME}" \
            --dir-perms="${RCLONE_MOUNT_DIR_PERMS}" \
            --file-perms="${RCLONE_MOUNT_FILE_PERMS}" \
            --gid="${RCLONE_MOUNT_GID}" \
            --max-read-ahead="${RCLONE_MOUNT_MAX_READ_AHEAD}" \
            --poll-interval="${RCLONE_MOUNT_POLL_INTERVAL}" \
            --uid="${RCLONE_MOUNT_UID}" \
            --umask="${RCLONE_MOUNT_UMASK}" \
            --vfs-cache-max-age="${RCLONE_MOUNT_VFS_CACHE_MAX_AGE}" \
            --vfs-cache-max-size="${RCLONE_MOUNT_VFS_CACHE_MAX_SIZE}" \
            --vfs-cache-mode="${RCLONE_MOUNT_VFS_CACHE_MODE}" \
            --vfs-cache-poll-interval="${RCLONE_MOUNT_VFS_CACHE_POLL_INTERVAL}" \
            --vfs-read-chunk-size="${RCLONE_MOUNT_VFS_READ_CHUNK_SIZE}" \
            --vfs-read-chunk-size-limit="${RCLONE_MOUNT_VFS_READ_CHUNK_SIZE_LIMIT}" \
#TODO: Include this once a proper default value is determined
#            --volname="${RCLONE_MOUNT_VOLNAME}"
            "${REMOTE_NAME}:${REMOTE_PATH}" "${MOUNT_DIR}"

#Unmount rclone fs
ExecStop=/bin/fusermount -u "${MOUNT_DIR}"

#Restart info
Restart=on-success
RestartSec=10

[Install]
WantedBy=default.target

```

# Service installation
Save the above file to `/etc/systemd/user/rclone@.service` if you want it accessible to the entire system, or `~/.config/systemd/user/rclone@.service` if you want it only accessible for a single user. The "@" at the end of the name of the service is what makes the service a templated service and is passed to the service file as the `%i` placeholder. After saving the file to the file system, you need to issue the following command to tell systemd to look for the new service file (this will also need done if you change the service file)

`systemctl --user daemon-reload`

Congratulations, the service is now installed! **Read on for instructions on how to use the installed systemd service.**

## Notes
This is a templated user service.

Lets start with what it means to be a user service. Basically, you don't need to be root to use this. As long as rclone is installed, and the user has their rclone remotes configured, they can start and stop this service themselves without the need for administrator privileges.  

As for being a templated service, that means that this service can be invoked multiple times for different situations without needing to change the service file. This should allow for basic usage by most users. The advanced usage described below should cover most other cases.  

# Service usage (basic)
## Prerequisites
* Hopefully this goes without saying, but rclone must be installed
* The cloud service (remote) must already be configured with rclone. See the [rclone config documentation](https://rclone.org/docs/) for this
* The configuration file for rclone is in its default location (`~/.config/rclone/rclone.conf`)
* There is a mount directory (that is empty and for which you have write permissions) at the location of `~/<REMOTE NAME>`

## Example
For this example, I am assuming rclone is installed and that the remote you have configured is called "dropbox-personal".

If you can run the command `rclone lsd dropbox-personal:` and get a listing of your top directories, then your remote is configured already.

You will need to make the directory to mount your remote. This can be accomplished with the following command: `mkdir ~/dropbox-personal`

Now that we have satisfied the prerequisites, it is time to mount your remote. you can mount it by issuing the command `systemctl --user start rclone@dropbox-personal`. You should now be able to navigate to `~/dropbox-personal` and explore the files you have in your remote.

Once you are sure the mount it is working, you can enable it so that the remote is automatically mounted at login. This is done with the following command `systemctl --user enable rclone@dropbox-personal`.

# Service usage (advanced)
## What is advanced usage?
Advanced usage allows for overriding any of the default behaviors specified in the service file. Default behaviors are specified by environment variables (`Environment=...`) in the service file.

The variables are able to be overriden by specifying a systemd environment file located at `~/.config/rclone/<TEMPLATE ARGUMENT>.env` where `<TEMPLATE ARGUMENT>` is the text after the `@` in your `systemctl` call.

As seen in the basic usage example, this environment file does not have to exist for the service to run. If it does exist, the file can be empty. In this case, everything is default and the usage is the same as the basic example. Otherwise the file can contain 1 or more variable assignments (1 per line) to override specific functionality.

## Prerequisites
* Hopefully this goes without saying, but rclone must be installed
* The cloud service (remote) must already be configured with rclone. See the [rclone config documentation](https://rclone.org/docs/) for this
* A systemd environment file (for which your user has read access) is located at `~/.config/rclone/<TEMPLATE ARGUMENT>.env`
* If your template argument is not the same as a remote name, then the `REMOTE_NAME` variable must be set to a valid remote name for the rclone configuration in the associated environment file
* The configuration file for rclone is in one of the two following locations
  * A location specified by the `RCLONE_CONF` variable in the associated environment file
  * its default location (`~/.config/rclone/rclone.conf`) if `RCLONE_CONF` is not specified in the assocaited environment file
* There is a mount directory (that is empty and for which you have write permissions) in one of the two following locations
  * A location specified by the `MOUNT_DIR` variable in the associated environment file
  * its default location (`~/<REMOTE NAME>`) if `MOUNT_DIR` is not specified in the assocaited environment file

## Example 1
For this example, I am assuming rclone is installed and that the remote you have configured is called "dropbox-personal". I am assuming the template argument you are using is "dropbox-personal"

If you can run the command `rclone lsd dropbox-personal:` and get a listing of your top directories, then your remote is configured already.

You will need to make the systemd environment file for the service to read. This can be accomplished with the following command: `touch ~/.config/rclone/dropbox-personal.env`. The file now exists, but does not contain any information. Use whatever editor you want, so that the contents are as follows:

```
MOUNT_DIR=/mnt/user-dropbox
```

You will need to make the directory to mount your remote. Because we specified a `MOUNT_DIR` value, the mount location is not at the default location (`~/dropbox-personal`) but at `/mnt/user-dropbox`  This can be accomplished with the following command: `mkdir /mnt/user-dropbox`

Now that we have satisfied the prerequisites, it is time to mount your remote. you can mount it by issuing the command `systemctl --user start rclone@dropbox-personal`. You should now be able to navigate to `/mnt/user-dropbox` and explore the files you have in your remote.

Once you are sure the mount it is working, you can enable it so that the remote is automatically mounted at login. This is done with the following command `systemctl --user enable rclone@dropbox-personal`.

## Example 2

For this example, I am assuming rclone is installed and that the remote you have configured is called "dropbox-personal". I am assuming the template argument you are using is "foobar"

If you can run the command `rclone lsd dropbox-personal:` and get a listing of your top directories, then your remote is configured already.

You will need to make the systemd environment file for the service to read. This can be accomplished with the following command: `touch ~/.config/rclone/foobar.env`. The file now exists, but does not contain any information. Use whatever editor you want, so that the contents are as follows:

```
REMOTE_NAME=dropbox-personal
MOUNT_DIR=/mnt/user-dropbox
REMOTE_PATH=/some/subdir/in/dropbox-personal
```

You will need to make the directory to mount your remote. Because we specified a `MOUNT_DIR` value, the mount location is not at the default location (`~/dropbox-personal`) but at `/mnt/user-dropbox`  This can be accomplished with the following command: `mkdir /mnt/user-dropbox`

Now that we have satisfied the prerequisites, it is time to mount your remote. you can mount it by issuing the command `systemctl --user start rclone@foobar`. You should now be able to navigate to `/mnt/user-dropbox` and explore the files you have in your remote.

Once you are sure the mount it is working, you can enable it so that the remote is automatically mounted at login. This is done with the following command `systemctl --user enable rclone@foobar`.

# Additional items
## access control
As the script is set up now, only the user that issues the `systemctl --user start rclone@...`/`systemctl --user enable rclone@...` command will be able to access the mounted files. This can be changed with just a little work.

There are two flags that are commented out in the service file, `--allow-other` and `--default-permissions`.

Uncommenting `--allow-other` will allow all users to be able to have full permissions to everything that is mounted.

Chances are, you don't want everyone to be able to do whatever they want in your mounted directory. This is where The `--default-permissions` flag comes into play. This flag makes the mounted files respect the file permissions set on the file system (thus, it is only useful when used with `--allow-other`).

The reason I don't have the `--allow-other` and `--default-permissions` flags included by default is that they will not work with the default system configuration. Before using the `--allow-other` flag, a configuration options needs to be changed. The option is set in `/etc/fuse.conf`. You can check the file to make sure the `user_allow_other` flag is set (and not commented out!). If it is not set, or it is commented out, you will need to have an administrator add it to the `/etc/fuse.conf` file.

## Unmounting rclone mounts mounted with systemd
You will need to be the same user that mounted the rclone mount in order to unmount it.

`systemctl --user stop rclone@...`

## Checking the status of a mount
`systemctl --user status rclone@...`
`journalctl --user rclone@...`

## Enabling auto-mounting
`systemctl --user enable rclone@...`

## Disabling auto mount
You will need to be the same user that enabled auto-mounting the rclone mount in order to diable auto-mounting.

`systemctl --user disable rclone@...`

## When auto-mounting occurs
Mounting of the rclone mounts occurs when a user first logs in to the system. Once all of the user's sessions are dead, the mount will automatically be unmounted.

If you wish for your mounts to be auto-mounted when the system starts, and auto-unmounted when the system is being shut down, then you need to enable linger for that user with the following command

`loginctl enable-linger <USERNAME>`

# Continuing improvement
I have included "TODO" comments where I see a need for improvement. If anyone has any ideas on how to improve this, that would be great!

