import React, {useEffect, useState} from "react";
// import './dashboard.css'
import { Link, json, useNavigate } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon } from "mdb-react-ui-kit";
import Sidebarnav from "../../../component/sidebarnav";
import { Outlet } from "react-router-dom";
import { isgamelogin, isLogin } from "../../../component/utils";
import TopNavbar from "../../../component/topnavbar";
import Swal from "sweetalert2";
const UserDashboard = () => {
  const [user, setuser] = useState('');
  const [uid, setuid] = useState('');
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
    isgamelogin()
    .then(data => {
      setuser(data.name)
      setuid(data.uid)
    })
    // isLogin()
    // .then(data => {
    //   setmtuser(data.name)
    // })
  },[mtuser])
  // switch(mtuser){
  //   case "mastertita":
  //     link = [
  //       {
  //         name: "DASHBOARD",
  //         path: "/Dashboard/Admin/home",
  //         icon: "home",
  //         children: [],
  //       }
  //     ]
  //     break;
  //     default:
  //       link = [
  //         {
  //           name: "DASHBOARD",
  //           path: "/Dashboard/User/home",
  //           icon: "home",
  //           children: [],
  //         },
  //         {
  //           name: "Network",
  //           path: "/Dashboard/User/network",
  //           icon: "bezier-curve",
  //           children: [],
  //         },
  //         {
  //           name: "Add Funds",
  //           path: "",
  //           icon: "credit-card",
  //           children: [
  //             {
  //               name: "Automatic",
  //               path: "/topup",
  //             },
  //             {
  //               name: "Manual",
  //               path: `/cashier?username=${user}&id=${uid}`,
  //             },
  //           ],
  //         },
  //         {
  //           name: "Leaderboard",
  //           path: "/Dashboard/User/leaderboard",
  //           icon: "trophy",
  //           children: [],
  //         },
  //         {
  //           name: "Payout",
  //           path: "",
  //           icon: "money-bill-alt",
  //           children: [
  //             {
  //               name: "Request Payout",
  //               path: "/Dashboard/User/payoutrequest",
  //             },
  //             {
  //               name: "Payout History",
  //               path: "/Dashboard/User/payouthistory",
  //             },
  //           ],
  //         },
  //         {
  //           name: "Mail",
  //           path: "",
  //           icon: "envelope",
  //           children: [],
  //         },
  //         {
  //           name: "News",
  //           path: "/Dashboard/User/news",
  //           icon: "newspaper",
  //           children: [],
  //         },
  //         {
  //           name: "Profile",
  //           path: "/Dashboard/User/profile",
  //           icon: "user-edit",
  //           children: [],
  //         },
  //         // {
  //         //   name: "Set up Refferer",
  //         //   path: "/Dashboard/User/referral",
  //         //   icon: "user-lock",
  //         //   children: [],
  //         // },
  //         {
  //           name: "History",
  //           path: "",
  //           icon: "history",
  //           children: [
  //             {
  //               name: "Wallet History",
  //               path: "/Dashboard/User/wallethistory",
  //             },
  //             {
  //               name: "Transaction History",
  //               path: "/Dashboard/User/transactionhistory",
  //             },
  //             {
  //               name: "Grinding History",
  //               path: "/Dashboard/User/grindinghistory",
  //             },
  //             // {
  //             //   name: "Monster Gem Unilevel",
  //             //   path: "/Dashboard/User/monstergemunilevel",
  //             // },
  //             // {
  //             //   name: "Monster Gem Grind",
  //             //   path: "/Dashboard/User/monstergemgrind",
  //             // },
  //           ],
  //         },
  //       ]
  //       break;
  // }
  

  link = [
    {
      name: "DASHBOARD",
      path: "/Dashboard/User/home",
      icon: "home",
      children: [],
    },
    {
      name: "Network",
      path: "/Dashboard/User/network",
      icon: "bezier-curve",
      children: [],
    },
    {
      name: "Add Funds",
      path: "",
      icon: "credit-card",
      children: [
        {
          name: "Automatic",
          path: "/topup",
        },
        {
          name: "Manual",
          path: `/cashier?username=${user}&id=${uid}`,
        },
      ],
    },
    {
      name: "Leaderboard",
      path: "/Dashboard/User/leaderboard",
      icon: "trophy",
      children: [],
    },
    {
      name: "Payout",
      path: "",
      icon: "money-bill-alt",
      children: [
        {
          name: "Request Payout",
          path: "/Dashboard/User/payoutrequest",
        },
        {
          name: "Payout History",
          path: "/Dashboard/User/payouthistory",
        },
      ],
    },
    {
      name: "Mail",
      path: "",
      icon: "envelope",
      children: [],
    },
    {
      name: "News",
      path: "/Dashboard/User/news",
      icon: "newspaper",
      children: [],
    },
    {
      name: "Profile",
      path: "/Dashboard/User/profile",
      icon: "user-edit",
      children: [],
    },
    // {
    //   name: "Set up Refferer",
    //   path: "/Dashboard/User/referral",
    //   icon: "user-lock",
    //   children: [],
    // },
    {
      name: "History",
      path: "",
      icon: "history",
      children: [
        {
          name: "Wallet History",
          path: "/Dashboard/User/wallethistory",
        },
        {
          name: "Transaction History",
          path: "/Dashboard/User/transactionhistory",
        },
        {
          name: "Grinding History",
          path: "/Dashboard/User/grindinghistory",
        },
        // {
        //   name: "Monster Gem Unilevel",
        //   path: "/Dashboard/User/monstergemunilevel",
        // },
        // {
        //   name: "Monster Gem Grind",
        //   path: "/Dashboard/User/monstergemgrind",
        // },
      ],
    },
  ]
  
    
  

    return(
      <>
        { user  ? 
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
          navigate("/gamelogin")
        }
        {/* {!user && pleaselogin()} */}
        </>
    )
}

export default UserDashboard;