import React, {useEffect, useState} from "react";
import './dashboard.css'
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBRow, MDBCol } from "mdb-react-ui-kit";
const Dashboard = () => {
    
    return(
        <MDBContainer fluid className="text-center">
        <MDBRow>
        <Link to="/">
        <MDBBtn>BACK</MDBBtn>
        </Link>        
            <MDBCol>
                <Link to = "/admin/dashboard/updateprogressbar">
                <MDBBtn>Update Progress Bar</MDBBtn>
                </Link>
                <Link to = "/admin/dashboard/updatesubs">
                <MDBBtn>Update Subscription info</MDBBtn>
                </Link>
                <Link to = "/admin/dashboard/updatenews">
                <MDBBtn>Update News info</MDBBtn>
                </Link>
                <Link to = "/admin/dashboard/updateroadmap">
                <MDBBtn>Update Roadmap info</MDBBtn>
                </Link>
            </MDBCol>        
        </MDBRow>                    
        </MDBContainer>
    )
}

export default Dashboard;