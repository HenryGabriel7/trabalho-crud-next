import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { LoadingPage } from './components/ui/index';

// Páginas de autenticação (Branch 1 ✅)
import { Login } from './pages/auth/Login';
import { Registro } from './pages/auth/Registro';

// ===========================================================
// STUB — Página temporária para rotas ainda não implementadas.
// Será substituída nos branches seguintes.
// ===========================================================
function EmBreve({ titulo }: { titulo: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        textAlign: 'center',
        gap: '1rem',
      }}
    >
      <div style={{ fontSize: '3rem' }}>🚧</div>
      <h2
        style={{
          fontWeight: 700,
          fontSize: 'var(--font-size-2xl)',
          color: 'var(--text-primary)',
          letterSpacing: '-0.03em',
        }}
      >
        {titulo}
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', maxWidth: 360 }}>
        Esta página será implementada no próximo branch.
        Estrutura, layout, rotas e autenticação já estão prontos! ✅
      </p>
    </div>
  );
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000, refetchOnWindowFocus: false } },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <LoadingPage message="Verificando autenticação..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <LoadingPage />;
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* ✅ Branch 1 — Auth */}
      <Route path="/login"    element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/registro" element={<PublicRoute><Registro /></PublicRoute>} />

      {/* 🚧 Branch 2 — Listagem */}
      <Route path="/usuarios"     element={<ProtectedRoute><EmBreve titulo="Listagem de Usuários" /></ProtectedRoute>} />
      <Route path="/usuarios/:id" element={<ProtectedRoute><EmBreve titulo="Detalhe do Usuário" /></ProtectedRoute>} />
      <Route path="/memoria"      element={<ProtectedRoute><EmBreve titulo="Módulo Memória" /></ProtectedRoute>} />

      {/* 🚧 Branch 3 — Formulários */}
      <Route path="/usuarios/novo"          element={<ProtectedRoute><EmBreve titulo="Criar Usuário" /></ProtectedRoute>} />
      <Route path="/usuarios/:id/editar"    element={<ProtectedRoute><EmBreve titulo="Editar Usuário" /></ProtectedRoute>} />

      {/* 🚧 Branch 4 — Dashboard */}
      <Route path="/" element={<ProtectedRoute><EmBreve titulo="Dashboard" /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
          <Toaster position="top-right" toastOptions={{ duration: 3500, style: { fontFamily: 'var(--font-family)', fontSize: '0.875rem', fontWeight: '500' } }} />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
