import { z } from 'zod';

export const createProductSchema = z.object({
  quantity: z.union([z.string(), z.number()]).transform((num) => Number(num)),
  name: z.string().min(1, 'o nome do produto é obrigatório'),
});
