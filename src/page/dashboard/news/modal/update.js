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
import UploadWidget from "../../../../component/uploadwidget/uploadwidet";
// import { ENDPOINT } from "../../../../../components/utilities";
// import { useDispatch } from "react-redux";
// import { UPLOAD } from "../../../../../redux/slices/auth";
// import { toast } from "react-toastify";
// import { UPDATE } from "../../../../../redux/slices/news";

const UpdateNewsModal = ({ theme, news }) => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [titles, setTitles] = useState('');
  const [descriptions, setDescriptions] = useState('');

  const handlePreview = e => {
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  function updatenews (e) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}news/${news._id}/update`, {
        method:'PUT',
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
//   const handleSubmit = e => {
//     e.preventDefault();

//     const { title, description } = e.target;

//     if (file) {
//       const reader = new FileReader();

//       reader.onload = e =>
//         dispatch(
//           UPLOAD({
//             path: `news`,
//             base64: reader.result.split(",")[1],
//             name: file.name,
//           })
//         );

//       reader.readAsDataURL(file);
//     }

//     dispatch(
//       UPDATE({
//         id: news._id,
//         data: {
//           title: title.value,
//           description: description.value,
//           image: file ? file.name : news.image,
//         },
//       })
//     );
//     setShow(false);
//   };

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
            <form autoComplete="off" onSubmit={updatenews}>
              <MDBModalHeader>
                <MDBModalTitle>
                  Update <b>{String(news.title).toUpperCase()}</b>
                </MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput
                  label={<span className={``}>News Title</span>}
                  className={` mb-3`}
                  defaultValue={news.title}
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
                      src={image || `${news.image}`}
                      alt={news.image}
                      className="img-fluid"
                      onChange={e => setImage(e.target.value)}  
                    />
                  </MDBContainer>
                  {/* <MDBBtn
                    type="button"
                    onClick={() =>
                      document.getElementById("update-image").click()
                    }
                    className={` px-5`}
                  >
                    Upload Image                    
                  </MDBBtn> */}
                  <UploadWidget/>
                  {/* <MDBFile
                    id="update-image"
                    className="d-none"
                    onChange={handlePreview}
                  /> */}
                </MDBContainer>
                <MDBTextArea
                  label={
                    <span className={``}>News Description</span>
                  }
                  className={` mb-3`}
                  rows={10}
                  defaultValue={news.description}
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

export default UpdateNewsModal;