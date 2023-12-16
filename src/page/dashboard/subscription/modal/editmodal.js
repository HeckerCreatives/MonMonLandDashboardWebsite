import React, { useState, useEffect } from "react";
import {
  MDBBtn,
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
  MDBTextArea,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
const UpdateDescriptionModal = ({descriptionlist}) => {
    // const auth = JSON.parse(Cookies.get("auth"))
    const [show, setShow] = useState(false);
    const toggleShow = () => setShow(!show);
    // const [image, setImage] = useState("");
    // const [file, setFile] = useState("");
    // const [titles, setTitles] = useState('');
    const [descriptions, setDescriptions] = useState('');
  
    // const handlePreview = e => {
    //   setFile(e.target.files[0]);
    //   setImage(URL.createObjectURL(e.target.files[0]));
    // };
  
    function updatedescription (e) {
      e.preventDefault();
      fetch(`${process.env.REACT_APP_API_URL}subscription/${descriptionlist._id}/updatedesc`, {
          method:'PUT',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
              // Authorization: `Bearer ${auth?.token}`,
          },
          body: JSON.stringify({              
              description: descriptions,              
          })            
      }).then(result => result.json())
      .then(data => {
        if(data.expired){
          Swal.fire({
            icon: "error",
            title: data.expired,
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
        }
          
      }) 
  }
  
    return (
      <>
        <MDBBtn
          onClick={toggleShow}
          color="secondary"
          className="mx-2"
          title="Update"
          size="sm"
        >
          <MDBIcon far icon="edit" />
        </MDBBtn>
        <MDBModal show={show} setShow={setShow} tabIndex="-1" staticBackdrop>
          <MDBModalDialog centered size="lg">
            <MDBModalContent className={``}>
              <form autoComplete="off" onSubmit={updatedescription}>
                <MDBModalHeader style={{background:"#A57552"}}>
                  <MDBModalTitle className="text-light">
                    Update Description
                  </MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleShow}
                    type="button"
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <MDBTextArea
                    label={
                      <span className={``}>News Description</span>
                    }
                    className={` mb-3`}
                    rows={5}
                    defaultValue={descriptionlist.description}
                    name="description"
                    style={{ resize: "none", whiteSpace: "pre-line" }}
                    onChange={e => setDescriptions(e.target.value)}
                  />
                </MDBModalBody>
  
                <MDBModalFooter>
                  <MDBBtn type="button" color="secondary" onClick={toggleShow}>
                    Close
                  </MDBBtn>
                  <MDBBtn type="submit" className={``}>
                    Save changes
                  </MDBBtn>
                </MDBModalFooter>
              </form>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </>
    );
  };
  
  export default UpdateDescriptionModal;