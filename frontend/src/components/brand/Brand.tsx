import { useBrandModel } from './brand.model';
import { IBrandProps } from './brand.types';
import BrandView from './brand.view';

export default function Brand(props: IBrandProps) {
  const brandModel = useBrandModel(props);

  return <BrandView {...brandModel} />;
}
