import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, Coffee } from 'lucide-react';

const Informacoes = () => {
  const informacoes = [
    {
      id: 1,
      type: 'Evento',
      title: 'Evento Especial',
      description: 'Teremos um evento especial no dia 20, com atividades para integração e confraternização entre todos os colaboradores.',
      date: '20/06/2025',
      time: '14:00',
      location: 'Auditório Principal',
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      type: 'Reunião',
      title: 'Reunião de Colaboradores',
      description: 'A reunião de colaboradores será no dia 13, com foco em alinhamento de metas e comunicação interna.',
      date: '13/06/2025',
      time: '09:00',
      location: 'Sala de Reuniões',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      id: 3,
      type: 'Folga',
      title: 'Feriado de Corpus Christi',
      description: 'A próxima folga do ano será no feriado de Corpus Christi, em 19 de junho (quinta-feira).',
      date: '19/06/2025',
      time: 'Dia todo',
      location: 'Todos os setores',
      icon: Coffee,
      color: 'bg-purple-500'
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'Evento':
        return 'bg-blue-100 text-blue-800';
      case 'Reunião':
        return 'bg-green-100 text-green-800';
      case 'Folga':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Informações</h1>
        <p className="text-gray-600">Fique por dentro dos eventos, reuniões e comunicados importantes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {informacoes.map((info) => {
          const Icon = info.icon;
          return (
            <Card key={info.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${info.color}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{info.title}</CardTitle>
                      <Badge variant="secondary" className={getTypeColor(info.type)}>
                        {info.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {info.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {info.date}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    {info.time}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    {info.location}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Seção de Comunicados Gerais */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Comunicados Gerais</h2>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Atualização do Sistema de Ponto
                  </h3>
                  <p className="text-gray-600 mb-2">
                    O sistema de registro de ponto foi atualizado com novas funcionalidades. 
                    Agora é possível visualizar o histórico completo e justificar faltas diretamente pelo sistema.
                  </p>
                  <p className="text-sm text-gray-500">Publicado em 15/06/2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Programa de Benefícios 2025
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Novos benefícios foram adicionados ao programa da empresa, incluindo 
                    plano odontológico e auxílio home office para colaboradores remotos.
                  </p>
                  <p className="text-sm text-gray-500">Publicado em 10/06/2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Política de Trabalho Híbrido
                  </h3>
                  <p className="text-gray-600 mb-2">
                    A empresa implementou uma nova política de trabalho híbrido, 
                    permitindo até 2 dias de home office por semana para funções elegíveis.
                  </p>
                  <p className="text-sm text-gray-500">Publicado em 05/06/2025</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Informacoes;

