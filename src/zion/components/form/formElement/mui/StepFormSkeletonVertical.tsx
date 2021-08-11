import { Box, Button, createStyles, Grid, makeStyles, Paper, Step, StepContent, StepLabel, Stepper, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { DesignSystem, ZionForm } from '../../../../types'
import { RenderWidget } from '../RenderWidget'
import { UseFormReturn, FieldValues } from 'react-hook-form';

interface Props {
  form: ZionForm;
  zionForm: UseFormReturn<FieldValues>
  designSystem: DesignSystem;
}

const getSteps = (form: ZionForm): string[] => {
  let steps: any;
  steps = form.formSchemas ? form?.formSchemas.map((formSchema) => formSchema.title) : [];
  return steps || []
}

const getStepContent = (step: number, form: ZionForm, zionForm: UseFormReturn<FieldValues>, designSystem: DesignSystem): React.ReactNode => {
  let content: any;
  if (form?.formSchemas) {
    const formSchema = form?.formSchemas || []
    if (formSchema[step]) {
      if (formSchema[step]?.schema) {
        content = (
          <Grid item {...formSchema[step].grid}>
            <Grid container {...formSchema[step].gridContainer}>
              {
                // @ts-ignore
                formSchema[step].schema.map((widget, i) => {
                  return (
                    <RenderWidget key={i} schema={widget} zionForm={zionForm} designSystem={designSystem} />
                  )
                })
              }
            </Grid>
          </Grid>
        )
      }
    }
  }

  return content || <></>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(5),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

const StepFormSkeletonVertical: React.FC<Props> = ({ form, zionForm, designSystem }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps(form);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>

              <Grid container {...form.gridContainer}>
                {getStepContent(index, form, zionForm, designSystem)}
              </Grid>

              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    disableElevation
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Box>{form.stepperSuccess || "All steps completed - you're finished"}</Box>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  )
}

export default StepFormSkeletonVertical