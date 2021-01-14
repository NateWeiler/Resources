![alt Coding Grace](http://static.tumblr.com/f5a835f89cdea6f39d21d62ed5cc683f/mtdjmjz/oGsmom2bl/tumblr_static_coding_grace_mark_iismaller.png "Coding Grace")

When: Tues, 25th February (18:30-21:00)

Where: GameSpace Incubator (Pulse College), Georges Dock, IFSC, Dublin 1 ([Map](http://goo.gl/maps/e7fsx "Map to venue"))

Walk through of newcoder.io's - [http://newcoder.io/dataviz/](http://newcoder.io/dataviz/)

# Pre-requisites #

* Basic knowledge of Python (post-Learning Python the Hard Way, 101 Python, etc.)

# Setup #

NOTE: Please make sure you have the following setup on your machine:

* [virtualenv](#virtual_env)
* [matplotlib](#rest)
* [numpy](#rest)
* [geojson](#rest)

## virtualenv ##

* If you have "pip": 
    
        $ [sudo] pip install virtualenv

* If you don't have "pip": 
    * Find the latest version of https://pypi.python.org/pypi/virtualenv/
    * Download it.
    * In your terminal (x.x.x is the version, e.g. 1.11.4):

          tar xvfz virtualenv-[x.x.x].tar.gz
          cd virtualenv-[x.x.x]
          [sudo] python setup.py install

## Installing the rest:##

### For MacOSX ###

* Install Homebrew - http://brew.sh/
* In your terminal:-

        brew doctor
        brew install python
        brew install freetype

  Freetype bug workaround:

        ln -s /usr/local/include/freetype2 /usr/local/include/freetype

  Then:

        brew install libpng
        pip install numpy
        pip install matplotlib
        pip install geojson

### For Linux and Windows ###

    pip install numpy
    pip install matplotlib
    pip install geojson

# Things to note #

[Part three](http://newcoder.io/dataviz/part-3/):

* Found a typo: `my_file` should be `MY_FILE`
* Incorrect link to [https://gist.github.com/](https://gist.github.com/) (clicking on link will go to wrong place)

## Sample dataset from FingalCoCo ##

You can find more datasets below.

I've modified *map.py* and re-named it to *vicky-map.py*. I still call *parse* function from *parse.py*. This will parse *Arts_Centres.csv* and will output a geojson file called *arts_centres.geojson*. You can open this geojson file, copy the contents and post it to [https://gist.github.com/](https://gist.github.com/) and see what happens.

# References #

## Sample Irish data from Irish sites ##

* [http://data.fingal.ie/ViewDataSets/](http://data.fingal.ie/ViewDataSets/)
* [http://www.dublinked.ie/datastore/datastore.php](http://www.dublinked.ie/datastore/datastore.php)

## Groups ##
* [http://www.opendata.ie/](http://www.opendata.ie/)
* [http://www.codeforall.ie/](http://www.codeforall.ie/)
* [http://sympy.org](http://sympy.org)
