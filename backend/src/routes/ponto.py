from flask import Blueprint, request, jsonify
from src.models.user import db, RegistroPonto, User
from datetime import datetime, date
import jwt
import os

ponto_bp = Blueprint('ponto', __name__)

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

@ponto_bp.route('/ponto/registrar', methods=['POST'])
def registrar_ponto():
    try:
        user = get_user_from_token()
        if not user:
            return jsonify({'error': 'Token inválido ou expirado'}), 401
        
        data = request.get_json()
        tipo = data.get('tipo')  # entrada, pausa, retorno, saida
        
        if tipo not in ['entrada', 'pausa', 'retorno', 'saida']:
            return jsonify({'error': 'Tipo de registro inválido'}), 400
        
        # Criar registro de ponto
        registro = RegistroPonto(
            user_id=user.id,
            data=date.today(),
            tipo=tipo,
            horario=datetime.now(),
            observacao=data.get('observacao')
        )
        
        db.session.add(registro)
        db.session.commit()
        
        return jsonify(registro.to_dict()), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@ponto_bp.route('/ponto/hoje', methods=['GET'])
def get_ponto_hoje():
    try:
        user = get_user_from_token()
        if not user:
            return jsonify({'error': 'Token inválido ou expirado'}), 401
        
        hoje = date.today()
        registros = RegistroPonto.query.filter_by(
            user_id=user.id,
            data=hoje
        ).order_by(RegistroPonto.horario).all()
        
        return jsonify([registro.to_dict() for registro in registros]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ponto_bp.route('/ponto/historico', methods=['GET'])
def get_historico_ponto():
    try:
        user = get_user_from_token()
        if not user:
            return jsonify({'error': 'Token inválido ou expirado'}), 401
        
        # Parâmetros de filtro
        data_inicio = request.args.get('data_inicio')
        data_fim = request.args.get('data_fim')
        
        query = RegistroPonto.query.filter_by(user_id=user.id)
        
        if data_inicio:
            query = query.filter(RegistroPonto.data >= datetime.strptime(data_inicio, '%Y-%m-%d').date())
        
        if data_fim:
            query = query.filter(RegistroPonto.data <= datetime.strptime(data_fim, '%Y-%m-%d').date())
        
        registros = query.order_by(RegistroPonto.data.desc(), RegistroPonto.horario.desc()).all()
        
        return jsonify([registro.to_dict() for registro in registros]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ponto_bp.route('/ponto/relatorio', methods=['GET'])
def get_relatorio_ponto():
    try:
        # Esta rota seria para RH/Admin
        user = get_user_from_token()
        if not user or user.tipo_usuario not in ['rh', 'admin']:
            return jsonify({'error': 'Acesso negado'}), 403
        
        # Parâmetros de filtro
        user_id = request.args.get('user_id')
        data_inicio = request.args.get('data_inicio')
        data_fim = request.args.get('data_fim')
        
        query = RegistroPonto.query
        
        if user_id:
            query = query.filter_by(user_id=user_id)
        
        if data_inicio:
            query = query.filter(RegistroPonto.data >= datetime.strptime(data_inicio, '%Y-%m-%d').date())
        
        if data_fim:
            query = query.filter(RegistroPonto.data <= datetime.strptime(data_fim, '%Y-%m-%d').date())
        
        registros = query.order_by(RegistroPonto.data.desc(), RegistroPonto.horario.desc()).all()
        
        return jsonify([registro.to_dict() for registro in registros]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

