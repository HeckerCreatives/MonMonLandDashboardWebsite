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
                <MDBCol lg={2} className="mb-5">
                <div className="card">
                <MDBIcon fas icon="users" size="4x"/>
                <strong style={{fontSize: "2rem"}}>999,999,999</strong>
                </div>        
                </MDBCol>
            </MDBRow>
                <MDBRow className="align-items-center justify-content-center"> 
                    <MDBCol lg={1} className="bg-white text-center mx-2">
                    <div>
                    <strong style={{fontSize: "2rem"}}>MC</strong>
                    </div>
                    <div className="d-flex">
                    <img src={usdt} alt="" style={{width: "40px"}}/>
                    <strong className="mx-2" style={{fontSize: "2rem"}}>0.001</strong> 
                    </div> 
                    <p>999,999,999</p>         
                    </MDBCol>
                    <MDBCol lg={1} className="bg-white text-center mx-2">
                    <div>
                    <strong style={{fontSize: "2rem"}}>MG</strong> 
                    </div>
                    <div className="d-flex">
                    <img src={usdt} alt="" style={{width: "40px"}}/>
                    <strong className="mx-2" style={{fontSize: "2rem"}}>1.00</strong> 
                    </div> 
                    <p>999,999,999</p>         
                    </MDBCol>
                </MDBRow>
                <MDBRow> 
                    <MDBCol className="my-3 text-center">
                    <MDBBtn color="" className=" bg-primary shadow-0">
                    DOWNLOAD NOW
                    </MDBBtn>                       
                    </MDBCol>
                </MDBRow>
        </MDBContainer>
            
        </MDBContainer>
        </div>
    )
}

export default Header;