import { MDBIcon } from 'mdb-react-ui-kit';
import React, {useState} from 'react'

const ChatFooter = ({socket, user}) => {
    const [message, setMessage] = useState("")
    const [image, setImage] = useState(null);
    const handleTyping = () => socket.emit("typing",`${user.userName} is typing`)

    const handleSendMessage = (e) => {
        e.preventDefault()
        if(message.trim() && user.userName) {
        socket.emit("message", 
            {
            text: message, 
            name: user.userName, 
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id
            }
        )
        }
        setMessage("")
    }

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
      }
    };
  
    const handleImageSend = () => {
      if (image) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const dataURL = e.target.result;
          socket.emit('image message', dataURL);
          socket.emit("message", 
            {
            text: message, 
            name: user.userName, 
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
            image: dataURL
            }
        )
          // handleImageMessage(dataURL);
          setImage(null);
        };
        reader.readAsDataURL(image);
      }
    };

  return (
    <div className='chat__footer'>
        <form className='form' onSubmit={handleSendMessage}>
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
            <button className="sendBtn">
            <MDBIcon fas icon="paper-plane"/>
            &nbsp; SEND</button>

            {image && (
            <div className="selectedImage">
              <img src={URL.createObjectURL(image)} alt="selected" />
              <button className="cancelBtn" onClick={() => setImage(null)}>
                Cancel
              </button>
              
              <button className="sendImageBtn" onClick={handleImageSend}>
              <MDBIcon fas icon="paper-plane" />
              Send Image
              </button>
            </div>
          )}
        </form>
     </div>
  )
}

export default ChatFooter