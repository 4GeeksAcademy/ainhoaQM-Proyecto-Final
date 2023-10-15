"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, redirect, url_for, Blueprint
from api.models import db, User, Product, Category, Order, OrderDetail, DiscountCode, ContactMessage, Reservation
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import unset_jwt_cookies
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from authlib.integrations.flask_client import OAuth


api = Blueprint('api', __name__)



# Ruta para crear usuario
@api.route('/signup', methods=['POST'])
def create_user():
    body = request.get_json()
    email = body["email"]
    password = body["password"]
    user_name = body["user_name"]

    # Verificar si el correo electrónico ya está en la base de datos
    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        response_body = {"msg": "El correo electrónico ya está registrado"}
        return jsonify(response_body), 400

    # Utiliza el método set_password para validar y asignar la contraseña
    new_user = User(email=email, user_name=user_name)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()
    response_body = {"msg": "Usuario creado correctamente"}

    return jsonify(response_body), 200

# Ruta para iniciar sesion
@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body["email"]
    password = body["password"]

    user = User.query.filter_by(email=email, password=password).first()
    if user == None:
        return jsonify({"msg": "El usario y/o la contraseña no son correctos"}), 401

    access_token = create_access_token(identity=user.serialize(), additional_claims={"user_name": user.user_name})
    response_body = {
        "msg": "Token creada correctamente",
        "token": access_token,
        "email": email,
        "user_name": user.user_name, 
    }
    
    return jsonify(response_body), 200

# Rutas para la autenticación con Google
oauth = OAuth()
google = oauth.register(
    name='google',
    client_id=os.getenv('GOOGLE_CLIENT_ID'),
    client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    refresh_token_url=None,
    redirect_url=None,
    client_kwargs={'scope': 'openid profile email'},
)

@api.route('/login/google', methods=['POST'])
def login_with_google():
    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

    authorization_endpoint = google_provider_cfg["autorizathion_endpoint"]
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=request.base_url + "/login/callback",
        scope=["openid", "email", "profile"],
    )
    token_url, headers, body = client.prepare_token_request(
    token_endpoint,
    authorization_response=request.url,
    redirect_url=request.base_url,
    code=code
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    # Parse the tokens!
    client.parse_request_body_response(json.dumps(token_response.json()))

    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    if userinfo_response.json().get("email_verified"):
        unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
        users_name = userinfo_response.json()["given_name"]
    else:
        return "User email not available or not verified by Google.", 400
        user = User(
        id_=unique_id, name=users_name, email=users_email, profile_pic=picture  
    )

    # Doesn't exist? Add it to the database.
    if not User.get(unique_id):
        User.create(unique_id, users_name, users_email, picture)

    # Begin user session by logging the user in
    login_user(user)

    # Send user back to homepage
    return redirect(url_for("index"))

@api.route('login/callback', methods=['GET'])
def callback():
    code = request.args.get("code")
    if not code:
        return "Error: no se recibió el código de autorización.", 400

# Ruta para cerrar sesion con Google
@api.route('/logout/google', methods=['POST'])
@jwt_required()
def logout_google():
    # Obtener el token de acceso de Google del usuario
    token = google.authorize_access_token()

    # Revocar el token de acceso de Google
    google_token_revocation_url = 'https://accounts.google.com/o/oauth2/revoke?token=' + token['access_token']
    response = requests.get(google_token_revocation_url)

    if response.status_code == 200:
        return jsonify({"msg": "Sesión de Google cerrada exitosamente"}), 200
    else:
        # Ocurrió un error al revocar el token
        return jsonify({"msg": "Error al cerrar la sesión de Google"}), response.status_code

# Ruta para crear un producto
@api.route('/create-product', methods=['POST'])
def create_product():
    body = request.get_json()

    name = body.get('name')
    price = body.get('price')
    image_url = body.get('image_url')
    description = body.get('description')  # Asegúrate de incluir description
    category_id = body.get('category_id')

    if not name or not price or not image_url or not category_id:
        return jsonify({"msg": "No se puedo crear el producto, faltan campos obligatorios"}), 400

    new_product = Product(name=name, price=price, image_url=image_url, description=description, category_id=category_id)

    db.session.add(new_product)
    db.session.commit()

    response_body = {
        "msg": "Producto creado correctamente",
        "product": new_product.serialize()
    }

    return jsonify(response_body), 200


# Ruta para ver todos los productos
@api.route('/products', methods=['GET'])
def get_all_products():
    products = Product.query.order_by(Product.id.asc()).all()
    
    serialized_products = [product.serialize() for product in products]
    
    response_body = {
        "msg": "Lista de productos",
        "products": serialized_products
    }
    
    return jsonify(response_body), 200

# Ruta para que el cliente pueda ver un producto en específico
@api.route('/product/<int:product_id>', methods=['GET'])
def product_detail(product_id):
    product = Product.query.filter_by(id=product_id).first()

    if not product:
        return jsonify({"msg": "Producto no encontrado"}), 404

    response_body = {
        "msg": "Detalle del producto por ID",
        "product": product.serialize()
    }

    return jsonify(response_body), 200

# Ruta para editar un product
@api.route('/edit-product/<int:product_id>', methods=['PUT'])
def edit_product(product_id):
    # Obtener los datos del producto a editar del cuerpo de la solicitud
    body = request.get_json()
    new_name = body.get('new_name')
    new_category_id = body.get('new_category_id')
    new_price = body.get('new_price')
    new_image_url = body.get('new_image_url')
    new_description = body.get('new_description')

    # Buscar el producto en la base de datos por su ID
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"msg": "El producto no fue encontrado"}), 404
    
    # Actualizar los campos del producto con los nuevos valores
    if new_name:
        product.name = new_name
    if new_category_id:
        product.category_id = new_category_id
    if new_price:
        product.price = new_price
    if new_image_url:
        product.image_url = new_image_url
    if new_description:
        product.description = new_description
    
    db.session.commit()

    response_body = {
        "msg": "Producto editado correctamente",
        "product": product.serialize()
    }

    return jsonify(response_body), 200

