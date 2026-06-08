import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GraduationCap, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getErrorMessage } from '../../lib/api';
import { loginSchema } from '../../lib/validations';
import { DEMO_ACCOUNT } from '../../lib/mockData';
import type { LoginFormData } from '../../lib/validations';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    setServerError('');
    try {
      await login({ email: data.email, password: data.password });
      navigate('/');
    } catch (error) {
      setServerError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  // Preenche o formulário com a conta demo com um clique
  function fillDemo() {
    setValue('email', DEMO_ACCOUNT.email);
    setValue('password', DEMO_ACCOUNT.password);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <div className="auth-logo-icon">
            <GraduationCap size={22} color="white" />
          </div>
          <span className="auth-logo-title">EduManager</span>
        </div>

        <h1 className="auth-title">Bem-vindo de volta</h1>
        <p className="auth-subtitle">Entre com sua conta para acessar o sistema</p>

        {/* Erro do servidor */}
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

        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-stack">
            {/* E-mail */}
            <div className="form-group">
              <label className="form-label">
                E-mail <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute', left: '0.75rem', top: '50%',
                    transform: 'translateY(-50%)', color: 'var(--text-muted)',
                    display: 'flex', alignItems: 'center', pointerEvents: 'none',
                  }}
                >
                  <Mail size={15} />
                </span>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  style={{ paddingLeft: '2.25rem' }}
                  {...register('email')}
                />
              </div>
              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>

            {/* Senha */}
            <div className="form-group">
              <label className="form-label">
                Senha <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute', left: '0.75rem', top: '50%',
                    transform: 'translateY(-50%)', color: 'var(--text-muted)',
                    display: 'flex', alignItems: 'center', pointerEvents: 'none',
                  }}
                >
                  <Lock size={15} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  style={{ paddingLeft: '2.25rem', paddingRight: '2.5rem' }}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  style={{
                    position: 'absolute', right: '0.75rem', top: '50%',
                    transform: 'translateY(-50%)', background: 'none',
                    border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                    display: 'flex', alignItems: 'center', padding: 0,
                  }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <span className="form-error">{errors.password.message}</span>}
            </div>

            {/* Botão login */}
            <button
              type="submit"
              className="btn btn-primary btn-full btn-lg"
              disabled={isLoading}
              style={{ marginTop: '0.5rem' }}
            >
              {isLoading ? (
                <><div className="spinner" style={{ width: 16, height: 16 }} />Entrando...</>
              ) : (
                'Entrar'
              )}
            </button>
          </div>
        </form>

        <p className="auth-link-text">
          Não tem conta? <Link to="/registro">Cadastre-se</Link>
        </p>

        {/* Credenciais demo — visíveis sem backend */}
        <div
          style={{
            marginTop: '1.5rem',
            padding: '0.875rem 1rem',
            background: 'var(--color-primary-light)',
            borderRadius: 'var(--border-radius-sm)',
            border: '1px solid #bfdbfe',
          }}
        >
          <p
            style={{
              fontSize: 'var(--font-size-xs)',
              fontWeight: 700,
              color: 'var(--color-primary)',
              marginBottom: '0.375rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            🧪 Conta de demonstração
          </p>
          <p style={{ fontSize: 'var(--font-size-xs)', color: '#1e40af', marginBottom: '0.5rem' }}>
            <strong>E-mail:</strong> {DEMO_ACCOUNT.email}<br />
            <strong>Senha:</strong> {DEMO_ACCOUNT.password}
          </p>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{ fontSize: '0.7rem', padding: '0.25rem 0.625rem' }}
            onClick={fillDemo}
          >
            Preencher automaticamente
          </button>
        </div>
      </div>
    </div>
  );
}
