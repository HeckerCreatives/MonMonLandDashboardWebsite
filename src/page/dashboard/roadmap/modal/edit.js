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
  MDBSpinner
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import UploadWidget from "../../../../component/uploadwidget/uploadwidet"
// import "./create.css"
import Cookies from 'js-cookie';

const UpdateRoadmapSlot = ({roadmap}) => {
  // const auth = JSON.parse(Cookies.get("auth"))
  const [titles, setTitles] = useState('');
  const [descriptions, setDescriptions] = useState('');
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [image, setImage] = useState("");
  const [filename, setFilename] = useState("");
  const [isloading, setIsLoading] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);
  // const defaultimg = process.env.REACT_APP_GAMEDEFAULTIMG;
  
  function updategame (e) {
    e.preventDefault()
    setIsLoading(true)
    const data = new FormData()
    data.append("title", titles ? titles : roadmap.title)
    data.append("description", descriptions ? descriptions : roadmap.description)
    if(image !== ""){
      data.append("file", image)
    }
    
    fetch(`${process.env.REACT_APP_API_URL}roadmap/${roadmap._id}/update`, {
      method:'PUT',
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
            Cookies.remove("auth", { path: '/' });;
            Cookies.remove("playfabAdminAuthToken", { path: '/' });
            window.location.replace("/login");
          }
        })
      } else {
        if (!data.expired) {
          setIsLoading(false)
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
          setIsLoading(false)
          Swal.fire({
            title: "Update Unsuccessfully",
            icon: "error",
            text: "There is an error Updating This"
          })
        }
      }
      
    })
  }


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
        {/* <MDBIcon fas icon="plus" /> */}
        &nbsp; Edit
      </MDBBtn>
      <MDBModal show={show} setShow={setShow} tabIndex="-1" staticBackdrop>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className={``}>
            <form autoComplete="off" onSubmit={updategame}>
              <MDBModalHeader style={{background:"#A57552"}}>
                <MDBModalTitle className="text-light">Edit {roadmap.gametitle}</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                  type="button"
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>

                <MDBCardText className="text-dark mb-0 fw-bold">Roadmap Information</MDBCardText>
                <MDBCard style={{background: "#EDCAB4",}}>
                <MDBCardBody> 
                <MDBRow>
                <MDBCol className="d-flex align-items-center flex-column justify-content-center" lg={4}>
                
                <img
                  src={image ? URL.createObjectURL(image) : `${process.env.REACT_APP_API_URL}${roadmap.image}`}
                  alt="preview"
                  className="img-fluid"
                />       
                <div>
                    <input
                        type="file"
                        className="m-1"
                        accept="image/*" // Limit to image files only
                        onChange={(e) => handleImgUrl(e)}
                    />
                </div>          
                    {/* <UploadWidget setImgUrl={handleImgUrl} setfileName={handleFileUrl}/> */}
                    </MDBCol>
                    <MDBCol lg={8}>
                    <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Roadmap Title :
                    </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1" defaultValue={roadmap.title} style={{width:'100%'}} onChange={e => setTitles(e.target.value)}></input>                    
                    </MDBCol>
                </MDBRow>
                </MDBCardBody>                
                </MDBCard>



                <MDBCardText className="mt-5 text-dark mb-0 fw-bold">Description</MDBCardText>
                <MDBCard style={{background: "#EDCAB4",}}>
                <MDBCardBody> 
                <textarea rows="5" className="rounded" name="description" defaultValue={roadmap.description} style={{width:'100%',resize: "none"}} onChange={e => setDescriptions(e.target.value)}></textarea>
                </MDBCardBody>                
                </MDBCard>
                
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn className='text-dark' type="button" color="light" onClick={toggleShow}>
                Cancel
                </MDBBtn>
                <MDBBtn type="submit" className={``}>
                 
                 {isloading ? <MDBSpinner size="sm" role='status' grow/> : "Update"}
                </MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default UpdateRoadmapSlot;