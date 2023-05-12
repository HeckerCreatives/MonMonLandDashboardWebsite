import { MDBCol, MDBContainer, MDBRow, MDBTypography,MDBIcon} from "mdb-react-ui-kit";
import React from "react";
import './verificationprogress.css'
const VerificationProgress = () => {
    return (
        <MDBContainer fluid className="text-center progcolor">
        <MDBRow className="pt-3">
            <MDBCol>                
                <MDBTypography>
                <MDBIcon far icon="circle" className="m-1"/>
                Email Verification
                </MDBTypography>            
            </MDBCol>
            <MDBCol>
                <MDBTypography>
                <MDBIcon far icon="circle" className="m-1"/>
                Choose Subscription
                </MDBTypography>                      
            </MDBCol>
            <MDBCol>
                <MDBTypography>
                <MDBIcon far icon="circle" className="m-1"/>
                Subscription Receipt
                </MDBTypography>            
            </MDBCol>
            <MDBCol>
                <MDBTypography>
                <MDBIcon far icon="circle" className="m-1"/>
                Confirm
                </MDBTypography>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
        
        
    )
}

export default VerificationProgress;