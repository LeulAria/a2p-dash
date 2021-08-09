import React from 'react'
import { DesignSystem, Schema } from '../../types';
import { MuiRadioGroupComponentTypeProps } from '../mui/types';
import RadioGroupComponentMUI from '../mui/RadioGroupComponentMUI';
import { UseFormReturn, FieldValues } from 'react-hook-form';

interface Props {
  schema: Schema;
  zionForm: UseFormReturn<FieldValues>
  designSystem: DesignSystem;
}

const RadioWidgets: React.FC<Props> = ({ schema, designSystem, zionForm }) => {

  const renderSelectWidget = (schema: Schema, zionForm: UseFormReturn<FieldValues>, designSystem: DesignSystem) => {
    switch (designSystem.toLocaleLowerCase()) {
      case "mui":
        return <RadioGroupComponentMUI zionForm={zionForm} schema={schema as MuiRadioGroupComponentTypeProps} />
      default:
        return null;
    }
  }

  return renderSelectWidget(schema, zionForm, designSystem)
}

export default RadioWidgets
