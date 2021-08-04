import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';

const useStylesLoader = makeStyles((theme: Theme) => createStyles({
  root: {
    position: 'fixed',
    top: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99500,
    background: 'rgba(0,0,0,0.8)',
  },
  card: {
    position: 'relative',
    width: '200px',
    height: '200px',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  top: {
    color: theme.palette.type === 'light' ? '#78B' : '#1a92ff',
    animationDuration: '.6s',
    position: 'relative',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

interface IProps {
  size?: number;
  thickness?: number;
  props?: CircularProgressProps;
}

const OverlayLoading = ({ size = 50, thickness = 3, ...props }: IProps) => {
  const classes = useStylesLoader();

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.top}
          classes={{
            circle: classes.circle,
          }}
          size={size}
          thickness={thickness}
          {...props}
        />
      </div>
    </div>
  );
};

export default OverlayLoading;
