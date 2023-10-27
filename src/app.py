"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import stripe
from flask import Flask, render_template, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
 
#from models import Person
ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False


# database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Correcion para los acentos
app.config['JSON_AS_ASCII'] = False

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)

# Setup Stripe Login google
stripe.api_key = 'sk_test_51NznMbLyi0VUqY7INt2lKGi99wy9L6E6LcyKCCtt5Nv0nm4YERPU3mI217BzXAimsmrOYP3pPfQxA0KPxHD6S2S500v3wjzLjb'

# Setup Firebase Login google
API_KEY= os.getenv("REACT_APP_API_KEY")
AUTH_DOMAIN= os.getenv("REACT_APP_AUTH_DOMAIN")
PROJECT_ID: os.getenv("REACT_APP_PROJECT_ID")
STORAGE_BUCKET: os.getenv("REACT_APP_STORAGE_BUCKET")
MESSAGING_SENDER_ID: os.getenv("REACT_APP_MESSAGING_SENDER_ID")
APP_ID: os.getenv("REACT_APP_APP_ID")
MEASUREMENT_ID: os.getenv("REACT_APP_MEASUREMENT_ID")

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
