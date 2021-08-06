import React, { useContext } from "react";
import { Box, Button } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import { AuthContext } from "../../contexts/auth/AuthProvider";
import pendingApprovementIllustration from "../../assets/app/pendingApprovement.svg";

const NoChat = ({ fetchChatStatus }: { fetchChatStatus: () => void }) => {
  const { user } = useContext(AuthContext);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box maxWidth={400} maxHeight={400}>
        <img
          style={{ maxWidth: "400px" }}
          width="80%"
          src={pendingApprovementIllustration}
          alt="No Chat Available."
        />
      </Box>
      <Box fontWeight={800} fontSize="2rem" textAlign="center">
        No chat available!
      </Box>
      <Box fontWeight={500} fontSize="1rem" textAlign="center">
        {user.roles.isClient
          ? "Waiting for customer supports to accept your order."
          : ""}
      </Box>
      <Box mt={3}>
        <Button
          disableElevation
          variant="contained"
          color="primary"
          onClick={fetchChatStatus}
        >
          <RefreshIcon />
          Refresh
        </Button>
      </Box>
    </Box>
  );
};

export default NoChat;
