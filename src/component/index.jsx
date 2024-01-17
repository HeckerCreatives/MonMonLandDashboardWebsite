import React, { useState, useEffect, useRef } from "react";
import smalllogo from "../assets/header/small logo for navi.png"
import playnow from "../assets/header/Register BUTTON.png"
import login from "../assets/header/login BUTTON1.png"
import migrate from "../assets/header/migrate account BUTTON.png"
import navholder from "../assets/header/navigation holder.png"
import { useActiveLinkObserver } from "./utils";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import "./index.css";
import { useNavigate } from "react-router-dom";
import AddFundsModal from "../page/home/addfunds";
import MigrateLogin from "./migration/phase1/migratelogin";
const Navbar = ({ links }) => {
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  const [basicModal1, setBasicModal1] = useState(false);
  const toggleShow1 = () => setBasicModal1(!basicModal1);
  const [showNav, setShowNav] = useState(false);
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const [currentLink,setCurrentLink] = useState("");

  const newsLink = useActiveLinkObserver("home#news");
  const gameLink = useActiveLinkObserver("games");
  const subscriptionlink = useActiveLinkObserver("subscription");
  const roadmaplink = useActiveLinkObserver("roadmap");
  // const [tapaps, setTapap] = useState("")
  const toggleShowCalled = useRef(false);
  const [url, setURL] = useState("")
  const handleActive = str => {
    setActive(str);
    setCurrentLink(str);
  };

  

  useEffect(() => {
    const url = new URL(window.location.href);
    setURL(url)
    // const value = new URLSearchParams(url.search);
    // const tapap = value.get('topup');

    // if (tapap && !toggleShowCalled.current) {
    //   setBasicModal(true);
    //   toggleShowCalled.current = true;
    // }
    // return () => {
    //   setBasicModal(false)
    // }
  }, []);

  return (
    <>
    <MDBNavbar
      expand="xl"
      className="custom-landing-navbar py-0 m-5 fixed-top"      
    > 
    <MDBContainer fluid className="d-sm-flex justify-sm-content-around px-0 px-md-0">
        
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="ms-3 py-4 bars"
          onClick={() => setShowNav(!showNav)}
        >
        {/* <MDBIcon fas icon="bars" /> */}
        <MDBIcon icon="bars" fas/>
        </MDBNavbarToggler>   
        
        <img src={smalllogo} id="navlogo" alt="" className="mx-4 mb-1 pl-5"></img>
         
        <MDBCollapse
          navbar
          show={showNav}
          style={{ backgroundColor: "#AD6818" }}
        >
         
          <MDBNavbarNav 
          
            className={`${
              window.innerWidth > 1070
                ? "d-flex align-items-center justify-content-start"
                : "text-center"
            }`}
          >      
              
            {links.map((link, index) => (
              <MDBNavbarItem
                key={`links-${index}`}
                className={``}
              >
                <MDBNavbarLink
                  
                  aria-current="page"
                  href = {url.pathname === "/media" ? `${url.origin}${link.path}` : link.path}
                  
                  className={`${currentLink === link.path && "activenavlink" && newsLink.isIntersecting ? 'activenavlink' : ''}`}
                  disabled={link.name === "MEDIA" ? true : false}                  
                  onClick={() => {
                    handleActive(link.path);
                    window.innerWidth <= 900 && setShowNav(!showNav);                    
                  }}
                >
                  <span 
                  className={`fw-bold p-4 mb-2 navbar-link ${currentLink === link.path && "activenavlink"}`} 
                  style={link.name === "MEDIA" ? { color: "gray"} : { color: "white"}}
                  >{link.name}</span>
                </MDBNavbarLink>
                
              </MDBNavbarItem>
            ))}
            <MDBNavbarItem className="ms-xl-auto text-center" >
                  <MDBNavbarLink>
                  <div >
                  <img src={login} id="joinnow" alt="" className="zoom-playnow mb-2"  onClick={() => {
                    window.location.href = `/gamelogin`
                  }} ></img>
                  {/* <MDBBtn onClick={() => {
                    window.location.href = `/gamelogin`
                  }} >Login</MDBBtn> */}
                  </div>
                  
            </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className=" text-center px-2" >
                  <MDBNavbarLink>
                  <div >
                  <img src={playnow} id="joinnow" alt="" className=" zoom-playnow mb-2"  
                  onClick={() => {
                    // window.location.href = `${window.location.origin}/register?id=${process.env.REACT_APP_MONMONID}`;
                    toggleShow1()
                  }} ></img>
                  {/* <MDBBtn  onClick={() => {
                    window.location.href = `${window.location.origin}/register?id=${process.env.REACT_APP_MONMONID}`;
                  }} >Register</MDBBtn> */}
                  </div>
                  
                  </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className=" text-center pe-3" >
                  <MDBNavbarLink>
                  <div >
                  <img src={migrate} id="joinnow" alt="" className=" zoom-playnow mb-2"  onClick={() => {
                    toggleShow()
                  }} ></img>
                  {/* <MDBBtn  onClick={() => {
                    window.location.href = `${window.location.origin}/register?id=${process.env.REACT_APP_MONMONID}`;
                  }} >Register</MDBBtn> */}
                  </div>
                  
                  </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse> 
              
      </MDBContainer>      
    </MDBNavbar>
    <MigrateLogin basicModal={basicModal} setBasicModal={setBasicModal}/>
    <MDBModal show={basicModal1}  tabIndex='-1'>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader className="justify-content-center">
              <MDBModalTitle>Announcement</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody className="text-center">
            <MDBTypography tag={'h2'}>The registration of new accounts will commence from January 20, 2024.</MDBTypography>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow1}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default Navbar;
