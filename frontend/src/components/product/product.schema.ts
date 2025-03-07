import { z } from 'zod';

export const createBrandSchema = z.object({
  quantity: z.union([z.string(), z.number()]).transform((num) => Number(num)),
  price: z.union([z.string(), z.number()]).transform((num) => Number(num)),
  name: z.string().min(1, 'o nome da marca é obrigatório'),
});
