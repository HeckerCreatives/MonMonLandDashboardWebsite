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

const UpdateDescriptionModal = ({descriptionlist}) => {
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
      fetch(`http://localhost:4000/subscription/${descriptionlist._id}/updatedesc`, {
          method:'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({              
              description: descriptions,              
          })            
      }).then(result => result.json())
      .then(data => {
  
          if (data) {
            Swal.fire({
              title: "Updated Successfully",
              icon: "success",
              text: "You Successfully Updated This"
            })
            // window.location.reload()
          } else {
            Swal.fire({
              title: "Update Unsuccessfully",
              icon: "error",
              text: "There is an error Updating This"
            })
          }
      }) 
  }
  
    return (
      <>
        <MDBBtn
          onClick={toggleShow}
          color="secondary"
          className="me-2"
          title="Update"
          size="sm"
        >
          <MDBIcon far icon="edit" />
        </MDBBtn>
        <MDBModal show={show} setShow={setShow} tabIndex="-1" staticBackdrop>
          <MDBModalDialog centered size="lg">
            <MDBModalContent className={``}>
              <form autoComplete="off" onSubmit={updatedescription}>
                <MDBModalHeader>
                  <MDBModalTitle>
                    Update Description
                  </MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleShow}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  {/* <MDBInput
                    label={<span className={``}>Description</span>}
                    className={` mb-3`}
                    defaultValue={''}
                    type="text"
                    name="title"
                    onChange={e => setTitles(e.target.value)}
                  /> */}
                  {/* <MDBContainer fluid className="px-0 text-center mb-3">
                    <MDBContainer
                      className="my-2"
                      style={{ width: "30rem", height: "auto" }}
                    >
                      <img
                        src={image || `${news.image}`}
                        alt={news.image}
                        className="img-fluid"
                        onChange={e => setImage(e.target.value)}  
                      />
                    </MDBContainer>
                    
                  </MDBContainer> */}
                  <MDBTextArea
                    label={
                      <span className={``}>News Description</span>
                    }
                    className={` mb-3`}
                    rows={10}
                    defaultValue={descriptionlist.description}
                    name="description"
                    style={{ resize: "none", whiteSpace: "pre-line" }}
                    onChange={e => setDescriptions(e.target.value)}
                  />
                </MDBModalBody>
  
                <MDBModalFooter>
                  <MDBBtn type="button" color="danger" onClick={toggleShow}>
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