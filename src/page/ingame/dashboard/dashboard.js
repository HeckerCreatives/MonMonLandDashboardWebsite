import React, {useEffect, useState} from "react";
// import './dashboard.css'
import { Link, json, useNavigate } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon } from "mdb-react-ui-kit";
import Sidebarnav from "../../../component/sidebarnav";
import { Outlet } from "react-router-dom";
// import Navbar from "../../component/navbar";
// import { ThemeContext, themes } from '../../component/theme/themecontext';
// import ReferralButton from "../../component/dashboard/referral/referral";
import TopNavbar from "../../../component/topnavbar";

const UserDashboard = () => {
  // const [links, setLinks] = useState([]);
  const [didToggle, setDidToggle] = useState(
    window.innerWidth > 768 ? false : true
  ),
  [didToggle1, setDidToggle1] = useState(
    window.innerWidth > 768 ? false : true
  ),
  [didToggle2, setDidToggle2] = useState(
    window.innerWidth > 768 ? false : true
  ),
  [didToggle3, setDidToggle3] = useState(
    window.innerWidth > 768 ? false : true
  );
  const user = JSON.parse(localStorage.getItem("user"))
  // const [darkMode, setDarkMode] = React.useState(true);
  const navigate = useNavigate() 


  
    const  link = [
        {
          name: "DASHBOARD",
          path: "/dashboard/User/home",
          icon: "home",
          children: [],
        },
        {
          name: "Network",
          path: "/dashboard/User/network",
          icon: "bezier-curve",
          children: [],
        },
        {
          name: "Add Funds",
          path: "/topup",
          icon: "credit-card",
          children: [],
        },
        {
          name: "Leaderboard",
          path: "/dashboard/User/leaderboard",
          icon: "trophy",
          children: [],
        },
        {
          name: "Payout",
          path: "/dashboard/User/home",
          icon: "money-bill-alt",
          children: [],
        },
        {
          name: "News",
          path: "/dashboard/User/news",
          icon: "newspaper",
          children: [],
        },
        {
          name: "Profile",
          path: "/dashboard/User/profile",
          icon: "user-edit",
          children: [],
        },
        {
          name: "History",
          path: "",
          icon: "history",
          children: [
            {
              name: "Wallet",
              path: "/dashboard/User/wallethistory",
            },
            {
              name: "Total Income Wallet",
              path: "/dashboard/User/totalincomehistory",
            },
            {
              name: "Monster Coin Wallet",
              path: "/dashboard/User/monstercoinhistory",
            },
            {
              name: "Monster Gem Unilevel",
              path: "/dashboard/User/monstergemunilevel",
            },
            {
              name: "Monster Gem Grind",
              path: "/dashboard/User/monstergemgrind",
            },
          ],
        },
       ];
    
  

    return(
      <>
        {user ? 
        <MDBContainer fluid className="p-0">
        
        <Sidebarnav
          links={link}
          didToggle={didToggle}
          setDidToggle={setDidToggle}
          didToggle1={didToggle1}
          setDidToggle1={setDidToggle1}
          didToggle2={didToggle2}
          setDidToggle2={setDidToggle2}
          didToggle3={didToggle3}
          setDidToggle3={setDidToggle3}
        />
        
        <main
        className="main-container"
        style={{
          paddingLeft:
            window.innerWidth > 768
              ? didToggle && didToggle1  && didToggle2  && didToggle3
                ? window.innerWidth <= 768
                  ? "0rem"
                  : "4.5rem"
                : "17.5rem"
              : "0rem",
        }}
        >
        <TopNavbar auth={user} didToggle={didToggle}
          setDidToggle={setDidToggle}/>
        
        
        <MDBContainer fluid className="px-0">
        <Outlet />        
        </MDBContainer>

        </main>                    
        </MDBContainer>
        :
          navigate("/")
        }
        
        </>
    )
}

export default UserDashboard;