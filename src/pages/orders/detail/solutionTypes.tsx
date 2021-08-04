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

export default function SimpleSelect({ field, errors, disabled }: any) {
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
          Solutions
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          required
          variant="outlined"
          disabled={disabled}
          label="Solutions"
          {...field}
          helperText={errors.solutions ? errors.solutions.message : null}
          error={errors.solutions}
        >
          <MenuItem value="A2P API">A2P API</MenuItem>
          <MenuItem value="SMS Campaign">SMS Campaign</MenuItem>
          <MenuItem value="Both">Both</MenuItem>
        </Select>
        <FormHelperText style={{ color: 'red' }}>
          {errors.solutions ? errors.solutions.message : null}
        </FormHelperText>
      </FormControl>
    </div>
  );
}
