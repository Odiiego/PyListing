import { KeyboardEvent } from 'react';
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form';

export function useInputNavigation<T extends FieldValues>(
  handleSubmit: UseFormHandleSubmit<T>,
  onSubmit: (data: T) => void,
) {
  return (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const form = e.currentTarget.form;
      if (!form) return;

      const inputs = Array.from(form.elements).filter(
        (el) => el.tagName === 'INPUT',
      ) as HTMLInputElement[];

      const index = inputs.indexOf(e.currentTarget);
      const nextInput = inputs[index + 1];

      if (nextInput) {
        nextInput.focus();
      } else {
        inputs[0].focus();
        handleSubmit(onSubmit)();
      }
    }
  };
}
