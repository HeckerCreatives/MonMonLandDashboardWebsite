import { MDBContainer, MDBTypography,MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn, 
    MDBRow,
    MDBCol,
    MDBCardHeader,
    MDBCardFooter,
    MDBIcon,
    MDBCardImage} from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import TopUpLogin from "./topuplogin";
import Swal from "sweetalert2";
import topnavimg from "../../../assets/topup/banner.png"
import userholder from "../../../assets/topup/username holder.png"
import backbtn from "../../../assets/topup/back BUTTON.png"
import line from "../../../assets/topup/username TAB.png"
import fundstab from "../../../assets/topup/select TAB small.png"
import addfundsbtn from "../../../assets/topup/add funds BUTTON.png"
import ironpak from "../../../assets/topup/ruby + iron icon.png"
import steelpak from "../../../assets/topup/emerald + steel icon.png"
import mithrilpak from "../../../assets/topup/diamond + mithril icon.png"
import adamantpak from "../../../assets/topup/siamon + adamant + 5hrs icon.png"
import "./index.css"
const TopUp = () =>{
    const [basicModal, setBasicModal] = useState(false);
    // const [toggleTwoModal, setToggleTwoModal] = useState(false);
    // const [hasquery, setHasQuery] = useState(false)
    const [username, setUsername] = useState("")
    const [amount, setAmount] = useState(0);
    const [selectedtopup, setSelectedTopUp] = useState("");
    const [bundle, setBundle] = useState("");
    const [bundledes, setBundleDes] = useState("");
    const [bundlesubs, setBundleSubs] = useState("");
    const auth = JSON.parse(localStorage.getItem("user"))
    const toggleShow = () => setBasicModal(!basicModal);
    // const toggleShow1 = () => setToggleTwoModal(!toggleTwoModal);

    useEffect(() => {
        const queryParams = new URL(window.location.href);
        const value = new URLSearchParams(queryParams.search);
        const decrypt = value.get('value');

        const final = atob(decrypt)
        const decrypted = new URLSearchParams(final);
        const username = decrypted.get('username');
        setUsername(username)
        
        // if(decrypt !== null){
        //     setHasQuery(true)
        // }

       if(!decrypt && !auth){
        Swal.fire({
            icon: "warning",
            title: "Do not Tamper Url",
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(() => {
            window.location.href = "/"
        })
       } else {

       }
    },[auth])

    const handleFunds = (e) => {
        setAmount(e)
        setSelectedTopUp("funds")
        toggleShow()
        
    }

    const handleBundles = (e,bundle,des,subs) => {
        setAmount(e)
        setSelectedTopUp("bundles")
        setBundle(bundle)
        setBundleDes(des)
        setBundleSubs(subs)
        toggleShow()
    }
    return(
        <>
            <div className="kontainer">

            <MDBBtn className="bg-transparent p-0 mt-2" onClick={() => window.location.href="/"}>
                <img className="" src={backbtn} alt="" />
            </MDBBtn>
            
            </div>
            <div className="" style={{backgroundColor: "#432808"}}>
                <div className="d-flex justify-content-end align-items-center">
                <MDBIcon fas icon="user-circle" color="primary"/>
                    <span className=" text-white mx-3">Login as: {auth ? auth.Username : username}</span> 
                </div>   
            </div>
        
        <MDBContainer fluid className="">            
            

        <MDBContainer fluid>
        <MDBRow className="position-relative">

        <MDBCard className="mt-5 px-0">
            <MDBCardHeader style={{background: "#8D5513", color: "white"}}>Select Funds</MDBCardHeader>
        <MDBRow>

        
            <MDBCol className="p-5">
            <MDBCard alignment="center" className="fundbdy">
            <MDBCardBody className="fundbdy d-flex align-items-center justify-content-between">
                <MDBTypography tag="h1">$ 20</MDBTypography>
                {/* <MDBBtn className="p-0" onClick={()=>handleFunds(20)}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn> */}
                <img className="zoom-playnow" src={addfundsbtn} alt="" onClick={()=>handleFunds(20)}/>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>
            
            <MDBCol className="p-5">
            <MDBCard alignment="center" className="fundbdy">
            <MDBCardBody className="fundbdy d-flex align-items-center justify-content-between">
                <MDBTypography tag="h1">$ 50</MDBTypography>
                {/* <MDBBtn className="p-0" onClick={()=>handleFunds(50)}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn> */}
                <img className="zoom-playnow" src={addfundsbtn} alt="" onClick={()=>handleFunds(50)}/>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>

            <MDBCol className="p-5">
            <MDBCard alignment="center" className="fundbdy">
            <MDBCardBody className="fundbdy d-flex align-items-center justify-content-between">
                <MDBTypography tag="h1">$ 100</MDBTypography>
                {/* <MDBBtn className="p-0" onClick={()=>handleFunds(100)}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn> */}
                <img className="zoom-playnow" src={addfundsbtn} alt="" onClick={()=>handleFunds(100)}/>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>

            <MDBCol className="p-5">
            <MDBCard alignment="center" className="fundbdy">
            <MDBCardBody className="fundbdy d-flex align-items-center justify-content-between">
                <MDBTypography tag="h1">$ 200</MDBTypography>
                {/* <MDBBtn className="p-0" onClick={()=>handleFunds(200)}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn> */}
                <img className="zoom-playnow" src={addfundsbtn} alt="" onClick={()=>handleFunds(200)}/>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>
        </MDBRow>
            
            
        </MDBCard>

        <MDBCard className="mt-5 px-0">
            <MDBCardHeader style={{background: "#8D5513", color: "white"}}>Select Bundles</MDBCardHeader>
            <MDBCardBody>
            <MDBRow >
                <MDBCol className="my-2">
                <MDBCard alignment="center" >
                <MDBCardHeader className="fw-bold" style={{background: "#FADDBF"}}>IRON PACK</MDBCardHeader>
                <MDBCardBody className="bundlesbdy p-0">
                    <MDBCardImage src={ironpak} className="pt-4"/>

                    <MDBCardText className="p-4 text-white" style={{background: "#838383", width: "100%", height: "92px"}}>
                    Ruby Subscription + Iron Tool
                    </MDBCardText>
                    
                </MDBCardBody>
                <MDBCardFooter className="d-flex justify-content-end align-items-center" style={{background: "#FADDBF"}}>
                <span className="fw-bold" style={{fontSize: "1.5rem"}}>
                $ 30
                </span>
                {/* <MDBBtn className="p-0 mx-2" onClick={() =>handleBundles(30,"Iron Pack","Ruby Subscription + Iron Tool","ruby")}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn> */}
                <img className="zoom-playnow mx-2" src={addfundsbtn} alt="" onClick={() =>handleBundles(30,"Iron Pack","Ruby Subscription + Iron Tool","ironpack")}/>
                </MDBCardFooter>
                </MDBCard>
                </MDBCol>

                <MDBCol className="my-2">
                <MDBCard alignment="center" >
                <MDBCardHeader className="fw-bold" style={{background: "#FADDBF"}}>STEEL PACK</MDBCardHeader>
                <MDBCardBody className="bundlesbdy p-0">
                    <MDBCardImage src={steelpak} className="pt-4"/>

                    <MDBCardText className="p-4 text-white" style={{background: "#838383", width: "100%", height: "92px"}}>
                    Emerald Subscription + Steel Tool
                    </MDBCardText>
                    
                </MDBCardBody>
                <MDBCardFooter className="d-flex justify-content-end align-items-center" style={{background: "#FADDBF"}}>
                <span className="fw-bold" style={{fontSize: "1.5rem"}}>
                $ 65
                </span>
                {/* <MDBBtn className="p-0 mx-2" onClick={() =>handleBundles(65,"Steel Pack","Emerald Subscription + Steel Tool","emerald")}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn> */}
                <img className="zoom-playnow mx-2" src={addfundsbtn} alt="" onClick={() =>handleBundles(65,"Steel Pack","Emerald Subscription + Steel Tool","steelpack")}/>
                </MDBCardFooter>
                </MDBCard>
                </MDBCol>

                <MDBCol className="my-2">
                <MDBCard alignment="center" >
                <MDBCardHeader className="fw-bold" style={{background: "#FADDBF"}}>MITHRIL PACK</MDBCardHeader>
                <MDBCardBody className="bundlesbdy p-0">
                    <MDBCardImage src={mithrilpak} className="pt-4"/>

                    <MDBCardText className="p-4 text-white" style={{background: "#838383", width: "100%", height: "92px"}}>
                    Diamond Subscription + Mithril Tool
                    </MDBCardText>

                </MDBCardBody>
                <MDBCardFooter className="d-flex justify-content-end align-items-center" style={{background: "#FADDBF"}}>
                <span className="fw-bold" style={{fontSize: "1.5rem"}}>
                $ 120
                </span>
                {/* <MDBBtn className="p-0 mx-2" onClick={() =>handleBundles(120,"Mithril Pack","Diamond Subscription + Mithril Tool","diamond")}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn> */}
                <img className="zoom-playnow mx-2" src={addfundsbtn} alt="" onClick={() =>handleBundles(120,"Mithril Pack","Diamond Subscription + Mithril Tool","mithrilpack")}/>
                </MDBCardFooter>
                </MDBCard>
                </MDBCol>


                <MDBCol className="my-2">
                <MDBCard alignment="center" >
                <MDBCardHeader className="fw-bold" style={{background: "#FADDBF"}}>DIAMOND PACK</MDBCardHeader>
                <MDBCardBody className="bundlesbdy p-0">
                    <MDBCardImage src={adamantpak} className="pt-4"/>

                    

                    <MDBCardText className="p-4 text-white" style={{background: "#838383", width: "100%", height: "92px"}}>
                    Diamond Subscription + Adamant Tool + 5 hours clock
                    </MDBCardText>
                    
                </MDBCardBody>
                <MDBCardFooter className="d-flex justify-content-end align-items-center" style={{background: "#FADDBF"}}>
                <span className="fw-bold" style={{fontSize: "1.5rem"}}>
                $ 180
                </span>
                {/* <MDBBtn className="p-0 mx-2" onClick={() =>handleBundles(180,"Adamant Pack","Diamond Subscription + Adamant Tool + 5 hours clock", "diamond")}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn> */}
                <img className="zoom-playnow mx-2" src={addfundsbtn} alt="" onClick={() =>handleBundles(180,"Adamant Pack","Diamond Subscription + Adamant Tool + 5 hours clock", "adamantpack")}/>
                </MDBCardFooter>
                </MDBCard>
                </MDBCol>
            </MDBRow>
            
            </MDBCardBody>
        </MDBCard>

        </MDBRow>

        </MDBContainer>
        
       
        <TopUpLogin 
        bundle={bundle}
        bundledes={bundledes}
        bundlesubs={bundlesubs}
        selectedtopup={selectedtopup} 
        amount={amount} 
        basicModal={basicModal} 
        setBasicModal={setBasicModal}
        // toggleTwoModal={toggleTwoModal}
        // setToggleTwoModal={setToggleTwoModal}
        />
        
        </MDBContainer>
        </>
    )
}

export default TopUp;