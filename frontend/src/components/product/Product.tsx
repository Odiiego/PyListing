import { useProductModel } from './product.model';
import { IProductProps } from './product.type';
import ProductView from './product.view';

export default function Product(props: IProductProps) {
  const methods = useProductModel(props);

  return <ProductView {...methods} />;
}
