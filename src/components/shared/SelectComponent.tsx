import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import uuid from '../../utils/uuid';

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    marginLeft: '-0.2rem',
  },
}));

export default function SelectComponent({
  field,
  errors,
  variant = 'outlined',
  name,
  menus = [],
}: any) {
  const classes = useStyles();

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel
          htmlFor="outlined-age-native-simple"
          classes={{
            root: classes.root,
          }}
        >
          {name}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          required
          label="Solutions"
          variant={variant}
          {...field}
          helperText={errors[`${name}`] ? errors[`${name}`].message : null}
          error={errors[`${name}`]}
          style={{ marginTop: 1 }}
        >
          {menus.map((menu: any) => (
            <MenuItem key={uuid()} value={menu.value}>
              {menu.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText style={{ color: 'red' }}>
          {errors.solutions ? errors.solutions.message : null}
        </FormHelperText>
      </FormControl>
    </div>
  );
}
