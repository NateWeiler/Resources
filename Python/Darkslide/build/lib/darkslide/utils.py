# -*- coding: utf-8 -*-
import base64
import mimetypes
import os

# add woff2 font type: not here by default...
mimetypes.add_type('font/woff2', '.woff2')


def get_path_url(path, relative=False):
    """ Returns an absolute or relative path url given a path
    """
    if relative is False:
        return 'file://%s' % os.path.abspath(path)
    else:
        return os.path.relpath(path, relative)


def encode_data_from_url(url, source_path):
    if not url or url.startswith('data:') or url.startswith('file://'):
        return False

    if url.startswith('http://') or url.startswith('https://'):
        return False

    real_path = url if os.path.isabs(url) else os.path.join(source_path, url)

    if not os.path.exists(real_path):
        return False

    mime_type, encoding = mimetypes.guess_type(real_path)

    if not mime_type:
        return False

    try:
        with open(real_path, 'rb') as image_file:
            image_contents = image_file.read()
            encoded_image = base64.b64encode(image_contents)
    except IOError:
        return False

    return u"data:%s;base64,%s" % (mime_type, encoded_image.decode())


class cached_property(object):
    def __init__(self, func):
        self.func = func

    def __get__(self, obj, cls):
        if obj is None: return self
        value = obj.__dict__[self.func.__name__] = self.func(obj)
        return value
