from time import time as time
from urllib.parse import unquote as decode_uri_component
import json
import os.path

import bottle
import mpv

class RemotePlayerServer( object ):
    app = bottle . default_app( )
    media_folders = []
    playlist_timestamp = time( )

    credentials = ( 'remote', 'remote' )

    def __init__( self, **mpv_config ):
        # Bind all routes to theirs methods

        bottle . route( '/play' )( self . play_handler )
        bottle . route( '/play/<media:int>' )( self . play_handler )
        bottle . route( '/play/<media:path>' ) ( self . play_handler )
        bottle . route( '/play_next/<media:path>' )( self . play_next_handler )
        bottle . route( '/pause' )( self . pause_handler )
        bottle . route( '/stop' )( self . stop_handler )
        bottle . route( '/clear' )( self . clear_handler )
        bottle . route( '/next' )( self . next_handler )
        bottle . route( '/previous' )( self . previous_handler )
        bottle . route( '/volume' )( self . volume_handler )
        bottle . route( '/volume/<volume:re:[+-][0-9]{1,3}>' )( self . volume_handler )
        bottle . route( '/seek' )( self . seek_handler )
        bottle . route( '/seek/<seek:float>' )( self . seek_handler )
        bottle . route( '/status' )( self . status_handler )
        bottle . route( '/playlist' )( self . playlist_handler )
        bottle . route( '/list' )( self . list_handler )
        bottle . route( '/list/<path:path>' )( self . list_handler )
        bottle . route( '/subtitles' )( self . subtitles_handler )
        bottle . route( '/subtitles/<idx:int>' )( self . subtitles_handler )

        # Initialize libMPV

        self . player = mpv . MPV( **mpv_config )

    def run( self, host = 'localhost', port = 6688, quiet = True ):
        """Wrapper for bottle.run()

        @arg host       Server host
        @arg port       Server port
        """
        print( "RemotePlayer's server is running on {}:{}!".format( host, port ) )

        bottle . run(
            host   = host,
            port   = port,
            quiet  = quiet
        )

    def set_credentials( self, username = 'remote', password = 'remote' ):
        self . credentials = (username, password)


    def authentication_needed( func ):
        """Decorator for easier authentication"""
        def wrapper( self, *args, **kwargs ):
            auth = bottle . request . auth or ( None, None )

            if auth == self . credentials:
                return func( self, *args, **kwargs )

            error = bottle . HTTPError( 401, 'Access denied' )
            error . add_header( 'WWW-Authenticate', 'Basic realm="private"' )

            return error

        return wrapper

    def add_media( self, folder = None, list = None ):
        """Adds new media folder to whitelist

        @arg folder     (optional) Folder path
        @arg list       (optional) List of folders paths
        """
        if folder:
            folder = os . path . abspath( folder )
            self . media_folders . append( folder )
        elif list:
            list = map( os . path . abspath, filter( os . path . isdir, list ) )
            self . media_folders . extend( list )

    def check_media( self, media ):
        """Checks if given media is valid

        @arg media      Filepath or URL to media file

        @return         Absolute path to media file or 'None' if invalid.
        """
        ALLOWED_PROTOCOLS = ( 'http://', 'https://', 'ftp://' )

        media = decode_uri_component( media )

        if media . startswith( ALLOWED_PROTOCOLS ):
            return media

        real_media = os . path . abspath( media )

        if os . path . isfile( real_media ):
            base = os . path . dirname( real_media )

            if real_media . startswith( tuple( self . media_folders ) ):
                return real_media

        for folder in self . media_folders:
            real_media = os . path . join( folder, media )

            if os . path . isfile( real_media ):
                return self . check_media( real_media )

        return None

    def check_folder( self, path ):
        """Checks if given folder is valid

        @arg path       Path to media folder

        @return         Dictionary with below scheme if path is valid:
                        {
                            'current':      Current directory
                            'previous':     Previous directory
                            'is_file':      Is given path a file?
                            'output':       Filepath or list of directories
                        }

                        otherwise None
        """
        def pack_dir( fullpath, basename = None ):
            return dict( fullpath = fullpath, basename = basename or os . path . basename( fullpath ) )

        out = {}

        if not path:
            out[ 'previous' ] = out[ 'current' ] = ""
            out[ 'is_file' ] = False
            out[ 'output' ] = [ pack_dir( e ) for e in self . media_folders ] # Precache this

            return out

        path = decode_uri_component( path )
        path = os . path . abspath( path )

        if not os.path.exists( path ):
            return None

        if path . startswith( tuple( self . media_folders ) ):
            out[ 'is_file' ] = os . path . isfile( path )

            if out[ 'is_file' ]:
                out[ 'current' ] = os . path . dirname( path )
                out[ 'previous' ] = os . path . dirname( out[ 'current' ] )
                out[ 'output' ] = path
            else:
                out[ 'current' ] = path
                out[ 'previous' ] = os . path . dirname( path )

                dirs = filter( lambda e: e[ 0 ] != '.', os . listdir( path ) )
                out[ 'output' ] = [ pack_dir( os . path . join( path, ele ), ele ) for ele in dirs ]

            if not out[ 'previous' ] . startswith( tuple( self . media_folders ) ):
                out[ 'previous' ] = ''

            return out

        return None

    def create_response( self, handler, response = 'ok', error = False ):
        """Function for creating simple JSON responses.

        @arg handler        Handler name
        @arg response       Response message
        @arg error          Did an error occurred? ( def. 'False' )

        @return             JSON string which represents created response
        """
        return json . dumps( { handler : { 'error': error, 'response': response } } )

    @authentication_needed
    def play_handler( self, media = None ):
        if media:
            self . playlist_timestamp = time( )

            if isinstance( media, int ):
                if media > 0 and media < len( self . player . playlist ):
                    self . player . playlist_pos = media
                else:
                    return self . create_response( 'play', 'Invalid playlist index.', True )
            else:
                real_media = self . check_media( media )

                if real_media:
                    self . player . pause = False
                    self . player . play( real_media )
                else:
                    return self . create_response( 'play', 'Invalid path or access restricted.', True )
        elif self . player. pause:
            self . player . pause = False
        elif len( self . player . playlist ) > 0:
            self . player . playlist_pos = self . player . playlist_pos or 0

        return self . create_response( 'play' )

    @authentication_needed
    def play_next_handler( self, media ):
        real_media = self . check_media( media )

        if real_media:
            self . playlist_timestamp = time()
            self . player . playlist_append( real_media )

            return self . create_response( 'play_next' )

        return self . create_response( 'play_next', 'Invalid path or access restricted.', True )

    @authentication_needed
    def pause_handler( self ):
        self . player . pause = not self . player . pause
        return self . create_response( 'pause' )

    @authentication_needed
    def stop_handler( self ):
        self . player . pause = False
        self . player . play( '' )
        self . player . playlist_clear( )

        self . playlist_timestamp = time( )

        return self . create_response( 'stop' )

    @authentication_needed
    def clear_handler( self ):
        self . player . playlist_clear( )

        self. playlist_timestamp = time( )

        return self . create_response( 'clear' )

    @authentication_needed
    def next_handler( self ):
        if len( self.player.playlist ) > 0:
            self . player . playlist_next( )

        return self . create_response( 'next' )

    @authentication_needed
    def previous_handler( self ):
        if len( self.player.playlist ) > 0:
            self . player . playlist_prev( )

        return self . create_response( 'previous' )

    @authentication_needed
    def volume_handler( self, volume = None ):
        if volume:
            op = volume[ 0 ]
            volume = int( volume[ 1: ] )

            if op == '+':
                self . player . volume = min( self . player . volume_max, self . player . volume + volume )
            else:
                self . player . volume = max( 0, self . player . volume - volume )

            return self . create_response( 'volume' )
        else:
            return self . create_response( 'volume', int( self . player . volume ) )

    @authentication_needed
    def seek_handler( self, seek = None ):
        if seek:
            self . player . time_pos = seek
            return self . create_response( 'seek' )
        else:
            return self . create_response( 'seek', self . player . time_pos )

    def status_handler( self ):
        current_file =  self . player[ 'media-title' ] or self . player . filename
        if current_file:
            current_file = current_file . decode( 'utf-8' )

        player_status = {
            'playing':             current_file or "---",
            'paused':              self . player . pause,
            'position':            self . player . time_pos or 0.0,
            'duration':            self . player . duration or 0.0,
            'volume':              self . player . volume,
            'playlist_timestamp':  int( self . playlist_timestamp )
        }

        return self . create_response( 'status', player_status )

    def playlist_handler( self ):
        return self . create_response( 'playlist', list( map( lambda e: os . path . basename( e.decode( 'utf-8' ) ), self . player . playlist_filenames ) ) )

    def list_handler( self, path = None ):
        out = self . check_folder( path )

        if out != None:
            return self . create_response( 'list', out )
        else:
            return self . create_response( 'list', 'Invalid path or access restricted.', True )

    @authentication_needed
    def subtitles_handler( self, idx = None ):
        if idx != None:
            self . player . sub = str( idx )
            return self . create_response( 'subtitles' )
        else:
            track_list = sorted( self . player . track_list, key = lambda e: e[ 'id' ]  )
            subs = filter( lambda e: e[ 'type' ] == b'sub', track_list )
            subs = map(
                lambda e: {
                    'name': e[ 'title' ].decode( 'utf-8' ),
                    'lang': e[ 'lang' ].decode( 'utf-8' ) if 'lang' in e else 'und'
                }, subs
            )

            return self . create_response( 'subtitles', list( subs ) )
