import React, {useState, useEffect} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon,MDBTypography,MDBProgress, MDBProgressBar, MDBBtn, MDBSpinner,MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,
    MDBCardFooter, 
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBTable, 
    MDBTableHead, 
    MDBTableBody} from "mdb-react-ui-kit";
import FlipCountdown from '@rumess/react-flip-countdown';
import "./index.css";
import appstore from "../../../assets/header/appstore.png"
import biglogo from "../../../assets/header/big logo2.gif"
import dahonleft from "../../../assets/BG/leaves Left.png"
import dahonright from "../../../assets/BG/leaves Right.png"
import cloudA from "../../../assets/BG/cloud A.png"
import cloudB from "../../../assets/BG/cloud B.png"
import cloudC from "../../../assets/BG/cloud C.png"
import usdt from "../../../assets/usdt.png"
import Tab from "../../../assets/header/TAB.png"
import donwloadnow from "../../../assets/header/download now BUTTON.png"
import monstercoin from "../../../assets/header/MC coin.png"
import monstergem from "../../../assets/header/Monster GEM.png"
import diamond from "../../../assets/subscription/diamond.png"
import adslogo from "../../../assets/header/ADS icon.png"
import leadlogo from "../../../assets/header/LEADERBOARD icon.png"
import Slider from "react-slick";
const Header = () => {
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    const [basicModal1, setBasicModal1] = useState(false);
    const toggleShow1 = () => setBasicModal1(!basicModal1);
    const [basicModal2, setBasicModal2] = useState(false);
    const toggleShow2 = () => setBasicModal2(!basicModal2);
    const [isLoading, setIsLoading] = useState(false)
    const [initialbar, setInitialBar] = useState();
    const [totalbar, setTotalBar] = useState(0);
    const [progress, setProgress] = useState(0);
    const [mc, setMc] = useState(0)
    const [mg, setMg] = useState(0)
    const [investorfund, setinvestorfund] = useState(0)
    const [totaluser, setTotaluser] = useState([])
    const [Mcprice, setMcPrice] = useState(0)
    const [Mgprice, setMgPrice] = useState(0)
    const [Mctofarm, setMctofarm] = useState(0)
    const [comact, setComAct] = useState([]);
    const [totalaccumulated, setTotalAccumulated] = useState(0);
    const [totalpoolaccumulated, setTotalPoolAccumulated] = useState(0);
    const [diamonds, setDiamond] = useState(0);
    const [ads, setAds] = useState(0);
    const [leaderboard, setLeaderboard] = useState(0);
    const [diamondpool, setDiamondPool] = useState(0)
    const [monmongem, setMonmongem] = useState(0)
    const [mcpreviousmonth, setMcPreviousMonth] = useState(0);
    const seperator = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    let totalIncome = 0;
    let totalCoins = 0;

    useEffect(()=> {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}gameactivity/${process.env.REACT_APP_PROGRESSID}/find`)
        .then(result => result.json())
        .then(data => {
          // console.log(data.total)
            setInitialBar(data.initial)
            setTotalBar(data.total)
            totalIncome = data.total
            // const price = parseFloat(totalIncome) / parseFloat(totalCoins)
            // setMcPrice(price)
            setIsLoading(false)
        })

        fetch(`${process.env.REACT_APP_API_URL}monmoncoin/find`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                coin: "Monster Coin"
            })
        })
        .then(result =>result.json())
        .then(data => {
              if(data.message === "success"){
                setMc(data.data.amount)
                totalCoins = data.data.amount
                
                // const price = parseFloat(totalIncome) / parseFloat(totalCoins)
                // setMcPrice(price)
                setIsLoading(false)
              }
                
        }) 

        fetch(`${process.env.REACT_APP_API_URL}monmoncoin/find`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                coin: "Monster Gem"
            })
        }) 
        .then(result =>result.json())
        .then(data => {
            setMg(data.data.amount)
            setIsLoading(false)
        })

        fetch(`${process.env.REACT_APP_API_URL}totalusers/find`)
        .then(result => result.json())
        .then(data => {
        const totalUsers = data.data.count;
        setIsLoading(false);

        // Get the container element for the inputs
        const inputsContainer = document.getElementById('inputs');

        
        // Initialize variables
        let currentValue = "";
        

        // Loop through the totalUsers and populate the inputs
        for (let i = 9; i >= 0; i--) {
            if(i < totalUsers.toString().length){
                for (let b = 0; b < totalUsers.toString().length; b++){
                    currentValue += totalUsers.toString()[b]
                }
                break;
            } else {
                currentValue += "0"
            }
            
        }

        for(let a = 0; a < currentValue.length; a++){
                const inputElement = document.createElement('input');
                inputElement.className = 'input text-white';
                inputElement.type = 'text';
                inputElement.disabled = true;
                inputElement.inputmode = 'numeric';
                inputElement.maxLength = 1;
                inputElement.value = currentValue[a];
                // Append the input element to the container
                inputsContainer.appendChild(inputElement);
        }

        })

    },[])

    useEffect(()=>{
        
    
        fetch(`${process.env.REACT_APP_API_URL}subsaccu/totalsubsaccu`,{
          method: "GET",
          headers:{
            "Content-Type": "application/json",
            
          },
        })
        .then(result => result.json())
        .then(data => {
          
    
          setTotalAccumulated(data.data)
    
          
        })

        fetch(`${process.env.REACT_APP_API_URL}subsuser/find`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({subsname: "diamond"})
          })
          .then(result => result.json())
          .then(data => {
            
      
            setDiamond(data.data)
      
            
          })

          fetch(`${process.env.REACT_APP_API_URL}communityactivy/find`)
          .then(result => result.json())
          .then(data => {
            if(data.message === "success"){
              setComAct(data.data)
            }
            
          })
    
          fetch(`${process.env.REACT_APP_API_URL}investor/find`)
          .then(result => result.json())
          .then(data => {
            if(data.message === "success"){
              setinvestorfund(data.data)
            }
            
          })
        
    },[totalaccumulated, mc, totalbar])

    // useEffect(()=>{
    //     const percentage = (initialbar/totalbar) * 100     
    //     setProgress(percentage)
        
    // },[initialbar, totalbar])

    useEffect(() => {
        const mgprice = initialbar + monmongem
        const total =  totalaccumulated
        const adsamount = ads
        const investoramount = investorfund
        const pool = total * 0.01
        const gg = comact.grinding
        const qr = comact.quest
        const tt = adsamount + investoramount + gg + qr + totalbar
        const emseeprice =  parseFloat(tt) / parseFloat(mc)
        const emsetofarm = (adsamount + investoramount + gg + qr + totalbar) * 1000
        setTotalPoolAccumulated(pool)
        setMcPrice(emseeprice)
        setMctofarm(emsetofarm)
        setMgPrice(mgprice)
    },[comact, mc, totalaccumulated, totalbar, ads, investorfund, initialbar, monmongem])

    // useEffect(()=>{
    //     if(initialbar){
    //        setInitialBar(seperator(initialbar))
    //     }
    //     if(totalbar){
    //         setTotalBar(seperator(totalbar))
    //      }
    // },[initialbar,totalbar])

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}ads/find`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(result => result.json())
      .then(data => {
        setAds(data.data)
        
      })

      // fetch(`${process.env.REACT_APP_API_URL}leaderboard/find`,{
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // })
      // .then(result => result.json())
      // .then(data => {

      //   setLeaderboard(data.data)
        
      // })

    },[])
    
    useEffect(()=> {
      fetch(`${process.env.REACT_APP_API_URL}communityactivy/mcvaluemonthly`)
      .then(result => result.json())
      .then(data => {
        if(data.message === "success"){
          setMcPreviousMonth(data.data.amount)
        }
        
      })
    },[])

    const settings = {
      className: "moncoin",
      arrows: false,
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 5,        
      adaptiveHeight: false,
      focusOnSelect: true,
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

    // const settings = {
    //   dots: false,
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: 3,
    //   slidesToScroll: 1,
    //   width: 600
    // };

    const leaderboardranking = [
      {
        number: 1,
        percentage: "25%",
        color: "#E1D647"
      },
      {
        number: 2,
        percentage: "20%",
        color: "#E1D647"
      },
      {
        number: 3,
        percentage: "15%",
        color: "#E1D647"
      },
      {
        number: 4,
        percentage: "10%",
        color: "#FFAD01"
        
      },
      {
        number: 5,
        percentage: "8%",
        color: "#FFAD01"
      },
      {
        number: 6,
        percentage: "5%",
        color: "#FFAD01"
      },
      {
        number: 7,
        percentage: "4%",
        color: "#FFAD01"
      },
      {
        number: 8,
        percentage: "3%",
        color: "#FFAD01"
      },
      {
        number: 9,
        percentage: "2%",
        color: "#FF97CF"
      },
      {
        number: 10,
        percentage: "2%",
        color: "#FF97CF"
      },
      {
        number: 11,
        percentage: "2%",
        color: "#FF97CF"
      },
      {
        number: 12,
        percentage: "1%",
        color: "#FD9789"
      },
      {
        number: 13,
        percentage: "1%",
        color: "#FD9789"
      },
      {
        number: 14,
        percentage: "1%",
        color: "#FD9789"
      },
      {
        number: 15,
        percentage: "1%",
        color: "#FD9789"
      },
    ]

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}communityactivy/find`)
      .then(result => result.json())
      .then(data => {
        if(data.message === "success"){
          setLeaderboard(data.data.leaderboard)
          setDiamondPool(data.data.diamondpools)
          setMonmongem(data.data.monstergem)
        }
      })
    },[])

    return (
      <>
        <div className="kahitanu">
                
        <MDBContainer fluid className="d-flex text-center justify-content-center align-items-center mb-5" id="home">
        <div className="dahonleft">
            <img src={dahonleft} alt="" className="d-none d-lg-block"/>
        </div>
        <div className="dahonright">
            <img src={dahonright} alt="" className="d-none d-lg-block"/>
        </div>
        <MDBContainer fluid className="">
        <img src={cloudA} alt="" className="cloudA x1"/>
            <MDBRow>
                <MDBCol className="mt-5 mb-3 sm-col-12 text-center">                
                    <img src={biglogo} id="biglogo" className="img-fluid" alt=""></img>
                    <div>
                    <img src={cloudB} alt="" className="cloudB x2"/>
                </div>
                    
                </MDBCol>
                <div>
                <img src={cloudC} alt="" className="cloudC x3"/>
                </div>
            </MDBRow>
            
            <MDBRow className="align-items-center justify-content-center">
                <MDBCol lg={3} className="mb-5">
                <div class="container"  style={{backgroundColor: "#FADDBF", borderRadius: "6px"}}>
                <div className="card bg-transparent shadow-0" >
                    <MDBIcon fas icon="users" style={{color: "#238731"}} className="my-2" size="2x"/>
                <div id="inputs" className="inputs pb-3"> 
                    </div>
                </div> 
                     
                </div>        
                </MDBCol>
            </MDBRow>
                <MDBRow className="align-items-center justify-content-center">
                {/* <div> */}
                <Slider {...settings}>
                <MDBCol className="col-lg-2 text-center ">
                    <MDBCard alignment='center' className=" mt-0 moncoin mx-2">
                    
                    <MDBCardHeader className='fw-bold px-0 py-1' style={{backgroundColor: "#FADDBF",}}>
                    <div className="row">

                    <div className="col-3">
                    <MDBIcon className="ms-4" size="2x" far icon="question-circle" animate='bounce' onClick={toggleShow} style={{cursor: "pointer"}}/>

                    </div>

                    <div className="col-6 offset-1 d-flex align-items-center">
                      
                    <img className="me-2" src={monstercoin} alt="" style={{width: "40px"}}/>
                    
                    <span>Monster Coin</span>
                    </div>

                    </div>
                    
                    
                    </MDBCardHeader>

                    <MDBCardBody className="" style={{backgroundColor: "#838383"}}>
                    <div>
                    <MDBTypography className="fw-bold" style={{fontSize: "2rem", color: "white"}}>{Mcprice !== Infinity && !isNaN(Mcprice) ? `$ ${Mcprice.toFixed(6)}` : 0}</MDBTypography>
                    </div>
                    <div>
                    <MDBTypography tag="p" className="text-white">
                    Total MC to Farm :
                    &nbsp;{Mctofarm !== Infinity && !isNaN(Mctofarm) ? `${Mctofarm.toLocaleString()}` : 0}
                    </MDBTypography> 
                    </div>
                    </MDBCardBody>
                    <MDBCardFooter className='fw-bold' style={{backgroundColor: "#FADDBF", fontSize: "1rem", }}>Total Coins: {mc.toLocaleString()}</MDBCardFooter>
                    </MDBCard> 

                </MDBCol>

                    <MDBCol  className="col-lg-2 text-center  ">
                    <MDBCard alignment='center' className="moncoin mx-2">
                    
                    <MDBCardHeader className='fw-bold px-0 py-1' style={{backgroundColor: "#FADDBF",}}>
                    <div>
                    <div className="d-flex align-items-center justify-content-center">
                    <img src={monstercoin} alt="" style={{width: "40px"}}/>
                    <span className="ms-2">Investor Funds</span> 
                    </div>
                    </div>
                    
                    </MDBCardHeader>

                    <MDBCardBody className="d-flex justify-content-center" style={{backgroundColor: "#838383"}}>
                    
                    <MDBTypography className="fw-bold d-flex align-items-center" style={{fontSize: "2rem", color: "white"}}>$ {investorfund.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</MDBTypography>
                    </MDBCardBody>
                    <MDBCardFooter className='fw-bold p-4' style={{backgroundColor: "#FADDBF", fontSize: "1rem", }}></MDBCardFooter>
                    </MDBCard> 

                    </MDBCol>
                    <MDBCol  className="col-lg-2 text-center  ">
                    <MDBCard alignment='center' className="moncoin mx-2">
                    
                    <MDBCardHeader className='fw-bold px-0 py-1' style={{backgroundColor: "#FADDBF",}}>
                    <div className="d-flex align-items-center justify-content-center">
                    <img src={monstergem} alt="" style={{width: "40px"}}/>
                    
                    <span className="ms-2">Monster Gem</span> 
                    </div>
                    
                    </MDBCardHeader>

                    <MDBCardBody className="d-flex justify-content-center" style={{backgroundColor: "#838383"}}>
                    
                    <MDBTypography className="fw-bold d-flex align-items-center" style={{fontSize: "2rem", color: "white"}}>$ {Mgprice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</MDBTypography> 
                    </MDBCardBody>
                    <MDBCardFooter className='fw-bold' style={{backgroundColor: "#FADDBF", fontSize: "1rem", }}>Total Gem Farmed: 0</MDBCardFooter>
                    </MDBCard> 

                    </MDBCol>

                    <MDBCol  className="col-lg-2 text-center  ">
                    <MDBCard alignment='center' className="moncoin mx-2">
                    
                    <MDBCardHeader className='fw-bold px-0 py-1' style={{backgroundColor: "#FADDBF",}}>
                    <div className="d-flex align-items-center justify-content-center">
                    <img src={diamond} alt="" style={{width: "40px"}}/>
                    
                    <span className="ms-2">Diamond Pools</span> 
                    </div>
                   
                    </MDBCardHeader>

                    <MDBCardBody className="d-flex justify-content-center" style={{backgroundColor: "#838383"}}>
                    
                    <MDBTypography className="fw-bold d-flex align-items-center" style={{fontSize: "2rem", color: "white"}}>{`$ ${diamondpool.toFixed(2)}`}</MDBTypography> 
                    </MDBCardBody>
                    <MDBCardFooter className='fw-bold' style={{backgroundColor: "#FADDBF", fontSize: "1rem", }}>Total User: 0</MDBCardFooter>
                    </MDBCard> 

                    </MDBCol>
                    
                    <MDBCol  className="col-lg-2 text-center  ">
                    <MDBCard alignment='center' className="moncoin mx-2">
                    
                    <MDBCardHeader className='fw-bold px-0 py-1' style={{backgroundColor: "#FADDBF",}}>
                    <div className="d-flex align-items-center justify-content-center">
                    <img src={adslogo} alt="" style={{width: "40px"}}/>
                    
                    <span className="ms-2">Advertisement</span>
                    </div>
                     
                    </MDBCardHeader>

                    <MDBCardBody className="d-flex justify-content-center" style={{backgroundColor: "#838383"}}>
                    
                    <MDBTypography className="fw-bold d-flex align-items-center" style={{fontSize: "2rem", color: "white"}}>{`$ ${ads.toFixed(2)}`}</MDBTypography> 
                    </MDBCardBody>
                    <MDBCardFooter className='fw-bold p-4' style={{backgroundColor: "#FADDBF", fontSize: "1rem", }}></MDBCardFooter>
                    </MDBCard> 

                    </MDBCol>

                    <MDBCol  className="col-lg-2 text-center  ">
                    <MDBCard alignment='center' className="moncoin mx-2">
                    
                    <MDBCardHeader className='fw-bold px-0 py-1' style={{backgroundColor: "#FADDBF",}}>
                    <div className="row">
                    <div className="col-3">
                    <MDBIcon className="ms-4" size="2x" far icon="question-circle" animate='bounce' onClick={toggleShow1} style={{cursor: "pointer"}}/>
                    </div>
                    <div className="col-6 offset-1 d-flex align-items-center">
                    <img src={leadlogo} alt="" style={{width: "40px"}}/>

                    <span className="ms-2">Leaderboard</span> 
                    </div>

                    
                    </div>
                    
                    </MDBCardHeader>

                    <MDBCardBody className="d-flex align-items-center justify-content-center" style={{backgroundColor: "#838383"}}>
                    
                    <MDBTypography className="fw-bold d-flex align-items-center" style={{fontSize: "2rem", color: "white"}}>{`$ ${leaderboard.toFixed(2)}`}</MDBTypography> 
                    </MDBCardBody>
                    <MDBCardFooter className='fw-bold p-4' style={{backgroundColor: "#FADDBF", fontSize: "1rem", }}></MDBCardFooter>
                    </MDBCard> 

                    </MDBCol>
                </Slider> 
                {/* </div> */}
                    {/* <MDBCol className="col-lg-2 text-center my-2">
                    <MDBCard alignment='center' className="moncoin">
                    
                    <MDBCardHeader className='fw-bold px-0 py-1' style={{backgroundColor: "#FADDBF",}}>
                    <div className="row">

                    <div className="col-3">
                    <MDBIcon className="ms-4" size="2x" far icon="question-circle" animate='bounce' onClick={toggleShow} style={{cursor: "pointer"}}/>

                    </div>

                    <div className="col-8 d-flex align-items-center">
                      
                    <img className="me-2" src={monstercoin} alt="" style={{width: "40px"}}/>
                    
                    <span>Monster Coin</span>
                    </div>

                    </div>
                    
                    
                    </MDBCardHeader>

                    <MDBCardBody className="d-flex justify-content-center" style={{backgroundColor: "#838383"}}>
                    
                    <strong className="mx-2" style={{fontSize: "2rem", color: "white"}}>{Mcprice !== Infinity && !isNaN(Mcprice) ? `$ ${Mcprice.toFixed(6)}` : 0}</strong> 
                    </MDBCardBody>
                    <MDBCardFooter className='fw-bold' style={{backgroundColor: "#FADDBF", fontSize: "1rem", }}>Total Coins: {mc.toLocaleString()}</MDBCardFooter>
                    </MDBCard> 

                    </MDBCol>

                    <MDBCol  className="col-lg-2 text-center  my-2">
                    <MDBCard alignment='center' className="moncoin">
                    
                    <MDBCardHeader className='fw-bold px-0 py-1' style={{backgroundColor: "#FADDBF",}}>
                    <img src={monstercoin} alt="" style={{width: "40px"}}/>
                    
                    <span className="ms-2">Investor Funds</span> 
                    </MDBCardHeader>

                    <MDBCardBody className="d-flex justify-content-center" style={{backgroundColor: "#838383"}}>
                    
                    <strong className="mx-2" style={{fontSize: "2rem", color: "white"}}>$ 0.00</strong>
                    </MDBCardBody>
                    <MDBCardFooter className='fw-bold p-4' style={{backgroundColor: "#FADDBF", fontSize: "1rem", }}></MDBCardFooter>
                    </MDBCard> 

                    </MDBCol>
                    <MDBCol  className="col-lg-2 text-center  my-2">
                    <MDBCard alignment='center' className="moncoin">
                    
                    <MDBCardHeader className='fw-bold px-0 py-1' style={{backgroundColor: "#FADDBF",}}>
                    <img src={diamond} alt="" style={{width: "40px"}}/>
                    
                    <span className="ms-2">Diamond Pools</span> 
                    </MDBCardHeader>

                    <MDBCardBody className="d-flex justify-content-center" style={{backgroundColor: "#838383"}}>
                    
                    <strong className="mx-2" style={{fontSize: "2rem", color: "white"}}>{`$ ${diamondpool.toFixed(2)}`}</strong> 
                    </MDBCardBody>
                    <MDBCardFooter className='fw-bold' style={{backgroundColor: "#FADDBF", fontSize: "1rem", }}>Total User: 0</MDBCardFooter>
                    </MDBCard> 

                    </MDBCol>
                    <MDBCol  className="col-lg-2 text-center  my-2">
                    <MDBCard alignment='center' className="moncoin">
                    
                    <MDBCardHeader className='fw-bold px-0 py-1' style={{backgroundColor: "#FADDBF",}}>
                    <img src={monstergem} alt="" style={{width: "40px"}}/>
                    
                    <span className="ms-2">Monster Gem</span> 
                    </MDBCardHeader>

                    <MDBCardBody className="d-flex justify-content-center" style={{backgroundColor: "#838383"}}>
                    
                    <strong className="mx-2" style={{fontSize: "2rem", color: "white"}}>$ 1.00</strong> 
                    </MDBCardBody>
                    <MDBCardFooter className='fw-bold' style={{backgroundColor: "#FADDBF", fontSize: "1rem", }}>Total Gem: 0</MDBCardFooter>
                    </MDBCard> 

                    </MDBCol>
                    <MDBCol  className="col-lg-2 text-center  my-2">
                    <MDBCard alignment='center' className="moncoin">
                    
                    <MDBCardHeader className='fw-bold px-0 py-1' style={{backgroundColor: "#FADDBF",}}>
                    <img src={adslogo} alt="" style={{width: "40px"}}/>
                    
                    <span className="ms-2">Advertisement</span> 
                    </MDBCardHeader>

                    <MDBCardBody className="d-flex justify-content-center" style={{backgroundColor: "#838383"}}>
                    
                    <strong className="mx-2" style={{fontSize: "2rem", color: "white"}}>{`$ ${ads.toFixed(2)}`}</strong> 
                    </MDBCardBody>
                    <MDBCardFooter className='fw-bold p-4' style={{backgroundColor: "#FADDBF", fontSize: "1rem", }}></MDBCardFooter>
                    </MDBCard> 

                    </MDBCol>

                    <MDBCol  className="col-lg-2 text-center  my-2">
                    <MDBCard alignment='center' className="moncoin">
                    
                    <MDBCardHeader className='fw-bold px-0 py-1' style={{backgroundColor: "#FADDBF",}}>
                    <div className="row">
                    <div className="col-3">
                    <MDBIcon className="ms-4" size="2x" far icon="question-circle" animate='bounce' onClick={toggleShow1} style={{cursor: "pointer"}}/>
                    </div>
                    <div className="col-8 d-flex align-items-center">
                    <img src={leadlogo} alt="" style={{width: "40px"}}/>

                    <span className="ms-2">Leaderboard</span> 
                    </div>

                    
                    </div>
                    
                    </MDBCardHeader>

                    <MDBCardBody className="d-flex justify-content-center" style={{backgroundColor: "#838383"}}>
                    
                    <strong className="mx-2" style={{fontSize: "2rem", color: "white"}}>{`$ ${leaderboard.toFixed(2)}`}</strong> 
                    </MDBCardBody>
                    <MDBCardFooter className='fw-bold p-4' style={{backgroundColor: "#FADDBF", fontSize: "1rem", }}></MDBCardFooter>
                    </MDBCard> 

                    </MDBCol> */}
                </MDBRow>
                <MDBRow> 
                    <MDBCol className="my-3">
                    <img src={donwloadnow} className="mx-lg-3 my-lg-0 my-2 img-fluid zoom-playnow" alt="" 
                    // onClick={() => {
                    //     window.location.href =  `${process.env.REACT_APP_API_URL}uploads/Monmonland.apk`
                    // }}
                    onClick={toggleShow2}
                    /> 
                    {/* <img 
                    src={appstore} 
                    className="mx-lg-3 my-lg-0 my-2 img-fluid zoom-playnow" 
                    alt="" 
                    // onClick={() => {
                    //     window.location.href =  `${process.env.REACT_APP_API_URL}uploads/Monmonland.apk`
                    // }}
                    />  */}       
                    </MDBCol>
                    {/* <MDBCol>
                    <FlipCountdown
                        endAtZero
                        hideYear
                        hideMonth
                        hideDay
                        size='small'
                        endAt={'2023-11-17 23:00:00'} // Date/Time
                        onTimeUp={() => console.log("Time's up ⏳")}
                    />
                    </MDBCol> */}
                </MDBRow>
        </MDBContainer>
            
        </MDBContainer>
        </div>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader className="seamless justify-content-center">
              <MDBModalTitle className="text-white fw-bold ">Monster Coin Value</MDBModalTitle>
              {/* <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn> */}
            </MDBModalHeader>
            <MDBModalBody className="h4 text-center pb-0">
              Previous Cut Off: 
              {/* <div>$ 0.013143</div> */}
              &nbsp; $ {mcpreviousmonth ? mcpreviousmonth : 0.000000}
            </MDBModalBody>
            <MDBModalBody className="fw-bold text-center pt-0 h1">
              Current Cut Off: 
              &nbsp; <div>$ {Mcprice !== Infinity ? Mcprice.toFixed(6) : 0.000000}</div>
              
            </MDBModalBody>
            <MDBModalFooter className="seamless">
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>


      <MDBModal show={basicModal1} setShow={setBasicModal1} tabIndex='-1'>
        <MDBModalDialog centered>
          <MDBModalContent centered>
            <MDBModalHeader className="justify-content-center seamless">
            <MDBModalTitle className="text-white fw-bold">Leaderboard Reward</MDBModalTitle>
              {/* <MDBBtn className='btn-close' color='none' onClick={toggleShow1}></MDBBtn> */}
            </MDBModalHeader>
            <MDBModalBody>
            <MDBTable small className="text-center">
              <MDBTableHead>
                <tr>
                  <th scope='col'>Rank</th>
                  <th scope='col'>Percentage</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
              {
                leaderboardranking.map((data,i) => (
                <tr key={`${i}`} style={{background: data.color}}>
                  <td>{data.number}</td>
                  <td>{data.percentage}</td>
                </tr>
                ))
              }
              </MDBTableBody>
            </MDBTable>
            </MDBModalBody>
            <MDBModalFooter className="seamless">
              <MDBBtn color='secondary' onClick={toggleShow1}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal show={basicModal2} setShow={setBasicModal2} tabIndex='-1'>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader className="seamless justify-content-center">
              <MDBModalTitle className="text-white fw-bold ">Count Down</MDBModalTitle>
              {/* <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn> */}
            </MDBModalHeader>
            <MDBModalBody className="h4 text-center pb-0">
            <FlipCountdown
              titlePosition='bottom'
              endAtZero
              hideYear
              hideMonth
              hideDay
              size='small'
              endAt={'2023-11-18 08:00:00'} // Date/Time
              onTimeUp={() => console.log("Time's up ⏳")}
            />
            </MDBModalBody>
            <MDBModalFooter className="seamless">
              <MDBBtn color='secondary' onClick={toggleShow2}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      
        </>
    )
}

export default Header;