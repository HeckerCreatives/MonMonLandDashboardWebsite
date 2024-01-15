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
    MDBCardImage,
    MDBRipple,
    MDBListGroup,
    MDBListGroupItem,} from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import TopUpLogin from "./topuplogin";
import { useNavigate } from "react-router-dom";
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
import { isgamelogin } from '../../../component/utils'
const TopUp = () =>{
    const [basicModal, setBasicModal] = useState(false);
    const [visibility, setVisibility] = useState(false)
    const navigate = useNavigate();
    // const [toggleTwoModal, setToggleTwoModal] = useState(false);
    // const [hasquery, setHasQuery] = useState(false)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [usdrate, setUsdrate] = useState(0)
    const [amount, setAmount] = useState(0);
    const [selectedtopup, setSelectedTopUp] = useState("");
    const [bundle, setBundle] = useState("");
    const [bundledes, setBundleDes] = useState("");
    const [bundlesubs, setBundleSubs] = useState("");
    const auth = JSON.parse(localStorage.getItem("user"))
    const toggleShow = () => setBasicModal(!basicModal);
    // const toggleShow1 = () => setToggleTwoModal(!toggleTwoModal);

    const handleLogout = () => {
      
        Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: 'See ya Later',
            showConfirmButton: false,
            timer: 5100
        })
  
        setVisibility(false);
        setTimeout(() => {
          localStorage.removeItem("user");
        //   localStorage.removeItem("my-secret");
          window.location.href = "/";
        }, 5100);
      };

      useEffect(() => {
        isgamelogin()
        .then(data => {
            setUsername(data.name)
            setEmail(data.email)

            if(!data.name && !data.email){
                Swal.fire({
                    icon: "warning",
                    title: "Please Login First",
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then(() => {
                    window.location.href = "/gamelogin"
                })
            } 
        })
        .catch(err => {
            Swal.fire({
                icon: "warning",
                title: "Please Login First",
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then(() => {
                window.location.href = "/gamelogin"
            })
        })
      },[])

    useEffect(() => {
        const queryParams = new URL(window.location.href);
        const value = new URLSearchParams(queryParams.search);
        const decrypt = value.get('value');

        const final = atob(decrypt)
        const decrypted = new URLSearchParams(final);
        const username = decrypted.get('username');
        const email = decrypted.get('email');
        setEmail(email)
        setUsername(username)
       
    },[])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}usdrate/find`,{
            credentials: 'include',
        })
        .then(result => result.json())
        .then(data => {
            setUsdrate(data.data)
        })
    },[])

    const handleFunds = (e) => {
        const amawnt = e * usdrate
        setAmount(amawnt)
        setSelectedTopUp("funds")
        toggleShow()
        
    }

    const handleBundles = (e,bundle,des,subs) => {
        const amawnt = e * usdrate
        setAmount(amawnt)
        setSelectedTopUp("bundles")
        setBundle(bundle)
        setBundleDes(des)
        setBundleSubs(subs)
        toggleShow()
    }

    const items = [
        {
          name: "My Profile",
          icon: "user",
          path: `/Dashboard/User/home`,
        },
        // {
        //     name: "Change Password",
        //     icon: "user",
        //   //   path: `${auth?.roleId.name}/profile`,
        // },
      ];

    return(
        <>
            <div className="kontainer">

            <MDBBtn className="bg-transparent p-0 mt-2" onClick={() => window.location.href="/gamelogin"}>
                <img className="" src={backbtn} alt="" />
            </MDBBtn>
            
            </div>
            <div className="" style={{backgroundColor: "#432808"}}>
                <div className="d-flex justify-content-end align-items-center">
                <div className="dropdown">
      
      <MDBCol className="dropdown text d-lg-flex justify-content-end align-items-center panel-zoom" onClick={() => setVisibility(!visibility)}>
          <MDBIcon fas icon="user-circle"/>
          <div className="d-lg-block d-none">
          &nbsp;{auth ? auth.Username : username}
          </div>
          {/* &nbsp;<MDBIcon fas icon="angle-down" size="lg" /> */}
      </MDBCol>
          <div className={`custom-dropdown-content ${visibility ? 'd-block' : 'd-none'}`}>
              <MDBListGroup>
              {items.map((item, index) => (
                  <MDBRipple
                  key={`profile-item-${index}`}
                  rippleTag="span"
                  // rippleColor={theme.border}
                  >
                  <MDBListGroupItem
                      onClick={() => {
                      setVisibility(!visibility);
                      navigate(item.path);
                      }}
                      className={`bg-transparent  border-0 cursor-pointer`}
                  >
                      <MDBIcon icon={item.icon} />
                      &nbsp;
                      {item.name}
                  </MDBListGroupItem>
                  </MDBRipple>
              ))}

              <MDBRipple rippleTag="span">
                  <MDBListGroupItem
                  onClick={handleLogout}
                  className={`bg-transparent text-danger border-0 cursor-pointer`}
                  >
                  <MDBIcon icon="sign-out-alt" />
                  &nbsp;Logout
                  </MDBListGroupItem>
              </MDBRipple>
              </MDBListGroup>
          </div>
      </div> 
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
                <MDBTypography tag="h1">$ 10</MDBTypography>
                {/* <MDBBtn className="p-0" onClick={()=>handleFunds(20)}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn> */}
                <img className="zoom-playnow" src={addfundsbtn} alt="" onClick={()=>handleFunds(10)}/>
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
                $ 70
                </span>
                {/* <MDBBtn className="p-0 mx-2" onClick={() =>handleBundles(65,"Steel Pack","Emerald Subscription + Steel Tool","emerald")}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn> */}
                <img className="zoom-playnow mx-2" src={addfundsbtn} alt="" onClick={() =>handleBundles(70,"Steel Pack","Emerald Subscription + Steel Tool","steelpack")}/>
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
                $ 130
                </span>
                {/* <MDBBtn className="p-0 mx-2" onClick={() =>handleBundles(120,"Mithril Pack","Diamond Subscription + Mithril Tool","diamond")}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn> */}
                <img className="zoom-playnow mx-2" src={addfundsbtn} alt="" onClick={() =>handleBundles(130,"Mithril Pack","Diamond Subscription + Mithril Tool","mithrilpack")}/>
                </MDBCardFooter>
                </MDBCard>
                </MDBCol>


                <MDBCol className="my-2">
                <MDBCard alignment="center" >
                <MDBCardHeader className="fw-bold" style={{background: "#FADDBF"}}>DIAMOND PACK</MDBCardHeader>
                <MDBCardBody className="bundlesbdy p-0">
                    <MDBCardImage src={adamantpak} className="pt-4"/>

                    

                    <MDBCardText className="p-4 text-white" style={{background: "#838383", width: "100%", height: "92px"}}>
                    Diamond Subscription + Adamant Tool + 6 hours clock
                    </MDBCardText>
                    
                </MDBCardBody>
                <MDBCardFooter className="d-flex justify-content-end align-items-center" style={{background: "#FADDBF"}}>
                <span className="fw-bold" style={{fontSize: "1.5rem"}}>
                $ 190
                </span>
                {/* <MDBBtn className="p-0 mx-2" onClick={() =>handleBundles(180,"Adamant Pack","Diamond Subscription + Adamant Tool + 5 hours clock", "diamond")}>
                <img src={addfundsbtn} alt=""/>
                </MDBBtn> */}
                <img className="zoom-playnow mx-2" src={addfundsbtn} alt="" onClick={() =>handleBundles(190,"Adamant Pack","Diamond Subscription + Adamant Tool + 5 hours clock", "adamantpack")}/>
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