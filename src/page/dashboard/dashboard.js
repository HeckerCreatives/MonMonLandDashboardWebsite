import React, {useEffect, useState} from "react";
import './dashboard.css'
import { Link, json, useNavigate } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon } from "mdb-react-ui-kit";
import Sidebarnav from "../../component/sidebarnav";
import { Outlet } from "react-router-dom";
// import Navbar from "../../component/navbar";
// import { ThemeContext, themes } from '../../component/theme/themecontext';
// import ReferralButton from "../../component/dashboard/referral/referral";
import TopNavbar from "../../component/topnavbar";

const Dashboard = () => {
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
  const auth = JSON.parse(localStorage.getItem("auth"))
  // const [darkMode, setDarkMode] = React.useState(true);
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
          name: "Manage Accounts",
          path: "",
          icon: "users",
          children: [
            {
              name: "Admin",
              path: "/dashboard/Administrator/manageaccount/createadminacc",
            },
            {
              name: "CSR",
              path: "/dashboard/Administrator/manageaccount/createcsracc",
            },
            {
              name: "Manage Users",
              path: "",
              children: [
                {
                  name: "Active Users",
                  path: "/dashboard/Administrator/manageaccount/manageplayers/activeplayers",
                },
                {
                  name: "Banned Users",
                  path: "/dashboard/Administrator/manageaccount/manageplayers/bannedplayers",
                },
                {
                  name: "Email Unverified",
                  path: "/dashboard/Administrator/manageaccount/manageplayers/emailunverified",
                },            
                {
                  name: "With Balance",
                  path: "/dashboard/Administrator/manageaccount/manageplayers/withbalance",
                },
                {
                  name: "Paid Users",
                  path: "/dashboard/Administrator/manageaccount/manageplayers/paidusers",
                },
                {
                  name: "All Users",
                  path: "/dashboard/Administrator/manageaccount/manageplayers/allusers",
                },
              ],
            },
            
          ],
        },
        {
          name: "Settings",
          path: "",
          icon: "cog",
          children: [
            {
              name: "Landing Page",
              path: "",
              children: [
                {
                  name: "Header",
                  path: "/dashboard/Administrator/settings/updateprogressbar",
                },
                {
                  name: "Subscription",
                  path: "",
                  children: [
                    {
                      name: "Pearl",
                      path: "/dashboard/Administrator/settings/updatesubs/pearl",
                    },
                    {
                      name: "Ruby",
                      path: "/dashboard/Administrator/settings/updatesubs/ruby",
                    },
                    {
                      name: "Emerald",
                      path: "/dashboard/Administrator/settings/updatesubs/emerald",
                    },
                    {
                      name: "Diamond",
                      path: "/dashboard/Administrator/settings/updatesubs/diamond",
                    },
                    {
                      name: "Free",
                      path: "/dashboard/Administrator/settings/updatesubs/free",
                    }
                  ]
                },
                {
                  name: "Games",
                  path: "/dashboard/Administrator/settings/updategames",
                },
                {
                  name: "News",
                  path: "/dashboard/Administrator/settings/updatenews",
                },
                {
                  name: "Roadmap",
                  path: "/dashboard/Administrator/settings/updateroadmap",
                },
                
              ]
            }
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
                : "17rem"
              : "0rem",
        }}
        >
        <TopNavbar auth={auth} didToggle={didToggle}
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

export default Dashboard;