from wmd.Wiimote.Backends.PyBlueZ import WiimoteBT_PyBlueZ
from wmd.Wiimote.Input import ReportParser, WiimoteState
from wmd.Wiimote.Output import WiimoteMode
from wmd.Common import *

import time

class WMManager:
  go = 1
  
  def __init__( self, cf, ev ):
    self.cf = cf
    self.ev = ev
    self.id = cf['NEXT_WIIMOTE_ID'];
    cf['NEXT_WIIMOTE_ID'] += 1;

    self.wmstate = WiimoteState( self.ev, self.id )
    self.parser = ReportParser( self.ev, self.wmstate, self.id )
    self.ev.subscribe( EV_SHUTDOWN, self.ev_shutdown )
    
  def connect( self ):
    self.backend = WiimoteBT_PyBlueZ( self.cf )
    self.ev.send( *UI_INFO_CONNECTING + [self.id] )

    addr = self.backend.get_addr( )

    if addr and self.backend.connect( addr ):
      self.running = True;
      self.mode = WiimoteMode( self.ev, self.backend, self.id )
      self.mode.leds.toggle( 0 )

      self.ev.send( *UI_INFO_CONNECTED + [self.id] )
      self.ev.send( SET_LEDS, self.id, self.id )
      return 1

  def setup( self ):
    self.mode.ir.on()
    return 1

  def main_loop( self ):
    cycles = 0

    while self.go:
      try:
        data = self.backend.receive()
      except Exception, reason:
        print "Wiimote " + str(self.id) + " fail: " + str(reason);
        self.running = False;
        break;
      # Seems to cause intermittent lag, for no real benefit
      #time.sleep(0.001)
      if len(data):
        self.parser.parse( data )
	cycles += 1
    return cycles

  def disconnect( self ):
    self.backend.disconnect();
    self.go = False;

  def ev_shutdown( self, null, id ):
    self.disconnect();
    
#    WiimoteBT.disconnect()
#    print "Wiimote %d flushing %d" % (self.id, 1000)
#    for x in range(1000):
#      data = self.backend.receive()
#    print "Wiimote %d flushed." % self.id
#      led_on(3)
#      start_time = time.time()
#      read_flash(1, 0, 0x16, 8)
#      cycles = main_loop()
#      end_time = time.time()


