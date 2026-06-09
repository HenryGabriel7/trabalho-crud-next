import { useNavigate } from 'react-router-dom';
import { FormUsuario } from '../../components/usuarios/FormUsuario';
import { useCriarUsuario } from '../../hooks/useUsuarios';
import type { CreateUserFormData, UpdateUserFormData } from '../../lib/validations';

export function CriarUsuario() {
  const navigate = useNavigate();
  const criarUsuario = useCriarUsuario();

  function handleSubmit(data: CreateUserFormData | UpdateUserFormData) {
    // No modo criar, o cast para CreateUserFormData é seguro pois o
    // schema createUserSchema garante todos os campos obrigatórios.
    const payload = data as CreateUserFormData;

    criarUsuario.mutate(
      {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        course: payload.course,
        semester: payload.semester,
        phone: payload.phone,
      },
      {
        onSuccess: () => {
          // Redireciona para a listagem após criar com sucesso
          navigate('/usuarios');
        },
      }
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Novo Usuário</h2>
          <p className="page-subtitle">
            Preencha os campos abaixo para criar um novo usuário
          </p>
        </div>
      </div>

      <FormUsuario
        mode="criar"
        onSubmit={handleSubmit}
        isLoading={criarUsuario.isPending}
      />
    </div>
  );
}
