Rclone has an official docker image: [rclone/rclone](https://hub.docker.com/r/rclone/rclone) now.  This is a rclone installed on a lightweight Alpine linux.  This is autobuilt on releases (`latest` tag) and on pushes to master (`beta` tag).

There is a Docker [contrib](https://github.com/rclone/rclone/tree/master/contrib/docker) dir with Docker Compose example manifests.

This is an alphabetical list of community-driven docker images that run rclone for different scenarios.

As these are not maintained by the rclone project please check that they have an up to date version of rclone before using.

# bcardiff/rclone --> now pfidr/rclone
https://hub.docker.com/r/pfidr/rclone/

**bcardiff/rclone is no longer actively maintained**

**pfidr/rclone has all outstanding issues resolved and is running up to date rclone version**

1. schedule sync with a cron, but also
2. limit the time windows the sync should be running,
3. integrate healthchecks.io to monitor if the sync is able to succeed. And
4. abort syncing if the source is empty to avoid possible data loss

# mumiehub/rclone-mount
https://hub.docker.com/r/mumiehub/rclone-mount/

Use rclone mount to make your cloud storage available for containers and your host.

# openbridge/ob_bulkstash
Github: https://github.com/openbridge/ob_bulkstash

Docker Hub: https://hub.docker.com/r/openbridge/ob_bulkstash/

1. [rclone](https://blog.openbridge.com/rclone-keep-an-eye-on-your-files-with-bulk-batch-processing-for-amazon-google-dropbox-and-other-5488b063b2a5) is neatly packed into a Docker image that can be run anywhere Docker can be installed.
2. The container uses Alpine Linux which makes it light and efficient. The image size is < 20mb.
3. The image is designed to take advantage of recent support in rclone to utilize environment variables. This means you don't have to step through the typical config initialization process.
4. The container also uses Monit to ensure that long running processes are monitored under process management. For example, Monit will make sure crond is running in the background and will restart it if it crashed. You can extend Monit to monitor folders, check for file sizes and many other.
5. Configuration can be stored and managed outside the container. Configurations can also be inserted at runtime manually or via a controller script/app
6. You can run a collection of containers running independent tasks via config files. This means you can wrap the Docker service with other apps like bash, python and so forth on your host
7. You can set up things like Amazon Lambda and ECS tasks to control the runtime tasks. Configurations can be encrypted and stored in a service like AWS KMS. Configuration attributes can then be provided by an end user via a front-end web app. For example, you can have a form that collects all the S3 or Google OAuth tokens. A front end is not included :)

# tynor88/rclone
https://hub.docker.com/r/tynor88/rclone/

Docker image to run copy/sync rcloner image.

# tynor88/rclone-mount
https://hub.docker.com/r/tynor88/rclone-mount/

Docker image to use FUSE mount feature exposable to host and other containers. [docs](https://forums.lime-technology.com/topic/56921-support-rclone-mount-with-exposable-fuse-support-for-plex-beta/)

# rayou/rclone
https://hub.docker.com/r/rayou/rclone

minimal docker image, configure it whatever you like.