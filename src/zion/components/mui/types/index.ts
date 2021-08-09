import { SchemaBase } from '../../../types/index';
import { BaseTextFieldProps, OutlinedTextFieldProps, RadioGroupProps, SelectProps } from "@material-ui/core";
import { FilterOptionsState, UseAutocompleteProps } from '@material-ui/lab'

// Text Component Types
export type MuiTextFieldProps = BaseTextFieldProps;
export type MuiTextFieldTypeProps = SchemaBase & BaseTextFieldProps;

// select components options
export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}
export type SelectOptions = {
  options: SelectOption[]
}

// loading state option
export interface LoadingState {
  loading?: boolean;
}

// Select Component Types
export type MuiSelectComponentProps = SelectProps & SelectOptions;
export type MuiSelectComponentTypeProps = SchemaBase & SelectProps & SelectOptions;

// Radio Group Component
export type Orientation = "row" | "column"
export type RadioComponent = {
  orientation: Orientation
}
export type muiRadioGroupComponentProps = RadioGroupProps & SelectOptions & RadioComponent;
export type MuiRadioGroupComponentTypeProps = SchemaBase & RadioGroupProps & SelectOptions & RadioComponent;


// Autocomplete Component
export type AutocompleteMiscellaneous = {
  loading?: boolean;
  options: any[];
  optionLabel: string;
  optionValue: string;
  group?: boolean;
}
export type MuiAutocompleteComponentProps = UseAutocompleteProps<unknown, undefined, undefined, undefined> & FilterOptionsState<SelectOptions> & OutlinedTextFieldProps & AutocompleteMiscellaneous;
export type MuiAutocompleteComponentTypeProps = SchemaBase & UseAutocompleteProps<unknown, undefined, undefined, undefined> & FilterOptionsState<SelectOptions> & OutlinedTextFieldProps & AutocompleteMiscellaneous;

// Slider Component
export type MuiSliderComponentProps = UseAutocompleteProps<unknown, undefined, undefined, undefined> & SelectOptions;
export type MuiSliderComponentTypeProps = SchemaBase & UseAutocompleteProps<unknown, undefined, undefined, undefined> & SelectOptions;
