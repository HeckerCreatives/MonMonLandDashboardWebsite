import React, {useEffect, useState} from "react";
// import './dashboard.css'
import { Link, json, useNavigate } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon } from "mdb-react-ui-kit";
import Sidebarnav from "../../../component/sidebarnav";
import { Outlet } from "react-router-dom";
import { isgamelogin, isLogin } from "../../../component/utils";
import TopNavbar from "../../../component/topnavbar";
import Swal from "sweetalert2";
const MtDashboard = () => {
  const [mtuser, setmtuser] = useState('');
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
  const navigate = useNavigate() 
  let link;
  useEffect(()=> {
    isLogin()
    .then(data => {
      setmtuser(data.name)
    })
  },[mtuser])

  link = [
    {
      name: "DASHBOARD",
      path: "/Dashboard/Admin/home",
      icon: "home",
      children: [],
    }
  ]

  
    
  

    return(
      <>
        { 
        mtuser ?

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
        <TopNavbar auth={mtuser} didToggle={didToggle}
          setDidToggle={setDidToggle}/>
        
        
        <MDBContainer fluid className="px-0">
        <Outlet />        
        </MDBContainer>

        </main>                    
        </MDBContainer>
        :
          navigate("/gamelogin")
        }
        {/* {!user && pleaselogin()} */}
        </>
    )
}

export default MtDashboard;