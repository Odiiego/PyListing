import { z } from 'zod';
import { signUpSchema } from './signup.schema';

export interface SignUpRequest {
  email: string;
  password: string;
  username: string;
}

export interface SignUpResponse {
  access_token: string;
  token_type: string;
}

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