# Ruta para eliminar un producto de la db
@api.route('/delete-product/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    # Buscar el producto en la base de datos
    product = Product.query.get(product_id)

    if not product:
        # Si el producto no existe, devolver una respuesta de error
        return jsonify({'error': 'El producto no existe.'}), 404

    try:
        # Eliminar el producto de la base de datos
        db.session.delete(product)
        db.session.commit()
        # Devolver una respuesta exitosa
        return jsonify({'message': 'Producto eliminado correctamente.'}), 200
    except Exception as e:
        # Si hay algun error durante la eliminación, devolver una respuesta de error
        return jsonify({'error': 'Error al eliminar el producto.'}), 500

# Ruta para crear las categorías de los productos (1. Entrantes, 2. Platos, 3. Bebidas, 4. Postres)
@api.route('/create-category', methods=['POST'])
def create_category():
    name = request.json.get('name')

    if not name:
        return jsonify({'error': 'El nombre de la categoría es requerido'}), 400

    category = Category.query.filter_by(name=name).first()

    if category:
        return jsonify({'error': 'La categoría ya existe'}), 400

    new_category = Category(name=name)
    db.session.add(new_category)
    db.session.commit()

    return jsonify({'message': 'Categoría creada exitosamente'}), 200

# Ruta para todas las categorías de los productos
@api.route('/categories', methods=['GET'])
def get_all_categories():
    categories = Category.query.all()
    
    serialized_categories = [category.serialize() for category in categories]
    
    response_body = {
        "msg": "Lista de categorías de productos",
        "categories": serialized_categories
    }
    
    return jsonify(response_body), 200

# Ruta para mostrar todos los productos de una categoría específica
@api.route('/category-<int:category_id>/products', methods=['GET'])
def get_products_by_category(category_id):
    category = Category.query.get(category_id)
    if not category:
        return jsonify({"msg": "Categoría no encontrada"}), 404
    
    products = Product.query.filter_by(category_id=category_id).all()
    serialized_products = [product.serialize() for product in products]
    
    response_body = {
        "category": category.name,
        "products": serialized_products
    }
    
    return jsonify(response_body), 200

# Ruta para ver el carrito
@api.route("/cart", methods=["GET"])
@jwt_required()
def nav_cart():
    # Accede a la identidad del usuario actual con get_jwt_identity.
    current_user = get_jwt_identity()

    # Busca el carrito de compra del usuario 
    cart = Order.query.filter_by(user_id=current_user['id']).first()
    if not cart:
        return jsonify({"msg": "No hay productos en el carrito de la compra"}), 404
    serialized_products = [detail.serialize() for detail in cart.products]
    response_body = {
        "msg": "Aqui esta tu carrito de compra",
        "user": current_user,
        "products": serialized_products
    }
    return jsonify(response_body), 200

# Ruta para crear un nuevo código de descuento
@api.route('/create-discount', methods=['POST'])
def create_discount():
    data = request.get_json()  
    
    code = data.get('code')
    percentage = data.get('percentage')
    try:
        new_discount = DiscountCode(code=code, percentage=percentage)
        db.session.add(new_discount)
        db.session.commit()
        return jsonify({'message': 'Código de descuento creado con éxito.'})
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'El código de descuento ya existe.'}), 400

