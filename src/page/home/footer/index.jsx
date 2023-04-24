import React, {useState} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBNavbarItem,MDBNavbarLink } from "mdb-react-ui-kit";
import "./index.css"
import logowhite from "../../../assets/footer/logo white.png"
import discord from "../../../assets/footer/discord.png"
import fb from "../../../assets/footer/fb.png"
import instagram from "../../../assets/footer/instagram.png"
import telegram from "../../../assets/footer/telegram.png"
import twitter from "../../../assets/footer/twitter.png"

const Footer = ({links}) => {
    const [active, setActive] = useState("");
    const handleActive = str => {
        setActive(str);
      };
    return(
        <MDBContainer fluid className="footerbg d-flex justify-content-center align-items-end" id="footer">

        <MDBContainer fluid className="d-flex flex-column align-items-center justify-content-center">

        <img src={logowhite} alt=""/>
        
        <MDBRow>
            <MDBCol className="d-flex flex-row align-items-center justify-content-center mt-5 p-0">

            {links.map((link, index) => (
            <MDBNavbarItem key={`links-${index}`} style={{listStyleType:'none'}}>
            <MDBNavbarLink
                active
                aria-current="page"
                href={link.path}
                className={`text-white fw-bold`}
                onClick={() => {
                handleActive(link.path);
                }}
            >
                <span>{link.name}</span>
            </MDBNavbarLink>
            </MDBNavbarItem>
            ))}

            </MDBCol>
        </MDBRow>
        
        <MDBRow>
            <MDBCol className="mt-4 mb-5">
            <img src={fb} className="socials"/>
            <img src={discord} className="socials"/>
            <img src={instagram} className="socials"/>
            <img src={twitter} className="socials"/>
            <img src={telegram} className="socials"/>
            </MDBCol>
        </MDBRow>
        
        
        </MDBContainer>

        </MDBContainer>
    )
}

export default Footer;