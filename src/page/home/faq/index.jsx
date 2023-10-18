import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import React, {useState} from "react";
import "./index.css"
import Sidenav from "./sidenav/sidenav";
const FAQ = () => {
    const [didToggle, setDidToggle] = useState(
        window.innerWidth > 768 ? false : true
    );

    const link = [
        {
            name: "General Questions",
            path: "",
            icon: "book",
            children: [
              {
                name: "What is MML",
                path: "/faq",
              },
              {
                name: "What is Monster Coin and Monster Gem?",
                path: "/faq",
              },
              {
                name: "How do I find information and support for Monmonland games?",
                path: "/faq",
              },
              {
                name: "In what platforms is Monmonland available?",
                path: "/faq",
              },
            ],
        },
        {
            name: "Mode Of Payment",
            path: "",
            icon: "book",
            children: [
              {
                name: "How to use an automated payment method?",
                path: "/faq",
              },
              {
                name: "How to use a manual payment method",
                path: "/faq",
              },
            ],
        },
        {
            name: "Games",
            path: "",
            icon: "book",
            children: [
              {
                name: "How to earn in Monmonland?",
                path: "/faq",
              },
              {
                name: "How to create an account?",
                path: "/faq",
              },
              {
                name: "How to Subscribe?",
                path: "/faq",
              },
              {
                name: "How to cash out? ",
                path: "/faq",
              },
              {
                name: "Is it okay if I have no Binance but have other wallets?",
                path: "/faq",
              },
            ],
        },
        {
            name: "Unilevel",
            path: "",
            icon: "book",
            children: [
              {
                name: "What is Unilevel?",
                path: "/faq",
              },
            ],
        },
    ]

return(
    <MDBContainer fluid>
    <Sidenav 
        links={link}
        didToggle={didToggle}
        setDidToggle={setDidToggle}
    />
    <main
        className="main-container"
        style={{
          paddingLeft:
            window.innerWidth > 768
              ? didToggle 
                ? window.innerWidth <= 768
                  ? "0rem"
                  : "4.5rem"
                : "17.5rem"
              : "0rem",
        }}
        >

        </main> 
    </MDBContainer>
)
}

export default FAQ;