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

import advene.core.config as config
from advene.rules.elements import RegisteredAction

import advene.model.tal.context
import advene.util.helper as helper
from advene.util.tools import unescape_string
import textwrap
from gi.repository import Gtk

name="Default GUI actions"

def register(controller=None):
    #print "Registering default GUI actions"

    ac = DefaultGUIActions(controller)

    controller.register_action(RegisteredAction(
        name="Message",
        method=ac.action_message_log,
        description=_("Display a message"),
        parameters={'message': _("String to display.")},
        defaults={'message': 'annotation/content/data'},
        predefined={'message': (
            ( 'annotation/content/data', _("The annotation content") ),
        )},
        category='popup',
    ))

    controller.register_action(RegisteredAction(
        name="Popup",
        method=ac.action_popup,
        description=_("Display a popup"),
        parameters={'message': _("String to display."),
                    'duration': _("Display duration in ms. Ignored if empty.")},
        defaults={'message': 'annotation/content/data',
                  'duration': 'annotation/fragment/duration'},
        predefined={'message': (
            ( 'annotation/content/data', _("The annotation content") ),
        ),
                    'duration': (
                        ( 'string:1000', _("1 second") ),
                        ( 'annotation/fragment/duration',_("The annotation duration") )
                    )},
        category='popup',
    ))

    controller.register_action(RegisteredAction(
        name="Entry",
        method=ac.action_entry,
        description=_("Popup an entry box"),
        parameters={'message': _("String to display."),
                    'destination': _("Object where to store the answer (should have a content)"),
                    'duration': _("Display duration in ms. Ignored if empty.")},
        defaults={'message': 'annotation/content/data',
                  'destination': 'annotation/related/first',
                  'duration': 'annotation/fragment/duration'},
        predefined=ac.action_entry_predefined,
        category='popup',
    ))

    controller.register_action(RegisteredAction(
        name="PopupGoto",
        method=ac.action_popup_goto,
        description=_("Display a popup to go to another position"),
        parameters={'description': _("General description"),
                    'message': _("String to display."),
                    'position': _("New position"),
                    'duration': _("Display duration in ms. Ignored if empty.")},
        defaults={'description': 'annotation/content/data',
                  'message': 'string:'+_('Go to related annotation'),
                  'position': 'annotation/related/first/fragment/begin',
                  'duration': 'annotation/fragment/duration'},
        predefined=ac.action_popup_goto_predefined,
        category='popup',
    ))

    controller.register_action(RegisteredAction(
        name="PopupURL",
        method=ac.action_popup_url,
        description=_("Display a popup linking to an URL"),
        parameters={'description': _("General description"),
                    'message': _("String to display."),
                    'url': _("URL"),
                    'duration': _("Display duration in ms. Ignored if empty.")},
        defaults={'description': 'annotation/content/data',
                  'message': _('string:Display annotation in web browser'),
                  'url': 'annotation/absolute_url',
                  'duration': 'annotation/fragment/duration'},
        predefined={'description': (
            ('annotation/content/data', _("The annotation content")),
        ),
                    'message': (
                        ('string:'+_('See the Advene website'), _('See the Advene website')),
                        ('string:'+_('See the annotation'), _('See the annotation')),
                    ),
                    'url': (
                        ('string:http://advene.org/', _("The Advene website")),
                        ('annotation/absolute_url', _("The annotation URL")),
                    ),
                    'duration': (
                        ( 'string:1000', _("1 second") ),
                        ( 'annotation/fragment/duration',_("The annotation duration") )
                    )},
        category='gui',
    ))

    controller.register_action(RegisteredAction(
        name="OpenInterface",
        method=ac.action_open_interface,
        description=_("Open an interface view"),
        parameters={'guiview': _("View name (timeline, tree, transcription, browser, webbrowser, transcribe)"),
                    'destination': _("Destination: popup, south, east"),
        },
        defaults={'guiview': 'string:timeline',
                  'destination': 'string:south',
        },
        predefined=ac.action_open_interface_predefined,
        category='gui',
    ))

    controller.register_action(RegisteredAction(
        name="OpenView",
        method=ac.action_open_view,
        description=_("Open a saved view"),
        parameters={'id': _("Identifier of the saved view"),
        },
        predefined=ac.action_open_view_predefined,
        category='gui',
    ))

    controller.register_action(RegisteredAction(
        name="PopupGoto2",
        method=ac.generate_action_popup_goton(2),
        description=_("Display a popup with 2 options"),
        parameters={'description': _("General description"),
                    'message1': _("First option description"),
                    'position1': _("First position"),
                    'message2': _("Second option description"),
                    'position2': _("Second position"),
                    'duration': _("Display duration in ms. Ignored if empty.")
        },
        defaults={'description': 'annotation/content/data',
                  'message1': 'string:' + _('Go to the beginning'),
                  'position1': 'annotation/fragment/begin',
                  'message2': 'string:' + _('Go to the end'),
                  'position2': 'annotation/fragment/end',
                  'duration': 'annotation/fragment/duration',
        },
        predefined=ac.action_popup_goto_predefined,
        category='popup',
    ))

    controller.register_action(RegisteredAction(
        name="PopupGoto3",
        method=ac.generate_action_popup_goton(3),
        description=_("Display a popup with 3 options"),
        parameters={'description': _("General description"),
                    'message1': _("First option description"),
                    'position1': _("First position"),
                    'message2': _("Second option description"),
                    'position2': _("Second position"),
                    'message3': _("Third option description"),
                    'position3': _("Third position"),
                    'duration': _("Display duration in ms. Ignored if empty.")
        },
        defaults={'description': 'annotation/content/data',
                  'message1': 'string:' + _('Go to the beginning'),
                  'position1': 'annotation/fragment/begin',
                  'message2': 'string:' + _('Go to the end'),
                  'position2': 'annotation/fragment/end',
                  'message3': 'string:' + _('Go to related annotation'),
                  'position3': 'annotation/related/fragment/begin',
                  'duration': 'annotation/fragment/duration',
        },
        predefined=ac.action_popup_goto_predefined,
        category='popup',
    ))

    controller.register_action(RegisteredAction(
        name="PopupGotoOutgoingRelated",
        method=ac.action_popup_goto_outgoing_related,
        description=_("Display a popup to navigate to related annotations"),
        parameters={'message': _("String to display."), },
        defaults={'message': 'string:'+_("Choose the related annotation you want to visualise."), },
        category='popup',
    ))

    controller.register_action(RegisteredAction(
        name="CreateBookmark",
        method=ac.action_create_bookmark,
        description=_("Create a bookmark"),
        parameters={'position': _("Bookmark position (in ms)"),
                    'message': _("Bookmark content."), },
        defaults={'message': 'string:'+_("Bookmark"),
                  'position': 'options/controller/player/current_position_value'},
        category='gui',
    ))

