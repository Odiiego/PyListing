import { useForm } from 'react-hook-form';
import { ISignInSchemaType } from './signin.type';
import { signInSchema } from './signin.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth/authServices';
import { getUserService } from '../../services/users/userServices';
import { AxiosError } from 'axios';

export const useSignInModel = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const mutation = useMutation({
    mutationFn: getUserService,
    onSuccess: (data) => {
      login(data);
      navigate('/');
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.error(
        'Erro ao fazer login:',
        error.response?.data?.message || error.message,
      );
    },
  });

  const onSubmit = (data: ISignInSchemaType) => {
    mutation.mutate(data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting: mutation.isPending,
  };
};
