import { MDBIcon } from 'mdb-react-ui-kit';
import React, {useState, useEffect} from 'react'
import UploadWidget from "../uploadwidget/uploadwidet"
const ChatFooter = ({socket, buyerid, room, msguser, rcvrid, isadmin}) => {
    const [message, setMessage] = useState("")
    const [image, setImage] = useState("");
    const [filename, setFilename] = useState("");
    // const handleTyping = () => socket.emit("typing",`${ } is typing`)
    // const handleImageUpload = (e) => {
    //   const file = e.target.files[0];
    //   if (file) {
    //     setImage(file);
    //   }
    // };
    const handleImgUrl = (e) => {
      const file = e.target.files[0];
      
      if (file) {
      const data = new FormData();
      data.append("file", file)
      fetch(`${process.env.REACT_APP_API_URL}upload/uploadimg`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Accept": "application/json"
        },
        body: data
      })
      .then(result => result.json()) 
      .then(data => {
        setImage(data.data);
      })   
      
      }
    };
    const handleFilename = (url) => {
      // Use the uploaded image URL in the parent component or pass it to another component
      setFilename(url);
    };
    const __createdtime__ = Date.now();
    
    const sendMessage = (e) => {
      e.preventDefault();
      if (!isadmin && message !== "") {   
         
        // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
        socket.emit('send_message', { username: msguser, room: room, message: message, __createdtime__, image: image ? image : null, usersocket: rcvrid});
        setMessage('');
        setImage("");
      } 
      else if (!isadmin && image !== "") {
            // const reader = new FileReader();
            // reader.onload = function (e) {
            //   const dataURL = e.target.result;
              socket.emit('send_message', { username: msguser, room: room, message: message, __createdtime__, image: image, usersocket: rcvrid});
              // console.log(dataURL)
              setMessage('');
              setImage("");
          //   };
          //   reader.readAsDataURL(image);
      } else if (isadmin && message !== ""){
        console.log("wewewe")
        socket.emit('admin_send_message', { username: msguser, room: room, message: message, __createdtime__, image: image, usersocket: rcvrid});
        setMessage('');
        setImage("");
      } else if (isadmin && image !== ""){
        socket.emit('admin_send_message', { username: msguser, room: room, message: message, __createdtime__, image: image, usersocket: rcvrid});
        setMessage('');
        setImage("");
      }
      console.log(image)
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
              <img src={`${process.env.REACT_APP_API_URL}${image}`} alt="selected" className="img-fluid imagee"/>              
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
            disabled={rcvrid ? false : true}
            /> 
        <div className="d-flex align-items-end">
        {/* <label htmlFor="fileInput" className='mx-2'>
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
            /> */}
            {/* <UploadWidget setfileName={handleFilename} setImgUrl={handleImgUrl}/> */}
            
            <button type='submit' className="sendBtn mx-2 rounded">
            <MDBIcon fas icon="paper-plane" size='xl'/>
            </button>
        </div>  
        <input
              id="fileInput"
              type="file"
              accept="image/*"
              // style={{ display: "none" }}
              onChange={(e) => handleImgUrl(e)}
            />

            
        </form>
     </div>
  )
}

export default ChatFooter;