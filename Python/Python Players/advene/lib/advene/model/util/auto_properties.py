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
def lowerFirstChar(s):
    first = s[0].lower()
    rest = s[1:]
    return first+rest

def upperFirstChar(s):
    first = s[0].upper()
    rest = s[1:]
    return first+rest

class auto_properties(type):
    """Metaclass automatically defining properties.

    If a "getFoo" or "setFoo" method is defined, then so will be the
    correponding property "foo".  """

    def __init__(cls, name, bases, dic):
        super(auto_properties, cls).__init__(name, bases, dic)
        props = {}
        for n, f in dic.items():
            try:
                nb_args = (f.__code__.co_argcount
                           - len (f.__defaults__ or ()))
            except AttributeError:
                continue
            propname = None
            if n.startswith("get"):
                if nb_args == 1:
                    propname=lowerFirstChar(n[3:])
            if n.startswith("set"):
                if nb_args == 2:
                    propname=lowerFirstChar(n[3:])
            if propname:
                props[propname] = 1

        for propname in props.keys ():
            fget = getattr(cls, "get%s" % upperFirstChar(propname), None)
            fset = getattr(cls, "set%s" % upperFirstChar(propname), None)
            fdel = getattr(cls, "del%s" % upperFirstChar(propname), None)
            setattr(cls, propname, property(fget, fset, fdel))


if __name__ == "__main__":
    class Test(metaclass=auto_properties):
        def getTheA(self):
            return self._a

        def setTheB(self, v):
            self._b = v

        def getTheC(self):
            return self._c
        def setTheC(self, v):
            self._c = v

        def getTheD(self):
            return self._d
        def setTheD(self, v):
            self._d = v
        def delTheD(self, v):
            del self._d

        def delTheE(self, e):
            del self._e

    t = Test()
