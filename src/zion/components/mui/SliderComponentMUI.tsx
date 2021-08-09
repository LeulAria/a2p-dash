import React from 'react'
import { Slider, Grid, FormControl, FormControlLabel, FormLabel, FormHelperText } from '@material-ui/core';
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';

interface Props {
  zionForm: UseFormReturn<FieldValues>;
  schema: any;
}

const SliderComponentMUI: React.FC<Props> = ({ zionForm, schema }) => {
  const { errors } = zionForm.formState;

  return (
    <Grid item xs={12} {...schema?.grid}>
      <FormControl
        fullWidth
        {...schema}
      >
        <FormLabel>{schema.label}</FormLabel>
        <Controller
          {...schema}
          render={({ field }) => (
            <Slider
              fullWidth
              {...field}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              onChange={(event: any, item: any) => {
                field.onChange(item);
              }}
              {...schema}
            />
          )}
          control={zionForm.control}
          rules={schema.rules}
        />
        <FormHelperText style={{ color: "red" }}>
          {errors[`${schema.name}`] ? errors[`${schema.name}`].message : null}
        </FormHelperText>
      </FormControl>
    </Grid>
  )
}

export default SliderComponentMUI