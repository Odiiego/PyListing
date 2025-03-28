import { ICreateBrandSchemaType } from '../../components/product/product.type';
import { IToken } from '../auth/authServices.type';
import { IBrand } from './brandServices.type';
import { getAuthHeaders } from '../auth/authServices';
import api from '../utils/apiUtils';

export const createBrandService = async (
  data: ICreateBrandSchemaType,
  productId: number,
  userToken: undefined | IToken,
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

export const getBrandsService = async (
  productId: number,
  userToken: undefined | IToken,
): Promise<{ brands: IBrand[] }> => {
  try {
    if (!userToken) throw new Error('Token de usuário não encontrado');
    if (!productId) throw new Error('ID do produto não pode ser indefinido');

    const response = await api.get(`/brands/product/${productId}`, {
      headers: getAuthHeaders(userToken),
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar a marca:', error);
    throw new Error(error instanceof Error ? error.message : 'Erro inesperado');
  }
};

export const deleteBrandService = async (
  brandId: number,
  userToken: undefined | IToken,
): Promise<void> => {
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
