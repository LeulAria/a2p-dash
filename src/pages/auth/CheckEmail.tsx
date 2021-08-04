import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { useParams } from 'react-router';
import confirmEmailIllustration from '../../assets/auth/confirmEmail.svg';

const CheckEmail = () => {
  const param = useParams<{ email: string }>();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (param) {
      setEmail(param?.email);
    }
  }, []);

  return (
    <Box
      display="flex"
      width="100vw"
      height="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box maxWidth={400} maxHeight={400}>
        <img
          style={{ maxWidth: '400px' }}
          width="80%"
          src={confirmEmailIllustration}
          alt="Confirm Email"
        />
      </Box>
      <Box fontWeight={800} fontSize="2rem" textAlign="center">
        Wohoo your account is ready!
      </Box>
      <Box fontWeight={500} fontSize="1rem" textAlign="center">
        We Have sent an Email
        {' '}
        <a href="https://mail.google.com/" style={{ color: '#34C' }}>
          {email ? `to ${email}` : ''}
        </a>
        {' '}
        verify to proceed...
      </Box>
    </Box>
  );
};

export default CheckEmail;
