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
 MDBModalFooter,
 MDBSpinner, } from "mdb-react-ui-kit";
import ruby from "../../../assets/subscription/ruby badge png.png"
import emerald from "../../../assets/subscription/emerald png.png"
import diamond from "../../../assets/subscription/diamond.png"
import pearl from "../../../assets/subscription/pearl badge.png"
// import caro from "../../../assets/caro.png"
import Slider from "react-slick";
import "./index.css"

const Subscription = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [subs, setSubs] = useState([]);
    const [activeModal, setActiveModal] = useState(null);
    const [subsdescription, setSubsDescription] = useState([]);
    const [substitle, setSubsTitle] = useState('');
    
    useEffect(()=>{
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}subscription/find`)
        .then(result => result.json())
        .then(data => {
            setSubs(data)
            setIsLoading(false)
        })
        fetch(`${process.env.REACT_APP_API_URL}subscription/finddesc`)
        .then(result => result.json())
        .then(data => {
            setSubsDescription(data)
            setIsLoading(false)
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
        variableWidth:false,
        arrows:false
      };
    

    return (
        <>
        <MDBContainer fluid className="bgcolor" id="subscription">

        <MDBTypography className="mt-5 titlefontsize text-warning fw-bold text-center" style={{marginBottom: "10vh"}}>
            Subscription
        </MDBTypography>
        {/* for desktop */}
        <div className="desktopview">
        
        <MDBContainer fluid className="d-flex alig-items-center justify-content-center">
        <MDBRow>
        {isLoading ? 
        <MDBSpinner color="warning"></MDBSpinner>
        :
        <>
        {subs.map(sub => (
        <MDBCol className="">
            <MDBCard key={sub._id} className="col-12 align-items-center linya" style={{height:"100%", width: "100%"}}>
                <MDBCardImage src={sub.image} alt=""  id="badge" className="bg-dark text-center"/>
            
                <MDBCardBody className="subsparent">            
                    <MDBCardTitle className=" text-center fw-bold h2 mt-5">{sub.subscriptionName}</MDBCardTitle>
                    
                        <MDBCardSubTitle className="text-center fw-bold h3 price mb-5">{sub.amount}</MDBCardSubTitle>
                           
                        <ul className="mx-4">
                        {subsdescription.map(desc => {
                            if (desc.subsId === sub._id) {
                            return (
                                <li key={desc._id} className="list">
                                {desc.description}
                                </li>
                            );
                            }
                            return null;
                        })}
                        </ul>
                                      
                </MDBCardBody>
                <MDBContainer className="text-center">
                    <MDBBtn type="button" className="subsbutton btn btn-warning fw-bold" size="lg"  >SUBSCRIBE NOW</MDBBtn>
                </MDBContainer>
            </MDBCard>
        </MDBCol>
        ))}
        </>
        }
        

        </MDBRow>
        
        </MDBContainer>
        </div>

        {/* for mobile view */}
        <div className="mobileview">
            <MDBContainer fluid className="">
                <Slider {...settings}>

                {/* PEARL */}
                {subs.map(sub =>(
                  <MDBCol>                   
                    <MDBCard className="linya align-items-center" key={sub._id}>
                        <MDBCardImage src={pearl} alt="" className="bg-dark " id="badge"/>
                            <MDBCardBody className="">            
                                <MDBCardTitle className="fw-bold h2 mt-5 text-center" >{sub.subscriptionName}</MDBCardTitle>
                                    <MDBCardSubTitle className="fw-bold h3 price mb-5 text-center">{sub.amount}</MDBCardSubTitle>
                                <ul className="mx-4"> 
                                {subsdescription.map(desc =>(
                                    
                                    <li key={desc.subsId} className="list">
                                        {desc.description}
                                    </li> 
                                    
                                ))}
                                </ul>
                            </MDBCardBody>
                            <br></br>
                            <MDBBtn type="button" className="subsbuttonmobile btn btn-warning fw-bold " size="lg">SUBSCRIBE NOW</MDBBtn> 
                            
                </MDBCard>
                </MDBCol> 
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