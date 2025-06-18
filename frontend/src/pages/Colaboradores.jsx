import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Users, Mail, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';

const Colaboradores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Todos');

  const colaboradores = [
    {
      id: 1,
      nome: 'Thiago Henrique Soares de Souza',
      cargo: 'Analista de RH',
      departamento: 'Recursos Humanos',
      email: 'thiago.souza@empresa.com',
      telefone: '(11) 99999-9999',
      dataAdmissao: '15/01/2023',
      status: 'Ativo',
      avatar: null
    },
    {
      id: 2,
      nome: 'Maria Silva Santos',
      cargo: 'Desenvolvedora Frontend',
      departamento: 'Tecnologia',
      email: 'maria.santos@empresa.com',
      telefone: '(11) 88888-8888',
      dataAdmissao: '20/03/2022',
      status: 'Ativo',
      avatar: null
    },
    {
      id: 3,
      nome: 'João Pedro Oliveira',
      cargo: 'Gerente de Vendas',
      departamento: 'Comercial',
      email: 'joao.oliveira@empresa.com',
      telefone: '(11) 77777-7777',
      dataAdmissao: '10/06/2021',
      status: 'Ativo',
      avatar: null
    },
    {
      id: 4,
      nome: 'Ana Carolina Lima',
      cargo: 'Analista Financeiro',
      departamento: 'Financeiro',
      email: 'ana.lima@empresa.com',
      telefone: '(11) 66666-6666',
      dataAdmissao: '05/09/2023',
      status: 'Ativo',
      avatar: null
    },
    {
      id: 5,
      nome: 'Carlos Eduardo Ferreira',
      cargo: 'Designer UX/UI',
      departamento: 'Tecnologia',
      email: 'carlos.ferreira@empresa.com',
      telefone: '(11) 55555-5555',
      dataAdmissao: '12/11/2022',
      status: 'Ativo',
      avatar: null
    },
    {
      id: 6,
      nome: 'Fernanda Costa Almeida',
      cargo: 'Coordenadora de Marketing',
      departamento: 'Marketing',
      email: 'fernanda.almeida@empresa.com',
      telefone: '(11) 44444-4444',
      dataAdmissao: '18/04/2021',
      status: 'Ativo',
      avatar: null
    }
  ];

  const departamentos = ['Todos', 'Recursos Humanos', 'Tecnologia', 'Comercial', 'Financeiro', 'Marketing'];

  const filteredColaboradores = colaboradores.filter(colaborador => {
    const matchesSearch = colaborador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         colaborador.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         colaborador.departamento.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'Todos' || colaborador.departamento === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const getInitials = (nome) => {
    return nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getDepartmentColor = (departamento) => {
    const colors = {
      'Recursos Humanos': 'bg-purple-100 text-purple-800',
      'Tecnologia': 'bg-blue-100 text-blue-800',
      'Comercial': 'bg-green-100 text-green-800',
      'Financeiro': 'bg-yellow-100 text-yellow-800',
      'Marketing': 'bg-pink-100 text-pink-800'
    };
    return colors[departamento] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Colaboradores</h1>
        <p className="text-gray-600">Diretório de todos os colaboradores da empresa</p>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar colaboradores..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {departamentos.map((dept) => (
            <Button
              key={dept}
              variant={selectedDepartment === dept ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDepartment(dept)}
              className={selectedDepartment === dept ? "bg-purple-600 hover:bg-purple-700" : ""}
            >
              {dept}
            </Button>
          ))}
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{colaboradores.length}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Departamentos</p>
                <p className="text-2xl font-bold">{departamentos.length - 1}</p>
              </div>
              <Briefcase className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ativos</p>
                <p className="text-2xl font-bold">{colaboradores.filter(c => c.status === 'Ativo').length}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resultados</p>
                <p className="text-2xl font-bold">{filteredColaboradores.length}</p>
              </div>
              <Search className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Colaboradores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColaboradores.map((colaborador) => (
          <Card key={colaborador.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={colaborador.avatar} />
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    {getInitials(colaborador.nome)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {colaborador.nome}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    {colaborador.cargo}
                  </p>
                  <Badge className={`mt-2 ${getDepartmentColor(colaborador.departamento)}`}>
                    {colaborador.departamento}
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="truncate">{colaborador.email}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{colaborador.telefone}</span>
                </div>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full mt-4">
                    Ver Detalhes
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={colaborador.avatar} />
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {getInitials(colaborador.nome)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg">{colaborador.nome}</h3>
                        <p className="text-sm text-gray-600">{colaborador.cargo}</p>
                      </div>
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Departamento</Label>
                        <p className="mt-1">{colaborador.departamento}</p>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Status</Label>
                        <Badge className="mt-1 bg-green-100 text-green-800">
                          {colaborador.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-600">E-mail</Label>
                      <p className="mt-1 flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        {colaborador.email}
                      </p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Telefone</Label>
                      <p className="mt-1 flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {colaborador.telefone}
                      </p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Data de Admissão</Label>
                      <p className="mt-1 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {colaborador.dataAdmissao}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredColaboradores.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum colaborador encontrado
          </h3>
          <p className="text-gray-600">
            Tente ajustar os filtros de busca ou departamento.
          </p>
        </div>
      )}
    </div>
  );
};

export default Colaboradores;

