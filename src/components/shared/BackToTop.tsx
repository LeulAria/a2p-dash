import React from 'react';
import {
  IconButton, Theme, createStyles, makeStyles,
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    position: 'fixed',
    bottom: 30,
    right: 10,
    zIndex: 10000,
    boxShadow: '0 1px 10px rgba(0,0,0,0.2)',
    background: theme.palette.type === 'dark' ? '#78B' : '#45B',
    color: '#FFF',
    transition: 'all .2s',
    '&:hover': {
      background: theme.palette.type === 'dark' ? '#56B' : '#67B',
      color: '#FFF',
    },
  },
}));

const BackToTop = () => {
  const classes = useStyles();
  const [showScroll, setShowScroll] = React.useState(false);

  const checkScrollToTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', checkScrollToTop);
  }

  return showScroll ? (
    <IconButton
      onClick={scrollTop}
      classes={{
        root: classes.root,
      }}
    >
      <ExpandLessIcon />
    </IconButton>
  ) : null;
};

export default BackToTop;
