import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
} from '@material-ui/core';
import {
  Zion,
  ZionForm,
  ZionValidation,
  useZion,
} from '../../zion';
import { useFireMutation } from '../../FireQuery';

const CmsForm = ({ data }: { data: any }) => {
  const mutation = useFireMutation("cms");
  const [form, setForm] = useState<ZionForm>();
  const [submitElement, setSubmitElement] = useState<any>();

  const zionForm = useZion({
    defaultValues: useMemo(() => data, [data]),
  });

  useMemo(() => {
    setForm({
      skeleton: "step-form-vertical",
      stepperSuccess: "All Done.",
      gridContainer: { spacing: 2, justify: "space-around" },
      formSchemas: [
        {
          title: "App Home Page Hero Content",
          grid: { xs: 12, md: 5 },
          gridContainer: { spacing: 2, justify: "center" },
          schema: [
            {
              grid: { xs: 12 },
              widget: "custom",
              name: "app_footer_registration_message",
              label: "App Footer Registration Message.",
              component: (zionForm, designSystem) => <Box mt={2} />
            },
            {
              grid: { xs: 12 },
              widget: "text",
              name: "app_hero_title",
              variant: "outlined",
              label: "App Hero Title.",
              multiline: true,
              maxRows: 6,
              minRows: 2,
              rules: new ZionValidation(zionForm).required("Required Field.").max(35, "Value should be less than 35 characters long.").rules
            },
            {
              grid: { xs: 12 },
              widget: "text",
              name: "app_hero_body",
              variant: "outlined",
              multiline: true,
              maxRows: 7,
              minRows: 3,
              label: "App Hero Description.",
              rules: new ZionValidation(zionForm).required("Required Field.").max(35, "Value should be less than 75 characters long.").rules
            }
          ],
        },
        {
          title: "App Email Confirm Popup Content.",
          grid: { xs: 12, md: 5 },
          gridContainer: { spacing: 2, justify: "center" },
          schema: [
            {
              grid: { xs: 12 },
              widget: "custom",
              name: "app_footer_registration_message",
              label: "App Footer Registration Message.",
              component: (zionForm, designSystem) => <Box mt={2} />
            },
            {
              grid: { xs: 12 },
              widget: "text",
              name: "confirmation_popup_message_description",
              variant: "outlined",
              label: "App Confirm Popup Title.",
              multiline: true,
              maxRows: 6,
              minRows: 2,
              rules: new ZionValidation(zionForm).required("Required Field.").max(35, "Value should be less than 35 characters long.").rules
            },
            {
              grid: { xs: 12 },
              widget: "text",
              name: "confirmation_popup_message_description",
              variant: "outlined",
              multiline: true,
              maxRows: 7,
              minRows: 4,
              label: "App Confirm Popup Description",
              rules: new ZionValidation(zionForm).required("Required Field.").max(100, "Value should be less than 75 characters long.").rules
            }
          ],
        },
        {
          title: "App Footer Content",
          grid: { xs: 12 },
          gridContainer: { spacing: 2, justify: "space-evenly" },
          schema: [
            {
              grid: { xs: 12 },
              widget: "custom",
              name: "app_footer_registration_message",
              label: "App Footer Registration Message.",
              component: (zionForm, designSystem) => <Box mt={3} />
            },
            {
              grid: { xs: 12, md: 5 },
              widget: "text",
              name: "app_footer_registration_message",
              variant: "outlined",
              multiline: true,
              maxRows: 7,
              minRows: 5,
              label: "App Footer Registration Message.",
              rules: new ZionValidation(zionForm).required("Required Field.").max(35, "Value should be less than 75 characters long.").rules
            },
            {
              grid: { xs: 12, md: 5 },
              widget: "text",
              name: "app_address",
              variant: "outlined",
              multiline: true,
              maxRows: 7,
              minRows: 5,
              label: "App Address.",
              rules: new ZionValidation(zionForm).required("Required Field.").max(35, "Value should be less than 75 characters long.").rules
            },
            {
              grid: { xs: 12, md: 5 },
              widget: "text",
              name: "app_footer_phone",
              variant: "outlined",
              label: "Footer Phone Number",
              rules: new ZionValidation(zionForm).required("Required Field.").rules
            },
            {
              grid: { xs: 12, md: 5 },
              widget: "text",
              name: "app_footer_email",
              variant: "outlined",
              label: "Footer App Website",
              rules: new ZionValidation(zionForm).required("Required Field.").rules
            },
            {
              grid: { xs: 12, md: 5 },
              widget: "text",
              name: "app_website",
              variant: "outlined",
              label: "Footer App Email",
              rules: new ZionValidation(zionForm).required("Required Field.").rules
            },
            {
              grid: { xs: 12, md: 5 },
              widget: "text",
              name: "app_footer_title",
              variant: "outlined",
              label: "Footer App Title",
              rules: new ZionValidation(zionForm).required("Required Field.").rules
            },
          ],
        },
      ]
    });
  }, []);

  const onSubmit = async (formData: any) => {
    mutation.mutate("UPDATE", data?.id, formData);
  };

  return (
    <Box>
      <Box fontWeight={800} fontSize="1.4rem" mb={2}>
        Site HomePage Content
      </Box>
      <Divider />
      <Box my={4} />
      <Zion
        designSystem="mui"
        form={form}
        noSubmitButton
        zionForm={zionForm}
        submitElement={(element: any) => setSubmitElement(element)}
        onSubmit={(formData: any) => onSubmit(formData)}
      />
      <Box mx="auto" mt={3} style={{ minWidth: "240px", maxWidth: "400px", width: "70%" }}>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          disableElevation
          disabled={mutation.loading}
          onClick={() => submitElement?.click()}
        >
          Update Content
          {
            mutation.loading
            && (
              <CircularProgress
                size="24px"
                style={{ position: "absolute" }} 
              />
            )
          }
        </Button>
      </Box>
      <Box my={15} />
    </Box>
  );
};

export default CmsForm;
