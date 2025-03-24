import React from 'react';
import { getUserToken } from '../../services/auth/authServices';
import { deleteProductService } from '../../services/products/productServices';
import { ICreateBrandSchemaType, IProductProps } from './product.type';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBrandSchema } from './product.schema';
import { createBrandService } from '../../services/brands/brandServices';
import { IBrand } from '../../services/brands/brandServices.type';

export const useProductModel = (props: IProductProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [product, setProduct] = React.useState(props.product);
  const [brandList, setBrandList] = React.useState<IBrand[]>(
    product.brands || [],
  );
  const token = getUserToken();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateBrandSchemaType>({
    resolver: zodResolver(createBrandSchema),
  });

  const deleteProduct = async (productId: number) => {
    try {
      await deleteProductService(productId, token);
      props.setProductList((products) =>
        products.filter((product) => product.id !== productId),
      );
    } catch (error) {
      console.error('Erro ao excluir o produto:', error);
    }
  };

  const mutation = useMutation({
    mutationFn: async ({ data }: { data: ICreateBrandSchemaType }) =>
      createBrandService(data, product?.id, token),
    onSuccess: (brand) => {
      setBrandList((brands) => [...brands, brand]);
      reset();
    },
    onError: (error) => {
      console.error('Erro ao cadastrar lista:', error);
    },
  });

  const onSubmit = (data: ICreateBrandSchemaType) => {
    mutation.mutate({ data });
  };

  return {
    deleteProduct,
    brandList,
    setBrandList,
    product,
    errors,
    register,
    handleSubmit,
    onSubmit,
    isSubmitting: mutation.isPending,
  };
};
