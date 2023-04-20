import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTypography,MDBProgress, MDBProgressBar } from "mdb-react-ui-kit";
import "./index.css";
import biglogo from "../../../assets/header/big logo.png"
import sliderholder from "../../../assets/header/activity slider holder.png"
import slider from "../../../assets/header/activity slider .png"
import playnow from "../../../assets/header/play now btn.png"
import Navbar from "../../../component"



const Header = () => {
    return (
        <div className="kahitanu">        
        <MDBContainer fluid className="d-flex text-center justify-content-center align-items-center mb-5" id="home">

        <MDBContainer fluid className="">
            <MDBRow>
                <MDBCol className="mt-5 mb-3 sm-col-12 text-center">
                    <img src={biglogo} id="biglogo" className="img-fluid" alt=""></img>
                </MDBCol>
            </MDBRow>

            <MDBRow>
                <MDBCol className=" mt-5 mb-5">
                <MDBTypography className=" h1 fw-bold text-center text-white">
                    <p className="stroke">Game Activity</p>
                </MDBTypography>
                
                <MDBCol className="d-flex justify-content-center align-items-center text-center">
                 
                <MDBProgress height='50' className="innerbar">
                    <MDBProgressBar className="progressbar" width={30} valuemin={0} valuemax={1000}/>                                      
                    
                </MDBProgress> 
                <MDBTypography className="text mt-3 fw-bold">330,000/1,000,000</MDBTypography>      
                </MDBCol>
                                
                </MDBCol>
                </MDBRow>

                <MDBRow> 
                    <MDBCol className="text-center sm-col-12">                
                        <img src={playnow} id="playnow" alt="" className="img-fluid"></img>
                    </MDBCol>
                </MDBRow>
        </MDBContainer>
            
        </MDBContainer>
        </div>
    )
}

export default Header;