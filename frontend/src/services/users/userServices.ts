import { ISignInSchemaType } from '../../pages/signin/signin.type';
import { ISignUpSchemaType } from '../../pages/signup/signup.type';
import { IToken } from '../auth/authServices.type';
import api from '../utils/apiUtils';

export const createUserService = async (
  data: ISignUpSchemaType,
): Promise<IToken> => {
  try {
    const response = await api.post('/users/', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Erro ao criar o usuário',
    );
  }
};

export const getUserService = async (
  data: ISignInSchemaType,
): Promise<IToken> => {
  try {
    const formData = new URLSearchParams({
      username: data.username,
      password: data.password,
    });
    const response = await api.post('/auth/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Erro ao fazer login',
    );
  }
};
