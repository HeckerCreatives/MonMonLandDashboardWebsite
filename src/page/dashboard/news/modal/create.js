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
  const [file, setFile] = useState();

  const handlePreview = e => {
    if (e.target.files[0].size / 1024 <= 25000) {
      setFile(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
    } else {
    //   toast.warn("Maximum image size is 25mb");
    }
  };

  function addnews () {
    fetch(`${process.env.REACT_APP_NEWS_URL}/addnews`, {
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

return (
    <>
      <MDBBtn
        onClick={toggleShow}
        className={` fs-6 text-capitalize`}
      >
        <MDBIcon far icon="plus-square" />
        &nbsp;&nbsp;Create News
      </MDBBtn>
      <MDBModal show={show} setShow={setShow} tabIndex="-1" staticBackdrop>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className={``}>
            <form autoComplete="off" onSubmit={addnews}>
              <MDBModalHeader>
                <MDBModalTitle>Create News</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput
                  required
                  label={<span className={``}>News Title</span>}
                  className={` mb-3`}
                  type="text"
                  name="title"
                  onChange={e => setTitles(e.target.value)}
                />
                <MDBContainer fluid className="px-0 text-center mb-3">
                  <MDBContainer
                    className="my-2"
                    style={{ width: "30rem", height: "auto" }}
                  >
                    <img
                      src={image || logo}
                      alt="preview"
                      className="img-fluid"
                    />
                  </MDBContainer>
                  {/* <MDBBtn
                    type="button"
                    onClick={() =>
                      document.getElementById("title-image").click()
                    }
                    className={` px-5`}
                    onChange={e => setDescriptions(e.target.value)}
                  >
                    Upload Image
                  </MDBBtn> */}
                  <UploadWidget/>
                  <MDBFile
                    id="title-image"
                    className="d-none"
                    onChange={handlePreview}
                  />
                </MDBContainer>
                <MDBTextArea
                  label={
                    <span className={``}>News Description</span>
                  }
                  required
                  className={` mb-3`}
                  rows={10}
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

export default CreateNews;