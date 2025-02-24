import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email('E-mail inválido'),
  username: z.string().min(1, 'o campo username é obrigatório'),
  password: z
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .max(20, 'A senha deve ter no máximo 20 caracteres'),
  // .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
  // .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
  // .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
  // .regex(/[\W_]/, 'A senha deve conter pelo menos um caractere especial'),
});
