from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha_hash = db.Column(db.String(255), nullable=False)
    cargo = db.Column(db.String(100), nullable=True)
    departamento = db.Column(db.String(100), nullable=True)
    telefone = db.Column(db.String(20), nullable=True)
    data_admissao = db.Column(db.Date, nullable=True)
    status = db.Column(db.String(20), default='Ativo')
    tipo_usuario = db.Column(db.String(20), default='funcionario')  # funcionario, rh, admin
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        self.senha_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.senha_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'email': self.email,
            'cargo': self.cargo,
            'departamento': self.departamento,
            'telefone': self.telefone,
            'data_admissao': self.data_admissao.isoformat() if self.data_admissao else None,
            'status': self.status,
            'tipo_usuario': self.tipo_usuario
        }

class Vaga(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(120), nullable=False)
    departamento = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    localizacao = db.Column(db.String(100), nullable=False)
    tipo_contrato = db.Column(db.String(20), nullable=False)  # CLT, PJ
    salario_min = db.Column(db.Float, nullable=True)
    salario_max = db.Column(db.Float, nullable=True)
    requisitos = db.Column(db.Text, nullable=True)
    beneficios = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), default='Ativa')  # Ativa, Inativa
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'titulo': self.titulo,
            'departamento': self.departamento,
            'descricao': self.descricao,
            'localizacao': self.localizacao,
            'tipo_contrato': self.tipo_contrato,
            'salario_min': self.salario_min,
            'salario_max': self.salario_max,
            'requisitos': self.requisitos.split('|') if self.requisitos else [],
            'beneficios': self.beneficios.split('|') if self.beneficios else [],
            'status': self.status,
            'data_criacao': self.data_criacao.isoformat()
        }

class RegistroPonto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    data = db.Column(db.Date, nullable=False)
    tipo = db.Column(db.String(20), nullable=False)  # entrada, pausa, retorno, saida
    horario = db.Column(db.DateTime, nullable=False)
    observacao = db.Column(db.Text, nullable=True)
    
    user = db.relationship('User', backref=db.backref('registros_ponto', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'data': self.data.isoformat(),
            'tipo': self.tipo,
            'horario': self.horario.isoformat(),
            'observacao': self.observacao
        }

class Justificativa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    data_falta = db.Column(db.Date, nullable=False)
    motivo = db.Column(db.String(200), nullable=False)
    descricao = db.Column(db.Text, nullable=True)
    arquivo_path = db.Column(db.String(255), nullable=True)
    status = db.Column(db.String(20), default='Pendente')  # Pendente, Aprovada, Rejeitada
    observacao_rh = db.Column(db.Text, nullable=True)
    data_envio = db.Column(db.DateTime, default=datetime.utcnow)
    data_analise = db.Column(db.DateTime, nullable=True)
    analisado_por = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    
    user = db.relationship('User', foreign_keys=[user_id], backref=db.backref('justificativas', lazy=True))
    analisador = db.relationship('User', foreign_keys=[analisado_por])

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'data_falta': self.data_falta.isoformat(),
            'motivo': self.motivo,
            'descricao': self.descricao,
            'arquivo_path': self.arquivo_path,
            'status': self.status,
            'observacao_rh': self.observacao_rh,
            'data_envio': self.data_envio.isoformat(),
            'data_analise': self.data_analise.isoformat() if self.data_analise else None,
            'analisado_por': self.analisado_por
        }

class Candidatura(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vaga_id = db.Column(db.Integer, db.ForeignKey('vaga.id'), nullable=False)
    nome_candidato = db.Column(db.String(120), nullable=False)
    email_candidato = db.Column(db.String(120), nullable=False)
    curriculo_path = db.Column(db.String(255), nullable=False)
    carta_apresentacao = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), default='Pendente')  # Pendente, Analisando, Aprovada, Rejeitada
    data_candidatura = db.Column(db.DateTime, default=datetime.utcnow)
    
    vaga = db.relationship('Vaga', backref=db.backref('candidaturas', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'vaga_id': self.vaga_id,
            'nome_candidato': self.nome_candidato,
            'email_candidato': self.email_candidato,
            'curriculo_path': self.curriculo_path,
            'carta_apresentacao': self.carta_apresentacao,
            'status': self.status,
            'data_candidatura': self.data_candidatura.isoformat()
        }

