from flask import Blueprint, request, jsonify
from src.models.user import db, Vaga, Candidatura
from src.routes.auth import verify_token
import os
from werkzeug.utils import secure_filename

vagas_bp = Blueprint('vagas', __name__)

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'uploads')
ALLOWED_EXTENSIONS = {'pdf'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@vagas_bp.route('/vagas', methods=['GET'])
def get_vagas():
    try:
        vagas = Vaga.query.filter_by(status='Ativa').all()
        return jsonify([vaga.to_dict() for vaga in vagas]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@vagas_bp.route('/vagas/<int:vaga_id>', methods=['GET'])
def get_vaga(vaga_id):
    try:
        vaga = Vaga.query.get_or_404(vaga_id)
        return jsonify(vaga.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@vagas_bp.route('/vagas', methods=['POST'])
def create_vaga():
    try:
        data = request.get_json()
        
        nova_vaga = Vaga(
            titulo=data.get('titulo'),
            departamento=data.get('departamento'),
            descricao=data.get('descricao'),
            localizacao=data.get('localizacao'),
            tipo_contrato=data.get('tipo_contrato'),
            salario_min=data.get('salario_min'),
            salario_max=data.get('salario_max'),
            requisitos='|'.join(data.get('requisitos', [])),
            beneficios='|'.join(data.get('beneficios', []))
        )
        
        db.session.add(nova_vaga)
        db.session.commit()
        
        return jsonify(nova_vaga.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@vagas_bp.route('/vagas/<int:vaga_id>/candidatar', methods=['POST'])
def candidatar_vaga(vaga_id):
    try:
        # Verificar se a vaga existe
        vaga = Vaga.query.get_or_404(vaga_id)
        
        # Obter dados do formulário
        nome_candidato = request.form.get('nome_candidato')
        email_candidato = request.form.get('email_candidato')
        carta_apresentacao = request.form.get('carta_apresentacao')
        
        if not nome_candidato or not email_candidato:
            return jsonify({'error': 'Nome e email são obrigatórios'}), 400
        
        # Verificar se foi enviado um arquivo
        if 'curriculo' not in request.files:
            return jsonify({'error': 'Currículo é obrigatório'}), 400
        
        file = request.files['curriculo']
        if file.filename == '':
            return jsonify({'error': 'Nenhum arquivo selecionado'}), 400
        
        if file and allowed_file(file.filename):
            # Criar diretório de upload se não existir
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)
            
            filename = secure_filename(file.filename)
            # Adicionar timestamp para evitar conflitos
            timestamp = str(int(datetime.now().timestamp()))
            filename = f"{timestamp}_{filename}"
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(file_path)
            
            # Criar candidatura
            candidatura = Candidatura(
                vaga_id=vaga_id,
                nome_candidato=nome_candidato,
                email_candidato=email_candidato,
                curriculo_path=file_path,
                carta_apresentacao=carta_apresentacao
            )
            
            db.session.add(candidatura)
            db.session.commit()
            
            return jsonify(candidatura.to_dict()), 201
        else:
            return jsonify({'error': 'Formato de arquivo não permitido. Use apenas PDF.'}), 400
            
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@vagas_bp.route('/candidaturas', methods=['GET'])
def get_candidaturas():
    try:
        candidaturas = Candidatura.query.all()
        return jsonify([candidatura.to_dict() for candidatura in candidaturas]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

