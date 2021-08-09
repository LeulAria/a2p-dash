import React from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { DesignSystem, Schema } from '../../types';
import { MuiAutocompleteComponentTypeProps } from '../mui/types';
import CheckComponentMUI from '../mui/CheckComponentMUI';

interface Props {
  schema: Schema;
  zionForm: UseFormReturn<FieldValues>;
  designSystem: DesignSystem;
}

const CheckWidgets: React.FC<Props> = ({ schema, zionForm, designSystem }) => {

  const renderSelectWidget = (schema: Schema, zionForm: UseFormReturn<FieldValues>, designSystem: DesignSystem) => {
    switch (designSystem.toLocaleLowerCase()) {
      case "mui":
        return <CheckComponentMUI zionForm={zionForm} schema={schema as MuiAutocompleteComponentTypeProps} />
      default:
        return null;
    }
  }

  return renderSelectWidget(schema, zionForm, designSystem)
}

export default CheckWidgets
