import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { memoriaStore, delay } from '../lib/mockStore';
import { getErrorMessage } from '../lib/api';
import type { UsuarioMemoria, CreateUsuarioMemoriaPayload } from '../types';

export const MEMORIA_QUERY_KEY = ['user-memory'];

// ===================================================
// GET /user — lista usuários em memória
// ===================================================
export function useUsuariosMemoria() {
  return useQuery<UsuarioMemoria[]>({
    queryKey: MEMORIA_QUERY_KEY,
    queryFn: async () => {
      await delay(250);
      return memoriaStore.getAll();
    },
  });
}

// ===================================================
// POST /user — cria usuário em memória
// ===================================================
export function useCriarMemoria() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateUsuarioMemoriaPayload) => {
      await delay(300);
      return memoriaStore.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEMORIA_QUERY_KEY });
      toast.success('Usuário criado na memória!');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

// ===================================================
// PUT /user/:id — atualiza usuário em memória
// ===================================================
export function useAtualizarMemoria(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<CreateUsuarioMemoriaPayload>) => {
      await delay(300);
      return memoriaStore.update(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEMORIA_QUERY_KEY });
      toast.success('Usuário atualizado!');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

// ===================================================
// DELETE /user/:id — remove usuário em memória
// ===================================================
export function useRemoverMemoria() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await delay(300);
      memoriaStore.remove(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEMORIA_QUERY_KEY });
      toast.success('Usuário removido da memória!');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
