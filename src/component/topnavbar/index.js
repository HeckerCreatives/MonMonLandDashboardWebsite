import React from "react";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBIcon
} from "mdb-react-ui-kit";
import "./index.css"

const TopNavbar = () => {
    return (
        <MDBContainer
        fluid
        className="topnavbg d-flex align-items-end p-0"
        >        
        <MDBRow className="topnavbgcolor m-0">
        <MDBCol className="text d-flex justify-content-between align-items-center">
        Manage Account
        <MDBIcon fas icon="user-circle" size="lg"/>
        </MDBCol>
        </MDBRow>
        
        

        </MDBContainer>
    )
}

export default TopNavbar;