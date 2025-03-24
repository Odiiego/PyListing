import { ICreateProductSchemaType } from '../../pages/list/list.type';
import { IProduct } from './productServices.type';
import { IToken } from '../auth/authServices.type';
import api from '../utils/apiUtils';
import { getAuthHeaders } from '../auth/authServices';

export const createProductService = async (
  data: ICreateProductSchemaType,
  listId: undefined | number,
  userToken: undefined | IToken,
): Promise<IProduct> => {
  try {
    if (!userToken) throw new Error('Token de usuário não encontrado');
    if (!listId) throw new Error('ID da lista não pode ser indefinido');

    const response = await api.post(`/products/${listId}`, data, {
      headers: getAuthHeaders(userToken),
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw new Error(error instanceof Error ? error.message : 'Erro inesperado');
  }
};

export const deleteProductService = async (
  productId: number,
  userToken: undefined | IToken,
): Promise<void> => {
  try {
    if (!userToken) throw new Error('Token de usuário não encontrado');

    const response = await api.delete(`/products/${productId}`, {
      headers: getAuthHeaders(userToken),
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    throw new Error(error instanceof Error ? error.message : 'Erro inesperado');
  }
};
