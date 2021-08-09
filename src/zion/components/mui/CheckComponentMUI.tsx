import { Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Box, Grid } from '@material-ui/core'
import React from 'react'
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form'

interface Props {
  zionForm: UseFormReturn<FieldValues>;
  schema: any;
}

const CheckComponentMUI: React.FC<Props> = ({ schema, zionForm }) => {
  const { errors } = zionForm.formState;

  const handleCheck = (checked: string) => {
    if (schema.options?.length > 1) {
      const values = zionForm.getValues()
      const checkedValues = values[schema.name] ? values[schema.name] : [];
      return checkedValues && checkedValues.includes(checked)
        ? checkedValues.filter((id: string) => id != checked)
        : [...(checkedValues ?? []), checked]
    } else {
      const values = zionForm.getValues()
      const checkedValues = values[schema.name];
      return !checkedValues;
    }
  }

  return (
    <Grid item xs={12} {...schema?.grid}>
      <FormControl
        fullWidth
        error={errors[`${schema.name}`] ? true : false}
        {...schema as any}
      >
        {!schema.hiddenLabel === true && <FormLabel component="legend">{schema.label}</FormLabel>}
        <Controller
          {...schema}
          name={schema.name}
          render={(props) => (
            <Box
              {...schema}
              style={{ display: "flex", flexDirection: schema.orientation == "row" ? "row" : "column" }}
            >
              {
                schema?.options && schema?.options.map((option: any, i: number) => (
                  <FormControlLabel
                    key={i}
                    control={
                      <Checkbox
                        onChange={() => {
                          props.field.onChange(handleCheck(option[schema.optionValue].toString()));
                        }}
                        checked={(props.field.value?.length || schema.options.length > 1) ? props.field.value && props.field.value.includes(option[schema.optionValue])
                          : props.field.value
                        }
                      />
                    }
                    label={option[schema.optionLabel]}
                  />
                ))
              }
            </Box>
          )}
          control={zionForm.control}
          rules={schema.rules}
        />
        <FormHelperText>
          {errors[`${schema.name}`] ? errors[`${schema.name}`].message : null}
        </FormHelperText>
      </FormControl>
    </Grid>
  )
}

export default CheckComponentMUI