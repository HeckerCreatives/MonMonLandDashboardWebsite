import { MDBBtn } from 'mdb-react-ui-kit'
import React, { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import Swal from 'sweetalert2'
const ChatBody = ({messages, typingStatus, lastMessageRef, buyer, room, socket, isadmin, buyerid}) => { 
  const navigate = useNavigate()
  const buy = localStorage.getItem("buy")

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }


  const doneTransaction = (room, buyerid) => {
    // Emit 'doneTransaction' event to server
    if(isadmin){
      Swal.fire({
        icon: "warning",
        title: "Are you sure ?",
        text: "You will go Offline",
        showDenyButton: true,
        confirmButtonText: "Confirm",
        denyButtonText: "Cancel",
      }).then(e => {
          if(e.isConfirmed){
          socket.emit('doneTransactionAdmin', {room: room, buyer: buyerid});
          }
      })
      
    } else {
      Swal.fire({
        icon: "warning",
        title: "Are you sure ?",
        text: "You will go Offline",
        showDenyButton: true,
        confirmButtonText: "Confirm",
        denyButtonText: "Cancel",
      }).then(e => {
          if(e.isConfirmed){
          socket.emit('doneTransactionUser', {roomId: room});
          }
      })
    }
  };

  useEffect(()=>{
    socket.on("canceled", () => {
      Swal.fire({
        title: "Canceled Transaction",
        icon: "success",
        text: `Redirecting to cashier list`
      }).then(result => {
        if(result.isConfirmed){
          // socket.leave(room)
          window.location.reload();
        }
      })
    })
    // Listen for 'kicked' event
  socket.on('kicked', () => {
    // Refresh page
    Swal.fire({
      title: "Transaction Done",
      icon: "success",
      text: `Redirecting to cashier list`
    }).then(result => {
      if(result.isConfirmed){
        // socket.leave(room)
        window.location.reload();
      }
    })
    
  });

  // Cleanup on unmount
  return () => {
    socket.off('kicked');
  };
    
  },[socket])

  useEffect(()=>{
    socket.on('walasiadmin', (data) => {
        Swal.fire({
            icon: "info",
            title: data.message,
            // title: "Admin is Offline, Sorry for inconvenience",
            confirmButtonText: "Ok",
            allowOutsideClick: false,
            allowEscapeKey: false,                    
        }).then(ok => {
            if(ok.isConfirmed){
                window.location.reload()
            }
        })
    })
},[socket])

  return (
    <>
      <header className='chat__mainHeader'>
      <div>
      <p>Please make a payment within 60:00 mins. otherwise, the order will be cancelled</p>
      </div>
      <div className='mx-2'>
      <MDBBtn className='mb-1 rounded' onClick={() => doneTransaction(room,buyerid)}>Done Transaction</MDBBtn>
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