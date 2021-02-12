the goal is to use your cellphone as a multimedia dlna server.
whereever you go, instant party...
then most any media player like vlc can stream videos.
 
this is a high-level wiki, if you want more details, let me know

1. install termux - enables you to run many linux apps on your cellphone.
https://play.google.com/store/apps/details?id=com.termux
2. i suggest that you enable ssh server.
https://wiki.termux.com/wiki/Remote_Access
3. install rclone
`pkg install rclone`
4. you will need a config file for rclone.
you can copy your existing config file from your computer
or
you can create a new config 
5. run your dlna server
`rclone serve dlna remote:`
6. open your media app of choice and look for the dlna server.
i use vlc on ios, windows, linux, and my cellphone.

if your do not have good access to internet, then you would not be able to serve files from the cloud.
in this case, create a local remote on the cellphone's sd card and copy media to that folder.
i have a local crypted remote on my sd card.
now you can share your files without accessing the internet
`rclone serve dlna localcryptedremote:`

