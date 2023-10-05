import { MDBContainer, MDBTypography,MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn, 
    MDBRow,
    MDBCol} from "mdb-react-ui-kit";
import React, {useState} from "react";
import TopUpLogin from "./topuplogin";
const TopUp = () =>{
    const [basicModal, setBasicModal] = useState(false);
    const [amount, setAmount] = useState(0);
    const [selectedtopup, setSelectedTopUp] = useState("");
    const [bundle, setBundle] = useState("");
    const [bundledes, setBundleDes] = useState("");
    const [bundlesubs, setBundleSubs] = useState("");
    const toggleShow = () => setBasicModal(!basicModal);

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
        <MDBContainer fluid>
        <MDBRow>
        <MDBTypography tag="h1" className="text-center fw-bold">SELECT FUNDS</MDBTypography>
            <MDBCol>
            <MDBCard alignment="center">
            <MDBCardBody>
                <MDBCardTitle>$ 20</MDBCardTitle>
                {/* <MDBCardText>
                Some quick example text to build on the card title and make up the bulk of the card's content.
                </MDBCardText> */}
                <MDBBtn onClick={()=>handleFunds(20)}>Add Funds</MDBBtn>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>
            <MDBCol>
            <MDBCard alignment="center">
            <MDBCardBody>
                <MDBCardTitle>$ 50</MDBCardTitle>
                {/* <MDBCardText>
                Some quick example text to build on the card title and make up the bulk of the card's content.
                </MDBCardText> */}
                <MDBBtn onClick={()=>handleFunds(50)}>Add Funds</MDBBtn>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>
            <MDBCol>
            <MDBCard alignment="center">
            <MDBCardBody>
                <MDBCardTitle>$ 100</MDBCardTitle>
                {/* <MDBCardText>
                Some quick example text to build on the card title and make up the bulk of the card's content.
                </MDBCardText> */}
                <MDBBtn onClick={()=>handleFunds(100)}>Add Funds</MDBBtn>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>
            <MDBCol>
            <MDBCard alignment="center">
            <MDBCardBody>
                <MDBCardTitle>$ 200</MDBCardTitle>
                {/* <MDBCardText>
                Some quick example text to build on the card title and make up the bulk of the card's content.
                </MDBCardText> */}
                <MDBBtn onClick={()=>handleFunds(200)}>Add Funds</MDBBtn>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>
        </MDBRow>
        <hr/>
        <MDBRow>
        <MDBTypography tag="h1" className="text-center fw-bold">BUNDLES</MDBTypography>
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
                <MDBBtn onClick={() =>handleBundles(30,"Iron Pack","Ruby Subscription + Iron Tool","ruby")}>Add Funds</MDBBtn>
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
                <MDBBtn onClick={() =>handleBundles(65,"Steel Pack","Emerald Subscription + Steel Tool","emerald")}>Add Funds</MDBBtn>
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
                <MDBBtn onClick={() =>handleBundles(120,"Mithril Pack","Diamond Subscription + Mithril Tool","diamond")}>Add Funds</MDBBtn>
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
                <MDBBtn onClick={() =>handleBundles(180,"Adamant Pack","Diamond Subscription + Adamant Tool + 5 hours clock", "diamond")}>Add Funds</MDBBtn>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>
        </MDBRow>
        <TopUpLogin 
        bundle={bundle}
        bundledes={bundledes}
        bundlesubs={bundlesubs}
        selectedtopup={selectedtopup} 
        amount={amount} 
        basicModal={basicModal} 
        setBasicModal={setBasicModal}/>
        </MDBContainer>
    )
}

export default TopUp;