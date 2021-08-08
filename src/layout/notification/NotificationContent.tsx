import React from "react";
import {
  Theme,
  createStyles,
  makeStyles,
  withStyles,
} from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import {
  Badge,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { useHistory } from "react-router";

import WarningIcon from "@material-ui/icons/Warning";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  NotificationContainer: {
    cursor: "pointer",
  },
  NotificationList: {
    boxSizing: "border-box",
    padding: ".5rem .5rem .5rem .9rem",
    margin: "4px 0",
    transition: "all .3s",
    "&:hover": {
      background: theme.palette.type === "dark" ? "#4c4c4c" : "#f6f6f6",
    },
  },
  iconBtn: {
    fontSize: "20px",
  },
}));

const StyledMenu = withStyles((theme: Theme) => ({
  paper: {
    border: theme.palette.type === "dark" ? "1px solid #444" : "1px solid #d3d4d5",
    boxShadow:
      theme.palette.type === "dark"
        ? "0 1px 10px rgba(0,0,0,0.1)"
        : "0 1px 10px rgba(0,0,0,0.1)",
    borderRadius: 0,
    minWidth: "280px",
    width: "80%",
    maxWidth: "320px",
  },
}))((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
));

const StyledBadge = withStyles(() => createStyles({
  badge: {
    right: -1,
    top: 4,
    padding: "0 7px",
  },
}))(Badge);

export default function UserProfile({
  notifications,
  loading,
}: {
  notifications: any[];
  loading: boolean;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDialogMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Notifications">
        <IconButton color="inherit" onClick={handleClick}>
          <StyledBadge color="secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              className="bi bi-bell"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
            </svg>
          </StyledBadge>
        </IconButton>
      </Tooltip>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseDialogMenu}
      >
        <Box mb={1} display="flex" width="100%" alignItems="center">
          <Box fontWeight={900} fontSize="1rem" ml={2}>
            Notifications
          </Box>
          <Box ml="auto" mr={2}>
            <IconButton
              onClick={() => {
                handleCloseDialogMenu();
                history.push("/app/notifications");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
              </svg>
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <Box>
          {!loading ? (
            notifications.length ? (
              notifications.map((notification: any) => (
                <Box key={notification.id} className={classes.NotificationContainer}>
                  <Box
                    display="flex"
                    alignItems="center"
                    className={classes.NotificationList}
                  >
                    <IconButton disabled>
                      {notification.type === "success" && (
                        <CheckCircleIcon style={{ color: "#4A5" }} />
                      )}
                      {notification.type === "info" && (
                        <InfoIcon style={{ color: "#45B" }} />
                      )}
                      {notification.type === "warning" && (
                        <WarningIcon style={{ color: "#BD4" }} />
                      )}
                      {notification.type === "error" && (
                        <ErrorIcon style={{ color: "#B64" }} />
                      )}
                    </IconButton>
                    <Box mr={2}>
                      <Box fontSize=".82rem" fontWeight={700}>
                        {notification.msg}
                      </Box>
                      <Box fontSize=".78rem">
                        {notification
                          && notification.createdAt
                          && dayjs().to(
                            dayjs(notification.createdAt.toDate().toString()),
                          )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Box
                minHeight="50vh"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box fontWeight={900} color="#999" fontSize="1.3rem">
                  Whoops!
                </Box>
                <Box fontWeight={500} color="#999" fontSize="1.12rem">
                  You have no notifications....!
                </Box>
              </Box>
            )
          ) : (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              minHeight={150}
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </StyledMenu>
    </div>
  );
}
