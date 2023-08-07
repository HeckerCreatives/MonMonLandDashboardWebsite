import React from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import Footer from "./footer"
import Games from "./games"
import Header from "./header"
import Roadmap from "./roadmap"
import Subscription from "./subscription"
import News from "./news"
import Navbar from "../../component"

import "./index.css"

const Initial = () => {
    const Links = [
        {
            name: "SUBSCRIPTION",
            path: "#subscription",
        },
        {
            name: "GAMES",
            path: "#games",
        },
        {
            name: "NEWS",
            path: "#news",
        },
        {
            name: "ROADMAP",
            path: "#roadmap",
        },
    ];
    return (
        <div>
        <div className="bg-image">
        <MDBContainer fluid className="px-0" >
        <Navbar links={Links}/> 
        <Header />       
        </MDBContainer>
        </div>        
        <div>
                        
            <Subscription/>
            <Games/>
            <News/>
            <Roadmap/>
            <Footer links={Links}/>
        </div>
        </div>        
        
    )
}

export default Initial;