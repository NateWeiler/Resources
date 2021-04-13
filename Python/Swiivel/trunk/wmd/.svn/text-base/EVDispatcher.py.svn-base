#from wmd.EventBridges.PyXlib import EventBridge_PyXlib
#from wmd.EventBridges.uinput import EventBridge_uinput
from wmd.Common import *

class EVDispatcher:
  valid_evtypes = [ # Accept only these event types
    WM_IR, WM_ACC, WM_BT,
    UI_INFO, 
    ABS_POS, SET_LED, SET_LEDS,
    EV_SHUTDOWN,
    EVBR_KEYUP, EVBR_KEYDOWN, WMDPOWER
  ] # To create a new event type, you must add it to Common.py

  subs = [{}]

  def __init__( self, cf ):
    self.cf = cf
#    if self.cf['IO_MODES']['XLIB']:
#      self.xlib = EventBridge_PyXlib( self, cf )

#    if self.cf['IO_MODES']['UINPUT']:
#      self.uinput = EventBridge_uinput( self, cf )

  # Always sends to "0" subscribers; conditionally also to id subscribers.
  def send( self, evtype, payload, id=0 ):
    if evtype in self.valid_evtypes:
      dests = []
      if self.subs[0].has_key( evtype ):
        dests += self.subs[0][evtype]
      if (id >0 and len(self.subs) > id and self.subs[id].has_key( evtype )) :
        dests += self.subs[id][evtype]
      for dest in dests:
        dest( payload, id )
    else:
      log( LOG_ERR, "%s is not a valid event type" % ( evtype ) )

  # if id is 0 or not set, subscribe to all events.  Otherwise, subscribe to events tagged with the given id.
  def subscribe( self, evtype, callback, id=0 ):
    while (len(self.subs) <= id):
      self.subs.append({})
    if self.subs[id].has_key( evtype ):
      self.subs[id][evtype].append( callback )
    else:
      self.subs[id][evtype] = [ callback ]
    

