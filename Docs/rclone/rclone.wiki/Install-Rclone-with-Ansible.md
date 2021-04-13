# Ansible

Rclone could be installed using an Ansible role: [https://galaxy.ansible.com/charliemaiors/rclone-ansible](https://galaxy.ansible.com/charliemaiors/rclone-ansible). 

This role installs Rclone using the package manager if the OS is supported, otherwise will switch to manual installation downloading it from the website.

OSes with Rclone in the package manager (and supported by this role) are:

* FreeBSD (12-11-10-9)
* macOS
* Ubuntu 18
* Debian
* Fedora (29-28-27)
* OpenSUSE leap
* CentOS/RedHat 7
* Archlinux
* Windows

The other distributions are supported via site download.

## Example

You can use this playbook to install rclone on a given set of hosts, in this case under the [rclone] section on the ansible hosts file.

```yaml
- name: Install rclone
  hosts: rclone
  roles:
     - { role: charliemaiors.rclone-ansible }
```