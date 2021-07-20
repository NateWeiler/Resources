# Lexicon-Scanner-Game
 A text game made by Python.  
 ![dictionary](/img/dictionary.jpg)


# Description
 This is a little text-based adventure game made by Python. 
 The game provides a device that lets users type phrases in various ways and then convert that into something the computer understands.  
 For example, we'd like to have all of these phrases work the same:  
 *open door, open the door, go THROUGH the door* OR *punch bear, Punch The Bear in the FACE*

 A sentence can be a simple structure like:  
 **Subject | Verb | Object**  
 Obviously it gets more complex than that, and you probably did many days of annoying sentence graphs for English class.  
 What we want is to turn the user's input into a nice sentence object that has a subject, verb, and object.


# Prereqquisites
1. Install Python 3
2. Install nosetests


# Lexicon used in this little game
| <center>Type</center> |  <center>Words</center> |
| ---          | ---    |
| direction    |  north, south, east, west, down, up, left, rigth |
| verb         |  go, stop, kill, eat, run |
| noun         |  door, bear, princess, cabinet, player |
| stop         |  the, in, of, from, at, it|


# How the scanner works?
It should be alright for a user to write something a lot like English for the game and have the game figure out what it means. To do this, a module is writen that does just that.  
This module will have a few classes that work together to handle user input and convert it into something your game can work with reliably. 

This scanner will take a string of raw input from a user and return a sentence that’s composed of a list of tuples with the (TOKEN, WORD) pairings.  
If a word isn’t part of the lexicon, then it should still return the WORD but set the TOKEN to an error token. These error tokens will tell users they messed up.  


# Design Hints
For this game, we need four tools:
1. A way to loop through the list of tuples. That’s easy.
2. A way to “match” different types of tuples that we expect in our subject-verb-object setup.
3. A way to “peek” at a potential tuple so we can make some decisions.
4. A way to “skip” things we do not care about, like stop words.


# Testing Guidelines
Follow this general loose set of guidelines when making your tests:
1. Test files go in tests/ and are named BLAH_tests.py; otherwise nosetests won’t run them. This also keeps your tests from clashing with your other code.
2. Write one test file for each module you make.
3. Keep your test cases (functions) short, but do not worry if they are a bit messy. Test cases are usually kind of messy.
4. Even though test cases are messy, try to keep them clean and remove any repetitive code you can. Create helper functions that get rid of duplicate code. 
You will thank me later when you make a change and then have to change your tests. Duplicated code will make changing your tests more difficult.
5. Finally, do not get too attached to your tests. Sometimes, the best way to redesign something is to just delete it and start over.

**Focus on getting one test working at a time. Keep this simple.**


# A simple way of coding: 
1. Breakdown the requirement and make your pending task list.
2. Select the easiest task and write a failure test code for it.
3. Write the skeleton of the function/module/class that the test needs.
4. Write the comments in the skeleton and describe its working method.
5. Change the comments to codes, improve and test until it works.
6. Remove the task you finished from your pending list. Select the second easiest one.
7. Repeat above steps for remaining tasks until all are done.  

**Remember to update your list, add new tasks, remove unnecessary tasks at all times.  
Keep it simple, incremental and repeated.**


# More Resources
-   [nosetests - nicer testing for Python](https://nose.readthedocs.io/en/latest/man.html)
-   [An Introduction to Distutils](https://docs.python.org/3/distutils/introduction.html?highlight=script#an-introduction-to-distutils)
-   [distutils — Building and installing Python modules](https://docs.python.org/3/library/distutils.html)
-   [distutils.core.setup(arguments)](https://docs.python.org/3/distutils/apiref.html?highlight=script#distutils.core.setup)
-   [Install Packages](https://packaging.python.org/tutorials/installing-packages/#upgrading-packages)
-   [Modifying Python's Search Path](https://docs.python.org/3/install/#modifying-python-s-search-path)
-   [Packaging Python Projects](https://packaging.python.org/tutorials/packaging-projects/)  
This tutorial walks you through how to package a simple Python project. 
It will show you how to add the necessary files and structure to create the package, how to build the package, and how to upload it to the Python Package Index.
-   [An Overview of Packaging for Python](https://packaging.python.org/overview/#bringing-your-own-python-executable)  
This overview provides a general-purpose decision tree for reasoning about Python’s plethora of packaging options (different scenarios / purpose).
Read on to choose the best technology for your next project.
-   [Python Modules and Packages – An Introduction](https://realpython.com/python-modules-packages/)  
Wouldn’t it be nice if you could distinguish between when the file is loaded as a module and when it is run as a standalone script?
Ask and ye shall receive. When a .py file is imported as a module, Python sets the special dunder variable __name__ to the name of the module.
However, if a file is run as a standalone script, __name__ is (creatively) set to the string '__main__'.
