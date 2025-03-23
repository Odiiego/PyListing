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
    throw new Error(error instanceof Error ? error.message : 'Erro inesperado');
  }
};
