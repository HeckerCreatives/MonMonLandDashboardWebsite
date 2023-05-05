import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBTypography,
  MDBInput
} from "mdb-react-ui-kit"


const Cards = ({icon,color,texts,title}) => {
    return(
        <MDBCol 
        md={4} 
        className="my-2 mt-md-2">
            <MDBCard className={`bg-${color} text-white`}>
                <MDBCardBody className="pt-0">
                    <span className="d-flex justify-content-between align-items-center mt-4">
                        <MDBIcon size="2x" icon={icon}>

                        </MDBIcon>
                    </span>
                    <MDBTypography tag="h4" className="font-weight-bold mt-2">
                    {title}
                    </MDBTypography>
                    <MDBTypography tag="h5" className="font-weight-bold mt-2">
                    {texts}
                    </MDBTypography>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    )
}

export default Cards;