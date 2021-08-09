import { Grid } from '@material-ui/core';
import React from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { DesignSystem, Schema } from '../../types';

interface Props {
  schema: Schema;
  zionForm: UseFormReturn<FieldValues>;
  designSystem: DesignSystem;
}

const CustomWidgets: React.FC<Props> = ({ schema, zionForm, designSystem }) => {
  const renderSelectWidget = (schema: Schema, zionForm: UseFormReturn<FieldValues>, designSystem: DesignSystem) => {
    switch (designSystem.toLocaleLowerCase()) {
      case "mui":
        return (
          <Grid item {...schema?.grid}>
            {schema?.component ? schema?.component(zionForm, designSystem) : null}
          </Grid>
        )
      default:
        return null;
    }
  }

  return renderSelectWidget(schema, zionForm, designSystem)
}

export default CustomWidgets
