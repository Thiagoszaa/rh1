import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  FileText, 
  Briefcase, 
  Info, 
  Users, 
  LogOut,
  User
} from 'lucide-react';

const Sidebar = ({ user, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/registrar-ponto', label: 'Registrar Ponto', icon: Clock },
    { path: '/justificar-falta', label: 'Justificar Falta', icon: FileText },
    { path: '/vagas', label: 'Vagas', icon: Briefcase },
    { path: '/informacoes', label: 'Informações', icon: Info },
    { path: '/colaboradores', label: 'Colaboradores', icon: Users },
  ];

  return (
    <div className="w-64 bg-purple-600 text-white flex flex-col">
      {/* User Profile Section */}
      <div className="p-6 border-b border-purple-500">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">
              {user?.name || 'Thiago Henrique Soares de Souza'}
            </h3>
            <p className="text-xs text-purple-200">
              {user?.status || 'Colaborador Empregado | Unemployed'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link to={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start text-left ${
                      isActive 
                        ? 'bg-white text-purple-600 hover:bg-gray-100' 
                        : 'text-white hover:bg-purple-500'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-purple-500">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start text-white hover:bg-purple-500"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sair
        </Button>
        <p className="text-xs text-purple-200 mt-4 text-center">
          © 2025 Todos os direitos reservados
        </p>
      </div>
    </div>
  );
};

export default Sidebar;

