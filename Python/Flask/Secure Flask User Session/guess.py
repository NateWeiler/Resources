import os
import random
from flask import Flask, session, redirect, url_for, request, render_template

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY') or \
    'e5ac358c-f0bf-11e5-9e39-d3b532c10a28'

@app.route('/')
def index():
    # the "answer" value cannot be stored in the user session as done below
    # since the session is sent to the client in a cookie that is not encrypted!
    session['answer'] = random.randint(1, 10)
    session['try_number'] = 1
    return redirect(url_for('guess'))

@app.route('/guess')
def guess():
    guess = int(request.args['guess']) if 'guess' in request.args else None
    if request.args.get('guess'):
        if guess == session['answer']:
            return render_template('win.html')
        else:
            session['try_number'] += 1
            if session['try_number'] > 3:
                return render_template('lose.html', guess=guess)
    return render_template('guess.html', try_number=session['try_number'],
                           guess=guess)

if __name__ == '__main__':
    app.run()