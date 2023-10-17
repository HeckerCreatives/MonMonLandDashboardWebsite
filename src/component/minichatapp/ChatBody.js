import { MDBBtn, MDBSpinner } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import Swal from 'sweetalert2'
const ChatBody = ({messages, typingStatus, lastMessageRef, buyer, room, socket, isadmin, buyerid, msguser, isloading}) => { 
  const navigate = useNavigate()
  const buy = localStorage.getItem("buy")
  const [bibiliuser, setBibiliUser] = useState("")
  const [message, setMessages] = useState([]);

  useEffect(() => {
    setBibiliUser(buyerid)
    setMessages(messages)
  },[buyerid, messages])

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
        text: "You want to finish transaction",
        showDenyButton: true,
        confirmButtonText: "Confirm",
        denyButtonText: "Cancel",
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then(e => {
          if(e.isConfirmed){
          socket.emit('doneTransactionAdmin', {room: room, buyer: buyerid});
          setBibiliUser("")
          setMessages([])
          }
      })
      
    } else {
      Swal.fire({
        icon: "warning",
        title: "Are you sure ?",
        text: "You want to finish transaction",
        showDenyButton: true,
        confirmButtonText: "Confirm",
        denyButtonText: "Cancel",
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then(e => {
          if(e.isConfirmed){
          socket.emit('doneTransactionUser', {roomId: room});
          setBibiliUser("")
          setMessages([])
          }
      })
    }
  };

  useEffect(()=>{

    socket.on("forcekick", () => {
      localStorage.clear("userbuyer")
      window.location.reload()
    })

    socket.on("canceled", () => {
      localStorage.clear("userbuyer")
      Swal.fire({
        title: "Canceled Transaction",
        icon: "success",
        text: `Redirecting to cashier list`,
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then(result => {
        if(result.isConfirmed){
          // socket.leave(room)
          window.location.reload();
        }
      })
    })
    // Listen for 'kicked' event
  socket.on('kicked', () => {
    localStorage.clear("userbuyer")
    // Refresh page
    Swal.fire({
      title: "Transaction Done",
      icon: "success",
      text: `Redirecting to cashier list`,
      allowOutsideClick: false,
      allowEscapeKey: false
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
    socket.off('canceled');
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
     // Cleanup on unmount
  return () => {
    socket.off('walasiadmin');
  };
},[socket])

  return (
    <>
      <header className='chat__mainHeader'>
      <div>
      <p>Please make a payment within 60:00 mins. otherwise, the order will be cancelled</p>
      </div>
      <div className='mx-2'>
      {
        isadmin ? (
          isloading ? (
            <MDBBtn className='mb-1 rounded' disabled={isloading} onClick={() => doneTransaction(room, buyerid)}>
              <MDBSpinner role='status'>
              </MDBSpinner>
            </MDBBtn>
          ) : (
            <MDBBtn className='mb-1 rounded' onClick={() => doneTransaction(room, buyerid)} disabled={bibiliuser === ""}>
              Done Transaction
            </MDBBtn>
          )
        ) : null
      }

      
      </div>
      </header>

    
        <div className='message__container'>
          {message.map((message,i) => (
            message.username === msguser ? (
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