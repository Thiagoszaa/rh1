from flask import Blueprint, request, jsonify
from src.models.user import db, User
import jwt
import os

colaboradores_bp = Blueprint('colaboradores', __name__)

SECRET_KEY = os.environ.get('SECRET_KEY', 'asdf#FGSgvasgf$5$WGT')

def get_user_from_token():
    try:
        token = request.headers.get('Authorization')
        if not token:
            return None
        
        if token.startswith('Bearer '):
            token = token[7:]
        
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return User.query.get(payload['user_id'])
    except:
        return None

@colaboradores_bp.route('/colaboradores', methods=['GET'])
def get_colaboradores():
    try:
        user = get_user_from_token()
        if not user:
            return jsonify({'error': 'Token inválido ou expirado'}), 401
        
        # Parâmetros de filtro
        departamento = request.args.get('departamento')
        search = request.args.get('search')
        
        query = User.query.filter_by(status='Ativo')
        
        if departamento and departamento != 'Todos':
            query = query.filter_by(departamento=departamento)
        
        if search:
            search_filter = f"%{search}%"
            query = query.filter(
                db.or_(
                    User.nome.ilike(search_filter),
                    User.cargo.ilike(search_filter),
                    User.departamento.ilike(search_filter),
                    User.email.ilike(search_filter)
                )
            )
        
        colaboradores = query.order_by(User.nome).all()
        
        return jsonify([colaborador.to_dict() for colaborador in colaboradores]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@colaboradores_bp.route('/colaboradores/<int:colaborador_id>', methods=['GET'])
def get_colaborador(colaborador_id):
    try:
        user = get_user_from_token()
        if not user:
            return jsonify({'error': 'Token inválido ou expirado'}), 401
        
        colaborador = User.query.get_or_404(colaborador_id)
        
        return jsonify(colaborador.to_dict()), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@colaboradores_bp.route('/colaboradores/<int:colaborador_id>', methods=['PUT'])
def update_colaborador(colaborador_id):
    try:
        user = get_user_from_token()
        if not user or user.tipo_usuario not in ['rh', 'admin']:
            return jsonify({'error': 'Acesso negado'}), 403
        
        colaborador = User.query.get_or_404(colaborador_id)
        
        data = request.get_json()
        
        # Atualizar campos permitidos
        if 'nome' in data:
            colaborador.nome = data['nome']
        if 'cargo' in data:
            colaborador.cargo = data['cargo']
        if 'departamento' in data:
            colaborador.departamento = data['departamento']
        if 'telefone' in data:
            colaborador.telefone = data['telefone']
        if 'status' in data:
            colaborador.status = data['status']
        if 'tipo_usuario' in data and user.tipo_usuario == 'admin':
            colaborador.tipo_usuario = data['tipo_usuario']
        
        db.session.commit()
        
        return jsonify(colaborador.to_dict()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@colaboradores_bp.route('/departamentos', methods=['GET'])
def get_departamentos():
    try:
        user = get_user_from_token()
        if not user:
            return jsonify({'error': 'Token inválido ou expirado'}), 401
        
        # Buscar departamentos únicos
        departamentos = db.session.query(User.departamento).filter(
            User.departamento.isnot(None),
            User.status == 'Ativo'
        ).distinct().all()
        
        departamentos_list = [dept[0] for dept in departamentos if dept[0]]
        departamentos_list.sort()
        
        return jsonify(departamentos_list), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

