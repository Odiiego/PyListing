import React from 'react';
import { getUserToken } from '../../services/auth/authService';
import { deleteProductService } from '../../services/products/productServices';
import { ICreateBrandSchemaType, ProductProps } from './product.type';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBrandSchema } from './product.schema';
import { createBrandService } from '../../services/brands/brandServices';
import { IBrand } from '../../services/brands/brandServices.type';

export const useProductModel = (props: ProductProps) => {
  const [product, setProduct] = React.useState(props.product);
  const [brandList, setBrandList] = React.useState<[] | IBrand[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ICreateBrandSchemaType>({
    resolver: zodResolver(createBrandSchema),
  });

  React.useEffect(() => {
    setBrandList(product.brands);
  }, [product.brands]);

  const deleteProduct = async (productId: number) => {
    deleteProductService(productId, getUserToken());
    props.setProductList((products) =>
      products.filter((product) => product.id != productId),
    );
  };

  const mutation = useMutation({
    mutationFn: async ({ data }: { data: ICreateBrandSchemaType }) =>
      createBrandService(data, product?.id, getUserToken()),
    onSuccess: (brand) => {
      console.log(brand);
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
    isSubmitting,
  };
};
