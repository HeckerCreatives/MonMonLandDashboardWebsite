import React, {useEffect, useState} from "react";
import './dashboard.css'
import { Link, json, useNavigate } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon } from "mdb-react-ui-kit";
import Sidebarnav from "../../component/sidebarnav";
import { Outlet } from "react-router-dom";
import { isLogin } from "../../component/utils";
// import Navbar from "../../component/navbar";
// import { ThemeContext, themes } from '../../component/theme/themecontext';
// import ReferralButton from "../../component/dashboard/referral/referral";
import TopNavbar from "../../component/topnavbar";
import Cookies from 'js-cookie';
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
  
  // let auth = Cookies.get('auth')
  // auth = JSON.parse(auth)
  const navigate = useNavigate()
  const [role, setrole]= useState('');
  const [name, setname]= useState('');

  useEffect(() => {
    isLogin()
    .then(data => {
      setrole(data.role)
      setname(data.name)
    })
  },[role])

    
    let link;
    switch (role){
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
              name: "Marketing",
              path: "/dashboard/Administrator/manageaccount/createmarketingacc",
            },
            {
              name: "Members",
              path: "/dashboard/Administrator/manageaccount/members",
            },
            {
              name: "Banned",
              path: "/dashboard/Administrator/manageaccount/bannedmembers",
            },
            // {
            //   name: "Manage Users",
            //   path: "",
            //   children: [
            //     {
            //       name: "Active Users",
            //       path: "/dashboard/Administrator/manageaccount/manageplayers/activeplayers",
            //     },
            //     {
            //       name: "Banned Users",
            //       path: "/dashboard/Administrator/manageaccount/manageplayers/bannedplayers",
            //     },
            //     {
            //       name: "Email Unverified",
            //       path: "/dashboard/Administrator/manageaccount/manageplayers/emailunverified",
            //     },            
            //     {
            //       name: "With Balance",
            //       path: "/dashboard/Administrator/manageaccount/manageplayers/withbalance",
            //     },
            //     {
            //       name: "Paid Users",
            //       path: "/dashboard/Administrator/manageaccount/manageplayers/paidusers",
            //     },
            //     {
            //       name: "All Users",
            //       path: "/dashboard/Administrator/manageaccount/manageplayers/allusers",
            //     },
            //   ],
            // },
            
          ],
        },
        {
          name: "Leaderboard",
          path: "",
          icon: "trophy",
          children: [
            {
              name: "Top Earners",
              path: "/dashboard/Administrator/ingameleaderboard/topearners"
            },
            {
              name: "Fiesta",
              path: "/dashboard/Administrator/ingameleaderboard/fiesta"
            }
          ],
        },
        {
          name: "Sponsor",
          path: "",
          icon: "dice",
          children: [
            {
              name: "Monmonbonanza",
              path: "/dashboard/Administrator/sponsor/monmonbonanza"
            },
            // {
            //   name: "Fiesta",
            //   path: "/dashboard/Administrator/ingameleaderboard/fiesta"
            // }
          ],
        },
        {
          name: "Manage Top Up",
          path: "",
          icon: "arrow-alt-circle-up",
          children: [
            {
              name: "Manual",
              path: "/dashboard/Administrator/upgradesubscription/managetopup"
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
              path: "/dashboard/Administrator/payout/request",
            },                
            {
              name: "Process",
              path: "/dashboard/Administrator/payout/process",
            },
            {
              name: "Done",
              path: "/dashboard/Administrator/payout/done",
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
              path: "/dashboard/Administrator/dragonpayout/request",
            },                
            // {
            //   name: "Process",
            //   path: "/dashboard/Administrator/payout/process",
            // },
            // {
            //   name: "Done",
            //   path: "/dashboard/Administrator/payout/done",
            // },
          ],
        },
        {
          name: "Tools",
          path: "",
          icon: "cog",
          children: [
                           
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
            
          ],
      },
      {
        name: "Currency",
        path: "",
        icon: "dollar-sign",
        children: [
          {
            name: "Additional",
            path: "/dashboard/Administrator/settings/updatetotalincome",
          },  
          {
            name: "Advertisement",
            path: "/dashboard/Administrator/settings/updateads",
          },
          {
            name: "Investor Funds",
            path: "/dashboard/Administrator/settings/updateinvestorfunds",
          },
          {
            name: "Usd Exchange Rate",
            path: "/dashboard/Administrator/settings/updateusdrate",
          },
          {
            name: "Trade",
            path: "/dashboard/Administrator/settings/updatetrade",
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
          // {
          //   name: "Free",
          //   path: "/dashboard/Administrator/settings/updatesubs/free",
          // }
        ]
      },
      {
        name: "User Logs",
        path: "",
        icon: "user",
        children: [
          {
            name: "Admin Login Logs",
            path: "/dashboard/Administrator/userlogs/adminloginlogs",
          },
          {
            name: "Csr Login Logs",
            path: "/dashboard/Administrator/userlogs/csrloginlogs",
          },
        ],
      },
      // {
      //   name: "Top Up Resolver",
      //   path: "/dashboard/Administrator/topupresolver",
      //   icon: "money-check-alt",
      //   children: [
      //   ],
      // },
    ];
    break;
    case "SubAdministrator":
      link = [
        {
            name: "Dashboard",
            path: "/dashboard/SubAdministrator/home",
            icon: "home",
            children: [],
        },
        {
          name: "Manage CSR",
          path: "/dashboard/SubAdministrator/manageaccount/createcsracc",
          icon: "users",
          children: [
            // {
            //   name: "Admin",
            //   path: "/dashboard/SubAdministrator/manageaccount/createadminacc",
            // },
            // {
            //   name: "CSR",
            //   path: "/dashboard/SubAdministrator/manageaccount/createcsracc",
            // },
            // {
            //   name: "Manage Users",
            //   path: "",
            //   children: [
            //     {
            //       name: "Active Users",
            //       path: "/dashboard/SubAdministrator/manageaccount/manageplayers/activeplayers",
            //     },
            //     {
            //       name: "Banned Users",
            //       path: "/dashboard/SubAdministrator/manageaccount/manageplayers/bannedplayers",
            //     },
            //     {
            //       name: "Email Unverified",
            //       path: "/dashboard/SubAdministrator/manageaccount/manageplayers/emailunverified",
            //     },            
            //     {
            //       name: "With Balance",
            //       path: "/dashboard/SubAdministrator/manageaccount/manageplayers/withbalance",
            //     },
            //     {
            //       name: "Paid Users",
            //       path: "/dashboard/SubAdministrator/manageaccount/manageplayers/paidusers",
            //     },
            //     {
            //       name: "All Users",
            //       path: "/dashboard/SubAdministrator/manageaccount/manageplayers/allusers",
            //     },
            //   ],
            // },
            
          ],
        },
        {
          name: "Top Up",
          path: "/dashboard/SubAdministrator/upgradesubscription",
          icon: "arrow-alt-circle-up",
          children: [],
        },
        {
          name: "Payout",
          path: "",
          icon: "money-bill-alt",
          children: [
            {
              name: "Request",
              path: "/dashboard/SubAdministrator/payout/request",
            },                
            {
              name: "Process",
              path: "/dashboard/SubAdministrator/payout/process",
            },
            {
              name: "Done",
              path: "/dashboard/SubAdministrator/payout/done",
            },
          ],
        },
        {
          name: "Tools",
          path: "",
          icon: "cog",
          children: [
            {
              name: "Header",
              path: "/dashboard/SubAdministrator/settings/updatetotalincome",
            },                
            {
              name: "Games",
              path: "/dashboard/SubAdministrator/settings/updategames",
            },
            {
              name: "News",
              path: "/dashboard/SubAdministrator/settings/updatenews",
            },
            {
              name: "Roadmap",
              path: "/dashboard/SubAdministrator/settings/updateroadmap",
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
            path: "/dashboard/SubAdministrator/settings/updatesubs/pearl",
          },
          {
            name: "Ruby",
            path: "/dashboard/SubAdministrator/settings/updatesubs/ruby",
          },
          {
            name: "Emerald",
            path: "/dashboard/SubAdministrator/settings/updatesubs/emerald",
          },
          {
            name: "Diamond",
            path: "/dashboard/SubAdministrator/settings/updatesubs/diamond",
          },
          // {
          //   name: "Free",
          //   path: "/dashboard/SubAdministrator/settings/updatesubs/free",
          // }
        ]
      },
      {
        name: "CSR Logs",
        path: "/dashboard/SubAdministrator/userlogs/csrloginlogs",
        icon: "user",
        children: [
          // {
          //   name: "Admin",
          //   path: "/dashboard/SubAdministrator/manageaccount/createadminacc",
          // },
          // {
          //   name: "CSR",
          //   path: "/dashboard/SubAdministrator/manageaccount/createcsracc",
          // },
        ],
      },
      {
        name: "Payment History",
        path: "/dashboard/SubAdministrator/paymenthistory",
        icon: "book",
        children: [
          
        ],
      },
      // {
      //   name: "Top Up Resolver",
      //   path: "/dashboard/SubAdministrator/topupresolver",
      //   icon: "money-check-alt",
      //   children: [
      //   ],
      // },
      
    ];
    break;
    case "Marketing": 
     link = [
      {
        name: "DASHBOARD",
        path: "/dashboard/Marketing/home",
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
      {
        name: "Top Up",
        path: "/dashboard/Agent/upgradesubscription",
        icon: "arrow-alt-circle-up",
        children: [],
      },
      {
        name: "Payout",
        path: "",
        icon: "money-bill-alt",
        children: [
          {
            name: "Request",
            path: "/dashboard/Agent/payout/request",
          },                
          {
            name: "Process",
            path: "/dashboard/Agent/payout/process",
          },
          {
            name: "Done",
            path: "/dashboard/Agent/payout/done",
          },
        ],
      },
      {
        name: "Tools",
        path: "",
        icon: "cog",
        children: [
          {
            name: "Header",
            path: "/dashboard/Agent/settings/updateprogressbar",
          },                
          {
            name: "Games",
            path: "/dashboard/Agent/settings/updategames",
          },
          {
            name: "News",
            path: "/dashboard/Agent/settings/updatenews",
          },
          {
            name: "Roadmap",
            path: "/dashboard/Agent/settings/updateroadmap",
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
          path: "/dashboard/Agent/settings/updatesubs/pearl",
        },
        {
          name: "Ruby",
          path: "/dashboard/Agent/settings/updatesubs/ruby",
        },
        {
          name: "Emerald",
          path: "/dashboard/Agent/settings/updatesubs/emerald",
        },
        {
          name: "Diamond",
          path: "/dashboard/Agent/settings/updatesubs/diamond",
        },
        // {
        //   name: "Free",
        //   path: "/dashboard/Agent/settings/updatesubs/free",
        // }
      ]
    },
    {
      name: "Payment History",
      path: "/dashboard/Agent/paymenthistory",
      icon: "book",
      children: [
        
      ],
    },
    {
      name: "Top Up Resolver",
      path: "/dashboard/Agent/topupresolver",
      icon: "money-check-alt",
      children: [
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
      {
        name: "Network",
        path: "/dashboard/Player/network",
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
        path: "/dashboard/Player/leaderboard",
        icon: "trophy",
        children: [],
      },
      {
        name: "Payout",
        path: "/dashboard/Player/home",
        icon: "money-bill-alt",
        children: [],
      },
      {
        name: "News",
        path: "/dashboard/Player/news",
        icon: "newspaper",
        children: [],
      },
      {
        name: "Profile",
        path: "/dashboard/Player/profile",
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
            path: "/dashboard/Player/wallethistory",
          },
          {
            name: "Total Income Wallet",
            path: "/dashboard/Player/totalincomehistory",
          },
          {
            name: "Monster Coin Wallet",
            path: "/dashboard/Player/monstercoinhistory",
          },
          {
            name: "Monster Gem Unilevel",
            path: "/dashboard/Player/monstergemunilevel",
          },
          {
            name: "Monster Gem Grind",
            path: "/dashboard/Player/monstergemgrind",
          },
        ],
      },
     ];
     break
     default:
    }
    
    
  

    return(
      <>
        {role ? 
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
        <TopNavbar auth={name} didToggle={didToggle}
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