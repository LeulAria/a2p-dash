import React from 'react'
import { DesignSystem, Schema } from '../../types';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import SliderComponentMUI from '../mui/SliderComponentMUI';

interface Props {
  schema: Schema;
  zionForm: UseFormReturn<FieldValues>
  designSystem: DesignSystem;
}

const SliderWidgets: React.FC<Props> = ({ schema, designSystem, zionForm }) => {

  const renderSelectWidget = (schema: Schema, zionForm: UseFormReturn<FieldValues>, designSystem: DesignSystem) => {
    switch (designSystem.toLocaleLowerCase()) {
      case "mui":
        return <SliderComponentMUI zionForm={zionForm} schema={schema as any} />
      default:
        return null;
    }
  }

  return renderSelectWidget(schema, zionForm, designSystem)
}

export default SliderWidgets
