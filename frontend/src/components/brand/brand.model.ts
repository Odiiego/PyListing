import React from 'react';
import { IBrandProps } from './brand.types';
import { getUserToken } from '../../services/auth/authServices';
import { deleteBrandService } from '../../services/brands/brandServices';

export const useBrandModel = (props: IBrandProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [brand, setBrand] = React.useState(props.brand);

  const deleteBrand = async (brandId: number) => {
    try {
      await deleteBrandService(brandId, getUserToken());
      props.setBrandList((brands) =>
        brands.filter((brand) => brand.id !== brandId),
      );
    } catch (error) {
      console.error('Erro ao excluir a marca:', error);
    }
  };

  return { brand, deleteBrand };
};
