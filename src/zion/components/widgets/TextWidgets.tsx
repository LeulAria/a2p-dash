import React from 'react'
import { DesignSystem, Schema } from '../../types'
import { MuiTextFieldTypeProps } from '../mui/types'
import TextComponentMUI from '../mui/TextComponentMUI'
import { FieldValues, UseFormReturn } from 'react-hook-form';

interface Props {
  schema: Schema;
  zionForm: UseFormReturn<FieldValues>;
  designSystem: DesignSystem;
}

const TextWidgets: React.FC<Props> = ({
  schema,
  zionForm,
  designSystem
}) => {

  const renderTextWidget = (schema: Schema, zionForm: UseFormReturn<FieldValues>, designSystem: DesignSystem) => {
    switch (designSystem.toLocaleLowerCase()) {
      case "mui":
        return <TextComponentMUI zionForm={zionForm} schema={schema as MuiTextFieldTypeProps} />
      default:
        return null;
    }
  }

  return renderTextWidget(schema, zionForm, designSystem)
}

export default TextWidgets