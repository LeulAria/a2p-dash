import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { InputLabel } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({
  lable: {
    marginLeft: ".8rem",
  },
  formControl: {
    marginTop: theme.spacing(1),
    // minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AuthSelectors(user: any) {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl} fullWidth>
        <InputLabel
          classes={{
            root: classes.lable,
          }}
        >
          Role
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...user}
          name="solutions"
          required
          variant="outlined"
          placeholder="Services"
        >
          <MenuItem value="TECH_SUPPORT">TECH SUPPORT</MenuItem>
          <MenuItem value="SALES_SUPPORT">SALES SUPPORT</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
