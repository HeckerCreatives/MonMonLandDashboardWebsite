import React, {useEffect, useState} from "react";
import './dashboard.css'
import { Link, json } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon } from "mdb-react-ui-kit";
import Sidebarnav from "../../component/sidebarnav";
import { Outlet } from "react-router-dom";
// import Navbar from "../../component/navbar";
import { ThemeContext, themes } from '../../component/theme/themecontext';


const Dashboard = () => {
  // const [links, setLinks] = useState([]);
  const [didToggle, setDidToggle] = useState(
    window.innerWidth > 768 ? false : true
  );
  const auth = JSON.parse(localStorage.getItem("auth"))
  const [darkMode, setDarkMode] = React.useState(true);
  // const userRole = "Superadmin" 
  console.log(auth)  

  
    let link;
    switch (auth.roleId.display_name) {
      case "Administrator":
      link = [
        {
            name: "Dashboard",
            path: "/dashboard/superadmin/home",
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
              path: "/dashboard/superadmin/manageplayers/activeplayers",
            },
            {
              name: "Banned Users",
              path: "/dashboard/superadmin/manageplayers/bannedplayers",
            },
            {
              name: "Email Unverified",
              path: "/dashboard/superadmin/manageplayers/emailunverified",
            },
            {
              name: "Mobile Unverified",
              path: "/dashboard/superadmin/manageplayers/mobileunverified",
            },
            {
              name: "With Balance",
              path: "/dashboard/superadmin/manageplayers/withbalance",
            },
            {
              name: "Paid Users",
              path: "/dashboard/superadmin/manageplayers/paidusers",
            },
            {
              name: "All Users",
              path: "/dashboard/superadmin/manageplayers/allusers",
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
              path: "/dashboard/superadmin/settings/updateprogressbar",
            },
            {
              name: "Update Subscription Info",
              path: "/dashboard/superadmin/settings/updatesubs",
            },
            {
              name: "Update News Info",
              path: "/dashboard/superadmin/settings/updatenews",
            },
            {
              name: "Update Roadmap Info",
              path: "/dashboard/superadmin/settings/updateroadmap",
            },
          ],
      },
    ];
    break;
    case "Player": 
     link = [
      {
        name: "DASHBOARD",
        path: "/dashboard/user/home",
        icon: "home",
        children: [],
      },
     ];
     break;
     default:
    }
    
    
  

    return(
      <>
        {/* <Navbar/> */}
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
        </>
    )
}

export default Dashboard;