# Ruta para validar el código de descuento
@api.route('/validate-discount', methods=['POST'])
def validate_discount():
    code = request.json.get('code') 
    print(f'Código de descuento recibido: {code}')
    discount = DiscountCode.query.filter_by(code=code).first()
    
    if discount:
        return jsonify({'The discount is': True, 'percentage_discount': discount.percentage})
    else:
        return jsonify({'The discount is': False, 'percentage_discount': 0})

# Ruta para guardar "Contacta con Nosotros"
@api.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    new_message = ContactMessage(name=name, email=email, message=message)
    db.session.add(new_message)
    db.session.commit()

    return jsonify({'message': 'Mensaje recibido correctamente'})

# Ruta para ver los mensajes de "Contacta con nosotros"
@api.route('/messages', methods=['GET'])
def get_messages():
    messages = ContactMessage.query.all()
    message_list = []

    for message in messages:
        message_data = {
            'id': message.id,
            'name': message.name,
            'email': message.email,
            'message': message.message
        }
        message_list.append(message_data)

    return jsonify({'messages': message_list})

# Ruta para eliminar un mensaje por su ID
@api.route('/messages/<int:message_id>', methods=['DELETE'])
def delete_message(message_id):
    message = ContactMessage.query.get(message_id)
    if message:
        db.session.delete(message)
        db.session.commit()
        return jsonify({'message': 'Mensaje eliminado correctamente'})
    else:
        return jsonify({'message': 'Mensaje no encontrado'}), 404

# Ruta para crear una nueva reserva
@api.route('/create-reservation', methods=['POST'])
def create_reservation():
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    location = data.get('location')
    date = data.get('date')
    time = data.get('time')
    number_of_people = data.get('numberOfPeople')

    new_reservation = Reservation(name=name, email=email, location=location, date=date, time=time, number_of_people=number_of_people)
    db.session.add(new_reservation)
    db.session.commit()

    return jsonify({'message': 'Solicitud de reserva creada correctamente'})

# Ruta para ver todas las reservas enviadas
@api.route('/view-reservations', methods=['GET'])
def view_reservations():
    reservations = Reservation.query.all()
    
    serialized_reservations = [reservation.serialize() for reservation in reservations]
    
    response_body = {
        "msg": "Lista de reservas enviadas",
        "reservations": serialized_reservations
    }
    
    return jsonify(response_body), 200

# Ruta para eliminar una reserva por su ID
@api.route('/delete-reservation/<int:reservation_id>', methods=['DELETE'])
def delete_reservation(reservation_id):
    reservation = Reservation.query.get(reservation_id)
    if reservation:
        db.session.delete(reservation)
        db.session.commit()
        return jsonify({'message': 'Reserva eliminada correctamente'}), 200
    else:
        return jsonify({'message': 'Reserva no encontrada'}), 404


