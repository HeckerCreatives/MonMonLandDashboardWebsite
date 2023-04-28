import React, { useState, useEffect } from "react";
import { MDBContainer,
 MDBRow,
 MDBCol,
 MDBTypography,
 MDBCard,
 MDBCardBody,
 MDBCardTitle,
 MDBCardSubTitle,
 MDBBtn,
 MDBCardImage,
 MDBModal,
 MDBModalDialog,
 MDBModalContent,
 MDBModalHeader,
 MDBModalTitle,
 MDBModalBody,
 MDBModalFooter, } from "mdb-react-ui-kit";
import ruby from "../../../assets/subscription/ruby badge png.png"
import emerald from "../../../assets/subscription/emerald png.png"
import diamond from "../../../assets/subscription/diamond.png"
import pearl from "../../../assets/subscription/pearl badge.png"
// import caro from "../../../assets/caro.png"
import Slider from "react-slick";
import "./index.css"

const Subscription = () => {
    const [subs, setSubs] = useState([]);
    const [activeModal, setActiveModal] = useState(null);
    const [subsdescription, setSubsDescription] = useState('');
    const [substitle, setSubsTitle] = useState('');
    
    useEffect(()=>{
        fetch('http://localhost:4000/subscription/find')
        .then(result => result.json())
        .then(data => {
            setSubs(data)
            
        })
    },[])

    

    const settings = {
        className: "",
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight:false,
        variableWidth:false
      };
    

    return (
        <>
        <MDBContainer fluid className="bgcolor" id="subscription">

        <MDBTypography className="mt-5 titlefontsize text-warning fw-bold text-center">
            Subscription
        </MDBTypography>
        {/* for desktop */}
        <div className="desktopview text-center">
        
        <MDBContainer fluid className="d-flex alig-items-center justify-content-center">
        <MDBRow>

        {subs.map(sub => (
        <MDBCol className="mb-3">
        
        <MDBCard key={sub._id} className="cardmargin col-12" style={{height:"90%"}}>
        <MDBCardImage src={sub.image} alt=""  id="badge"/>
            
            <MDBCardBody className="subsparent">            
                <MDBCardTitle className="fw-bold h2 mt-5">{sub.title}</MDBCardTitle>
                    <MDBCardSubTitle className="fw-bold h3 price mb-5">{sub.amount}</MDBCardSubTitle>
                <ul className="mx-4 p-4">
                    <li>
                    {sub.description}
                    </li>
                    <li>
                    {sub.description}
                    </li>
                    <li>
                    {sub.description}
                    </li>
                    <li>
                    {sub.description}
                    </li>
                    <li>
                    {sub.description}
                    </li>
                    <li>
                    {sub.description}
                    </li>
                    <li>
                    {sub.description}
                    </li>
                    <li>
                    {sub.description}
                    </li>
                    <li>
                    {sub.description}
                    </li>
                    <li>
                    {sub.description}
                    </li>                
                </ul>                               
                
            </MDBCardBody>
            <MDBContainer>
            <MDBBtn type="button" className="subsbutton btn btn-warning fw-bold" size="lg"  >SUBSCRIBE NOW</MDBBtn>
            </MDBContainer>
            
            
        </MDBCard>
        </MDBCol>
        ))}

        </MDBRow>
        
        </MDBContainer>
        </div>

        {/* for mobile view */}
        <div className="mobileview">
        <MDBContainer className="">
        <Slider {...settings}>

        {/* PEARL */}
        {subs.map(sub =>(
        <div className="text-center">
        <MDBCard className="cardmargin col-12" key={sub._id}>
        <MDBCardImage src={sub.image} alt="" className="" id="badge"/>
            <MDBCardBody className="subsparent">            
                <MDBCardTitle className="fw-bold h2 mt-5">{sub.title}</MDBCardTitle>
                    <MDBCardSubTitle className="fw-bold h3 price mb-5">{sub.amount}</MDBCardSubTitle>
            <ul className="mx-4 p-4">
                <li>
                {sub.description}
                </li>
                <li>
                {sub.description}
                </li>
                <li>
                {sub.description}
                </li>
                <li>
                {sub.description}
                </li>
                <li>
                {sub.description}
                </li>
                <li>
                {sub.description}
                </li>
                <li>
                {sub.description}
                </li>
                <li>
                {sub.description}
                </li>
                <li>
                {sub.description}
                </li>
                <li>
                {sub.description}
                </li>
            </ul>
                               
                
            </MDBCardBody>
            <MDBContainer>
            <MDBBtn type="button" className="subsbutton btn btn-warning fw-bold" size="lg">SUBSCRIBE NOW</MDBBtn> 
            </MDBContainer>
           
        </MDBCard>
        </div>
        ))}
        </Slider>
        </MDBContainer> 
        </div>

        {/* <MDBModal  show={activeModal} onClick={()=> setActiveModal(null)} tabIndex='-1'>
            <MDBModalDialog centered>
            <MDBModalContent>
                <MDBModalHeader>
                <MDBModalTitle>{substitle}</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={()=> setActiveModal(null)}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>{subsdescription}</MDBModalBody>
                <MDBModalFooter>
                <MDBBtn color='secondary' onClick={()=> setActiveModal(null)}>
                    Close
                </MDBBtn>                
                </MDBModalFooter>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>  */}

        </MDBContainer>

        </>
    )
}

export default Subscription;