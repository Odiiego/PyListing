import { IProduct } from '../products/products.type';

export interface IShoppingList {
  id: number;
  user_id: number;
  name: string;
  products: IProduct[];
  created_at: string;
  updated_at: string;
}
