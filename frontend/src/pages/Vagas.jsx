import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Briefcase, MapPin, Clock, DollarSign, Users, Search } from 'lucide-react';

const Vagas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVaga, setSelectedVaga] = useState(null);
  const [isApplying, setIsApplying] = useState(false);

  const vagas = [
    {
      id: 1,
      title: 'RH Profissional',
      department: 'Equipe RH',
      description: 'Profissional dedicado a promover um ambiente organizacional saudável e eficiente.',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 4.500 - R$ 6.000',
      requirements: ['Graduação em Psicologia ou RH', 'Experiência mínima de 2 anos', 'Conhecimento em legislação trabalhista'],
      benefits: ['Vale alimentação', 'Plano de saúde', 'Vale transporte']
    },
    {
      id: 2,
      title: 'Desenvolvedor',
      department: 'Desenvolvedor',
      description: 'Desenvolvedor focado em criar soluções tecnológicas inovadoras.',
      location: 'Remote',
      type: 'PJ',
      salary: 'R$ 6.000 - R$ 10.000',
      requirements: ['Graduação em Ciência da Computação ou similar', 'Experiência com React e Node.js', 'Conhecimento em bancos de dados'],
      benefits: ['Trabalho remoto', 'Horário flexível', 'Equipamentos fornecidos']
    },
    {
      id: 3,
      title: 'Caixa',
      department: 'Caixa',
      description: 'Atendente de caixa ágil, responsável e com foco no bom atendimento ao cliente.',
      location: 'Rio de Janeiro, RJ',
      type: 'CLT',
      salary: 'R$ 1.800 - R$ 2.500',
      requirements: ['Ensino médio completo', 'Experiência em atendimento', 'Disponibilidade de horário'],
      benefits: ['Vale alimentação', 'Vale transporte', 'Comissão por vendas']
    }
  ];

  const filteredVagas = vagas.filter(vaga =>
    vaga.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vaga.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApply = (vaga) => {
    setSelectedVaga(vaga);
    setIsApplying(true);
  };

  const submitApplication = (e) => {
    e.preventDefault();
    // Aqui seria feita a submissão da candidatura
    alert('Candidatura enviada com sucesso!');
    setIsApplying(false);
    setSelectedVaga(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vagas Disponíveis</h1>
        <p className="text-gray-600 mb-4">Encontre oportunidades que combinam com seu perfil</p>
        
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar vagas..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-purple-800 mb-2">
              QUER RECOMENDAR ALGUÉM? VAGAS PARA
            </h2>
            <div className="flex flex-wrap gap-2">
              {['Equipe RH', 'Desenvolvedor', 'Caixa'].map((dept) => (
                <Badge key={dept} variant="secondary" className="bg-purple-100 text-purple-800">
                  {dept}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVagas.map((vaga) => (
          <Card key={vaga.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{vaga.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {vaga.department}
                  </CardDescription>
                </div>
                <Badge variant="outline">{vaga.type}</Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{vaga.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {vaga.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  {vaga.salary}
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Ver Detalhes
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{vaga.title}</DialogTitle>
                    <DialogDescription>{vaga.department}</DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Descrição</h4>
                      <p className="text-sm text-gray-600">{vaga.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Requisitos</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {vaga.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Benefícios</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {vaga.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      onClick={() => handleApply(vaga)}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      Candidatar-se
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Candidatura */}
      <Dialog open={isApplying} onOpenChange={setIsApplying}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Candidatar-se para {selectedVaga?.title}</DialogTitle>
            <DialogDescription>
              Preencha as informações abaixo para enviar sua candidatura
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={submitApplication} className="space-y-4">
            <div>
              <Label htmlFor="curriculum">Currículo (PDF)</Label>
              <Input
                id="curriculum"
                type="file"
                accept=".pdf"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="cover-letter">Carta de Apresentação (Opcional)</Label>
              <Textarea
                id="cover-letter"
                placeholder="Conte-nos por que você é o candidato ideal para esta vaga..."
                rows={4}
              />
            </div>
            
            <div className="flex gap-2">
              <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                Enviar Candidatura
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsApplying(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Vagas;

