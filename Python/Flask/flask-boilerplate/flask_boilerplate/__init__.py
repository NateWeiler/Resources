from flask import Flask, render_template


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_mapping(
        SECRET_KEY='dev',
        DB_NAME='flask_boilerplate',
        DB_USER='flask_boilerplate_user'
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    from . import db
    db.init_app(app)

    # Register Blueprints
    @app.route('/')
    def index():
        return render_template('index.html')

    from . import auth
    app.register_blueprint(auth.bp)

    @app.route('/private')
    @auth.login_required
    def private():
        return 'Secret Message'

    return app










