import os
import psycopg2
from psycopg2.extras import DictCursor

import click
from flask import current_app, g
from flask.cli import with_appcontext


def get_db():
    if 'db' not in g:
        # open a connection, save it to close when done
        DB_URL = os.environ.get('DATABASE_URL', None)
        if DB_URL:
            g.db = psycopg2.connect(
                DB_URL,
                cursor_factory=DictCursor,
                sslmode='require'
            )
        else:
            g.db = psycopg2.connect(
                dbname=current_app.config['DB_NAME'],
                user=current_app.config['DB_USER'],
                cursor_factory=DictCursor
            )

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close() # close the connection


def init_db():
    with current_app.open_resource('schema.sql') as f:
        with get_db() as con:
            with con.cursor() as cur:
                cur.execute(f.read())
        

@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')


def mock_db():
    data_file = os.path.join(
        os.path.dirname(__file__),
        os.path.pardir,
        'tests',
        'data.sql'
    )
    with open(data_file, 'rb') as f:
        with get_db() as con:
            with con.cursor() as cur:
                cur.execute(f.read())
        

@click.command('mock-db')
@with_appcontext
def mock_db_command():
    """Fill the database with mock data."""
    mock_db()
    click.echo('Inserted mock data into the database.')


def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
    app.cli.add_command(mock_db_command)

