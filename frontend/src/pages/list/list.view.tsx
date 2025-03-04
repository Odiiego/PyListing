import { useListModel } from './list.model';

type ListViewProps = ReturnType<typeof useListModel>;

export default function ListView(props: ListViewProps) {
  const { list } = props;

  if (!list) <p>carregando...</p>;
  else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-semibold text-center mb-4">
            {list.name}
          </h1>

          {list.products.length ? (
            <ul className="space-y-2">
              {list.products.map((product) => (
                <li
                  key={product.id}
                  className="p-2 border rounded text-gray-700"
                >
                  {product.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">Lista de produtos vazia</p>
          )}
        </div>
      </div>
    );
  }
}
