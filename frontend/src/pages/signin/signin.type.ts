import { z } from 'zod';
import { signInSchema } from './signin.schema';

export interface SignInRequest {
  password: string;
  username: string;
}

export interface SignInResponse {
  access_token: string;
  token_type: string;
}

export type signInSchemaType = z.infer<typeof signInSchema>;
