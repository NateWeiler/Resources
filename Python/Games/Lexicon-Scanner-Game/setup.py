try:                                              
    from setuptools import setup
except ImportError:
    from distutils.core import setup

config = {
    'description': 'Lexicon-Scanner-Game',
    'author': 'Nathan Weiler',
    'url': 'URL to get it at.',
    'download_url': 'Where to download it.',
    'author_email': 'nateweiler84@gmail.com',
    'version': '1.0',
    'install_requires': ['nose'],
    'packages': ['Lexicon-Scanner-Game'],
    'scripts':[],
    'name': 'Lexicon-Scanner-Game'
}

setup(**config)
