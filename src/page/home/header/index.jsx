import React, {useState, useEffect} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTypography,MDBProgress, MDBProgressBar, MDBBtn, MDBSpinner } from "mdb-react-ui-kit";
import "./index.css";
import biglogo from "../../../assets/header/big logo2.gif"
import sliderholder from "../../../assets/header/activity slider holder.png"
import slider from "../../../assets/header/activity slider .png"
import playnow from "../../../assets/header/play now btn.png"
import Navbar from "../../../component"



const Header = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [initialbar, setInitialBar] = useState();
    const [totalbar, setTotalBar] = useState();
    const [progress, setProgress] = useState();

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

        <MDBContainer fluid className="">
            <MDBRow>
                <MDBCol className="mt-5 mb-3 sm-col-12 text-center">
                    <img src={biglogo} id="biglogo" className="img-fluid" alt=""></img>
                </MDBCol>
            </MDBRow>

            <MDBRow>
                <MDBCol className=" mt-5 mb-5">
                <MDBTypography className=" h1 fw-bold text-center text-white">
                    <p className="stroke">Game Activity</p>
                </MDBTypography>
                
                <MDBCol className="d-flex justify-content-center align-items-center text-center">
                {isLoading  ? 
                <MDBSpinner color="warning"></MDBSpinner>
                :
                <>
                <MDBProgress height='50' className="innerbar">
                    <MDBProgressBar className="progressbar" width={progress} valuemin={initialbar} valuemax={totalbar}/>                                     
                </MDBProgress> 
                <MDBTypography className="text mt-3 fw-bold">{(initialbar)}/{(totalbar)}</MDBTypography>
                </>
                }
                                      
                </MDBCol>
                                
                </MDBCol>
                </MDBRow>

                <MDBRow> 
                    <MDBCol className="text-center">
                    <MDBBtn color="transparent" className="shadow-0">
                    {/* <img src={playnow} id="playnow" alt="" className="img-fluid"></img>                     */}
                    </MDBBtn>                       
                    </MDBCol>
                </MDBRow>
        </MDBContainer>
            
        </MDBContainer>
        </div>
    )
}

export default Header;