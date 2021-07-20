from distutils.core import setup

setup(name='VUSentimentLexicon',
      version='1.1',
      description = 'Library in python to load and query sentiment lexicons',
      author = 'Nathan Weiler',
      author_email = 'nateweiler84@gmail.com',
      packages = ['VUSentimentLexicon'],
      package_data = {'VUSentimentLexicon':['*-lexicon/*']}
      )
