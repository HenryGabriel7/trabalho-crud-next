*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  /* Cores principais */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-primary-light: #eff6ff;
  --color-accent: #f59e0b;
  --color-accent-light: #fffbeb;

  /* Status */
  --color-success: #10b981;
  --color-success-light: #ecfdf5;
  --color-danger: #ef4444;
  --color-danger-hover: #dc2626;
  --color-danger-light: #fef2f2;
  --color-warning: #f59e0b;
  --color-warning-light: #fffbeb;

  /* Sidebar */
  --sidebar-bg: #0f1629;
  --sidebar-hover: #1e293b;
  --sidebar-active: #2563eb;
  --sidebar-border: #1e293b;
  --sidebar-text: #94a3b8;
  --sidebar-text-active: #ffffff;
  --sidebar-width: 256px;

  /* Conteúdo */
  --bg-main: #f1f5f9;
  --bg-card: #ffffff;
  --bg-input: #f8fafc;

  /* Texto */
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --text-white: #ffffff;

  /* Bordas e sombras */
  --border-color: #e2e8f0;
  --border-radius: 10px;
  --border-radius-sm: 6px;
  --border-radius-lg: 16px;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);

  /* Tipografia */
  --font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;

  /* Transições */
  --transition: all 0.2s ease;
}

html {
  font-size: 16px;
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  color: var(--text-primary);
  background-color: var(--bg-main);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* =====================
   LAYOUT PRINCIPAL
===================== */
.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-left: var(--sidebar-width);
  transition: margin-left 0.3s ease;
}

.page-container {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
}

/* =====================
   SIDEBAR
===================== */
.sidebar {
  width: var(--sidebar-width);
  background-color: var(--sidebar-bg);
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 100;
  transition: transform 0.3s ease;
  overflow: hidden;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1.25rem;
  border-bottom: 1px solid var(--sidebar-border);
}

.sidebar-logo-icon {
  width: 36px;
  height: 36px;
  background: var(--color-primary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.sidebar-logo-text {
  display: flex;
  flex-direction: column;
}

.sidebar-logo-title {
  color: var(--text-white);
  font-size: var(--font-size-base);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.sidebar-logo-subtitle {
  color: var(--sidebar-text);
  font-size: var(--font-size-xs);
  font-weight: 400;
  margin-top: 1px;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow-y: auto;
}

.sidebar-section-label {
  color: var(--sidebar-text);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.75rem 0.5rem 0.25rem;
  margin-top: 0.5rem;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: var(--border-radius-sm);
  color: var(--sidebar-text);
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: 500;
  transition: var(--transition);
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
}

.sidebar-link:hover {
  background-color: var(--sidebar-hover);
  color: var(--text-white);
}

.sidebar-link.active {
  background-color: var(--color-primary);
  color: var(--text-white);
}

.sidebar-link svg {
  flex-shrink: 0;
}

.sidebar-footer {
  padding: 1rem 0.75rem;
  border-top: 1px solid var(--sidebar-border);
}

.sidebar-user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: var(--border-radius-sm);
}

.sidebar-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--font-size-xs);
  font-weight: 700;
  flex-shrink: 0;
}

.sidebar-user-info {
  flex: 1;
  min-width: 0;
}

.sidebar-user-name {
  color: var(--text-white);
  font-size: var(--font-size-sm);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}

.sidebar-user-email {
  color: var(--sidebar-text);
  font-size: var(--font-size-xs);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* =====================
   HEADER
===================== */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: var(--bg-card);
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-left {
  display: flex;
  flex-direction: column;
}

.header-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}

.header-subtitle {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-top: 1px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* =====================
   PÁGINA - CABEÇALHOS
===================== */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-title {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.page-subtitle {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-top: 0.25rem;
  font-weight: 400;
}

/* =====================
   CARDS
===================== */
.card {
  background-color: var(--bg-card);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.card-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.card-title {
  font-size: var(--font-size-base);
  font-weight: 700;
  color: var(--text-primary);
}

.card-body {
  padding: 1.5rem;
}

/* =====================
   BOTÕES
===================== */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5625rem 1rem;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  font-weight: 600;
  font-family: var(--font-family);
  cursor: pointer;
  border: none;
  transition: var(--transition);
  text-decoration: none;
  white-space: nowrap;
  line-height: 1;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--text-white);
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
}

.btn-secondary {
  background-color: var(--bg-input);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background-color: var(--border-color);
}

.btn-danger {
  background-color: var(--color-danger);
  color: var(--text-white);
}

.btn-danger:hover {
  background-color: var(--color-danger-hover);
}

.btn-ghost {
  background-color: transparent;
  color: var(--text-secondary);
  border: 1px solid transparent;
}

.btn-ghost:hover {
  background-color: var(--bg-input);
  color: var(--text-primary);
}

.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: var(--font-size-xs);
}

.btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: var(--font-size-base);
}

.btn-full {
  width: 100%;
}

.btn-icon {
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
}

/* =====================
   FORMULÁRIOS
===================== */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.form-label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-primary);
}

.form-label span {
  color: var(--color-danger);
  margin-left: 2px;
}

