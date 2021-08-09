import React from 'react'
import { DesignSystem, ZionForm } from '../../types'
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { Button } from '@material-ui/core';
import FormElementMUI from './formElement/mui/FormElementMUI';

interface Props {
  form: ZionForm | undefined;
  formProps?: any;
  zionForm: UseFormReturn;
  onSubmit: (data: any) => void;
  submitElement?: (arg: any) => void;
  noSubmitButton?: boolean;
  designSystem?: DesignSystem;
}

export const Zion: React.FC<Props> = (
  {
    designSystem = "mui",
    form,
    zionForm,
    onSubmit,
    submitElement,
    formProps,
    noSubmitButton = false
  }) => {

  const renderForm = (form: ZionForm, designSystem: DesignSystem) => {
    switch (designSystem) {
      case "mui":
        return (
          <FormElementMUI form={form} zionForm={zionForm} designSystem={designSystem} />
        )
      default:
        return null
    }
  }

  return (
    <form {...formProps} onSubmit={zionForm.handleSubmit(onSubmit)}>
      {
        form ? renderForm(form, designSystem) : <div>Empty From</div>
      }
      <button hidden ref={(input) => submitElement && submitElement(input)}></button>

      {
        !noSubmitButton
          ? <Button type="submit" fullWidth style={{ padding: ".6rem" }}>
            Submit
          </Button>
          : null
      }
    </form >
  )
}