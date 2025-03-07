import { IProduct } from '../../services/products/productServices.type';

export interface ProductProps {
  setProductList: React.Dispatch<React.SetStateAction<[] | IProduct[]>>;
  product: IProduct;
}
