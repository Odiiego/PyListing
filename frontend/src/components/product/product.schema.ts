import { z } from 'zod';

export const createBrandSchema = z.object({
  quantity: z
    .union([z.string(), z.number()])
    .transform((num) => Number(num))
    .refine((num) => !isNaN(num) && num > 0, {
      message: 'A quantidade deve ser um número maior que zero',
    }),
  price: z
    .union([z.string(), z.number()])
    .transform((num) => Number(num))
    .refine((num) => !isNaN(num) && num > 0, {
      message: 'O preço deve ser um número positivo',
    }),
  name: z.string().min(1, 'o nome da marca é obrigatório'),
});
