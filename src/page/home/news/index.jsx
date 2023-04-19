import React, {useState} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBCarousel, MDBCarouselItem,MDBCard,MDBCardBody,MDBCardImage,MDBCardText } from "mdb-react-ui-kit";
import "./index.css"
import woodcutting from "../../../assets/character/Wood Cutting.png"
import crafting from "../../../assets/character/crafting.png"
import fishing from "../../../assets/character/fishing.png"

const News = () => {
    
    return (
        <MDBContainer fluid className="newsbgcolor" id="news">
            <MDBTypography className="h2 text-warning text-center fw-bold">LATEST NEWS</MDBTypography>
            <MDBContainer fluid className="d-flex align-items-center justify-content-center">
                
                    <MDBCard className="cards m-5">
                    <MDBCardImage src={woodcutting} alt='...' position='top' id="images"/>
                    <MDBCardBody>
                        <MDBCardText className="fw-bold text-center">
                        Mines are soon to Open
                        </MDBCardText>
                    </MDBCardBody>
                    </MDBCard>

                    <MDBCard className="cards m-5">
                    <MDBCardImage src={crafting} alt='...' position='top' id="images"/>
                    <MDBCardBody>
                        <MDBCardText className="fw-bold text-center">
                        Mines are soon to Open
                        </MDBCardText>
                    </MDBCardBody>
                    </MDBCard>

                    <MDBCard className="cards m-5">
                    <MDBCardImage src={fishing} alt='...' position='top' id="images"/>
                    <MDBCardBody>
                        <MDBCardText className="fw-bold text-center">
                        Mines are soon to Open
                        </MDBCardText>
                    </MDBCardBody>
                    </MDBCard>
                    
            </MDBContainer>
            
        </MDBContainer>
    );
};

export default News;