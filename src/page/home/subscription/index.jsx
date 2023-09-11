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
 MDBSpinner,
 MDBCardText,
 MDBInput, } from "mdb-react-ui-kit";
// import caro from "../../../assets/caro.png"
import { PlayFabClient } from "playfab-sdk";
import { Link } from "react-router-dom"
import Slider from "react-slick";
import "./index.css"
import pageon from "../../../assets/games/A.png"
import pageoff from "../../../assets/games/B.png"
import axios from "axios";
const Subscription = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [subs, setSubs] = useState([]);
    const [activeModal, setActiveModal] = useState(null);
    const [subsdescription, setSubsDescription] = useState([]);
    const [subsname, setSubsName] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);

    const login = (e) => {
        e.preventDefault();

        const {user, pass} = e.target

        const playFabUserData = {
            Username: user.value,            
            Password: pass.value,           
        };

        PlayFabClient.LoginWithPlayFab(playFabUserData, (error, result) => {
            const id = result.data.PlayFabId;

            if(result){
                fetch(`${process.env.REACT_APP_API_URL}coin/${subsname}`, {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({name: user.value})
                })
                .then(result => result.json())
                .then(data => {
                    const url = data.hosted_url
                    window.open(url, '_blank')
                })

            }
            console.log(subsname)
            console.log(result)
            console.log(id)
        })
    }

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

    const r = "https://commerce.coinbase.com/checkout/f4a6bc8b-06e7-4c69-b54d-b77b55d75711"
    const e = "https://commerce.coinbase.com/checkout/aeda98cc-d26a-4976-a6dd-4dd6a61ccb44"
    const d = "https://commerce.coinbase.com/checkout/430de90e-23cb-4a48-aad8-03db474a0e99"

    const sortedList = subs.sort((a, b) => a._id.localeCompare(b._id));

    const settings = {
        className: "h100",
        dots:window.innerWidth <= 1024 ? true: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
        variableWidth: false,
        arrows:false,
        afterChange: window.innerWidth <= 1024 ? (current) => {
            setCurrentSlide(current);
        } : false,
        swipe:window.innerWidth <= 1024 ? true: false,
        appendDots: window.innerWidth <= 1024 ? dots => (
            <div        
            >
              <ul style={{ margin: "0px", padding: "0px", listStyle: "none" }}> {dots} </ul>
            </div>
          ) : false,
          customPaging: window.innerWidth <= 1024 ? function(i) {
          const isActive = i === currentSlide;
          const imageSource = isActive ? pageon : pageoff;
            return (
              <a>
                <img src={imageSource} alt="" style={{height: "6px", width: "25px"}} className="rounded"/>
              </a>
            );
          } : false,
      
      };
    

    return (
        <>
        <MDBContainer fluid className="bgcolor" id="subscription">

        <MDBTypography 
        className="mt-5 titlefontsize text-warning fw-bold text-center" 
        style={{marginBottom: "10vh"}}>
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
        {sortedList.map(sub => (
        <MDBCol className="">
            <MDBCard key={sub._id} className="col-12 align-items-center linya" style={{height:"100%", width: "100%"}}>
                <div className="bgbadge">
                <MDBCardImage src={sub.image} alt=""  id="badge" className="zoom-badge text-center"/>
                </div>
                
            
                <MDBCardBody className="subsparent">            
                    <MDBCardTitle className=" text-center fw-bold h2 mt-5">{sub.subscriptionName}</MDBCardTitle>
                    
                        <MDBCardSubTitle className="text-center fw-bold h3 price mb-5">{sub.amount === "Free" ? sub.amount : "$"+sub.amount}</MDBCardSubTitle>
                           
                        <ul className="mx-4">
                        {subsdescription.map(desc => {
                            if (desc.subsId === sub._id) {
                            return (
                                <li key={desc._id} className="list">
                                {desc.description.length > 200 ? `${desc.description.substring(0,200)}...`: desc.description}
                                </li>
                            );
                            }
                            return null;
                        })}
                        </ul>
                                      
                </MDBCardBody>
                <MDBContainer className="text-center">
                
                    {/* <Link to={sub.subscriptionName === "Ruby" ? r : sub.subscriptionName === "Emerald" ? e : sub.subscriptionName === "Diamond" ? d : ""} target="_blank">
                    
                    </Link> */}
                    <MDBBtn 
                    type="button" 
                    className="zoom-badge subsbutton btn btn-warning fw-bold" 
                    size="lg" 
                    onClick={() => {
                    setActiveModal(true)
                    setSubsName(sub.subscriptionName.toLowerCase())
                    }} 
                    >SUBSCRIBE NOW</MDBBtn>
                    
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
        <MDBCol>
        <Slider {...settings}>

            {/* PEARL */}
            {sortedList.map(sub =>(  
             
            <MDBCard className="linya align-items-center" key={sub._id}>
            <div className="d-flex justify-content-center">
                <MDBCardImage src={sub.image} alt="" className="bg-dark" id="badge"/>
            </div>
            <MDBCardBody className="">            
                <MDBCardTitle className="fw-bold h2 mt-5 text-center" >{sub.subscriptionName}</MDBCardTitle>
                    <MDBCardSubTitle className="fw-bold h3 price mb-5 text-center">{`${sub.amount}`}</MDBCardSubTitle>
                <ul className="mx-4"> 
                {subsdescription.map(desc => {
                    
                    if (desc.subsId === sub._id) {
                    return (
                        <li key={desc._id} className="list">
                        {desc.description.length > 200 ? `${desc.description.substring(0,200)}...`: desc.description}
                        </li>
                    );
                    }
                    return null;
                    
                })}
                </ul>
            </MDBCardBody>
            <br/>
            <MDBBtn 
            type="button" 
            className="subsbuttonmobile btn btn-warning fw-bold " 
            size="lg">
            SUBSCRIBE NOW
            </MDBBtn> 
                        
            </MDBCard> 
                                           
                        
            ))}
            </Slider>
        </MDBCol>        
        </div>

        <MDBModal  show={activeModal} staticBackdrop tabIndex='-1'>
            <MDBModalDialog centered>
            <MDBModalContent>
            <form autoComplete="off" onSubmit={login}>
                <MDBModalHeader>
                <MDBModalTitle>Please Login Your Ingame Account</MDBModalTitle>
                {/* <MDBBtn className='btn-close' color='none' onClick={()=> setActiveModal(null)}></MDBBtn> */}
                </MDBModalHeader>
                <MDBModalBody>
                <MDBCardText>
                    Username
                    <MDBInput name="user"/>
                </MDBCardText>
                <MDBCardText>
                    Password
                    <MDBInput name="pass" type="password"/>
                </MDBCardText>
                </MDBModalBody>
                <MDBModalFooter>
                <MDBBtn color='secondary' onClick={()=> setActiveModal(null)}>
                    Close
                </MDBBtn>  
                <MDBBtn color='secondary' type="submit">
                    Login
                </MDBBtn>               
                </MDBModalFooter>
            </form>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal> 

        </MDBContainer>

        </>
    )
}

export default Subscription;