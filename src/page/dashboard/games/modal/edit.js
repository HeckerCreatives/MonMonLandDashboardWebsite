import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBFile,
  MDBIcon,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import pearl from "../../../../assets/subscription/pearl badge.png"
import ruby from "../../../../assets/subscription/ruby badge.png"
import emerald from "../../../../assets/subscription/emerald.png"
import diamond from "../../../../assets/subscription/diamond.png"
// import free from "../../../../assets/subscription/Free icon.png"
import Swal from "sweetalert2";
import UploadWidget from "../../../../component/uploadwidget/uploadwidet"
import "./create.css"
const UpdateGames = ({games}) => {
  const [titles, setTitles] = useState('');
  const [descriptions, setDescriptions] = useState('');
  const [subscription, setSubscription] = useState([]);
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [image, setImage] = useState("");
  const [filename, setFilename] = useState("");
  // const [isChecked, setIsChecked] = useState(false);
  // const defaultimg = process.env.REACT_APP_GAMEDEFAULTIMG;
  
  function updategame (e) {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_API_URL}games/${games._id}/update`, {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          gametitle: titles ? titles : games.gametitle,
          description: descriptions ? descriptions : games.description ,
          image: image ? image : games.image,
          selectsubscription: subscription,
      })
    }).then(result => result.json())
    .then(data => {
      if (data) {
				Swal.fire({
					title: "Updated Successfully",
					icon: "success",
					text: "You Successfully Updated This"
				}).then(ok => {
          if(ok.isConfirmed){
            window.location.reload()
          }
        })
				
			} else {
				Swal.fire({
					title: "Update Unsuccessfully",
					icon: "error",
					text: "There is an error Updating This"
				})
			}
    })
  }

  const handleCheckboxChange = (event) => {
    const labelText = event.target.previousSibling.textContent; // Get the label text next to the checkbox

    if (event.target.checked) {
      // If checkbox is checked, add the label text to the subscription array
      setSubscription((prevSubscription) => [...prevSubscription, labelText]);
    } else {
      // If checkbox is unchecked, remove the label text from the subscription array
      setSubscription((prevSubscription) =>
        prevSubscription.filter((item) => item !== labelText)
      );
    }
  };

  useEffect(() => {
    const selectedSubscriptions = games.selectsubscription || []; // Assuming games.selectsubscription is an array
    setSubscription(selectedSubscriptions);
  }, [games.selectsubscription]);


  const handleImgUrl = (url) => {
    // Use the uploaded image URL in the parent component or pass it to another component
    setImage(url);
  };
  const handleFileUrl = (url) => {
    // Use the uploaded image URL in the parent component or pass it to another component
    setFilename(url);
  };
return (
    <>
      <MDBBtn
        outline
        onClick={toggleShow}
        className='mx-2 fw-bold' 
        color='dark'
      >
        {/* <MDBIcon fas icon="plus" /> */}
        &nbsp; Edit Game
      </MDBBtn>
      <MDBModal show={show} setShow={setShow} tabIndex="-1" staticBackdrop>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className={``}>
            <form autoComplete="off" onSubmit={updategame}>
              <MDBModalHeader style={{background:"#A57552"}}>
                <MDBModalTitle className="text-light">Edit {games.gametitle}</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                  type="button"
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>

                <MDBCardText className="text-dark mb-0 fw-bold">Game Information</MDBCardText>
                <MDBCard style={{background: "#EDCAB4",}}>
                <MDBCardBody> 
                <MDBRow>
                <MDBCol className="d-flex align-items-center flex-column justify-content-center" lg={4}>
                
                <img
                  src={image ? image : games.image}
                  alt="preview"
                  className="img-fluid"
                />                 
                    <UploadWidget setImgUrl={handleImgUrl} setfileName={handleFileUrl}/>
                    </MDBCol>
                    <MDBCol lg={8}>
                    <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Game Title :
                    </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1" defaultValue={games.gametitle} style={{width:'100%'}} onChange={e => setTitles(e.target.value)}></input>
                    <MDBCardText className="text-color mb-0 fw-bold">
                    Select Subscriptions :
                    </MDBCardText>
                    <MDBRow>                        
                        <MDBCol className="text-color fw-bold align-items-center d-flex justify-content-center flex-column">
                        <img src={pearl} alt="" style={{height: "60px", width: "60px"}}/>
                        <label className="d-flex flex-column align-items-center justify-content-center">
                        <span className="pb-2">Pearl</span>
                        <input 
                        type="checkbox"
                        checked={subscription.includes("Pearl")}  
                        onChange={handleCheckboxChange} 
                        style={{transform: "scale(1.5)"}}/>                        
                        </label>
                        </MDBCol>
                        <MDBCol className="text-color fw-bold align-items-center d-flex justify-content-center flex-column">
                        <img src={ruby} alt="" style={{height: "60px", width: "60px"}}/>
                        <label className="d-flex flex-column align-items-center justify-content-center">
                        <span className="pb-2">Ruby</span>
                        <input 
                        type="checkbox"  
                        checked={subscription.includes("Ruby")} 
                        onChange={handleCheckboxChange} 
                        style={{transform: "scale(1.5)"}}/>
                        </label>
                        </MDBCol>
                        <MDBCol className="text-color fw-bold align-items-center d-flex justify-content-center flex-column">
                        <img src={emerald} alt="" style={{height: "60px", width: "60px"}}/>
                        <label className="d-flex flex-column align-items-center justify-content-center">
                        <span className="pb-2">Emerald</span>
                        <input 
                        type="checkbox" 
                        checked={subscription.includes("Emerald")}  
                        onChange={handleCheckboxChange} 
                        style={{transform: "scale(1.5)"}}/>
                        
                        </label>
                        </MDBCol>
                        <MDBCol className="text-color fw-bold align-items-center d-flex justify-content-center flex-column">
                        <img src={diamond} alt="" style={{height: "60px", width: "60px"}}/>
                        <label className="d-flex flex-column align-items-center justify-content-center">
                        <span className="pb-2">Diamond</span>
                        <input 
                        type="checkbox"  
                        checked={subscription.includes("Diamond")} 
                        onChange={handleCheckboxChange} 
                        style={{transform: "scale(1.5)"}}/>                        
                        </label>
                        </MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>
                </MDBCardBody>                
                </MDBCard>



                <MDBCardText className="mt-5 text-dark mb-0 fw-bold">Description</MDBCardText>
                <MDBCard style={{background: "#EDCAB4",}}>
                <MDBCardBody> 
                <textarea rows="5" className="rounded" name="description" defaultValue={games.description} style={{width:'100%',resize: "none"}} onChange={e => setDescriptions(e.target.value)}></textarea>
                </MDBCardBody>                
                </MDBCard>
                
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn className='text-dark' type="button" color="light" onClick={toggleShow}>
                Cancel
                </MDBBtn>
                <MDBBtn type="submit" className={``}>
                 Update Game
                </MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default UpdateGames;