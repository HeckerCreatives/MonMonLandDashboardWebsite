import React from "react";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBSpinner,
    MDBRow,
    MDBIcon,
    MDBTypography,
  } from "mdb-react-ui-kit";
import logo from "../../assets/header/big logo.png"
const Login = () =>{
  return(
    <MDBContainer
    fluid
    className="d-flex align-items-center min-vh-100 dark-skin"
    >
      <MDBCol
        size={12}
        sm={10}
        md={8}
        lg={6}
        className="offset-lg-3 offset-md-2 offset-sm-1"
      >
        <MDBCard className="text-center bg-dark text-white">
          <MDBCardBody>
            <MDBRow className="d-flex align-items-center">
              <MDBCol md={6}>
              <img src={logo} alt="" className="img-fluid"/>
              </MDBCol>
              <MDBCol md={6}>
                <h1 className="h1-responsive mb-4">MonMonLand Login</h1>
                <MDBInput 
                label={
                  <span className="text-white">
                  Username
                  </span>
                } 
                type="text"
                className="my-3 text-white" 
                />                
                <MDBRow className="mx-0 my-3">
                  <MDBCol size={12} className="px-0 position-relative">
                    <MDBInput label={<span className="text-white">Password</span>} type="password"/>
                  </MDBCol>
                </MDBRow>
                <MDBBtn type="submit">
                  Login
                </MDBBtn>
                <MDBTypography className="mb-0 text-center d-flex flex-column align-items-center mt-3">
                  Forgot Password?
                </MDBTypography>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBContainer>
  )
}

export default Login;