class DefaultGUIActions:
    def __init__(self, controller=None):
        self.controller=controller
        self.gui=self.controller.gui

    def log(self, *p):
        self.controller.log(*p)

    def parse_parameter(self, context, parameters, name, default_value):
        """Helper method used in actions.
        """
        if name in parameters:
            try:
                result=context.evaluateValue(parameters[name])
            except advene.model.tal.context.AdveneTalesException as e:
                try:
                    rulename=context.evaluateValue('rule')
                except advene.model.tal.context.AdveneTalesException:
                    rulename=_("Unknown rule")
                    self.log(_("Rule %(rulename)s: Error in the evaluation of the parameter %(parametername)s:") % {'rulename': rulename,
                                                                                                                    'parametername': name})
                    self.log(str(e)[:160])
                    result=default_value
        else:
            result=default_value
        return result

    def related_annotation_expressions(self, controller):
        p=[]
        for t in controller.package.relationTypes:
            p.append( ('annotation/typedRelatedOut/%s/first/fragment/begin' % t.id,
                       _("The %s-related outgoing annotation") % controller.get_title(t)) )
            p.append( ('annotation/typedRelatedIn/%s/first/fragment/begin' % t.id,
                       _("The %s-related incoming annotation") % controller.get_title(t)) )
        return p

    def action_message_log (self, context, parameters):
        """Event Handler for the message action.

        Essentialy a wrapper for the X{log} method.

        The parameters should have a 'message' key.
        """
        message = self.parse_parameter(context, parameters, 'message', _("No message..."))
        message = unescape_string(message)
        self.log (message)
        return True

    def action_open_interface (self, context, parameters):
        """Event Handler for the OpenInterface action.

        The parameters should have a 'guiview' key and a 'destination' key.
        """
        view=self.parse_parameter(context, parameters, 'guiview', None)
        dest=self.parse_parameter(context, parameters, 'destination', 'popup')
        if view is None:
            return True
        if self.controller.gui is not None and view in self.controller.gui.registered_adhoc_views:
            self.gui.open_adhoc_view(view, destination=dest)
        else:
            self.log(_("Error: undefined GUI view %s") % view)
        return True

    def action_open_interface_predefined(self, controller):
        d={
            'guiview': [
                ( 'string:' + ident, view.view_name)
                for (ident, view) in controller.gui.registered_adhoc_views.items()
            ],
            'destination': (
                ('string:popup', _("...in its own window")),
                ('string:east', _("...embedded east of the video")),
                ('string:west', _("...embedded west of the video")),
                ('string:south', _("...embedded south of the video")),
                ('string:fareast', _("...embedded at the right of the window")),
            )
        }
        return d

    def action_open_view (self, context, parameters):
        """Event Handler for the OpenView action.

        The parameters should have a 'id' key.
        """
        view=parameters['id']
        v=self.controller.package.get_element_by_id(view)
        t=helper.get_view_type(v)
        if t == 'static':
            # Static view. If it can be applied to the package, then
            # apply it. Else open the view itself.
            if v.matchFilter['class'] in ('package', '*'):
                ctx=self.controller.build_context()
                url=ctx.evaluateValue('here/view/%s/absolute_url' % v.id)
            else:
                ctx=self.controller.build_context(here=v)
                url=ctx.evaluateValue('here/absolute_url')
            if url:
                self.controller.open_url(url)
        elif t == 'dynamic':
            self.controller.activate_stbv(v)
            p=self.controller.player
            if p.status != p.PlayingStatus:
                self.controller.update_status('start')
        elif t == 'adhoc':
            self.controller.gui.open_adhoc_view(v, 'south')
        else:
            self.log(_("Element %s does not look like a view") % view)

        return True

    def action_open_view_predefined(self, controller):
        get_title=self.controller.get_title
        return {
            'id': [
                ( 'string:' + v.id, get_title(v) )
                for v in controller.package.views
            ],
        }

    def action_popup (self, context, parameters):
        """Popup action.

        Displays a popup with an informational message.
        """
        message=self.parse_parameter(context, parameters, 'message', _("No message..."))
        message=unescape_string(str(message))
        message=textwrap.fill(message, config.data.preferences['gui']['popup-textwidth'])

        duration=self.parse_parameter(context, parameters, 'duration', None)
        if duration == "" or duration == 0:
            duration = None

        w=self.gui.get_illustrated_text(message)

        self.gui.popupwidget.display(widget=w, timeout=duration, title=_("Information popup"))
        return True

    def action_entry (self, context, parameters):
        """Entry action.

        Displays a popup to ask for a text string.
        """
        message=self.parse_parameter(context, parameters, 'message', _("No message..."))
        message=unescape_string(str(message))
        message=textwrap.fill(message, config.data.preferences['gui']['popup-textwidth'])

        destination=self.parse_parameter(context, parameters, 'destination', None)
        if destination is None:
            self.log(_("Empty destination for entry popup: %s") % parameters['destination'])
            return True
        if not hasattr(destination, 'content'):
            self.log(_("Destination does not have a content: %s") % parameters['destination'])
            return True

        duration=self.parse_parameter(context, parameters, 'duration', None)
        if duration == "" or duration == 0:
            duration = None

        def handle_response(button, widget, entry, dest):
            # Update the destination
            dest.content.data = entry.get_text()
            # FIXME: notify element modification
            self.gui.popupwidget.undisplay(widget)
            return True

        v=Gtk.VBox()

        w=self.gui.get_illustrated_text(message)
        v.add(w)
        e=Gtk.Entry()
        e.set_text(destination.content.data)
        v.add(e)
        b=Gtk.Button(stock=Gtk.STOCK_OK)
        b.connect('clicked', handle_response, v, e, destination)
        v.add(b)

        v.show_all()

        self.gui.popupwidget.display(widget=v, timeout=duration, title=_("Entry popup"))
        return True

    def action_entry_predefined(self, controller):
        d= {'message': [
            ( 'annotation/content/data', _("The annotation content") ),
        ],
            'destination': self.related_annotation_expressions(controller),
            'duration': (
                ( 'string:1000', _("1 second") ),
                ( 'annotation/fragment/duration',_("The annotation duration") )
            )}
        return d

    def action_popup_url (self, context, parameters):
        """PopupURL action.

        Displays a popup with a message and a linked URL.
        """
        def handle_response(button, url, widget):
            if url:
                self.controller.open_url(url)
                self.gui.popupwidget.undisplay(widget)
            return True

        description=self.parse_parameter(context, parameters, 'description', _("Follow a link"))
        description=unescape_string(description)
        description=textwrap.fill(description, config.data.preferences['gui']['popup-textwidth'])

        message=self.parse_parameter(context, parameters, 'message', _("Click to open the URL"))
        message=unescape_string(str(message))
        message=textwrap.fill(message, config.data.preferences['gui']['popup-textwidth'])

        url=self.parse_parameter(context, parameters, 'url', 'string:http://advene.org/')
        duration=self.parse_parameter(context, parameters, 'duration', None)
        if duration == "" or duration == 0:
            duration = None

        vbox=Gtk.VBox()

        vbox.pack_start(self.gui.get_illustrated_text(description), False, False, 0)

        b=Gtk.Button(message)
        vbox.pack_start(b, False, True, 0)

        b.connect('clicked', handle_response, url, vbox)

        self.gui.popupwidget.display(widget=vbox, timeout=duration, title=_("URL popup"))
        return True

    def action_popup_goto (self, context, parameters):
        """PopupGoto action.

        Displays a popup with a message and a new possible position.
        """
        def handle_response(button, position, widget):
            self.controller.update_status("seek", position)
            self.gui.popupwidget.undisplay(widget)
            return True

        description=self.parse_parameter(context, parameters, 'description', _("Make a choice"))
        description=unescape_string(description)
        description=textwrap.fill(description, config.data.preferences['gui']['popup-textwidth'])

        message=self.parse_parameter(context, parameters, 'message', _("Click to go to another position"))
        message=unescape_string(str(message))
        message=textwrap.fill(message, config.data.preferences['gui']['popup-textwidth'])

        position=self.parse_parameter(context, parameters, 'position', 0)
        duration=self.parse_parameter(context, parameters, 'duration', None)
        if duration == "" or duration == 0:
            duration = None

        vbox=Gtk.VBox()

        vbox.pack_start(self.gui.get_illustrated_text(description), False, False, 0)

        b=Gtk.Button()
        b.add(self.gui.get_illustrated_text(message, position))
        vbox.pack_start(b, False, True, 0)

        b.connect('clicked', handle_response, position, vbox)

        self.gui.popupwidget.display(widget=vbox, timeout=duration, title=_("Navigation popup"))
        return True

    def generate_action_popup_goton(self, size):
        def generate (context, parameters):
            """Display a popup with 'size' choices."""
            def handle_response(button, position, widget):
                self.controller.update_status("seek", int(position))
                self.gui.popupwidget.undisplay(widget)
                return True

            vbox=Gtk.VBox()

            description=self.parse_parameter(context,
                                             parameters, 'description', _("Make a choice"))
            description=unescape_string(description)
            description=textwrap.fill(description,
                                      config.data.preferences['gui']['popup-textwidth'])

            vbox.add(self.gui.get_illustrated_text(description))

            for i in range(1, size+1):
                message=self.parse_parameter(context, parameters,
                                             'message%d' % i, _("Choice %d") % i)
                message=unescape_string(message)
                message=textwrap.fill(message, config.data.preferences['gui']['popup-textwidth'])

                position=self.parse_parameter(context, parameters, 'position%d' % i, 0)

                b=Gtk.Button()
                b.add(self.gui.get_illustrated_text(message, position))
                b.connect('clicked', handle_response, position, vbox)
                vbox.add(b)

            duration=self.parse_parameter(context, parameters, 'duration', None)
            if duration == "" or duration == 0:
                duration = None

            self.gui.popupwidget.display(widget=vbox, timeout=duration, title=_("Navigation popup"))
            return True
        return generate

    def action_popup_goto_predefined(self, controller):
        p=self.related_annotation_expressions(controller)
        p.extend( [ ('annotation/fragment/begin', _('The beginning of the annotation')),
                    ('annotation/fragment/end', _('The end of the annotation')),
                    ('annotation/query/q_next/first/fragment/begin', _('The next annotation of the same type')),
                    ('annotation/query/q_prev/first/fragment/begin', _('The previous annotation of the same type')) ] )
        return {
            'description': (
                ('annotation/content/data', _("The annotation content")),
            ),
            'message': (),
            'position': p,
            'message1': (),
            'position1': p,
            'message2': (),
            'position2': p,
            'message3': (),
            'position3': p,
            'duration': (
                ( 'string:1000', _("1 second") ),
                ( 'annotation/fragment/duration',_("The annotation duration") )
            )}

    def action_popup_goto_outgoing_related (self, context, parameters):
        """PopupGotoOutgoingRelated action.

        Displays a popup proposing to navigate to related outgoing annotations.
        """
        def handle_response(button, position, widget):
            self.controller.update_status("seek", position)
            self.gui.popupwidget.undisplay(widget)
            return True

        annotation=context.evaluateValue('annotation')
        if annotation is None:
            return True
        relations=annotation.outgoingRelations
        if not relations:
            return True

        message=self.parse_parameter(context, parameters, 'message', _("Choose the related annotation you want to visualise."))
        message=unescape_string(message)
        message=textwrap.fill(message, config.data.preferences['gui']['popup-textwidth'])

        vbox=Gtk.VBox()

        vbox.pack_start(self.gui.get_illustrated_text(message), False, False, 0)

        for r in relations:
            a=r.members[-1]
            b=Gtk.Button()
            t=''
            if r.content.data:
                t=' (%s)' % r.content.data
                c=_("Through %(title)s%(relation_content)s:\n%(annotation_content)s") % {
                    'title': self.controller.get_title(r.type),
                    'relation_content': t,
                    'annotation_content': self.controller.get_title(a) }
                b.add(self.gui.get_illustrated_text(c, a.fragment.begin))
                vbox.pack_start(b, False, True, 0)
                b.connect('clicked', handle_response, a.fragment.begin, vbox)

        self.gui.popupwidget.display(widget=vbox, timeout=annotation.fragment.duration, title=_("Relation navigation"))
        return True


    def action_create_bookmark(self, context, parameters):
        """CreateBookmark action.

        Create a boomark.
        """
        position=self.parse_parameter(context, parameters, 'position', self.controller.player.current_position_value)
        message=self.parse_parameter(context, parameters, 'message', _("New bookmark"))

        self.controller.gui.create_bookmark(position, comment=message)
        return True
