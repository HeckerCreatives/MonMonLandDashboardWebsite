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
        <MDBCol md={12} className="my-4">
            <MDBCard className="shadow-2">
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