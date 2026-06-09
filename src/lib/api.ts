// =============================================
// api.ts — versão sem backend
//
// Quando o backend estiver pronto, substitua
// este arquivo pela versão com axios.
// Arquivo de referência: api.axios.ts (comentado
// abaixo para estudo comparativo)
// =============================================

/** Chave do token no localStorage */
export const TOKEN_KEY = '@edumanager:token';

/**
 * Extrai uma mensagem legível de qualquer erro.
 * Funciona com erros JS normais e com erros
 * vindos do axios (quando o backend for integrado).
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'Erro inesperado. Tente novamente.';
}

// =============================================
// REFERÊNCIA PARA QUANDO INTEGRAR O BACKEND:
//
// import axios, { AxiosError } from 'axios';
//
// export const api = axios.create({
//   baseURL: 'http://localhost:3333',
//   headers: { 'Content-Type': 'application/json' },
// });
//
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem(TOKEN_KEY);
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });
//
// api.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem(TOKEN_KEY);
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );
// =============================================
