import React from 'react';
import {
  getUserId,
  getUserToken,
  isTokenValid,
} from '../../services/auth/authService';
import { useForm } from 'react-hook-form';
import { ICreateListSchemaType } from './home.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { createListSchema } from './home.schemas';
import { useMutation } from '@tanstack/react-query';
import { IToken } from '../../services/auth/authService.type';
import {
  createListService,
  deleteListService,
  getListsService,
} from '../../services/lists/listServices';
import { IShoppingList } from '../../services/lists/listServices.type';

export function useHomeModel() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(isTokenValid());
  const [userId, setUserId] = React.useState<undefined | number>(undefined);
  const [userToken, setUserToken] = React.useState<undefined | IToken>(
    undefined,
  );
  const [userShoppingLists, setUserShoppingLists] = React.useState<
    [] | IShoppingList[]
  >([]);

  const deleteList = async (listId: number) => {
    deleteListService(listId, userToken);
    setUserShoppingLists((lists) => lists.filter((list) => list.id != listId));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ICreateListSchemaType>({
    resolver: zodResolver(createListSchema),
  });

  React.useEffect(() => {
    setIsLoggedIn(isTokenValid());
    setUserId(getUserId());
    setUserToken(getUserToken());
  }, []);

  React.useEffect(() => {
    const fetchLists = async () => {
      if (userToken) {
        try {
          const lists = await getListsService(userToken);
          setUserShoppingLists(lists);
        } catch (error) {
          console.error('Erro ao buscar listas:', error);
        }
      }
    };
    fetchLists();
  }, [userToken]);

  const mutation = useMutation({
    mutationFn: async ({ data }: { data: ICreateListSchemaType }) =>
      createListService(data, userId, userToken),
    onSuccess: (list) => {
      setUserShoppingLists((lists) => [...lists, list]);
      reset();
    },
    onError: (error) => {
      console.error('Erro ao cadastrar lista:', error);
    },
  });

  const onSubmit = (data: ICreateListSchemaType) => {
    mutation.mutate({ data });
  };

  return {
    deleteList,
    isLoggedIn,
    userShoppingLists,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
}
