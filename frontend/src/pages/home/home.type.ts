import { z } from 'zod';
import { createListSchema } from './home.schemas';

export type ICreateListSchemaType = z.infer<typeof createListSchema>;
