import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import React, {useState} from "react";
import "./index.css"
import Sidenav from "./sidenav/sidenav";
import { Outlet } from "react-router-dom";
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
                path: "/faq/generalquestion/whatismml",
              },
              {
                name: "What is Monster Coin and Monster Gem?",
                path: "/faq/generalquestion/whatismcmg",
              },
              {
                name: "How do I find information and support for Monmonland games?",
                path: "/faq/generalquestion/infoandsupport",
              },
              {
                name: "In what platforms is Monmonland available?",
                path: "/faq/generalquestion/mmlplatforms",
              },
            ],
        },
        {
            name: "Mode Of Payment",
            path: "",
            icon: "cash-register",
            children: [
              {
                name: "How to use an automated payment method?",
                path: "/faq/mop/autopayment",
              },
              {
                name: "How to use a manual payment method",
                path: "/faq/mop/manualpayment",
              },
            ],
        },
        {
            name: "Games",
            path: "",
            icon: "gamepad",
            children: [
              {
                name: "How to earn in Monmonland?",
                path: "/faq/game/howtoearn",
              },
              {
                name: "How to create an account?",
                path: "/faq/game/howtocreateacc",
              },
              {
                name: "How to Subscribe?",
                path: "/faq/game/howtosubscribe",
              },
              {
                name: "How to cash out? ",
                path: "/faq/game/howtocashout",
              },
              {
                name: "Is it okay if I have no Binance but have other wallets?",
                path: "/faq/game/binancewallet",
              },
            ],
        },
        {
            name: "Unilevel",
            path: "",
            icon: "users",
            children: [
              {
                name: "What is Unilevel?",
                path: "/faq/unilevel/whatisunilevel",
              },
            ],
        },
        {
          name: "Back to Home",
          path: "/",
          icon: "chevron-circle-left",
          children: [
            
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
                  ? "4.5rem"
                  : "4.5rem"
                : "18rem"
              : "4.5rem",
        }}
        >

        <MDBContainer fluid className="px-0">
        <Outlet />        
        </MDBContainer>

        </main> 
    </MDBContainer>
)
}

export default FAQ;