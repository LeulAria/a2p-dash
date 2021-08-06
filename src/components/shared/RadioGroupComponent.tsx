import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import uuid from "../../utils/uuid";

export default function RadioGroupComponent({
  field,
  errors,
  variant = "outlined",
  label = "",
  disabled = false,
  name,
  menus = [],
}: any) {
  return (
    <div>
      <FormControl component="fieldset" style={{ marginTop: "1rem" }}>
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          id="demo-simple-select"
          required
          label={label}
          variant={variant}
          {...field}
          disabled={disabled}
          helperText={errors[`${name}`] ? errors[`${name}`].message : null}
          error={errors[`${name}`]}
          style={{ marginTop: 1, display: "flex" }}
          row
        >
          {menus.map((menu: any) => (
            <FormControlLabel
              key={uuid()}
              value={menu.value}
              control={<Radio />}
              label={menu.label}
            />
          ))}
        </RadioGroup>
        <FormHelperText style={{ color: "red" }}>
          {errors.solutions ? errors.solutions.message : null}
        </FormHelperText>
      </FormControl>
    </div>
  );
}
