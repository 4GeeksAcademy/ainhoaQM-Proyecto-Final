"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from sqlalchemy.exc import IntegrityError
from flask import Flask, request, jsonify, redirect, url_for, Blueprint
from api.models import db, User, Product, Menu, Category, Order, OrderDetail, DiscountCode, UsedDiscountCode, ContactMessage, Reservation
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

# Ruta para crear usuario
@api.route('/signup', methods=['POST'])
def create_user():
    try:
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
    except Exception as e:
        print(str(e))
        return jsonify({"msg": str(e)}), 400
    
# Ruta para registrar usuarios con Firebase
@api.route('/signup-firebase', methods=['POST'])
def create_user_firebase():
    try:
        body = request.get_json()
        email = body["email"]
        password = body["password"]
        user_name = body["user_name"]

        existing_user = User.query.filter_by(email=email).first()

        if existing_user:
            access_token = create_access_token(identity=existing_user.serialize(), additional_claims={"user_name": existing_user.user_name, "user_id": existing_user.id, "email": existing_user.email})  
            response_body = {
                "token": access_token,
                "email": existing_user.email,
                "user_name": existing_user.user_name
            }
            return jsonify(response_body), 200

        new_user = User(email=email, user_name=user_name)
        new_user.set_password(password)

        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(new_user, additional_claims={"user_name": new_user.user_name, "user_id": new_user.id, "email": new_user.email})

        response_body = {
            "token": access_token,
            "email": new_user.email,
            "user_name": new_user.user_name   
        }

        return jsonify(response_body), 201

    except Exception as e:
        print(e) 
        return jsonify({"msg": "Ocurrió un error al procesar la solicitud"}), 400

# Ruta para iniciar sesion
@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body["email"]
    password = body["password"]

    user = User.query.filter_by(email=email, password=password).first()
    if user == None:
        return jsonify({"msg": "El usario y/o la contraseña no son correctos"}), 401

    access_token = create_access_token(identity=user.serialize(), additional_claims={"user_name": user.user_name, "user_id": user.id, "email": user.email})
    response_body = {
        "msg": "Token creada correctamente",
        "token": access_token,
        "email": email,
        "user_name": user.user_name, 
    }
    
    return jsonify(response_body), 200

# Ruta para verificar si el correo ya está registrado en la recuperacion de contraseña
@api.route('/check-email', methods=['POST'])
def check_email():
    try:
        body = request.get_json()
        email = body["email"]

        # Verificar si el correo electrónico está en la base de datos
        existing_user = User.query.filter_by(email=email).first()

        if existing_user:
            response_body = {"msg": "El correo electrónico está registrado"}
            return jsonify(response_body), 200
        else:
            response_body = {"msg": "El correo electrónico no está registrado"}
            return jsonify(response_body), 404

    except Exception as e:
        return jsonify({"msg": str(e)}), 400

# Ruta para cambiar la contraseña
@api.route('/new-password', methods=['POST'])
def change_password():
    try:
        body = request.get_json()
        email = body["email"]
        new_password = body["newPassword"]
        repeat_password = body.get("repeatPassword") 

        user = User.query.filter_by(email=email).first()

        if user:
            if len(new_password) < 8:
                return jsonify({"msg": "La contraseña debe tener al menos 8 caracteres."}), 400

            if new_password == repeat_password:
                user.set_password(new_password)
                db.session.commit()
                return jsonify({"msg": "Contraseña cambiada exitosamente"}), 200
            else:
                return jsonify({"msg": "Las contraseñas no coinciden"}), 400
        else:
            return jsonify({"msg": "Usuario no encontrado"}), 404

    except Exception as e:
        return jsonify({"msg": str(e)}), 400

# Ruta para ver todos los usuarios y sus pedidos
@api.route('/users-orders', methods=['GET'])
def get_users_orders():
    try:
        users = User.query.all()
        user_list = []

        for user in users:
            user_data = {
                "id": user.id,
                "email": user.email,
                "user_name": user.user_name,
                "orders": [order.serialize() for order in user.orders]
            }
            user_list.append(user_data)

        return jsonify(user_list), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

