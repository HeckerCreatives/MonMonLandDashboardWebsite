import { MDBContainer, MDBTypography,MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn, 
    MDBRow,
    MDBCol,
    MDBCardHeader,
    MDBCardFooter,
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
    const auth = JSON.parse(localStorage.getItem("auth"))
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
        <MDBContainer fluid className=""> 
        <MDBRow >
            <MDBCol className="p-0">
            <div className="kontainer">
                <div className="d-flex align-items-start">
                <img className="" src={backbtn} alt=""/>
            </div>
            
            </div>
            <div className="d-flex align-items-center justify-content-end">
                <img className="w-100" src={line} alt="" />
            <div className="d-flex align-items-center justify-content-end">
                <img className="userholder" src={userholder} alt=""/>
                <span className="userholder text-white me-5">Login as: {auth ? auth.Username : username}</span> 
            </div>   
            </div>
            
            </MDBCol>
        </MDBRow>

        <MDBContainer fluid>
        <MDBRow className="position-relative">

        <MDBCard className="mt-5 px-0">
            <MDBCardHeader style={{background: "#8D5513", color: "white"}}>Select Funds</MDBCardHeader>
        <MDBRow>

        
            <MDBCol className="p-5">
            <MDBCard alignment="center" className="fundbdy">
            <MDBCardBody className="fundbdy d-flex align-items-center justify-content-between">
                <MDBTypography tag="h1">$ 20</MDBTypography>
                <MDBBtn className="p-0" onClick={()=>handleFunds(1)}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>
            
            <MDBCol className="p-5">
            <MDBCard alignment="center" className="fundbdy">
            <MDBCardBody className="fundbdy d-flex align-items-center justify-content-between">
                <MDBTypography tag="h1">$ 50</MDBTypography>
                <MDBBtn className="p-0" onClick={()=>handleFunds(1)}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>

            <MDBCol className="p-5">
            <MDBCard alignment="center" className="fundbdy">
            <MDBCardBody className="fundbdy d-flex align-items-center justify-content-between">
                <MDBTypography tag="h1">$ 100</MDBTypography>
                <MDBBtn className="p-0" onClick={()=>handleFunds(1)}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>

            <MDBCol className="p-5">
            <MDBCard alignment="center" className="fundbdy">
            <MDBCardBody className="fundbdy d-flex align-items-center justify-content-between">
                <MDBTypography tag="h1">$ 200</MDBTypography>
                <MDBBtn className="p-0" onClick={()=>handleFunds(1)}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>
        </MDBRow>
            
            
        </MDBCard>

        <MDBCard className="mt-5 px-0">
            <MDBCardHeader style={{background: "#8D5513", color: "white"}}>Select Bundles</MDBCardHeader>
            <MDBCardBody>
            <MDBRow>
                <MDBCol>
                <MDBCard alignment="center" >
                <MDBCardHeader className="fw-bold" style={{background: "#FADDBF"}}>IRON PACK</MDBCardHeader>
                <MDBCardBody className="bundlesbdy">
                    <MDBCardImage src={ironpak} />

                    <div className="mt-3" style={{background: "#838383"}}>
                    <MDBCardText className="text-white">
                    Ruby Subscription + Iron Tool
                    </MDBCardText>
                    </div>
                    
                </MDBCardBody>
                <MDBCardFooter className="d-flex justify-content-end align-items-center" style={{background: "#FADDBF"}}>
                <span className="fw-bold" style={{fontSize: "1.5rem"}}>
                $ 30
                </span>
                <MDBBtn className="p-0 mx-2" onClick={() =>handleBundles(1,"Iron Pack","Ruby Subscription + Iron Tool","ruby")}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn>
                </MDBCardFooter>
                </MDBCard>
                </MDBCol>

                <MDBCol>
                <MDBCard alignment="center" >
                <MDBCardHeader className="fw-bold" style={{background: "#FADDBF"}}>STEEL PACK</MDBCardHeader>
                <MDBCardBody className="bundlesbdy">
                    <MDBCardImage src={steelpak} />

                    <div className="mt-3" style={{background: "#838383"}}>
                    <MDBCardText className="text-white">
                    Emerald Subscription + Steel Tool
                    </MDBCardText>
                    </div>
                    
                </MDBCardBody>
                <MDBCardFooter className="d-flex justify-content-end align-items-center" style={{background: "#FADDBF"}}>
                <span className="fw-bold" style={{fontSize: "1.5rem"}}>
                $ 65
                </span>
                <MDBBtn className="p-0 mx-2" onClick={() =>handleBundles(1,"Steel Pack","Emerald Subscription + Steel Tool","emerald")}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn>
                </MDBCardFooter>
                </MDBCard>
                </MDBCol>

                <MDBCol>
                <MDBCard alignment="center" >
                <MDBCardHeader className="fw-bold" style={{background: "#FADDBF"}}>MITHRIL PACK</MDBCardHeader>
                <MDBCardBody className="bundlesbdy">
                    <MDBCardImage src={mithrilpak} />

                    <div className="mt-3" style={{background: "#838383"}}>
                    <MDBCardText className="text-white">
                    Diamond Subscription + Mithril Tool
                    </MDBCardText>
                    </div>
                    
                </MDBCardBody>
                <MDBCardFooter className="d-flex justify-content-end align-items-center" style={{background: "#FADDBF"}}>
                <span className="fw-bold" style={{fontSize: "1.5rem"}}>
                $ 120
                </span>
                <MDBBtn className="p-0 mx-2" onClick={() =>handleBundles(1,"Mithril Pack","Diamond Subscription + Mithril Tool","diamond")}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn>
                </MDBCardFooter>
                </MDBCard>
                </MDBCol>


                <MDBCol>
                <MDBCard alignment="center" >
                <MDBCardHeader className="fw-bold" style={{background: "#FADDBF"}}>DIAMOND PACK</MDBCardHeader>
                <MDBCardBody className="bundlesbdy">
                    <MDBCardImage src={adamantpak} />

                    <div className="mt-3" style={{background: "#838383"}}>
                    <MDBCardText className="text-white">
                    Diamond Subscription + Adamant Tool + 5 hours clock
                    </MDBCardText>
                    </div>
                    
                </MDBCardBody>
                <MDBCardFooter className="d-flex justify-content-end align-items-center" style={{background: "#FADDBF"}}>
                <span className="fw-bold" style={{fontSize: "1.5rem"}}>
                $ 180
                </span>
                <MDBBtn className="p-0 mx-2" onClick={() =>handleBundles(1,"Adamant Pack","Diamond Subscription + Adamant Tool + 5 hours clock", "diamond")}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn>
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
    )
}

export default TopUp;