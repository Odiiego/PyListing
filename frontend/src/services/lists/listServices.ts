import axios from 'axios';
import { ICreateListSchemaType } from '../../pages/home/home.type';
import { IToken } from '../auth/authService.type';
import { IShoppingList } from './listServices.type';

export const createListService = async (
  data: ICreateListSchemaType,
  userId: undefined | number,
  userToken: undefined | IToken,
): Promise<IShoppingList> => {
  const response = await axios.post(
    `http://localhost:8000/lists/${userId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${userToken?.access_token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  return response.data;
};

export const getListsService = async (
  userToken: undefined | IToken,
): Promise<IShoppingList[]> => {
  const response = await axios.get(`http://localhost:8000/lists`, {
    headers: {
      Authorization: `Bearer ${userToken?.access_token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.shopping_lists;
};

export const deleteListService = async (
  listId: number,
  userToken: undefined | IToken,
) => {
  const response = await axios.delete(`http://localhost:8000/lists/${listId}`, {
    headers: {
      Authorization: `Bearer ${userToken?.access_token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
