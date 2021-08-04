import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Typography } from '@material-ui/core';

const NotFound: React.FC = () => (
  <>
    <Helmet>
      <title>404 | Page Not Found</title>
    </Helmet>
    <Box
      style={{
        marginTop: '18vh',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Typography
          align="center"
          color="textPrimary"
          variant="h4"
          style={{
            fontWeight: 800,
          }}
        >
          404: The page you are looking for isn’t here
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          You either tried some shady route or you came here by mistake.
          Whichever it is, try using the navigation
        </Typography>
        <Box style={{ textAlign: 'center' }}>
          <img
            alt="Under development"
            src="/static/img/notfound.svg"
            style={{
              marginTop: 50,
              display: 'inline-block',
              maxWidth: '100%',
              width: 560,
            }}
          />
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;
