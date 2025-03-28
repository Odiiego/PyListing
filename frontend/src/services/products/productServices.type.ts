import { IBrand } from '../brands/brandServices.type';

export interface IProduct {
  id: number;
  list_id: number;
  name: string;
  quantity: number;
  brands: IBrand[];
  best_price: string;
  best_offer: string;
  created_at: string;
  updated_at: string;
}
