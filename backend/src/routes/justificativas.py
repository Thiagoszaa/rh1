from flask import Blueprint, request, jsonify
from src.models.user import db, Justificativa, User
from datetime import datetime, date
import jwt
import os
from werkzeug.utils import secure_filename

justificativas_bp = Blueprint('justificativas', __name__)

SECRET_KEY = os.environ.get('SECRET_KEY', 'asdf#FGSgvasgf$5$WGT')
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'uploads')
ALLOWED_EXTENSIONS = {'pdf', 'jpg', 'jpeg', 'png'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

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

@justificativas_bp.route('/justificativas', methods=['POST'])
def criar_justificativa():
    try:
        user = get_user_from_token()
        if not user:
            return jsonify({'error': 'Token inválido ou expirado'}), 401
        
        # Obter dados do formulário
        data_falta = request.form.get('data_falta')
        motivo = request.form.get('motivo')
        descricao = request.form.get('descricao')
        
        if not data_falta or not motivo:
            return jsonify({'error': 'Data da falta e motivo são obrigatórios'}), 400
        
        # Converter data
        try:
            data_falta = datetime.strptime(data_falta, '%Y-%m-%d').date()
        except ValueError:
            return jsonify({'error': 'Formato de data inválido. Use YYYY-MM-DD'}), 400
        
        arquivo_path = None
        
        # Verificar se foi enviado um arquivo
        if 'arquivo' in request.files:
            file = request.files['arquivo']
            if file.filename != '' and allowed_file(file.filename):
                # Criar diretório de upload se não existir
                os.makedirs(UPLOAD_FOLDER, exist_ok=True)
                
                filename = secure_filename(file.filename)
                # Adicionar timestamp para evitar conflitos
                timestamp = str(int(datetime.now().timestamp()))
                filename = f"{timestamp}_{filename}"
                arquivo_path = os.path.join(UPLOAD_FOLDER, filename)
                file.save(arquivo_path)
        
        # Criar justificativa
        justificativa = Justificativa(
            user_id=user.id,
            data_falta=data_falta,
            motivo=motivo,
            descricao=descricao,
            arquivo_path=arquivo_path
        )
        
        db.session.add(justificativa)
        db.session.commit()
        
        return jsonify(justificativa.to_dict()), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@justificativas_bp.route('/justificativas', methods=['GET'])
def get_justificativas():
    try:
        user = get_user_from_token()
        if not user:
            return jsonify({'error': 'Token inválido ou expirado'}), 401
        
        justificativas = Justificativa.query.filter_by(user_id=user.id).order_by(
            Justificativa.data_envio.desc()
        ).all()
        
        return jsonify([justificativa.to_dict() for justificativa in justificativas]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@justificativas_bp.route('/justificativas/pendentes', methods=['GET'])
def get_justificativas_pendentes():
    try:
        user = get_user_from_token()
        if not user or user.tipo_usuario not in ['rh', 'admin']:
            return jsonify({'error': 'Acesso negado'}), 403
        
        justificativas = Justificativa.query.filter_by(status='Pendente').order_by(
            Justificativa.data_envio.asc()
        ).all()
        
        return jsonify([justificativa.to_dict() for justificativa in justificativas]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@justificativas_bp.route('/justificativas/<int:justificativa_id>/analisar', methods=['PUT'])
def analisar_justificativa(justificativa_id):
    try:
        user = get_user_from_token()
        if not user or user.tipo_usuario not in ['rh', 'admin']:
            return jsonify({'error': 'Acesso negado'}), 403
        
        justificativa = Justificativa.query.get_or_404(justificativa_id)
        
        data = request.get_json()
        status = data.get('status')  # Aprovada, Rejeitada
        observacao_rh = data.get('observacao_rh')
        
        if status not in ['Aprovada', 'Rejeitada']:
            return jsonify({'error': 'Status inválido'}), 400
        
        justificativa.status = status
        justificativa.observacao_rh = observacao_rh
        justificativa.data_analise = datetime.now()
        justificativa.analisado_por = user.id
        
        db.session.commit()
        
        return jsonify(justificativa.to_dict()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

