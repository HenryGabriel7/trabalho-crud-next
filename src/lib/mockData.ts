import type { User, UsuarioMemoria } from '../types';

// =============================================
// Dados iniciais de usuários (banco simulado)
// =============================================
export const INITIAL_USERS: User[] = [
  {
    id: 'a1b2c3d4-e5f6-4789-abcd-000000000001',
    name: 'Ana Clara Souza',
    email: 'ana.clara@email.com',
    course: 'Análise e Desenvolvimento de Sistemas',
    semester: 3,
    phone: '44999110001',
    createdAt: new Date('2024-02-10T09:30:00').toISOString(),
    updatedAt: new Date('2024-02-10T09:30:00').toISOString(),
  },
  {
    id: 'a1b2c3d4-e5f6-4789-abcd-000000000002',
    name: 'Bruno Henrique Lima',
    email: 'bruno.lima@email.com',
    course: 'Ciência da Computação',
    semester: 5,
    phone: '44999110002',
    createdAt: new Date('2024-02-15T14:00:00').toISOString(),
    updatedAt: new Date('2024-02-15T14:00:00').toISOString(),
  },
  {
    id: 'a1b2c3d4-e5f6-4789-abcd-000000000003',
    name: 'Carla Oliveira',
    email: 'carla.oliveira@email.com',
    course: 'Engenharia de Software',
    semester: 2,
    phone: '44999110003',
    createdAt: new Date('2024-03-01T11:20:00').toISOString(),
    updatedAt: new Date('2024-03-01T11:20:00').toISOString(),
  },
  {
    id: 'a1b2c3d4-e5f6-4789-abcd-000000000004',
    name: 'Diego Santos',
    email: 'diego.santos@email.com',
    course: 'Sistemas de Informação',
    semester: 7,
    phone: '44999110004',
    createdAt: new Date('2024-03-05T08:45:00').toISOString(),
    updatedAt: new Date('2024-03-05T08:45:00').toISOString(),
  },
  {
    id: 'a1b2c3d4-e5f6-4789-abcd-000000000005',
    name: 'Érika Fernanda Costa',
    email: 'erika.costa@email.com',
    course: 'Análise e Desenvolvimento de Sistemas',
    semester: 1,
    phone: '44999110005',
    createdAt: new Date('2024-03-10T16:00:00').toISOString(),
    updatedAt: new Date('2024-03-10T16:00:00').toISOString(),
  },
  {
    id: 'a1b2c3d4-e5f6-4789-abcd-000000000006',
    name: 'Felipe Rodrigues',
    email: 'felipe.rodrigues@email.com',
    course: 'Redes de Computadores',
    semester: 4,
    phone: '44999110006',
    createdAt: new Date('2024-03-18T10:10:00').toISOString(),
    updatedAt: new Date('2024-03-18T10:10:00').toISOString(),
  },
  {
    id: 'a1b2c3d4-e5f6-4789-abcd-000000000007',
    name: 'Gabriela Martins',
    email: 'gabriela.martins@email.com',
    course: 'Ciência da Computação',
    semester: 6,
    phone: '44999110007',
    createdAt: new Date('2024-03-22T13:30:00').toISOString(),
    updatedAt: new Date('2024-03-22T13:30:00').toISOString(),
  },
  {
    id: 'a1b2c3d4-e5f6-4789-abcd-000000000008',
    name: 'Henrique Gomes',
    email: 'henrique.gomes@email.com',
    course: 'Engenharia de Software',
    semester: 8,
    phone: '44999110008',
    createdAt: new Date('2024-04-01T09:00:00').toISOString(),
    updatedAt: new Date('2024-04-01T09:00:00').toISOString(),
  },
  {
    id: 'a1b2c3d4-e5f6-4789-abcd-000000000009',
    name: 'Isabela Rocha',
    email: 'isabela.rocha@email.com',
    course: 'Análise e Desenvolvimento de Sistemas',
    semester: 3,
    phone: '44999110009',
    createdAt: new Date('2024-04-08T15:15:00').toISOString(),
    updatedAt: new Date('2024-04-08T15:15:00').toISOString(),
  },
  {
    id: 'a1b2c3d4-e5f6-4789-abcd-000000000010',
    name: 'João Pedro Alves',
    email: 'joao.alves@email.com',
    course: 'Sistemas de Informação',
    semester: 2,
    phone: '44999110010',
    createdAt: new Date('2024-04-15T11:45:00').toISOString(),
    updatedAt: new Date('2024-04-15T11:45:00').toISOString(),
  },
];

// =============================================
// Dados iniciais do módulo em memória (didático)
// Espelha exatamente o que o NestJS inicializa em
// UserMemoryService (Ana e Anastácia)
// =============================================
export const INITIAL_MEMORIA: UsuarioMemoria[] = [
  {
    id: 1,
    nome: 'Ana',
    idade: 22,
    sexo: 'Feminino',
    dataNascimento: new Date('2005-10-23').toISOString(),
  },
  {
    id: 2,
    nome: 'Anastácia',
    idade: 62,
    sexo: 'Feminino',
    dataNascimento: undefined,
  },
];

// =============================================
// Conta de demonstração para o login
// Use: admin@edu.com / 12345678
// =============================================
export const DEMO_ACCOUNT = {
  email: 'admin@edu.com',
  password: '12345678',
};
