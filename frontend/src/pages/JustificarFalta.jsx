import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Upload, CheckCircle, XCircle, Clock } from 'lucide-react';

const JustificarFalta = () => {
  const [formData, setFormData] = useState({
    data: '',
    motivo: '',
    descricao: '',
    arquivo: null
  });

  const [justificativas, setJustificativas] = useState([
    {
      id: 1,
      data: '15/06/2025',
      motivo: 'Consulta médica',
      status: 'Aprovada',
      dataEnvio: '15/06/2025 14:30'
    },
    {
      id: 2,
      data: '10/06/2025',
      motivo: 'Problema familiar',
      status: 'Pendente',
      dataEnvio: '10/06/2025 09:15'
    },
    {
      id: 3,
      data: '05/06/2025',
      motivo: 'Atestado médico',
      status: 'Rejeitada',
      dataEnvio: '05/06/2025 16:45',
      observacao: 'Documento ilegível, favor reenviar'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      arquivo: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.data || !formData.motivo) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Simular envio
    const novaJustificativa = {
      id: justificativas.length + 1,
      data: new Date(formData.data).toLocaleDateString('pt-BR'),
      motivo: formData.motivo,
      status: 'Pendente',
      dataEnvio: new Date().toLocaleString('pt-BR')
    };

    setJustificativas(prev => [novaJustificativa, ...prev]);
    
    // Limpar formulário
    setFormData({
      data: '',
      motivo: '',
      descricao: '',
      arquivo: null
    });

    alert('Justificativa enviada com sucesso!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aprovada':
        return 'bg-green-100 text-green-800';
      case 'Rejeitada':
        return 'bg-red-100 text-red-800';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Aprovada':
        return <CheckCircle className="w-4 h-4" />;
      case 'Rejeitada':
        return <XCircle className="w-4 h-4" />;
      case 'Pendente':
        return <Clock className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Justificar Falta</h1>
        <p className="text-gray-600">Envie justificativas para suas ausências</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulário de Nova Justificativa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Nova Justificativa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="data">Data da Ausência *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="data"
                    name="data"
                    type="date"
                    className="pl-10"
                    value={formData.data}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="motivo">Motivo da Ausência *</Label>
                <Input
                  id="motivo"
                  name="motivo"
                  placeholder="Ex: Consulta médica, Problema familiar..."
                  value={formData.motivo}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="descricao">Descrição Detalhada</Label>
                <Textarea
                  id="descricao"
                  name="descricao"
                  placeholder="Descreva os detalhes da sua ausência (opcional)"
                  rows={3}
                  value={formData.descricao}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="arquivo">Documento Comprobatório</Label>
                <div className="relative">
                  <Upload className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="arquivo"
                    name="arquivo"
                    type="file"
                    className="pl-10"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Formatos aceitos: PDF, JPG, PNG (máx. 5MB)
                </p>
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Enviar Justificativa
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Histórico de Justificativas */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Justificativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {justificativas.map((justificativa) => (
                <div key={justificativa.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{justificativa.motivo}</h4>
                      <p className="text-sm text-gray-600">Data da falta: {justificativa.data}</p>
                    </div>
                    <Badge className={`${getStatusColor(justificativa.status)} flex items-center gap-1`}>
                      {getStatusIcon(justificativa.status)}
                      {justificativa.status}
                    </Badge>
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-2">
                    Enviado em: {justificativa.dataEnvio}
                  </div>
                  
                  {justificativa.observacao && (
                    <div className="bg-red-50 border border-red-200 rounded p-2 mt-2">
                      <p className="text-sm text-red-800">
                        <strong>Observação:</strong> {justificativa.observacao}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {justificativas.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma justificativa enviada</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informações Importantes */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Informações Importantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Prazos</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Justificativas devem ser enviadas em até 48h após a falta</li>
                <li>• Atestados médicos têm prazo de até 5 dias úteis</li>
                <li>• Análise do RH: até 3 dias úteis</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Documentos Aceitos</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Atestados médicos</li>
                <li>• Declarações de comparecimento</li>
                <li>• Comprovantes de exames</li>
                <li>• Outros documentos oficiais</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JustificarFalta;

