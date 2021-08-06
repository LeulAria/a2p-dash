import React from "react";
import {
  Box,
  Card,
  createStyles,
  Hidden,
  IconButton,
  InputBase,
  makeStyles,
  Theme,
} from "@material-ui/core";
import ChatCard from "../../../../components/chat/ChatCard";
import SendIcon from "@material-ui/icons/Send";
import MenuIcon from "@material-ui/icons/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useState} from "react";
import {useFireQuery} from "../../../../FireQuery";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chatPage: {
      width: "100%",
      display: "flex",
      justifyContent: "space-evenly",
    },
    chatContainerTop: {
      flexBasis: 950,
      minHeight: "calc(100vh - 200px)",
      maxHeight: "calc(100vh - 2000px)",
      margin: "auto",
      position: "relative",
      borderRadius: 10,
      border: "1px solid #e7e7e7",
      display: "flex",
      flexDirection: "column",
    },
    chatBar: {
      display: "flex",
      alignItems: "center",
      padding: "1rem",
      position: "sticky",
      zIndex: 400,
      borderRadius: 0,
      borderBottom: "1px solid #e7e7e7",
      maxHeight: "50px",
    },
    chatContainer: {
      display: "flex",
      paddingTop: 5,
      flexGrow: 1,
      overflowY: "auto",
    },
    chatContainerMob: {
      display: "block",
      paddingTop: 5,
      flexGrow: 1,
      overflowY: "auto",
    },
    chatMembers: {
      borderRight: "1px solid #e7e7e7",
      flex: 3,
      width: "100%",
      overflowY: "auto",
      overflowX: "hidden",
    },
    chatMembersMobile: {
      position: "absolute",
      overflowY: "auto",
      overflowX: "hidden",
      borderRight: "1px solid #e7e7e7",
      top: 50,
      left: 0,
      zIndex: 500,
      width: "80%",
      height: "calc(100% - 110px)",
      background: "#fff",
      boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
      transform: "translateX(0px)",
      transition: "all .5s",
    },
    chatMemberMobileHidden: {
      display: "none",
      transform: "translateX(-1000px)",
      transition: "all .5s",
    },
    chatContent: {
      flex: 6,
      overflowY: "auto",
      overflowX: "hidden",
      padding: "1rem",
    },
    sendChat: {
      background: "#FFF",
      margin: "0 7%",
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      padding: "0 1rem",
      border: "1px solid #e7e7e7",
    },
    input: {
      fontWeight: 600,
      flex: 1,
    },
    chatBarType: {
      display: "flex",
      alignItems: "center",
      padding: "1rem",
      position: "sticky",
      zIndex: 400,
      borderTop: "1px solid #e7e7e7",
      maxHeight: "70px",
      background: "#f0f0f0",
      borderRadius: 0,
    },
    chatSidebar: {
      flex: 1,
      flexBasis: 250,
      margin: "4%",
    },
    chatSideBarConten: {
      padding: "1rem",
      border: "1px solid #e7e7e7",
    },
    chatSettings: {
      margin: "1rem .2rem",
    },
  })
);

const MiniChat = ({
  clientName,
  customerEmail,
  closeChat,
}: {
  clientName: string;
  customerEmail: string;
  closeChat: () => void;
}) => {
  const classes = useStyles();
  const [openChat, setOpenChat] = useState(false);
  const matches = useMediaQuery("(max-width:765px)");
  const {data, loading, error} = useFireQuery("chats", {
    query: [],
  });

  return (
    <Box className={classes.chatPage}>
      <Card elevation={0} className={classes.chatContainerTop}>
        <Card className={classes.chatBar} elevation={0}>
          <Hidden mdUp>
            <IconButton onClick={() => setOpenChat(!openChat)}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Box
            width="100%"
            fontWeight={700}
            fontSize="1rem"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Box fontWeight={500}>{clientName}</Box>
              <Box fontWeight={400} fontSize=".8rem" color="#666">
                {customerEmail}
              </Box>
            </Box>
            <IconButton onClick={closeChat}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Card>
        <Box className={!matches ? classes.chatContainer : classes.chatContainerMob}>
          <Box className={classes.chatContent}>
            {Array(10)
              .fill(0)
              .map((a, i) => (
                <Box key={i}>
                  <ChatCard me={i % 2 == 0} />
                </Box>
              ))}
          </Box>
        </Box>
        <Card className={classes.chatBarType} elevation={0}>
          <Box className={classes.sendChat} flexGrow={1} flex={5}>
            <Box flex={1}>
              <InputBase
                className={classes.input}
                placeholder="Type message..."
                defaultValue=""
                inputProps={{"aria-label": "naked"}}
              />
            </Box>
            <Box display="flex" alignSelf="center">
              <IconButton>
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Card>
      </Card>
    </Box>
  );
};

export default MiniChat;
