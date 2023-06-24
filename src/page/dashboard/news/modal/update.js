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
  MDBCardText,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import UploadWidget from "../../../../component/uploadwidget/uploadwidet";

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
            title: titles ? titles : news.title,
            description: descriptions ? descriptions : news.description,
            image: image ? image : news.image
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
const handleImgUrl = (url) => {
  // Use the uploaded image URL in the parent component or pass it to another component
  setImage(url);
};
  return (
    <>
      <MDBBtn
        onClick={toggleShow}
        outline
        color="dark"
        className="mx-2"
        title="Update"
        // size="sm"
      >
      Edit
        {/* <MDBIcon far icon="edit" /> */}
      </MDBBtn>
      <MDBModal show={show} setShow={setShow} tabIndex="-1" staticBackdrop>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className={``}>
            <form autoComplete="off" onSubmit={updatenews}>
              <MDBModalHeader style={{background:"#A57552"}}>
                <MDBModalTitle className="text-light">
                  Update <b>{String(news.title).toUpperCase()}</b>
                </MDBModalTitle>
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
                 
                <img
                  src={image ? image : news.image}
                  alt="preview"
                  className="img-fluid"
                />                  
                    <UploadWidget setImgUrl={handleImgUrl}/>
                    </MDBCol>
                  <MDBCol>
                  <MDBCardText className="text-color mb-0 fw-bold">
                    News Title :
                  </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1" defaultValue={news.title} style={{width:'100%'}} onChange={e => setTitles(e.target.value)} required></input>
                  <MDBCardText className="text-color mb-0 fw-bold">
                   Description :
                  </MDBCardText>
                  <textarea rows="5" className="rounded" name="description" defaultValue={news.description} style={{width:'100%',resize: "none"}} required onChange={e => setDescriptions(e.target.value)}></textarea>
                  </MDBCol>
                </MDBRow>
                </MDBCardBody>
                </MDBCard>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn className={`text-dark fw-bold`} type="button" style={{background:"#DCE3E8"}} onClick={toggleShow}>
                  Close
                </MDBBtn>
                <MDBBtn type="submit" className={`fw-bold`}>
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