.form-input {
  width: 100%;
  padding: 0.5625rem 0.875rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  font-family: var(--font-family);
  color: var(--text-primary);
  background-color: var(--bg-card);
  transition: var(--transition);
  outline: none;
  line-height: 1.5;
}

.form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-input::placeholder {
  color: var(--text-muted);
}

.form-input.error {
  border-color: var(--color-danger);
}

.form-input.error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-error {
  font-size: var(--font-size-xs);
  color: var(--color-danger);
  font-weight: 500;
}

.form-hint {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

.form-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* =====================
   TABELAS
===================== */
.table-wrapper {
  overflow-x: auto;
  border-radius: var(--border-radius);
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm);
}

.table thead {
  background-color: var(--bg-input);
}

.table th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;
  border-bottom: 1px solid var(--border-color);
}

.table td {
  padding: 0.875rem 1rem;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-color);
  vertical-align: middle;
}

.table tbody tr:last-child td {
  border-bottom: none;
}

.table tbody tr:hover {
  background-color: var(--bg-input);
}

.table-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* =====================
   BADGES
===================== */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
  font-size: var(--font-size-xs);
  font-weight: 600;
  white-space: nowrap;
}

.badge-blue {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
}

.badge-green {
  background-color: var(--color-success-light);
  color: var(--color-success);
}

.badge-amber {
  background-color: var(--color-accent-light);
  color: var(--color-accent);
}

.badge-red {
  background-color: var(--color-danger-light);
  color: var(--color-danger);
}

.badge-gray {
  background-color: var(--bg-input);
  color: var(--text-secondary);
}

/* =====================
   MÉTRICAS / STATS
===================== */
.metric-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric-card {
  background-color: var(--bg-card);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  box-shadow: var(--shadow-sm);
}

.metric-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.metric-info {
  flex: 1;
}

.metric-label {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-value {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  line-height: 1;
  margin-top: 0.25rem;
}

.metric-change {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  margin-top: 0.25rem;
}

/* =====================
   DASHBOARD GRID
===================== */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* =====================
   FILTRO / PESQUISA
===================== */
.filter-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  flex-wrap: wrap;
}

.search-input-wrapper {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.search-input-wrapper svg {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2.25rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  font-family: var(--font-family);
  color: var(--text-primary);
  background-color: var(--bg-card);
  outline: none;
  transition: var(--transition);
}

.search-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.filter-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  font-family: var(--font-family);
  color: var(--text-primary);
  background-color: var(--bg-card);
  outline: none;
  cursor: pointer;
  transition: var(--transition);
}

.filter-select:focus {
  border-color: var(--color-primary);
}

/* =====================
   AUTH PAGES
===================== */
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f1629 0%, #1e293b 50%, #0f172a 100%);
  padding: 1.5rem;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background-color: var(--bg-card);
  border-radius: var(--border-radius-lg);
  padding: 2.5rem;
  box-shadow: var(--shadow-lg);
}

.auth-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.auth-logo-icon {
  width: 40px;
  height: 40px;
  background: var(--color-primary);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.auth-logo-title {
  font-size: var(--font-size-xl);
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.03em;
}

.auth-title {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.03em;
}

.auth-subtitle {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-top: 0.5rem;
  margin-bottom: 2rem;
}

.auth-link-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  text-align: center;
  margin-top: 1.5rem;
}

.auth-link-text a {
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
}

.auth-link-text a:hover {
  text-decoration: underline;
}

/* =====================
   SPINNER / LOADING
===================== */
.spinner {
  width: 20px;
  height: 20px;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

.spinner-primary {
  border-color: rgba(37, 99, 235, 0.2);
  border-top-color: var(--color-primary);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  flex-direction: column;
  gap: 1rem;
  color: var(--text-secondary);
}

/* =====================
   EMPTY STATE
===================== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  gap: 1rem;
}

.empty-state-icon {
  width: 64px;
  height: 64px;
  background-color: var(--bg-input);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
}

.empty-state-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--text-primary);
}

.empty-state-desc {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  max-width: 360px;
}

/* =====================
   DETALHE USUÁRIO
===================== */
.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-value {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  font-weight: 500;
}

.detail-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

/* =====================
   MODAL / CONFIRM
===================== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 1rem;
}

.modal-box {
  background: var(--bg-card);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  max-width: 420px;
  width: 100%;
  box-shadow: var(--shadow-lg);
}

.modal-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.modal-desc {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

/* =====================
   UTILITÁRIOS
===================== */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-4 { margin-top: 1rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.text-sm { font-size: var(--font-size-sm); }
.text-muted { color: var(--text-secondary); }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.w-full { width: 100%; }
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.divider {
  height: 1px;
  background-color: var(--border-color);
  margin: 1rem 0;
}

/* =====================
   RESPONSIVO
===================== */
@media (max-width: 768px) {
  :root {
    --sidebar-width: 0px;
  }

  .sidebar {
    transform: translateX(-256px);
    width: 256px;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
  }

  .form-grid,
  .form-grid-3 {
    grid-template-columns: 1fr;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .page-container {
    padding: 1rem;
  }

  .auth-card {
    padding: 1.5rem;
  }

  .metric-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .metric-grid {
    grid-template-columns: 1fr;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input-wrapper {
    min-width: unset;
  }
}
