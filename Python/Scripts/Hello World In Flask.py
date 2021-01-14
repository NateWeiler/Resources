'''
   55-"Hello_world", In Flask
   Taken from this good tutorial:
   https://aryaboudaie.com/python/technical/educational/web/flask/2018/10/17/flask.html
'''
# you may need to pip install flask
from flask import Flask

#create an app
APP = Flask(__name__)

# the following line is a decorator.
# this is required for each function to tell it where
# the app should run, a web address or in this case
# on your localhost.

@APP.route('/')
def hello_world():
    '''print message in browser'''
    return 'Hello, World!'

#if __name__ == '__main__':
#is basically just Python’s way of saying
#run this code only if I ran it.

# __name__ is a variable that Python automatically creates,
# and it’s equal to "__main__" when it’s you that ran the code
# (as opposed to another script running the code).

if __name__ == '__main__':
    APP.run(host='0.0.0.0')

# app.run(host='0.0.0.0')
# basically runs the app variable that you’ve
# created in line 10, and the host we passed in
# makes it run on localhost.

# run this code from your terminal\dosbox
# then open your browser, and paste in “localhost:5000”
# into the address bar and click go or enter.
# You should see "hello world" printed, what a palava, eh.
