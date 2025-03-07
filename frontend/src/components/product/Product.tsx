import { useProductModel } from './product.model';
import { ProductProps } from './product.type';
import ProductView from './product.view';

export default function Product(props: ProductProps) {
  const methods = useProductModel(props);

  return <ProductView {...methods} />;
}
