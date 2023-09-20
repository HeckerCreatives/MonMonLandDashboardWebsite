import React, { useEffect, useState, useRef} from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'


const ChatPage = ({socket, room, buyer, adminsocket, isadmin, buyerid}) => { 
  const [messagesRecieved, setMessagesReceived] = useState([]);
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
        <ChatBody adminsocket={adminsocket} room={room} buyer={buyer} messages={messagesRecieved} lastMessageRef={lastMessageRef} socket={socket} isadmin={isadmin} buyerid={buyerid}/>
        <ChatFooter socket={socket} buyer={buyer} room={room}/>
      </div>
    </div>
  )
}

export default ChatPage