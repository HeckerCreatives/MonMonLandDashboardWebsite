import { MDBIcon } from 'mdb-react-ui-kit';
import React, {useState, useEffect} from 'react'

const ChatFooter = ({socket, buyer, room}) => {
    const [message, setMessage] = useState("")
    const [image, setImage] = useState(null);
    // const handleTyping = () => socket.emit("typing",`${ } is typing`)
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
      }
    };
    const __createdtime__ = Date.now();
    
    const sendMessage = (e) => {
      e.preventDefault();
      if (message !== '') {        
        // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
        socket.emit('send_message', { username: buyer, room: room, message: message, __createdtime__, image: image ? URL.createObjectURL(image) : null});
        setMessage('');
        setImage(null);
      } else if (image) {
            const reader = new FileReader();
            reader.onload = function (e) {
              const dataURL = e.target.result;
              socket.emit('send_message', { username: buyer, room: room, message: message, __createdtime__, image: dataURL});
              setMessage('');
              setImage(null);
            };
            reader.readAsDataURL(image);
          }
    };
    
    
    // const handleSend = (e) => {
    //   e.preventDefault();
      
    //   if (message.trim()) {
    //     const messageData = {
    //       name: user.userName,
    //       id: `${socket.id}${Math.random()}`,
    //       socketID: socket.id && localStorage.setItem("buy", socket.id),
    //       image: image ? URL.createObjectURL(image) : null,
                    
    //     };        
    //     socket.emit('privateChat', {message: message, recipientId: recipientId,
    //       senderId: socket.id, data: messageData});
    //       console.log(recipientId)  
    //       // console.log(senderId)  

    //     setMessage('');
    //     setImage(null);
    //   } else if (image) {
    //     const reader = new FileReader();
    //     reader.onload = function (e) {
    //       const dataURL = e.target.result;
    //       const messageData = {
    //         name: user.userName,
    //         id: `${socket.id}${Math.random()}`,
    //         socketID: socket.id,
    //         image: dataURL
    //       };
    //       socket.emit('privateChat', {message: message, recipientId: recipientId,
    //         senderId: socket.id, data: messageData});
    //       setMessage('');
    //       setImage(null);
    //     };
    //     reader.readAsDataURL(image);
    //   }
    // };
    
  return (
    <div className='chat__footer'>
        <form className='form' onSubmit={sendMessage}>
        <div className="d-flex align-items-start ">
        {image && (
          <>
            <div className='mx-3 imagee'>
              <img src={URL.createObjectURL(image)} alt="selected" className="img-fluid imagee"/>              
            </div>
            <div className=''>
            <button className="cancelBtn" onClick={() => setImage(null)}>
              <MDBIcon fas icon="times-circle" size='xl' />
              </button>
            </div>
          </>
          )}
                   
        </div>
        <input         
            type="text" 
            placeholder='Write message' 
            className='message mx-3' 
            value={message} 
            onChange={e => setMessage(e.target.value)}
            // onKeyDown={handleTyping}
            /> 
        <div className="d-flex align-items-end">
        <label htmlFor="fileInput" className='mx-2'>
            <button type="button" className='sendBtn rounded' onClick={() =>document.getElementById('fileInput').click()}>
            <MDBIcon fas icon="plus" size='xl'/>
            </button>              
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            
            <button type='submit' className="sendBtn mx-2 rounded">
            <MDBIcon fas icon="paper-plane" size='xl'/>
            </button>
        </div>  
            

            
        </form>
     </div>
  )
}

export default ChatFooter;