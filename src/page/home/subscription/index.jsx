import React, { Component } from "react";
import { MDBContainer,
 MDBRow,
 MDBCol,
 MDBTypography,
 MDBCard,
 MDBCardBody,
 MDBCardTitle,
 MDBCardSubTitle,
 MDBBtn,
 MDBCarousel,
 MDBCarouselItem,
 MDBCardImage } from "mdb-react-ui-kit";
import ruby from "../../../assets/subscription/ruby badge png.png"
import emerald from "../../../assets/subscription/emerald png.png"
import diamond from "../../../assets/subscription/diamond.png"
import pearl from "../../../assets/subscription/pearl badge.png"
import caro from "../../../assets/caro.png"
import Slider from "react-slick";
import "./index.css"

const Subscription = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return (
        <>
        <MDBContainer fluid className="bgcolor" id="subscription">

        <MDBTypography className="mt-5 titlefontsize text-warning fw-bold text-center">
            Subscription
        </MDBTypography>

        <div className="desktopview text-center">
        {/* for desktop */}
        <MDBContainer fluid className="d-flex alig-items-center justify-content-center ">
        <MDBRow>

        <MDBCol className="mb-3">
        
        <MDBCard className="cardmargin col-12" style={{height:"90%"}}>
        <MDBCardImage src={pearl} alt="" className="" id="badge"/>
            <MDBCardBody>            
                <MDBCardTitle className="fw-bold h2 mt-5">Pearl Subscription</MDBCardTitle>
                    <MDBCardSubTitle className="fw-bold h3 price mb-5">FREE</MDBCardSubTitle>
            <ul className="mx-4 p-4">
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
            </ul>
                <MDBBtn type="button" className="btn btn-warning fw-bold" size="lg">SUBSCRIBE NOW</MDBBtn>                
                
            </MDBCardBody>
        </MDBCard>
        </MDBCol>

        <MDBCol className="mb-3">
        
        <MDBCard className="cardmargin col-12" style={{height:"90%"}}>
        <MDBCardImage src={ruby} className="" id="badge" />
        <MDBCardBody>
        
        <MDBCardTitle className="h2 fw-bold mt-5">Ruby Subscription</MDBCardTitle>
            <MDBCardSubTitle className="h3 price fw-bold mb-5">Php 999.00</MDBCardSubTitle>
            <ul className="mx-4 p-4">
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
            </ul>
            <MDBBtn type="button" className="btn btn-warning fw-bold" size="lg">SUBSCRIBE NOW</MDBBtn> 
        
        </MDBCardBody>
        
        </MDBCard>
        </MDBCol>
        
        <MDBCol className="mb-3">
        <MDBCard className="cardmargin col-12" style={{height:"90%"}}>
        <MDBCardImage src={emerald} id="badge"/>
            <MDBCardBody>            
                <MDBCardTitle className="fw-bold h2 mt-5">Emerald Subscription</MDBCardTitle>
                    <MDBCardSubTitle className="fw-bold h3 price mb-5">2,499.00</MDBCardSubTitle>
                    
            <ul className="mx-4 p-4">
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
            </ul>
            <MDBBtn type="button" className="btn btn-warning fw-bold" size="lg">SUBSCRIBE NOW</MDBBtn>                
                
            </MDBCardBody>
        </MDBCard>
        </MDBCol>
        
        <MDBCol className="mb-3">
        <MDBCard className="cardmargin col-12" style={{height:"90%"}}>
        <MDBCardImage src={diamond} id="badge"/>
            <MDBCardBody>
                <MDBCardTitle className="fw-bold h2 mt-5">Diamond Subscription</MDBCardTitle>
                <MDBCardSubTitle className="fw-bold h3 price mb-5">4,999.00</MDBCardSubTitle>
            <MDBTypography className="text-center">
            <ul className="mx-4 p-4">
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
            </ul>                
            </MDBTypography>    
            <MDBBtn type="button" className="btn btn-warning fw-bold" size="lg">SUBSCRIBE NOW</MDBBtn> 
            </MDBCardBody>
        </MDBCard>
        
        </MDBCol>

        </MDBRow>
        
        </MDBContainer>
        </div>
        
        <div className="mobileview">
        <MDBContainer className="">
        <Slider {...settings}>

        {/* PEARL */}
        <div className="text-center">
            <MDBCard className="cardmargin col-12">
        <MDBCardImage src={pearl} alt="" className="" id="badge"/>
            <MDBCardBody>            
                <MDBCardTitle className="fw-bold h2 mt-5">Pearl Subscription</MDBCardTitle>
                    <MDBCardSubTitle className="fw-bold h3 price mb-5">FREE</MDBCardSubTitle>
            <ul className="mx-4 p-4">
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
            </ul>
                <MDBBtn type="button" className="btn btn-warning fw-bold" size="lg">SUBSCRIBE NOW</MDBBtn>                
                
            </MDBCardBody>
        </MDBCard>
        </div>

        {/* RUBY */}
        <div className="text-center">
        <MDBCard className="cardmargin col-12">
            <MDBCardImage src={ruby} className="" id="badge" />
        <MDBCardBody>
        
        <MDBCardTitle className="h2 fw-bold mt-5">Ruby Subscription</MDBCardTitle>
            <MDBCardSubTitle className="h3 price fw-bold mb-5">Php 999.00</MDBCardSubTitle>
            <ul className="mx-4 p-4">
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
            </ul>
            <MDBBtn type="button" className="btn btn-warning fw-bold" size="lg">SUBSCRIBE NOW</MDBBtn> 
        
        </MDBCardBody>
        </MDBCard>
        </div>
        

        {/* EMERALD */}
            <div className="text-center">
            <MDBCard className="cardmargin col-12">
        <MDBCardImage src={emerald} id="badge"/>
            <MDBCardBody>            
                <MDBCardTitle className="fw-bold h2 mt-5">Emerald Subscription</MDBCardTitle>
                    <MDBCardSubTitle className="fw-bold h3 price mb-5">2,499.00</MDBCardSubTitle>
                    
            <ul className="mx-4 p-4">
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
            </ul>
            <MDBBtn type="button" className="btn btn-warning fw-bold" size="lg">SUBSCRIBE NOW</MDBBtn>                
                
            </MDBCardBody>
            </MDBCard>
            </div>
        
        {/* DIAMOND */}
            <div className="text-center">
            <MDBCard className="cardmargin col-12">
                 <MDBCardImage src={diamond} id="badge"/>
            <MDBCardBody>
                <MDBCardTitle className="fw-bold h2 mt-5">Diamond Subscription</MDBCardTitle>
                <MDBCardSubTitle className="fw-bold h3 price mb-5">4,999.00</MDBCardSubTitle>
            <MDBTypography className="text-center">
            <ul className="mx-4 p-4">
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
            </ul>                
            </MDBTypography>    
            <MDBBtn type="button" className="btn btn-warning fw-bold" size="lg">SUBSCRIBE NOW</MDBBtn> 
            </MDBCardBody>
        </MDBCard>
            </div>
        </Slider>
        </MDBContainer> 
        </div>

        </MDBContainer>

        </>
    )
}

export default Subscription;