import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, Pause, Square, History } from 'lucide-react';

const RegistrarPonto = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastAction, setLastAction] = useState(null);

  // Atualizar o relógio a cada segundo
  useState(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePonto = (tipo) => {
    const agora = new Date();
    setLastAction({
      tipo,
      horario: formatTime(agora),
      data: agora.toLocaleDateString('pt-BR')
    });
    
    // Aqui seria feita a chamada para a API
    alert(`Ponto registrado: ${tipo} às ${formatTime(agora)}`);
  };

  const registrosHoje = [
    { tipo: 'Entrada', horario: '08:00:00', status: 'Registrado' },
    { tipo: 'Pausa', horario: '12:00:00', status: 'Registrado' },
    { tipo: 'Retorno', horario: '13:00:00', status: 'Registrado' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Registrado':
        return 'bg-green-100 text-green-800';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoIcon = (tipo) => {
    switch (tipo) {
      case 'Entrada':
        return <Play className="w-4 h-4" />;
      case 'Pausa':
        return <Pause className="w-4 h-4" />;
      case 'Retorno':
        return <Play className="w-4 h-4" />;
      case 'Saída':
        return <Square className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Registrar Ponto</h1>
        <p className="text-gray-600">Registre sua entrada, pausa e saída</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Relógio e Registro */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Horário Atual</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4">
                <div className="text-4xl font-mono font-bold text-purple-600 mb-2">
                  {formatTime(currentTime)}
                </div>
                <div className="text-lg text-gray-600 capitalize">
                  {formatDate(currentTime)}
                </div>
              </div>
              
              {lastAction && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-green-800">
                    Último registro: <strong>{lastAction.tipo}</strong> às {lastAction.horario}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registrar Ponto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => handlePonto('Entrada')}
                  className="bg-green-600 hover:bg-green-700 h-16"
                >
                  <div className="flex flex-col items-center">
                    <Play className="w-6 h-6 mb-1" />
                    <span>Entrada</span>
                  </div>
                </Button>
                
                <Button
                  onClick={() => handlePonto('Pausa')}
                  className="bg-yellow-600 hover:bg-yellow-700 h-16"
                >
                  <div className="flex flex-col items-center">
                    <Pause className="w-6 h-6 mb-1" />
                    <span>Pausa</span>
                  </div>
                </Button>
                
                <Button
                  onClick={() => handlePonto('Retorno')}
                  className="bg-blue-600 hover:bg-blue-700 h-16"
                >
                  <div className="flex flex-col items-center">
                    <Play className="w-6 h-6 mb-1" />
                    <span>Retorno</span>
                  </div>
                </Button>
                
                <Button
                  onClick={() => handlePonto('Saída')}
                  className="bg-red-600 hover:bg-red-700 h-16"
                >
                  <div className="flex flex-col items-center">
                    <Square className="w-6 h-6 mb-1" />
                    <span>Saída</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Histórico do Dia */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="w-5 h-5 mr-2" />
                Registros de Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {registrosHoje.map((registro, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-purple-600">
                        {getTipoIcon(registro.tipo)}
                      </div>
                      <div>
                        <p className="font-medium">{registro.tipo}</p>
                        <p className="text-sm text-gray-600 font-mono">{registro.horario}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(registro.status)}>
                      {registro.status}
                    </Badge>
                  </div>
                ))}
                
                {registrosHoje.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum registro hoje</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumo do Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Horas Trabalhadas:</span>
                  <span className="font-semibold">5h 00m</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tempo de Pausa:</span>
                  <span className="font-semibold">1h 00m</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    Em andamento
                  </Badge>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Previsão de Saída:</span>
                    <span className="font-semibold text-purple-600">17:00</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegistrarPonto;

