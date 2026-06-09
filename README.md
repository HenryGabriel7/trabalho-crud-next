# 🌿 Branch 2 — Listagem, Detalhes, Tabelas e Filtros

## Pré-requisito
Branch 1 já mergeado na `main`.

## O que este branch adiciona
- ✅ Hooks de dados: `useUsuarios` e `useMemoria` (TanStack Query)
- ✅ Componente `TabelaUsuarios` (tabela com avatar, badge semestre, ações)
- ✅ Página `/usuarios` — listagem com busca por nome/e-mail, filtro por curso e semestre
- ✅ Página `/usuarios/:id` — detalhe completo do usuário
- ✅ Página `/memoria` — módulo didático em memória com aviso explicativo

## O que ainda está como 🚧
- Dashboard → Branch 4
- Criar / Editar usuário → Branch 3

---

## 🚀 Como rodar

```bash
npm install
npm run dev
```

---

## 🔀 Fluxo Git

```bash
# 1. Clone o repositório e crie seu branch a partir da main
git clone https://github.com/SEU_USUARIO/REPO.git
cd REPO
git checkout main
git pull
git checkout -b feature/branch-2

# 2. Copie os arquivos novos deste zip para o projeto:
#    src/hooks/useUsuarios.ts
#    src/hooks/useMemoria.ts
#    src/components/usuarios/TabelaUsuarios.tsx
#    src/pages/usuarios/ListarUsuarios.tsx
#    src/pages/usuarios/DetalheUsuario.tsx
#    src/pages/usuarios/ListarMemoria.tsx
#    src/App.tsx  ← substitua o existente

# 3. Commit e PR
git add .
git commit -m "feat: branch 2 - listagem, detalhes e módulo memória"
git push origin feature/branch-2
# Abra Pull Request para main no GitHub
```

---

## 📁 Arquivos novos neste branch

```
src/
├── hooks/
│   ├── useUsuarios.ts     ← novo
│   └── useMemoria.ts      ← novo
├── components/
│   └── usuarios/
│       └── TabelaUsuarios.tsx  ← novo
└── pages/
    └── usuarios/
        ├── ListarUsuarios.tsx  ← novo
        ├── DetalheUsuario.tsx  ← novo
        └── ListarMemoria.tsx   ← novo
```
