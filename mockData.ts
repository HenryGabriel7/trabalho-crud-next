import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { userStore, delay } from '../lib/mockStore';
import { getErrorMessage } from '../lib/api';
import type { User, CreateUserPayload, UpdateUserPayload } from '../types';

export const USERS_QUERY_KEY = ['users'];

// ===================================================
// GET /users — lista todos os usuários
// ===================================================
export function useUsuarios() {
  return useQuery<User[]>({
    queryKey: USERS_QUERY_KEY,
    queryFn: async () => {
      await delay(300);
      return userStore.getAll();
    },
  });
}

// ===================================================
// GET /users/:id — busca um usuário por ID
// ===================================================
export function useUsuario(id: string | undefined) {
  return useQuery<User>({
    queryKey: [...USERS_QUERY_KEY, id],
    queryFn: async () => {
      await delay(250);
      return userStore.getById(id!);
    },
    enabled: !!id,
  });
}

// ===================================================
// POST /users — cria usuário
// ===================================================
export function useCriarUsuario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateUserPayload) => {
      await delay(400);
      return userStore.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      toast.success('Usuário criado com sucesso!');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

// ===================================================
// PUT /users/:id — atualiza usuário
// ===================================================
export function useAtualizarUsuario(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserPayload) => {
      await delay(400);
      return userStore.update(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...USERS_QUERY_KEY, id] });
      toast.success('Usuário atualizado com sucesso!');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

// ===================================================
// DELETE /users/:id — remove usuário
// ===================================================
export function useRemoverUsuario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await delay(350);
      userStore.remove(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      toast.success('Usuário removido com sucesso!');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
