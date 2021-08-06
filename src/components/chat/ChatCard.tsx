import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import {
  Avatar, Box, Theme, createStyles, makeStyles,
} from "@material-ui/core";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AuthContext } from "../../contexts/auth/AuthProvider";

dayjs.extend(relativeTime);

const useStyles = makeStyles((theme: Theme) => createStyles({
  chatContainer: {
    width: "100%",
    minHeight: "100%",
  },
  chatMsgContainer: {
    display: "flex",
    justifyContent: "space-between",
    // border: "1px solid #333",
    width: "100%",
  },
  chatUiContainer: {
    // border: "1px solid #333",
  },
  chatUI: {
    flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    minHeight: "35px",
    color: theme.palette.type === "dark" ? "#111" : "#FFF",
  },
  chatMsg: {
    justifySelf: "center",
    background: theme.palette.type === "dark" ? "#e8e8e8" : "#32363D",
    color: theme.palette.type === "dark" ? "#121212" : "#FFF",
    maxWidth: "290px",
    minWidth: "90px",
    padding: "10px 15px 7px 15px",
    borderRadius: "15px",
    position: "relative",
  },
  chatMessage: {
    margin: "10px 5px 0px",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 2,
      left: "-18px",
      borderRight:
          theme.palette.type === "dark"
            ? "13px solid #e8e8e8"
            : "13px solid #32363D",
      borderLeft: "13px solid transparent",
      borderTop: "13px solid transparent",
      borderBottom: "13px solid transparent",
      zIndex: 5,
    },
  },
  chatMessageMy: {
    display: "flex",
    margin: "10px 5px 0px",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 2,
      right: "-18px",
      borderRight: "13px solid transparent",
      borderLeft:
          theme.palette.type === "dark"
            ? "13px solid #e8e8e8"
            : "13px solid #32363D",
      borderTop: "13px solid transparent",
      borderBottom: "13px solid transparent",
      zIndex: 5,
    },
  },
  serverMessage: {
    width: "100%",
    margin: "5px auto",
    maxWidth: "250px",
    textAlign: "center",
    background: theme.palette.type === "dark" ? "#e8e8e8" : "#32363D",
    color: theme.palette.type === "dark" ? "#121212" : "#FFF",
    padding: ".3rem",
    borderRadius: "20px",
    fontSize: ".83rem",
  },
  chatMsgBtm: {
    marginLeft: "40px",
  },
}));

const ChatCard = ({ message }: any) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [isSameUser, setIsSameUser] = useState(false);

  useEffect(() => {
    if (message) {
      setIsSameUser(message.uid === user.uid);
    }
  }, [message]);

  return (
    <Box className={classes.chatContainer}>
      {message && message.uid !== "Server" ? (
        <Box className={classes.chatMsgContainer}>
          {isSameUser && <Box />}
          <Box className={classes.chatUiContainer}>
            <Box className={classes.chatUI}>
              {!isSameUser && (
                <Box mr={1}>
                  <Avatar style={{ width: 30, height: 30 }} />
                </Box>
              )}
              <Box
                className={clsx(classes.chatMsg, {
                  [classes.chatMessageMy]: isSameUser,
                  [classes.chatMessage]: !isSameUser,
                })}
              >
                <Box fontWeight={400}>{message?.msg}</Box>
              </Box>
              {isSameUser && (
                <Box mr={1}>
                  <Avatar style={{ width: 30, height: 30 }} />
                </Box>
              )}
            </Box>
            <Box
              display="flex"
              alignItems="center"
              px={1}
              className={clsx({
                [classes.chatMsgBtm]: !isSameUser,
              })}
            >
              <Box fontSize=".7rem" textAlign="right">
                {message
                  && message.createdAt
                  && dayjs(message.createdAt.toDate()).format("hh:mm A")}
              </Box>
              {isSameUser && (
                <Box fontSize=".72rem" ml={1}>
                  {message.seen ? "seen" : "sent"}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className={classes.serverMessage}>
          <Box fontWeight={500}>
            Joined
            {" "}
            {message
              && message.msg
              && dayjs().to(dayjs(message.msg.toDate().toString()))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatCard;
