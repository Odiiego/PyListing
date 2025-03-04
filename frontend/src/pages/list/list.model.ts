import { useParams } from 'react-router-dom';
import { getListService } from '../../services/lists/listServices';
import { getUserToken } from '../../services/auth/authService';
import React from 'react';
import { IShoppingList } from '../../services/lists/listServices.type';

export const useListModel = () => {
  const [list, setList] = React.useState<undefined | IShoppingList>();
  const { id } = useParams();

  React.useEffect(() => {
    const fetchList = async () => {
      try {
        const list = await getListService(Number(id), getUserToken());
        setList(list);
      } catch (error) {
        console.error('Erro ao buscar listas:', error);
      }
    };
    fetchList();
  }, [id]);

  return { list };
};
