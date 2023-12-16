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
  MDBSpinner,
} from "mdb-react-ui-kit";
import logo from "../../../../assets/header/big logo.png"
import Swal from "sweetalert2";
import UploadWidget from "../../../../component/uploadwidget/uploadwidet";
import Cookies from 'js-cookie';

const CreateNews = () => {
  // const auth = JSON.parse(Cookies.get("auth"))
  const [titles, setTitles] = useState('');
  const [descriptions, setDescriptions] = useState('');
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [image, setImage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [file, setFile] = useState();
  const [filename, setFilename] = useState("");
  const [isloading, setIsLoading] = useState(false);

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
    setIsLoading(true)
    // const {title, description} = e.target
    const data = new FormData()
    data.append("title", titles)
    data.append("description", descriptions)
    data.append("file", image)
    fetch(`${process.env.REACT_APP_API_URL}news/addnews`, {
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
        setIsLoading(false)
				Swal.fire({
					title: "Added Successfully",
					icon: "success",
					text: "You Successfully Added News"
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
        color="dark"
        onClick={toggleShow}
        className={`fs-6 text-capitalize`}
      >        
        Add News
        &nbsp;&nbsp;<MDBIcon far icon="plus-square" />
      </MDBBtn>
      <MDBModal show={show} setShow={setShow} tabIndex="-1" staticBackdrop>
        <MDBModalDialog centered size="xl">
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
                    {/* <UploadWidget setImgUrl={handleImgUrl} setfileName={handleFileUrl}/> */}
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
                {isloading ? <MDBSpinner size="sm" role='status' grow/> : "Add News"}
                  
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