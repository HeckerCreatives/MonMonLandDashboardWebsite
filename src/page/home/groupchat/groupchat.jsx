import { MDBContainer, MDBTypography,MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn, 
    MDBRow,
    MDBCol,
    MDBCardHeader,
    MDBCardFooter,
    MDBIcon,
    MDBCardImage,
    MDBRipple,
    MDBListGroup,
    MDBListGroupItem,} from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import backbtn from "../../../assets/topup/back BUTTON.png"
import teamdragon from "../../../assets/groupchat/teamdragon.jpg"
import icon from "../../../assets/character/Wood Cutting.png"
import paranoia from "../../../assets/groupchat/teamparanoia.png"
import monmonwarriors from "../../../assets/groupchat/monmonwarriors.png"
import { isgamelogin } from '../../../component/utils'
import {isMobile} from 'react-device-detect'
import "./groupchat.css"
const Groupchat = () =>{
   
   
   

    return(
        <>
            <div className="kontainer">

            <MDBBtn className="bg-transparent p-0 mt-2" onClick={() => window.location.href="/"}>
                <img className="" src={backbtn} alt="" />
            </MDBBtn>
            
            </div>
            <div className="p-3" style={{backgroundColor: "#432808"}}>
                
               
            </div>
            
        <MDBContainer fluid className="">            
            

        <MDBContainer fluid>
        <MDBRow className="position-relative">

            <MDBCard className="mt-5 px-0">
                    <MDBCardHeader style={{background: "#8D5513", color: "white"}}>Facebook Messenger Group Chat's</MDBCardHeader>
                <MDBCardBody>
                    <MDBRow >
                    <MDBCol lg={3} className="my-2">
                        <MDBCard alignment="center" >
                        <MDBCardHeader className="fw-bold" style={{background: "#FADDBF"}}>Team Leader: earlyxyz</MDBCardHeader>
                        <MDBCardBody className="bundlesbdy p-0">
                            <div className="d-flex justify-content-center">
                                <img
                                src={monmonwarriors} 
                                className="imahe"
                                alt=""
                                />
                            </div>
                            <div className="d-flex align-items-end">
                            <MDBCardText className="p-4 text-white" style={{background: "#838383", width: "100%",height: "92px"}}>
                            Team MonMon Warriors
                            </MDBCardText>
                            </div>
                            

                        </MDBCardBody>
                        <MDBCardFooter className="d-flex justify-content-center align-items-center" style={{background: "#FADDBF"}}>
                        <MDBBtn color="warning" href='#'
                        onClick={() => isMobile ? window.location.href = "fb-messenger://m.me/j/AbbU_ZUsMzba0Hm1/" : window.location.href = "https://m.me/j/AbbU_ZUsMzba0Hm1/"}
                        >
                        <MDBIcon className="me-2" fab icon="facebook-messenger" /> Join Group
                        </MDBBtn>
                        </MDBCardFooter>
                        </MDBCard>
                        </MDBCol>

                        <MDBCol lg={3} className="my-2">
                        <MDBCard alignment="center" >
                        <MDBCardHeader className="fw-bold" style={{background: "#FADDBF"}}>Team Leader: jmjm</MDBCardHeader>
                        <MDBCardBody className="bundlesbdy p-0">
                            <div className="d-flex justify-content-center">
                                <img
                                src={teamdragon} 
                                className="imahe"
                                alt=""
                                />
                            </div>
                            <div className="d-flex justify-content-center align-items-end">
                            <MDBCardText className="p-4 text-white" style={{background: "#838383", width: "100%", height: "92px"}}>
                            Team Dragon
                            </MDBCardText>
                            </div>
                           
                            
                        </MDBCardBody>
                        <MDBCardFooter className="d-flex justify-content-center align-items-center" style={{background: "#FADDBF"}}>
                        <MDBBtn color="warning" href='#'
                        onClick={() => isMobile ? window.location.href = "fb-messenger://m.me/j/AbZ9kDYnEE8rajsP/" : window.location.href = "https://m.me/j/AbZ9kDYnEE8rajsP/"}
                        >
                        <MDBIcon className="me-2" fab icon="facebook-messenger" /> Join Group
                        </MDBBtn>
                        </MDBCardFooter>
                        </MDBCard>
                        </MDBCol>

                        <MDBCol lg={3} className="my-2">
                        <MDBCard alignment="center" >
                        <MDBCardHeader className="fw-bold" style={{background: "#FADDBF"}}>Team Leader: IGold069</MDBCardHeader>
                        <MDBCardBody className="bundlesbdy p-0">
                            <div className="d-flex justify-content-center">
                                <img
                                src={paranoia} 
                                className="imahe"
                                alt=""
                                />
                            </div>
                            
                            <div className="d-flex justify-content-center align-items-end">
                            <MDBCardText className="p-4 text-white" style={{background: "#838383", width: "100%", height: "92px"}}>
                            Team Paranoia
                            </MDBCardText>
                            </div>
                            
                            
                        </MDBCardBody>
                        <MDBCardFooter className="d-flex justify-content-center align-items-center" style={{background: "#FADDBF"}}>
                        <MDBBtn color="warning" href='#' 
                        onClick={() => isMobile ? window.location.href = "fb-messenger://m.me/j/AbYM0bFAYyT--Irh/" : window.location.href = "https://m.me/j/AbYM0bFAYyT--Irh/"}
                        >
                        <MDBIcon className="me-2" fab icon="facebook-messenger" /> Join Group
                        </MDBBtn>
                        </MDBCardFooter>
                        </MDBCard>
                        </MDBCol>

                        

                        {/* <MDBCol lg={3} className="my-2">
                        <MDBCard alignment="center" >
                        <MDBCardHeader className="fw-bold p-3" style={{background: "#FADDBF"}}></MDBCardHeader>
                        <MDBCardBody className="bundlesbdy p-0">
                            <div className="d-flex justify-content-center">
                                <img
                                src={icon} 
                                className="img-fluid"
                                alt=""
                                style={{width: '200px', height: '200px'}}
                                />
                            </div>
                            <div className="d-flex justify-content-center align-items-end">
                            <MDBCardText className="p-4 text-white" style={{background: "#838383", width: "100%", height: "92px"}}>
                            Team Dragon
                            </MDBCardText>
                            </div>
                            
                        </MDBCardBody>
                        <MDBCardFooter className="d-flex justify-content-center align-items-center" style={{background: "#FADDBF"}}>
                        <MDBBtn color="warning" href='#'
                        // onClick={() => isMobile ? window.location.href = "fb-messenger://m.me/j/AbZ1W--9dFHDZ2g9/" : window.location.href = "https://m.me/j/AbZ1W--9dFHDZ2g9/"}
                        >
                        <MDBIcon className="me-2" fab icon="facebook-messenger" /> Join Group
                        </MDBBtn>
                        </MDBCardFooter>
                        </MDBCard>
                        </MDBCol> */}
                    </MDBRow>
                    
                </MDBCardBody>
            </MDBCard>

        </MDBRow>

        </MDBContainer>
        
        </MDBContainer>
        </>
    )
}

export default Groupchat;