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
class ChoiceTree:
    """
    An arc-labeled tree where each node is uniquely described by a sequence of
    all arc labels joining the root to that node.
    Some nodes are *instanciated*, which means that they have an =instance=
    attribute.
    The class provides several methods to get the most appropriate instance,
    given a key.
    """

    def __init__ (self, instance=None):
        self.instance = instance
        self.children = None

    def _getOrMakeChildren (self):
        """
        Return the dict of children, constructing it if necessary.
        """
        if self.children is None:
            self.children = {}
        return self.children

    def isEmpty (self):
        """
        Return True iff this ChoiceTree has no instanciated node.
        """
        return self.instance is None and self.children is None

    def set (self, seq, instance, override=False):
        """
        Instanciate the node identified by =seq= with =instance=.
        If the node is already instanciated, it is replaced only if =override=
        is True.
        """
        assert instance is not None
        if len (seq) == 0:
            if self.instance is None or override :
                self.instance = instance
        else:
            children = self._getOrMakeChildren ()
            subtree = children.setdefault (seq[0], ChoiceTree ())
            subtree.set (seq[1:], instance, override)

    def unset (self, seq):
        """
        Uninstanciate the node at =seq=.
        """
        if len (seq) == 0:
            self.instance = None
        else:
            children = self.children
            if children is not None:
                subtree = children.get (seq[0])
                if subtree is not None:
                    subtree.unset (seq[1:])
                    if subtree.isEmpty ():
                        del children[seq[0]]
                    if len (children) == 0:
                        self.children = None

    def dump (self, _prefix = ()):
        children = self.children
        if children is not None:
            for k, subtree in children.items ():
                subtree.dump (_prefix = _prefix + (k,))

    def getSubtree (self, seq):
        """
        Return the subtree rooted on the node identified by =seq=.
        Raises a KeyError if no such node exist.
        """
        if len (seq) == 0:
            return self
        else:
            children = self.children
            if children is not None:
                subtree = children.get (seq[0])
                if subtree is not None:
                    return subtree.getSubtree (seq[1:])
            raise KeyError (seq)

    def getAny (self, _whereami = ()):
        """
        Search (depth first) the first instanciated node of this tree,
        and return a tuple (seq, instance).
        """
        instance = self.instance
        if instance is None:
            children = self.children
            if children is None:
                return ((), None)
            else:
                # this ChoiceTree is not empty, so at least one subtree must
                # have a value
                for k, subtree in children.items ():
                    r = subtree.getAny (_whereami + (k,))
                    if r[1] is not None:
                        return r
                # should have found a value to return
                assert False
        else:
            return (_whereami, instance)

    def getAnySeq (self):
        """
        Search (depth first) the first instanciated node of this tree,
        and return its identifying sequence.
        """
        return self.getAny ()[0]

    def getAnyInstance (self):
        """
        Search (depth first) the first instanciated node of this tree,
        and return its instance.
        """
        return self.getAny ()[1]

    def getMostSpecific (self, seq, _default=None, _whereami=()):
        """
        Search for the most specific instanciated node in the path leadin to
        the given =seq=,  and return a tuple (seq, instance).
        """
        instance = self.instance
        if instance is not None:
            _default = (_whereami, instance)
        if _default is None:
            _default = (_whereami, instance)
        if len (seq) > 0:
            children = self.children
            if children is not None:
                subtree = children.get (seq[0])
                if subtree is not None:
                    return subtree.getMostSpecific (
                        seq[1:],
                        _default,
                        _whereami + (seq[0],)
                    )
        return _default

    def getMostSpecificSeq (self, seq):
        """
        Search for the most specific instanciated node in the path leadin to
        the given =seq=,  and return its identifying sequence.
        """
        return self.getMostSpecific (seq)[0]

    def getMostSpecificInstance (self, seq):
        """
        Search for the most specific instanciated node in the path leadin to
        the given =seq=,  and return its instance.
        """
        return self.getMostSpecific (seq)[1]
