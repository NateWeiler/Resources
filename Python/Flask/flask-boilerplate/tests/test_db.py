import psycopg2
import pytest

from flask_boilerplate import db


def test_get_close_db(app):
    with app.app_context():
        con = db.get_db()
        assert con is db.get_db(), 'get_db should always return the same connection'

    with pytest.raises(psycopg2.InterfaceError) as e:
        cur = con.cursor()
        cur.execute('SELECT 1')

    assert 'closed' in str(e), 'connection should be closed after app teardown'


def test_init_db_command(runner, monkeypatch):
    class Recorder(object):
        called = False

    def fake_init_db():
        Recorder.called = True

    monkeypatch.setattr('flask_boilerplate.db.init_db', fake_init_db)
    result = runner.invoke(args=['init-db'])
    assert 'Initialized' in result.output
    assert Recorder.called


def test_mock_db_command(runner, monkeypatch):
    class Recorder(object):
        called = False

    def fake_mock_db():
        Recorder.called = True

    monkeypatch.setattr('flask_boilerplate.db.mock_db', fake_mock_db)
    result = runner.invoke(args=['mock-db'])
    assert 'Inserted mock data' in result.output
    assert Recorder.called

