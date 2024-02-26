import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import mmticon from "../../../../assets/Ingame/assetsdashboard/Monster Monies icon.png"
import mcticon from "../../../../assets/Ingame/assetsdashboard/MML TOKEN.png"
// import pearlicon from "../../../../assets"
const AirDrop = () => {
    return(
        <MDBContainer>
            <MDBRow className="mt-5">
                <MDBCol lg={3}>
                    <MDBCard>
                        <MDBCardBody>
                        <div>
                            <img src={mmticon} alt="" style={{height: "65px", width: "65px"}}/>
                        </div>
                        Claim now
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol lg={3}>
                    <MDBCard>
                        
                        <MDBCardBody>
                        <div>
                            <img src={mcticon} alt="" style={{height: "65px", width: "65px"}}/>
                        </div>
                        Claim now
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol lg={3}>
                    <MDBCard>
                        <MDBCardBody>
                        Claim now
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol lg={3}>
                    <MDBCard>
                        <MDBCardBody>
                        Claim now
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                
            </MDBRow>
        </MDBContainer>
    )
}

export default AirDrop;