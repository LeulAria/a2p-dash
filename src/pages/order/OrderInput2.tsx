import React, {useEffect, useMemo, useRef, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Slide from "@material-ui/core/Slide";
import {TransitionProps} from "@material-ui/core/transitions";
import {
  AppBar,
  Box,
  Card,
  CircularProgress,
  Container,
  Grid,
  IconButton,
} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import TextComponent from "../../components/shared/TextComponent";
import SelectComponent from "../../components/shared/SelectComponent";
import RadioGroupComponent from "../../components/shared/RadioGroupComponent";
import {useFireMutation} from "../../FireQuery";
import {useSnackBar} from "../../contexts/snackbar/SnackBarContext";
import {useHistory} from "react-router";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {useReactToPrint} from "react-to-print";
import { useZion, Zion, ZionForm, ZionValidation } from "../../zion";

// import MiniChat from "./MiniChat";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    root: {
      display: "flex",
      alignItems: "center",
    },
    wrapper: {
      position: "relative",
    },
    buttonProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
    formInput: {
      fontWeight: 600,
    },
    hide: {
      left: "-200vw",
      transition: "all .4s ease-in-out",
    },
    show: {
      left: 0,
      transition: "all .4s ease-in-out",
    },
    legend: {
      color: theme.palette.type === "dark" ? "#999" : "#667",
    },
    legendPrimary: {
      color: theme.palette.type === "dark" ? "#bbb" : "#545454",
    },
    appBar: {
      position: "sticky",
      height: 62,
      boxShadow: "none",
    },
  })
);

