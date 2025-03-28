import { z } from 'zod';
import { signInSchema } from './signin.schema';

export interface ISignInResponse {
  access_token: string;
  token_type: string;
}

export type ISignInSchemaType = z.infer<typeof signInSchema>;
