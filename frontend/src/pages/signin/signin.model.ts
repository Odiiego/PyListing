import { useForm } from 'react-hook-form';
import { signInSchemaType } from './signin.type';
import { signInSchema } from './signin.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from '../../services/authService';

export const useSignInModel = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: signInSchemaType) => {
      const formData = new URLSearchParams({
        username: data.username,
        password: data.password,
      });
      const response = await axios.post(
        'http://localhost:8000/auth/token',
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return response.data;
    },
    onSuccess: (data) => {
      login(data);

      navigate('/');
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
