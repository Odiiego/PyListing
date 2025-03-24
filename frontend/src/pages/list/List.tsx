import { useListModel } from './list.model';
import ListView from './list.view';

export default function List() {
  const listModel = useListModel();

  return <ListView {...listModel} />;
}
