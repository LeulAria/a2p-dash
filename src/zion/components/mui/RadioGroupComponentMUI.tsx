import React from 'react'
import { MuiRadioGroupComponentTypeProps, SelectOption } from './types'
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form'
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, GridSize, Radio, RadioGroup } from '@material-ui/core'

interface Props {
  zionForm: UseFormReturn<FieldValues>;
  schema: MuiRadioGroupComponentTypeProps;
}

const RadioGroupComponentMUI: React.FC<Props> = ({ schema, zionForm }) => {

  const { errors } = zionForm.formState;

  return (
    <Grid item xs={12} {...schema?.grid}>
      <Controller
        {...schema}
        render={({ field }) => (
          <FormControl
            fullWidth
            error={errors[`${schema.name}`] ? errors[`${schema.name}`].message : null}
            {...schema as any}
          >
            <FormLabel component="legend">{schema.label}</FormLabel>
            <RadioGroup
              {...schema}
              {...field}
              row={schema.orientation === "row"}
            >
              {
                schema?.options && schema?.options.map((option: SelectOption, i: number) => (
                  <FormControlLabel
                    key={i}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))
              }
            </RadioGroup>
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

export default RadioGroupComponentMUI
