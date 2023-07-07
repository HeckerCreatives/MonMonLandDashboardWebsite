import React from 'react'
import {useNavigate} from "react-router-dom"

const ChatBody = ({messages, typingStatus, lastMessageRef, buyer}) => { 
  const navigate = useNavigate()
  const buy = localStorage.getItem("buy")

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  const handleLeaveChat = () => {
    // localStorage.removeItem("userName")
    // navigate("/")
    window.location.reload()
  }
  // console.log(messages)
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
          {messages.map((message,i) => (
            message.username === buyer ? (
              <div className="message__chats" key={i}>
            <p className='sender__name'>You</p>
            <div className='message__sender'>
                <p>{formatDateFromTimestamp(message.__createdtime__)}</p>
                <p>{message.message}</p>
                <img src={message.image} alt='' className='message__sender'/>
            </div>
          </div>
            ) : (
              <div className="message__chats" key={i}>
            <p>{message.username}</p>
            <div className='message__recipient'>
                <p>{formatDateFromTimestamp(message.__createdtime__)}</p>
                <p>{message.message}</p>
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