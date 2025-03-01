import { useHomeModel } from './home.model';

type UserSectionViewProps = Omit<ReturnType<typeof useHomeModel>, 'isLoggedIn'>;

export default function UserSectionView(props: UserSectionViewProps) {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } = props;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nome da Lista
          </label>
          <input
            {...register('name')}
            type="name"
            className="w-full p-2 border rounded"
            placeholder="lista de compras"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Criando...' : 'Criar'}
        </button>
      </form>
    </div>
  );
}
