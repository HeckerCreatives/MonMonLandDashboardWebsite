import React, { useState } from "react";
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
  MDBCardText,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import logo from "../../../../assets/header/big logo.png"
import Swal from "sweetalert2";
import UploadWidget from "../../../../component/uploadwidget/uploadwidet";
const CreateNews = () => {
  const [titles, setTitles] = useState('');
  const [descriptions, setDescriptions] = useState('');
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [image, setImage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [file, setFile] = useState();
  // const handlePreview = e => {
  //   if (e.target.files[0].size / 1024 <= 25000) {
  //     setFile(e.target.files[0]);
  //     setImage(URL.createObjectURL(e.target.files[0]));
  //   } else {
  //   //   toast.warn("Maximum image size is 25mb");
  //   }
  // };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewUrl(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  function addnews (e) {
    e.preventDefault()
    // const {title, description} = e.target
    fetch(`${process.env.REACT_APP_API_URL}news/addnews`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          title: titles,
          description: descriptions,
          image: image
      })
    }).then(result => result.json())
    .then(data => {
      if (data) {
				Swal.fire({
					title: "Updated Successfully",
					icon: "success",
					text: "You Successfully Updated This"
				}).then(result1 => {
          if(result1.isConfirmed){
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
  const handleImgUrl = (url) => {
    // Use the uploaded image URL in the parent component or pass it to another component
    setImage(url);
    setPreviewUrl(url)
  };
return (
    <>
      <MDBBtn
        outline
        color="dark"
        onClick={toggleShow}
        className={`fs-6 text-capitalize`}
      >        
        Add News
        &nbsp;&nbsp;<MDBIcon far icon="plus-square" />
      </MDBBtn>
      <MDBModal show={show} setShow={setShow} tabIndex="-1" staticBackdrop>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className={``}>
            <form autoComplete="off" onSubmit={addnews}>
              <MDBModalHeader style={{background:"#A57552"}}>
                <MDBModalTitle className="text-light">Add News</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                  type="button"
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
              <MDBCardText className="text-dark mb-0 fw-bold">News Information</MDBCardText>
                <MDBCard style={{background: "#EDCAB4",}}>
                <MDBCardBody> 
                <MDBRow>
                <MDBCol className="d-flex align-items-center flex-column justify-content-center" lg={4}>
                {image ? 
                <img
                  src={image}
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
                    <UploadWidget setImgUrl={handleImgUrl}/>
                    </MDBCol>
                  <MDBCol>
                  <MDBCardText className="text-color mb-0 fw-bold">
                    News Title :
                  </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}} onChange={e => setTitles(e.target.value)} required></input>
                  <MDBCardText className="text-color mb-0 fw-bold">
                   Description :
                  </MDBCardText>
                  <textarea rows="5" className="rounded" name="description" style={{width:'100%',resize: "none"}} required onChange={e => setDescriptions(e.target.value)}></textarea>
                  </MDBCol>
                </MDBRow>
                </MDBCardBody>
                </MDBCard>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn className='text-dark' type="button" color="light" onClick={toggleShow}>
                  Cancel
                </MDBBtn>
                <MDBBtn type="submit" className={``}>
                  Add News
                </MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default CreateNews;