import React from 'react'
import { Box, Grid, TextField } from '@material-ui/core'
import { MuiTextFieldTypeProps } from './types'
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';

interface Props {
  zionForm: UseFormReturn<FieldValues>;
  schema: MuiTextFieldTypeProps;
}

const TextComponentMUI: React.FC<Props> = ({ zionForm, schema }) => {

  const { formState } = zionForm;

  return (
    <Grid item xs={12} {...schema?.grid}>
      <Box>
        <Controller
          {...schema}
          render={({ field }) => (
            <TextField
              // field={field}
              fullWidth
              {...schema}
              {...field}
              helperText={formState.errors[`${schema.name}`] ? formState.errors[`${schema.name}`].message : null}
              error={formState.errors[`${schema.name}`]}
            />
          )}
          rules={schema.rules}
          control={zionForm.control}
        />
      </Box>
    </Grid>
  )
}

export default TextComponentMUI