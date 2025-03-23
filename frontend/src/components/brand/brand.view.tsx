import { useBrandModel } from './brand.model';

type BrandViewProps = ReturnType<typeof useBrandModel>;

export default function BrandView(props: BrandViewProps) {
  const { brand, deleteBrand } = props;
  const handleDelete = async () => {
    try {
      await deleteBrand(brand.id);
    } catch (error) {
      console.error('Erro ao excluir marca:', error);
    }
  };

  return (
    <div>
      <p>
        <span className="m-2">{brand.quantity}</span>
        <span className="m-2">{brand.price}</span>
        <span className="m-2">{brand.name}</span>
        <span className="m-2">{brand.predicted_cost}</span>
        <span className="m-2">{brand.unity_cost}</span>
        <button
          onClick={handleDelete}
          className="text-red-500 ml-8 cursor-pointer hover:text-red-700"
          aria-label={`Excluir marca ${brand.name}`}
        >
          Excluir
        </button>
      </p>
    </div>
  );
}
