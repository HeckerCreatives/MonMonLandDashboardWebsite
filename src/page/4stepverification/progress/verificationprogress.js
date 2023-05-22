import { MDBCol, MDBContainer, MDBRow, MDBTypography,MDBIcon} from "mdb-react-ui-kit";
import React from "react";
import './verificationprogress.css'
const VerificationProgress = ({currentStep}) => {
    
    return (
        <MDBContainer fluid className="text-center progcolor">
        <MDBRow className="pt-3">
            <MDBCol>                
                <MDBTypography>
                {currentStep === 1 ? <MDBIcon fas icon="circle"  className="color m-1"/> : 
                <MDBIcon far icon="circle" className="m-1"/>} 
                Email Verification
                </MDBTypography>            
            </MDBCol>
            <MDBCol>
                <MDBTypography>
                {currentStep === 2 ? <MDBIcon fas icon="circle"  className="color m-1"/> : 
                <MDBIcon far icon="circle" className="m-1"/>}                 
                Choose Subscription
                </MDBTypography>                      
            </MDBCol>
            <MDBCol>
                <MDBTypography>
                {currentStep === 3 ? <MDBIcon fas icon="circle"  className="color m-1"/> : 
                <MDBIcon far icon="circle" className="m-1"/>} 
                Subscription Receipt
                </MDBTypography>            
            </MDBCol>
            <MDBCol>
                <MDBTypography>
                {currentStep === 4 ? <MDBIcon fas icon="circle"  className="color m-1"/> : 
                <MDBIcon far icon="circle" className="m-1"/>} 
                Confirm
                </MDBTypography>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
        
        
    )
}

export default VerificationProgress;