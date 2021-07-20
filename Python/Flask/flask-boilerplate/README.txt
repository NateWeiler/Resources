# Flask Boilerplate

[![Build Status](https://travis-ci.org/zachfedor/flask-boilerplate.svg?branch=master)](https://travis-ci.org/zachfedor/flask-boilerplate)

Boilerplate for basic CRUD web application built on Python, Flask, and PostgreSQL using Travis CI for testing and deployment to Heroku.


## Installation

Create a virtual environment then install the project:

```bash
$ python3 -m venv venv
$ source venv/bin/activate
(venv) $ pip install -e .
```

Developer dependencies can be installed with:

```bash
(venv) $ pip install -e '.[test]'
```

Flask commands require the following environment variables to be set:

```bash
(venv) $ export FLASK_APP=flask-boilerplate
(venv) $ export FLASK_ENV=development
```


## Database Setup

To run the application locally, you need a running instance of PostgreSQL. Create a database and user according to the configuration settings in `flask-boilerplate/__init__.py`. Then you can run the following command to create the necessary tables according to the `schema.sql` file:

```bash
(venv) $ flask init-db
```

If you want to run tests, you'll have to create a second database according to the configuration in `tests/conftest.py`. The test database will get reset according to the `schema.sql` file and mock data will get loaded into it from the `data.sql` file before every test. 

You can also add this mock data to your development database with the `flask mock-db` command.


## Running The App

```bash
(venv) $ flask run
```


## Tests and Coverage

```bash
(venv) $ pytest
(venv) $ pytest -v
(venv) $ coverage run -m pytest
```

The first command will run the test functions defined in the `tests/` directory. The second gives a more detailed output. Run the third command to generate a report of the code covered by the tests. You can view this report in the terminal with `coverage report` or with more detail in the browser with `coverage html`.

