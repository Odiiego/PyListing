import { ICreateListSchemaType } from '../../pages/home/home.type';
import { IToken } from '../auth/authServices.type';
import { IShoppingList } from './listServices.type';
import api from '../utils/apiUtils';
import { getAuthHeaders } from '../auth/authServices';

export const createListService = async (
  data: ICreateListSchemaType,
  userId: undefined | number,
  userToken: undefined | IToken,
): Promise<IShoppingList> => {
  try {
    if (!userToken) throw new Error('Token de usuário não encontrado');
    if (!userId) throw new Error('ID de usuário não pode ser indefinido');

    const response = await api.post(`/lists/${userId}`, data, {
      headers: getAuthHeaders(userToken),
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao criar lista:', error);
    throw new Error(error instanceof Error ? error.message : 'Erro inesperado');
  }
};

export const getListsService = async (
  userToken: undefined | IToken,
): Promise<IShoppingList[]> => {
  try {
    if (!userToken) throw new Error('Token de usuário não encontrado');

    const response = await api.get(`/lists`, {
      headers: getAuthHeaders(userToken),
    });

    return response.data.shopping_lists;
  } catch (error) {
    console.error('Erro ao buscar listas:', error);
    throw new Error(error instanceof Error ? error.message : 'Erro inesperado');
  }
};

export const deleteListService = async (
  listId: number,
  userToken: undefined | IToken,
): Promise<void> => {
  try {
    if (!userToken) throw new Error('Token de usuário não encontrado');

    const response = await api.delete(`/lists/${listId}`, {
      headers: getAuthHeaders(userToken),
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao excluir lista:', error);
    throw new Error(error instanceof Error ? error.message : 'Erro inesperado');
  }
};

export const getListService = async (
  listId: number,
  userToken: undefined | IToken,
): Promise<IShoppingList> => {
  try {
    if (!userToken) throw new Error('Token de usuário não encontrado');

    const response = await api.get(`/lists/${listId}`, {
      headers: getAuthHeaders(userToken),
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar lista:', error);
    throw new Error(error instanceof Error ? error.message : 'Erro inesperado');
  }
};
