import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GraduationCap, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { api, getErrorMessage } from '../../lib/api';
import { createUserSchema } from '../../lib/validations';
import type { CreateUserFormData } from '../../lib/validations';

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

export function Registro() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  });

  // Chama POST /users no backend NestJS (rota pública)
  async function onSubmit(data: CreateUserFormData) {
    setIsLoading(true);
    setServerError('');

    try {
      await api.post('/users', {
        name: data.name,
        email: data.email,
        password: data.password,
        course: data.course,
        semester: data.semester,
        phone: data.phone,
      });

      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setServerError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  // Tela de sucesso após cadastro
  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: 'var(--color-success-light)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}
          >
            <CheckCircle size={32} color="var(--color-success)" />
          </div>
          <h2
            style={{
              fontWeight: 800,
              fontSize: 'var(--font-size-2xl)',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
            }}
          >
            Conta criada!
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            Seu cadastro foi realizado com sucesso. Redirecionando para o login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 500 }}>
        {/* Logo */}
        <div className="auth-logo">
          <div className="auth-logo-icon">
            <GraduationCap size={22} color="white" />
          </div>
          <span className="auth-logo-title">EduManager</span>
        </div>

        <h1 className="auth-title">Criar conta</h1>
        <p className="auth-subtitle">
          Preencha os dados abaixo para se cadastrar
        </p>

        {serverError && (
          <div
            style={{
              background: 'var(--color-danger-light)',
              border: '1px solid var(--color-danger)',
              borderRadius: 'var(--border-radius-sm)',
              padding: '0.75rem 1rem',
              marginBottom: '1rem',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-danger)',
              fontWeight: 500,
            }}
          >
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-stack">
            {/* Nome */}
            <div className="form-group">
              <label className="form-label">
                Nome completo <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <input
                type="text"
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Seu nome completo"
                {...register('name')}
              />
              {errors.name && <span className="form-error">{errors.name.message}</span>}
            </div>

            {/* E-mail */}
            <div className="form-group">
              <label className="form-label">
                E-mail <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <input
                type="email"
                autoComplete="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="seu@email.com"
                {...register('email')}
              />
              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>

            {/* Senha */}
            <div className="form-group">
              <label className="form-label">
                Senha <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Mínimo 8 caracteres"
                  style={{ paddingRight: '2.5rem' }}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0,
                  }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <span className="form-error">{errors.password.message}</span>}
            </div>

            {/* Telefone */}
            <div className="form-group">
              <label className="form-label">
                Telefone <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <input
                type="tel"
                className={`form-input ${errors.phone ? 'error' : ''}`}
                placeholder="(44) 99999-9999 — somente números"
                {...register('phone')}
              />
              {errors.phone && <span className="form-error">{errors.phone.message}</span>}
            </div>

            {/* Curso + Semestre */}
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Curso <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <select
                  className={`form-input ${errors.course ? 'error' : ''}`}
                  {...register('course')}
                >
                  <option value="">Selecione...</option>
                  {CURSOS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.course && <span className="form-error">{errors.course.message}</span>}
              </div>

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
                    <option key={s} value={s}>{s}º semestre</option>
                  ))}
                </select>
                {errors.semester && <span className="form-error">{errors.semester.message}</span>}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full btn-lg"
              disabled={isLoading}
              style={{ marginTop: '0.5rem' }}
            >
              {isLoading ? (
                <><div className="spinner" style={{ width: 16, height: 16 }} />Cadastrando...</>
              ) : (
                'Criar Conta'
              )}
            </button>
          </div>
        </form>

        <p className="auth-link-text">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
