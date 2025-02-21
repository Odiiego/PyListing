import { useForm } from 'react-hook-form';
import { signInSchemaType } from './signin.type';
import { signInSchema } from './signin.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useSignInModel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: signInSchemaType) => {
      const response = await axios.post(
        'https://localhost:8000/auth/token',
        data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Usuário autenticado:', data);
      localStorage.setItem('token', data.token);
    },
    onError: (error) => {
      console.error('Erro ao fazer login:', error);
    },
  });

  const onSubmit = (data: signInSchemaType) => {
    mutation.mutate(data);
  };

  return { register, handleSubmit, onSubmit, errors, isSubmitting };
};
