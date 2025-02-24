import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signUpSchema } from './signup.schema';
import { SignUpSchemaType } from './signup.type';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useSignUpModel = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: SignUpSchemaType) => {
      const response = await axios.post('http://localhost:8000/users/', data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', JSON.stringify(data));

      navigate('/');
    },
    onError: (error) => {
      console.error('Erro ao fazer cadastrar:', error);
    },
  });

  const onSubmit = (data: SignUpSchemaType) => {
    mutation.mutate(data);
  };

  return { register, handleSubmit, onSubmit, errors, isSubmitting };
};
