import { MDBBtn } from 'mdb-react-ui-kit'
import React, { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import Swal from 'sweetalert2'
const ChatBody = ({messages, typingStatus, lastMessageRef, buyer, room, socket}) => { 
  const navigate = useNavigate()
  const buy = localStorage.getItem("buy")

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  // const kick = () => {
  //   socket.emit('kick', ({userid: socket.id}))
    
  // }

  const doneTransaction = (room, normalUserId) => {
    // Emit 'doneTransaction' event to server
    socket.emit('doneTransaction', room, normalUserId);
  };

  useEffect(()=>{
    // Listen for 'kicked' event
  socket.on('kicked', () => {
    // Refresh page
    Swal.fire({
      title: "Transaction Done",
      icon: "success",
      text: `Redirecting to cashier list`
    }).then(result => {
      if(result.isConfirmed){
        window.location.reload();
      }
    })
    
  });

  // Cleanup on unmount
  return () => {
    socket.off('kicked');
  };
    
  },[socket])
  
  return (
    <>
      <header className='chat__mainHeader'>
      <div>
      <p>Please make a payment within 60:00 mins. otherwise, the order will be cancelled</p>
      </div>
      <div className='mx-2'>
      <MDBBtn className='mb-1 rounded' onClick={() => doneTransaction(room,socket.id)}>Done Transaction</MDBBtn>
      {/* <button className='btn-primary mb-1 rounded' ></button> */}
      {/* <button className='btn-danger rounded'>Cancel Order</button> */}
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
                <img src={message.image} alt='' className='img-fluid'/>
            </div>
          </div>
            ) : (
              <div className="message__chats" key={i}>
            <p>{message.username}</p>
            <div className='message__recipient'>
                <p>{formatDateFromTimestamp(message.__createdtime__)}</p>
                <p>{message.message}</p>
                <img src={message.image} alt='' className='img-fluid'/>
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