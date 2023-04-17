import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTypography } from "mdb-react-ui-kit";
import "./index.css";
import biglogo from "../../../assets/header/big logo.png"
import sliderholder from "../../../assets/header/activity slider holder.png"
import slider from "../../../assets/header/activity slider .png"
import playnow from "../../../assets/header/play now btn.png"



const Header = () => {
    return (
        <MDBContainer fluid className="d-flex flex-column justify-content-center align-items-center" id="home">
            <MDBRow>
                <MDBCol className="mt-5 mb-3">
                <img src={biglogo} id="biglogo"></img>
                </MDBCol>
            </MDBRow>                            
            <MDBRow>
                <MDBCol className="mt-5 mb-5">
                <MDBTypography className="h2 text-center text-white">
                    <strong>Game Activity</strong>
                </MDBTypography>
                <img src={slider} id="slider"></img>
                <img src={sliderholder}></img>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol>                
                <img src={playnow}></img>
                </MDBCol>
            </MDBRow>

            
            
        </MDBContainer>
    )
}

export default Header;