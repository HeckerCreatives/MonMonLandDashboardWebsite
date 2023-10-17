import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import React from "react";
import "./index.css"
const FAQ = () => {

return(
    <MDBContainer fluid>
        <MDBRow>
            <MDBCol className="d-flex justify-content-around botnav">
                <MDBTypography tag={`h1`}>LOGO KONYARE</MDBTypography>
                <MDBTypography tag={`h1`}>KUNG ANU MAN GUSTO ILAGAY</MDBTypography>
            </MDBCol>
        </MDBRow>
        <MDBRow>
            <MDBCol lg={4} className="selection">
            <ul>
                <li>
                    <a href="/" >Go to Home Page</a>
                </li>
            </ul>
                
                {/* <MDBTypography tag={`h1`}>LISTAHAN</MDBTypography> */}
            </MDBCol>
            <MDBCol className="">
                <MDBTypography tag={`h1`}>NILALAMAN</MDBTypography>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
)
}

export default FAQ;