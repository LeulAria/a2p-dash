import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Hidden,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from 'react-router';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import ethioTelecom from '../../../assets/logos/ethiotelecom.svg';
import teklogixLogo from '../../../assets/logos/teclogix.png';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    overflow: 'none',
    maxWidth: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logos: {
    alignSelf: 'center',
    maxWidth: '100px',
    minHeight: '20px',
    maxHeight: '33px',
    height: '9vh',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'left',
      maxWidth: '100px',
      minHeight: '20px',
      maxHeight: '30px',
      height: '9vh',
    },
  },
  regButton: {
    backgroundColor: '#0068BF',
    color: 'white',
    borderRadius: '5px',
    fontSize: '12px',
    padding: '0.4rem 2rem',
    '&:hover': {
      background: '#67B',
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: '4rem',
    },
  },
}));

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = ({ navs = true }: { navs?: boolean }) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown'
        && ((event as React.KeyboardEvent).key === 'Tab'
          || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  const handleClick = (event: any) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    toggleDrawer(false);
  };

  return (
    <>
      <CssBaseline />
      <HideOnScroll>
        <AppBar elevation={0} color="transparent" style={{ background: '#FFF' }}>
          <Toolbar style={{ boxShadow: '0 1px 15px rgba(0,0,0,0.1)' }} color="#FFF">
            <Container>
              <Box my={2} display="flex" alignItems="center">
                <Box display="flex" justifyContent="space-between" maxWidth={240}>
                  <Box mx={1}>
                    <a href="https://www.ethiotelecom.et/" target="_blank" rel="noreferrer">
                      <img src={ethioTelecom} className={classes.logos} alt="EthioTelecom" />
                    </a>
                  </Box>
                  <Box mx={1}>
                    <a href="https://www.teklogixinc.com/" target="_blank" rel="noreferrer">
                      <img src={teklogixLogo} className={classes.logos} alt="Teclogix" />
                    </a>
                  </Box>
                </Box>

                <Box ml="auto">
                  {/* Mobile Nav Menu */}
                  <Box>
                    <Hidden mdUp>
                      <IconButton onClick={toggleDrawer(true)}>
                        <MenuIcon />
                      </IconButton>
                    </Hidden>
                  </Box>

                  <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                    <Box minWidth={230}>
                      <ListItem
                        button
                        onClick={(e: any) => {
                          handleClick(e);
                        }}
                      >
                        <ListItemIcon>
                          <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Register" />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => {
                          history.push('/user/login');
                        }}
                      >
                        <ListItemIcon>
                          <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                      </ListItem>
                    </Box>
                  </Drawer>
                  {/* Mobile Nav Menu */}

                  <Box>
                    <Hidden smDown>
                      {navs && (
                        <Box display="flex" alignItems="center">
                          <Box mx={1}>
                            <Button
                              className={classes.regButton}
                              onClick={(e: any) => {
                                handleClick(e);
                              }}
                            >
                              <Box fontWeight={600}>Register</Box>
                            </Button>
                          </Box>
                          <Box my={1} mx={1}>
                            <Button
                              className={classes.regButton}
                              onClick={() => {
                                history.push('/user/login');
                              }}
                            >
                              <Box fontWeight={600}>Login</Box>
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Hidden>
                  </Box>
                </Box>
              </Box>
            </Container>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
};

export default Navbar;
