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

from advene.util.importer import GenericImporter, register
import advene.core.config as config
import advene.util.helper as helper

from gettext import gettext as _

class EventHistoryImporter(GenericImporter):
    """Event History importer.
    """
    name=_("Event history importer")

    def __init__(self, **kw):
        super(EventHistoryImporter, self).__init__(**kw)

    @staticmethod
    def can_handle(fname):
        return fname == 'event_history'

    def iterator(self, f):
        start=f[0]['timestamp']
        end=start
        id_="Traces"
        schema=self.package.get_element_by_id(id_)
        for e in f:
            typename = e['event_name']
            type_ = self.package.get_element_by_id(typename)
            if type_ is None:
                #Annotation type creation
                self.package._idgenerator.add(typename)
                type_=schema.createAnnotationType(ident=typename)
                type_.author=config.data.userid
                type_.date=helper.get_timestamp()
                type_.title=typename
                type_.mimetype='application/x-advene-structured'
                type_.setMetaData(config.data.namespace, 'color', next(self.package._color_palette))
                type_.setMetaData(config.data.namespace, 'item_color', 'here/tag_color')
                schema.annotationTypes.append(type_)

            d={
                'type': type_,
                'begin': e['timestamp'] - start,
                'duration': 50,
                'timestamp': e['timestamp'],
                'content': '',
            }
            if 'content' in e:
                d['content']=e['content']+'\nposition='+str(e['movietime'])+'\n'
            else:
                d['content']='position='+str(e['movietime'])+'\n'
            if end<e['timestamp']+50:
                end=e['timestamp']+50
            yield d
        #fix package duration
        self.package.cached_duration=end-start

    def process_file(self, filename):
        if self.package is None:
            self.init_package(filename='event_history.xml', annotationtypeid='event')
        id_="Traces"
        title_="Traces"
        schema=self.package.get_element_by_id(id_)
        if schema is None:
            self.package._idgenerator.add(id_)
            schema=self.package.createSchema(ident=id_)
            schema.author=config.data.userid
            schema.date=helper.get_timestamp()
            schema.title=title_
            self.package.schemas.append(schema)
        self.convert(self.iterator(filename))
        return self.package
register(EventHistoryImporter)
