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
            <MDBCardBody className="d-flex align-items-center justify-content-between">
                <MDBTypography tag="h1">$ 20</MDBTypography>
                <MDBBtn className="p-0" onClick={()=>handleFunds(1)}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>
            
            <MDBCol className="p-5">
            <MDBCard alignment="center" className="fundbdy">
            <MDBCardBody className="d-flex align-items-center justify-content-between">
                <MDBTypography tag="h1">$ 50</MDBTypography>
                <MDBBtn className="p-0" onClick={()=>handleFunds(1)}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>

            <MDBCol className="p-5">
            <MDBCard alignment="center" className="fundbdy">
            <MDBCardBody className="d-flex align-items-center justify-content-between">
                <MDBTypography tag="h1">$ 100</MDBTypography>
                <MDBBtn className="p-0" onClick={()=>handleFunds(1)}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>

            <MDBCol className="p-5">
            <MDBCard alignment="center" className="fundbdy">
            <MDBCardBody className="d-flex align-items-center justify-content-between">
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
                <MDBCard alignment="center" className="bundlesbdy">
                <MDBCardHeader className="fw-bold" style={{background: "#FADDBF"}}>IRON PACK</MDBCardHeader>
                <MDBCardBody>
                    <MDBCardImage src={ironpak} />
                    <MDBCardText>
                    Ruby Subscription + Iron Tool
                    </MDBCardText>
                    <MDBCardText>
                    $ 30
                    </MDBCardText>
                    
                </MDBCardBody>
                <MDBCardFooter style={{background: "#FADDBF"}}>
                <MDBBtn onClick={() =>handleBundles(1,"Iron Pack","Ruby Subscription + Iron Tool","ruby")}>Add Funds</MDBBtn>
                </MDBCardFooter>
                </MDBCard>
                </MDBCol>
                <MDBCol>
                <MDBCard alignment="center">
                <MDBCardBody>
                    <MDBCardTitle>IRON PACK</MDBCardTitle>
                    <MDBCardText>
                    Ruby Subscription + Iron Tool
                    </MDBCardText>
                    <MDBCardText>
                    $ 30
                    </MDBCardText>
                    <MDBBtn onClick={() =>handleBundles(1,"Iron Pack","Ruby Subscription + Iron Tool","ruby")}>Add Funds</MDBBtn>
                </MDBCardBody>
                </MDBCard>
                </MDBCol>
                <MDBCol>
                <MDBCard alignment="center">
                <MDBCardBody>
                    <MDBCardTitle>IRON PACK</MDBCardTitle>
                    <MDBCardText>
                    Ruby Subscription + Iron Tool
                    </MDBCardText>
                    <MDBCardText>
                    $ 30
                    </MDBCardText>
                    <MDBBtn onClick={() =>handleBundles(1,"Iron Pack","Ruby Subscription + Iron Tool","ruby")}>Add Funds</MDBBtn>
                </MDBCardBody>
                </MDBCard>
                </MDBCol>
                <MDBCol>
                <MDBCard alignment="center">
                <MDBCardBody>
                    <MDBCardTitle>IRON PACK</MDBCardTitle>
                    <MDBCardText>
                    Ruby Subscription + Iron Tool
                    </MDBCardText>
                    <MDBCardText>
                    $ 30
                    </MDBCardText>
                    <MDBBtn onClick={() =>handleBundles(1,"Iron Pack","Ruby Subscription + Iron Tool","ruby")}>Add Funds</MDBBtn>
                </MDBCardBody>
                </MDBCard>
                </MDBCol>
            </MDBRow>
            
            </MDBCardBody>
        </MDBCard>

        </MDBRow>

        <MDBRow>
        <div>
        <MDBTypography tag="h1" className="text-center fw-bold">BUNDLES</MDBTypography>
        </div>
        
            <MDBCol>
            <MDBCard alignment="center">
            <MDBCardBody>
                <MDBCardTitle>IRON PACK</MDBCardTitle>
                <MDBCardText>
                Ruby Subscription + Iron Tool
                </MDBCardText>
                <MDBCardText>
                $ 30
                </MDBCardText>
                <MDBBtn onClick={() =>handleBundles(1,"Iron Pack","Ruby Subscription + Iron Tool","ruby")}>Add Funds</MDBBtn>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>
            <MDBCol>
            <MDBCard alignment="center">
            <MDBCardBody>
                <MDBCardTitle>STEEL PACK</MDBCardTitle>
                <MDBCardText>
                Emerald Subscription + Steel Tool
                </MDBCardText>
                <MDBCardText>
                $ 65
                </MDBCardText>
                <MDBBtn onClick={() =>handleBundles(1,"Steel Pack","Emerald Subscription + Steel Tool","emerald")}>Add Funds</MDBBtn>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>
            <MDBCol>
            <MDBCard alignment="center">
            <MDBCardBody>
                <MDBCardTitle>MITHRIL PACK</MDBCardTitle>
                <MDBCardText>
                Diamond Subscription + Mithril Tool
                </MDBCardText>
                <MDBCardText>
                $ 120
                </MDBCardText>
                <MDBBtn onClick={() =>handleBundles(1,"Mithril Pack","Diamond Subscription + Mithril Tool","diamond")}>Add Funds</MDBBtn>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>
            <MDBCol>
            <MDBCard alignment="center">
            <MDBCardBody>
                <MDBCardTitle>ADAMANT PACK</MDBCardTitle>
                <MDBCardText>
                Diamond Subscription + Adamant Tool + 5 hours clock
                </MDBCardText>
                <MDBCardText>
                $ 180
                </MDBCardText>
                <MDBBtn onClick={() =>handleBundles(1,"Adamant Pack","Diamond Subscription + Adamant Tool + 5 hours clock", "diamond")}>Add Funds</MDBBtn>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>
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