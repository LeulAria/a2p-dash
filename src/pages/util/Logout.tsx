import React from 'react';
import { Box, Button } from '@material-ui/core';
import logoutIllustration from '../../assets/auth/logout.svg';

const Logout = () => (
  <Box
    display="flex"
    width="100vw"
    height="90vh"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
  >
    <Box maxWidth={400} maxHeight={400}>
      <img
        style={{ maxWidth: '400px' }}
        width="80%"
        src={logoutIllustration}
        alt="Logout"
      />
    </Box>
    <Box fontWeight={800} fontSize="2rem" textAlign="center">
      Logged out Successfully...
    </Box>
    <Button
      disableElevation
      color="primary"
      variant="contained"
      onClick={() => {
        // window.location.reload();
        // history.push(redirectUserLogin(user));
      }}
    >
      GO TO HOME
    </Button>
  </Box>
);

export default Logout;
