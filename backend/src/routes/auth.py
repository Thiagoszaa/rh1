from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from src.models.user import db, User
import jwt
from datetime import datetime, timedelta
import os

auth_bp = Blueprint('auth', __name__)

SECRET_KEY = os.environ.get('SECRET_KEY', 'asdf#FGSgvasgf$5$WGT')

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': 'Email e senha são obrigatórios'}), 400

        user = User.query.filter_by(email=email).first()
        
        if user and user.check_password(password):
            # Gerar token JWT
            token = jwt.encode({
                'user_id': user.id,
                'exp': datetime.utcnow() + timedelta(hours=24)
            }, SECRET_KEY, algorithm='HS256')
            
            return jsonify({
                'token': token,
                'user': user.to_dict()
            }), 200
        else:
            return jsonify({'error': 'Credenciais inválidas'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        nome = data.get('nome')
        email = data.get('email')
        password = data.get('password')

        if not nome or not email or not password:
            return jsonify({'error': 'Nome, email e senha são obrigatórios'}), 400

        # Verificar se o usuário já existe
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'error': 'Email já cadastrado'}), 400

        # Criar novo usuário
        new_user = User(
            nome=nome,
            email=email,
            cargo=data.get('cargo', 'Funcionário'),
            departamento=data.get('departamento', 'Geral'),
            telefone=data.get('telefone'),
            status='Ativo'
        )
        new_user.set_password(password)

        db.session.add(new_user)
        db.session.commit()

        # Gerar token JWT
        token = jwt.encode({
            'user_id': new_user.id,
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, SECRET_KEY, algorithm='HS256')

        return jsonify({
            'token': token,
            'user': new_user.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/verify', methods=['POST'])
def verify_token():
    try:
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token não fornecido'}), 401

        if token.startswith('Bearer '):
            token = token[7:]

        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        user = User.query.get(payload['user_id'])
        
        if user:
            return jsonify({'user': user.to_dict()}), 200
        else:
            return jsonify({'error': 'Usuário não encontrado'}), 404

    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token expirado'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Token inválido'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

