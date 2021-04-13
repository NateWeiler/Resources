#!/usr/bin/python -u
# WMD 0.1.2 - http://ForTheWiiN.org
# This is a major rewrite of WMD, the code now being separated into many files
# At this time, it is less functional than the old 0.0.4 series, but easier to work on

# Major features that still need to be reactivated:
#  uinput
#  CommandMapper
#  Config
#  Sequencer

import sys
import thread
sys.path.append('.')

from wmd.Config import CFG
from wmd.UI.UIManager import UIManager
from wmd.Wiimote.WMManager import WMManager
from wmd.EVDispatcher import EVDispatcher
from wmd.MotionSensing import MSManager
from wmd.Pointer import POManager
from wmd.CommandMapper import CommandMapper

class WMD:
  """WMD is now composed of a series of somewhat separated modules"""

  def __init__( self ):
    cf = CFG  # This contains the configuration. At this time, many config variables are being ignored.

    ev = EVDispatcher( cf )  # In a way this is the core of the program. It dispatches events between each module
                             # allowing for communications between each part of the program. It also loads
			     # EventBridges, which route events like mouse position or clicks to the OS

    ui = UIManager( cf, ev ) # Loads one or more user interfaces
   
    cm = CommandMapper( cf, ev ) # Maps Wiimote keys and other events to commands like key presses or clicks

    while(True):
      btaddr = sys.stdin.readline()
      cf['MY_WIIMOTE_ADDR'] = btaddr.rstrip()
      if (cf['MY_WIIMOTE_ADDR']):
        wm = WMManager( cf, ev ) # Handles the Wiimote; connects to it, manages wiimote state and mode, parses wiimote reports
        #ms = MSManager( cf, ev, wm.id ) # Motion analysis
        po = POManager( cf, ev, wm.id ) # Handles the pointer, receives WM_IR, sends out ABS_POS absolute position reports
      
        if wm.connect() and wm.setup():
          thread.start_new_thread(wm.main_loop, ())

    wm.disconnect()

wmd = WMD()
