import React, { useState } from "react";
import smalllogo from "../assets/header/small logo for navi.png"
import joinnow from "../assets/header/join now btn.png"
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
      className="custom-landing-navbar position-fixed"
      style={{ height: "7rem" }}
    >      
    <MDBContainer fluid className="px-0 px-md-0">
        <MDBNavbarBrand>
          <img src={smalllogo}></img>
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
                ? "d-flex align-items-center justify-content-center"
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
                  className={`py-4 px-3 mx-5 custom-link fw-bold`}
                  onClick={() => {
                    handleActive(link.path);
                    window.innerWidth <= 900 && setShowNav(!showNav);
                  }}
                >
                  <span>{link.name}</span>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ))}
            <MDBNavbarItem>            
              <img src={joinnow}></img>              
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    
  );
};

export default Navbar;
