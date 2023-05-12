import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import React from "react";
import './emailverification.css'
const EmailVerification = ({nextStep}) => {
    const handleSubmit = (e) =>{
        nextStep()
    }
    return (
        <MDBContainer className="text-center mt-5 w-50">
        <MDBTypography tag='h2' className="fw-bold text-black">Verify your Email Address</MDBTypography>
            <MDBCard className="">
            <form onSubmit={handleSubmit}>
                <MDBCardBody>
                
                <MDBCardText>A verification code has been sent to</MDBCardText>
                <MDBCardText className="bluecolor">sample@email.com</MDBCardText>
                <MDBCardText>Please check your inbox and enter the verification code below to verify your email address. The code will expire in 10 mins.</MDBCardText>
                <MDBCol className="mb-3">
                
                <input className="m-1" style={{width:'50px', height:'50px'}}>

                </input>
                <input className="m-1" style={{width:'50px', height:'50px'}}>

                </input>
                <input className="m-1" style={{width:'50px', height:'50px'}}>

                </input>
                <input className="m-1" style={{width:'50px', height:'50px'}}>

                </input>
                <input className="m-1" style={{width:'50px', height:'50px'}}>

                </input>
                <input className="m-1" style={{width:'50px', height:'50px'}}>

                </input>                
                </MDBCol>
                <MDBCol className="d-grid col-3 mx-auto">
                <MDBBtn className="bgblue">Verify</MDBBtn>
                </MDBCol>

               
                <MDBCardText className="bluecolor mt-4">
                <a className="bluecolor m-5" href="https://www.facebook.com/">Resend code</a>
                <a className="bluecolor m-5" href="https://www.facebook.com/">Change email</a>
                </MDBCardText>
                
                </MDBCardBody>
                
                <MDBCol className="d-flex m-3 justify-content-end">
                <MDBBtn className="bgblue" type="submit">Next</MDBBtn>
                </MDBCol>
                </form>
            </MDBCard>

        </MDBContainer>
    )
}

export default EmailVerification;