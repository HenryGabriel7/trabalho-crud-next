import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  Calendar,
  Clock,
} from 'lucide-react';
import { useState } from 'react';
import { Card, CardHeader, CardBody, Badge, getSemesterBadgeVariant, LoadingPage, ConfirmModal } from '../../components/ui/index';
import { useUsuario, useRemoverUsuario } from '../../hooks/useUsuarios';

// Formata data completa com horário
function formatDateFull(dateStr: string) {
  return new Date(dateStr).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Gera iniciais do nome
function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export function DetalheUsuario() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useUsuario(id);
  const removerUsuario = useRemoverUsuario();
  const [showConfirm, setShowConfirm] = useState(false);

  function handleDelete() {
    if (!id) return;
    removerUsuario.mutate(id, {
      onSuccess: () => {
        navigate('/usuarios');
      },
      onSettled: () => setShowConfirm(false),
    });
  }

  if (isLoading) {
    return <LoadingPage message="Carregando usuário..." />;
  }

  if (isError || !user) {
    return (
      <div
        style={{
          background: 'var(--color-danger-light)',
          border: '1px solid var(--color-danger)',
          borderRadius: 'var(--border-radius)',
          padding: '1.5rem',
          color: 'var(--color-danger)',
        }}
      >
        Usuário não encontrado.{' '}
        <Link to="/usuarios" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
          Voltar para a lista
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Cabeçalho */}
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={14} />
            Voltar
          </button>
          <h2 className="page-title">Detalhe do Usuário</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link
            to={`/usuarios/${id}/editar`}
            className="btn btn-secondary btn-sm"
          >
            <Pencil size={14} />
            Editar
          </Link>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => setShowConfirm(true)}
          >
            <Trash2 size={14} />
            Remover
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
        {/* Card: perfil resumido */}
        <Card>
          <CardBody>
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              {/* Avatar grande */}
              <div
                className="detail-avatar"
                style={{ margin: '0 auto 1rem' }}
              >
                {getInitials(user.name)}
              </div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: 'var(--font-size-lg)',
                  color: 'var(--text-primary)',
                  marginBottom: '0.25rem',
                }}
              >
                {user.name}
              </h3>
              <p
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.75rem',
                }}
              >
                {user.email}
              </p>
              <Badge variant={getSemesterBadgeVariant(user.semester)}>
                {user.semester}º semestre
              </Badge>
            </div>

            <div className="divider" />

            {/* Infos rápidas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={14} color="var(--text-muted)" />
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                  {user.email}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={14} color="var(--text-muted)" />
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                  {user.phone}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={14} color="var(--text-muted)" />
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                  {user.course}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Card: informações completas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Card>
            <CardHeader title="Informações Pessoais" />
            <CardBody>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Nome completo</span>
                  <span className="detail-value">{user.name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">E-mail</span>
                  <span className="detail-value">{user.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Telefone</span>
                  <span className="detail-value">{user.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">ID único</span>
                  <span
                    className="detail-value truncate"
                    style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'monospace' }}
                  >
                    {user.id}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Dados Acadêmicos"
              action={
                <GraduationCap size={16} color="var(--text-muted)" />
              }
            />
            <CardBody>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Curso</span>
                  <span className="detail-value">{user.course}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Semestre atual</span>
                  <span className="detail-value">
                    <Badge variant={getSemesterBadgeVariant(user.semester)}>
                      {user.semester}º semestre
                    </Badge>
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Registro no Sistema" />
            <CardBody>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">
                    <Calendar size={11} style={{ display: 'inline', marginRight: 4 }} />
                    Criado em
                  </span>
                  <span className="detail-value">{formatDateFull(user.createdAt)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">
                    <Clock size={11} style={{ display: 'inline', marginRight: 4 }} />
                    Atualizado em
                  </span>
                  <span className="detail-value">{formatDateFull(user.updatedAt)}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Modal de confirmação */}
      <ConfirmModal
        isOpen={showConfirm}
        title="Remover usuário"
        description={`Tem certeza que deseja remover "${user.name}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Sim, remover"
        isLoading={removerUsuario.isPending}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}
