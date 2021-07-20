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
"""Undo manager.

It provides a basic framework for simple undos.
"""
import logging
logger = logging.getLogger(__name__)

from advene.model.annotation import Annotation
from advene.model.fragment import MillisecondFragment
from advene.model.view import View
from advene.model.query import Query
from pickle import dumps, loads

name="Undo Manager"

def register(controller):
    controller.undomanager=UndoHistory(controller)
    controller.undomanager.register()

class UndoHistory:
    def __init__(self, controller=None):
        self.controller=controller

        # FIXME: history and _edits should be specific to each package

        # In history, store triples (action, element, values)
        # where action is 'batch', 'changed', 'deleted' or 'created'.
        # If action is 'batch', then its element is the batch id, and
        # its values is a history-like structure.
        self.history=[]

        # Hold intermediate batch_history. Only 1 batch can be active
        # at a time.
        self.batch_id=None
        self.batch_history=None

        self._rules=[]
        self._edits={}

    def register(self):
        """Register to the appropriate events.
        """
        for (event, method) in (
                ('EditSessionStart', self.element_edit_begin),
                ('EditSessionEnd', self.element_edit_cancel),
                ('ElementEditDestroy', self.element_edit_cancel),

                ('AnnotationCreate', self.element_create),
                ('AnnotationEditEnd', self.element_edit_end),
                ('AnnotationDelete', self.element_delete),

                ('ViewCreate', self.element_create),
                ('ViewEditEnd', self.element_edit_end),
                ('ViewDelete', self.element_delete),

                ('QueryCreate', self.element_create),
                ('QueryEditEnd', self.element_edit_end),
                ('QueryDelete', self.element_delete),

            ):
            r=self.controller.event_handler.internal_rule(event=event, method=method)
            r.immediate=True
            self._rules.append(r)

    def unregister(self):
        for r in self._rules:
            self.controller.event_handler.remove_rule(r, 'internal')

    def get_cached_representation(self, el):
        """Return a cached representation of an element.
        """
        d={}
        if hasattr(el, 'content'):
            d['content']=str(el.content.data)
            d['mimetype']=el.content.mimetype
        if hasattr(el, 'fragment'):
            d['begin']=int(el.fragment.begin)
            d['end']=int(el.fragment.end)
        if hasattr(el, 'tags'):
            d['tags']=dumps(el.tags)
        for a in ('id', 'title', 'author', 'date', 'viewableClass', 'type'):
            if hasattr(el, a):
                d[a]=getattr(el, a)
        return d

    def element_edit_begin(self, context, parameters):
        """Record the element values before edition.
        """
        el=context.evaluateValue('element')
        self._edits[el]=self.get_cached_representation(el)
        logger.debug("Recording cached for %s", el)

    def element_edit_cancel(self, context, parameters):
        """Remove the value from the cache.
        """
        el=context.evaluateValue('element')
        try:
            del self._edits[el]
            logger.debug("Removing cached value for %s", el)
        except KeyError:
            pass

    def element_edit_end(self, context, parameters):
        """Record the modified elements.
        """
        if context.globals.get('undone'):
            # The change is done in the context of an Undo.
            # Do not record it.
            logger.debug("EditEnd in Undo context")
            return
        batch=context.globals.get('batch', None)
        if batch:
            if batch == self.batch_id:
                history=self.batch_history
            else:
                self.batch_id=batch
                self.batch_history=[]
                history=self.batch_history
                self.history.append( ('batch', batch, history) )
        else:
            history=self.history

        event=context.evaluateValue('event')
        el=event.replace('EditEnd', '').lower()
        element=context.evaluateValue(el)
        if element in self._edits:
            cached=self._edits[element]
            new=self.get_cached_representation(element)
            changed=[ (k, v) for (k, v) in cached.items() if new[k] != v ]
            # Store changed elements in history
            history.append( ('changed', element, changed) )
            self._edits[element]=new
            logger.debug("Saving diff for %s", element)

    def element_create(self, context, parameters):
        """Record the created element id.
        """
        if context.globals.get('undone'):
            # The change is done in the context of an Undo.
            # Do not record it.
            logger.debug("Create in Undo context")
            return
        event=context.evaluateValue('event')
        el=event.replace('Create', '').lower()
        element=context.evaluateValue(el)
        batch=context.globals.get('batch', None)
        if batch:
            if batch == self.batch_id:
                history=self.batch_history
            else:
                self.batch_id=batch
                self.batch_history=[]
                history=self.batch_history
                self.history.append( ('batch', batch, history) )
        else:
            history=self.history
            # Implicitly close a previous batch_history
            if self.batch_id is not None:
                self.batch_id=None
                self.batch_history=[]

        # Store created elements in history.
        history.append( ('created', element, element.id) )

    def element_delete(self, context, parameters):
        """Record the deleted elements.
        """
        if context.globals.get('undone'):
            # The change is done in the context of an Undo.
            # Do not record it.
            logger.debug("Delete in Undo context")
            return
        event=context.evaluateValue('event')
        el=event.replace('Delete', '').lower()
        element=context.evaluateValue(el)
        batch=context.globals.get('batch', None)
        if batch:
            if batch == self.batch_id:
                history=self.batch_history
            else:
                self.batch_id=batch
                self.batch_history=[]
                history=self.batch_history
                self.history.append( ('batch', batch, history) )
        else:
            history=self.history
            # Implicitly close a previous batch_history
            if self.batch_id is not None:
                self.batch_id=None
                self.batch_history=[]

        if element in self._edits:
            # Store deleted elements in history. We store here the
            # element type (annotation, view...) as second parameter
            history.append( ('deleted', el, self._edits[element]) )
            del self._edits[element]
            logger.debug("Saving content for %s", el)

    def log(self, *p):
        self.controller.log("UndoManager: " + str(p))

    def undo(self, operation=None):
        """Undo the last operation.
        """
        if operation is not None:
            (action, element, data)=operation
        else:
            if not self.history:
                return
            (action, element, data)=self.history.pop()

        if action == 'changed':
            for (k, v) in data:
                if k in ('id', 'title', 'author', 'date', 'type'):
                    setattr(element, k, v)
                elif k == 'content':
                    element.content.data=v
                elif k == 'mimetype':
                    element.content.mimetype=v
                elif k == 'begin':
                    element.fragment.begin=v
                elif k == 'end':
                    element.fragment.end=v
                elif k == 'tags':
                    element.tags=loads(v)
            if isinstance(element, Annotation):
                self.controller.notify('AnnotationEditEnd', annotation=element, undone=True)
            elif isinstance(element, View):
                self.controller.notify('ViewEditEnd', view=element, undone=True)
            elif isinstance(element, Query):
                self.controller.notify('QueryEditEnd', query=element, undone=True)
        elif action == 'created':
            self.controller.delete_element(element, undone=True)
        elif action == 'deleted':
            if element == 'annotation':
                # Re-create the annotation
                el=self.controller.package.createAnnotation(
                    ident=data['id'],
                    # FIXME: should check that the type still exists.
                    type=data['type'],
                    author=data['author'],
                    date=data['date'],
                    fragment=MillisecondFragment(begin=data['begin'],
                                                 end=data['end']))
                el.content.data=data['content']
                if 'tags' in data:
                    el.tags=loads(data['tags'])
                self.controller.package.annotations.append(el)
                el.complete=True
                self.controller.notify('AnnotationCreate', annotation=el, undone=True)
            elif element == 'view':
                # Re-create the view
                el=self.controller.package.createView(
                    ident=data['id'],
                    author=data['author'],
                    date=data['date'],
                    clazz=data['viewableClass'],
                    # FIXME: missing 1 item from matchfilter
                    content_mimetype=data['mimetype'],
                    )
                el.title=data['title']
                el.content.data=data['content']
                el.content.mimetype=data['mimetype']
                if 'tags' in data:
                    el.tags=loads(data['tags'])
                self.controller.package.views.append(el)
                self.controller.notify('ViewCreate', view=el, undone=True)
            elif element == 'query':
                # Re-create the query
                el=self.controller.package.createQuery(ident=data['id'])
                el.author=data['author']
                el.date=data['date']
                el.title=data['title']
                el.content.mimetype=data['mimetype']
                el.content.data=data['content']
                if 'tags' in data:
                    el.tags=loads(data['tags'])
                self.controller.package.queries.append(el)
                self.controller.notify('QueryCreate', query=el, undone=True)
            else:
                self.log("Unknown element %s for undoing delete" % element)
        elif action == 'batch':
            for op in data:
                self.undo(operation=op)
            del data[:]
        else:
            self.log("Unknown operation %s for undo" % action)
