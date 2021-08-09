import { FormControl, FormHelperText, Grid, GridSize, InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'
import { MuiSelectComponentTypeProps, SelectOption } from './types'
import { Control, Controller, FieldValues, UseFormReturn } from 'react-hook-form';

interface Props {
  zionForm: UseFormReturn<FieldValues>;
  schema: MuiSelectComponentTypeProps;
}

const SelectComponentMUI: React.FC<Props> = ({ zionForm, schema }) => {

  const { errors } = zionForm.formState;

  return (
    <Grid item xs={12} {...schema.grid}>
      <Controller
        {...schema}
        render={({ field }) => (
          <FormControl
            fullWidth
            error={errors[`${schema.name}`] ? errors[`${schema.name}`].message : null}
            {...schema as any}
          >
            <InputLabel
              htmlFor="outlined-age-native-simple"
            >
              {schema.label}
            </InputLabel>
            <Select {...schema} {...field}>
              {
                schema?.options && schema?.options.map((option: SelectOption, i: number) => (
                  <MenuItem key={i} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </MenuItem>
                ))
              }
            </Select>
            <FormHelperText style={{ color: "red" }}>
              {errors[`${schema.name}`] ? errors[`${schema.name}`].message : null}
            </FormHelperText>
          </FormControl>
        )}
        control={zionForm.control}
        rules={schema.rules}
      />
    </Grid>
  )
}

export default SelectComponentMUI