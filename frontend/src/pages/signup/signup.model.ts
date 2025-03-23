import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { signUpSchema } from './signup.schema';
import { ISignUpSchemaType } from './signup.type';
import { login } from '../../services/auth/authServices';
import { createUserService } from '../../services/users/userServices';

export const useSignUpModel = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const mutation = useMutation({
    mutationFn: createUserService,
    onSuccess: (data) => {
      login(data);
      navigate('/');
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.error(
        'Erro ao cadastrar:',
        error.response?.data?.message || error.message,
      );
    },
  });

  const onSubmit = (data: ISignUpSchemaType) => mutation.mutate(data);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting: mutation.isPending,
  };
};
