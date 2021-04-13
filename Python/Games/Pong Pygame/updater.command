#! /bin/bash

# Mac fuckery
cd -- "$(dirname "$BASH_SOURCE")"

# Move all files to folder to be deleted
mkdir old && mv * old/
rm -rf old

# Download, extract and then delete the archive
curl -O https://codeload.github.com/Frinksy/pong-pygame/zip/master
unzip master
rm -rf master


mv pong-pygame-master/* .
rmdir pong-pygame-master
