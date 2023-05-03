import React, {useEffect, useState} from "react";
import './dashboard.css'
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon } from "mdb-react-ui-kit";
import Sidebarnav from "../../component/sidebarnav";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [didToggle, setDidToggle] = useState(
    window.innerWidth > 768 ? false : true
  );
  
  useEffect(()=>{
    setLinks([
        {
            name: "DASHBOARD",
            path: "/dashboard/superadmin/home",
            icon: "home",
            children: [],
        }
    ])
  },[])

    return(
        <MDBContainer fluid className="text-center">
        {window.innerWidth < 768 && (
        <MDBIcon
          fas
          icon="bars"
          size="2x"
          className="text-warning side-menu-toggle"
          role="button"
          onClick={() => setDidToggle(!didToggle)}
        />
        )}
        <main
        className="d-flex main-container"
        style={{
          paddingLeft:
            window.innerWidth > 768
              ? didToggle
                ? window.innerWidth < 768
                  ? "0rem"
                  : "4.5rem"
                : "20rem"
              : "0rem",
        }}
      >
        <Sidebarnav
          links={links}
          didToggle={didToggle}
          setDidToggle={setDidToggle}
        />
        {/* <MDBContainer fluid className="px-0 main-bg">
          <Outlet />
        </MDBContainer> */}
        <MDBRow>
        <Link to="/">
        <MDBBtn>BACK</MDBBtn>
        </Link>        
            <MDBCol>
                <Link to = "/admin/dashboard/updateprogressbar">
                <MDBBtn>Update Progress Bar</MDBBtn>
                </Link>
                <Link to = "/admin/dashboard/updatesubs">
                <MDBBtn>Update Subscription info</MDBBtn>
                </Link>
                <Link to = "/admin/dashboard/updatenews">
                <MDBBtn>Update News info</MDBBtn>
                </Link>
                <Link to = "/admin/dashboard/updateroadmap">
                <MDBBtn>Update Roadmap info</MDBBtn>
                </Link>
            </MDBCol>        
        </MDBRow>
        </main>                    
        </MDBContainer>
    )
}

export default Dashboard;