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
import time

from advene.model.constants import adveneNS
import advene.model.modeled as modeled
import advene.model.viewable as viewable

from advene.model.util.auto_properties import auto_properties

class AbstractFragment(viewable.Viewable.withClass('fragment')):
    """Common superclass for every fragment class.
    """

    #
    # Static methods
    #

    class filter:
        """
        Return an iterator over all the _annotations_ having a fragment from this class.
        """

        __slots__ = [
            '_filter__cls',
            '_filter__iter',
        ]

        def __init__ (self, cls, annotations):
            """
            Constructor.
            xFragment.filter () takes only the _annotations_ argument, since it is a
            classmethod.
            """
            self.__cls = cls
            self.__iter = iter(annotations)

        def __iter__ (self):
            """
            Iterator implementation
            """
            return self

        def __next__ (self):
            """
            Iterator implementation
            """
            cls = self.__cls
            it = self.__iter
            while True:
                a = next(it)
                if isinstance (a.getFragment (), cls):
                    return a

    filter = classmethod(filter)


    def __init__(self):
        object.__init__(self)

class AbstractNbeFragment (AbstractFragment, modeled.Modeled, metaclass=auto_properties):
    """Abstract Numerical Begin-End fragment class.

       Implements operators '==' and 'in' (for other ByteCountFragments and
       numbers).
    """

    #
    # Instance methods
    #

    def __init__(self, element=None, parent=None,
                 begin=None, end=None, duration=None):
        """Create a new ByteCount fragment, with a required begin
        value and facultative end or duration values"""

        AbstractFragment.__init__(self)
        if element is None:
            element = _PseudoElement()
            assert begin is not None, "begin is required"
        modeled.Modeled.__init__(self, element, parent)

        if begin is not None:
            assert end is not None or duration is not None, \
                   "end or duration is required"
            assert end is None or duration is None, \
                   "incompatible parameters: end, duration"
            self.setBegin(begin)
            if end is not None:
                self.setEnd(end)
            elif duration is not None:
                self.setEnd(self.getBegin() + int(duration))
            else:
                self.setEnd(self.getBegin())

    def __repr__(self):
        """Return a string representation of the object."""
        return "<%s.%s(%s,%s)>" % (self.__class__.__module__,
                                   self.__class__.__name__,
                                   self.getBegin (), self.getEnd ())

    def __str__(self):
        """Return a string representation of the NBE fragment"""
        return "Begin-End (%d,%d)" % (self.getBegin(), self.getEnd())

    def getBegin(self):
        return int(self._getModel().getAttributeNS(None, 'begin'))

    def setBegin(self, value):
        return self._getModel().setAttributeNS(None, 'begin', str(int(value)))

    def getEnd(self):
        return int(self._getModel().getAttributeNS(None, 'end'))

    def setEnd(self, value):
        return self._getModel().setAttributeNS(None, 'end', str(int(value)))

    def getDuration(self):
        return self.getEnd() - self.getBegin()

    def __eq__(self, other):
        if type(self) == type(other):
            return self.getBegin() == other.getBegin() \
                   and self.getEnd() == other.getEnd()
        else:
            return False

    def __lt__(self, other):
        if type(self) == type(other):
            return self.getBegin() < other.getBegin()
        elif hasattr(other, 'fragment'):
            return self.getBegin() < other.fragment.getBegin()
        else:
            raise TypeError("Invalid comparison")

    def __contains__(self, other):
        if type(self) == type(other):
            return self.getBegin() <= other.getBegin() \
                   and other.getEnd() <= self.getEnd()
        else:
            o = int(other)
            return self.getBegin() <= o and o <= self.getEnd()

    def isOverlapping(self, other):
        if type(self) == type(other):
            return self.getBegin() in other or other.getBegin() in self
        else:
            raise TypeError("Invalid test")

    def isBounded(self):
        """ Return whether this fragment is bounded, i.e. represents a document
            element.
            A bounded fragment can not be unbounded, but can be cloned into a
            new unbounded fragment (see x.clone()).
            An unbounded fragment can be bounded to a DOM document
            (see x._bound).
        """
        return self._getDocument() is not None

    def clone(self):
        """ Clone this fragment into a new unbounded fragment.
        """
        return self.__class__(begin=self.getBegin(), end=self.getEnd())

    def _bound(self, element):
        """ Bound this fragment to the document owning the given element.
            Note that the given element will be replaced by the fragment
            element.
            You probably do not want to use this method directly, but rather
            set an annotation fragment (see advene.annotation.Annotation)
        """
        doc = element.ownerDocument
        new = doc.createElementNS(self.getNamespaceUri(), self.getLocalName())
        parent = element.parentNode
        parent.replaceChild(new, element)
        # TODO: see how I can make this generic
        self.__init__(element=new, begin=self.getBegin(), end=self.getEnd())

