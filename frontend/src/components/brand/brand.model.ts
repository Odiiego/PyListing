import React from 'react';
import { IBrandProps } from './brand.types';
import { getUserToken } from '../../services/auth/authService';
import { deleteBrandService } from '../../services/brands/brandServices';

export const useBrandModel = (props: IBrandProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [brand, setBrand] = React.useState(props.brand);

  const deleteBrand = async (brandId: number) => {
    deleteBrandService(brandId, getUserToken());
    props.setBrandList((brands) =>
      brands.filter((brand) => brand.id != brandId),
    );
  };

  return { brand, deleteBrand };
};
