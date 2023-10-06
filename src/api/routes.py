"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, Category, Order, OrderDetail
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

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

#Ruta para verificar el token
@api.route('/verify-token', methods=['POST'])
@jwt_required()
def verify_token():
    current_user = get_jwt_identity()
    return jsonify(logged_in=True, user=current_user), 200


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

# Ruta para ver los primeros 5 productos
@api.route('/category-<int:category_id>/first_products', methods=['GET'])
def get_first_products_by_category(category_id):
    category = Category.query.get(category_id)
    if not category:
        return jsonify({"msg": "Categoría no encontrada"}), 404

    first_products = Product.query.filter_by(category_id=category_id).limit(5).all()
    serialized_first_products = [product.serialize() for product in first_products]

    response_body = {
        "category": category.name,
        "products": serialized_first_products
    }

    return jsonify(response_body), 200

# Ruta para ver tu carrito
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

# Ruta para que el cliente pueda eliminar un producto del carrito
@api.route('/cart/delete-product-<int:product_id>', methods=['DELETE'])
@jwt_required()  
def remove_product_from_cart(product_id):
    # Accede a la identidad del usuario actual con get_jwt_identity.
    current_user = get_jwt_identity()

    # Busca el carrito de compra del usuario
    cart = Order.query.filter_by(user_id=current_user['id']).first()
    if not cart:
        return jsonify({"msg": "No se encontró un carrito de compra para este usuario"}), 404
    
    # Busca el producto a eliminar en el carrito
    product_detail = OrderDetail.query.filter_by(order_id=cart.id, product_id=product_id).first()
    if not product_detail:
        return jsonify({"msg": "El producto no está en el carrito de compra"}), 404
    
    # Eliminar el producto del carrito
    db.session.delete(product_detail)
    db.session.commit()
    return jsonify({"msg": "El producto ha sido eliminado del carrito de compra"}), 200

# Ruta para que el cliente pueda cancelar el pedido y vaciar el carrito de la compra
@api.route('/cart/cancel-order/', methods=['POST'])
@jwt_required()  
def cancel_order():
    # Accede a la identidad del usuario actual con get_jwt_identity.
    current_user = get_jwt_identity()

    # Busca el carrito de compra del usuario
    cart = Order.query.filter_by(user_id=current_user['id']).first()
    if not cart:
        return jsonify({"msg": "No se encontró un carrito de compra para este usuario"}), 404
    
    # Vacia el carrito de compra
    cart.products = []
    db.session.commit()
    
    return jsonify({"msg": "El pedido ha sido cancelado correctamente"}), 200
