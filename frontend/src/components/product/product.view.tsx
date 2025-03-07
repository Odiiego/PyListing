import { useProductModel } from './product.model';

type ProductViewProps = ReturnType<typeof useProductModel>;

export default function ProductView(props: ProductViewProps) {
  const { product, deleteProduct } = props;
  return (
    <div>
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
    </div>
  );
}
