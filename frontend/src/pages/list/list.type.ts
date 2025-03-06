import { z } from 'zod';
import { createProductSchema } from './list.schema';

export type ICreateProductSchemaType = z.infer<typeof createProductSchema>;
