import React, { useState, useEffect } from "react";
import smalllogo from "../assets/header/small logo for navi.png"
import playnow from "../assets/header/add funds BUTTON.png"
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
} from "mdb-react-ui-kit";
import "./index.css";
import { useNavigate } from "react-router-dom";
import AddFundsModal from "../page/home/addfunds";
const Navbar = ({ links }) => {
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  const [showNav, setShowNav] = useState(false);
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const [currentLink,setCurrentLink] = useState("");

  const newsLink = useActiveLinkObserver("home#news");
  const gameLink = useActiveLinkObserver("games");
  const subscriptionlink = useActiveLinkObserver("subscription");
  const roadmaplink = useActiveLinkObserver("roadmap");

  const handleActive = str => {
    setActive(str);
    setCurrentLink(str);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const value = new URLSearchParams(url.search);
    const tapap = value.get('topup');
    
    if(tapap === "1"){
      toggleShow()
    }

  },[])

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
                  href={link.path}
                  className={`${currentLink === link.path && "activenavlink" && newsLink.isIntersecting ? 'activenavlink' : ''}`}
                  disabled={link.name === "MEDIA" ? true : false}                  
                  onClick={() => {
                    handleActive(link.path);
                    window.innerWidth <= 900 && setShowNav(!showNav);                    
                  }}
                >
                  <span className={`fw-bold p-4 mb-2 navbar-link ${currentLink === link.path && "activenavlink"}`} style={link.name === "MEDIA" ? { color: "gray"} : { color: "white"}}>{link.name}</span>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ))}
            <MDBNavbarItem className="ms-lg-auto text-center px-4">
                  <MDBNavbarLink>
                  <img src={playnow} id="joinnow" alt="" className="zoom-playnow mb-2" onClick={toggleShow}></img>
                  </MDBNavbarLink>
            </MDBNavbarItem>
            
          </MDBNavbarNav>
        </MDBCollapse> 
              
      </MDBContainer>      
    </MDBNavbar>
    <AddFundsModal basicModal={basicModal} setBasicModal={setBasicModal}/>
    </>
  );
};

export default Navbar;
