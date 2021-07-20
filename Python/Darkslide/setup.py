#!/usr/bin/env python
# -*- encoding: utf-8 -*-
from __future__ import absolute_import
from __future__ import print_function

import io
import re
from glob import glob
from os.path import basename
from os.path import dirname
from os.path import join
from os.path import splitext

from setuptools import find_packages
from setuptools import setup


def read(*names, **kwargs):
    with io.open(
        join(dirname(__file__), *names),
        encoding=kwargs.get('encoding', 'utf8')
    ) as fh:
        return fh.read()


setup(
    name='darkslide',
    version='5.1.0',
    license='Apache-2.0',
    description='Lightweight markup language-based html5 slideshow generator. Forked from Landslide.',
    long_description='%s\n%s' % (
        re.compile('^.. start-badges.*^.. end-badges', re.M | re.S).sub('', read('README.rst')),
        re.sub(':[a-z]+:`~?(.*?)`', r'``\1``', read('CHANGELOG.rst'))
    ),
    author='Adam Zapletal',
    author_email='adamzap@gmail.com',
    maintainer='Ionel Cristian Mărieș',
    maintainer_email='contact@ionelmc.ro',
    url='https://github.com/ionelmc/python-darkslide',
    packages=find_packages('src'),
    package_dir={'': 'src'},
    py_modules=[splitext(basename(path))[0] for path in glob('src/*.py')],
    include_package_data=True,
    zip_safe=False,
    platforms=['any'],
    classifiers=[
        # complete classifier list: http://pypi.python.org/pypi?%3Aaction=list_classifiers
        'Development Status :: 5 - Production/Stable',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: Apache Software License',
        'Operating System :: Unix',
        'Operating System :: POSIX',
        'Operating System :: Microsoft :: Windows',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: Implementation :: CPython',
        'Programming Language :: Python :: Implementation :: PyPy',
        # uncomment if you test on these interpreters:
        # 'Programming Language :: Python :: Implementation :: IronPython',
        # 'Programming Language :: Python :: Implementation :: Jython',
        # 'Programming Language :: Python :: Implementation :: Stackless',
        'Topic :: Utilities',
    ],
    project_urls={
        'Changelog': 'https://github.com/ionelmc/python-darkslide/blob/master/CHANGELOG.rst',
        'Issue Tracker': 'https://github.com/ionelmc/python-darkslide/issues',
    },
    keywords=[
        'markdown',
        'slideshow',
        'presentation',
        'rst',
        'restructuredtext',
        'textile',
        'landslide',
    ],
    python_requires='>=2.7, !=3.0.*, !=3.1.*, !=3.2.*, !=3.3.*',
    install_requires=[
        'Jinja2',
        'Markdown',
        'Pygments',
        'docutils',
        'six',
        'qrcode',
    ],
    extras_require={
        # eg: 'rst': ['docutils>=0.11'],
    },
    entry_points={
        'console_scripts': [
            'darkslide = darkslide.cli:main',
        ]
    },
)
