import React from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { DesignSystem, Schema } from '../../types';
import { MuiAutocompleteComponentTypeProps } from '../mui/types';
import SwitchComponentMUI from '../mui/SwitchComponentMUI';

interface Props {
  schema: Schema;
  zionForm: UseFormReturn<FieldValues>;
  designSystem: DesignSystem;
}

const SwitchWidgets: React.FC<Props> = ({ schema, zionForm, designSystem }) => {

  const renderSelectWidget = (schema: Schema, zionForm: UseFormReturn<FieldValues>, designSystem: DesignSystem) => {
    switch (designSystem.toLocaleLowerCase()) {
      case "mui":
        return <SwitchComponentMUI zionForm={zionForm} schema={schema as MuiAutocompleteComponentTypeProps} />
      default:
        return null;
    }
  }

  return renderSelectWidget(schema, zionForm, designSystem)
}

export default SwitchWidgets
