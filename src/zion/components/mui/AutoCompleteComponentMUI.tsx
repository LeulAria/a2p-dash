import React, { useEffect } from 'react'
import Autocomplete from "@material-ui/lab/Autocomplete";
import { MuiAutocompleteComponentTypeProps } from './types'
import { CircularProgress, Grid, TextField } from '@material-ui/core';
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';

interface Props {
  zionForm: UseFormReturn<FieldValues>;
  schema: any;
}

const AutoCompleteComponentMUI: React.FC<Props> = ({ zionForm, schema }) => {
  const [open, setOpen] = React.useState(false);

  const { errors } = zionForm.formState;

  useEffect(() => {
    if (schema.group) {
      schema.options = schema.options.map((option: any) => {
        const firstLetter = option[schema.optionLabel][0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
      });
      schema.options = schema.options.sort((a: any, b: any) => -b.firstLetter.localeCompare(a.firstLetter));
      schema.groupBy = (option: any) => option.firstLetter
    }
  }, [schema])

  return (
    <Grid item xs={12} {...schema?.grid}>
      <Controller
        {...schema}
        render={(props) => (
          <Autocomplete
            {...schema}
            {...props}
            {...props.field}
            id="autocomplete"
            onChange={(event: any, item: any) => {
              props.field.onChange(item);
            }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            options={schema.options}
            getOptionLabel={(option: any) => option[schema.optionLabel]}
            getOptionSelected={(option: any, value: any) =>
              option[schema.optionLabel] === value[schema.optionValue]
            }
            style={{ width: "100%" }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  {...schema}
                  helperText={errors[`${schema.name}`] ? errors[`${schema.name}`].message : null}
                  error={errors[`${schema.name}`]}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {schema.loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              );
            }}
          />
        )}
        rules={schema.rules}
        control={zionForm.control}
      />
    </Grid>
  );
}

export default AutoCompleteComponentMUI