export default function OrderInput2({
  dataInput,
  user,
  view,
}: {
  dataInput: any;
  user: any;
  view: boolean;
  ref?: React.Ref<unknown>;
}) {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState<any>({});
  const [watchTerms2, setWatchTerms2] = useState<any>(null);

  const [form, setForm] = useState<ZionForm>();
  const [submitElement, setSubmitElement] = useState<any>();

  const zionForm = useZion({});

  const {
    control,
    formState: {errors, isDirty, isValid},
    getValues,
    setValue,
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      adress_1: "",
      adress_2: "",
      billingCycle: "Monthly",
      city: "",
      company_name: "",
      conditionType: "IPSec",
      country: "",
      creditLimit: "",
      currency: "ETB",
      dueDate: "15 days",
      emailBusinessManager: "",
      emailCommercial: "",
      emailFinanceBilling: "",
      emailReportPortal: "",
      emailTechnical: "",
      fullNameBusinessManager: "",
      fullNameCommercial: "",
      fullNameFinanceBilling: "",
      fullNameReportPortal: "",
      fullNameTechnical: "",
      isBusnessManager: "yes",
      isReportPortal: "yes",
      passwordBusinessManager: "",
      passwordReportPortal: "",
      phoneNumberBusinessManager: "",
      phoneNumberCommercial: "",
      phoneNumberFinanceBilling: "",
      phoneNumberReportPortal: "",
      phoneNumberTechnical: "",
      protocol: "SOAP",
      senderIDAlphanumeric1: "",
      senderIDAlphanumeric2: "",
      senderIDAlphanumeric3: "",
      senderIDAlphanumeric4: "",
      senderIDAlphanumeric5: "",
      senderIDNumeric1: "",
      senderIDNumeric2: "",
      senderIDNumeric3: "",
      senderIDNumeric4: "",
      senderIDNumeric5: "",
      signalling: "SMPP",
      state: "",
      terms: "Prepaid",
      tinNumber: "",
      userNameBusinessManager: "",
      userNameReportPortal: "",
      vatNumber: "",
      ...user.userInfo,
    },
  });

  useEffect(() => {
    if (dataInput) {
      setData(dataInput);
    } else {
      history.goBack();
    }
  }, [dataInput]);

  // Radio button terms watcher to set credit limit value ""
  const watchTerms = watch("terms", "Prepaid");
  useEffect(() => {
    if (watchTerms === "Prepaid") {
      setValue("creditLimit", "", {shouldValidate: false});
    }
  }, [watchTerms]);
  
  const watchTerms2Watch = zionForm.watch("terms");
  useEffect(() => {
    if (watchTerms2Watch) {
      setWatchTerms2(watchTerms2Watch == "Prepaid");
    }
  }, [watchTerms2Watch])  

  const signUpFields = [
    {
      input: "legend primary",
      name: "Order",
    },
    {
      input: "legend",
      name: "Account Address",
    },
    {
      input: "text",
      name: "company_name",
      label: "Company Name",
      variant: "outlined",
      type: "text",
      autofocus: true,
      rules: {
        required: "this field is required",
        minLength: {
          value: "3",
          message: "company name should not be lessthan 3 characters",
        },
      },
    },
    {
      input: "text",
      name: "adress_1",
      label: "Adress 1",
      variant: "outlined",
      type: "text",
      rules: {
        required: "this field is required",
        minLength: {
          value: "2",
          message: "adress name should not be lessthan 2 characters",
        },
      },
    },
    {
      input: "text",
      name: "adress_2",
      label: "Address 2",
      variant: "outlined",
      type: "text",
      rules: {
        minLength: {
          value: "2",
          message: "adress name should not be lessthan 2 characters",
        },
      },
    },
    {
      input: "text",
      name: "city",
      label: "City",
      variant: "outlined",
      type: "text",
      rules: {
        required: "this field is required",
        minLength: {
          value: "2",
          message: "city should not be lessthan 2 characters",
        },
      },
    },
    {
      input: "text",
      name: "state",
      label: "State",
      variant: "outlined",
      type: "text",
      rules: {
        required: "this field is required",
        minLength: {
          value: "2",
          message: "State should not be lessthan 2 characters",
        },
      },
    },
    {
      input: "text",
      name: "country",
      label: "Country",
      variant: "outlined",
      type: "text",
      rules: {
        required: "this field is required",
        minLength: {
          value: "2",
          message: "Country name should not be lessthan 2 characters",
        },
      },
    },
    {
      input: "text",
      name: "city",
      label: "Post Code",
      variant: "outlined",
      type: "number",
      rules: {
        required: "this field is required",
        minLength: {
          value: "4",
          message: "post code should not be lessthan 4 characters",
        },
      },
    },

    {
      input: "legend",
      name: "Billing",
    },
    {
      input: "select",
      name: "billingCycle",
      label: "Billing Cycle",
      variant: "outlined",
      menus: [
        {
          name: "Monthly",
          value: "Monthly",
        },
        {
          name: "Yearly",
          value: "Yearly",
        },
      ],
      rules: {
        required: "this field is required",
      },
    },
    {
      input: "select",
      name: "currency",
      label: "Currency",
      variant: "outlined",
      menus: [
        {
          name: "Ehtiopian Birr",
          value: "ETB",
        },
        {
          name: "United States Dollar",
          value: "USD",
        },
      ],
      rules: {
        required: "this field is required",
      },
    },
    {
      input: "text",
      name: "vatNumber",
      label: "Vat Number",
      variant: "outlined",
      type: "number",
      rules: {
        required: "this field is required",
        minLength: {
          value: "4",
          message: "vat number should not be lessthan 4 characters",
        },
      },
    },
    {
      input: "text",
      name: "tinNumber",
      label: "TIN Number",
      variant: "outlined",
      type: "number",
      rules: {
        required: "this field is required",
        minLength: {
          value: "4",
          message: "tin number should not be lessthan 4 characters",
        },
      },
    },
    {
      input: "radio",
      name: "dueDate",
      label: "Due Date",
      variant: "outlined",
      menus: [
        {
          label: "15 days",
          value: "15 days",
        },
        {
          label: "30 days",
          value: "30 days",
        },
      ],
      rules: {
        required: "this field is required",
      },
    },
    {
      input: "radio",
      name: "terms",
      label: "Terms",
      variant: "outlined",
      menus: [
        {
          label: "Postpaid",
          value: "Postpaid",
        },
        {
          label: "Prepaid",
          value: "Prepaid",
        },
      ],
      rules: {
        required: "this field is required",
      },
    },
    {
      input: "text",
      name: "creditLimit",
      label: "Credit Limit",
      variant: "outlined",
      type: "number",
      disabled: watchTerms === "Prepaid",
    },

    {
      input: "legend primary",
      name: "Account Contact",
    },
    {
      input: "legend",
      name: "Commercial",
    },
    {
      input: "text",
      name: "fullNameCommercial",
      label: "Full Name",
      variant: "outlined",
      type: "text",
      rules: {
        required: "this field is required",
        minLength: {
          value: "4",
          message: "Full name should not be lessthan 4 characters",
        },
      },
    },
    {
      input: "text",
      name: "emailCommercial",
      label: "Email Address",
      variant: "outlined",
      type: "email",
      rules: {
        required: "this field is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: "invalid email address",
        },
      },
    },
    {
      input: "text",
      name: "phoneNumberCommercial",
      label: "Phone Number",
      variant: "outlined",
      type: "tel",
      rules: {
        required: "this field is required",
        pattern: {
          value: /(^(\+251)+|^0)[9][0-9]{8}\b/,
          message: "invalid format",
        },
      },
    },

    {
      input: "legend",
      name: "Finance Billing",
    },
    {
      input: "text",
      name: "fullNameFinanceBilling",
      label: "Full Name",
      variant: "outlined",
      type: "text",
      rules: {
        required: "this field is required",
        minLength: {
          value: "4",
          message: "FullName name should not be lessthan 4 characters",
        },
      },
    },
    {
      input: "text",
      name: "emailFinanceBilling",
      label: "Email Address",
      variant: "outlined",
      type: "email",
      rules: {
        required: "this field is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: "invalid email address",
        },
      },
    },
    {
      input: "text",
      name: "phoneNumberFinanceBilling",
      label: "Phone Number",
      variant: "outlined",
      type: "tel",
      rules: {
        required: "this field is required",
        pattern: {
          value: /(^(\+251)+|^0)[9][0-9]{8}\b/,
          message: "invalid format",
        },
      },
    },

    {
      input: "legend",
      name: "Technical",
    },
    {
      input: "text",
      name: "fullNameTechnical",
      label: "Full Name",
      variant: "outlined",
      type: "text",
      rules: {
        required: "this field is required",
        minLength: {
          value: "4",
          message: "FullName name should not be lessthan 4 characters",
        },
      },
    },
    {
      input: "text",
      name: "emailTechnical",
      label: "Email Address",
      variant: "outlined",
      type: "email",
      rules: {
        required: "this field is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: "invalid email address",
        },
      },
    },
    {
      input: "text",
      name: "phoneNumberTechnical",
      label: "Phone Number",
      variant: "outlined",
      type: "tel",
      rules: {
        required: "this field is required",
        pattern: {
          value: /(^(\+251)+|^0)[9][0-9]{8}\b/,
          message: "invalid format",
        },
      },
    },

    {
      input: "legend",
      name: "Connection",
    },
    {
      input: "radio",
      name: "conditionType",
      label: "Connection Type",
      variant: "outlined",
      menus: [
        {
          label: "Public IP",
          value: "Public IP",
        },
        {
          label: "IPSec",
          value: "IPSec",
        },
      ],
      rules: {
        required: "this field is required",
      },
    },
    {
      input: "radio",
      name: "signalling",
      label: "Signalling",
      variant: "outlined",
      menus: [
        {
          label: "SMPP",
          value: "SMPP",
        },
        {
          label: "HTTP",
          value: "HTTP",
        },
      ],
      rules: {
        required: "this field is required",
      },
    },
    {
      input: "radio",
      name: "protocol",
      label: "Protocol",
      variant: "outlined",
      menus: [
        {
          label: "SOAP",
          value: "SOAP",
        },
        {
          label: "REST",
          value: "REST",
        },
      ],
      rules: {
        required: "this field is required",
      },
    },
    {
      input: "text",
      name: "senderIDAlphanumeric1",
      label: "Sender ID Alphanumeric",
      size: "small",
      variant: "outlined",
      type: "text",
      rules: {
        required: "this field is required",
        minLength: {
          value: "4",
          message: "Senders Id should not be lessthan 4 characters",
        },
      },
    },
    {
      input: "text",
      name: "senderIDAlphanumeric2",
      label: "Sender ID Alphanumeric",
      size: "small",
      variant: "outlined",
      type: "text",
      rules: {
        minLength: {
          value: "4",
          message: "Senders Id should not be lessthan 4 characters",
        },
      },
    },
    {
      input: "text",
      name: "senderIDAlphanumeric3",
      label: "Sender ID Alphanumeric",
      size: "small",
      variant: "outlined",
      type: "text",
      rules: {
        minLength: {
          value: "4",
          message: "Senders Id should not be lessthan 4 characters",
        },
      },
    },
    {
      input: "text",
      name: "senderIDAlphanumeric4",
      label: "Sender ID Alphanumeric",
      size: "small",
      variant: "outlined",
      type: "text",
      rules: {
        minLength: {
          value: "4",
          message: "Senders Id should not be lessthan 4 characters",
        },
      },
    },
    {
      input: "text",
      name: "senderIDAlphanumeric5",
      label: "Sender ID Alphanumeric",
      size: "small",
      variant: "outlined",
      type: "text",
      rules: {
        minLength: {
          value: "4",
          message: "Senders Id should not be lessthan 4 characters",
        },
      },
    },
    {
      input: "text",
      name: "senderIDNumeric1",
      label: "Sender ID Numeric",
      size: "small",
      variant: "outlined",
      type: "number",
      rules: {
        required: "this field is required.",
        minLength: {
          required: "this field is required",
          value: "4",
          message: "Senders Id should not be lessthan 4 characters",
        },
      },
    },
    {
      input: "text",
      name: "senderIDNumeric2",
      label: "Sender ID Numeric",
      size: "small",
      variant: "outlined",
      type: "number",
      rules: {
        minLength: {
          required: "this field is required",
          value: "4",
          message: "Senders Id should not be lessthan 4 characters",
        },
      },
    },
    {
      input: "text",
      name: "senderIDNumeric3",
      label: "Sender ID Numeric",
      size: "small",
      variant: "outlined",
      type: "number",
      rules: {
        minLength: {
          required: "this field is required",
          value: "4",
          message: "Senders Id should not be lessthan 4 characters",
        },
      },
    },
    {
      input: "text",
      name: "senderIDNumeric4",
      label: "Sender ID Numeric",
      size: "small",
      variant: "outlined",
      type: "number",
      rules: {
        minLength: {
          required: "this field is required",
          value: "4",
          message: "Senders Id should not be lessthan 4 characters",
        },
      },
    },
    {
      input: "text",
      name: "senderIDNumeric5",
      label: "Sender ID Numeric",
      size: "small",
      variant: "outlined",
      type: "number",
      rules: {
        minLength: {
          required: "this field is required",
          value: "4",
          message: "Senders Id should not be lessthan 4 characters",
        },
      },
    },
    {
      input: "legend primary",
      name: "Report Portal",
    },
    {
      input: "radio",
      name: "isReportPortal",
      label: "Report Portal",
      variant: "outlined",
      menus: [
        {
          label: "Yes",
          value: "yes",
        },
        {
          label: "No",
          value: "no",
        },
      ],
      rules: {
        required: "this field is required",
      },
    },
    {
      input: "legend",
      name: "User 1",
    },
    {
      input: "text",
      name: "fullNameReportPortal",
      label: "Full Name",
      variant: "outlined",
      type: "text",
      rules: {
        required: "this field is required",
        minLength: {
          value: "4",
          message: "FullName name should not be lessthan 4 characters",
        },
      },
    },
    {
      input: "text",
      name: "emailReportPortal",
      label: "Email Address",
      variant: "outlined",
      type: "email",
      rules: {
        required: "this field is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: "invalid email address",
        },
      },
    },
    {
      input: "text",
      name: "phoneNumberReportPortal",
      label: "Phone Number",
      variant: "outlined",
      type: "tel",
      rules: {
        required: "this field is required",
        pattern: {
          value: /(^(\+251)+|^0)[9][0-9]{8}\b/,
          message: "invalid format",
        },
      },
    },
    {
      input: "text",
      name: "userNameReportPortal",
      label: "Username",
      variant: "outlined",
      type: "text",
      rules: {
        required: "this field is required",
        minLength: {
          value: "4",
          message: "username should not be lessthan 4 characters",
        },
      },
    },
    {
      input: "text",
      name: "passwordReportPortal",
      label: "Password",
      variant: "outlined",
      type: "password",
      rules: {
        required: "this field is required",
        minLength: {
          value: "6",
          message: "Password sould not be lessthan 6 characters",
        },
      },
    },
    {
      input: "legend primary",
      name: "Business Manager",
    },
    {
      input: "radio",
      name: "isBusnessManager",
      label: "Busness Manager",
      variant: "outlined",
      menus: [
        {
          label: "Yes",
          value: "yes",
        },
        {
          label: "No",
          value: "no",
        },
      ],
      rules: {
        required: "this field is required",
      },
    },
    {
      input: "legend",
      name: "User 1",
    },
    {
      input: "text",
      name: "fullNameBusinessManager",
      label: "Full Name",
      variant: "outlined",
      type: "text",
      rules: {
        required: "this field is required",
        minLength: {
          value: "4",
          message: "FullName name should not be lessthan 4 characters",
        },
      },
    },
    {
      input: "text",
      name: "emailBusinessManager",
      label: "Email Address",
      variant: "outlined",
      type: "email",
      rules: {
        required: "this field is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: "invalid email address",
        },
      },
    },
    {
      input: "text",
      name: "phoneNumberBusinessManager",
      label: "Phone Number",
      variant: "outlined",
      type: "tel",
      rules: {
        required: "this field is required",
        pattern: {
          value: /(^(\+251)+|^0)[9][0-9]{8}\b/,
          message: "invalid format",
        },
      },
    },
    {
      input: "text",
      name: "userNameBusinessManager",
      label: "Username",
      variant: "outlined",
      type: "text",
      rules: {
        required: "this field is required",
        minLength: {
          value: "4",
          message: "username should not be lessthan 4 characters",
        },
      },
    },
    {
      input: "text",
      name: "passwordBusinessManager",
      label: "Password",
      variant: "outlined",
      type: "password",
      rules: {
        required: "this field is required",
        minLength: {
          value: "6",
          message: "Password sould not be lessthan 6 characters",
        },
      },
    },
  ];

  useMemo(() => {
    setForm({
      skeleton: "step-form-vertical",
      stepperSuccess: "All Done.",
      gridContainer: { spacing: 3, justify: "space-evenly" },
      formSchemas: [
        {
          title: "Account Address",
          grid: { xs: 12, md: 10 },
          gridContainer: { spacing: 3, justify: "flex-start" },
          schema: [
            {
              grid: { xs: 12 },
              widget: "custom",
              name: "app_footer_registration_message",
              label: "App Footer Registration Message.",
              component: (zionForm, designSystem) => <Box mt={2} />
            },
            {
              grid: { xs: 12, md: 6 },
              widget: "text",
              name: "company_name",
              label: "Company Name",
              variant: "outlined",
              type: "text",
              rules: new ZionValidation(zionForm).required("Required Field.").minLength(3, "Company name should not be lessthan 3 characters").rules
            },
            {
              grid: { xs: 12, md: 6 },
              widget: "text",
              name: "adress_1",
              label: "Adress 1",
              variant: "outlined",
              type: "text",
              rules: new ZionValidation(zionForm).required("Required Field.").minLength(2, "Address name should not be lessthan 2 characters").rules
            },
            {
              grid: { xs: 12, md: 6 },
              widget: "text",
              name: "address_2",
              label: "Address 2",
              variant: "outlined",
              type: "text",
              rules: new ZionValidation(zionForm).required("Required Field.").minLength(2, "Address name should not be lessthan 2 characters").rules
            },
            {
              grid: { xs: 12, md: 6 },
              widget: "text",
              name: "city",
              label: "City",
              variant: "outlined",
              type: "text",
              rules: new ZionValidation(zionForm).required("Required Field.").minLength(2, "City should not be lessthan 2 characters").rules
            },
            {
              grid: { xs: 12, md: 6 },
              widget: "text",
              name: "state",
              label: "State",
              variant: "outlined",
              type: "text",
              rules: new ZionValidation(zionForm).required("Required Field.").minLength(2, "State name should not be lessthan 2 characters").rules
            },
            {
              grid: { xs: 12, md: 6 },
              widget: "text",
              name: "country",
              label: "Country",
              variant: "outlined",
              type: "text",
              rules: new ZionValidation(zionForm).required("Required Field.").minLength(2, "Country name should not be lessthan 2 characters").rules
            },
            {
              grid: { xs: 12, md: 6 },
              widget: "text",
              name: "post_code",
              label: "Post Code",
              variant: "outlined",
              type: "number",
              rules: new ZionValidation(zionForm).required("Required Field.").minLength(4, "Post Code name should not be lessthan 2 characters").rules
            }
          ],
        },
        {
          title: "Billing Information",
          grid: { xs: 12, md: 10 },
          gridContainer: { spacing: 2, justify: "flex-start" },
          schema: [
            {
              grid: { xs: 12 },
              widget: "custom",
              name: "app_footer_registration_message",
              label: "App Footer Registration Message.",
              component: (zionForm, designSystem) => <Box mt={2} />
            },
            {
              grid: { xs: 12, md: 6 },
              widget: "select",
              name: "billingCycle",
              label: "Billing Cycle",
              variant: "outlined",
              options: [
                {
                  label: "Monthly",
                  value: "Monthly",
                },
                {
                  label: "Yearly",
                  value: "Yearly",
                },
              ],
              rules: new ZionValidation(zionForm).required("Required Field.").rules
            },
            {
              grid: { xs: 12, md: 6 },
              widget: "select",
              name: "currency",
              label: "Currency",
              variant: "outlined",
              options: [
                {
                  label: "Ethiopian Birr",
                  value: "ETB",
                },
                {
                  label: "United States Dollar",
                  value: "USD",
                },
              ],
              rules: new ZionValidation(zionForm).required("Required Field.").rules
            },
            {
              grid: { xs: 12, md: 6 },
              widget: "text",
              name: "vatNumber",
              label: "Vat Number",
              variant: "outlined",
              type: "number",
              rules: new ZionValidation(zionForm).required("Required Field.").max(4, "Vat number should not be lessthan 4 characters").rules
            },
            {
              grid: { xs: 12, md: 6 },
              widget: "text",
              name: "tinNumber",
              label: "TIN Number",
              variant: "outlined",
              type: "number",
              rules: new ZionValidation(zionForm).required("Required Field.").max(4, "Tin number should not be lessthan 4 characters").rules
            },
            {
              grid: { xs: 12, md: 6 },
              widget: "radio",
              name: "dueDate",
              label: "Due Date",
              orientation: "row",
              variant: "outlined",
              options: [
                {
                  label: "15 days",
                  value: "15 days",
                },
                {
                  label: "30 days",
                  value: "30 days",
                },
              ],
              rules: new ZionValidation(zionForm).required("Required Field.").rules
            },
            {
              grid: { xs: 12, md: 6 },
              widget: "radio",
              name: "terms",
              label: "Terms",
              orientation: "row",
              variant: "outlined",
              options: [
                {
                  label: "Postpaid",
                  value: "Postpaid",
                },
                {
                  label: "Prepaid",
                  value: "Prepaid",
                },
              ],
              rules: new ZionValidation(zionForm).required("Required Field.").rules
            },
            {
              grid: { xs: 12, md: 6 },
              widget: "text",
              name: "creditLimit",
              label: "Credit Limit",
              variant: "outlined",
              type: "number",
              disabled: watchTerms2,
            },
          ],
        },
        {
          title: "Account Contact Commercial.",
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
              name: "fullNameCommercial",
              label: "Full Name",
              variant: "outlined",
              type: "text",
              rules: new ZionValidation(zionForm).required("Required Field.").max(4, "Full name should be less than 4 characters long.").rules
            },
            {
              grid: { xs: 12 },
              widget: "text",
              name: "email",
              type: "email",
              variant: "outlined",
              label: "Email Address",
              rules: new ZionValidation(zionForm).required("Required Field.").email("Invalid email address.").rules
            },
            {
              grid: { xs: 12 },
              widget: "text",
              name: "phoneNumber",
              variant: "outlined",
              label: "Tel",
              rules: new ZionValidation(zionForm).required("Required Field.").matches(/(^(\+251)+|^0)[9][0-9]{8}\b/, "Invalid Phone number").rules
            },
          ],
        },
      ]
    });
  }, [watchTerms2]);

  const {setSnackbar} = useSnackBar();

  const {
    error: errorUser,
    loading: loadingUser,
    success: successUser,
    mutate: mutateUser,
  } = useFireMutation("users");

  const {
    error: errorOrder,
    loading: loadingOrder,
    success: successOrder,
    mutate: mutateOrder,
  } = useFireMutation("orders");

  const orderInputRef = useRef<any>(null);
  const handlePrint = useReactToPrint({
    content: () => orderInputRef.current,
  });

  const onSubmit = (formData: any) => {
    console.log("HAS TO RUN: ", formData);
    // mutateUser("UPDATE", data.uid, {
    //   userInfo: {
    //     ...formData,
    //   },
    //   isDetailFilled: true,
    // })
    //   .then(() => {
    //     console.log("ORDER ID: ", data?.id);
    //     mutateOrder("UPDATE", data?.id, {
    //       isDetailFilled: true,
    //     })
    //       .then(() => {
    //         setSnackbar({
    //           open: true,
    //           message: "Order detail updated successfully!",
    //           type: "success",
    //         });
    //         history.goBack();
    //       })
    //       .catch((err) => {
    //         console.log("ERROR HERE: ", err);
    //         if (err) {
    //           if (typeof err !== "string") {
    //             setSnackbar({
    //               open: true,
    //               message: err.code,
    //               type: "error",
    //             });
    //           } else {
    //             setSnackbar({
    //               open: true,
    //               message: err,
    //               type: "error",
    //             });
    //           }
    //         }
    //       });
    //   })
    //   .catch((err) => {
    //     if (err) {
    //       if (typeof err !== "string") {
    //         setSnackbar({
    //           open: true,
    //           message: err.code,
    //           type: "error",
    //         });
    //       } else {
    //         setSnackbar({
    //           open: true,
    //           message: err,
    //           type: "error",
    //         });
    //       }
    //     }
    //   });
  };

  return (
    <Box>
      <AppBar color="default" className={classes.appBar}>
        <Box
          px={5}
          height="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIosIcon style={{width: 17, height: 17}} />
          </IconButton>

          <Button variant="outlined" onClick={handlePrint}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
              <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
            </svg>
            <Box ml={2}>Print</Box>
          </Button>
        </Box>
      </AppBar>
      <Box mt={5}></Box>
      <Container>
        <Grid ref={orderInputRef} container spacing={5}>
          <Grid item xs={12}>
            <Box>
              <Box ml={1} mb={1} fontWeight={900} fontSize="1.3rem">
                Customer Order
              </Box>
              <Card variant="outlined">
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Service Type"
                      secondary={user?.solutions}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="Order Stauts" secondary={data?.status} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    {user ? (
                      <>
                        <ListItemText
                          primary={user.clientName}
                          secondary={user.email}
                        />
                        <ListItemText
                          primary="Company"
                          secondary={user.companyName}
                        />
                      </>
                    ) : (
                      <Box
                        p={3}
                        width="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <CircularProgress />
                      </Box>
                    )}
                  </ListItem>
                </List>
              </Card>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box ml={1} mb={1} fontWeight={900} fontSize="1.3rem">
              Order Form
            </Box>

            <Zion
              designSystem="mui"
              form={form}
              noSubmitButton
              zionForm={zionForm}
              submitElement={(element: any) => setSubmitElement(element)}
              onSubmit={(formData: any) => onSubmit(formData)}
            />

            <Card variant="outlined">
              <Box p={5} py={0}>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                  {signUpFields.map((value: any, index: number) => {
                    switch (value.input) {
                      case "legend primary":
                        return (
                          <Box mt={5}>
                            <Box
                              mb={1}
                              ml={-2}
                              fontWeight={900}
                              fontSize="1.36rem"
                              className={classes.legendPrimary}
                            >
                              {value.name}
                            </Box>
                          </Box>
                        );
                      case "legend":
                        return (
                          <Box
                            mt={5}
                            mb={1}
                            ml={2}
                            fontWeight={500}
                            fontSize="1rem"
                            className={classes.legend}
                          >
                            {value.name}
                          </Box>
                        );
                      case "radio":
                        return (
                          <Controller
                            name={value.name}
                            render={({field}) => (
                              <RadioGroupComponent
                                field={field}
                                errors={errors}
                                label={value.label}
                                menus={value.menus}
                              />
                            )}
                            control={control}
                            rules={value.rules}
                          />
                        );
                      case "select":
                        return (
                          <>
                            <Box mt={2}></Box>
                            <Controller
                              name={value.name}
                              render={({field}) => (
                                <SelectComponent
                                  field={field}
                                  errors={errors}
                                  name={value.label}
                                  menus={value.menus}
                                />
                              )}
                              control={control}
                              rules={value.rules}
                            />
                          </>
                        );
                      case "text":
                        return (
                          <Controller
                            key={index}
                            name={value.name}
                            render={({field}) => (
                              <TextComponent
                                label={value?.label}
                                field={field}
                                errors={errors}
                                name={value?.name}
                                autofocus={value?.autofocus}
                                size={value?.size}
                                type={value?.type}
                                value={field?.value}
                                variant={value?.variant}
                                disabled={value?.disabled}
                                hidden={value?.hidden}
                              />
                            )}
                            control={control}
                            rules={value.rules}
                          />
                        );
                      default:
                        return;
                    }
                  })}
                  {!view && (
                    <Box my={3} mx={1}>
                      <div className={classes.wrapper}>
                        <Button
                          type="submit"
                          disableElevation
                          disabled={loadingUser}
                          color="primary"
                          fullWidth
                          size="large"
                          variant="contained"
                          onClick={() => {
                            if (isValid) {
                              setSnackbar({
                                open: true,
                                message:
                                  "Please fill the specified errors in the form.",
                                type: "error",
                              });
                            }
                          }}
                        >
                          Submit
                        </Button>
                        {loadingOrder && (
                          <CircularProgress
                            size={30}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
                    </Box>
                  )}
                  <Box my={20}></Box>
                </form>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Box mb={20}></Box>
    </Box>
  );
}
