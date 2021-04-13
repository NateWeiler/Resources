This is meant as a guide for people contributing code to Urwid itself.

Urwid's current version aims to be compatible with Python versions 2.4 - 2.7 and 3.2+. These guidelines will help you write Python 2 code that will across those versions (with the help of 2to3)

### PEP8

Urwid code generally follows PEP8, the Style Guide for Python Code.

### `from __future__`

We avoid use of `from __future__` imports.

This makes the code as much like normal Python 2 code as possible, allows people to easily move code in and out of the library and avoids surprising behaviour.

### Strings and Binary Data

The str type becomes Unicode in Python 3, so we have to deal with three different types now:

1. Unicode strings
2. 8-bit strings in Python 2 that become Unicode in Python 3
3. Binary data 

Unicode strings should be used for all text data in Urwid (mostly in example programs, but also in widgets that come with some default text).

* Use `u"My textual data"` for literal text data everywhere. 

Certain types of data (`__repr__` return values, symbol names, function documentation..) are an 8-bit strings in Python 2 but becomes Unicode text in Python 3. Urwid also uses this type for a number of named constants.

* Use "normal literal strings" for this data everywhere
* Exception: for named constants use the variable names when available, eg. `widget.FLOW` instead of `"flow"`

Binary data is used in Canvas objects and when sending updates to the user's terminal.

```python
from urwid.compat import B, bytes
```

* Use `B("bindata\x00\x42\xfe")` for literal binary data
* Use `bytes()` for an empty binary string (eg. for joining a list of binary values)
* Use `bytes().ljust(x)` for x "space" characters as binary data 

### Unit Tests and Doctests

When adding new code always include tests and documentation where appropriate. Use unit tests for validating any tricky corner cases.  Run the tests with:

```sh
python setup.py test
```
