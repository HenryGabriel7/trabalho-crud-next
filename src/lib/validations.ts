import { z } from 'zod';

// ===================================================
// Schema de Login
// Campos: email e senha
// ===================================================
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(8, 'A senha deve ter pelo menos 8 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// ===================================================
// Schema de Criação de Usuário
// Espelha o CreateUserDto do backend NestJS
// ===================================================
export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(8, 'A senha deve ter pelo menos 8 caracteres'),
  course: z
    .string()
    .min(1, 'Curso é obrigatório'),
  semester: z
    .number({ invalid_type_error: 'Semestre deve ser um número' })
    .min(1, 'Semestre deve ser entre 1 e 10')
    .max(10, 'Semestre deve ser entre 1 e 10'),
  phone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .min(11, 'Telefone deve ter pelo menos 11 dígitos')
    .max(15, 'Telefone inválido'),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;

// ===================================================
// Schema de Edição de Usuário
// Todos os campos são opcionais (PATCH/PUT parcial)
// Senha pode ser omitida se não quiser alterar
// ===================================================
export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .email('Informe um e-mail válido')
    .optional()
    .or(z.literal('')),
  password: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .optional()
    .or(z.literal('')),
  course: z
    .string()
    .min(1, 'Curso é obrigatório')
    .optional()
    .or(z.literal('')),
  semester: z
    .number({ invalid_type_error: 'Semestre deve ser um número' })
    .min(1, 'Semestre mínimo é 1')
    .max(10, 'Semestre máximo é 10')
    .optional(),
  phone: z
    .string()
    .min(11, 'Telefone deve ter pelo menos 11 dígitos')
    .optional()
    .or(z.literal('')),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
