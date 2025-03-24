import Brand from '../brand/Brand';
import { useProductModel } from './product.model';

type ProductViewProps = ReturnType<typeof useProductModel>;

export default function ProductView(props: ProductViewProps) {
  const {
    product,
    brandList,
    handleKeyDown,
    deleteProduct,
    setBrandList,
    errors,
    register,
    handleSubmit,
    onSubmit,
    isSubmitting,
  } = props;
  return (
    <div className="p-2 border rounded text-gray-700">
      <p>
        <span className="m-2 mr-6">{product.quantity}</span>
        <span>{product.name}</span>
        <button
          onClick={async () => await deleteProduct(product.id)}
          className="text-red-500 ml-8 cursor-pointer hover:text-red-700"
        >
          Excluir
        </button>
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-96">
        <div className="flex mb-4 w-full">
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
              min="0.01"
              step="0.01"
              onKeyDown={handleKeyDown}
              className={`w-full p-2 border rounded ${
                errors.quantity ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="qtd"
            />
            {errors.quantity && (
              <p className="text-red-500 text-xs">{errors.quantity.message}</p>
            )}
          </div>

          <div className="flex-1">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Preço
            </label>
            <input
              id="price"
              {...register('price')}
              type="number"
              min="0.01"
              step="0.01"
              onKeyDown={handleKeyDown}
              className={`w-full p-2 border rounded ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="R$"
            />
            {errors.price && (
              <p className="text-red-500 text-xs">{errors.price.message}</p>
            )}
          </div>

          <div className="flex-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome da marca
            </label>
            <input
              id="name"
              {...register('name')}
              type="text"
              onKeyDown={handleKeyDown}
              className={`w-full p-2 border rounded ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="nome da marca"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="self-center ml-2 bg-blue-500 text-white p-2 h-11 rounded hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adicionando...' : 'Adicionar'}
        </button>
      </form>
      {brandList.length > 0 && (
        <ul className="space-y-2">
          {brandList.map((brand) => {
            return (
              <Brand key={brand.id} brand={brand} setBrandList={setBrandList} />
            );
          })}
        </ul>
      )}
    </div>
  );
}
