import React from 'react'
import { DesignSystem, Schema } from '../../types';
import { MuiSelectComponentTypeProps } from '../mui/types';
import SelectComponentMUI from '../mui/SelectComponentMUI';
import { UseFormReturn, FieldValues } from 'react-hook-form';

interface Props {
  schema: Schema;
  zionForm: UseFormReturn<FieldValues>
  designSystem: DesignSystem;
}

const SelectWidgets: React.FC<Props> = ({ schema, designSystem, zionForm }) => {

  const renderSelectWidget = (schema: Schema, zionForm: UseFormReturn<FieldValues>, designSystem: DesignSystem) => {
    switch (designSystem.toLocaleLowerCase()) {
      case "mui":
        return <SelectComponentMUI zionForm={zionForm} schema={schema as MuiSelectComponentTypeProps} />
      default:
        return null;
    }
  }

  return renderSelectWidget(schema, zionForm, designSystem)
}

export default SelectWidgets
