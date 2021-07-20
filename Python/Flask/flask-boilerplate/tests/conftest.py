import os

import pytest

from flask_boilerplate import create_app
from flask_boilerplate.db import get_db, init_db


@pytest.fixture
def app():
    app = create_app({
        'TESTING': True,
        'DB_NAME': 'flask_boilerplate_test',
        'DB_USER': 'flask_boilerplate_user',
    })

    with app.app_context():
        # Create the database in a blank state
        init_db()

        # Fill the database with mock data for tests
        data_file = os.path.join(os.path.dirname(__file__), 'data.sql')
        with open(data_file, 'rb') as f:
            with get_db() as con:
                with con.cursor() as cur:
                    cur.execute(f.read())

    yield app


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def runner(app):
    return app.test_cli_runner()


class AuthActions(object):
    def __init__(self, client):
        self._client = client

    def login(self, email="user1@email.com", password="qwerty"):
        return self._client.post(
            '/login',
            data={ 'email': email, 'password': password }
        )

    def logout(self):
        return self._client.get('/logout')


@pytest.fixture
def auth(client):
    return AuthActions(client)

