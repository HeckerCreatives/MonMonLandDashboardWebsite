import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBTypography,
} from "mdb-react-ui-kit";

const ViewRoadmap = ({ theme, roadmap }) => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  return (
    <>
      <MDBBtn
        outline
        onClick={toggleShow}
        className='mx-2 fw-bold' 
        color='dark'
      >
        {/* <MDBIcon fas icon="plus" /> */}
        &nbsp;View
      </MDBBtn>

      <MDBModal show={show} setShow={setShow} tabIndex="-1" staticBackdrop>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className={``}>
            <MDBModalHeader style={{background:"#A57552"}}>
              <MDBModalTitle className="text-light">
                View <b>{String(roadmap.title).toUpperCase()}</b>
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBContainer fluid className="px-0 text-center mb-3">
                <MDBContainer
                  className="my-2"
                  style={{ width: "30rem", height: "auto" }}
                >
                  <img
                    src={`${roadmap.image}`}
                    alt={roadmap.image}
                    className="img-fluid"
                  />
                </MDBContainer>
              </MDBContainer>
              <MDBTypography
                tag="p"
                style={{ whiteSpace: "pre-wrap" }}
                className="text-start"
              >
                {roadmap.description}
              </MDBTypography>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default ViewRoadmap;
