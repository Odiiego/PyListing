import Product from '../../components/product/Product';
import { useListModel } from './list.model';

type ListViewProps = ReturnType<typeof useListModel>;

export default function ListView(props: ListViewProps) {
  const {
    list,
    productList,
    setProductList,
    errors,
    register,
    handleSubmit,
    onSubmit,
    isSubmitting,
  } = props;

  if (!list) {
    return <p className="text-center text-gray-700">Carregando...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-4">{list.name}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex p-6 w-96">
          <div className="flex mb-4 space-x-4 w-full">
            <div className="flex-1">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantidade
              </label>
              <input
                id="quantity"
                {...register('quantity')}
                type="number"
                className={`w-full p-2 border rounded ${
                  errors.quantity ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="qtd"
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div className="flex-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome do produto
              </label>
              <input
                id="name"
                {...register('name')}
                type="text"
                className={`w-full p-2 border rounded ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="nome do produto"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="self-center ml-4 bg-blue-500 text-white p-2 h-11 rounded hover:bg-blue-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adicionando...' : 'Adicionar'}
          </button>
        </form>

        {productList.length ? (
          <ul className="space-y-2">
            {productList
              .sort((prodA, prodB) => prodA.id - prodB.id)
              .map((product) => (
                <Product
                  key={product.id}
                  setProductList={setProductList}
                  product={product}
                />
              ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">Lista de produtos vazia</p>
        )}
      </div>
    </div>
  );
}
