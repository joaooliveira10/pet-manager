import { z } from 'zod';

/**
 * Schema de validação para login
 */
export const loginSchema = z.object({
  username: z.string().min(1, 'Usuário é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

/**
 * Schema de validação para Pet
 */
export const petSchema = z.object({
  nome: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  raca: z
    .string()
    .max(100, 'Raça deve ter no máximo 100 caracteres')
    .optional()
    .or(z.literal('')),
  idade: z
    .number()
    .int('Idade deve ser um número inteiro')
    .min(0, 'Idade deve ser positiva')
    .max(100, 'Idade inválida')
    .optional()
    .nullable(),
});

/**
 * Schema de validação para Tutor
 */
export const tutorSchema = z.object({
  nome: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  telefone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .max(20, 'Telefone deve ter no máximo 20 caracteres'),
  email: z
    .string()
    .email('E-mail inválido')
    .max(150, 'E-mail deve ter no máximo 150 caracteres')
    .optional()
    .or(z.literal('')),
  endereco: z
    .string()
    .max(200, 'Endereço deve ter no máximo 200 caracteres')
    .optional()
    .or(z.literal('')),
  cpf: z
    .number()
    .optional()
    .nullable(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type PetFormData = z.infer<typeof petSchema>;
export type TutorFormData = z.infer<typeof tutorSchema>;
