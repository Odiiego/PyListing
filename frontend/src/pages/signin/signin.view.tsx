import { useSignInModel } from './signin.model';

type SignInViewProps = ReturnType<typeof useSignInModel>;

export default function SignInView(props: SignInViewProps) {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } = props;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nome de Usuário
          </label>
          <input
            {...register('username')}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <input
            {...register('password')}
            type="password"
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
        <p className="mt-4 text-center">
          Ainda não é cadastrado?
          <a className="ml-1 text-blue-500" href="/auth/signup">
            Cadastre-se
          </a>
        </p>
      </form>
    </div>
  );
}
