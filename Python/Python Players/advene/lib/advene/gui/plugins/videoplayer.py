#
# Advene: Annotate Digital Videos, Exchange on the NEt
# Copyright (C) 2008-2017 Olivier Aubert <contact@olivieraubert.net>
#
# Advene is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# Advene is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Advene; if not, write to the Free Software
# Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
#

from gettext import gettext as _
from gi.repository import Gdk
from gi.repository import Gtk
from gi.repository import Pango
import os

import advene.core.config as config
from advene.gui.views import AdhocView
import advene.gui.util.dialog as dialog
from advene.gui.util import get_pixmap_button, enable_drag_source, decode_drop_parameters, get_drawable

name="Videoplayer view plugin"

def register(controller):
    controller.register_viewclass(VideoPlayer)

class VideoPlayer(AdhocView):
    view_name = _("Video player")
    view_id = 'videoplayer'
    tooltip=_("Complementary video player")

    def __init__(self, controller=None, uri=None, parameters=None):
        super(VideoPlayer, self).__init__(controller=controller)
        self.close_on_package_load = False
        self.contextual_actions = [
            (_("Save view"), self.save_view),
            (_("Save default options"), self.save_default_options),
            (_("Select video file"), self.select_file),
            ]
        self.controller = controller
        self.registered_rules = []

        self.player = None

        # Offset in ms
        self.offset = 0
        self.uri = uri

        # Load options
        opt, arg = self.load_parameters(parameters)
        self.options.update(opt)
        a=dict(arg)
        if uri is None and 'uri' in a:
            self.uri=a['uri']
        if 'offset' in a:
            self.offset=int(a['offset'])

        self.widget = self.build_widget()
        if self.uri is None:
            self.select_file()
        else:
            self.set_file(self.uri)

    def register_callback (self, controller=None):
        """Add the event handlers.
        """
        self.controller.register_slave_player(self)
        self.registered_rules.extend(
            controller.event_handler.internal_rule(event=name,
                                                   method=self.synchronize)
            for name in ('PlayerStart',
                         'PlayerStop',
                         'PlayerPause',
                         'PlayerResume',
                         'PlayerSeek',
                         )
            )

    def unregister_callback (self, controller=None):
        self.controller.unregister_slave_player(self)
        for r in self.registered_rules:
            controller.event_handler.remove_rule(r, type_="internal")

    def synchronize(self, *p):
        """Synchronize the player with the main player.
        """
        if self.player is None:
            return True
        s = self.player.get_stream_information()
        ps=self.controller.player.status
        if s.status != ps:
            # Update status
            if ps == self.player.PauseStatus:
                self.player.update_status("pause")
            elif ps == self.player.PlayingStatus:
                self.player.update_status("start", self.controller.player.current_position_value)
            else:
                self.player.update_status("stop")

        # Synchronize time
        if ( ps in (self.player.PauseStatus, self.player.PlayingStatus)
             and self.controller.player.current_position_value > 0
             and abs( int(s.position) + self.offset - self.controller.player.current_position_value ) > 80 ):
            self.player.update_status("seek", self.controller.player.current_position_value + self.offset)
        return True

    def get_save_arguments(self):
        if self.uri is not None:
            arguments = [ ('uri', self.uri),
                          ('offset', self.offset) ]
        else:
            arguments = [ ('offset', self.offset) ]
        return self.options, arguments

    def select_file(self, *p):
        mp=[ d for d in str(config.data.path['moviepath']).split(os.path.pathsep) if d != '_' ]
        if mp:
            default=mp[0]
        else:
            default=None
        fname = dialog.get_filename(title=_("Select a video file"),
                                    default_dir=default,
                                    filter='video')
        if fname is not None:
            self.set_file(fname)
        return True

    def set_offset(self, offset):
        self.offset_spin.set_value(offset)

    def set_file(self, fname):
        if self.player is None:
            return True
        self.uri = self.controller.locate_mediafile(fname)
        self.player.set_uri(self.uri)
        self.label.set_text(os.path.basename(self.uri))

    def reparent_prepare(self):
        if config.data.os != 'win32':
            # On X11, the socket id changes. Since we destroy the
            # origin socket before having realized the destination
            # one, we cannot maintain a valid xid for the
            # application. Create a temporary window for this.
            self.temp_window = self._popup()
        return True

    def reparent_done(self):
        if config.data.os != 'win32':
            self.drawable.connect_after('realize', self.register_drawable)
            if hasattr(self, 'temp_window') and self.temp_window is not None:
                self.temp_window.destroy()
                self.temp_window = None
        return True

    def close(self, *p):
        p=self.player
        self.player=None
        p.exit()
        super(VideoPlayer, self).close()
        return True

    def register_drawable(self, drawable, container):
        if self.drawable.get_parent_window() is not None:
            self.player.set_widget(self.drawable, container)
        return False

    def update_status(self, status, position=None):
        """Wrapper for update_status to handle offsets.
        """
        if self.player is None or position is None:
            return
        position = position + self.offset
        self.player.update_status(status, position)

    def drag_received_cb(self, widget, context, x, y, selection, targetType, time):
        refTime = None
        if targetType == config.data.target_type['annotation']:
            sources = [ self.controller.package.annotations.get(uri) for uri in str(selection.get_data(), 'utf8').split('\n') ]
            if sources:
                # use first annotation as reference
                refTime = sources[0].fragment.begin
        elif targetType == config.data.target_type['timestamp']:
            data = decode_drop_parameters(selection.get_data())
            refTime = int(data['timestamp'])
        if refTime is not None:
            self.set_offset(refTime - self.controller.player.current_position_value)
        return True

    def _popup(self, *p):
        """Open a popup window for temporary anchoring the player video.
        """
        if self.player is None:
            return None
        w = Gtk.Window()
        vbox = Gtk.VBox()
        d = get_drawable()
        w.add(vbox)
        vbox.add(d)
        w.show_all()
        self.player.set_widget(d, vbox)
        return w

    def build_widget(self):
        vbox=Gtk.VBox()

        self.player = self.controller.playerfactory.get_player()

        self.player.sound_mute()

        self.drawable = get_drawable()

        black = Gdk.Color(0, 0, 0)
        for state in (Gtk.StateType.ACTIVE, Gtk.StateType.NORMAL,
                      Gtk.StateType.SELECTED, Gtk.StateType.INSENSITIVE,
                      Gtk.StateType.PRELIGHT):
            self.drawable.modify_bg (state, black)

        self.drawable.set_size_request(320, 200)


        self.toolbar=Gtk.Toolbar()
        self.toolbar.set_style(Gtk.ToolbarStyle.ICONS)

        # Append the volume control to the toolbar
        def volume_change(scale, value):
            if self.player.sound_get_volume() != int(value * 100):
                self.player.sound_set_volume(int(value * 100))
            return True

        self.audio_volume = Gtk.VolumeButton()
        self.audio_volume.set_value(self.player.sound_get_volume() / 100.0)
        ti = Gtk.ToolItem()
        ti.add(self.audio_volume)
        self.audio_volume.connect('value-changed', volume_change)
        self.toolbar.insert(ti, -1)

        sync_button=Gtk.ToolButton(Gtk.STOCK_CONNECT)
        sync_button.set_tooltip_text(_("Synchronize"))
        sync_button.connect('clicked', self.synchronize)
        self.toolbar.insert(sync_button, -1)

        def offset_changed(spin):
            self.offset = int(spin.get_value())
            return True

        ti = Gtk.ToolItem()
        self.offset_spin = Gtk.SpinButton.new(Gtk.Adjustment.new(self.offset,
                                                                 - 24 * 60 * 60 * 1000,
                                                                 24 * 60 * 60 * 1000,
                                                                 self.controller.frame2time(1),
                                                                 1000,
                                                                 500),
                                              1000, 0)
        self.offset_spin.get_adjustment().connect('value-changed', offset_changed)
        ti.add(self.offset_spin)
        self.offset_spin.set_tooltip_text(_("Offset in ms"))
        self.toolbar.insert(ti, -1)

        self.label = Gtk.Label()
        self.label.set_alignment(0, 0)
        self.label.modify_font(Pango.FontDescription("sans 10"))

        timestamp_button = get_pixmap_button('set-to-now.png')
        timestamp_button.set_tooltip_text(_("Drag and drop to get player time"))
        enable_drag_source(timestamp_button, lambda: int(self.player.get_stream_information().position), self.controller)
        # Cannot use a Gtk.ToolButton since it cannot be drag_source
        ti = Gtk.ToolItem()
        ti.add(timestamp_button)
        self.toolbar.insert(ti, -1)

        black=Gdk.color_parse('black')
        white=Gdk.color_parse('white')
        eb=Gtk.EventBox()
        eb.add(self.label)
        for state in (Gtk.StateType.ACTIVE, Gtk.StateType.NORMAL,
                      Gtk.StateType.SELECTED, Gtk.StateType.INSENSITIVE,
                      Gtk.StateType.PRELIGHT):
            self.label.modify_bg(state, black)
            eb.modify_bg(state, black)
            self.label.modify_fg(state, white)

        vbox.add(self.drawable)
        vbox.pack_start(eb, False, True, 0)
        vbox.pack_start(self.toolbar, False, True, 0)

        self.drawable.connect_after('realize', self.register_drawable)

        # Accept annotation/timestamp drop, to adjust time offset
        vbox.connect('drag-data-received', self.drag_received_cb)
        vbox.drag_dest_set(Gtk.DestDefaults.MOTION |
                           Gtk.DestDefaults.HIGHLIGHT |
                           Gtk.DestDefaults.ALL,
                           config.data.get_target_types('annotation', 'timestamp'),
                           Gdk.DragAction.COPY | Gdk.DragAction.LINK | Gdk.DragAction.MOVE)

        vbox.show_all()
        return vbox
