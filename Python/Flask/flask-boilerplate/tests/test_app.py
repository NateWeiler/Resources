from flask_boilerplate import create_app


def test_config():
    assert not create_app().testing
    assert create_app({'TESTING': True}).testing


def test_index(client):
    response = client.get('/')
    assert b'Flask Boilerplate' in response.data


def test_protected(client, auth):
    response = client.get('/private')
    assert b'Secret Message' not in response.data

    auth.login()
    response = client.get('/private')
    assert b'Secret Message' in response.data


