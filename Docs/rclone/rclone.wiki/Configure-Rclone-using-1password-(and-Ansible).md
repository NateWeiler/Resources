# Introduction

Rclone store (encrypting sensitive parts) all the information about remotes in the configuration file, this could be copied among different installations to propagate the access and visibility to the same remotes.

The configuration file must be stored in a safe place, like [1password](https://1password.com/) documents. On fresh installation you have to retrieve the configuration using 1password app or CLI and copy it to the new box.

## Using Ansible

You could use Ansible to install Rclone (See [here](https://github.com/ncw/rclone/wiki/Install-Rclone-with-Ansible)) and exploiting the new ```onepassword_facts```module you can configure directly it using the onepassword command line on the host machine. You can find a sample playbook on [Github](https://github.com/charliemaiors/rclone-onepassword). The only requirements are:

* ```op``` binary on the host machine, already configured and logged in.
* Ansible
* Your Rclone configuration stored on a 1password document.