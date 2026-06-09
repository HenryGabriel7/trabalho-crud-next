import { useParams, useNavigate } from 'react-router-dom';
import { FormUsuario } from '../../components/usuarios/FormUsuario';
import { LoadingPage } from '../../components/ui/index';
import { useUsuario, useAtualizarUsuario } from '../../hooks/useUsuarios';
import type { CreateUserFormData, UpdateUserFormData } from '../../lib/validations';

export function EditarUsuario() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Busca os dados atuais do usuário para preencher o formulário
  const { data: user, isLoading, isError } = useUsuario(id);
  const atualizarUsuario = useAtualizarUsuario(id!);

  function handleSubmit(data: CreateUserFormData | UpdateUserFormData) {
    const payload = data as UpdateUserFormData;

    // Monta apenas os campos que foram preenchidos
    // (campos vazios são omitidos para não sobrescrever no backend)
    const updateData: Record<string, unknown> = {};

    if (payload.name)     updateData.name = payload.name;
    if (payload.email)    updateData.email = payload.email;
    if (payload.course)   updateData.course = payload.course;
    if (payload.semester) updateData.semester = payload.semester;
    if (payload.phone)    updateData.phone = payload.phone;

    // Senha: só inclui se preenchida (campo opcional na edição)
    if (payload.password && payload.password.trim() !== '') {
      updateData.password = payload.password;
    }

    atualizarUsuario.mutate(updateData, {
      onSuccess: () => {
        // Redireciona para o detalhe do usuário após salvar
        navigate(`/usuarios/${id}`);
      },
    });
  }

  if (isLoading) {
    return <LoadingPage message="Carregando dados do usuário..." />;
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
          fontSize: 'var(--font-size-sm)',
        }}
      >
        Usuário não encontrado ou erro ao carregar os dados.
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Editar Usuário</h2>
          <p className="page-subtitle">
            Atualize os campos desejados. Deixe a senha em branco para não
            alterá-la.
          </p>
        </div>
      </div>

      <FormUsuario
        mode="editar"
        initialData={user}
        onSubmit={handleSubmit}
        isLoading={atualizarUsuario.isPending}
      />
    </div>
  );
}
