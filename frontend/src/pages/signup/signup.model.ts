import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signUpSchema } from './signup.schema';
import { ISignUpSchemaType } from './signup.type';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { login } from '../../services/auth/authService';

export const useSignUpModel = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ISignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ISignUpSchemaType) => {
      const response = await axios.post('http://localhost:8000/users/', data);
      return response.data;
    },
    onSuccess: (data) => {
      login(data);

      navigate('/');
    },
    onError: (error) => {
      console.error('Erro ao fazer cadastrar:', error);
    },
  });

  const onSubmit = (data: ISignUpSchemaType) => {
    mutation.mutate(data);
  };

  return { register, handleSubmit, onSubmit, errors, isSubmitting };
};
