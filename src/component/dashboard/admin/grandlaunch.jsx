import React, {useState, useEffect} from "react";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon, MDBTypography, } from "mdb-react-ui-kit";
import DashCard from "../../cards/dashcard";
import Graph from "../../graph";
import MiniTableList from "../../minitablelist";
import MiniDescription from "../../minidescription";
import FullTable from "../../fulltablelist";
import Breadcrumb from "../../breadcrumb";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import { isLogin, logout } from "../../utils";
const AdminDashboardGrandLaunch = () => {
  // const encryptauth = decodeURIComponent(Cookies.get('auth'))
  // const auth = JSON.parse(encryptauth)
    // const auth = JSON.parse(Cookies.get("auth"))
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    const [users, setUsers] = useState([]);
    const [unilevel, setUnilevel] = useState(0);
    const navigate = useNavigate()
    let increment = 3;
    const [request, setRequest] = useState(0);
    const [processed, setProcessed] = useState(0);
    const [done, setDone] = useState(0);

    const [dragonrequest, setDragonRequest] = useState(0);
    const [dragonprocessed, setDragonProcessed] = useState(0);
    const [dragondone, setDragonDone] = useState(0);
    const [dragontotal, setDragonTotal] = useState(0);

    const [autopayment, setAutoPayment] = useState(0);
    const [AutoAndManual, setAutoAndManual] = useState(0);
    const [ManualPayment, setManualPayment] = useState(0);

    const [softlaunchauto, setSoftLaunchAuto] = useState(0);
    const [softlaunchtotal, setSoftLaunchTotal] = useState(0);
    const [softlaunchmanual, setSoftLaunchManual] = useState(0);

    const [totalauto, setTotalAuto] = useState(0);
    const [combinetotal, setCombineTotal] = useState(0);
    const [totalmanual, setTotalManual] = useState(0);

    const [pearl, setPearl] = useState(0);
    const [ruby, setRuby] = useState(0);
    const [emerald, setEmerald] = useState(0);
    const [diamond, setDiamond] = useState(0);
    const [totalsubsuser, setTotalSubsUser] = useState(0);

    const [pearlaccumulated, setPearlAccumulated] = useState(0);
    const [rubyaccumulated, setRubyAccumulated] = useState(0);
    const [emeraldaccumulated, setEmeraldAccumulated] = useState(0);
    const [diamondaccumulated, setDiamondAccumulated] = useState(0);
    const [totalaccumulated, setTotalAccumulated] = useState(0);

    const [tools, setTools] = useState(0);
    const [clock, setClock] = useState(0);
    const [shop, setShop] = useState(0);
    const [totalmerchandise, setTotalMerchandise] = useState(0);

    const [adminfee, setAdminFee] = useState(0);

    const [withdrawalfee, setWithdrawalFee] = useState(0)

    const [leaderboard, setLeaderboard] = useState(0)
    const [grinding, setGrinding] = useState(0)
    const [quest, setQuest] = useState(0)
    const [diamondpool, setDiamondPool] = useState(0)
    const [devsshare, setDevsShare] = useState(0)
    const [companyshare, setCompanyShare] = useState(0)
    const [officer, setOfficer] = useState(0)
    const [marketing, setMarketing] = useState(0)
    const [incentives, setIncentives] = useState(0)
    const [monstergem, setMonstergem] = useState(0)
    const [unilevelmonstergem, setUnilevelMg] = useState(0)
    const [sponsorwallet, setSponsorWallet] = useState(0)
    const [investorwallet, setInvestorWallet] = useState(0)
    const [tradepayin, setTradepayin] = useState(0)
    const [trademerchandise, setTrademerchandise] = useState(0)
    const [totaltrade, setTotalTrade] = useState(0)
    const [complanpayin, setComplanpayin] = useState(0)
    const [complanmerchandise, setComplanmerchandise] = useState(0)
    const [complantools, setComplantools] = useState(0)
    const [complancosmetics, setComplancosmetics] = useState(0)
    const [complantotal, setComplantotal] = useState(0)
    const [mmttoken, setMMTToken] = useState(0)
    const [mcttoken, setMCTToken] = useState(0)
    const [totalmmttoken, setTotalMMTToken] = useState(0)
    const [totalmcttoken, setTotalMCTToken] = useState(0)
    const [role, setrole]= useState('');
    const [name, setname]= useState('');
    const [id, setid]= useState('');
    const [systemfund, setSystemfund] = useState(0)
    useEffect(() => {
      isLogin()
        .then(data => {
          setrole(data.role)
          setname(data.name)
          setid(data.id)
      })
    },[role, id, name])

    useEffect(() => {
      if (role) {
        if (role !== "Administrator") {
          Cookies.remove("auth", { path: '/' });;
          navigate("/login");
        }
      }
    }, [role, navigate]);

  
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}payout/payoutwallet`,{
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({
        // adminId: auth._id,
        name: "request"
      })
    }).then(result => result.json())
    .then(data => {
      if(data.expired){
        Swal.fire({
          icon: "error",
          title: data.expired == "duallogin" ? "Dual Login" : data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            Cookies.remove("auth", { path: '/' });;
            Cookies.remove("playfabAdminAuthToken", { path: '/' });
            window.location.replace("/login");
          }
        })
      }
      
        if(data.message === "success"){
            setRequest(data?.data[0]?.amount)
        }
        
       
    })

    fetch(`${process.env.REACT_APP_API_URL}payout/payoutwallet`,{
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({
        // adminId: auth._id,
        name: "process"
      })
    }).then(result => result.json())
    .then(data => {
      if(data.expired){
        Swal.fire({
          icon: "error",
          title:  data.expired == "duallogin" ? "Dual Login" : data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            Cookies.remove("auth", { path: '/' });;
            Cookies.remove("playfabAdminAuthToken", { path: '/' });
            // localStorage.removeItem("auth");
            // localStorage.removeItem("playfabAdminAuthToken")
            window.location.replace("/login");
          }
        })
      }

        if(data.message === "success"){
            setProcessed(data?.data[0]?.amount)
        }

       
    })

    fetch(`${process.env.REACT_APP_API_URL}payout/payoutwallet`,{
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({
        // adminId: auth._id,
        name: "done"
      })
    }).then(result => result.json())
    .then(data => {
      if(data.expired){
        Swal.fire({
          icon: "error",
          title:  data.expired == "duallogin" ? "Dual Login" : data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            Cookies.remove("auth", { path: '/' });;
            Cookies.remove("playfabAdminAuthToken", { path: '/' });
            // localStorage.removeItem("auth");
            // localStorage.removeItem("playfabAdminAuthToken")
            window.location.replace("/login");
          }
        })
      }

        if(data.message === "success"){
            setDone(data?.data[0]?.amount)
        }

        
    })

    fetch(`${process.env.REACT_APP_API_URL}coin/topupwallet`,{
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({
        name: "automatic"
      })
    }).then(result => result.json())
    .then(data => {
      if(data.expired){
        Swal.fire({
          icon: "error",
          title:  data.expired == "duallogin" ? "Dual Login" : data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            Cookies.remove("auth", { path: '/' });;
            Cookies.remove("playfabAdminAuthToken", { path: '/' });
            // localStorage.removeItem("auth");
            // localStorage.removeItem("playfabAdminAuthToken")
            window.location.replace("/login");
          }
        })
      }

      if(data?.data !== null && !data.expired){
        setAutoPayment(data?.data[0]?.amount)
      }

      
      
    })

    fetch(`${process.env.REACT_APP_API_URL}coin/topupwallet`,{
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({
        name: "manual"
      })
    }).then(result => result.json())
    .then(data => {
      if(data.expired){
        Swal.fire({
          icon: "error",
          title:  data.expired == "duallogin" ? "Dual Login" : data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            Cookies.remove("auth", { path: '/' });;
            Cookies.remove("playfabAdminAuthToken", { path: '/' });
            // localStorage.removeItem("auth");
            // localStorage.removeItem("playfabAdminAuthToken")
            window.location.replace("/login");
          }
        })
      }

      if(data?.data !== null && !data.expired){
        setManualPayment(data?.data[0]?.amount)
      }
      

      

    })

    fetch(`${process.env.REACT_APP_API_URL}wallet/softlaunchwallet`,{
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth?.token}`,
      },
    }).then(result => result.json())
    .then(data => {
      if(data.expired){
        Swal.fire({
          icon: "error",
          title:  data.expired == "duallogin" ? "Dual Login" : data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            Cookies.remove("auth", { path: '/' });;
            Cookies.remove("playfabAdminAuthToken", { path: '/' });
            // localStorage.removeItem("auth");
            // localStorage.removeItem("playfabAdminAuthToken")
            window.location.replace("/login");
          }
        })
      }

      if(data?.data !== null && !data.expired){
        setSoftLaunchAuto(data.data.softlaunchauto)
        setSoftLaunchManual(data.data.softlaunchmanual)
        setSoftLaunchTotal(data.data.softlaunchtotal)
      }
    })

    fetch(`${process.env.REACT_APP_API_URL}wallet/totalsalewallet`,{
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth?.token}`,
      },
    }).then(result => result.json())
    .then(data => {
      if(data.expired){
        Swal.fire({
          icon: "error",
          title:  data.expired == "duallogin" ? "Dual Login" : data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            Cookies.remove("auth", { path: '/' });;
            Cookies.remove("playfabAdminAuthToken", { path: '/' });
            // localStorage.removeItem("auth");
            // localStorage.removeItem("playfabAdminAuthToken")
            window.location.replace("/login");
          }
        })
      }

      if(data?.data !== null && !data.expired){
        setTotalAuto(data.data.totalauto)
        setTotalManual(data.data.totalmanual)
        setCombineTotal(data.data.combinetotal)
      }
    })

    fetch(`${process.env.REACT_APP_API_URL}wallet/dragonpayoutwallet`,{
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth?.token}`,
      },
    }).then(result => result.json())
    .then(data => {
      if(data.expired){
        Swal.fire({
          icon: "error",
          title: data.expired == "duallogin" ? "Dual Login" : data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            Cookies.remove("auth", { path: '/' });;
            Cookies.remove("playfabAdminAuthToken", { path: '/' });
            // localStorage.removeItem("auth");
            // localStorage.removeItem("playfabAdminAuthToken")
            window.location.replace("/login");
          }
        })
      }

      if(data.message === "success" && data?.data !== null && !data.expired){
       setDragonRequest(data.data.dragonrequest)
        setDragonProcessed(data.data.dragonprocess)
        setDragonDone(data.data.dragondone)
        setDragonTotal(data.data.dragontotal)
      }
    })

    const total = autopayment ? autopayment + ManualPayment : 0 + ManualPayment
    
    setAutoAndManual(total)
  },[autopayment, ManualPayment])


  useEffect(()=> {
    fetch(`${process.env.REACT_APP_API_URL}user/find`,{
      credentials: 'include',
    })
    .then(result => result.json())
    .then(data => {
      setUsers(data)
      // setActiveUsers(active)
      // setInActiveUsers(inactive)        
    })    
  },[]) 


  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}subsaccu/find`,{
      method: "POST",
      credentials: 'include',
      headers:{
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({subsname: "pearl"})
    })
    .then(result => result.json())
    .then(data => {
      if(data.expired){
        Swal.fire({
          icon: "error",
          title:  data.expired == "duallogin" ? "Dual Login" : data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            Cookies.remove("auth", { path: '/' });;
            Cookies.remove("playfabAdminAuthToken", { path: '/' });
            // localStorage.removeItem("auth");
            // localStorage.removeItem("playfabAdminAuthToken")
            window.location.replace("/login");
          }
        })
      }

      setPearlAccumulated(data.data)

      
    })

    fetch(`${process.env.REACT_APP_API_URL}subsaccu/find`,{
      method: "POST",
      credentials: 'include',
      headers:{
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({subsname: "ruby"})
    })
    .then(result => result.json())
    .then(data => {
      if(data.expired){
        Swal.fire({
          icon: "error",
          title:  data.expired == "duallogin" ? "Dual Login" : data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            Cookies.remove("auth", { path: '/' });;
            Cookies.remove("playfabAdminAuthToken", { path: '/' });
            // localStorage.removeItem("auth");
            // localStorage.removeItem("playfabAdminAuthToken")
            window.location.replace("/login");
          }
        })
      }

      setRubyAccumulated(data.data)

      
    })

    fetch(`${process.env.REACT_APP_API_URL}subsaccu/find`,{
      method: "POST",
      credentials: 'include',
      headers:{
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({subsname: "emerald"})
    })
    .then(result => result.json())
    .then(data => {
      if(data.expired){
        Swal.fire({
          icon: "error",
          title:  data.expired == "duallogin" ? "Dual Login" : data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            Cookies.remove("auth", { path: '/' });;
            Cookies.remove("playfabAdminAuthToken", { path: '/' });
            // localStorage.removeItem("auth");
            // localStorage.removeItem("playfabAdminAuthToken")
            window.location.replace("/login");
          }
        })
      }

      setEmeraldAccumulated(data.data)

      
    })

    fetch(`${process.env.REACT_APP_API_URL}subsaccu/find`,{
      method: "POST",
      credentials: 'include',
      headers:{
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({subsname: "diamond"})
    })
    .then(result => result.json())
    .then(data => {
      if(data.expired){
        Swal.fire({
          icon: "error",
          title:  data.expired == "duallogin" ? "Dual Login" : data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            Cookies.remove("auth", { path: '/' });;
            Cookies.remove("playfabAdminAuthToken", { path: '/' });
            // localStorage.removeItem("auth");
            // localStorage.removeItem("playfabAdminAuthToken")
            window.location.replace("/login");
          }
        })
      }

      setDiamondAccumulated(data.data)

      
    })


    const total =  pearlaccumulated + rubyaccumulated + emeraldaccumulated + diamondaccumulated
    setTotalAccumulated(total)
  },[pearlaccumulated, rubyaccumulated, emeraldaccumulated,diamondaccumulated])

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}merchandise/find`,{
      method: "POST",
      credentials: 'include',
      headers:{
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({item: "tools"})
    })
    .then(result => result.json())
    .then(data => {
      if(data.expired){
        Swal.fire({
          icon: "error",
          title:  data.expired == "duallogin" ? "Dual Login" : data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            Cookies.remove("auth", { path: '/' });;
            Cookies.remove("playfabAdminAuthToken", { path: '/' });
            // localStorage.removeItem("auth");
            // localStorage.removeItem("playfabAdminAuthToken")
            window.location.replace("/login");
          }
        })
      }

      setTools(data.data)

      
    })

    fetch(`${process.env.REACT_APP_API_URL}merchandise/find`,{
      method: "POST",
      credentials: 'include',
      headers:{
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({item: "clock"})
    })
    .then(result => result.json())
    .then(data => {
      if(data.expired){
        Swal.fire({
          icon: "error",
          title: data.expired == "duallogin" ? "Dual Login" : data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            Cookies.remove("auth", { path: '/' });;
            Cookies.remove("playfabAdminAuthToken", { path: '/' });
            // localStorage.removeItem("auth");
            // localStorage.removeItem("playfabAdminAuthToken")
            window.location.replace("/login");
          }
        })
      }

      setClock(data.data)

      
    })

    fetch(`${process.env.REACT_APP_API_URL}merchandise/find`,{
      method: "POST",
      credentials: 'include',
      headers:{
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({item: "shop"})
    })
    .then(result => result.json())
    .then(data => {
      if(data.expired){
        Swal.fire({
          icon: "error",
          title:  data.expired == "duallogin" ? "Dual Login" : data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            Cookies.remove("auth", { path: '/' });
            Cookies.remove("playfabAdminAuthToken", { path: '/' });
            // localStorage.removeItem("auth");
            // localStorage.removeItem("playfabAdminAuthToken")
            window.location.replace("/login");
          }
        })
      }

      setShop(data.data)

      
    })
    
    const total = tools + clock + shop
    setTotalMerchandise(total)
  },[tools,clock, shop])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/adminfee`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth?.token}`,
      },
    })
    .then(result => result.json())
    .then(data => {
      if(data.expired){
        Swal.fire({
          icon: "error",
          title:  data.expired == "duallogin" ? "Dual Login" : data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            Cookies.remove("auth", { path: '/' });;
            Cookies.remove("playfabAdminAuthToken", { path: '/' });
            // localStorage.removeItem("auth");
            // localStorage.removeItem("playfabAdminAuthToken")
            window.location.replace("/login");
          }
        })
      }
      setAdminFee(data.data)

    })

    
    fetch(`${process.env.REACT_APP_API_URL}withdrawfee/find`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth?.token}`,
      },
      // body: JSON.stringify({id: id})
    })
    .then(result => result.json())
    .then(data => {

      if(data.expired){
        Swal.fire({
          icon: "error",
          title: data.expired == "duallogin" ? "Dual Login" : data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            Cookies.remove("auth", { path: '/' });;
            Cookies.remove("playfabAdminAuthToken", { path: '/' });
            // localStorage.removeItem("auth");
            // localStorage.removeItem("playfabAdminAuthToken")
            window.location.replace("/login");
          }
        })
      }

      if(!data.expired && data.message === "success"){
        setWithdrawalFee(data.data.withdrawalfee)
      }
      

        
    })

  },[])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}communityactivy/find`,{
      credentials: 'include',
    })
    .then(result => result.json())
    .then(data => {
      if(data.message === "success"){
        setLeaderboard(data.data.leaderboard)
        setGrinding(data.data.grinding)
        setQuest(data.data.quest)
        setDiamondPool(data.data.diamondpools)
        setDevsShare(data.data.devsshare)
        setCompanyShare(data.data.companyshare)
        setOfficer(data.data.officers)
        setMarketing(data.data.marketing)
        setIncentives(data.data.incentives)
        setUnilevelMg(data.data.unilevelmonstergem)
        setMonstergem(data.data.monstergem)
        setTradepayin(data.data.tradepayin)
        setTrademerchandise(data.data.trademerchandise)
        setComplanpayin(data.data.complanpayin)
        setComplanmerchandise(data.data.complanmerchandise)
        setUnilevel(data.data.unilevelbonus)
        setSponsorWallet(data.data.sponsorwallet)
        setInvestorWallet(data.data.investorfunds)
        setComplantools(data.data.complantools)
        setComplancosmetics(data.data.complancosmetics)
        setMMTToken(data.data.mmt)
        setMCTToken(data.data.mct)
        setSystemfund(data.data.systemfund)
      }
    })

    fetch(`${process.env.REACT_APP_API_URL}token/totaltoken`,{
      credentials: 'include',
    })
    .then(result => result.json())
    .then(data => {
      if(data.message === "success"){
        setTotalMMTToken(data.data)
        setTotalMCTToken(data.data2)
      }
    })
  },[])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}totalusers/subscriptionusers`,{
      credentials: 'include',
    })
    .then(result => result.json())
    .then(data => {
      if(data.message === "success"){
        setPearl(data.data.Pearl?.count)
        setRuby(data.data.Ruby?.count)
        setEmerald(data.data.Emerald?.count)
        setDiamond(data.data.Diamond?.count)
        setTotalSubsUser(data.data?.total.count)
      }
    })
    setComplantotal(complanpayin + complanmerchandise + complancosmetics)
    setTotalTrade(tradepayin + trademerchandise)
  },[complanpayin, complanmerchandise, tradepayin, trademerchandise, complancosmetics])

    return (
      <>
        <MDBContainer fluid>
        <Breadcrumb title='Dashboard' paths={[]}/>
        {/* Cards */}
        <br/>
        <center>
        <MDBTypography tag={`h4`}>This is Effectively Starting '02/08/2024'</MDBTypography>
        </center>
        
        <MDBTypography tag={`h2`}>Topup</MDBTypography>
        <hr/><MDBRow className="my-2">
          <MDBCol lg={4} className="my-2">
            <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Grand Launch Topup`}
              cardtoptext={AutoAndManual  ? AutoAndManual?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }): 0}
              txtsup={``} 
              td1={true}
              td1txttop={ManualPayment ? `${ManualPayment?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} `: "0 "}
              td1txtbot={`Manual`} 
              td2={true}
              td2txttop={autopayment ? `${autopayment?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} `: "0 "}
              td2txtbot={`Automated`} 
              />
          </MDBCol>
          {/* <MDBCol className="my-2">
          <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Soft Launch Topup`}
              cardtoptext={softlaunchtotal  ? softlaunchtotal?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }): 0}
              txtsup={``} 
              td1={true}
              td1txttop={softlaunchmanual ? `${softlaunchmanual?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} `: "0 "}
              td1txtbot={`Manual`} 
              td2={true}
              td2txttop={softlaunchauto ? `${softlaunchauto?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} `: "0 "}
              td2txtbot={`Automated`} 
              />
          </MDBCol> */}
          {/* <MDBCol className="my-2">
          <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Total Sales`}
              cardtoptext={combinetotal  ? combinetotal?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }): 0}
              txtsup={``} 
              td1={true}
              td1txttop={totalmanual ? `${totalmanual?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} `: "0 "}
              td1txtbot={`Manual`} 
              td2={true}
              td2txttop={totalauto ? `${totalauto?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} `: "0 "}
              td2txtbot={`Automated`} 
              />
          </MDBCol> */}
        </MDBRow>
        <br/>
        <MDBTypography tag={`h2`}>Admin</MDBTypography>
        <hr/>
        <MDBRow className="my-2">
          
          <MDBCol lg={4} className="my-2">
            <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Total Admin Fee`}
              cardtoptext={adminfee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              // txtsup={`USDT`} 
              td0={true}
              td0txttop={withdrawalfee ? `${withdrawalfee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              td0txtbot={`Withdrawal Fee`} 
              />
          </MDBCol>
        </MDBRow>
        <br/>
        <MDBTypography tag={`h2`}>Sales</MDBTypography>
        <hr/>
        <MDBRow>
        <MDBCol lg={4} className="my-2">
            <DashCard
              flipbtn={true}
              basicModal={basicModal}
              setBasicModal={setBasicModal}
              distri={totalaccumulated}
              leaderboard={leaderboard}
              grinding={grinding}
              quest={quest}
              colSpan="4"
              icon={`dollar-sign`} 
              thtitle={`Total Subscription`} 
              cardtoptext={totalaccumulated?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              td1={true}
              td1txttop={pearlaccumulated?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              td1txtbot={`Pearl`} 
              td2={true}
              td2txttop={rubyaccumulated?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              td2txtbot={`Ruby`} 
              td3={true}
              td3txttop={emeraldaccumulated?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              td3txtbot={`Emerald`}
              td4={true}
              td4txttop={diamondaccumulated?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              td4txtbot={`Diamond`}
              />
          </MDBCol>
          <MDBCol lg={4} className="my-2">
          <DashCard 
              colSpan="4"
              icon={`shopping-bag`}
              thtitle={`Total Merchandise`}
              cardtoptext={totalmerchandise ? `${totalmerchandise}`: 0}
              td1={true}
              td1txttop={tools}
              td1txtbot={`Tools`} 
              td2={true}
              td2txttop={clock}
              td2txtbot={`Clock`}
              td3={true}
              td3txttop={shop}
              td3txtbot={`Shop`}
              />
          </MDBCol>
          <MDBCol className="col-lg-4 my-2">
            <DashCard 
              colSpan="4"
              icon={`wallet`} 
              thtitle={`Sponsor Wallet`}
              cardtoptext={sponsorwallet?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              />
          </MDBCol>
        </MDBRow>
        <MDBRow>
        <MDBCol className="col-lg-4 my-2">
            <DashCard 
              flipbtn1={true}
              flipbtn1icon={'donate'}
              tokenkind={'MMT'}
              colSpan="4"
              icon={`wallet`} 
              thtitle={`Monster Monies Token Wallet`}
              cardtoptext={mmttoken?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              td0={true}
              td0txttop={totalmmttoken ? `${totalmmttoken.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              td0txtbot={`Total Monster Monies Token`} 
              />
          </MDBCol>
          <MDBCol className="col-lg-4 my-2">
            <DashCard 
              flipbtn1={true}
              flipbtn1icon={'donate'}
              tokenkind={'MCT'}
              colSpan="4"
              icon={`wallet`} 
              thtitle={`Monster Coin Token Wallet`}
              cardtoptext={mcttoken?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              td0={true}
              td0txttop={totalmcttoken ? `${totalmcttoken.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              td0txtbot={`Total Monster Coin Token`} 
              />
          </MDBCol>
        </MDBRow>
        <br/>
        <MDBTypography tag={`h2`}>Payout</MDBTypography>
        <hr/>
        <MDBRow>
        <MDBCol className="my-2">
          <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Total Pay-out`}
              cardtoptext={done || dragondone ? (dragondone  + done)?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              // txtsup={`USDT`}  
              td1={true}
              td1txttop={ request || dragonrequest ? `${(dragonrequest+request)?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: `0`}
              td1txtbot={`Request`} 
              td2={true}
              td2txttop={ processed || dragonprocessed ? `${(dragonprocessed+processed)?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: `0`}
              td2txtbot={`Process`}
              td3={true}
              td3txttop={done || dragondone ? `${(dragondone+done)?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: `0` }
              td3txtbot={`Done`}
              />
          </MDBCol>
        <MDBCol className="my-2">
          <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Total Manual Pay-out`}
              cardtoptext={done ? done?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              // txtsup={`USDT`}  
              td1={true}
              td1txttop={ request ? `${request?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: `0`}
              td1txtbot={`Request`} 
              td2={true}
              td2txttop={ processed? `${processed?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: `0`}
              td2txtbot={`Process`}
              td3={true}
              td3txttop={done ? `${done?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: `0` }
              td3txtbot={`Done`}
              />
          </MDBCol>
        
          <MDBCol className="my-2">
          <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Total Automatic Pay-out`}
              cardtoptext={dragondone ? dragondone?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              // txtsup={`USDT`}  
              td1={true}
              td1txttop={ dragonrequest ? `${dragonrequest?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: `0`}
              td1txtbot={`Request`} 
              td2={true}
              td2txttop={ dragonprocessed? `${dragonprocessed?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: `0`}
              td2txtbot={`Process`}
              td3={true}
              td3txttop={dragondone ? `${dragondone?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: `0` }
              td3txtbot={`Done`}
              />
          </MDBCol>

       
        </MDBRow>
        <MDBTypography tag={`h2`}>Distribution</MDBTypography>
        <hr/>
        <MDBRow>
        <MDBCol className="col-lg-4 my-2">
            <DashCard 
              colSpan="4"
              icon={`clipboard-list`} 
              thtitle={`Player Complan`}
              cardtoptext={complantotal?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              td1={true}
              td1txttop={complanpayin?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              td1txtbot={`Payin`} 
              td2={true}
              td2txttop={complanmerchandise?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              td2txtbot={`Merchandise`}
              td3={true}
              td3txttop={complantools?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              td3txtbot={`Tools`}
              td4={true}
              td4txttop={complancosmetics?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              td4txtbot={`Cosmetics`}
              />
          </MDBCol>
        <MDBCol className="col-lg-4 my-2">
          <DashCard 
              colSpan="4"
              icon={`coins`}
              thtitle={`Unilevel Bonus`}
              cardtoptext={unilevel ? `${unilevel.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              />
        </MDBCol>
        <MDBCol className="col-lg-4 my-2">
          <DashCard 
              colSpan="4"
              icon={`money-bill`}
              thtitle={`Unilevel Monster Gem`}
              cardtoptext={unilevelmonstergem ? `${unilevelmonstergem.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              />
          </MDBCol>

        </MDBRow>
        <MDBTypography tag={`h2`}>Rewards</MDBTypography>
        <MDBRow>
        <MDBCol lg={4} className="my-2">
          <DashCard 
              colSpan="4"
              icon={`gem`}
              thtitle={`Top Earner`}
              cardtoptext={diamondpool ? `${diamondpool.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              />
          </MDBCol>
          <MDBCol lg={4} className="my-2">
          <DashCard 
              colSpan="4"
              icon={`chart-line`}
              thtitle={`Leaderboard`}
              cardtoptext={leaderboard ? `${leaderboard.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              />
          </MDBCol>
        </MDBRow>
        <MDBTypography tag={`h2`}>Grinding</MDBTypography>
        <MDBRow>
        <MDBCol className="my-2">
          <DashCard 
              colSpan="4"
              icon={`gamepad`}
              thtitle={`Grinding / Games`}
              cardtoptext={grinding ? `${grinding.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              />
        </MDBCol>
        <MDBCol className="my-2">
          <DashCard 
              colSpan="4"
              icon={`trophy`}
              thtitle={`Quest Reward`}
              cardtoptext={quest ? `${quest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              />
          </MDBCol>
          <MDBCol className="my-2">
            <DashCard 
                colSpan="3"
                icon={`coins`}
                thtitle={`Monster Gem`}
                cardtoptext={monstergem ? `${monstergem.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
                />
          </MDBCol>
        </MDBRow>
        
        <MDBTypography tag={`h2`}>Shares</MDBTypography>
        <MDBRow>
        <MDBCol className="my-2">
          <DashCard 
              colSpan="4"
              icon={`chalkboard-teacher`}
              thtitle={`Devs Share`}
              cardtoptext={devsshare ? `${devsshare.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              />
          </MDBCol>
          <MDBCol className="my-2">
          <DashCard 
              colSpan="3"
              icon={`building`}
              thtitle={`Company Share`}
              cardtoptext={companyshare ? `${companyshare.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              />
        </MDBCol>
        <MDBCol className="my-2">
          <DashCard 
              colSpan="3"
              icon={`users`}
              thtitle={`Officers`}
              cardtoptext={officer ? `${officer.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              />
        </MDBCol>
        
        </MDBRow>
        <MDBRow>
        <MDBCol className="my-2">
          <DashCard 
              colSpan="3"
              icon={`pen-fancy`}
              thtitle={`Marketing Arm`}
              cardtoptext={marketing ? `${marketing.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              />
        </MDBCol>
        <MDBCol lg={4} className="my-2">
          <DashCard 
              colSpan="3"
              icon={`hand-holding-usd`}
              thtitle={`Investor Fund`}
              cardtoptext={investorwallet ? `${investorwallet.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              />
          </MDBCol>
        <MDBCol className="my-2">
          <DashCard 
              colSpan="3"
              icon={`plane-departure`}
              thtitle={`Travel / Incentives`}
              cardtoptext={incentives ? `${incentives.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              />
        </MDBCol>
        </MDBRow>
        <MDBRow>
        <MDBCol lg={4} className="my-2">
          <DashCard 
              colSpan="3"
              icon={`pen-fancy`}
              thtitle={`System Fund`}
              cardtoptext={systemfund ? `${systemfund.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              />
        </MDBCol>
        </MDBRow>
        </MDBContainer>
    </>  
    )
}

export default AdminDashboardGrandLaunch;