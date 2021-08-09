import React from 'react';
import { useForm } from 'react-hook-form';
import { UseFormReturn, FieldValues, UseFormProps } from 'react-hook-form/dist/types';

export const useZion = <FieldValues, Context extends object = object>(
  props?: UseFormProps<FieldValues, Context>
): UseFormReturn => {
  const zionForm = useForm(props);

  return zionForm as UseFormReturn
}
