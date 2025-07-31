import { z } from 'zod';
import { IProduct } from '../../services/products/productServices.type';
import { createBrandSchema } from './product.schema';

export interface IProductProps {
  setProductList: React.Dispatch<React.SetStateAction<IProduct[]>>;
  activateProductForm: (productId: number | undefined) => void;
  checkProductFormStatus: (productId: number) => boolean;
  product: IProduct;
}

export type ICreateBrandSchemaType = z.infer<typeof createBrandSchema>;
