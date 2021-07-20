#!/usr/bin/env python3

import os.path
import yaml

from . import RemotePlayerServer

def main():
    paths = [
        '%USERPROFILE%\\_remoteplayer.yml',
        '$HOME/.remoteplayer.yml',
        '$HOME/.config/remoteplayer/config.yml'
    ]

    paths = list( map( os . path . expandvars, paths ) )

    config_file = ''
    for cfg in paths:
        if os . path . isfile( cfg ):
            config_file = os . path . abspath( cfg )
            break

    server_config = {
        'host':      '0.0.0.0',
        'port':      6688,
        'quiet':     True
    }

    auth_config = {
        'username': 'remote',
        'password': 'remote',
    }

    mpv_config = {}
    media = []

    if config_file:
        print( 'Loading config file from: {}'.format( config_file ) )

        file = open( config_file, 'r' )
        config = yaml.load( file )

        if 'server' in config:
            server_config = config[ 'server' ]

        if 'auth' in config:
            auth_config = config[ 'auth' ]

        if 'mpv' in config:
            mpv_config = config[ 'mpv' ]

        if 'media' in config:
            media = config[ 'media' ]

    rps = RemotePlayerServer( ** mpv_config )
    rps . set_credentials( ** auth_config )

    if media:
        rps . add_media( list = media )

    rps . run( ** server_config )

if __name__ == '__main__':
    main()
