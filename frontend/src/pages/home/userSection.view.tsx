import { Link } from 'react-router-dom';
import { useHomeModel } from './home.model';

type UserSectionViewProps = Omit<ReturnType<typeof useHomeModel>, 'isLoggedIn'>;

export default function UserSectionView(props: UserSectionViewProps) {
  const {
    deleteList,
    userShoppingLists,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  } = props;

  return (
    <div className="flex py-8 flex-col items-center justify-center min-h-screen bg-gray-100">
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
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 w-96">
          Minhas Listas
        </h2>
        <ul className="mt-4 space-y-4">
          {userShoppingLists.length === 0 ? (
            <li className="text-gray-500">Nenhuma lista criada ainda.</li>
          ) : (
            userShoppingLists.map((list, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
              >
                <Link
                  to={`/list/${list.id}`}
                  className="text-lg font-medium text-blue-500 hover:text-blue-700"
                >
                  {list.name}
                </Link>
                <button
                  onClick={async () => await deleteList(list.id)}
                  className="text-red-500 cursor-pointer hover:text-red-700"
                >
                  Excluir
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
