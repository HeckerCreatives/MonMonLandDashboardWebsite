import React, {useEffect, useState} from "react";
import './dashboard.css'
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn } from "mdb-react-ui-kit";
const Dashboard = () => {
    
    return(
        <MDBContainer fluid className="text-center">
            <Link to = "/updateprogressbar">
            <MDBBtn>Update Progress Bar</MDBBtn>
            </Link>
            <Link to = "/updatesubs">
            <MDBBtn>Update Subscription info</MDBBtn>
            </Link>
            <Link to = "/updatenews">
            <MDBBtn>Update News info</MDBBtn>
            </Link>
            <Link to = "/updateroadmap">
            <MDBBtn>Update Roadmap info</MDBBtn>
            </Link>            
            
        </MDBContainer>
    )
}

export default Dashboard;