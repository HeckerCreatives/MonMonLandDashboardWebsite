import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import React from "react";
import './subscriptionreceipt.css'
const SubscriptionReceipt = () => {
    return (
        <MDBContainer className="text-black  mt-5 w-50">
        <MDBTypography tag='h2' className="fw-bold text-center">Subscription Receipt</MDBTypography>
        <MDBCard>
            <MDBCardBody>
            <MDBRow>
                <MDBCol>
                    <MDBCardText className="mb-0 fw-bold">Billed to</MDBCardText>
                    <MDBCardText className="mb-0">Alden Richards</MDBCardText>
                </MDBCol>
                <MDBCol md={4}>
                <MDBCardText className="mb-0 fw-bold">Subscription</MDBCardText>
                <MDBCardText className="mb-0">ID <span className="bluecol">askdkjklaskdjiw</span></MDBCardText>
                <MDBCardText className="mb-0">Billing Date <span className="bluecol">July 1, 2025</span></MDBCardText>
                </MDBCol>
            </MDBRow>
            <MDBRow>
            <MDBCol className="mt-1 receiptborder fw-bold">                
                <MDBCardText>
                    Description
                </MDBCardText>
                 
            </MDBCol>
            <MDBCol className=" text-end mt-1 receiptborder fw-bold">                
                <MDBCardText>                
                Amount
                </MDBCardText>       
            </MDBCol>
            </MDBRow>

            <MDBRow>
            <MDBCol className="mt-3 receiptborder1">                
                <MDBCardText className="fw-bold mb-0">
                    Pearl Subscription - Free                    
                </MDBCardText>
                <MDBCardText>
                    July 1, 2025                   
                </MDBCardText>
            </MDBCol>
            <MDBCol className=" text-end mt-3 receiptborder1">                
                <MDBCardText className="fw-bold">                
                Php 0.00
                </MDBCardText>       
            </MDBCol>
            </MDBRow>

            <MDBRow className="justify-content-end">
            <MDBCol md={4}>
            <MDBCol  className="d-flex justify-content-between mt-3 ">                
                <MDBCardText className="fw-bold">                
                Total 
                </MDBCardText>
                <span>Php 0.00</span>
                
            </MDBCol>
            <MDBCol className="d-flex justify-content-between receiptborder1">
                <MDBCardText className="fw-bold">                
                Payments 
                </MDBCardText>
                <span>-Php 0.00</span>
            </MDBCol>
            <MDBCol className="d-flex justify-content-between  ">
            <MDBCardText className="fw-bold">                
                Amount Due 
                </MDBCardText>
                <span className="fw-bold">Php 0.00</span> 
            </MDBCol>
            </MDBCol>
            
            </MDBRow>
            </MDBCardBody>
            <MDBCol className="text-end m-3">
            <MDBBtn className="btnblue">Finish</MDBBtn>
            </MDBCol>
            
        </MDBCard>
        </MDBContainer>
    )
}

export default SubscriptionReceipt;