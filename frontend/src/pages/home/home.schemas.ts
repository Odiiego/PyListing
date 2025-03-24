import { z } from 'zod';

export const createListSchema = z.object({
  name: z
    .string()
    .min(1, 'O nome da lista é obrigatório')
    .trim()
    .min(3, 'O nome da lista deve ter pelo menos 3 caracteres')
    .max(30, 'O nome da lista deve ter no máximo 30 caracteres'),
});
