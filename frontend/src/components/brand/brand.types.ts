import { IBrand } from '../../services/brands/brandServices.type';

export interface IBrandProps {
  setBrandList: React.Dispatch<React.SetStateAction<[] | IBrand[]>>;
  brand: IBrand;
}
