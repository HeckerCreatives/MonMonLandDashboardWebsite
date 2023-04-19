import React, { useState } from "react";
import smalllogo from "../assets/header/small logo for navi.png"
import joinnow from "../assets/header/join now btn.png"
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
} from "mdb-react-ui-kit";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ links }) => {
  const [showNav, setShowNav] = useState(false);
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  const handleActive = str => {
    setActive(str);
  };

  return (
    <MDBNavbar
      expand="md"
      dark
      className="custom-landing-navbar py-0 m-5 mx-auto fixed-top"      
    > 
    <img src={navholder} id="navholder" alt=""></img>     
    <MDBContainer fluid className="nav px-0 px-md-0">

        <MDBNavbarBrand className="px-5 mb-3">
        
        <img src={smalllogo} id="navlogo"></img>
                
        </MDBNavbarBrand>

        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="me-3 py-4"
          onClick={() => setShowNav(!showNav)}
        >
        <MDBIcon fas icon="bars" />
        </MDBNavbarToggler>
        
        <MDBCollapse
          navbar
          show={showNav}
        >
          <MDBNavbarNav            
            className={`${
              window.innerWidth > 960
                ? "d-flex align-items-center justify-content-start"
                : "text-center"
            }`}
          >
            {links.map((link, index) => (
              <MDBNavbarItem
                key={`links-${index}`}
                className={`custom-border`}
              >
                <MDBNavbarLink
                  active
                  aria-current="page"
                  href={link.path}
                  className={`custom-link fw-bold p-4 mb-2`}
                  onClick={() => {
                    handleActive(link.path);
                    window.innerWidth <= 900 && setShowNav(!showNav);
                  }}
                >
                  <span>{link.name}</span>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ))}
            <MDBNavbarItem className="p-5 mb-2 ms-auto">            
              <img src={joinnow} id="joinnow"></img>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    
  );
};

export default Navbar;
