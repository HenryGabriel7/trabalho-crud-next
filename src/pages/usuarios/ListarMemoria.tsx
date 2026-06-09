import { useState } from 'react';
import { Trash2, Plus, Cpu, RefreshCw, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardBody, Badge, EmptyState, ConfirmModal } from '../../components/ui/index';
import { useUsuariosMemoria, useCriarMemoria, useRemoverMemoria } from '../../hooks/useMemoria';

// Formata data de nascimento para exibição
function formatDate(dateStr: string | undefined) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('pt-BR');
}

export function ListarMemoria() {
  const { data: usuarios, isLoading, isError, refetch } = useUsuariosMemoria();
  const criarMemoria = useCriarMemoria();
  const removerMemoria = useRemoverMemoria();

  // Estado do formulário de criação rápida
  const [form, setForm] = useState({
    id: '',
    nome: '',
    idade: '',
    sexo: 'Masculino' as 'Masculino' | 'Feminino',
    dataNascimento: '',
  });

  const [showForm, setShowForm] = useState(false);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();

    if (!form.id || !form.nome || !form.idade) return;

    criarMemoria.mutate(
      {
        id: Number(form.id),
        nome: form.nome,
        idade: Number(form.idade),
        sexo: form.sexo,
        dataNascimento: form.dataNascimento || undefined,
      },
      {
        onSuccess: () => {
          setForm({ id: '', nome: '', idade: '', sexo: 'Masculino', dataNascimento: '' });
          setShowForm(false);
        },
      }
    );
  }

  function handleDelete() {
    if (confirmId === null) return;
    removerMemoria.mutate(confirmId, {
      onSettled: () => setConfirmId(null),
    });
  }

  return (
    <div>
      {/* Cabeçalho */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Módulo Memória</h2>
          <p className="page-subtitle">
            CRUD em memória RAM — dados são perdidos ao reiniciar o servidor
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCw size={14} />
            Atualizar
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus size={14} />
            Adicionar
          </button>
        </div>
      </div>

      {/* Aviso didático */}
      <div
        style={{
          background: 'var(--color-warning-light)',
          border: '1px solid var(--color-warning)',
          borderRadius: 'var(--border-radius)',
          padding: '0.875rem 1rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.625rem',
          fontSize: 'var(--font-size-sm)',
          color: '#92400e',
        }}
      >
        <AlertTriangle size={16} style={{ marginTop: 1, flexShrink: 0 }} />
        <div>
          <strong>Módulo didático.</strong> Este módulo usa o{' '}
          <code style={{ background: 'rgba(0,0,0,0.08)', padding: '0 4px', borderRadius: 3 }}>
            UserMemoryService
          </code>{' '}
          do NestJS — os dados existem apenas em memória e são perdidos quando o
          servidor reinicia. Para ativá-lo, importe o{' '}
          <code style={{ background: 'rgba(0,0,0,0.08)', padding: '0 4px', borderRadius: 3 }}>
            UserMemoryModule
          </code>{' '}
          no <code style={{ background: 'rgba(0,0,0,0.08)', padding: '0 4px', borderRadius: 3 }}>
            AppModule
          </code>.
        </div>
      </div>

      {/* Formulário de criação rápida */}
      {showForm && (
        <Card style={{ marginBottom: '1rem' }}>
          <CardHeader title="Novo Usuário em Memória" />
          <CardBody>
            <form onSubmit={handleCreate}>
              <div className="form-grid" style={{ marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">
                    ID <span style={{ color: 'var(--color-danger)' }}>*</span>
                  </label>
                  <input
                    className="form-input"
                    type="number"
                    placeholder="Ex: 3"
                    value={form.id}
                    onChange={(e) => setForm({ ...form, id: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Nome <span style={{ color: 'var(--color-danger)' }}>*</span>
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Nome completo"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Idade <span style={{ color: 'var(--color-danger)' }}>*</span>
                  </label>
                  <input
                    className="form-input"
                    type="number"
                    placeholder="Ex: 25"
                    value={form.idade}
                    onChange={(e) => setForm({ ...form, idade: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Sexo</label>
                  <select
                    className="form-input filter-select"
                    value={form.sexo}
                    onChange={(e) =>
                      setForm({ ...form, sexo: e.target.value as 'Masculino' | 'Feminino' })
                    }
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Data de Nascimento</label>
                  <input
                    className="form-input"
                    type="date"
                    value={form.dataNascimento}
                    onChange={(e) => setForm({ ...form, dataNascimento: e.target.value })}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={criarMemoria.isPending}
                >
                  {criarMemoria.isPending ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Tabela */}
      <Card>
        <CardHeader
          title="Usuários em Memória"
          subtitle="Dados voláteis — não persistem no banco"
          action={<Cpu size={16} color="var(--text-muted)" />}
        />

        {isLoading && (
          <div className="loading-page">
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
              Conectando ao módulo de memória...
            </p>
          </div>
        )}

        {isError && (
          <div
            style={{
              padding: '1.5rem',
              textAlign: 'center',
              color: 'var(--color-danger)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            Módulo não disponível. Importe o{' '}
            <code>UserMemoryModule</code> no <code>AppModule</code>.
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {(!usuarios || usuarios.length === 0) ? (
              <EmptyState
                icon={<Cpu size={24} />}
                title="Nenhum usuário na memória"
                description="Clique em 'Adicionar' para inserir um usuário na memória temporária."
              />
            ) : (
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Idade</th>
                      <th>Sexo</th>
                      <th>Nascimento</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <span
                            style={{
                              fontFamily: 'monospace',
                              background: 'var(--bg-input)',
                              padding: '2px 6px',
                              borderRadius: 4,
                              fontSize: 'var(--font-size-xs)',
                            }}
                          >
                            #{user.id}
                          </span>
                        </td>
                        <td style={{ fontWeight: 600 }}>{user.nome}</td>
                        <td>{user.idade} anos</td>
                        <td>
                          <Badge variant={user.sexo === 'Feminino' ? 'blue' : 'green'}>
                            {user.sexo}
                          </Badge>
                        </td>
                        <td style={{ color: 'var(--text-secondary)' }}>
                          {formatDate(user.dataNascimento)}
                        </td>
                        <td>
                          <button
                            className="btn btn-ghost btn-icon"
                            style={{ color: 'var(--color-danger)' }}
                            onClick={() => setConfirmId(user.id)}
                            title="Remover da memória"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </Card>

      {/* Modal de confirmação */}
      <ConfirmModal
        isOpen={confirmId !== null}
        title="Remover da memória"
        description="Tem certeza que deseja remover este usuário da memória?"
        confirmLabel="Remover"
        isLoading={removerMemoria.isPending}
        onConfirm={handleDelete}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  );
}
