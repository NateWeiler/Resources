remoteplayer-server - Remote player controllable by RESTful API and built using libMPV

## Why

1) I had problems with KODI (aka. XBMC) when I tried to use iGPU hardware acceleration and without that enabled it could 'eat' 40% of my CPU resources.

2) I am using mpv as everyday media player and I like how it works. Also, libva works on it flawlessly.

## Installation

Just clone this repository and execute:

```
./setup.py install
```

After that you will be able to start server using either

```
remoteplayer-server
```

or

```
python3 -m remoteplayer_server
```

## Configuration

It is easily configurable using YAML file. Server checks for config file in:

```
%USERPROFILE%\_remoteplayer.yml
~/.remoteplayer.yml
~/.config/remoteplayer/config.yml
```

and when none file is found, it fallbacks to default configuration.

There are four main 'categories' in config file:

#### server

* host (string)   - Server hostname
* port (string)   - Server port
* quiet (boolean) - Should server log every incoming request?


#### auth
* username (string) - Username
* password (string) - Password


#### media

List of directories which should be visible to server.

#### mpv

libMPV options. For reference check `man mpv(1)`.



### Example configuration

```yaml
server:
  host:     '0.0.0.0'
  port:     6688
  quiet:    true

auth:
  username: 'remote'
  password: 'remote'

media:
  - '/home/multimedia'
  - '/home/music'
  - 'D:\\Media'

mpv:
  ytdl:        true
  fullscreen:  true
  vo:          'opengl-hq'
  hwdec:       'auto'
```
