import React from 'react';
import { Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AssignmentIcon from '@material-ui/icons/Assignment';
import loginIllustration from '../../assets/auth/accountBlocked.svg';

const AdminHome = () => {
  const history = useHistory();

  return (
    <Box
      display="flex"
      width="100vw"
      height="90vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box maxWidth={400} maxHeight={400}>
        <img style={{ maxWidth: '400px' }} width="80%" src={loginIllustration} alt="Login" />
      </Box>
      <Box fontWeight={800} fontSize="2rem" textAlign="center">
        A2P Admin Panel
      </Box>
      <Box mt={3} display="flex">
        <Box m={1}>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            onClick={() => {
              history.push('/auth-admin/login');
            }}
          >
            <LockOpenIcon />
            &nbsp;&nbsp; Login
          </Button>
        </Box>
        <Box m={1}>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            onClick={() => {
              history.push('/auth-admin/signup');
            }}
          >
            <AssignmentIcon />
            &nbsp;&nbsp; Signup
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminHome;
