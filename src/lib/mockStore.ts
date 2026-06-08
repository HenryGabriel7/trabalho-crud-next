import type { User, UsuarioMemoria, CreateUserPayload, UpdateUserPayload } from '../types';
import { INITIAL_USERS, INITIAL_MEMORIA, DEMO_ACCOUNT } from './mockData';

// =============================================
// Utilitários
// =============================================

/** Simula a latência de rede (ms) */
export const delay = (ms = 300) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Gera um UUID v4 simples sem biblioteca externa */
function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Gera um token JWT fake com a estrutura real (header.payload.signature).
 * O payload é base64url válido, então o decode do AuthContext funciona.
 */
export function generateFakeToken(sub: string, email: string): string {
  const now = Math.floor(Date.now() / 1000);
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const payload = btoa(
    JSON.stringify({ sub, email, iat: now, exp: now + 172800 }) // 2 dias
  ).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  return `${header}.${payload}.mock_signature_sem_backend`;
}

// =============================================
// Estado global em memória (persiste na sessão)
// =============================================

// Clona o array para não mutar os dados originais
let _users: User[] = [...INITIAL_USERS];
let _memoria: UsuarioMemoria[] = [...INITIAL_MEMORIA];

// Mapa de contas registradas: email → senha
// Começa com a conta demo (admin@edu.com / 12345678)
const _accounts = new Map<string, string>([
  [DEMO_ACCOUNT.email, DEMO_ACCOUNT.password],
]);

// =============================================
// userStore — CRUD de usuários (banco simulado)
// =============================================
export const userStore = {
  /** Retorna todos os usuários */
  getAll(): User[] {
    return [..._users];
  },

  /** Busca um usuário por ID, lança erro se não encontrar */
  getById(id: string): User {
    const user = _users.find((u) => u.id === id);
    if (!user) throw new Error('Usuário não encontrado!');
    return { ...user };
  },

  /** Cria um novo usuário */
  create(data: CreateUserPayload): User {
    const now = new Date().toISOString();
    const newUser: User = {
      id: generateId(),
      name: data.name,
      email: data.email,
      course: data.course,
      semester: data.semester,
      phone: data.phone,
      createdAt: now,
      updatedAt: now,
    };
    _users.push(newUser);
    return { ...newUser };
  },

  /** Atualiza campos parciais de um usuário */
  update(id: string, data: UpdateUserPayload): User {
    const index = _users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error('Usuário não encontrado!');

    const updated: User = {
      ..._users[index],
      ...data,
      // password não é guardada no tipo User (só no backend)
      updatedAt: new Date().toISOString(),
    };

    _users[index] = updated;
    return { ...updated };
  },

  /** Remove um usuário */
  remove(id: string): void {
    const exists = _users.some((u) => u.id === id);
    if (!exists) throw new Error('Usuário não encontrado!');
    _users = _users.filter((u) => u.id !== id);
  },
};

// =============================================
// memoriaStore — CRUD em memória (didático)
// Espelha o UserMemoryService do NestJS
// =============================================
export const memoriaStore = {
  getAll(): UsuarioMemoria[] {
    return [..._memoria];
  },

  getById(id: number): UsuarioMemoria {
    const user = _memoria.find((u) => u.id === id);
    if (!user) throw new Error(`Usuário com id: ${id} não foi encontrado!`);
    return { ...user };
  },

  create(data: UsuarioMemoria): UsuarioMemoria {
    _memoria.push({ ...data });
    return { ...data };
  },

  update(id: number, data: Partial<UsuarioMemoria>): UsuarioMemoria {
    const index = _memoria.findIndex((u) => u.id === id);
    if (index === -1) throw new Error(`Usuário com id: ${id} não foi encontrado!`);

    const updated: UsuarioMemoria = {
      id: data.id ?? _memoria[index].id,
      nome: data.nome ?? _memoria[index].nome,
      idade: data.idade ?? _memoria[index].idade,
      sexo: data.sexo ?? _memoria[index].sexo,
      dataNascimento: data.dataNascimento ?? _memoria[index].dataNascimento,
    };

    _memoria[index] = updated;
    return { ...updated };
  },

  remove(id: number): void {
    const exists = _memoria.some((u) => u.id === id);
    if (!exists) throw new Error(`Usuário com id: ${id} não foi encontrado!`);
    _memoria = _memoria.filter((u) => u.id !== id);
  },
};

// =============================================
// authStore — autenticação simulada
// =============================================
export const authStore = {
  /**
   * Simula POST /auth/login.
   * Retorna um token fake se as credenciais batem.
   */
  login(email: string, password: string): { access_token: string } {
    const savedPassword = _accounts.get(email);

    if (!savedPassword || savedPassword !== password) {
      throw new Error('E-mail ou senha incorretos');
    }

    // Busca o id do usuário correspondente (se existir na lista)
    const user = _users.find((u) => u.email === email);
    const sub = user?.id ?? generateId();

    return { access_token: generateFakeToken(sub, email) };
  },

  /**
   * Simula POST /users (registro público).
   * Salva a conta e cria o usuário na lista.
   */
  register(data: CreateUserPayload): User {
    if (_accounts.has(data.email)) {
      throw new Error('Este e-mail já está cadastrado');
    }

    // Salva a senha (em produção isso é feito via bcrypt no backend)
    _accounts.set(data.email, data.password);

    // Cria o usuário no store (sem a senha — campo não existe no tipo User)
    return userStore.create(data);
  },
};
