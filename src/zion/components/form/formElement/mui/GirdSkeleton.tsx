import { Grid } from '@material-ui/core'
import React from 'react'
import { DesignSystem, ZionForm } from '../../../../types'
import { RenderWidget } from '../RenderWidget'
import { UseFormReturn, FieldValues } from 'react-hook-form';

interface Props {
  form: ZionForm;
  zionForm: UseFormReturn<FieldValues>
  designSystem: DesignSystem;
}

const GirdSkeleton: React.FC<Props> = ({ form, zionForm, designSystem }) => (
  <Grid container {...form.gridContainer}>
    {
      form?.formSchemas && form?.formSchemas.map((formSchema, i) => {
        return (
          <Grid item {...formSchema.grid}>
            <Grid key={i} container {...formSchema.gridContainer}>
              {
                formSchema.schema && formSchema.schema.map((widget, i) => {
                  return (
                    <RenderWidget key={i} schema={widget} zionForm={zionForm} designSystem={designSystem} />
                  )
                })
              }
            </Grid>
          </Grid>
        )
      })
    }
  </Grid>
)

export default GirdSkeleton