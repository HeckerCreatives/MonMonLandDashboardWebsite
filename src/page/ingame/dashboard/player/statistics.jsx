import React, {useState, useEffect} from "react";
import 
{   MDBContainer, 
    MDBBtn, 
    MDBRow, 
    MDBCol,
    MDBIcon, 
    MDBCard, 
    MDBCardBody,
    MDBTypography, 
    MDBCardText,
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter, } 
from "mdb-react-ui-kit";

const Dashboardstatistics = ({image, title, number}) => {
    
return(
    <>
    <MDBCard className="text-mute h-100">          
          <MDBCardBody>
            <MDBRow className="justify-content-between align-items-center">
              <MDBCol lg={3} className="text-center">
              <img src={image} alt=""/>
              </MDBCol>
              <MDBCol className="my-2 p-0">
              <div>
                <p className="text-end">{title}</p>
                <h2 className="text-end">{number}</h2>
              </div>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
    </MDBCard>
      </>
)
}

export default Dashboardstatistics;