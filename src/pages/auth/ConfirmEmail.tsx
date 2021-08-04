import React, { useEffect, useState } from 'react';

import firebase from 'firebase';
import { useHistory } from 'react-router';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { useFireMutation, useFireQueryData } from '../../FireQuery';
import { useSnackBar } from '../../contexts/snackbar/SnackBarContext';
import { redirectUserHome } from '../../utils/userRoleUtils';
import verifyingEmailIllustration from '../../assets/auth/verifyingEmail.svg';

const ConfirmEmail = () => {
  const history = useHistory();
  const [loadingStat, setLoadingStat] = useState(false);
  const {
    success, mutate,
  } = useFireMutation('users');
  const [isUserSet, setIsUserSet] = useState(false);
  const { setSnackbar } = useSnackBar();
  const {
    fetchDataAsync,
  } = useFireQueryData('users');

  useEffect(() => {
    setLoadingStat(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        mutate('UPDATE', user.uid, {
          updateing: false,
          isEmailVerified: user.emailVerified,
        });

        fetchDataAsync(user.uid)
          .then((res: any) => {
            if (res) {
              setIsUserSet(true);
              setLoadingStat(false);
              const redirect = redirectUserHome(res?.roles);
              history.push(redirect);
            }
          })
          .catch(() => {
            setSnackbar({
              open: true,
              type: 'error',
              message: 'Whoops error occurred try to refresh the page...',
            });
            setLoadingStat(false);
          });
        setLoadingStat(false);
      }
    });
  }, []);

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
        <img
          style={{ maxWidth: '400px' }}
          width="80%"
          src={verifyingEmailIllustration}
          alt="Verify Email"
        />
      </Box>
      <Box fontWeight={800} fontSize="2rem" textAlign="center">
        {success ? 'All done you can proceed to login!' : 'Updating account info...'}
      </Box>
      <Box fontWeight={500} fontSize="1rem" textAlign="center">
        {success ? 'Email linked successfully' : 'Linking email with account'}
      </Box>
      <Box style={{ position: 'relative' }} mt={2}>
        <Box>
          {!loadingStat && (
            <Button
              disableElevation
              color="primary"
              variant="contained"
              size="large"
              onClick={() => {
                window.location.reload();
              }}
            >
              Change Password
            </Button>
          )}
          {!loadingStat || !success || (!isUserSet && <CircularProgress />)}
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmEmail;
