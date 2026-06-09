import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, RefreshCw } from 'lucide-react';
import { Card } from '../../components/ui/index';
import { LoadingPage } from '../../components/ui/index';
import { TabelaUsuarios } from '../../components/usuarios/TabelaUsuarios';
import { useUsuarios } from '../../hooks/useUsuarios';

// Lista de cursos possíveis (para o filtro select)
const CURSOS_OPCOES = [
  'Todos',
  'Análise e Desenvolvimento de Sistemas',
  'Ciência da Computação',
  'Engenharia de Software',
  'Sistemas de Informação',
  'Redes de Computadores',
];

export function ListarUsuarios() {
  const { data: usuarios, isLoading, isError, refetch, isFetching } = useUsuarios();
  const [busca, setBusca] = useState('');
  const [cursoFiltro, setCursoFiltro] = useState('Todos');
  const [semestreFiltro, setSemestreFiltro] = useState('Todos');

  // Filtragem local dos usuários
  const usuariosFiltrados = useMemo(() => {
    if (!usuarios) return [];

    return usuarios.filter((user) => {
      // Filtro de texto: busca no nome e no email
      const termo = busca.toLowerCase();
      const matchBusca =
        !busca ||
        user.name.toLowerCase().includes(termo) ||
        user.email.toLowerCase().includes(termo);

      // Filtro por curso
      const matchCurso =
        cursoFiltro === 'Todos' || user.course === cursoFiltro;

      // Filtro por semestre
      const matchSemestre =
        semestreFiltro === 'Todos' ||
        String(user.semester) === semestreFiltro;

      return matchBusca && matchCurso && matchSemestre;
    });
  }, [usuarios, busca, cursoFiltro, semestreFiltro]);

  if (isLoading) {
    return <LoadingPage message="Carregando usuários..." />;
  }

  if (isError) {
    return (
      <div
        style={{
          background: 'var(--color-danger-light)',
          border: '1px solid var(--color-danger)',
          borderRadius: 'var(--border-radius)',
          padding: '1.5rem',
          color: 'var(--color-danger)',
          fontSize: 'var(--font-size-sm)',
        }}
      >
        <strong>Erro ao carregar os dados.</strong> Tente recarregar a página.
        <button
          className="btn btn-danger btn-sm"
          style={{ marginLeft: '1rem' }}
          onClick={() => refetch()}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Cabeçalho da página */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Usuários</h2>
          <p className="page-subtitle">
            {usuariosFiltrados.length} de {usuarios?.length ?? 0} usuário(s) exibido(s)
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => refetch()}
            disabled={isFetching}
            title="Atualizar lista"
          >
            <RefreshCw size={14} className={isFetching ? 'spinning' : ''} />
            Atualizar
          </button>
          <Link to="/usuarios/novo" className="btn btn-primary btn-sm">
            <Plus size={14} />
            Novo Usuário
          </Link>
        </div>
      </div>

      {/* Tabela com filtros */}
      <Card>
        {/* Barra de filtros */}
        <div className="filter-bar">
          {/* Busca por nome/email */}
          <div className="search-input-wrapper">
            <Search size={15} />
            <input
              type="text"
              className="search-input"
              placeholder="Buscar por nome ou e-mail..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          {/* Filtro por curso */}
          <select
            className="filter-select"
            value={cursoFiltro}
            onChange={(e) => setCursoFiltro(e.target.value)}
          >
            {CURSOS_OPCOES.map((curso) => (
              <option key={curso} value={curso}>
                {curso}
              </option>
            ))}
          </select>

          {/* Filtro por semestre */}
          <select
            className="filter-select"
            value={semestreFiltro}
            onChange={(e) => setSemestreFiltro(e.target.value)}
          >
            <option value="Todos">Todos os semestres</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
              <option key={s} value={String(s)}>
                {s}º semestre
              </option>
            ))}
          </select>

          {/* Botão limpar filtros */}
          {(busca || cursoFiltro !== 'Todos' || semestreFiltro !== 'Todos') && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setBusca('');
                setCursoFiltro('Todos');
                setSemestreFiltro('Todos');
              }}
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Tabela de usuários */}
        <TabelaUsuarios usuarios={usuariosFiltrados} />
      </Card>
    </div>
  );
}
