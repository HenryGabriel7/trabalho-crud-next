import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Database,
  LogOut,
  GraduationCap,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  // Gera as iniciais do email para o avatar
  function getInitials(email: string) {
    return email.substring(0, 2).toUpperCase();
  }

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <GraduationCap size={20} color="white" />
        </div>
        <div className="sidebar-logo-text">
          <span className="sidebar-logo-title">EduManager</span>
          <span className="sidebar-logo-subtitle">Sistema de Gestão</span>
        </div>
      </div>

      {/* Navegação */}
      <nav className="sidebar-nav">
        <span className="sidebar-section-label">Principal</span>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <LayoutDashboard size={16} />
          Dashboard
        </NavLink>

        <NavLink
          to="/usuarios"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <Users size={16} />
          Usuários
        </NavLink>

        <span className="sidebar-section-label">Didático</span>

        <NavLink
          to="/memoria"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <Database size={16} />
          Módulo Memória
        </NavLink>

        <span className="sidebar-section-label">Referência</span>

        <a
          href="https://docs.nestjs.com"
          target="_blank"
          rel="noreferrer"
          className="sidebar-link"
        >
          <BookOpen size={16} />
          Docs NestJS
        </a>
      </nav>

      {/* Rodapé com usuário logado */}
      <div className="sidebar-footer">
        {user && (
          <div className="sidebar-user">
            <div className="sidebar-avatar">
              {getInitials(user.email)}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">Admin</div>
              <div className="sidebar-user-email">{user.email}</div>
            </div>
          </div>
        )}

        <button className="sidebar-link" onClick={handleLogout}>
          <LogOut size={16} />
          Sair
        </button>
      </div>
    </aside>
  );
}
