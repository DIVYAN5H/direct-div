import Head from "next/head";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { useEffect, useState } from "react";

function Chat({ chat, messages }) {
  let [sidebar, setSidebar] = useState(true);
  const [user] = useAuthState(auth);
  useEffect(() => {
    console.log(sidebar)
    let sidebarContainer = document.getElementsByClassName("container")[0];
    if (sidebar) {
      sidebarContainer.style.display = "block";
    } else {
      sidebarContainer.style.display = "none";
    }
    console.log(sidebarContainer);
  }, [sidebar]);

  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Sidebar setSidebar={setSidebar} />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} setSidebar={setSidebar}/>
      </ChatContainer>
    </Container>
  );
}

export default Chat;

//----- Server Side Rendering -----
export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  //Prep message on server
  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  // Perp the chats
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  console.log(JSON.stringify(messages));
  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE or Edge */
  scrollbar-width: none; /* Firefox */
`;
