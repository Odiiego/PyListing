import { ClipboardCopy, ClipboardPaste, ClipboardX } from 'lucide-react';
import { useBrandModel } from './brand.model';

type BrandViewProps = ReturnType<typeof useBrandModel>;

export default function BrandView(props: BrandViewProps) {
  const { brand, deleteBrand, info, toggleInfo } = props;

  const handleDelete = async () => {
    try {
      await deleteBrand(brand.id);
    } catch (error) {
      console.error('Erro ao excluir marca:', error);
    }
  };

  return (
    <div>
      <p className="flex flex-col text-sm">
        <span className="flex items-center w-full space-x-[2px]">
          {info ? (
            <>
              <span className="flex-3 font-semibold text-center relative before:content-['R$/Quant:'] before:absolute before:left-0 before:top-[-.75rem] before:opacity-15 before:gray before:font-bold">
                R$ {brand.predicted_cost}
              </span>
              <span className="flex-3 font-semibold text-center relative before:content-['R$/un:'] before:absolute before:left-0 before:top-[-.75rem] before:opacity-15 before:gray before:font-bold">
                R$ {brand.unity_cost}/un
              </span>
            </>
          ) : (
            <>
              <span className="flex-3 font-semibold text-center relative before:content-['Quant:'] before:absolute before:left-0 before:top-[-.75rem] before:opacity-15 before:gray before:font-bold">
                {Number(brand.quantity)} un
              </span>
              <span className="flex-3 font-semibold text-center relative before:content-['Preço:'] before:absolute before:left-0 before:top-[-.75rem] before:opacity-15 before:gray before:font-bold">
                R$ {brand.price}
              </span>
            </>
          )}
          <span className="flex-4 font-semibold text-center relative before:content-['Marca:'] before:absolute before:left-0 before:top-[-.75rem] before:opacity-15 before:gray before:font-bold">
            {brand.name}
          </span>
          <button
            onClick={handleDelete}
            className="flex justify-center items-center self-end justify-self-center cursor-pointer h-[38px]"
          >
            <ClipboardX strokeWidth={1.25} size={24} />
          </button>
          <button
            onClick={toggleInfo}
            className="flex justify-center items-center self-end justify-self-center cursor-pointer h-[38px]"
          >
            {info ? (
              <ClipboardPaste strokeWidth={1.25} size={24} />
            ) : (
              <ClipboardCopy strokeWidth={1.25} size={24} />
            )}
          </button>
        </span>
      </p>
    </div>
  );
}
