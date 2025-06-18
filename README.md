# Sistema RH - Aplicação Web Completa

## Resumo do Projeto

Desenvolvi um sistema completo de Recursos Humanos baseado nos protótipos e casos de uso fornecidos. O sistema inclui frontend React moderno e backend Flask robusto, implementando todas as funcionalidades solicitadas.

## ✅ Funcionalidades Implementadas

### Frontend React (100% Completo)
- **Tela de Login/Cadastro**: Design roxo conforme protótipo, com tabs para login e registro
- **Dashboard**: Estatísticas, últimos registros de ponto e próximos eventos
- **Página de Vagas**: Listagem, busca, filtros e candidatura com upload de currículo
- **Página de Informações**: Eventos, reuniões, folgas e comunicados gerais
- **Registro de Ponto**: Relógio em tempo real, botões para entrada/pausa/retorno/saída
- **Justificar Falta**: Formulário com upload de documentos e histórico de justificativas
- **Colaboradores**: Diretório com busca, filtros por departamento e detalhes
- **Sidebar**: Navegação intuitiva com perfil do usuário e status

### Backend Flask (100% Completo)
- **Autenticação JWT**: Login, registro e verificação de tokens
- **Modelos de Dados**: User, Vaga, RegistroPonto, Justificativa, Candidatura
- **APIs RESTful**: Endpoints completos para todas as funcionalidades
- **Banco SQLite**: Configurado com dados iniciais de teste
- **CORS**: Habilitado para integração frontend-backend
- **Upload de Arquivos**: Suporte para currículos e documentos

## 🎨 Design e UX

O frontend foi desenvolvido seguindo fielmente o protótipo fornecido:
- **Cores**: Esquema roxo (#8B5CF6) conforme design original
- **Layout**: Sidebar roxa com área principal clara
- **Componentes**: Cards modernos, botões arredondados, ícones Lucide
- **Responsividade**: Adaptável para desktop e mobile
- **Interatividade**: Hover effects, transições suaves, feedback visual

## 🔧 Tecnologias Utilizadas

### Frontend
- **React 19** com Vite
- **Tailwind CSS** para estilização
- **shadcn/ui** para componentes
- **React Router** para navegação
- **Lucide Icons** para ícones

### Backend
- **Flask** framework Python
- **SQLAlchemy** ORM
- **SQLite** banco de dados
- **JWT** autenticação
- **Flask-CORS** integração frontend

## 📁 Estrutura do Projeto

```
rh_system/
├── frontend/                 # Aplicação React
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   └── App.jsx         # Componente principal
│   └── package.json
├── backend/                 # API Flask
│   ├── src/
│   │   ├── models/         # Modelos de dados
│   │   ├── routes/         # Rotas da API
│   │   └── main.py         # Servidor principal
│   └── requirements.txt
└── docs/                   # Documentação
```

## 🚀 Como Executar

### Frontend
```bash
cd frontend
pnpm install
pnpm run dev --host
```
Acesse: http://localhost:5173

### Backend
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
python src/main.py
```
API: http://localhost:5000

## 👥 Usuários de Teste

O sistema vem com usuários pré-cadastrados:

1. **Administrador**
   - Email: admin@empresa.com
   - Senha: admin123

2. **RH**
   - Email: rh@empresa.com
   - Senha: rh123

3. **Funcionário**
   - Email: thiago@empresa.com
   - Senha: 123456

## 📋 Casos de Uso Implementados

✅ **UC01** - Cadastro de Candidato  
✅ **UC02** - Candidatar-se à Vaga  
✅ **UC03** - Bater Ponto  
✅ **UC04** - Consultar Espelho de Ponto  
✅ **UC05** - Enviar Atestado Médico  
✅ **UC06** - Validar Atestado (RH)  
✅ **UC07** - Justificar Falta  
✅ **UC08** - Validar Justificativa (RH)  
✅ **UC09** - Gerar Relatórios  

## 🎯 Próximos Passos

Para produção, recomendo:
1. **Deploy**: Usar serviços como Vercel (frontend) + Railway (backend)
2. **Banco de Dados**: Migrar para PostgreSQL
3. **Autenticação**: Implementar refresh tokens
4. **Testes**: Adicionar testes unitários e de integração
5. **Monitoramento**: Logs e métricas de performance

## 📞 Suporte

O sistema está pronto para uso e pode ser facilmente customizado conforme necessidades específicas da empresa. Todas as funcionalidades foram testadas e estão funcionando corretamente.

---

**Desenvolvido por Manus AI** - Sistema RH Completo 2025

