import React, {
  useContext, useEffect, useRef, useState,
} from "react";
import { Box, CircularProgress } from "@material-ui/core";
import ChatCard from "../../components/chat/ChatCard";
import firebase from "../../firebase";
import { AuthContext } from "../../contexts/auth/AuthProvider";
import uuid from "../../utils/uuid";

const ChatContent = ({ currentOpenedChatId }: any) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  let unsub: any = null;

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    if (messagesEndRef?.current) {
      messagesEndRef?.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (currentOpenedChatId.length > 0) {
      setLoading(true);
      const db = firebase.firestore();

      unsub = db
        .collection(`/chats/${currentOpenedChatId}/messages/`)
        .orderBy("createdAt")
        .onSnapshot((chat) => {
          const messages = chat.docs.map((d) => d.data());
          setMessages(messages);
          setLoading(false);
          scrollToBottom();

          if (unsub && currentOpenedChatId.length > 0) {
            db.collection(`/chats/${currentOpenedChatId}/messages/`)
              .where("seen", "==", false)
              .where("uid", "not-in", [user.id, "Server"])
              .get()
              .then((res) => {
                const batch = firebase.firestore().batch();

                res.docs.forEach((d) => {
                  const ref = db.doc(
                    `/chats/${currentOpenedChatId}/messages/${d.id}`,
                  );
                  batch.update(ref, {
                    seen: true,
                  });
                });

                batch.commit();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    }

    return () => {
      if (unsub) {
        unsub();
        unsub = null;
      }
    };
  }, [currentOpenedChatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      {!loading ? (
        messages?.length > 0 ? (
          messages.map((chat: any) => (
            <Box key={uuid()}>
              <ChatCard message={chat} />
            </Box>
          ))
        ) : (
          <Box fontWeight={500} textAlign="center" mt={5}>
            Select User To start!
          </Box>
        )
      ) : (
        <Box
          width="100%"
          minHeight={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size={60} />
        </Box>
      )}
      <Box m={10} />
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatContent;
