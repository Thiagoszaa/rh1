import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from src.models.user import db
from src.routes.auth import auth_bp
from src.routes.vagas import vagas_bp
from src.routes.ponto import ponto_bp
from src.routes.justificativas import justificativas_bp
from src.routes.colaboradores import colaboradores_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'

# Configurar CORS para permitir acesso do frontend
CORS(app, origins=['http://localhost:5173', 'http://127.0.0.1:5173'])

# Registrar blueprints
app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(vagas_bp, url_prefix='/api')
app.register_blueprint(ponto_bp, url_prefix='/api')
app.register_blueprint(justificativas_bp, url_prefix='/api')
app.register_blueprint(colaboradores_bp, url_prefix='/api')

# Configurar banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Criar tabelas e dados iniciais
with app.app_context():
    db.create_all()
    
    # Verificar se já existem dados iniciais
    from src.models.user import User, Vaga
    
    if User.query.count() == 0:
        # Criar usuário administrador padrão
        admin = User(
            nome='Administrador',
            email='admin@empresa.com',
            cargo='Administrador do Sistema',
            departamento='TI',
            telefone='(11) 99999-9999',
            status='Ativo',
            tipo_usuario='admin'
        )
        admin.set_password('admin123')
        
        # Criar usuário RH padrão
        rh_user = User(
            nome='Maria Silva',
            email='rh@empresa.com',
            cargo='Analista de RH',
            departamento='Recursos Humanos',
            telefone='(11) 88888-8888',
            status='Ativo',
            tipo_usuario='rh'
        )
        rh_user.set_password('rh123')
        
        # Criar usuário funcionário padrão
        funcionario = User(
            nome='Thiago Henrique Soares de Souza',
            email='thiago@empresa.com',
            cargo='Analista de Sistemas',
            departamento='Tecnologia',
            telefone='(11) 77777-7777',
            status='Ativo',
            tipo_usuario='funcionario'
        )
        funcionario.set_password('123456')
        
        db.session.add(admin)
        db.session.add(rh_user)
        db.session.add(funcionario)
        
        # Criar vagas iniciais
        vaga1 = Vaga(
            titulo='RH Profissional',
            departamento='Recursos Humanos',
            descricao='Profissional dedicado a promover um ambiente organizacional saudável e eficiente.',
            localizacao='São Paulo, SP',
            tipo_contrato='CLT',
            salario_min=4500,
            salario_max=6000,
            requisitos='Graduação em Psicologia ou RH|Experiência mínima de 2 anos|Conhecimento em legislação trabalhista',
            beneficios='Vale alimentação|Plano de saúde|Vale transporte'
        )
        
        vaga2 = Vaga(
            titulo='Desenvolvedor',
            departamento='Tecnologia',
            descricao='Desenvolvedor focado em criar soluções tecnológicas inovadoras.',
            localizacao='Remote',
            tipo_contrato='PJ',
            salario_min=6000,
            salario_max=10000,
            requisitos='Graduação em Ciência da Computação ou similar|Experiência com React e Node.js|Conhecimento em bancos de dados',
            beneficios='Trabalho remoto|Horário flexível|Equipamentos fornecidos'
        )
        
        vaga3 = Vaga(
            titulo='Caixa',
            departamento='Comercial',
            descricao='Atendente de caixa ágil, responsável e com foco no bom atendimento ao cliente.',
            localizacao='Rio de Janeiro, RJ',
            tipo_contrato='CLT',
            salario_min=1800,
            salario_max=2500,
            requisitos='Ensino médio completo|Experiência em atendimento|Disponibilidade de horário',
            beneficios='Vale alimentação|Vale transporte|Comissão por vendas'
        )
        
        db.session.add(vaga1)
        db.session.add(vaga2)
        db.session.add(vaga3)
        
        db.session.commit()
        print("Dados iniciais criados com sucesso!")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
            return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404

@app.route('/api/health', methods=['GET'])
def health_check():
    return {'status': 'OK', 'message': 'API funcionando corretamente'}, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

