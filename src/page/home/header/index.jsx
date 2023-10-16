import React, {useState, useEffect} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon,MDBTypography,MDBProgress, MDBProgressBar, MDBBtn, MDBSpinner } from "mdb-react-ui-kit";
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
const Header = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [initialbar, setInitialBar] = useState();
    const [totalbar, setTotalBar] = useState();
    const [progress, setProgress] = useState();
    const [mc, setMc] = useState([])
    const [mg, setMg] = useState([])
    const [totaluser, setTotaluser] = useState([])

    const seperator = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(()=> {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}gameactivity/${process.env.REACT_APP_PROGRESSID}/find`)
        .then(result => result.json())
        .then(data => {
            setInitialBar(data.initial)
            setTotalBar(data.total)
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
                setMc(data.data)
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
            setMg(data.data)
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
            console.log(a <= 0)
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
        const percentage = (initialbar/totalbar) * 100     
        setProgress(percentage)
    },[initialbar, totalbar])

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
                    <MDBCol lg={2} className=" text-center ">
                    <div className="card bg-transparent container p-0">
                    <img src={Tab} alt="" />
                    <div className="moncoin">
                    <img src={usdt} alt="" style={{width: "40px"}}/>
                    <strong className="mx-2" style={{fontSize: "2rem"}}>Monster Coin</strong>

                    <div className="mt-2">
                    <img src={usdt} alt="" style={{width: "40px"}}/>
                    <strong className="mx-2" style={{fontSize: "3rem", color: "white"}}>0.00001</strong> 
                    </div> 
                    <div className="mt-4">
                    <strong >Total Coins: {mc?.amount?.toLocaleString()}</strong> 
                    </div>
                    
                    </div>
                    
                    </div>        
                    </MDBCol>
                    <MDBCol lg={2} className=" text-center ">
                    <div className="card bg-transparent container p-0">
                    <img src={Tab} alt="" />
                    <div className="moncoin">
                    <img src={usdt} alt="" style={{width: "40px"}}/>
                    <strong className="mx-2" style={{fontSize: "2rem"}}>Monster Gem</strong>

                    <div className="mt-2">
                    <img src={usdt} alt="" style={{width: "40px"}}/>
                    <strong className="mx-2" style={{fontSize: "3rem", color: "white"}}>1</strong> 
                    </div> 
                    <div className="mt-4">
                    <strong >Total Gems: {mg?.amount?.toLocaleString()}</strong> 
                    </div>
                    
                    </div>
                    
                    </div>        
                    </MDBCol>
                </MDBRow>
                <MDBRow> 
                    <MDBCol className="my-3 text-center">
                    <MDBBtn color="" className="bg-transparent shadow-0">
                    <img src={donwloadnow} className="zoom-playnow" alt="" />
                    </MDBBtn>                       
                    </MDBCol>
                </MDBRow>
        </MDBContainer>
            
        </MDBContainer>
        </div>
    )
}

export default Header;