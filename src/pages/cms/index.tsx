import React from 'react';
import {
  Box,
  Button,
  Divider,
  Grid
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import TextComponent from '../../components/shared/TextComponent';
import uuid from '../../utils/uuid';

const index = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
    },
  });

  const changePassword = [
    {
      name: "email",
      label: "App Hero Title",
      variant: "outlined",
      type: "text",
      rules: {
        required: "this field is required"
      },
    },
    {
      name: "email",
      label: "App Hero Description",
      variant: "outlined",
      type: "textarea",
      rules: {
        required: "this field is required"
      },
    }
  ];

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <Box>
      <Box fontWeight={800} fontSize="1.4rem" mb={2}>
        Site
      </Box>
      <Divider />
      <Box my={2} />
      <Grid container justifyContent="center">
        <Grid xs={10} md={6}>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            {changePassword.map((value) => (
              <Controller
                key={uuid()}
                name={value?.name as never}
                render={({ field }) => (
                  <TextComponent
                    label={value.label}
                    field={field}
                    errors={errors}
                    name={value.name}
                    type={value.type}
                    value={field.value}
                    variant={value.variant}
                  />
                )}
                control={control}
                rules={value.rules}
              />
            ))}

            <Box my={3}>
              <Button
                type="submit"
                disableElevation
                color="primary"
                fullWidth
                // disabled={sendingMsg}
                size="large"
                variant="contained"
              >
                Update Content
              </Button>
              {/* {sendingMsg && (
                <CircularProgress size={30} className={classes.buttonProgress} />
              )} */}
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default index;
