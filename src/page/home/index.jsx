import React from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import Footer from "./footer"
import Games from "./games"
import Header from "./header"
import Roadmap from "./roadmap"
import Subscription from "./subscription"
import News from "./news"
import Navbar from "../../component"
import bgimage from "../../assets/background.png"
import "./index.css"

const Initial = () => {
    const Links = [
        {
            name: "HOME",
            path: "#home",
        },
        {
            name: "SUBSCRIPTION",
            path: "#subscription",
        },
        {
            name: "GAMES",
            path: "#games",
        },
        {
            name: "LATEST NEWS",
            path: "#home",
        },
        {
            name: "ROADMAP",
            path: "#roadmap",
        },
        {
            name: "SOCIALS",
            path: "#footer",
        },
    ];
    return (
        <MDBContainer fluid className="bg-image px-0">
            {/* <img src={bgimage}></img> */}
            <Navbar links={Links}/>
            <Header />
            <Subscription/>
            <Games/>
            {/* <MDBContainer>
            <Header/>
            
            <News/>
            <Roadmap/>
            <Footer/>
            
            
            </MDBContainer>             */}
        </MDBContainer>
    )
}

export default Initial;