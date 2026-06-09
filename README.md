# 🌿 Branch 3 — Formulários de Cadastro, Edição e Validações

## Pré-requisito
Branches 1 e 2 já mergeados na `main`.

## O que este branch adiciona
- ✅ Componente `FormUsuario` — formulário reutilizável (modo criar / modo editar)
- ✅ Página `/usuarios/novo` — cadastro com validação Zod + React Hook Form
- ✅ Página `/usuarios/:id/editar` — edição com campos pré-preenchidos
- ✅ Validação completa: nome (mín. 2 chars), e-mail, senha (mín. 8), telefone (mín. 11), curso e semestre
- ✅ Senha opcional na edição (campo vazio = mantém a senha atual)

## O que ainda está como 🚧
- Dashboard → Branch 4 (último!)

---

## 🚀 Como rodar

```bash
npm install
npm run dev
```

---

## 🔀 Fluxo Git

```bash
# 1. Atualize da main (que já tem branch-2 mergeado)
git checkout main
git pull
git checkout -b feature/branch-3

# 2. Copie os arquivos novos deste zip:
#    src/components/usuarios/FormUsuario.tsx
#    src/pages/usuarios/CriarUsuario.tsx
#    src/pages/usuarios/EditarUsuario.tsx
#    src/App.tsx  ← substitua o existente

# 3. Commit e PR
git add .
git commit -m "feat: branch 3 - formulários de cadastro, edição e validações"
git push origin feature/branch-3
# Abra Pull Request para main no GitHub
```

---

## 📁 Arquivos novos neste branch

```
src/
├── components/
│   └── usuarios/
│       └── FormUsuario.tsx    ← novo
└── pages/
    └── usuarios/
        ├── CriarUsuario.tsx   ← novo
        └── EditarUsuario.tsx  ← novo
```
