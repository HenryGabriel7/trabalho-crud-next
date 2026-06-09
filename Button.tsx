// =============================================
// Tipos do backend: entidade User (PostgreSQL)
// =============================================
export interface User {
  id: string;
  name: string;
  email: string;
  course: string;
  semester: number;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

// Payload de criação/atualização enviado ao backend
export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  course: string;
  semester: number;
  phone: string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  course?: string;
  semester?: number;
  phone?: string;
}

// =============================================
// Tipos do módulo em memória (didático)
// =============================================
export interface UsuarioMemoria {
  id: number;
  nome: string;
  idade: number;
  sexo: 'Masculino' | 'Feminino';
  dataNascimento?: string;
}

export interface CreateUsuarioMemoriaPayload {
  id: number;
  nome: string;
  idade: number;
  sexo: 'Masculino' | 'Feminino';
  dataNascimento?: string;
}

// =============================================
// Tipos de autenticação
// =============================================
export interface AuthTokenResponse {
  access_token: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// =============================================
// Tipos de erros da API
// =============================================
export interface ApiError {
  message: string | string[];
  error: string;
  statusCode: number;
}
