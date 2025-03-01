import React from 'react';
import {
  getUserId,
  getUserToken,
  isTokenValid,
} from '../../services/auth/authService';
import { useForm } from 'react-hook-form';
import { ICreateListSchemaType } from './home.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { createListSchema } from './home.schemas';
import { useMutation } from '@tanstack/react-query';
import { token } from '../../services/auth/authService.type';
import { createListService } from '../../services/lists/listServices';

export function useHomeModel() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(isTokenValid());
  const [userId, setUserId] = React.useState<undefined | number>(undefined);
  const [userToken, setUserToken] = React.useState<undefined | token>(
    undefined,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ICreateListSchemaType>({
    resolver: zodResolver(createListSchema),
  });

  React.useEffect(() => {
    setIsLoggedIn(isTokenValid());
    setUserId(getUserId());
    setUserToken(getUserToken());
  }, []);

  const mutation = useMutation({
    mutationFn: async ({ data }: { data: ICreateListSchemaType }) =>
      createListService(data, userId, userToken),
    onSuccess: () => {
      reset();
    },
    onError: (error) => {
      console.error('Erro ao cadastrar lista:', error);
    },
  });

  const onSubmit = (data: ICreateListSchemaType) => {
    mutation.mutate({ data });
  };

  return {
    isLoggedIn,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
}
