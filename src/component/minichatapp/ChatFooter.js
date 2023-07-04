import { MDBIcon } from 'mdb-react-ui-kit';
import React, {useState, useEffect} from 'react'

const ChatFooter = ({socket, user,recipientId}) => {
    const [message, setMessage] = useState("")
    const [image, setImage] = useState(null);
    const handleTyping = () => socket.emit("typing",`${ user.userName } is typing`)
    // const cashier = recipientId;
    
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
      }
    };

    
  
    const handleSend = (e) => {
      e.preventDefault();
      
      if (message.trim()) {
        const messageData = {
          name: user.userName,
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id && localStorage.setItem("buy", socket.id),
          image: image ? URL.createObjectURL(image) : null,
                    
        };        
        socket.emit('privateChat', {message, recipientId: recipientId,
          senderId: user._id, data: messageData});
        setMessage('');
        setImage(null);
      } else if (image) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const dataURL = e.target.result;
          const messageData = {
            name: user.userName,
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
            image: dataURL
          };
          socket.emit('privateChat', {message: message, recipientId: recipientId,
            senderId: user._id, data: messageData});
          setMessage('');
          setImage(null);
        };
        reader.readAsDataURL(image);
      }
    };
    
  return (
    <div className='chat__footer'>
        <form className='form' onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder='Write message' 
            className='message' 
            value={message} 
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleTyping}
            />
            {/* <MDBIcon fas icon="plus" /> */}
            <input type="file" accept="image/*" onChange={handleImageUpload}/>
            {image && (
            <div className="message__sender">
              <img src={URL.createObjectURL(image)} alt="selected"/>
              <button className="cancelBtn" onClick={() => setImage(null)}>
                Cancel
              </button>
            </div>
            )}
            <button type='submit' className="sendBtn">
            <MDBIcon fas icon="paper-plane"/>
            &nbsp; SEND</button>

            
        </form>
     </div>
  )
}

export default ChatFooter