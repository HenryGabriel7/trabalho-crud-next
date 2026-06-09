import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { Input } from '../ui/Input';
import { Spinner } from '../ui/index';
import { createUserSchema, updateUserSchema } from '../../lib/validations';
import type { CreateUserFormData, UpdateUserFormData } from '../../lib/validations';
import type { User } from '../../types';

// Lista de cursos disponíveis no formulário
const CURSOS = [
  'Análise e Desenvolvimento de Sistemas',
  'Ciência da Computação',
  'Engenharia de Software',
  'Sistemas de Informação',
  'Redes de Computadores',
  'Banco de Dados',
  'Gestão de TI',
  'Outro',
];

// ===================================================
// Props do componente
// ===================================================
interface FormUsuarioProps {
  /** Modo: 'criar' usa senha obrigatória, 'editar' usa senha opcional */
  mode: 'criar' | 'editar';
  /** Dados do usuário (somente no modo editar) */
  initialData?: User;
  /** Callback chamado ao submeter o formulário */
  onSubmit: (data: CreateUserFormData | UpdateUserFormData) => void;
  /** Indica se a requisição está em andamento */
  isLoading: boolean;
}

// ===================================================
// Componente de formulário reutilizável
// ===================================================
export function FormUsuario({ mode, initialData, onSubmit, isLoading }: FormUsuarioProps) {
  // Seleciona o schema do Zod de acordo com o modo
  const schema = mode === 'criar' ? createUserSchema : updateUserSchema;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateUserFormData | UpdateUserFormData>({
    resolver: zodResolver(schema),
    defaultValues:
      mode === 'editar' && initialData
        ? {
            name: initialData.name,
            email: initialData.email,
            password: '',
            course: initialData.course,
            semester: initialData.semester,
            phone: initialData.phone,
          }
        : {},
  });

  // Preenche os campos quando initialData muda (ex: dados carregados assincronamente)
  useEffect(() => {
    if (mode === 'editar' && initialData) {
      setValue('name', initialData.name);
      setValue('email', initialData.email);
      setValue('course', initialData.course);
      setValue('semester', initialData.semester);
      setValue('phone', initialData.phone);
    }
  }, [initialData, mode, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* ── Seção: Dados Pessoais ─────────────────── */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius)',
          overflow: 'hidden',
          marginBottom: '1rem',
        }}
      >
        <div className="card-header">
          <h3 className="card-title">Dados Pessoais</h3>
        </div>
        <div className="card-body">
          <div className="form-grid">
            {/* Nome */}
            <Input
              label="Nome completo"
              placeholder="Ex: João da Silva"
              required
              error={errors.name?.message}
              {...register('name')}
            />

            {/* E-mail */}
            <Input
              label="E-mail"
              type="email"
              placeholder="joao@email.com"
              required
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          <div style={{ marginTop: '1rem' }}>
            {/* Telefone */}
            <Input
              label="Telefone"
              type="tel"
              placeholder="(44) 99999-9999"
              hint="Somente números, mínimo 11 dígitos"
              required
              error={errors.phone?.message}
              {...register('phone')}
            />
          </div>
        </div>
      </div>

      {/* ── Seção: Dados Acadêmicos ───────────────── */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius)',
          overflow: 'hidden',
          marginBottom: '1rem',
        }}
      >
        <div className="card-header">
          <h3 className="card-title">Dados Acadêmicos</h3>
        </div>
        <div className="card-body">
          <div className="form-grid">
            {/* Curso */}
            <div className="form-group">
              <label className="form-label">
                Curso <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <select
                className={`form-input ${errors.course ? 'error' : ''}`}
                {...register('course')}
              >
                <option value="">Selecione um curso...</option>
                {CURSOS.map((curso) => (
                  <option key={curso} value={curso}>
                    {curso}
                  </option>
                ))}
              </select>
              {errors.course && (
                <span className="form-error">{errors.course.message}</span>
              )}
            </div>

            {/* Semestre */}
            <div className="form-group">
              <label className="form-label">
                Semestre <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <select
                className={`form-input ${errors.semester ? 'error' : ''}`}
                {...register('semester', { valueAsNumber: true })}
              >
                <option value="">Selecione...</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
                  <option key={s} value={s}>
                    {s}º semestre
                  </option>
                ))}
              </select>
              {errors.semester && (
                <span className="form-error">{errors.semester.message}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Seção: Segurança ──────────────────────── */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius)',
          overflow: 'hidden',
          marginBottom: '1.5rem',
        }}
      >
        <div className="card-header">
          <h3 className="card-title">
            {mode === 'criar' ? 'Senha de Acesso' : 'Alterar Senha'}
          </h3>
        </div>
        <div className="card-body">
          <div style={{ maxWidth: 420 }}>
            <Input
              label={mode === 'criar' ? 'Senha' : 'Nova senha (opcional)'}
              type="password"
              placeholder={
                mode === 'criar'
                  ? 'Mínimo 8 caracteres'
                  : 'Deixe em branco para não alterar'
              }
              required={mode === 'criar'}
              hint={
                mode === 'editar'
                  ? 'Preencha somente se quiser alterar a senha atual'
                  : undefined
              }
              error={errors.password?.message}
              {...register('password')}
            />
          </div>
        </div>
      </div>

      {/* ── Ações do formulário ───────────────────── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link to="/usuarios" className="btn btn-secondary">
          <ArrowLeft size={15} />
          Voltar
        </Link>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? <Spinner size={15} /> : <Save size={15} />}
          {mode === 'criar' ? 'Criar Usuário' : 'Salvar Alterações'}
        </button>
      </div>
    </form>
  );
}
