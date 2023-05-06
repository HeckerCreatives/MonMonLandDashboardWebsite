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
// import { ENDPOINT } from "../../../../../components/utilities";

const ViewNews = ({ theme, news }) => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  return (
    <>
      <MDBBtn
        onClick={toggleShow}
        color="info"
        className="me-2"
        title="View"
        size="sm"
      >
        <MDBIcon far icon="eye" />
      </MDBBtn>

      <MDBModal show={show} setShow={setShow} tabIndex="-1" staticBackdrop>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className={``}>
            <MDBModalHeader>
              <MDBModalTitle>
                View <b>{String(news.title).toUpperCase()}</b>
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
                    // src={`${ENDPOINT}/assets/news/${news.image}`}
                    alt={news.image}
                    className="img-fluid"
                  />
                </MDBContainer>
              </MDBContainer>
              <MDBTypography
                tag="p"
                style={{ whiteSpace: "pre-wrap" }}
                className="text-start"
              >
                {news.description}
              </MDBTypography>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default ViewNews;
