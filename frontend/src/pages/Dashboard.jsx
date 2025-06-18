import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, FileText, Briefcase } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Horas Trabalhadas (Mês)',
      value: '168h',
      icon: Clock,
      color: 'bg-blue-500'
    },
    {
      title: 'Faltas Justificadas',
      value: '2',
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      title: 'Vagas Disponíveis',
      value: '5',
      icon: Briefcase,
      color: 'bg-purple-500'
    },
    {
      title: 'Colaboradores',
      value: '47',
      icon: Users,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Bem-vindo ao sistema de RH</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Últimos Registros de Ponto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: '17/06/2025', entry: '08:00', exit: '17:00', status: 'Completo' },
                { date: '16/06/2025', entry: '08:15', exit: '17:30', status: 'Completo' },
                { date: '15/06/2025', entry: '08:00', exit: '16:45', status: 'Completo' }
              ].map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{record.date}</p>
                    <p className="text-sm text-gray-600">
                      {record.entry} - {record.exit}
                    </p>
                  </div>
                  <Badge variant="secondary">{record.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Reunião de Equipe', date: '20/06/2025', time: '14:00' },
                { title: 'Treinamento', date: '22/06/2025', time: '09:00' },
                { title: 'Avaliação de Performance', date: '25/06/2025', time: '15:00' }
              ].map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.date} às {event.time}</p>
                  </div>
                  <Badge variant="outline">Agendado</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

