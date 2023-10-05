import React from "react";
import {
    MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBSpinner
  } from 'mdb-react-ui-kit';
  import logo from '../../../assets/header/big logo.png'
const TopUpRedirect = () =>{
    
    return(
        <MDBContainer className="vh-100 d-flex justify-content-center align-items-center">
        <MDBRow className="">
            <MDBCol className="">
            <MDBCard alignment="center">
            <MDBCardBody>
            <MDBCardImage src={logo} style={{width: "50%"}}/>
                <MDBCardText tag="h1">
                    YOU ARE NOW 
                </MDBCardText>
                <MDBCardText tag="h1">
                    REDIRECTING TO COINBASE
                </MDBCardText>
                <MDBSpinner/>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
    )
}

export default TopUpRedirect;