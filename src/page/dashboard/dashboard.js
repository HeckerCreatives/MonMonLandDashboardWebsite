import React, {useEffect, useState} from "react";
import './dashboard.css'
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon } from "mdb-react-ui-kit";
import Sidebarnav from "../../component/sidebarnav";
import { Outlet } from "react-router-dom";
import Cards from "../../component/cards";
import Graph from "../../component/graph";
import MiniTableList from "../../component/minitablelist";
import MiniDescription from "../../component/minidescription";
import FullTable from "../../component/fulltablelist";
import Breadcrumb from "../../component/breadcrumb";
// import Navbar from "../../component/navbar";
import { ThemeContext, themes } from '../../component/theme/themecontext';


const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [didToggle, setDidToggle] = useState(
    window.innerWidth > 768 ? false : true
  );

  const [darkMode, setDarkMode] = React.useState(true);



  useEffect(()=>{
    setLinks([
        {
            name: "DASHBOARD",
            path: "/dashboard/superadmin/home",
            icon: "home",
            children: [],
        },
        {
          name: "SETTINGS",
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

    ])
  },[])

    return(
      <>
        {/* <Navbar/> */}
        <MDBContainer fluid className="">
        
        <Sidebarnav
          links={links}
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
                : "20rem"
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