class ByteCountFragment(AbstractNbeFragment):
    """ByteCount fragment class.
    """

    #
    # Static methods
    #

    @staticmethod
    def getNamespaceUri():
        return adveneNS

    @staticmethod
    def getLocalName():
        return "bytecount-fragment"

    #
    # Instance methods
    #

    def __str__(self):
        """Return a string representation of the ByteCount fragment"""
        return "Bytes (%d,%d)" % (self.getBegin(), self.getEnd())

class MillisecondFragment(AbstractNbeFragment):
    """
    Millisecond fragment class.
    """

    #
    # Static methods
    #

    @staticmethod
    def getNamespaceUri():
        return adveneNS

    @staticmethod
    def getLocalName():
        return "millisecond-fragment"

    #
    # Instance methods
    #

    def format_time(self, val):
        """Formats a value (in milliseconds) into a time string.

        @param val: the value
        @type val: int
        @return: the formatted string
        @rtype: string
        """
        (s, ms) = divmod(int(val), 1000)
        # Format: HH:MM:SS.mmm
        return "%s.%03d" % (time.strftime("%H:%M:%S", time.gmtime(s)), ms)

    def __str__(self):
        """Return a string representation of the Millisecond fragment"""
        return "Milliseconds (%s,%s)" % (self.format_time(self.getBegin()),
                                         self.format_time(self.getEnd()))

class __UnknownFragment(AbstractFragment):
    """ An unkonw fragment is returned each time the fragment element is not
        recognized.
        Such a fragment contains nothing, and is equal to nothing, not even
        itself.
        Note that this class implements the Singleton design pattern.
    """

    def __init__(self):
        AbstractFragment.__init__(self)

    def __new__(cls, *args, **kw):
        """ Singleton implementation
        """
        it = cls.__dict__.get("__it__")
        if it is None:
            cls.__it__ = it = object.__new__(cls)
        return it

    def __eq__(self, other):
        return 0

    def __contains__(self, other):
        return 0

unknownFragment = __UnknownFragment()

class __FragmentFactory(dict):
    """A fragment class manager.

       Fragment classes are registered with the 'register' method.
       They are retrieved with the dict [] operator.

       Fragment classes must verify the following:

         - have a getNamespaceUri() static or class method
         - have a getLocalName() static or class method
         - have a getAttributes() static method returning a dict
         - they should be unmutable: the right way of changing the fragment of
           an annotation is to re-set it rather than modifying the existing one
    """

    def __init__(self):
        dict.__init__(self)

    def __setitem__(self, key, value):
        raise TypeError("read-only dictionnary! use x.register(cls) instead")

    def __getitem__(self, key):
        try:
            return dict.__getitem__(self, key)
        except KeyError:
            return __UnknownFragment

    def register(self, cls):
        key = cls.getNamespaceUri(), cls.getLocalName()
        dict.__setitem__(self, key, cls)

    def makeFragment(self, element, parent):
        key = element.namespaceURI, element.localName
        return self[key](element, parent)

fragmentFactory = __FragmentFactory()

fragmentFactory.register(ByteCountFragment)
fragmentFactory.register(MillisecondFragment)

class _PseudoElement(dict):
    """This class is used to make models for unbounded fragments.
    """
    def __init__(self):
        dict.__init__({})

    @property
    def ownerDocument(self):
        return None

    def getAttributeNS(self, namespaceURI, localName):
        return self[(namespaceURI, localName)]

    def setAttributeNS(self, namespaceURI, qualifiedName, value):
        if ':' in qualifiedName:
            localName = qualifiedName[(qualifiedName.index(':')+1):]
        else:
            localName = qualifiedName
        self[(namespaceURI, localName)] = value

    def removeAttributeNS(self, namespaceURI, localName):
        del self[(namespaceURI, localName)]
