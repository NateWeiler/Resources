### Debian or Ubuntu, system-wide install

Urwid is packaged as python-urwid in Debian and Ubuntu. Use your favorite package manager or issue the following command as root:

```sh
apt-get install python-urwid
```

### With [pip](https://pypi.python.org/pypi/urwid/)
```
pip install urwid
```

### Other operating systems, system-wide install

Download and extract the Urwid tarball, then run the following commands in the urwid-X.Y.Z directory as root:

```sh
python setup.py install
```

SuSE users please note: SuSE Linux may not come with the curses library installed. You will need to install the ncurses and python-curses packages before you can use Urwid's curses_display module.

### Local install

If you don't have root access or you don't want to do a system wide install, you can download and extract the Urwid tarball, then copy the inner urwid directory into the directory of each program that needs to use it. 