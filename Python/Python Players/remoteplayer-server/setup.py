#!/usr/bin/env python3

from setuptools import setup, Command
import os.path

setup(
    name = 'remoteplayer_server',
    version = '0.1.0',
    description = "Remote player controllable by RESTful API and built using libMPV",
    author = 'MarWit',
    url = 'https://github.com/MarWit/remoteplayer-server',
    license = 'MIT',
    packages = [ 'remoteplayer_server' ],
    install_requires = [
        'python-mpv',
        'PyYAML',
        'bottle',
    ],
    entry_points = {
        'console_scripts': [ 'remoteplayer-server = remoteplayer_server.__main__:main' ]
    }
)
