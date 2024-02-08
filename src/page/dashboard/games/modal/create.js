import React, { useState } from "react";
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
  MDBSpinner,
} from "mdb-react-ui-kit";
import pearl from "../../../../assets/subscription/pearl badge.png"
import ruby from "../../../../assets/subscription/ruby badge.png"
import emerald from "../../../../assets/subscription/emerald.png"
import diamond from "../../../../assets/subscription/diamond.png"
// import free from "../../../../assets/subscription/Free icon.png"
import Swal from "sweetalert2";
import UploadWidget from "../../../../component/uploadwidget/uploadwidet"
import "./create.css"
import Cookies from 'js-cookie';
const CreateGames = () => {
  // const auth = JSON.parse(Cookies.get("auth"))
  const [titles, setTitles] = useState('');
  const [descriptions, setDescriptions] = useState('');
  const [subscription, setSubscription] = useState([]);
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [image, setImage] = useState("");
  const [filename, setFilename] = useState("");
  // const [isChecked, setIsChecked] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const defaultimg = process.env.REACT_APP_GAMEDEFAULTIMG;
  

  function addgame () {
    setIsLoading(true)
    const data = new FormData()
    data.append("gametitle", titles)
    data.append("description", descriptions)
    data.append("file", image ? image : defaultimg)
    subscription.forEach((selectedSubscription, index) => {
      data.append(`selectsubscription[${index}]`, selectedSubscription);
    });
    fetch(`${process.env.REACT_APP_API_URL}games/addgame`, {
      method:'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        // Authorization: `Bearer ${auth?.token}`,
      },
      body: data
    }).then(result => result.json())
    .then(data => {
      if(data.expired){
        Swal.fire({
          icon: "error",
          title: data.expired == "duallogin" ? "Dual Login" : data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            Cookies.remove("auth", { path: '/' });
            Cookies.remove("playfabAdminAuthToken", { path: '/' });
            window.location.replace("/login");
          }
        })
    } else {
      if (!data.expired) {
        setIsLoading(false)
				Swal.fire({
					title: "Added Successfully",
					icon: "success",
					text: "You Successfully Added News",
          allowOutsideClick: false,
          allowEscapeKey: false
				}).then(result1 => {
          if(result1.isConfirmed){
            window.location.reload()
          }
        })
				
			} else {
        setIsLoading(false)
				Swal.fire({
					title: "Add Unsuccessfull",
					icon: "error",
					text: "There is an error adding news"
				})
			}
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

  const handleImgUrl = (e) => {
    const file = e.target.files[0];
    // Use the uploaded image URL in the parent component or pass it to another component
    setImage(file);
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
        <MDBIcon fas icon="plus" />
        &nbsp; Add Games
      </MDBBtn>
      <MDBModal show={show} setShow={setShow} tabIndex="-1" staticBackdrop>
        <MDBModalDialog centered size="xl">
          <MDBModalContent className={``}>
            <form autoComplete="off" onSubmit={addgame}>
              <MDBModalHeader style={{background:"#A57552"}}>
                <MDBModalTitle className="text-light">Add Games</MDBModalTitle>
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
                {image ? 
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="img-fluid"
                /> : 
                <form id="form-file-upload">
                  <label id="label-file-upload">
                  <div>
                  {/* <p>Drag files to upload</p> */}
                  </div>
                  </label>
                </form> }                  
                <div>
                    <input
                        type="file"
                        className="m-1"
                        accept="image/*" // Limit to image files only
                        onChange={(e) => handleImgUrl(e)}
                    />
                </div>
                    </MDBCol>
                    <MDBCol lg={8}>
                    <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Game Title :
                    </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}} onChange={e => setTitles(e.target.value)} required></input>
                    <MDBCardText className="text-color mb-0 fw-bold">
                    Select Subscriptions :
                    </MDBCardText>
                    <MDBRow>                        
                        <MDBCol className="text-color fw-bold align-items-center d-flex justify-content-center flex-column">
                        <img src={pearl} alt="" style={{height: "60px", width: "60px"}}/>
                        <label className="d-flex flex-column align-items-center justify-content-center">
                        <span className="pb-2">Pearl</span>
                        <input type="checkbox"  onChange={handleCheckboxChange} style={{transform: "scale(1.5)"}}/>                        
                        </label>
                        </MDBCol>
                        <MDBCol className="text-color fw-bold align-items-center d-flex justify-content-center flex-column">
                        <img src={ruby} alt="" style={{height: "60px", width: "60px"}}/>
                        <label className="d-flex flex-column align-items-center justify-content-center">
                        <span className="pb-2">Ruby</span>
                        <input type="checkbox"  onChange={handleCheckboxChange} style={{transform: "scale(1.5)"}}/>
                        </label>
                        </MDBCol>
                        <MDBCol className="text-color fw-bold align-items-center d-flex justify-content-center flex-column">
                        <img src={emerald} alt="" style={{height: "60px", width: "60px"}}/>
                        <label className="d-flex flex-column align-items-center justify-content-center">
                        <span className="pb-2">Emerald</span>
                        <input type="checkbox"  onChange={handleCheckboxChange} style={{transform: "scale(1.5)"}}/>
                        
                        </label>
                        </MDBCol>
                        <MDBCol className="text-color fw-bold align-items-center d-flex justify-content-center flex-column">
                        <img src={diamond} alt="" style={{height: "60px", width: "60px"}}/>
                        <label className="d-flex flex-column align-items-center justify-content-center">
                        <span className="pb-2">Diamond</span>
                        <input type="checkbox"  onChange={handleCheckboxChange} style={{transform: "scale(1.5)"}}/>                        
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
                <textarea rows="5" className="rounded" name="description" style={{width:'100%',resize: "none"}} required onChange={e => setDescriptions(e.target.value)}></textarea>
                </MDBCardBody>                
                </MDBCard>
                
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn className='text-dark' type="button" color="light" onClick={toggleShow}>
                Cancel
                </MDBBtn>
                <MDBBtn type="submit" className={``}>
                 
                 {isloading ? <MDBSpinner size="sm" role='status' grow/> : "Add Game"}
                </MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default CreateGames;