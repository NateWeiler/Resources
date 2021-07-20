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
class MimeTypeException (Exception):
    pass

class MimeTypeValueError (MimeTypeException, ValueError):
    pass

class MimeType:
    """
    TODO
    """
    def __init__ (self, value):
        """
        Checks that this string looks like a valid MIME type.
        (the second member is not checked for validity)
        """
        try:
            type_, subtype = str(value).split ('/')
        except ValueError:
            raise MimeTypeValueError ("%s has to few or too many /'s" % value)
        self.setType (type_)
        self.setSubtype (subtype)

    def __repr__ (self):
        return "<%s.%s '%s' at 0x%x>" % (self.__module__,
                                         self.__class__.__name__,
                                         str(self),
                                         id(self))
    def __str__ (self):
        return '/'.join( (self.type, self.subtype) )

    def __ge__ (self, other):
        if not isinstance (other, MimeType):
            raise MimeTypeException ('Can not compare mime type to %s' %
                                     repr (other))
        return other.isMoreSpecificThan (self)

    def __le__ (self, other):
        if not isinstance (other, MimeType):
            raise MimeTypeException ('Can not compare mime type to %s' %
                                     repr (other))
        return self.isMoreSpecificThan (other)

    def __gt__ (self, other):
        if not isinstance (other, MimeType):
            raise MimeTypeException ('Can not compare mime type to %s' %
                                     repr (other))
        return other.isMoreSpecificThan (self, strictly=True)

    def __lt__ (self, other):
        if not isinstance (other, MimeType):
            raise MimeTypeException ('Can not compare mime type to %s' %
                                     repr (other))
        return self.isMoreSpecificThan (other, strictly=True)

    def getType (self):
        return self.__type

    def setType (self, type_):
        self.checkType (type_, exception=True)
        self.__type = type_

    type = property (getType, setType)

    def getSubtype (self):
        return self.__subtype

    def setSubtype (self, subtype):
        self.checkSubtype (subtype, exception=True)
        self.__subtype = subtype

    subtype = property (getSubtype, setSubtype)

    def isGeneric (self):
        return self.__type == '*' or self.__subtype == '*'

    def isMoreSpecificThan (self, other, strictly=False):
        if not isinstance (other, MimeType):
            raise MimeTypeException ('Can not compare mime type to %s' %
                                     repr (other))
        return (
            (
                other.__type == '*'
                and (not strictly or self.__type != '*')
            )
            or (
                self.__type == other.__type
                and (
                    other.__subtype == '*'
                    or (not strictly and self.__subtype == other.__subtype)
                )
                and (not strictly or self.__subtype != '*')
            )
        )

    @staticmethod
    def checkType (type, exception=False):
        r = (type in ('*',
                      'text',
                      'multipart',
                      'application',
                      'message',
                      'image',
                      'audio',
                      'video',)
             or ((type.startswith ('x-') or type.startswith ('X-'))
                 and MimeType._check_token (type[2:], exception))
        )
        if not r and exception:
            raise MimeTypeValueError ("%s is not a valid type" % type)
        return r

    def checkSubtype (self, subtype, exception=False):
        type = self.__type
        r = type != '*' or subtype == '*'
        r = r and self._check_token (subtype, exception)
        if not r and exception:
            raise MimeTypeValueError ("%s/%s is not a valid MIME type" %
                                      (type, subtype))
        return r

    @staticmethod
    def _check_token (token, exception=False):
        r = True
        for c in token:
            if c.isspace() or c in '()<>@,;:\\"/[]?.=':
                r = False
                break
        if not r and exception:
            raise MimeTypeValueError ("%s is an invalid token" % token)
        return r
