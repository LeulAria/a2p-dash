import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function TextComponent({
  field,
  label,
  errors,
  name,
  type,
  variant,
  autofocus = false,
  value,
  disabled = false,
  size = 'medium',
  hidden = false,
}: any) {
  return (
    <TextField
      variant={variant}
      // margin="dense"
      fullWidth
      label={label}
      {...field}
      size={size}
      autoFocus={autofocus}
      type={type}
      helperText={errors[`${name}`] ? errors[`${name}`].message : null}
      error={errors[`${name}`]}
      disabled={disabled}
      value={hidden ? '' : value}
      style={{ marginTop: '.8rem' }}
    />
  );
}
