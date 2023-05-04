import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBIcon,
    MDBTypography,
    MDBInput,
    MDBCardTitle,
    MDBCardText
  } from "mdb-react-ui-kit"

  const MiniDescription = ({title,text}) => {
    return (
        <MDBCol>
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>
                        {title}
                    </MDBCardTitle>
                    <MDBCardText>
                        {text}
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    )
  }

  export default MiniDescription;