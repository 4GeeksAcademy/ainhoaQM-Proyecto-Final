from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Numeric
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    user_name = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(30), nullable=False)
    orders = db.relationship('Order', backref='user', lazy=True)

    def set_password(self, password):
        if len(password) < 8:
            raise ValueError("La contraseña debe tener al menos 8 caracteres")
        self.password = password

    def __repr__(self):
        return f'<User {self.user_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "user_name": self.user_name,
        }

class Product(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(Numeric(4, 2), nullable=False)
    image_url = db.Column(db.String(300), nullable=False)
    description = db.Column(db.String(2000), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    category = db.relationship('Category', backref=db.backref('products', lazy=True))

    def __repr__(self):
        return f'<Product {self.name}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': float(self.price), 
            'image_url': self.image_url,
            'description': self.description,
            'category_id': self.category_id
        }

class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    def __repr__(self):
        return f'<Category {self.name}>'

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name
        }

class Order(db.Model):
    __tablename__ = 'order'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    products = db.relationship('OrderDetail', backref='order', lazy=True)
    total_price = db.Column(db.Float, nullable=False, default=0.00)
    order_comments = db.Column(db.String(255),nullable=True)
    takeaway = db.Column(db.Boolean, nullable=False, default=False) 
    payment_method = db.Column(db.String(50), nullable=False)
    order_date = db.Column(db.DateTime, nullable=False, default=datetime.now)
    discount_code_id = db.Column(db.Integer, db.ForeignKey('discount_code.id'), nullable=True)
    discount_code = db.relationship('DiscountCode')


    def __init__(self, user_id,order_comments=None):
        self.user_id = user_id
        self.products = []
        self.calculate_total_price()
        self.order_comments = order_comments
        self.order_date = datetime.now()

    def apply_discount(self, discount_code):
        if discount_code:
            used_code = UsedDiscountCode.query.filter_by(user_id=self.user_id, discount_code_id=discount_code.id).first()
            if not used_code:
                self.discount_code = discount_code
                self.total_price *= (1 - discount_code.percentage / 100)
                used_discount = UsedDiscountCode(user_id=self.user_id, discount_code_id=discount_code.id)
                db.session.add(used_discount)
                db.session.commit()

    def calculate_total_price(self):
        self.total_price = sum(detail.price for detail in self.products)
        if self.discount_code:
            self.total_price *= (1 - self.discount_code.percentage / 100)

class OrderDetail(db.Model):
    __tablename__  = 'order_detail'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    product = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float,nullable=False)
    order_date = db.Column(db.DateTime, nullable=False, default=datetime.now)

class DiscountCode(db.Model):
    __tablename__ = 'discount_code'
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(20), unique=True, nullable=False)
    percentage = db.Column(db.Float, nullable=False)
    
class UsedDiscountCode(db.Model):
    __tablename__ = 'used_discount_code'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    discount_code_id = db.Column(db.Integer, db.ForeignKey('discount_code.id'), nullable=False)

class ContactMessage(db.Model):
    __tablename__ = 'contact_messages'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.String(1000), nullable=False)

class Reservation(db.Model):
    __tablename__ = 'reservation'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    number_of_people = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Reservation {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "location": self.location,
            "date": self.date.isoformat(),
            "time": self.time.isoformat(),
            "number_of_people": self.number_of_people
        }


"""  Mostrar la Fecha y Hora de una Orden

from datetime import datetime

# Supongamos que order es una instancia de la clase Order
order_date = order.order_date

# Obtener el año, mes y día
year = order_date.year
month = order_date.month
day = order_date.day

# Obtener la hora, minutos y segundos
hour = order_date.hour
minute = order_date.minute
second = order_date.second

# Formatear la fecha y hora en una cadena específica
formatted_date = order_date.strftime("%Y-%m-%d %H:%M:%S")
 """