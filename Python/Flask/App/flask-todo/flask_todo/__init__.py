import datetime

from flask import Flask, flash, make_response, render_template, request


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_mapping(
        SECRET_KEY='dev',
        DB_NAME='flasktodo',
        DB_USER='flasktodo_user',
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    from . import db
    db.init_app(app)

    @app.route('/', methods=['GET', 'POST'])
    def index():
        if request.method == "POST":
            item_id = request.form["id"]

            if item_id:
                con = db.get_db()
                cur = con.cursor()
                cur.execute(
                        "UPDATE items SET completed = True WHERE id = %s",
                        (item_id,)
                )
                con.commit()


        filter_option = request.args.get('filter')
        # TODO: add ability to sort items
        # sort_option = request.args.get('sort')
        
        con = db.get_db()
        cur = con.cursor()

        if filter_option == 'completed':
            cur.execute("SELECT * FROM items WHERE completed = True")
        elif filter_option == 'active':
            cur.execute("SELECT * FROM items WHERE completed = False")
        else:
            cur.execute("SELECT * FROM items")

        todo_results = cur.fetchall()
        cur.close()

        todos = []
        for result in todo_results:
            todos.append({
                "id": result[0],
                "text": result[1],
                "created_at": result[2],
                "completed": result[3],
            })

        return render_template('index.html', todos=todos, filter_option=filter_option)


    @app.route('/create', methods=["GET", "POST"])
    def create():
        if request.method == "POST":
            new_item = request.form["text"]

            if new_item:
                dt = datetime.datetime.now()

                # Save to database
                con = db.get_db()
                cur = con.cursor()
                cur.execute(
                        "INSERT INTO items (text, created_at, completed) VALUES (%s, %s, %s)",
                        (new_item, dt, False)
                )
                con.commit()
                cur.close()

                # TODO: If error, flash it to the screen

                flash('To-Do item was added. Want to add another?', 'success')
            else:
                flash('You need to add some text first.', 'error')


        return render_template('create.html')
    

    return app

