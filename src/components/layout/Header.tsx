import { useLocation, Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

// Mapa de rotas para título e subtítulo
const ROUTE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Dashboard', subtitle: 'Visão geral do sistema' },
  '/usuarios': { title: 'Usuários', subtitle: 'Gerencie os usuários cadastrados' },
  '/usuarios/novo': { title: 'Novo Usuário', subtitle: 'Preencha os dados para criar' },
  '/memoria': { title: 'Módulo Memória', subtitle: 'CRUD em memória (didático)' },
};

function getRouteInfo(pathname: string) {
  // Verifica rota exata
  if (ROUTE_TITLES[pathname]) {
    return ROUTE_TITLES[pathname];
  }

  // Verifica padrão /usuarios/:id/editar
  if (/^\/usuarios\/.+\/editar$/.test(pathname)) {
    return { title: 'Editar Usuário', subtitle: 'Atualize os dados do usuário' };
  }

  // Verifica padrão /usuarios/:id
  if (/^\/usuarios\/.+$/.test(pathname)) {
    return { title: 'Detalhe do Usuário', subtitle: 'Informações completas do usuário' };
  }

  return { title: 'EduManager', subtitle: '' };
}

export function Header() {
  const location = useLocation();
  const { title, subtitle } = getRouteInfo(location.pathname);

  // Mostra botão "Novo Usuário" apenas na listagem
  const showNewUserButton = location.pathname === '/usuarios';

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">{title}</h1>
        {subtitle && <p className="header-subtitle">{subtitle}</p>}
      </div>

      <div className="header-right">
        {showNewUserButton && (
          <Link to="/usuarios/novo" className="btn btn-primary btn-sm">
            <Plus size={14} />
            Novo Usuário
          </Link>
        )}
      </div>
    </header>
  );
}
