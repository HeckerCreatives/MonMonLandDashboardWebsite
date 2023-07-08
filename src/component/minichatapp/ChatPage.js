import React, { useEffect, useState, useRef} from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'


const ChatPage = ({socket, room, buyer}) => { 
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [typingStatus, setTypingStatus] = useState("")
  const lastMessageRef = useRef(null);
  
  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          image: data.image,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

	// Remove event listener on component unmount
    return () => socket.off('receive_message');
  }, [socket]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    // initReactiveProperties()
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messagesRecieved]);

  return (
    <div className="chat">
      {/* <ChatBar socket={socket}/> */}
      <div className='chat__main'>
        <ChatBody buyer={buyer} messages={messagesRecieved} typingStatus={typingStatus} lastMessageRef={lastMessageRef}/>
        <ChatFooter socket={socket} buyer={buyer} room={room}/>
      </div>
    </div>
  )
}

export default ChatPage