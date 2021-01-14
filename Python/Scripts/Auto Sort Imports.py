"""
Python code snippets vol 35:
173-Auto sort imports
stevepython.wordpress.com

pip3 install isort

https://github.com/timothycrosley/isort
"""
from isort import SortImports

# Supply a Python source code file to work on.
SortImports("example.py")
