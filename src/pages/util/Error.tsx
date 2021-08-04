import { Box, Button, CircularProgress } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RefreshIcon from '@material-ui/icons/Refresh';
import { AuthContext } from '../../contexts/auth/AuthProvider';
import firebase from '../../firebase';
import accountBlockedIllustration from '../../assets/auth/accountBlocked.svg';

const Blocked = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [isBlocked, setIsBlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .onSnapshot(
      (res) => {
        const data = res.data();
        if (data) {
          setIsBlocked(data?.isBlocked);
          if (data?.isStuff) {
            if (!(data?.accountStatus === 'approved')) {
              if (data.roles.isAdmin) {
                history.push('/app/dashboard-admin');
              } else if (data.roles.isClient) {
                history.push('/app/user/orders');
              } else if (data.roles.isSalesSupport) {
                history.push('/app/orders');
              } else if (data.roles.isTechSupport) {
                history.push('/app/subscribers');
              } else {
                history.push('/');
              }
            }
          }
          if (!data?.isBlocked) {
            if (!data.isStuff) {
              history.push('/app/user/orders');
            } else if (data.isStuff) {
              if (data.roles.isAdmin) {
                history.push('/app/dashboard-admin');
              } else if (data.roles.isClient) {
                history.push('/app/user/orders');
              } else if (data.roles.isSalesSupport) {
                history.push('/app/orders');
              } else if (data.roles.isTechSupport) {
                history.push('/app/subscribers');
              } else {
                history.push('/');
              }
            } else {
              history.push('/');
            }
          }
        }
        if (!res) {
          localStorage.clear();
        }
      },
      (err) => {
        console.log('USER NOT FOUND: ', err.code);
      },
    );

  const reloadState = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (!isBlocked) {
        window.location.reload();
      }
    }, 600);
  };

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
          src={accountBlockedIllustration}
          alt="Account Blocked"
        />
      </Box>
      <Box fontWeight={800} fontSize="2rem" textAlign="center">
        Account is in blocked state.
      </Box>
      <Box fontWeight={500} fontSize="1rem" textAlign="center">
        Your account will be available once its active try refreshing.
      </Box>
      <Box mt={3}>
        <Button
          disableElevation
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ position: 'relative' }}
          onClick={() => {
            reloadState();
          }}
        >
          <RefreshIcon />
          Refresh
          {loading && (
            <CircularProgress size="30px" style={{ position: 'absolute' }} />
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default Blocked;
