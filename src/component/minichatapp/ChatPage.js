import React, { useEffect, useState, useRef} from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'


const ChatPage = ({socket, user, recipientId}) => { 
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [typingStatus, setTypingStatus] = useState("")
  const lastMessageRef = useRef(null);
  
  console.log(users)
  useEffect(() => {
    // Listen for the "privateChatResponse" event
    socket.on("privateChatResponse", ({ senderId, message, data }) => {
      console.log(message, senderId)
      setMessages((prevMessages) => [...prevMessages, { senderId, message, data }]);
    });
  }, [socket]);

  // useEffect(() => {
  //   if (socket) {
  //     // Listen for the "newUserResponse" event from the server
  //     socket.on('newUserResponse', (updatedUsers) => {
  //       setUsers(updatedUsers);
  //     });
  //   }
  // }, [socket]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    // initReactiveProperties()
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);


  useEffect(() => {
    const handlePrivateMessage = ({ content, from, to }) => {
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers];
  
        for (let i = 0; i < updatedUsers.length; i++) {
          const user = updatedUsers[i];
          const fromSelf = user.userID === from;
  
          if (user.userID === (fromSelf ? to : from)) {
            user.messages.push({
              content,
              fromSelf,
            });
  
            if (user !== recipientId) {
              user.hasNewMessages = true;
            }
  
            break;
          }
        }
  
        return updatedUsers;
      });
    };
  
    // Add event listener for "private message" event
    socket.on("private message", handlePrivateMessage);
  
    // Clean up the event listener on component unmount
    return () => {
      socket.off("private message", handlePrivateMessage);
    };
  }, [recipientId, socket]);

  return (
    <div className="chat">
      <ChatBar socket={socket}/>
      <div className='chat__main'>
        <ChatBody user={user} messages={users} typingStatus={typingStatus} lastMessageRef={lastMessageRef}/>
        <ChatFooter socket={socket} user={user} recipientId={recipientId} setMessages={setUsers}/>
      </div>
    </div>
  )
}

export default ChatPage