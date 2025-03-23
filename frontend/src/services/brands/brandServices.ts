import { ICreateBrandSchemaType } from '../../components/product/product.type';
import { IToken } from '../auth/authService.type';
import { IBrand } from './brandServices.type';
import { getAuthHeaders } from '../auth/authService';
import api from '../utils/apiUtils';

export const createBrandService = async (
  data: ICreateBrandSchemaType,
  productId: number,
  userToken: IToken,
): Promise<IBrand> => {
  try {
    if (!userToken) throw new Error('Token de usuário não encontrado');
    if (!productId) throw new Error('ID do produto não pode ser indefinido');

    const response = await api.post(`/brands/${productId}`, data, {
      headers: getAuthHeaders(userToken),
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao criar a marca:', error);
    throw new Error(error instanceof Error ? error.message : 'Erro inesperado');
  }
};

export const deleteBrandService = async (
  brandId: number,
  userToken: undefined | IToken,
) => {
  try {
    if (!userToken) throw new Error('Token de usuário não encontrado');

    const response = await api.delete(`/brands/${brandId}`, {
      headers: getAuthHeaders(userToken),
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao excluir a marca:', error);
    throw new Error(error instanceof Error ? error.message : 'Erro inesperado');
  }
};
