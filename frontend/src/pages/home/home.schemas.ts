import { z } from 'zod';

export const createListSchema = z.object({
  name: z.string().min(1, 'o nome da lista é obrigatório'),
});
