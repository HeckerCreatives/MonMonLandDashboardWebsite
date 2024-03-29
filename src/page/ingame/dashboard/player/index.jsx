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
  MDBCardHeader,
  MDBInput} from "mdb-react-ui-kit";
  import Slider from "react-slick";
import LeaderboardRequirements from "./lbrequirements";
import Dashboardstatistics from "./statistics";
import Breadcrumb from "../../../../component/breadcrumb";
import { useNavigate } from "react-router-dom";
import DiamondPoolRequirements from "./poolrequirements";
import { isgamelogin } from "../../../../component/utils";
import ChooseReferrer from "./setreferrer";
import PointDetails from "./pointdetail";
import pointicon from "../../../../assets/Ingame/assetsdashboard/total points icon1.png"
import walleticon from "../../../../assets/Ingame/assetsdashboard/wallet icon.png"
import mcticon from "../../../../assets/Ingame/assetsdashboard/MML TOKEN.png"
import mcicon from "../../../../assets/Ingame/assetsdashboard/total MC icon.png"
import mgcomiicon from "../../../../assets/Ingame/assetsdashboard/total MG commission icon.png"
import mgfarm from "../../../../assets/Ingame/assetsdashboard/total MG commission icon copy.png"
import currentrank from "../../../../assets/Ingame/assetsdashboard/current rank icon.png"
import diamonpool from "../../../../assets/Ingame/assetsdashboard/Diamond pool req. title.png"
import lbreq from "../../../../assets/Ingame/assetsdashboard/leaderboard req. title.png"
import pointdetail from "../../../../assets/Ingame/assetsdashboard/piont details title.png"
import monies from "../../../../assets/Ingame/assetsdashboard/Monster Monies icon.png"
import income from "../../../../assets/Ingame/assetsdashboard/total Income icon.png"
import './dash.css'
import Swal from "sweetalert2";
import FlipCountdown from '@rumess/react-flip-countdown';
import { useBalance, useAccount } from 'wagmi'
import WithdrawToken from "./withdrawtoken";
const PlayerDashboard = () => {
    const [playstatus, setPlayStatus] = useState('')
    const [datejoin, setDateJoin] = useState(false);
    const { address, isDisconnected } = useAccount()
    const [end, setEnd] = useState('');
    const [wallets, setWallets] = useState([]);
    const [walletscutoff, setWalletsCutOff] = useState([]);
    const [totalpoints, setTotalPoints] = useState(0);
    const [announcement, setAnnouncement] = useState([])
    const [basicModal, setBasicModal] = useState(false);
    const [image, setImage] = useState(0)
    const toggleOpen = () => setBasicModal(!basicModal);
    const [mycurrentrank, setCurrentRank] = useState(0);
    const [mmt, setMMT] = useState(0)
    const [mct, setMCT] = useState(0)

    const [basicModal1, setBasicModal1] = useState(false);
    const toggleOpen1 = () => setBasicModal1(!basicModal1);

    // const Mmt = useBalance({
    //   address: address,
    //   // token: "0x8162e18648de9D1856bc2192d3A09bb1430e2425"
    // })

    // const Mmc = useBalance({
    //   address: address,
    //   token: "0x1C7509C878b7d7044f085A053DABE9b40D68A444"
    // })

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
      if(data.message == "duallogin" || data.message == "banned" || data.message == "Unathorized"){
        Swal.fire({
          icon: "error",
          title: data.message == "duallogin" ? "Dual Login" : data.message == "banned" ? "Account Banned." : data.message,
          text: data.message == "duallogin" ? "Hi Master, it appears that your account has been accessed from a different device." : data.message == "banned" ? "Hi Master please contact admin" : "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            window.location.replace("/gamelogin");
          }
        })
      }

      if(data.message === "success"){
        setWallets(data.data)
        setWalletsCutOff(data.data2)
        const points = (data.data2.activitypoints + data.data2.adspoints + data.data2.recruitpoints + data.data2.taskpoints + data.data2.purchasepoints)
        setTotalPoints(points)
      }
      
    })

    isgamelogin()
      .then(data => {
        const joindate = new Date(data.joined);
        const subsexp = new Date(joindate.getTime() + (3 * 24 * 60 * 60 * 1000)); // Adding 3 days in millisecondsz
        setDateJoin(subsexp)
        setPlayStatus(data.playstatus)
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
      if(data.message == "duallogin" || data.message == "banned" || data.message == "Unathorized"){
        Swal.fire({
          icon: "error",
          title: data.message == "duallogin" ? "Dual Login" : data.message == "banned" ? "Account Banned." : data.message,
          text: data.message == "duallogin" ? "Hi Master, it appears that your account has been accessed from a different device." : data.message == "banned" ? "Hi Master please contact admin" : "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            window.location.replace("/gamelogin");
          }
        })
      }

      if(data.message === "success"){
        setAnnouncement(data.data)
        setBasicModal(true)
      } else if(data.message === "noannouncement"){
        setBasicModal(false)
      }
         
    })

    fetch(`${process.env.REACT_APP_API_URL}gameusers/currentrank`, {
      method: "GET",
      credentials: 'include',
      headers:{
        "Content-Type": 'application/json'
      }
    })
    .then(result => result.json())
    .then(data => {
      if(data.message == "duallogin" || data.message == "banned" || data.message == "Unathorized"){
        Swal.fire({
          icon: "error",
          title: data.message == "duallogin" ? "Dual Login" : data.message == "banned" ? "Account Banned." : data.message,
          text: data.message == "duallogin" ? "Hi Master, it appears that your account has been accessed from a different device." : data.message == "banned" ? "Hi Master please contact admin" : "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            window.location.replace("/gamelogin");
          }
        })
      }
      
      if(data.message === "success"){
        setCurrentRank(data.data)
      }
         
    })
  },[]) 

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}gamewallet/mytoken`, {
      method: "GET",
      credentials: 'include',
      headers:{
        "Content-Type": 'application/json'
      }
    })
    .then(result => result.json())
    .then(data => {
      if(data.message == "duallogin" || data.message == "banned" || data.message == "Unathorized"){
        Swal.fire({
          icon: "error",
          title: data.message == "duallogin" ? "Dual Login" : data.message == "banned" ? "Account Banned." : data.message,
          text: data.message == "duallogin" ? "Hi Master, it appears that your account has been accessed from a different device." : data.message == "banned" ? "Hi Master please contact admin" : "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            window.location.replace("/gamelogin");
          }
        })
      }

      if(data.message === "success"){
        setMCT(data.data2)
        setMMT(data.data)
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
      setImage(currentSlide);
      console.log(currentSlide)
    },
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
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
            dots: false,
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
            dots: false,
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
        <MDBRow>
        <MDBCol>
        { !end ?
          wallets.poolsubscription == "Pearl" &&
          <div className="card bg-topbase py-3">
          <center>
          <h3 className="fw-bold">Pearl Subscription Expiration Timer</h3>
          </center>
          
          <FlipCountdown
            endAtZero
            hideYear
            hideMonth
            // hideDay
            size='small'
            endAt={datejoin} // Date/Time
            onTimeUp={() => setEnd(true)}
        />
          </div>
          :
          <div className="card bg-topbase py-3">
          <center>
          <h3 className="fw-bold">Pearl Subscription Expired</h3>
          </center>
          <center>
          <h4 className="">Please subscribe to continue earning in monmonland. don't worry your earnings will still be saved.</h4>
          </center>
          </div>
        }
        </MDBCol>
        
        </MDBRow>
        <MDBRow className="my-3">
        <MDBCol className="">
        <MDBCard className='text-dark bg-topbase p-md-5' shadow="3">
            <MDBCardBody className="">
            <MDBRow className="justify-content-between align-items-center ">
            <MDBCol md={3}>
            <div  className="my-3">
            <MDBCardTitle>Welcome Master,</MDBCardTitle>
              <MDBCardText>
              Join us on this extraordinary adventure, and together, let's travel on an epic journey that will lead us through the lands of Monmonland.
              </MDBCardText>
            </div>
            </MDBCol>

            <MDBCol md={7} className="">
            <MDBRow className="justify-content-around align-items-center ">
            
            <MDBCol md={6}>
            
            <MDBCard className="position-relative text-mute fw-bold my-4 "> 

            <img className="corner-image" src={monies} alt=""/>     
                <MDBCardBody>
                <div className="text-end">
                <MDBBtn  size="sm" 
                onClick={() => {
                  window.location.href = `/Dashboard/User/withdrawtoken`
                }}>
                  Withdraw
                </MDBBtn>
                {/* <WithdrawToken tokenselected={"MMT"}/> */}
                </div>
                <div className="mt-3">
                  <p className="text-start">Monster Monies Token</p>
                  {
                    mmt ?
                    
                    <div className="row offset-lg-2">
                    <div className="col-10">
                    <h2>
                    {mmt?.toLocaleString('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                    })}
                    </h2>
                    </div>
                    </div>
                    :
                    <h2 className="text-end">0</h2>
                  }
                </div>
                
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
            <MDBCol md={6}>
            <MDBCard className="position-relative text-mute fw-bold my-4 "> 
            <img className="corner-image" src={mcticon} alt=""/>     
                <MDBCardBody>
                <div className="text-end">
                <MDBBtn  size="sm" 
                onClick={() => {
                  window.location.href = `/Dashboard/User/withdrawtoken`
                }}>
                  Withdraw
                </MDBBtn>
                {/* <WithdrawToken tokenselected={"MCT"}/> */}
                    </div>
                <div className="mt-3">
                  <p className="text-start">Monster Coin Token</p>
                  
                  {
                    mct ?
                    <div className="row offset-lg-2">
                    <div className="col-10">
                    <h2 >
                    {mct?.toLocaleString('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                    })}
                    </h2>
                    </div>
                    </div>
                    
                    :
                    <h2 className="text-end">0</h2>
                  }
                  
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

        <MDBRow>
        <p>OverAll Stats</p>
        <MDBCol lg={4} className="my-2">
            <Dashboardstatistics 
              image={income}
              title={'Total Income'}
              txtonly1={wallets.totalincome?.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}
              />
          </MDBCol>
          <MDBCol lg={4} className="my-2">
            <Dashboardstatistics 
              image={pointicon}
              title={'Total Points'}
              txtonly1={totalpoints}
              />
          </MDBCol>
          <MDBCol lg={4} className="my-2">
          <Dashboardstatistics 
              image={currentrank}
              title={'Current Rank'}
              txtonly={walletscutoff.recruitpoints !== 0 ? mycurrentrank : '1 Direct point'}
              />
          </MDBCol>
        </MDBRow>


        <MDBRow className="my-3">

        <MDBCol lg={3} className="my-2">
            <Dashboardstatistics 
              image={walleticon}
              title={'Current Wallet Balance'}
              number={wallets?.balance ? wallets?.balance : 0}
              />
          </MDBCol>
          <MDBCol lg={3} className="my-2">
          <Dashboardstatistics 
              image={mcicon}
              title={'Total Monster Coin'}
              txtonly1={wallets.monstercoin?.toLocaleString('en-US', {
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
          
          <MDBCol lg={3} className="my-2">
          <Dashboardstatistics 
              colSpan="4"
              image={mgcomiicon}
              title={'Total Monster Gem Commission'}
              number={wallets?.monstergemunilevel?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })
              }
              txtsup1={wallets.monstergemunilevel
              ?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              />
          </MDBCol>
          <MDBCol lg={3} className="my-2">
          <Dashboardstatistics 
              colSpan="4"
              image={mgfarm}
              title={'Total Monster Gem Grinding'}
              number={wallets?.monstergemfarm?.toLocaleString('en-US', {
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
          <MDBCardBody className="mt-5">
          
          <MDBCol>
            <MDBCard className="bg-botbase">
            
              <MDBCardBody>
              <div>
              <div className="col-md-4 offset-md-4">
                <img src={
                    [0, 1, 2, 3, 4].includes(image)
                      ? diamonpool
                      : [5, 6, 7, 8, 9].includes(image)
                      ? lbreq
                      : pointdetail
                  } 
                  alt="" className="img-fluid"/>
              </div>
              <Slider {...settings}>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fas icon="star" size="2x"/>
                  <p>Account Status</p>
                  <h2>{playstatus}</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fas icon="chart-line" size="2x"/>
                  <p>Rank</p>
                  <h2>{wallets.rank}</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fas icon="hand-holding-usd" size="2x"/>
                  <p>Purchase Points</p>
                  <h2>{wallets.purchasepoints?.toLocaleString('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                    })}</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fas icon="check-circle" size="2x"/>
                  <p>Direct Points</p>
                  <h2>{wallets.recruitpoints?.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fas icon="users" size="2x"/>
                  <p>Group Points</p>
                  <h2>{wallets.grouppoints?.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                  {/* LB Req */}
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fas icon="gamepad" size="2x"/>
                  <p>Activity Points</p>
                  <h2>{walletscutoff.activitypoints?.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fas icon="tasks" size="2x"/>
                  <p>Task Points</p>
                  <h2>{walletscutoff.taskpoints?.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fas icon="hand-holding-usd" size="2x"/>
                  <p>Purchase Points</p>
                  <h2>{walletscutoff.purchasepoints?.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fas icon="video" size="2x"/>
                  <p>Watch Ads Points</p>
                  <h2>{walletscutoff.adspoints?.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fas icon="check-circle" size="2x"/>
                  <p>Direct Points</p>
                  <h2>{walletscutoff.recruitpoints?.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                  {/* Point Details */}
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fas icon="gamepad" size="2x"/>
                  <p>Activity Points</p>
                  <h2>{wallets.activitypoints?.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fas icon="tasks" size="2x"/>
                  <p>Task Points</p>
                  <h2>{wallets.taskpoints?.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fas icon="hand-holding-usd" size="2x"/>
                  <p>Purchase Points</p>
                  <h2>{wallets.purchasepoints?.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fas icon="video" size="2x"/>
                  <p>Watch Ads Points</p>
                  <h2>{wallets.adspoints?.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fas icon="check-circle" size="2x"/>
                  <p>Direct Points</p>
                  <h2>{wallets.recruitpoints?.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}</h2>
                  </MDBCardBody>
                </MDBCard>
                </div>
                <div className="px-md-5">
                <MDBCard className="text-center">
                  <MDBCardBody>
                  <MDBIcon fas icon="users" size="2x"/>
                  <p>Group Points</p>
                  <h2>{wallets.grouppoints?.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}</h2>
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
        
       
          
        </MDBRow>

        
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
                <MDBBtn color='secondary' 
                onClick={() => {
                  toggleOpen()
                  if(playstatus == 'inactive'){
                    toggleOpen1()
                  }
                }}>
                  Close
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
        <MDBModal show={basicModal1} staticBackdrop  tabIndex='-1'>
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalHeader className="justify-content-center seamless">
                <MDBModalTitle className="text-white fw-bold">Activate Account</MDBModalTitle>
              </MDBModalHeader>
              <MDBModalBody className="text-center">
                <MDBCardText className="fw-bold">
                  Hi Master!, your account has been inactive for so long to activate your account again click Activate
                </MDBCardText>
              </MDBModalBody>

              <MDBModalFooter className="seamless">
                <MDBBtn color='secondary' onClick={toggleOpen1}>
                  Activate
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </>
    )
}

export default PlayerDashboard;