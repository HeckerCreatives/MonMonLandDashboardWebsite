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
      path: "",
      icon: "home",
      children: [
        {
          name: "Grand Launch",
          path: "/Dashboard/Admin/home/grandlaunch"
        },
        {
          name: "Soft Launch",
          path: "/Dashboard/Admin/home/softlaunch"
        },
      ],
    },
    {
      name: "Game Announcement",
      path: "/Dashboard/Admin/gameannouncement",
      icon: "bullhorn",
      children: [
       
      ],
    },
    {
      name: "Leaderboard",
      path: "",
      icon: "trophy",
      children: [
        {
          name: "Top Earners",
          path: "/Dashboard/Admin/ingameleaderboard/topearners"
        },
        {
          name: "Fiesta",
          path: "/Dashboard/Admin/ingameleaderboard/fiesta"
        }
      ],
    },
    {
      name: "Payout",
      path: "",
      icon: "money-bill-alt",
      children: [
        {
          name: "Request",
          path: "/Dashboard/Admin/payout/request",
        },                
        {
          name: "Process",
          path: "/Dashboard/Admin/payout/process",
        },
        {
          name: "Done",
          path: "/Dashboard/Admin/payout/done",
        },
      ],
    },
    {
      name: "Dragonpay Payout",
      path: "",
      icon: "money-check",
      children: [
        {
          name: "Request",
          path: "/Dashboard/Admin/dragonpayout/request",
        },                
        {
          name: "Process",
          path: "/Dashboard/Admin/dragonpayout/process",
        },
        {
          name: "Done",
          path: "/Dashboard/Admin/dragonpayout/done",
        },
      ],
    },
    {
      name: "Subscription",
      path: "",
      icon: "dice-d6",
      children: [
        {
          name: "Pearl",
          path: "/Dashboard/Admin/settings/updatesubs/pearl",
        },
        {
          name: "Ruby",
          path: "/Dashboard/Admin/settings/updatesubs/ruby",
        },
        {
          name: "Emerald",
          path: "/Dashboard/Admin/settings/updatesubs/emerald",
        },
        {
          name: "Diamond",
          path: "/Dashboard/Admin/settings/updatesubs/diamond",
        },
      ]
    },
    {
      name: "Report",
      path: "",
      icon: "book",
      children: [
        {
          name: "Pearl Report",
          path: "/Dashboard/Admin/report/pearlreport"
        },
        {
          name: "Payable Report",
          path: "/Dashboard/Admin/report/payablereport"
        }
      ],
    },
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