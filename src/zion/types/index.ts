import { GridSize } from "@material-ui/core";
import { MuiAutocompleteComponentProps, muiRadioGroupComponentProps, MuiSelectComponentProps, MuiTextFieldProps } from "../components/mui/types";
import { UseFormReturn, FieldValues } from 'react-hook-form';
import { DefaultComponentProps } from "@material-ui/core/OverridableComponent";

export type DesignSystemMUI =
  "Mui" | "mui" | "MUI";

export type DesignSystem =
  DesignSystemMUI | "";

export type Widgets =
  "text"
  | "select"
  | "radio"
  | "autocomplete"
  | "slider"
  | "check"
  | "switch"
  | "custom"
  | "textarea";

export type SchemaRules = any;

export interface Grid {
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
}

export interface SchemaBase {
  widget: Widgets;
  name: string;
  label: string;
  rules?: SchemaRules;
  default?: any;
  component?: (zionForm: UseFormReturn<FieldValues>, designSystem: DesignSystem) => React.ReactElement<any>;
  grid?: Grid,
}

export type WidgetTypes =
  MuiTextFieldProps |
  MuiSelectComponentProps |
  muiRadioGroupComponentProps |
  MuiAutocompleteComponentProps;

export type Schema = SchemaBase & WidgetTypes

export type Skeleton =
  "grid"
  | "step-form-horizontal"
  | "step-form-vertical";

export interface ZionFormSchema {
  grid?: Grid;
  title?: string;
  schema?: Schema[];
  gridContainer?: DefaultComponentProps<any>;
}

export type ZionForm = {
  grid?: Grid;
  stepper?: any;
  stepperSuccess?: string;
  skeleton?: Skeleton;
  gridContainer?: DefaultComponentProps<any>;
  formSchemas?: ZionFormSchema[];
};

// export other types...
export * from '../components/mui/types'