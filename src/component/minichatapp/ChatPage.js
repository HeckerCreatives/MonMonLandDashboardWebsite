import React, { useEffect, useState, useRef} from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'


const ChatPage = ({socket, user}) => { 
  const [messages, setMessages] = useState([])
  
  const [typingStatus, setTypingStatus] = useState("")
  const lastMessageRef = useRef(null);
  
  
  useEffect(()=> {
    socket.on("messageResponse", data => setMessages([...messages, data]))
  }, [socket, messages])

  useEffect(()=> {
    socket.on("typingResponse", data => setTypingStatus(data))
  }, [socket])

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

 

  return (
    <div className="chat">
      <ChatBar  socket={socket}/>
      <div className='chat__main'>
        <ChatBody user={user} messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef}/>
        <ChatFooter socket={socket} user={user} />
      </div>
    </div>
  )
}

export default ChatPage