import axios from 'axios';
import { ICreateListSchemaType } from '../../pages/home/home.type';
import { token } from '../auth/authService.type';

export const createListService = async (
  data: ICreateListSchemaType,
  userId: undefined | number,
  userToken: undefined | token,
) => {
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
