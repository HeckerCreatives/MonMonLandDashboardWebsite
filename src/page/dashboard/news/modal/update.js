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
//   const dispatch = useDispatch();

  const handlePreview = e => {
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

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
            <form autoComplete="off">
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
                />
                <MDBContainer fluid className="px-0 text-center mb-3">
                  <MDBContainer
                    className="my-2"
                    style={{ width: "30rem", height: "auto" }}
                  >
                    <img
                    //   src={image || `${ENDPOINT}/assets/news/${news.image}`}
                      alt={news.image}
                      className="img-fluid"
                    />
                  </MDBContainer>
                  <MDBBtn
                    type="button"
                    onClick={() =>
                      document.getElementById("update-image").click()
                    }
                    className={` px-5`}
                  >
                    Upload Image
                  </MDBBtn>
                  <MDBFile
                    id="update-image"
                    className="d-none"
                    onChange={handlePreview}
                  />
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