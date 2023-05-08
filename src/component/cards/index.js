import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBTypography,
  MDBInput,
  MDBRow
} from "mdb-react-ui-kit"


const Cards = ({icon,color,texts,title}) => {
    return(
        <MDBCol 
        md={4} 
        className="my-2 mt-md-2">
            <MDBCard className={`bg-${color} text-white`}>
                <MDBCardBody className="">
                <MDBRow className="d-flex align-items-center">
                <MDBCol className="col-4">
                    <span className="">
                        <MDBIcon size="3x" icon={icon}>
                        </MDBIcon>
                    </span>
                </MDBCol>
                <MDBCol className="col-8 text-end">
                    <MDBTypography tag="h4" className="font-weight-bold mt-2">
                    {title}
                    </MDBTypography>
                    <MDBTypography tag="h5" className="font-weight-bold mt-2">
                    {texts}
                    </MDBTypography>
                </MDBCol>   
                    
                    
                </MDBRow>
                    
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    )
}

export default Cards;