import pytest

from flask import g, session

from flask_boilerplate import db


def test_register(client, app):
    assert client.get('/register').status_code == 200
    response = client.post(
        '/register', data={'email': 'a', 'password': 'a'}
    )
    assert 'http://localhost/login' == response.headers['Location']

    with app.app_context():
        with db.get_db() as con:
            with con.cursor() as cur:
                cur.execute(
                    "SELECT * FROM users WHERE email = 'a'",
                )
                assert cur.fetchone() is not None


@pytest.mark.parametrize(('email', 'password', 'message'), (
    ('', '', b'Email is required.'),
    ('a', '', b'Password is required.'),
    ('user1@email.com', 'test', b'already registered'),
))
def test_register_validate_input(client, email, password, message):
    response = client.post(
        '/register',
        data={'email': email, 'password': password}
    )
    assert message in response.data


def test_login(client, auth):
    assert client.get('/login').status_code == 200
    response = auth.login()
    assert response.headers['Location'] == 'http://localhost/'

    with client:
        client.get('/')
        assert session['user_id'] == 1
        assert g.user['email'] == 'user1@email.com'


@pytest.mark.parametrize(('email', 'password', 'message'), (
    ('a', 'test', b'Incorrect email or password.'),
    ('user1@email.com', 'a', b'Incorrect email or password.'),
))
def test_login_validate_input(auth, email, password, message):
    response = auth.login(email, password)
    assert message in response.data


def test_logout(client, auth):
    auth.login()

    with client:
        auth.logout()
        assert 'user_id' not in session

