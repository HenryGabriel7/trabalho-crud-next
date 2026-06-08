import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
}

// Layout principal: sidebar fixa + conteúdo com header
export function Layout({ children }: LayoutProps) {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Header />

        <div className="page-container">
          {children}
        </div>
      </main>
    </div>
  );
}
