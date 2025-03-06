import { useParams } from 'react-router-dom';
import { getListService } from '../../services/lists/listServices';
import { getUserToken } from '../../services/auth/authService';
import React from 'react';
import { IShoppingList } from '../../services/lists/listServices.type';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ICreateProductSchemaType } from './list.type';
import { createProductSchema } from './list.schema';
import { useMutation } from '@tanstack/react-query';
import { createProductService } from '../../services/products/productServices';

export const useListModel = () => {
  const [list, setList] = React.useState<undefined | IShoppingList>();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ICreateProductSchemaType>({
    resolver: zodResolver(createProductSchema),
  });

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

  const mutation = useMutation({
    mutationFn: async ({ data }: { data: ICreateProductSchemaType }) =>
      createProductService(data, list?.id, getUserToken()),
    onSuccess: () => {
      // setUserShoppingLists((lists) => [...lists, list]);
      reset();
    },
    onError: (error) => {
      console.error('Erro ao cadastrar lista:', error);
    },
  });

  const onSubmit = (data: ICreateProductSchemaType) => {
    mutation.mutate({ data });
  };

  return { list, errors, register, handleSubmit, onSubmit, isSubmitting };
};
