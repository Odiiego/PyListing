import { useParams } from 'react-router-dom';
import { getListService } from '../../services/lists/listServices';
import { getUserToken } from '../../services/auth/authServices';
import React from 'react';
import { IShoppingList } from '../../services/lists/listServices.type';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ICreateProductSchemaType } from './list.type';
import { createProductSchema } from './list.schema';
import { useMutation } from '@tanstack/react-query';
import { createProductService } from '../../services/products/productServices';
import { IProduct } from '../../services/products/productServices.type';
import { AxiosError } from 'axios';
import { useInputNavigation } from '../../hooks/useInputNavigation';

export const useListModel = () => {
  const { id } = useParams();
  const token = getUserToken();

  const [list, setList] = React.useState<undefined | IShoppingList>();
  const [productList, setProductList] = React.useState<IProduct[]>(
    list?.products || [],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateProductSchemaType>({
    resolver: zodResolver(createProductSchema),
  });

  React.useEffect(() => {
    const fetchList = async () => {
      try {
        const list = await getListService(Number(id), token);
        setList(list);
        setProductList(list.products);
      } catch (error) {
        console.error('Erro ao buscar lista:', error);
      }
    };
    fetchList();
  }, [id, token]);

  const mutation = useMutation({
    mutationFn: async ({ data }: { data: ICreateProductSchemaType }) =>
      createProductService(data, list?.id, token),
    onSuccess: (product) => {
      setProductList((products) => [...products, product]);
      reset();
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.error(
        'Erro ao cadastrar produto:',
        error.response?.data?.message || error.message,
      );
    },
  });

  const onSubmit = (data: ICreateProductSchemaType) =>
    mutation.mutate({ data });

  const handleKeyDown = useInputNavigation(handleSubmit, onSubmit);

  return {
    list,
    productList,
    handleKeyDown,
    errors,
    register,
    handleSubmit,
    onSubmit,
    isSubmitting: mutation.isPending,
    setProductList,
  };
};
