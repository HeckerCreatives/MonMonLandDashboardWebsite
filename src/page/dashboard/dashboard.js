import React, {useEffect, useState} from "react";
import './dashboard.css'
import { Link, json, useNavigate } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon } from "mdb-react-ui-kit";
import Sidebarnav from "../../component/sidebarnav";
import { Outlet } from "react-router-dom";
// import Navbar from "../../component/navbar";
import { ThemeContext, themes } from '../../component/theme/themecontext';
import ReferralButton from "../../component/dashboard/referral/referral";


const Dashboard = () => {
  // const [links, setLinks] = useState([]);
  const [didToggle, setDidToggle] = useState(
    window.innerWidth > 768 ? false : true
  );
  const auth = JSON.parse(localStorage.getItem("auth"))
  const [darkMode, setDarkMode] = React.useState(true);
  const navigate = useNavigate() 


  
    let link;
    switch (auth.roleId?.display_name) {
      case "Administrator":
      link = [
        {
            name: "Dashboard",
            path: "/dashboard/Administrator/home",
            icon: "home",
            children: [],
        },
        {
          name: "Manage Players",
          path: "",
          icon: "users",
          children: [
            {
              name: "Active Users",
              path: "/dashboard/Administrator/manageplayers/activeplayers",
            },
            {
              name: "Banned Users",
              path: "/dashboard/Administrator/manageplayers/bannedplayers",
            },
            {
              name: "Email Unverified",
              path: "/dashboard/Administrator/manageplayers/emailunverified",
            },            
            {
              name: "With Balance",
              path: "/dashboard/Administrator/manageplayers/withbalance",
            },
            {
              name: "Paid Users",
              path: "/dashboard/Administrator/manageplayers/paidusers",
            },
            {
              name: "All Users",
              path: "/dashboard/Administrator/manageplayers/allusers",
            },
          ],
        },
        {
          name: "Settings",
          path: "",
          icon: "cog",
          children: [
            {
              name: "Update Progress Bar",
              path: "/dashboard/Administrator/settings/updateprogressbar",
            },
            {
              name: "Update Subscription Info",
              path: "/dashboard/Administrator/settings/updatesubs",
            },
            {
              name: "Update News Info",
              path: "/dashboard/Administrator/settings/updatenews",
            },
            {
              name: "Update Roadmap Info",
              path: "/dashboard/Administrator/settings/updateroadmap",
            },
          ],
      },
    ];
    break;
    case "Player": 
     link = [
      {
        name: "DASHBOARD",
        path: "/dashboard/Player/home",
        icon: "home",
        children: [],
      },
     ];
     break;
     case "Agent": 
     link = [
      {
        name: "DASHBOARD",
        path: "/dashboard/Agent/home",
        icon: "home",
        children: [],
      },
     ];
     break;
     default:
    }
    
    
  

    return(
      <>
        {auth ? 
          <MDBContainer fluid className="">
        
        <Sidebarnav
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
                : "16rem"
              : "0rem",
        }}
        >
        <div className="pt-2">
          {window.innerWidth <= 768 && (
          <MDBIcon
            fas
            icon="bars"
            size="2x"
            className="side-menu-toggle"
            role="button"
            onClick={() => setDidToggle(!didToggle)}
          />
          )}
        
          <div style={{float:'right'}}>
          <ReferralButton auth={auth}/>
          <ThemeContext.Consumer>
              {({ changeTheme }) => (
                <MDBBtn
                  color="link"
                  onClick={() => {
                    setDarkMode(!darkMode);
                    changeTheme(darkMode ? themes.light : themes.dark);
                  }}
                >
                  <i className={darkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
                </MDBBtn>
              )}
            </ThemeContext.Consumer>
          </div>
        </div>
        
        
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

export default Dashboard;