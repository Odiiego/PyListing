import axios from 'axios';
import { ICreateBrandSchemaType } from '../../components/product/product.type';
import { IToken } from '../auth/authService.type';
import { IBrand } from './brandServices.type';

export const createBrandService = async (
  data: ICreateBrandSchemaType,
  productId: undefined | number,
  userToken: undefined | IToken,
): Promise<IBrand> => {
  const response = await axios.post(
    `http://localhost:8000/brands/${productId}`,
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

export const deleteBrandService = async (
  brandId: number,
  userToken: undefined | IToken,
) => {
  const response = await axios.delete(
    `http://localhost:8000/brands/${brandId}`,
    {
      headers: {
        Authorization: `Bearer ${userToken?.access_token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  return response.data;
};
