import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBCard, MDBCardBody, MDBCardTitle, MDBCardSubTitle, MDBBtn, MDBListGroup, MDBListGroupItem, MDBCardImage } from "mdb-react-ui-kit";
import ruby from "../../../assets/subscription/ruby badge png.png"
import emerald from "../../../assets/subscription/emerald png.png"
import diamond from "../../../assets/subscription/diamond.png"
import pearl from "../../../assets/subscription/pearl badge.png"
import "./index.css"
const Subscription = () => {
    return (
        <MDBContainer fluid className="bgcolor d-flex flex-column align-items-center justify-content-center" id="subscription">
        
                <MDBTypography className="mt-5 titlefontsize text-warning fw-bold">
                    Subscription
                </MDBTypography>
           

        <MDBRow>
        <MDBCol className="text-center mb-3">
        
        <MDBCard className="cardmargin">
        <MDBCardImage src={pearl} position="top" alt="" className="" id="badge"/>
            <MDBCardBody>            
                <MDBCardTitle className="fw-bold h2 mt-5">Pearl Subscription</MDBCardTitle>
                    <MDBCardSubTitle className="fw-bold h3 price mb-5">FREE</MDBCardSubTitle>
            <ul>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id rhoncus neque. Sed a mauris urna. Proin ut lorem eu urna tincidunt interdum. Nullam eu metus vel urna ullamcorper volutpat. Sed consectetur, turpis a feugiat tincidunt, mi quam varius mi, at cursus justo risus ut urna.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id rhoncus neque. Sed a mauris urna. Proin ut lorem eu urna tincidunt interdum. Nullam eu metus vel urna ullamcorper volutpat. Sed consectetur, turpis a feugiat tincidunt, mi quam varius mi, at cursus justo risus ut urna.
                </li>
            </ul>
                <MDBBtn type="button" className="btn btn-warning" size="lg">SUBSCRIBE NOW</MDBBtn>                
                
            </MDBCardBody>
        </MDBCard>
        </MDBCol>

        <MDBCol className="text-center mb-3">
        
        <MDBCard className="cardmargin">
        <MDBCardImage src={ruby} className="" id="badge" />
        <MDBCardBody>
        
        <MDBCardTitle className="h2 fw-bold mt-5">Ruby Subscription</MDBCardTitle>
            <MDBCardSubTitle className="h3 price fw-bold mb-5">Php 999.00</MDBCardSubTitle>
            <ul>
                <li className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id rhoncus neque. Sed a mauris urna. Proin ut lorem eu urna tincidunt interdum. Nullam eu metus vel urna ullamcorper volutpat. Sed consectetur, turpis a feugiat tincidunt, mi quam varius mi, at cursus justo risus ut urna.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id rhoncus neque. Sed a mauris urna. Proin ut lorem eu urna tincidunt interdum. Nullam eu metus vel urna ullamcorper volutpat. Sed consectetur, turpis a feugiat tincidunt, mi quam varius mi, at cursus justo risus ut urna.
                </li>
            </ul>
            <MDBBtn type="button" className="btn btn-warning" size="lg">SUBSCRIBE NOW</MDBBtn> 
        
        </MDBCardBody>
        
        </MDBCard>
        </MDBCol>
        
        <MDBCol className="text-center">
        <MDBCard className="cardmargin">
        <MDBCardImage src={emerald} id="badge"/>
            <MDBCardBody>            
                <MDBCardTitle className="fw-bold h2 mt-5">Emerald Subscription</MDBCardTitle>
                    <MDBCardSubTitle className="fw-bold h3 price mb-5">2,499.00</MDBCardSubTitle>
                    
            <ul>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id rhoncus neque. Sed a mauris urna. Proin ut lorem eu urna tincidunt interdum. Nullam eu metus vel urna ullamcorper volutpat. Sed consectetur, turpis a feugiat tincidunt, mi quam varius mi, at cursus justo risus ut urna.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id rhoncus neque. Sed a mauris urna. Proin ut lorem eu urna tincidunt interdum. Nullam eu metus vel urna ullamcorper volutpat. Sed consectetur, turpis a feugiat tincidunt, mi quam varius mi, at cursus justo risus ut urna.
                </li>
            </ul>
            <MDBBtn type="button" className="btn btn-warning" size="lg">SUBSCRIBE NOW</MDBBtn>                
                
            </MDBCardBody>
        </MDBCard>
        </MDBCol>
        
        <MDBCol className="text-center">
        <MDBCard className="cardmargin">
        <MDBCardImage src={diamond} id="badge"/>
            <MDBCardBody>
                <MDBCardTitle className="fw-bold h2 mt-5">Diamond Subscription</MDBCardTitle>
                <MDBCardSubTitle className="fw-bold h3 price mb-5">4,999.00</MDBCardSubTitle>
            <MDBTypography className="text-justify">
            <ul>
            <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id rhoncus neque. Sed a mauris urna. Proin ut lorem eu urna tincidunt interdum. Nullam eu metus vel urna ullamcorper volutpat. Sed consectetur, turpis a feugiat tincidunt, mi quam varius mi, at cursus justo risus ut urna.
            </li>
            <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id rhoncus neque. Sed a mauris urna. Proin ut lorem eu urna tincidunt interdum. Nullam eu metus vel urna ullamcorper volutpat. Sed consectetur, turpis a feugiat tincidunt, mi quam varius mi, at cursus justo risus ut urna.
            </li>
            </ul>                
            </MDBTypography>    
            <MDBBtn type="button" className="btn btn-warning" size="lg">SUBSCRIBE NOW</MDBBtn> 
            </MDBCardBody>
        </MDBCard>
        
        </MDBCol>
        </MDBRow>
        
                      
        </MDBContainer>
    )
}

export default Subscription;