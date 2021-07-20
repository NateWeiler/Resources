from flask_todo import create_app


def test_config():
    assert not create_app().testing
    assert create_app({'TESTING': True}).testing


def test_index(client):
    response = client.get('/')
    assert 200 == response.status_code
    assert b'<h1>To-Do</h1>' in response.data
    
    # lists three to-do items
    print(response.data)
    assert b'do dishes' in response.data
    assert b'feed dog' in response.data
    assert b'clean room' in response.data
    assert b'<li class="completed">' in response.data


def test_index_filter(client):
    response = client.get('/?filter=active')
    assert b'do dishes' in response.data
    assert b'feed dog' in response.data
    assert b'clean room' not in response.data

    response = client.get('/?filter=completed')
    assert b'do dishes' not in response.data
    assert b'feed dog' not in response.data
    assert b'clean room' in response.data


def test_create(client):
    response = client.get('/create')
    assert 200 == response.status_code
    assert b'<h1>Add To-Do</h1>' in response.data
    assert b'<form class="add" method="post">' in response.data

    response = client.post('/create', data={ 'text': 'do something else' })
    # TODO: make this a 201 status code
    assert 200 == response.status_code
    assert b'<p class="flash success">' in response.data

    response = client.post('/create', data={ 'text': '' })
    # TODO: make this a 4__ status code?
    assert 200 == response.status_code
    assert b'<p class="flash error">' in response.data

