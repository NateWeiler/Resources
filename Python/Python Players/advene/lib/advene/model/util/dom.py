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

import xml.dom
TEXT_NODE = xml.dom.Node.TEXT_NODE
ELEMENT_NODE = xml.dom.Node.ELEMENT_NODE

def printElementSource(element, stream):
    for e in element.childNodes:
        e.writexml(stream)

def printElementText(element, stream):
    if element.nodeType is TEXT_NODE:
        stream.write(element.data)
    elif element.nodeType is ELEMENT_NODE:
        for e in element.childNodes:
            printElementText(e, stream)
