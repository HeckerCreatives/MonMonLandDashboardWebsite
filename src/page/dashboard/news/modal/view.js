import React, { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
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

const ViewNews = ({ theme, news }) => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  return (
    <>
      <MDBBtn
        onClick={toggleShow}
        outline
        color="dark"
        className="mx-2"
        title="View"
        // size="sm"
      >
      View
        {/* <MDBIcon far icon="eye" />
         */}
      </MDBBtn>

      <MDBModal show={show} setShow={setShow} tabIndex="-1" staticBackdrop>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className={``}>
            <MDBModalHeader style={{background:"#A57552"}}>
              <MDBModalTitle className="text-light">
                View <b>{String(news.title).toUpperCase()}</b>
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBCard className="px-0 text-center mb-3" style={{background: "#EDCAB4",}}>
                <MDBCardBody
                  className="d-flex justify-content-center"
                  // style={{ width: "30rem", height: "auto" }}
                >
                  <img
                    src={(`${process.env.REACT_APP_API_URL}${news.image}`)}
                    alt={news.image}
                    className="img-fluid"
                  />
                </MDBCardBody>
              </MDBCard>
              <MDBCard className="px-0 text-center mb-3" style={{background: "#EDCAB4",}}>
                <MDBCardBody
                  className="d-flex justify-content-center"
                  // style={{ width: "30rem", height: "auto" }}
                >
                <MDBTypography
                tag="p"
                style={{ whiteSpace: "pre-wrap" }}
                className="text-start"
                >
                {news.description}  
              </MDBTypography>
                </MDBCardBody>
                </MDBCard>
              
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default ViewNews;
