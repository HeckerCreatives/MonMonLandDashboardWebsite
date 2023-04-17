import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBCard } from "mdb-react-ui-kit";
import descriptionholder from "../../../assets/games/description holder.png"

const Games = () => {
    return(
        <MDBContainer fluid className="d-flex flex-column align-items-center justify-content-center">
        <MDBRow>
            <MDBCol className="mt-5">
                <MDBTypography className="h2 text-warning">
                    <strong>Games</strong>
                </MDBTypography>
            </MDBCol>
        </MDBRow>
        <MDBRow>
            <MDBCol className="d-flex justify-content-start">
                <img src={descriptionholder}>
                
                </img>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
    )
}

export default Games;