import axios from 'axios';
import { ICreateProductSchemaType } from '../../pages/list/list.type';
import { IProduct } from './productServices.type';
import { IToken } from '../auth/authService.type';

export const createProductService = async (
  data: ICreateProductSchemaType,
  listId: undefined | number,
  userToken: undefined | IToken,
): Promise<IProduct> => {
  const response = await axios.post(
    `http://localhost:8000/products/${listId}`,
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
