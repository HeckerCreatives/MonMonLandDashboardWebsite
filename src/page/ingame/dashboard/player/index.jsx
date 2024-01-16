import React, {useState, useEffect} from "react";
import { 
  MDBContainer, 
  MDBBtn, 
  MDBRow, 
  MDBCol,
  MDBIcon, 
  MDBCard, 
  MDBCardBody, 
  MDBTypography,
  MDBTable, 
  MDBTableHead, 
  MDBTableBody,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter, 
  MDBCardText, 
  MDBCardTitle,
  MDBCardOverlay,
  MDBCardImage,
  MDBCardHeader} from "mdb-react-ui-kit";
  import Slider from "react-slick";
import LeaderboardRequirements from "./lbrequirements";
import Dashboardstatistics from "./statistics";
import Breadcrumb from "../../../../component/breadcrumb";
import { useNavigate } from "react-router-dom";
import DiamondPoolRequirements from "./poolrequirements";
import { isgamelogin } from "../../../../component/utils";
import ChooseReferrer from "./setreferrer";
import PointDetails from "./pointdetail";
import pointicon from "../../../../assets/Ingame/assetsdashboard/total points icon.png"
import walleticon from "../../../../assets/Ingame/assetsdashboard/wallet icon.png"
import mcicon from "../../../../assets/Ingame/assetsdashboard/total MC icon.png"
import mgcomiicon from "../../../../assets/Ingame/assetsdashboard/total MG commission icon.png"
import mgfarm from "../../../../assets/Ingame/assetsdashboard/total MG commission icon copy.png"
import currentrank from "../../../../assets/Ingame/assetsdashboard/current rank.png"
import diamonpool from "../../../../assets/Ingame/assetsdashboard/Diamond pool req. title.png"
import lbreq from "../../../../assets/Ingame/assetsdashboard/leaderboard req. title.png"
import pointdetail from "../../../../assets/Ingame/assetsdashboard/piont details title.png"
import './dash.css'
const PlayerDashboard = () => {
    const [wallets, setWallets] = useState([]);
    const [walletscutoff, setWalletsCutOff] = useState([]);
    const [announcement, setAnnouncement] = useState([])
    const [basicModal, setBasicModal] = useState(false);
    const [image, setImage] = useState(1)
    const toggleOpen = () => setBasicModal(!basicModal);

    useEffect(()=> {
      
    },[])


  useEffect(()=> {
    fetch(`${process.env.REACT_APP_API_URL}gamewallet/find`, {
      method: "GET",
      credentials: 'include',
      headers:{
        "Content-Type": 'application/json'
      }
    })
    .then(result => result.json())
    .then(data => {
      if(data.message === "success"){
        setWallets(data.data)
        setWalletsCutOff(data.data2)
      }
         
    })
        
    fetch(`${process.env.REACT_APP_API_URL}gameusers/gameannouncement`, {
      method: "GET",
      credentials: 'include',
      headers:{
        "Content-Type": 'application/json'
      }
    })
    .then(result => result.json())
    .then(data => {
      if(data.message === "success"){
        setAnnouncement(data.data)
        setBasicModal(true)
      } else if(data.message === "noannouncement"){
        setBasicModal(false)
      }
         
    })

  },[]) 

  
  const settings = {
    className: "",
    dots: true,
    arrows: false,
    centerMode: false,
    infinite: false,
    slidesToShow: 5,  
    slidesToScroll: 5,      
    adaptiveHeight: false,
    focusOnSelect: false,
    afterChange: (currentSlide) => {
      setImage(currentSlide + 1);
      console.log(currentSlide)
    },
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            centerMode: false,
            infinite: true,
            // centerPadding: "60px",
            // adaptiveHeight: false,
            focusOnSelect: true,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            centerMode: false,
            infinite: true,
            // centerPadding: "60px",
            // adaptiveHeight: false,
            focusOnSelect: true,
          }
        },
        {
          breakpoint: 425,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            centerMode: false,
            infinite: true,
            // centerPadding: "60px",
            // adaptiveHeight: false,
            focusOnSelect: true,
          }
        }
      ]
  };

    return (
      <>
        <MDBContainer fluid>
        <Breadcrumb title='Dashboard' paths={[]}/>
        {/* Cards */}
        <MDBRow className="my-3">
        <MDBCol className="">
        <MDBCard className='text-dark bg-topbase p-md-5' shadow="3">
            <MDBCardBody className="">
            <MDBRow className="justify-content-between align-items-center">
            <MDBCol md={3}>
            <div  className="my-3">
            <MDBCardTitle>Lorem Ipsum dolor sir amet</MDBCardTitle>
              <MDBCardText>
                This is a wider card with supporting text below as a natural lead-in to additional content. This
                content is a little bit longer.
              </MDBCardText>
            </div>
            </MDBCol>

            <MDBCol md={5} className="">
            <MDBRow className="justify-content-between align-items-center">
            <MDBCol md={5}>
            <MDBCard className="position-relative text-mute fw-bold my-3"> 
            <img className="corner-image" src={pointicon} alt=""/>     
                <MDBCardBody>
                <div className="mt-3">
                  <p className="text-start">Total Points</p>
                  <h2 className="text-end">
                  {walletscutoff.totalpoints?.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}
                  </h2>
                </div>
                </MDBCardBody>
          </MDBCard>
            </MDBCol>
            <MDBCol md={5}>
            <MDBCard className="position-relative text-mute fw-bold my-3">  
            <img className="corner-image" src={currentrank} alt=""/>         
                <MDBCardBody>
                <div className="mt-3">
                  <p className="text-start">Current Rank</p>
                  <h2 className="text-end">0</h2>
                </div>
                </MDBCardBody>
          </MDBCard>
            </MDBCol>
            </MDBRow>
            
            </MDBCol>
            </MDBRow>
            
          </MDBCardBody>
          
        </MDBCard>
        </MDBCol> 
        
          
        </MDBRow>


        <MDBRow className="my-3">

        <MDBCol className="my-2">
            <Dashboardstatistics 
              image={walleticon}
              title={'Current Wallet Balance'}
              number={wallets.balance?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              />
          </MDBCol>
          <MDBCol className="my-2">
          <Dashboardstatistics 
              image={mcicon}
              title={'Total Monster Coin'}
              number={wallets.monstercoin?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              txtsup1={wallets.subscriberincome?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              />
          </MDBCol>
          <MDBCol className="my-2">
          <Dashboardstatistics 
              colSpan="4"
              image={mgcomiicon}
              title={'Total Monster Gem Commission'}
              number={wallets.monstergemfarm?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              txtsup1={wallets.monstergemfarm?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              />
          </MDBCol>
          <MDBCol className="my-2">
          <Dashboardstatistics 
              colSpan="4"
              image={mgfarm}
              title={'Total Monster Gem Grinding'}
              number={wallets.monstergemfarm?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              txtsup1={wallets.monstergemfarm?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              />
          </MDBCol>
          

        </MDBRow>

        <MDBRow className="my-3">
        
        <MDBCol className="">

        <MDBCard style={{background: '#FCF2E1'}} shadow="1">
        <MDBCardHeader className="bg-bottabhead p-4"></MDBCardHeader>
          <MDBCardBody className="">
          
          <MDBCol>
            <MDBCard className="bg-botbase">
            
              <MDBCardBody>
              <div>
              <div className="col-4 offset-4">
                <img src={image === 1 ? diamonpool : image === 2 ? lbreq : pointdetail} alt="" className="img-fluid"/>
              </div>
              <Slider {...settings}>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fab icon="android" />
                  <p>Text here</p>
                  <h2>999</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fab icon="android" />
                  <p>Text here</p>
                  <h2>999</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fab icon="android" />
                  <p>Text here</p>
                  <h2>999</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fab icon="android" />
                  <p>Text here</p>
                  <h2>999</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fab icon="android" />
                  <p>Text here</p>
                  <h2>999</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>

                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fab icon="android" />
                  <p>Text here</p>
                  <h2>999</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fab icon="android" />
                  <p>Text here</p>
                  <h2>999</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fab icon="android" />
                  <p>Text here</p>
                  <h2>999</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fab icon="android" />
                  <p>Text here</p>
                  <h2>999</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fab icon="android" />
                  <p>Text here</p>
                  <h2>999</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>

                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fab icon="android" />
                  <p>Text here</p>
                  <h2>999</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fab icon="android" />
                  <p>Text here</p>
                  <h2>999</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fab icon="android" />
                  <p>Text here</p>
                  <h2>999</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fab icon="android" />
                  <p>Text here</p>
                  <h2>999</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fab icon="android" />
                  <p>Text here</p>
                  <h2>999</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                </Slider>
              </div>
                
                
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          
          </MDBCardBody>
        </MDBCard>

        </MDBCol>
        
       
          {/* <MDBCol md={4} className="my-2">
          <LeaderboardRequirements
            activitypoints={walletscutoff.activitypoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
            taskpoints={walletscutoff.taskpoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
            recruitpoints={walletscutoff.recruitpoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
            purchasepoints={walletscutoff.purchasepoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
            watchadspoints={walletscutoff.adspoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
          />
          </MDBCol>
          <MDBCol md={4} className="my-2">
          <DiamondPoolRequirements
            poolstatus={wallets.poolstatus}
            rank={wallets.rank}
            grouppoints={wallets.grouppoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
            purchasepoints={wallets.purchasepoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
            recruitpoints={wallets.recruitpoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
          />
          </MDBCol>
          <MDBCol md={4} className="my-2">
          <PointDetails
            grouppoints={wallets.grouppoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
            purchasepoints={wallets.purchasepoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
            recruitpoints={wallets.recruitpoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              watchadspoints={wallets.adspoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              activitypoints={wallets.activitypoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              taskpoints={wallets.taskpoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
          />
          </MDBCol> */}
        </MDBRow>

        
        
        {/* <ChooseReferrer 
        // setBasicModal={setBasicModal} 
        basicModal={basicModal}/> */}
        
        </MDBContainer>
        <MDBModal show={basicModal} staticBackdrop  tabIndex='-1'>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader className="justify-content-center seamless">
              <MDBModalTitle className="text-white fw-bold">{announcement.title}</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody className="text-center">
              <MDBCardText className="fw-bold">
                {announcement.description}
              </MDBCardText>
            </MDBModalBody>

            <MDBModalFooter className="seamless">
              <MDBBtn color='secondary' onClick={toggleOpen}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      </>
    )
}

export default PlayerDashboard;