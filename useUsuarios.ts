import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2, Phone, BookOpen, GraduationCap } from 'lucide-react';
import { Badge, getSemesterBadgeVariant, ConfirmModal, EmptyState } from '../ui/index';
import { useRemoverUsuario } from '../../hooks/useUsuarios';
import type { User } from '../../types';

interface TabelaUsuariosProps {
  usuarios: User[];
}

// Formata a data para exibição legível
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

// Gera as iniciais do nome para o avatar
function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

// Cores de avatar baseadas no ID (para variação visual)
const AVATAR_COLORS = [
  'linear-gradient(135deg, #2563eb, #7c3aed)',
  'linear-gradient(135deg, #059669, #0891b2)',
  'linear-gradient(135deg, #d97706, #dc2626)',
  'linear-gradient(135deg, #7c3aed, #db2777)',
  'linear-gradient(135deg, #0891b2, #059669)',
];

function getAvatarColor(id: string) {
  const index = id.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

export function TabelaUsuarios({ usuarios }: TabelaUsuariosProps) {
  const removerUsuario = useRemoverUsuario();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  // Usuário que está sendo deletado (para exibir nome no modal)
  const confirmUser = usuarios.find((u) => u.id === confirmId);

  function handleDeleteClick(id: string) {
    setConfirmId(id);
  }

  function handleConfirmDelete() {
    if (!confirmId) return;
    removerUsuario.mutate(confirmId, {
      onSettled: () => setConfirmId(null),
    });
  }

  if (usuarios.length === 0) {
    return (
      <EmptyState
        icon={<GraduationCap size={28} />}
        title="Nenhum usuário encontrado"
        description="Tente ajustar os filtros de busca ou cadastre um novo usuário."
      />
    );
  }

  return (
    <>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Curso</th>
              <th>Semestre</th>
              <th>Telefone</th>
              <th>Cadastro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                {/* Coluna: avatar + nome + email */}
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: getAvatarColor(user.id),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        {user.name}
                      </div>
                      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Coluna: curso */}
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <BookOpen size={13} color="var(--text-muted)" />
                    <span>{user.course}</span>
                  </div>
                </td>

                {/* Coluna: semestre */}
                <td>
                  <Badge variant={getSemesterBadgeVariant(user.semester)}>
                    {user.semester}º semestre
                  </Badge>
                </td>

                {/* Coluna: telefone */}
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <Phone size={13} color="var(--text-muted)" />
                    <span>{user.phone}</span>
                  </div>
                </td>

                {/* Coluna: data de cadastro */}
                <td style={{ color: 'var(--text-secondary)' }}>
                  {formatDate(user.createdAt)}
                </td>

                {/* Coluna: ações */}
                <td>
                  <div className="table-actions">
                    <Link
                      to={`/usuarios/${user.id}`}
                      className="btn btn-ghost btn-icon"
                      title="Ver detalhes"
                    >
                      <Eye size={15} />
                    </Link>
                    <Link
                      to={`/usuarios/${user.id}/editar`}
                      className="btn btn-ghost btn-icon"
                      title="Editar"
                    >
                      <Pencil size={15} />
                    </Link>
                    <button
                      className="btn btn-ghost btn-icon"
                      title="Remover"
                      onClick={() => handleDeleteClick(user.id)}
                      style={{ color: 'var(--color-danger)' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmação de exclusão */}
      <ConfirmModal
        isOpen={!!confirmId}
        title="Remover usuário"
        description={`Tem certeza que deseja remover "${confirmUser?.name}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Sim, remover"
        cancelLabel="Cancelar"
        isLoading={removerUsuario.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmId(null)}
      />
    </>
  );
}
