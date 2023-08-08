import React, { useState } from "react";
import smalllogo from "../assets/header/small logo for navi.png"
import playnow from "../assets/header/play now btn.png"
import navholder from "../assets/header/navigation holder.png"
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

const Navbar = ({ links }) => {
  const [showNav, setShowNav] = useState(false);
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const [currentLink,setCurrentLink] = useState("");

  const handleActive = str => {
    setActive(str);
    setCurrentLink(str);
  };


  return (
    <MDBNavbar
      expand="lg"
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
              window.innerWidth > 768
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
                  className={`${currentLink === link.path && "activenavlink"}`}                  
                  onClick={() => {
                    handleActive(link.path);
                    window.innerWidth <= 900 && setShowNav(!showNav);                    
                  }}
                >
                  <span className={`fw-bold p-4 mb-2 navbar-link ${currentLink === link.path && "activenavlink"}`}>{link.name}</span>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ))}
            <MDBNavbarItem className="ms-lg-auto text-center px-4">
                  <MDBNavbarLink>
                  <img src={playnow} id="joinnow" alt="" className="zoom-playnow mb-2"></img>
                  </MDBNavbarLink>
            </MDBNavbarItem>
            
          </MDBNavbarNav>
        </MDBCollapse> 
              
      </MDBContainer>      
    </MDBNavbar>
    
  );
};

export default Navbar;
