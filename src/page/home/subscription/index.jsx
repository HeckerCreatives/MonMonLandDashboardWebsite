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
import { Link , useNavigate} from "react-router-dom"
import Slider from "react-slick";
import { Toast } from "../../../component/utils";
import "./index.css"
import pageon from "../../../assets/games/A.png"
import pageoff from "../../../assets/games/B.png"
import lagin from "../../../assets/header/login BUTTON.png"
import axios from "axios";
import logoutbtn from "../../../assets/header/logout BUTTON.png"
import topupbtn from "../../../assets/header/TOP UP BUTTON.png"
import signupbtn from "../../../assets/header/sign up BUTTON.png"
import clsbtn from "../../../assets/header/X BUTTON.png"
import Cookies from 'js-cookie';
const Subscription = () => {
    const [isLoading, setIsLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"))
    const playfabToken = localStorage.getItem("playfabAuthToken")
    const email = localStorage.getItem("email")
    const [playfabId, setPlayfabID] = useState("")
    const [playfabtoken, setPlayfabToken] = useState("")
    const [subs, setSubs] = useState([]);
    const [subsdescription, setSubsDescription] = useState([]);
    const [subsname, setSubsName] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const [toggleTwoModal, setToggleTwoModal] = useState(false);
    const toggleShow1 = () => setToggleTwoModal(!toggleTwoModal);

    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const lagawts = () => {
        localStorage.clear()
        window.location.reload()
    }

    useEffect(() => {
        if(user){
        setUsername(user.Username)
        setPlayfabID(user.PlayfabId)
        setPlayfabToken(playfabToken)
        setPassword(atob(user.code))
        }
    },[])

    const login = (e) => {
        e.preventDefault();



        const playFabUserData = {
            Username: username,            
            Password: password,           
        };
        setIsLoading(true)
        PlayFabClient.LoginWithPlayFab(playFabUserData, (error, result) => {
            if(result){
                const users = {
                    Username: username,
                    PlayfabId: result.data.PlayFabId,
                    code: btoa(password)
                }

                setIsLoading(false)
                    localStorage.setItem("user", JSON.stringify(users))
                    localStorage.setItem("playfabAuthToken", result.data.SessionTicket)
                    localStorage.setItem("email", "jimmy@gmail.com")
                    window.location.href = "/topup"

            }
        })
    }

    useEffect(()=>{
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}subscription/find`,{
            credentials: 'include',
        })
        .then(result => result.json())
        .then(data => {
            setSubs(data)
            setIsLoading(false)
        })
        fetch(`${process.env.REACT_APP_API_URL}subscription/finddesc`,{
            credentials: 'include',
        })
        .then(result => result.json())
        .then(data => {
            setSubsDescription(data)
            setIsLoading(false)
        })
    },[])


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
                
                <MDBBtn
                    type="button"
                    className="zoom-badge subsbutton btn btn-warning fw-bold"
                    size="lg"
                    onClick={() => {
                        
                        if (sub.subscriptionName.toLowerCase() === "pearl") {
                        window.location.href = `${window.location.origin}/register?id=${process.env.REACT_APP_MONMONID}`;
                        
                        } else {
                        window.location.href = '/topup'
                        setSubsName(sub.subscriptionName);
                        }
                    }}
                    >
                    SUBSCRIBE NOW
                </MDBBtn>

                    
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
                className="zoom-badge subsbuttonmobile btn btn-warning fw-bold"
                size="lg"
                onClick={() => {
                    if (sub.subscriptionName.toLowerCase() === "pearl") {
                        window.location.href = `${window.location.origin}/register?sponsor=monmonland&id=${process.env.REACT_APP_MONMONID}`;
                        
                    } else {
                    window.location.href = '/topup'
                    setSubsName(sub.subscriptionName);
                    }
                }}
                >
                SUBSCRIBE NOW
            </MDBBtn>
                        
            </MDBCard> 
                                           
                        
            ))}
            </Slider>
        </MDBCol>        
        </div>


        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader className='d-flex justify-content-end'>
              <MDBBtn  className="border-0 bg-transparent" color='none' onClick={() =>setBasicModal(false)}>
              <img src={clsbtn} alt="" className="img-fluid"/>
              </MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <MDBModalTitle className="text-center">
            { user && 
                `Login As: ${user.Username}`
            }
            </MDBModalTitle>
            <MDBRow className="my-2">
                <MDBCol className="d-flex justify-content-between align-items-center">
                    {user ? 
                    <img src={logoutbtn} alt="" className="zoom-playnow img-fluid" onClick={lagawts}/>
                    :
                    <img src={lagin} alt="" className="zoom-playnow img-fluid" onClick={toggleShow1}/>
                    
                    }
                    
                </MDBCol>
                <MDBCol className="d-flex justify-content-between align-items-center">
                <img src={signupbtn} alt="" className="zoom-playnow img-fluid"
                 
                onClick={() => {
                    window.location.href = `${window.location.origin}/register?sponsor=monmonland&id=${process.env.REACT_APP_MONMONID}`;
                }}/>
                </MDBCol>
            </MDBRow>
            <MDBRow className="my-2">
                {/* <MDBCol className="d-flex justify-content-between align-items-center ">
                    <MDBBtn className="bg-transparent p-1" block disabled={user ? false: true} href={`/topup`}>
                    <img src={topupbtn} alt="" className="img-fluid"/>
                    </MDBBtn>
                </MDBCol> */}
                <MDBCol className="d-flex justify-content-between align-items-center">
                    <MDBBtn 
                    className="zoom-playnow" block
                    disabled={user ? false: true}
                    onClick={(e) => login(e)}
                    >
                    Subscribe
                    {/* <img src={topupbtn} alt="" className="img-fluid"/> */}
                    </MDBBtn>
                </MDBCol>
            </MDBRow>
            </MDBModalBody>
            <MDBModalBody className="text-center">
            <div className="text-white p-1" style={{backgroundColor: "#40290A", textAlign: "justify"}}>
            <h2 className="text-center">Welcome to MonMonland</h2>
            come and join us as we reach the world filled with adorable MonMons. Just click Login/Sign-up your account and start earning.
            </div>
            
            </MDBModalBody>

          </MDBModalContent>
        </MDBModalDialog>
        </MDBModal>

        <MDBModal 
        show={toggleTwoModal} 
        tabIndex='-1' staticBackdrop>
        <MDBModalDialog centered>
          <MDBModalContent>
          <form autoComplete="off" onSubmit={login}>
            <MDBModalHeader className='d-flex justify-content-end'>
            <MDBBtn className="border-0 bg-transparent" color='none' 
            onClick={() => {
            toggleShow1()
            setBasicModal(false)
            }}
            >
             <img src={clsbtn} alt="" className="img-fluid"/>   
            </MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <MDBCard alignment="center">
            <MDBCardBody>
            {/* <MDBCardImage src={logo} style={{width: "50%"}}/> */}
                <MDBTypography>Username</MDBTypography>
                <MDBInput name="username" required onChange={(e) => setUsername(e.target.value)}/>
                <MDBTypography >Password</MDBTypography>
                <MDBInput name="password" type="password" required onChange={(e) => setPassword(e.target.value)}/>
                <MDBRow className="mt-3">
                <MDBCol>
                <MDBBtn  disabled={isLoading} type="submit" className="bg-transparent p-0 my-2">
                   {isLoading ? <MDBSpinner grow color='dark'/> : <img src={lagin} alt="" className="img-fluid"/>}
                </MDBBtn>
                </MDBCol>
                
                <MDBCol className="d-flex justify-content-between align-items-center">
                    <MDBBtn className="bg-transparent p-0" href={`${window.location.origin}/register?id=${process.env.REACT_APP_MONMONID}`} block>
                    <img src={signupbtn} alt="" className="img-fluid"/>
                    </MDBBtn>
                </MDBCol>
                </MDBRow>
                
            </MDBCardBody>
            </MDBCard>
            </MDBModalBody>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

        </MDBContainer>

        </>
    )
}

export default Subscription;