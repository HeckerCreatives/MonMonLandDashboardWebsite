import React from 'react'
import {useNavigate} from "react-router-dom"

const ChatBody = ({messages, typingStatus, lastMessageRef, user}) => { 
  const navigate = useNavigate()
  

  const handleLeaveChat = () => {
    // localStorage.removeItem("userName")
    // navigate("/")
    window.location.reload()
  }
  
  return (
    <>
      <header className='chat__mainHeader'>
      <div>
      <h4>Payment to be made: Timer Here </h4>
      </div>
      <div>
      <p>Please make a payment within 60:00 mins. otherwise, the order will be cancelled</p>
      </div>
      <div>
      <button className='btn-primary'>Done Transaction</button>
      <button className='btn-danger'>Cancel Order</button>
      </div>
      </header>


        <div className='message__container'>
          {messages.map(message => (
            message.name ===   user.userName ? (
              <div className="message__chats" key={message.id}>
            <p className='sender__name'>You</p>
            <div className='message__sender'>
                <p>{message.text}</p>
                <img src={message.image} alt=''/>
            </div>
          </div>
            ) : (
              <div className="message__chats" key={message.id}>
            <p>{message.name}</p>
            <div className='message__recipient'>
                <p>{message.text}</p>
                <img src={message.image} alt=''/>
            </div>
          </div>
            )
            ))}

          <div className='message__status'>
            <p>{typingStatus}</p>
          </div>
          <div ref={lastMessageRef} />   
        </div>
    </>
  )
}

export default ChatBody