import React, { useContext, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  Hidden,
  IconButton,
  InputBase,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ChatPersonCard from '../../components/chat/ChatPersonCard';

import { useFireQuery } from '../../FireQuery';
import { AuthContext } from '../../contexts/auth/AuthProvider';
import ChatContent from './ChatContent';
import NoChat from './NoChat';
import firebase, { timestamp } from '../../firebase';
import { useSnackBar } from '../../contexts/snackbar/SnackBarContext';
import uuid from '../../utils/uuid';

const useStyles = makeStyles((theme: Theme) => createStyles({
  chatPage: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    select: 'none',
  },
  chatContainerTop: {
    flexBasis: 950,
    minHeight: 'calc(100vh - 130px)',
    maxHeight: 'calc(100vh - 130px)',
    margin: 'auto',
    position: 'relative',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'column',
    border: theme.palette.type === 'dark' ? '1px solid #222' : '1px solid #ddd',
    // boxShadow: "0 1px 15px rgba(0,0,0,0.2)"
  },
  chatBar: {
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    zIndex: 400,
    minHeight: 45,
    borderRadius: 0,
    borderBottom:
        theme.palette.type === 'dark' ? '1px solid #343536' : '1px solid #ddd',
    maxHeight: '50px',
  },
  chatBarLeft: {
    flex: 3,
    width: '100%',
  },
  chatContainer: {
    display: 'flex',
    paddingTop: 5,
    flexGrow: 1,
    overflowY: 'auto',
  },
  chatContainerMob: {
    display: 'block',
    paddingTop: 5,
    flexGrow: 1,
    overflowY: 'auto',
  },
  chatMembers: {
    borderRight:
        theme.palette.type === 'dark' ? '1px solid #343536' : '1px solid #ccc',
    flex: 3,
    width: '100%',
    marginTop: '-5px',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  chatMembersMobile: {
    position: 'absolute',
    overflowY: 'auto',
    overflowX: 'hidden',
    borderRight: '1px solid #e7e7e7',
    top: 50,
    left: 0,
    zIndex: 500,
    width: '80%',
    height: 'calc(100% - 110px)',
    background: '#fff',
    transform: 'translateX(0px)',
    transition: 'all .5s',
  },
  chatMemberMobileHidden: {
    display: 'none',
    transform: 'translateX(-1000px)',
    transition: 'all .5s',
  },
  chatContent: {
    flex: 6,
    minHeight: '100%',
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  chatMessages: {
    flexGrow: 1,
    flex: 1,
    padding: '0 5%',
    maxHeight: 'calc(100% - 60px)',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '100%',
    position: 'relative',
  },
  chatBarType: {
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    height: '60px',
    width: '100%',
    bottom: 0,
    zIndex: 400,
    borderRadius: 0,
  },
  sendChat: {
    border: theme.palette.type === 'dark' ? '1px solid #222' : '1px solid #999',
    boxShadow:
        theme.palette.type === 'dark'
          ? '0 1px 10px rgba(0,0,0,0.1)'
          : '0 1px 10px rgba(0,0,0,0.1)',
    margin: '10px 7%',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    '&:hover': {
      border: '1px solid #56B',
    },
  },
  chatSearch: {
    borderRadius: 0,
    borderBottom:
        theme.palette.type === 'dark' ? '1px solid #222' : '1px solid #ddd',
  },
  input: {
    fontSize: '.9rem',
    fontWeight: 500,
    flex: 1,
  },
  chatSidebar: {
    flex: 4,
    flexBasis: 350,
    marginLeft: '1rem',
  },
  chatSideBarContent: {
    padding: '1rem',
    border: theme.palette.type === 'dark' ? '1px solid #343536' : '1px solid #ddd',
  },
  chatSettings: {
    margin: '.4rem .5rem',
  },
}));

const Chat = () => {
  const classes = useStyles();
  const [openChat, setOpenChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const matches = useMediaQuery('(max-width:765px)');
  const { user } = useContext(AuthContext);
  const userQueryId = user.isStuff ? 'sid ==' : 'uid ==';
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [currentChatUsers, setCurrentChatUsers] = useState<any>(null);
  const [currentOpenedChat, setCurrentOpenedChat] = useState('');
  const { setSnackbar } = useSnackBar();
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [userOrder, setUserOrder] = useState<any>({});

  const { data: onlines } = useFireQuery('online', {
    snapshotListener: true,
  });

  const { data, loading } = useFireQuery('chats', {
    query: [[userQueryId, user?.uid]],
    snapshotListener: true,
  });

  const fetchChatStatus = () => {
    if (data) {
      if (user.isStuff) {
        Promise.all(
          data.map((d: any) => new Promise((response, reject) => {
            firebase
              .firestore()
              .doc(`/users/${d.uid}`)
              .get()
              .then((res) => {
                response(res.data());
              })
              .catch((err) => {
                reject(err);
              });
          })),
        ).then((res: any) => {
          const usersWithOnline = data.map((d: any, i: number) => ({
            ...d,
            isOnline: res[i]?.isOnline || false,
          }));
          setChats(usersWithOnline);
          setFilteredChats(usersWithOnline);
        });
      } else {
        Promise.all(
          data.map((d: any) => new Promise((response, reject) => {
            firebase
              .firestore()
              .doc(`/users/${d.sid}`)
              .get()
              .then((res) => {
                response(res.data());
              })
              .catch((err) => {
                reject(err);
              });
          })),
        ).then((res: any) => {
          const usersWithOnline = data.map((d: any, i: number) => ({
            ...d,
            isOnline: res[i]?.isOnline || false,
          }));
          setChats(usersWithOnline);
          setFilteredChats(usersWithOnline);
        });
      }
    }
  };

  useEffect(() => {
    if (onlines) {
      fetchChatStatus();
    }
  }, [onlines]);

  useEffect(() => {
    if (data) {
      fetchChatStatus();
    }
  }, [data]);

  useEffect(() => {
    if (currentChatUsers?.uid) {
      setLoadingOrder(true);
      firebase
        .firestore()
        .collection('orders')
        .where('uid', '==', currentChatUsers.uid)
        .get()
        .then((res) => {
          setUserOrder(res.docs[0].data());
          setLoadingOrder(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingOrder(false);
        });
    }
  }, [currentChatUsers]);

  const handleSelectedChatId = (chatId: string) => {
    const currentChat: any = chats.filter((chat: any) => chat.id === chatId)[0];
    setCurrentChatUsers(user.isStuff ? currentChat?.user : currentChat.stuff);
    setCurrentOpenedChat(currentChat?.id);
  };

  const sendChat = () => {
    if (chatInput.length > 0) {
      const message = {
        uid: user.uid,
        msg: chatInput,
        seen: false,
        createdAt: timestamp(),
      };
      if (currentOpenedChat.length > 1) {
        firebase
          .firestore()
          .collection(`/chats/${currentOpenedChat}/messages/`)
          .add(message)
          .then(() => {
            setChatInput('');
          })
          .catch((err) => {
            setSnackbar({
              open: true,
              message: err.code,
              type: 'error',
            });
          });
      } else {
        setSnackbar({
          open: true,
          message: 'Select chat to send message!',
          type: 'error',
        });
      }
    }
  };

  const handleChatInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.currentTarget.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.code === 'Enter') {
      sendChat();
    }
  };

  const handleSendChat = () => {
    sendChat();
  };

  const handleChatPersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredChats(
      chats.filter((c: any) => {
        if (
          c?.user.userName
            .toLocaleLowerCase()
            .includes(e.currentTarget.value.toLocaleLowerCase())
          || c?.stuff.userName
            .toLocaleLowerCase()
            .includes(e.currentTarget.value.toLocaleLowerCase())
        ) {
          return true;
        }
        return false;
      }),
    );
  };

  return (
    <Box>
      {!loading ? (
        chats.length > 0 ? (
          <Box className={classes.chatPage}>
            <Card elevation={0} className={classes.chatContainerTop}>
              <Card className={classes.chatBar} elevation={0}>
                <Box py={2} px={3} display="flex" width="100%">
                  <Box className={classes.chatBarLeft}>
                    <Hidden mdUp>
                      <IconButton onClick={() => setOpenChat(!openChat)}>
                        <MenuIcon />
                      </IconButton>
                    </Hidden>
                    <Box fontWeight={700} fontSize="1rem">
                      Messages
                    </Box>
                  </Box>

                  <Box flex={7} />
                </Box>
              </Card>
              <Box
                className={
                  !matches ? classes.chatContainer : classes.chatContainerMob
                }
              >
                <Box
                  className={`${
                    !matches
                      ? classes.chatMembers
                      : openChat
                        ? classes.chatMembersMobile
                        : classes.chatMemberMobileHidden
                  }`}
                >
                  {matches && openChat && (
                    <Box fontWeight={700} m={2} textAlign="center">
                      Choose a chat
                    </Box>
                  )}
                  <Box style={{ position: 'relative' }}>
                    <Box
                      style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1000,
                      }}
                      mb={1}
                    >
                      <Card elevation={0} className={classes.chatSearch}>
                        <Box
                          p={1}
                          px={2}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                          </svg>
                          <Box ml={1}>
                            <InputBase
                              placeholder="Search user..."
                              onChange={handleChatPersonChange}
                            />
                          </Box>
                        </Box>
                      </Card>
                    </Box>
                    {!loading ? (
                      chats.length > 0 ? (
                        filteredChats.map((chat: any) => (
                          <Box key={uuid()}>
                            <ChatPersonCard
                              user={user.isStuff ? chat.user : chat.stuff}
                              chatId={chat.id}
                              isOnline={chat.isOnline}
                              isSelected={currentOpenedChat === chat.id}
                              selectedChatId={handleSelectedChatId}
                            />
                          </Box>
                        ))
                      ) : (
                        <Box fontWeight={500} textAlign="center" mt={5}>
                          No Chat Available !
                        </Box>
                      )
                    ) : (
                      <CircularProgress />
                    )}
                  </Box>
                </Box>

                <Box className={classes.chatContent}>
                  <Box className={classes.chatMessages}>
                    <ChatContent
                      className={classes.chatMessages}
                      currentOpenedChatId={currentOpenedChat}
                    />
                  </Box>

                  <Card className={classes.chatBarType} elevation={0}>
                    <Box className={classes.sendChat} flexGrow={1} flex={5}>
                      <Box width="100%" display="flex">
                        <InputBase
                          className={classes.input}
                          placeholder="Type message..."
                          defaultValue=""
                          value={chatInput}
                          onChange={handleChatInputChange}
                          inputProps={{ 'aria-label': 'naked' }}
                          onKeyUp={handleKeyPress}
                        />
                      </Box>
                      <Box display="flex" alignSelf="center">
                        <IconButton onClick={handleSendChat}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-send"
                          >
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </IconButton>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </Box>
            </Card>
            <Hidden mdDown>
              <Box className={classes.chatSidebar}>
                {currentChatUsers ? (
                  <Card className={classes.chatSideBarContent} elevation={0}>
                    <Box display="flex" justifyContent="center">
                      <Avatar style={{ width: '100px', height: '100px' }} />
                    </Box>
                    <Box textAlign="center" fontWeight={700} mt={1} fontSize="1rem">
                      {currentChatUsers.userName}
                    </Box>
                    <Box>
                      <Box mt={1} fontWeight={600} textAlign="center">
                        {currentChatUsers.email}
                      </Box>
                      <Box>
                        {loadingOrder ? (
                          <CircularProgress />
                        ) : !currentChatUsers.sid ? (
                          <Box fontSize=".87rem">
                            <Box className={classes.chatSettings}>
                              <Box fontWeight={400} fontSize=".9rem" mr={1}>
                                Company:&nbsp;&nbsp;
                                {userOrder?.companyName}
                              </Box>
                            </Box>
                            <Box className={classes.chatSettings}>
                              <Box fontWeight={400} fontSize=".9rem" mr={1}>
                                Phonenumber:&nbsp;&nbsp;
                                {userOrder?.phoneNumber}
                              </Box>
                            </Box>
                            <Box className={classes.chatSettings}>
                              <Box fontWeight={400} fontSize=".9rem" mr={1}>
                                Status:&nbsp;&nbsp;
                                {userOrder?.status}
                              </Box>
                            </Box>
                            <Box className={classes.chatSettings}>
                              <Box fontWeight={400} fontSize=".9rem" mr={1}>
                                Payment:&nbsp;&nbsp;
                                {userOrder?.isPayed ? 'Payed' : 'Not Payed'}
                              </Box>
                            </Box>
                          </Box>
                        ) : (
                          <Box mt={4} />
                        )}
                      </Box>
                    </Box>
                  </Card>
                ) : (
                  <Box my={5} fontWeight={700} fontSize="1.1rem" textAlign="center">
                    No Chat Selected
                  </Box>
                )}
              </Box>
            </Hidden>
          </Box>
        ) : (
          <Box>
            <NoChat fetchChatStatus={fetchChatStatus} />
          </Box>
        )
      ) : (
        <Box
          width="100%"
          height="50vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
          <Box fontWeight={600} mt={2}>
            Loading...
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Chat;
