import os
import psycopg2
import click
from flask import current_app, g
from flask.cli import with_appcontext

def get_db():
    if "db" not in g:
        dbname = os.getenv("DB_NAME")
        user = os.getenv("DB_USER")
        password = os.getenv("DB_PASSWORD")
        host = os.getenv("DB_HOST")
        port = os.getenv("DB_PORT")
        
        connection_string = f"dbname={dbname} user={user} password={password} host={host} port={port}"
        
        g.db = psycopg2.connect(connection_string)
        g.db.row_factory = psycopg2.extras.DictCursor

    return g.db

def close_db(e=None):
    db = g.pop("db", None)

    if db is not None:
        db.close()

def init_db():
    db = get_db()

    with current_app.open_resource("schema.sql") as f:
        cursor = db.cursor()
        cursor.execute(f.read().decode("utf8"))
        db.commit()

@click.command("init-db")
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo("Initialized the database.")

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
