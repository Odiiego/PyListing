import {
  ClipboardCheck,
  ClipboardList,
  ClipboardPenLine,
  ClipboardX,
} from 'lucide-react';
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
    activateProductForm,
    checkProductFormStatus,
  } = props;

  return (
    <div className="px-2">
      {checkProductFormStatus(product.id) ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex space-x-[2px] w-full"
        >
          <label className="text-sm font-medium text-gray-700 flex flex-col items-center flex-2">
            <span className="mb-[-0.55rem] z-10 px-1 bg-white">Quant.</span>

            <input
              {...register('quantity')}
              type="number"
              min="0.01"
              step="0.01"
              onKeyDown={handleKeyDown}
              className={`w-full p-2 no-spinner border rounded placeholder:text-center ${
                errors.quantity ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1 un"
            />
          </label>

          <label className="text-sm font-medium text-gray-700 flex flex-col items-center flex-3">
            <span className="mb-[-0.55rem] z-10 px-1 bg-white">R$</span>

            <input
              {...register('price')}
              type="number"
              min="0.01"
              step="0.01"
              onKeyDown={handleKeyDown}
              className={`w-full p-2 no-spinner border rounded placeholder:text-center ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="R$ 10,00"
            />
          </label>

          <label className="text-sm font-medium text-gray-700 flex flex-col items-center flex-5">
            <span className="mb-[-0.55rem] z-10 px-1 bg-white">Nome</span>

            <input
              {...register('name')}
              type="text"
              onKeyDown={handleKeyDown}
              className={`w-full p-2 border rounded placeholder:text-center ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Marca Y"
            />
          </label>

          <button
            type="submit"
            className="flex justify-center items-center self-end justify-self-center cursor-pointer h-[38px]"
            disabled={isSubmitting}
          >
            <ClipboardCheck strokeWidth={1.25} size={26} />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              activateProductForm(undefined);
            }}
            className="flex justify-center items-center self-end justify-self-center cursor-pointer h-[38px]"
          >
            <ClipboardList strokeWidth={1.25} size={26} />
          </button>
        </form>
      ) : (
        <p className="flex items-center w-full space-x-[2px] text-lg  h-[49.2px]">
          <span className="flex-1 font-semibold text-center relative before:content-['Quant:'] before:absolute before:left-0 before:top-[-.75rem] before:opacity-15 before:gray before:font-bold">
            {Number(product.quantity)} un
          </span>
          <span className="flex-2 font-semibold text-center relative before:content-['Produto:'] before:absolute before:left-0 before:top-[-.75rem] before:opacity-15 before:gray before:font-bold">
            {product.name}
          </span>

          <button
            onClick={async () => await deleteProduct(product.id)}
            className="flex justify-center items-center self-end justify-self-center cursor-pointer h-[38px]"
          >
            <ClipboardX strokeWidth={1.25} size={26} />
          </button>

          <button
            onClick={() => activateProductForm(product.id)}
            className="flex justify-center items-center self-end justify-self-center cursor-pointer h-[38px]"
          >
            <ClipboardPenLine strokeWidth={1.25} size={26} />
          </button>
        </p>
      )}

      {brandList.length > 0 && (
        <ul className="mt-1">
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
