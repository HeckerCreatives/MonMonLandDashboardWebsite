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
import announcetitle from "../../../../assets/Ingame/announcementtitle.png"
const PlayerNews = () => {
    
return(
    <>
    <MDBContainer>
    <div className="text-center my-3">
        <img src={announcetitle} alt=""/>
    </div>
    <MDBRow>
        <MDBCol md={6} className="offset-3">
        <MDBCard>
      <MDBCardBody>
        <MDBCardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
        </MDBCol>
    </MDBRow>
    
    </MDBContainer>
      </>
)
}

export default PlayerNews;