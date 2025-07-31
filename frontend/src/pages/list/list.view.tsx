import { ClipboardPenLine, ClipboardPlus } from 'lucide-react';
import Product from '../../components/product/Product';
import { useListModel } from './list.model';

type ListViewProps = ReturnType<typeof useListModel>;

export default function ListView(props: ListViewProps) {
  const {
    list,
    productList,
    handleKeyDown,
    setProductList,
    errors,
    register,
    handleSubmit,
    onSubmit,
    isSubmitting,
    activateProductForm,
    checkProductFormStatus,
  } = props;

  if (!list) {
    return <p className="text-center text-gray-700">Carregando...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white w-116 p-6 shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-4">{list.name}</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex mb-4 space-x-1 w-full"
        >
          <label className="text-sm font-medium text-gray-700 flex flex-col items-center flex-1">
            <span className="mb-[-0.55rem] z-10 px-1 bg-white">Quant.</span>
            <input
              {...register('quantity')}
              type="number"
              min="0.01"
              step="0.01"
              onKeyDown={handleKeyDown}
              className={`w-full p-2 border rounded no-spinner placeholder:text-center ${
                errors.quantity ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1 un"
            />
          </label>

          <label className="text-sm font-medium text-gray-700 flex flex-col items-center flex-2">
            <span className="mb-[-0.55rem] z-10 px-1 bg-white">Nome</span>
            <input
              id="name"
              {...register('name')}
              type="text"
              onKeyDown={handleKeyDown}
              className={`w-full p-2 border rounded placeholder:text-center ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Produto X"
            />
          </label>

          <button
            type="submit"
            className="flex justify-center items-center self-end justify-self-center cursor-pointer h-[38px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ClipboardPenLine strokeWidth={1.25} size={32} />
            ) : (
              <ClipboardPlus strokeWidth={1.25} size={32} />
            )}
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
                  activateProductForm={activateProductForm}
                  checkProductFormStatus={checkProductFormStatus}
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
