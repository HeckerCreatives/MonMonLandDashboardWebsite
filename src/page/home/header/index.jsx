import React, {useState, useEffect} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon,MDBTypography,MDBProgress, MDBProgressBar, MDBBtn, MDBSpinner,MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,
    MDBCardFooter, } from "mdb-react-ui-kit";
import "./index.css";
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
const Header = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [initialbar, setInitialBar] = useState();
    const [totalbar, setTotalBar] = useState(0.00);
    const [progress, setProgress] = useState(0);
    const [mc, setMc] = useState(0)
    const [mg, setMg] = useState(0)
    const [totaluser, setTotaluser] = useState([])
    const [Mcprice, setMcPrice] = useState(0)
    const [pearlaccumulated, setPearlAccumulated] = useState(0);
    const [rubyaccumulated, setRubyAccumulated] = useState(0);
    const [emeraldaccumulated, setEmeraldAccumulated] = useState(0);
    const [diamondaccumulated, setDiamondAccumulated] = useState(0);
    const [totalaccumulated, setTotalAccumulated] = useState(0);
    const [diamonds, setDiamond] = useState(0);
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
            setInitialBar(data.initial)
            setTotalBar(parseFloat(data.total))
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
                setMc(data.data.amount)
                totalCoins = data.data.amount
                
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
        fetch(`${process.env.REACT_APP_API_URL}subsaccu/find`,{
          method: "POST",
          headers:{
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify({subsname: "pearl"})
        })
        .then(result => result.json())
        .then(data => {
          
    
          setPearlAccumulated(data.data)
    
          
        })
    
        fetch(`${process.env.REACT_APP_API_URL}subsaccu/find`,{
          method: "POST",
          headers:{
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify({subsname: "ruby"})
        })
        .then(result => result.json())
        .then(data => {
          
    
          setRubyAccumulated(data.data)
    
          
        })
    
        fetch(`${process.env.REACT_APP_API_URL}subsaccu/find`,{
          method: "POST",
          headers:{
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify({subsname: "emerald"})
        })
        .then(result => result.json())
        .then(data => {
          
    
          setEmeraldAccumulated(data.data)
    
          
        })
    
        fetch(`${process.env.REACT_APP_API_URL}subsaccu/find`,{
          method: "POST",
          headers:{
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify({subsname: "diamond"})
        })
        .then(result => result.json())
        .then(data => {
          
    
          setDiamondAccumulated(data.data)
    
          
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
    
    
        const total =  pearlaccumulated + rubyaccumulated + emeraldaccumulated + diamondaccumulated
        const pool = total * 0.03
        const gg = total * 0.08
        const qr = total * 0.04
        const tt = gg + qr
        const emseeprice =  parseFloat(tt) / parseFloat(mc)
        setTotalAccumulated(pool)
        setMcPrice(emseeprice)
      },[pearlaccumulated, rubyaccumulated, emeraldaccumulated,diamondaccumulated, mc])

    useEffect(()=>{
        const percentage = (initialbar/totalbar) * 100     
        setProgress(percentage)
        
    },[initialbar, totalbar])

    useEffect(() => {
    },[totalIncome, totalCoins])

    useEffect(()=>{
        if(initialbar){
           setInitialBar(seperator(initialbar))
        }
        if(totalbar){
            setTotalBar(seperator(totalbar))
         }
    },[initialbar,totalbar])
    
    

    return (
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
                    <MDBCol className="col-lg-2 text-center my-2">
                    <MDBCard alignment='center' className="moncoin">
                    
                    <MDBCardHeader className='fw-bold px-0 py-1' style={{backgroundColor: "#FADDBF",}}>
                    <img src={monstercoin} alt="" style={{width: "40px"}}/>
                    
                    <span className="ms-2">Monster Coin</span> 
                    </MDBCardHeader>

                    <MDBCardBody className="d-flex justify-content-center" style={{backgroundColor: "#838383"}}>
                    <img src={usdt} alt="" style={{width: "40px"}}/>
                    <strong className="mx-2" style={{fontSize: "2rem", color: "white"}}>{Mcprice.toFixed(6)}</strong> 
                    </MDBCardBody>
                    <MDBCardFooter className='fw-bold' style={{backgroundColor: "#FADDBF", fontSize: "1rem", }}>Total Coins: {mc.toLocaleString()}</MDBCardFooter>
                    </MDBCard> 

                    </MDBCol>

                    <MDBCol  className="col-lg-2 text-center  my-2">
                    <MDBCard alignment='center' className="moncoin">
                    
                    <MDBCardHeader className='fw-bold px-0 py-1' style={{backgroundColor: "#FADDBF",}}>
                    <img src={monstergem} alt="" style={{width: "40px"}}/>
                    
                    <span className="ms-2">Monster Gem</span> 
                    </MDBCardHeader>

                    <MDBCardBody className="d-flex justify-content-center" style={{backgroundColor: "#838383"}}>
                    <img src={usdt} alt="" style={{width: "40px"}}/>
                    <strong className="mx-2" style={{fontSize: "2rem", color: "white"}}>1.00</strong> 
                    </MDBCardBody>
                    <MDBCardFooter className='fw-bold' style={{backgroundColor: "#FADDBF", fontSize: "1rem", }}>Total Gems: {mg.toLocaleString()}</MDBCardFooter>
                    </MDBCard> 

                    </MDBCol>
                    <MDBCol  className="col-lg-2 text-center  my-2">
                    <MDBCard alignment='center' className="moncoin">
                    
                    <MDBCardHeader className='fw-bold px-0 py-1' style={{backgroundColor: "#FADDBF",}}>
                    <img src={diamond} alt="" style={{width: "40px"}}/>
                    
                    <span className="ms-2">Diamond Pools</span> 
                    </MDBCardHeader>

                    <MDBCardBody className="d-flex justify-content-center" style={{backgroundColor: "#838383"}}>
                    <img src={usdt} alt="" style={{width: "40px"}}/>
                    <strong className="mx-2" style={{fontSize: "2rem", color: "white"}}>{totalaccumulated.toFixed(2)}</strong> 
                    </MDBCardBody>
                    <MDBCardFooter className='fw-bold' style={{backgroundColor: "#FADDBF", fontSize: "1rem", }}>Total User: 0</MDBCardFooter>
                    </MDBCard> 

                    </MDBCol>
                </MDBRow>
                <MDBRow> 
                    <MDBCol className="my-3 text-center">
                    <img src={donwloadnow} className="img-fluid zoom-playnow" alt="" onClick={() => {
                        window.location.href =  `${process.env.REACT_APP_API_URL}uploads/Monmonland.apk`
                    }}/>                       
                    </MDBCol>
                </MDBRow>
        </MDBContainer>
            
        </MDBContainer>
        </div>
    )
}

export default Header;