import { z } from 'zod';

export const createProductSchema = z.object({
  quantity: z
    .union([z.string(), z.number()])
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: 'A quantidade deve ser um número maior que zero',
    })
    .transform((num) => Number(num)),
  name: z
    .string()
    .min(1, 'O nome do produto é obrigatório')
    .max(30, 'O nome deve ter no máximo 20 caracteres'),
});
