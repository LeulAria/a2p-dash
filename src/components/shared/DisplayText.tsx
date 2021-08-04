import React from 'react';
import {
  Box, Grid, createStyles, makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  displayFieldContainer: {},
  fieldTitle: {
    fontWeight: 700,
  },
}));

const DisplayText = ({ title, value }: { title: string; value: string }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.displayFieldContainer} item xs={12} sm={6} lg={3}>
      <Box className={classes.fieldTitle}>{title}</Box>
      <Box>{value}</Box>
    </Grid>
  );
};

export default DisplayText;
