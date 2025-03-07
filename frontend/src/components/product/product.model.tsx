import React from 'react';
import { getUserToken } from '../../services/auth/authService';
import { deleteProductService } from '../../services/products/productServices';
import { ProductProps } from './product.type';

export const useProductModel = (props: ProductProps) => {
  const [product, setProduct] = React.useState(props.product);

  const deleteProduct = async (productId: number) => {
    deleteProductService(productId, getUserToken());
    props.setProductList((products) =>
      products.filter((product) => product.id != productId),
    );
  };

  return { deleteProduct, product };
};
