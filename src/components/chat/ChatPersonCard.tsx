import React from 'react';
import {
  Box,
  ButtonBase,
  Theme,
  createStyles,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) => createStyles({
  chatsMember: {
    display: 'flex',
    padding: ' 1rem',
    borderRadius: 10,
    margin: '.3rem',
    width: '100%',
    transition: '.4s',
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.type === 'dark' ? '#333' : '#ddd',
    },
  },
  currentSelectedChat: {
    background: theme.palette.type === 'dark' ? '#348' : '#45B',
    color: '#FFF',
    boxShadow: '0 1px 10px 1px rgba(0,0,0,0.2)',
    '&:hover': {
      background: theme.palette.type === 'dark' ? '#348' : '#45B',
    },
  },
}));

const StyledBadge = withStyles((theme: Theme) => createStyles({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const ChatPersonCard = ({
  user,
  selectedChatId,
  chatId,
  isSelected,
  isOnline,
}: any) => {
  const classes = useStyles();

  return (
    <ButtonBase
      style={{
        width: '100%',
        fontFamily: 'Inter',
        padding: 0,
        margin: 0,
        borderRadius: 10,
      }}
    >
      <Box
        className={`${classes.chatsMember} ${
          isSelected && classes.currentSelectedChat
        }`}
        onClick={() => {
          selectedChatId(chatId);
        }}
      >
        <Box mr={2}>
          {isOnline ? (
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              variant="dot"
            >
              <Avatar
                style={{ width: '30px', height: '30px' }}
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
              />
            </StyledBadge>
          ) : (
            <Avatar
              style={{ width: '30px', height: '30px' }}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
          )}
        </Box>
        <Box>
          <Box fontSize=".9rem" fontWeight={700} textAlign="left">
            {user?.userName}
          </Box>
          <Box fontWeight={500}>{user?.email.substring(0, 18)}</Box>
        </Box>
      </Box>
    </ButtonBase>
  );
};

export default ChatPersonCard;
