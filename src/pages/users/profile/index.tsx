import React, { useContext } from 'react';
import {
  Avatar, Box, Button, Grid, Theme, makeStyles,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { AuthContext } from '../../../contexts/auth/AuthProvider';
import UserEditDialog from './UserEditDialog';

const useStyles = makeStyles((theme: Theme) => ({
  parentBox: {
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
    },
  },
  userProfile: {
    maxWidth: 400,
    width: '80%',
    margin: 'auto',
  },
  userProfileContainer: {},
  profileInfoContianer: {
    position: 'relative',
    background: '#45B',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1504192010706-dd7f569ee2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80)',
    backgroundPosition: 'center',
    width: '100%',
    minHeight: '80px',
    height: '30vh',
    maxHeight: '190px',
    padding: '1rem 2rem',
    color: '#FFF',
    borderRadius: 10,
  },
  userProfileAvatar: {
    position: 'absolute',
    bottom: '-50px',
    left: '10%',
    width: '20vw',
    height: '20vw',
    minWidth: '70px',
    minHeight: '70px',
    maxWidth: '120px',
    maxHeight: '120px',
    border: '5px solid #FFF',
  },
  userProfileDetial: {
    marginTop: '1rem',
    width: '100%',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: '1.6rem',
    textAlign: 'center',
  },
  profileDetailInfo: {
    fontWeight: 700,
  },
  profileBG: {
    backgroundColor: '#e0fff9',
    minHeight: 100,
    backgroundImage:
      "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%2395aba6' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23a2a6a3'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E')",
  },
}));

export default function PageForm() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box width="100%" height="100%" px={5} mt={4}>
        <Box
          display="flex"
          height={50}
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
        >
          <Box className="title" fontWeight={900} fontSize="1.5rem">
            Profile
          </Box>
          <Button variant="outlined" onClick={handleClickOpen} size="small">
            <EditIcon />
            &nbsp;Edit Profile&nbsp;
          </Button>
        </Box>
        <Box className={classes.profileInfoContianer}>
          <Grid container justifyContent="center">
            <Grid item sm={10} md={6} lg={4}>
              <Avatar className={classes.userProfileAvatar} />
            </Grid>
          </Grid>
        </Box>

        <Box
          className={classes.userProfile}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box className={classes.userProfileContainer}>
            <Box className={classes.userProfileDetial}>
              <Box className={classes.userName} fontWeight={500}>
                {user.clientName || user.userName}
              </Box>
              <Box textAlign="center">{user.email}</Box>
              {user.clientName && (
                <Box mt={2} textAlign="center">
                  <Box>
                    <span className={classes.profileDetailInfo}>
                      Company URL:
                    </span>
                    {user.companyUrl}
                  </Box>
                  <Box>
                    <span
                      className={classes.profileDetailInfo}
                    >
                      Phone number:
                    </span>
                    {user.phoneNumber}
                  </Box>
                  {/* <Box><span className={classes.profileDetailInfo}>Joined At: </span>{user.createdAt && user.createdAt?.toDate().toDateString()}</Box> */}
                </Box>
              )}
              {user.userName && (
                <Box mt={2} textAlign="center">
                  <Box>
                    <span
                      className={classes.profileDetailInfo}
                    >
                      User Role:
                    </span>
                    {user.role}
                  </Box>
                  {/* <Box><span className={classes.profileDetailInfo}>Phonenumber: </span>{user.phoneNumber}</Box> */}
                  {/* <Box><span className={classes.profileDetailInfo}>Joined At: </span>{user.createdAt && user.createdAt?.toDate().toDateString()}</Box> */}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <UserEditDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
    </div>
  );
}