@api.route('/user-orders/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_orders_(user_id):
    try:
        user = get_jwt_identity()
        if user.get('id') != user_id:
            return jsonify({"msg": "Acceso no autorizado"}), 403

        user = User.query.get(user_id)

        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        orders = [order.serialize() for order in user.orders]

        return jsonify(orders), 200

    except Exception as e:
        return jsonify({"msg": str(e)}), 500

    
# Ruta para crear un menu
@api.route('/create-menu', methods=['POST'])
def create_menu():
    try:
        data = request.get_json()

        starter_id = data.get('starter_id')
        dish_id = data.get('dish_id')
        drink_id = data.get('drink_id')
        dessert_id = data.get('dessert_id')

        data.get('starter_name')
        data.get('dish_name')
        data.get('drink_name')
        data.get('dessert_name')

        # Crear una nueva instancia de Menu
        new_menu = Menu(
            starter_id=starter_id, 
            dish_id=dish_id, 
            drink_id=drink_id, 
            dessert_id=dessert_id)

        # Asignar los productos relacionados al menú
        new_menu.starter = Product.query.get(starter_id)
        new_menu.dish = Product.query.get(dish_id)
        new_menu.drink = Product.query.get(drink_id)
        new_menu.dessert = Product.query.get(dessert_id)

        # Actualizar los nombres de los productos y la descripción del menú
        new_menu.update_menu_description()

        # Guardar el menú
        new_menu.save()  

        serialized_menu = new_menu.serialize()
        response_data = {
            "message": "Menu created successfully",
            "menu": {
                "id": serialized_menu["id"],
                "price": serialized_menu["price"],
                "menu_description": new_menu.menu_description
            }
        }
        print("Response Data:", response_data)

        return jsonify(response_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Ruta para crear un producto
@api.route('/create-product', methods=['POST'])
def create_product():
    body = request.get_json()

    name = body.get('name')
    price = body.get('price')
    image_url = body.get('image_url')
    description = body.get('description') 
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

""" # Ruta para que el cliente pueda ver un producto en específico
@api.route('/product/<int:product_id>', methods=['GET'])
def product_detail(product_id):
    product = Product.query.filter_by(id=product_id).first()

    if not product:
        return jsonify({"msg": "Producto no encontrado"}), 404

    response_body = {
        "msg": "Detalle del producto por ID",
        "product": product.serialize()
    }

    return jsonify(response_body), 200 """

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
@jwt_required()
def validate_discount():
    try:
        code = request.json.get('code')
        print(f'Código de descuento recibido: {code}')
        discount = DiscountCode.query.filter_by(code=code).first()

        if discount:
            user_id = get_jwt_identity().get('id')
            used_discount = UsedDiscountCode.query.filter_by(user_id=user_id, discount_code_id=discount.id).first()

            if used_discount:
                return jsonify({'The discount is': False, 'percentage_discount': 0, 'message': 'El código de descuento ya ha sido utilizado'})
            else:
                return jsonify({
                    'The discount is': True,
                    'id': discount.id,
                    'code': discount.code,
                    'percentage': discount.percentage
                })
        else:
            return jsonify({'The discount is': False, 'percentage_discount': 0, 'message': 'Código de descuento inválido'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

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

# Ruta para registrar un pedido 
@api.route('/create-order', methods=['POST'])
@jwt_required()
def create_order():
    try:
        user = get_jwt_identity()
        data = request.get_json() 
        print("User received:", user)
        print("Data received:", data)

        discount_code = DiscountCode.query.filter_by(code=data.get('discountCode')).first()
        discount_code_id = discount_code.id if discount_code else None
        print("Discount Code:", discount_code)
        print("Discount Code ID:", discount_code_id)

        new_order = Order(
            user_id=user.get('id'),
            order_comments=data.get('orderComments'),
            takeaway=data.get('takeaway'),
            payment_method=data.get('paymentMethod'),
            discount_code_id=discount_code_id
        )

        order_details = []  

        for item in data.get('cart'):
            if item.get('name') == "Menú":
                menu = item
                order_detail = OrderDetail(
                    order=new_order,
                    menu_id=menu.get('id'),
                    menu_description=menu.get('description'),
                    quantity=item.get('quantity'), 
                    price=menu.get('price') * item.get('quantity')
                )
            else:
                order_detail = OrderDetail(
                    order=new_order,
                    product_id=item.get('id'),
                    product_name=item.get('name'),
                    quantity=item.get('quantity'),
                    price=item.get('price')
                )

            order_details.append(order_detail)  

        total_price = sum(order_detail.price for order_detail in order_details)

        if discount_code:
            total_price *= (1 - discount_code.percentage / 100)

        new_order.total_price = total_price
        db.session.add_all(order_details)

        new_order.order_details = order_details
        db.session.add(new_order)
        db.session.commit()

        if discount_code_id:
            used_discount = UsedDiscountCode(user_id=user.get('id'), discount_code_id=discount_code_id)
            db.session.add(used_discount)
            db.session.commit()

        return jsonify({'message': 'Orden creada exitosamente', 'id': new_order.id}), 200

    except Exception as e:
        return jsonify({'message': str(e)}), 400

# Ruta para obtener un pedido por id 
@api.route('/order/<int:order_id>', methods=['GET'])
@jwt_required()
def get_order_(order_id):
    try:
        user = get_jwt_identity()
        order = Order.query.filter_by(id=order_id, user_id=user.get('id')).first()

        if not order:
            return jsonify({'message': 'Pedido no encontrado'}), 404

        return jsonify(order.serialize()), 200

    except Exception as e:
        return jsonify({'message': str(e)}), 400

# Ruta para eliminar todos los pedidos
@api.route('/delete-all-orders', methods=['DELETE'])
def delete_all_orders():
    try:
        OrderDetail.query.delete()
        Order.query.delete()

        db.session.commit()

        return jsonify({'message': 'Se eliminaron todos los pedidos y detalles de pedido'}), 200

    except Exception as e:
        return jsonify({'message': str(e)}), 400
