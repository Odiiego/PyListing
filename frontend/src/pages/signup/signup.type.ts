import { z } from 'zod';
import { signUpSchema } from './signup.schema';

export interface ISignUpRequest {
  email: string;
  password: string;
  username: string;
}

export interface ISignUpResponse {
  access_token: string;
  token_type: string;
}

export type ISignUpSchemaType = z.infer<typeof signUpSchema>;
