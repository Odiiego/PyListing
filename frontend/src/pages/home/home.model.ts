import React from 'react';
import {
  getUserId,
  getUserToken,
  isTokenValid,
  logout,
} from '../../services/auth/authServices';
import { useForm } from 'react-hook-form';
import { ICreateListSchemaType } from './home.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { createListSchema } from './home.schemas';
import { useMutation } from '@tanstack/react-query';
import { IToken } from '../../services/auth/authServices.type';
import {
  createListService,
  deleteListService,
  getListsService,
} from '../../services/lists/listServices';
import { IShoppingList } from '../../services/lists/listServices.type';
import { useNavigate } from 'react-router-dom';

export function useHomeModel() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(isTokenValid());
  const [userId, setUserId] = React.useState<undefined | number>(undefined);
  const [userToken, setUserToken] = React.useState<undefined | IToken>(
    undefined,
  );
  const [userShoppingLists, setUserShoppingLists] = React.useState<
    [] | IShoppingList[]
  >([]);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate('/auth/signin');
  };

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth/signin');
    }
  }, [isLoggedIn, navigate]);

  const deleteList = async (listId: number) => {
    deleteListService(listId, userToken);
    setUserShoppingLists((lists) => lists.filter((list) => list.id != listId));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    handleLogout,
    userShoppingLists,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting: mutation.isPending,
  };
}
