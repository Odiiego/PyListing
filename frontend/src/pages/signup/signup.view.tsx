import { useSignUpModel } from './signup.model';

type SignUpViewProps = ReturnType<typeof useSignUpModel>;

export default function SignUpView(props: SignUpViewProps) {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } = props;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          Crie uma nova conta
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Seu e-mail
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

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
          {isSubmitting ? 'Criando...' : 'Criar'}
        </button>
      </form>
    </div>
  );
}
