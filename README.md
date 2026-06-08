# 🌿 Branch 1 — Estrutura Inicial

## O que já está pronto neste branch
- ✅ Configuração do projeto (Vite + React + TypeScript)
- ✅ Sistema de design completo (`index.css` com variáveis CSS)
- ✅ Tipos TypeScript (`src/types/index.ts`)
- ✅ Dados mock (`src/lib/mockData.ts` + `src/lib/mockStore.ts`)
- ✅ Configuração de API (`src/lib/api.ts`)
- ✅ Validações Zod (`src/lib/validations.ts`)
- ✅ Autenticação (`src/contexts/AuthContext.tsx`)
- ✅ Layout: Sidebar, Header, Layout
- ✅ Componentes UI: Button, Input, Badge, Card, Spinner, EmptyState, Modal
- ✅ Páginas de Auth: Login e Registro

## O que está como 🚧 (placeholder)
- Dashboard → Branch 4
- Listagem de usuários → Branch 2
- Detalhe do usuário → Branch 2
- Módulo Memória → Branch 2
- Criar / Editar usuário → Branch 3

---

## 🚀 Como rodar

```bash
npm install
npm run dev
# Abre em http://localhost:3000
```

**Login demo:** `admin@edu.com` / `12345678`
(ou clica em "Preencher automaticamente" na tela de login)

---

## 🔀 Fluxo Git para o time

```bash
# 1. Suba este branch como base do projeto
git init
git add .
git commit -m "feat: branch 1 - estrutura inicial, layout e autenticação"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/REPO.git
git push -u origin main

# 2. Avise os outros para clonar o repositório
#    Cada um vai criar seu branch a partir deste
```

---

## 📁 Arquivos deste branch

```
src/
├── types/index.ts
├── lib/
│   ├── api.ts
│   ├── mockData.ts
│   ├── mockStore.ts
│   └── validations.ts
├── contexts/AuthContext.tsx
├── components/
│   ├── layout/  (Sidebar, Header, Layout)
│   └── ui/      (Button, Input, Badge, Card, Spinner...)
└── pages/
    └── auth/    (Login, Registro)
```
