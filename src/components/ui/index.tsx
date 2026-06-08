import { ReactNode } from 'react';

// =============================================
// Badge
// =============================================
type BadgeVariant = 'blue' | 'green' | 'amber' | 'red' | 'gray';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

export function Badge({ children, variant = 'gray' }: BadgeProps) {
  return (
    <span className={`badge badge-${variant}`}>
      {children}
    </span>
  );
}

// Retorna a variante do badge de acordo com o semestre
export function getSemesterBadgeVariant(semester: number): BadgeVariant {
  if (semester <= 2) return 'green';
  if (semester <= 4) return 'blue';
  if (semester <= 6) return 'amber';
  if (semester <= 8) return 'red';
  return 'gray';
}

// =============================================
// Card
// =============================================
interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`card ${className}`.trim()}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="card-header">
      <div>
        <h3 className="card-title">{title}</h3>
        {subtitle && (
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardBody({ children }: { children: ReactNode }) {
  return <div className="card-body">{children}</div>;
}

// =============================================
// Spinner de carregamento
// =============================================
interface SpinnerProps {
  size?: number;
  variant?: 'white' | 'primary';
}

export function Spinner({ size = 20, variant = 'white' }: SpinnerProps) {
  return (
    <div
      className={`spinner ${variant === 'primary' ? 'spinner-primary' : ''}`}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Carregando"
    />
  );
}

// =============================================
// Estado vazio (sem registros)
// =============================================
interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      {icon && <div className="empty-state-icon">{icon}</div>}
      <h3 className="empty-state-title">{title}</h3>
      {description && <p className="empty-state-desc">{description}</p>}
      {action && <div style={{ marginTop: '0.75rem' }}>{action}</div>}
    </div>
  );
}

// =============================================
// Página de carregamento
// =============================================
export function LoadingPage({ message = 'Carregando...' }: { message?: string }) {
  return (
    <div className="loading-page">
      <Spinner variant="primary" size={32} />
      <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
        {message}
      </p>
    </div>
  );
}

// =============================================
// Modal de confirmação (ex: exclusão)
// =============================================
interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-desc">{description}</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel} disabled={isLoading}>
            {cancelLabel}
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? <Spinner size={14} /> : null}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
