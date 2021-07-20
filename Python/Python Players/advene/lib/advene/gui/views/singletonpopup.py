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
"""Singleton popup.
"""

import time

from gi.repository import Gtk

from gettext import gettext as _
from advene.gui.views import AdhocView

class SingletonPopup(AdhocView):
    """View displaying a unique popup.
    """
    view_name = _("SingletonPopup")
    view_id = 'singletonpopup'
    def __init__ (self, controller=None, parameters=None, autohide=False):
        super(SingletonPopup, self).__init__(controller=controller)
        self.close_on_package_load = False

        self.controller=controller
        # Hide the popup if there is no widget
        self.autohide = autohide
        self.widget=None
        # When should the widget be destroyed ?
        self.hidetime=None
        self.widget=self.build_widget()

    def close(self, *p):
        return False

    def display(self, widget=None, timeout=None, title=None):
        """Display the given widget.

        timeout is in ms.
        """
        # Another widget is displayed.
        # Destroy it before going on.
        if self.widget is not None:
            self.autohide=False
            self.undisplay()
            self.autohide=True
        self.widget=widget
        self.vbox.add(widget)
        if timeout is not None and timeout != 0:
            self.hidetime=time.time() + (int(timeout) / 1000.0)
        self.show()
        return True

    def undisplay(self, widget=None):
        if self.widget is not None:
            self.widget.destroy()
            self.widget=None
        self.hidetime=None
        if self.autohide:
            self.widget.hide()
        return True

    def hide(self, *p, **kw):
        self.undisplay()
        self.widget.hide()
        return True

    def show(self, *p, **kw):
        self.widget.show_all()
        return True

    def update_position(self, pos):
        # This method is regularly called. We use it as a side-effect to
        # remove the widget when the timeout expires.
        if self.hidetime is not None and time.time() >= self.hidetime:
            self.undisplay()
        return True

    def build_widget(self):
        mainbox=Gtk.VBox()

        self.vbox = Gtk.VBox()
        mainbox.add(self.vbox)

        self.widget=Gtk.Label(label=_("Navigation popup"))
        self.vbox.add(self.widget)

        return mainbox
