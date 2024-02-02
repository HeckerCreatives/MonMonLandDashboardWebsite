import { MDBContainer, MDBRow, MDBCol, MDBTypography } from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import DashCard from "../../../../component/cards/dashcard/index"
import { isLogin, logout } from "../../../../component/utils";
import Swal from "sweetalert2";
const Masterdashboard = () => {
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    const [users, setUsers] = useState([]);
    const [unilevel, setUnilevel] = useState(0);
    const navigate = useNavigate()
    const pircint = .30;
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
    const [complantotal, setComplantotal] = useState(0)
    const [role, setrole]= useState('');
    const [name, setname]= useState('');
    const [id, setid]= useState('');

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
        if (role !== "Admin") {
          navigate("/gamelogin");
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
          title: data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
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
          title: data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
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
          title: data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
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
          title: data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            window.location.replace("/login");
          }
        })
      }

      if(data?.data !== null && !data.expired){
        let ap = data?.data[0]?.amount * pircint
        ap = data?.data[0]?.amount - ap
        setAutoPayment(ap)
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
          title: data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            window.location.replace("/login");
          }
        })
      }

      if(data?.data !== null && !data.expired){
        let mp = data?.data[0]?.amount * pircint
        mp = data?.data[0]?.amount - mp
        setManualPayment(mp)
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
          title: data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            
            window.location.replace("/login");
          }
        })
      }

      if(data?.data !== null && !data.expired){
        // let sla = data.data.softlaunchauto * pircint
        // sla = data.data.softlaunchauto - sla

        // let slm = data.data.softlaunchmanual * pircint
        // slm = data.data.softlaunchmanual - slm

        // let slt = data.data.softlaunchtotal * pircint
        // slt = data.data.softlaunchtotal - slt
        
        setSoftLaunchAuto(data.data.softlaunchauto)
        setSoftLaunchManual(data.data.softlaunchmanual)
        setSoftLaunchTotal(data.data.softlaunchtotal)
      }
    })

    // fetch(`${process.env.REACT_APP_API_URL}wallet/totalsalewallet`,{
    //   method: "GET",
    //   credentials: 'include',
    //   headers: {
    //     "Content-Type": "application/json",
    //     // Authorization: `Bearer ${auth?.token}`,
    //   },
    // }).then(result => result.json())
    // .then(data => {
    //   if(data.expired){
    //     Swal.fire({
    //       icon: "error",
    //       title: data.expired,
    //       text: "You Will Redirect to Login",
    //       allowOutsideClick: false,
    //       allowEscapeKey: false
    //     }).then(ok => {
    //       if(ok.isConfirmed){
            
    //         window.location.replace("/login");
    //       }
    //     })
    //   }

    //   if(data?.data !== null && !data.expired){
    //     // let ta = data.data.totalauto * pircint
    //     // ta = data.data.totalauto - ta
    //     // let tm = data.data.totalmanual * pircint
    //     // tm = data.data.totalmanual - tm
    //     // let ct = data.data.combinetotal * pircint
    //     // ct = data.data.combinetotal - ct
        
    //   }
    // })

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
          title: data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            
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
          title: data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            
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
      },
      body: JSON.stringify({subsname: "ruby"})
    })
    .then(result => result.json())
    .then(data => {
      if(data.expired){
        Swal.fire({
          icon: "error",
          title: data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            
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
      },
      body: JSON.stringify({subsname: "emerald"})
    })
    .then(result => result.json())
    .then(data => {
      if(data.expired){
        Swal.fire({
          icon: "error",
          title: data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            
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
          title: data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            
            window.location.replace("/login");
          }
        })
      }

      setDiamondAccumulated(data.data)

      
    })


    const total =  pearlaccumulated + rubyaccumulated + emeraldaccumulated + diamondaccumulated
    setTotalAccumulated(total)
    const ta = softlaunchauto +  autopayment
    const tm = ManualPayment + softlaunchmanual
    const ct = AutoAndManual + softlaunchtotal
    
    setTotalAuto(ta)
    setTotalManual(tm)
    setCombineTotal(ct)
  },[AutoAndManual , softlaunchtotal, ManualPayment , softlaunchmanual, softlaunchauto , autopayment, pearlaccumulated, rubyaccumulated, emeraldaccumulated,diamondaccumulated])

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
          title: data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            
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
          title: data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            
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
          title: data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
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
          title: data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            
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
      },
    })
    .then(result => result.json())
    .then(data => {

      if(data.expired){
        Swal.fire({
          icon: "error",
          title: data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            
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
        const lb = data.data.leaderboard - (data.data.leaderboard * pircint)
        const gd = data.data.grinding - (data.data.grinding * pircint)
        const qst = data.data.quest - (data.data.quest * pircint)
        const dp = data.data.diamondpools - (data.data.diamondpools * pircint)
        const dv = data.data.devsshare - (data.data.devsshare * pircint)
        const cs = data.data.companyshare - (data.data.companyshare * pircint)
        const ofcr = data.data.officers - (data.data.officers * pircint)
        const mrkt = data.data.marketing - (data.data.marketing * pircint)
        const inct = data.data.incentives - (data.data.incentives * pircint)
        const unimg = data.data.unilevelmonstergem - (data.data.unilevelmonstergem * pircint)
        const mg = data.data.monstergem - (data.data.monstergem - pircint)
        const tp = data.data.tradepayin - (data.data.tradepayin * pircint)
        const tm = data.data.trademerchandise - (data.data.trademerchandise * pircint)
        const cp = data.data.complanpayin - (data.data.complanpayin * pircint)
        const cm = data.data.complanmerchandise - (data.data.complanmerchandise * pircint)
        const unilvl = data.data.unilevelbonus - (data.data.unilevelbonus * pircint)
        const sprw = data.data.sponsorwallet - (data.data.sponsorwallet * pircint)
        const invw = data.data.investorfunds - (data.data.investorfunds * pircint)
        setLeaderboard(lb)
        setGrinding(gd)
        setQuest(qst)
        setDiamondPool(dp)
        setDevsShare(dv)
        setCompanyShare(cs)
        setOfficer(ofcr)
        setMarketing(mrkt)
        setIncentives(inct)
        setUnilevelMg(unimg)
        setMonstergem(mg)
        setTradepayin(tp)
        setTrademerchandise(tm)
        setComplanpayin(cp)
        setComplanmerchandise(cm)
        setUnilevel(unilvl)
        setSponsorWallet(sprw)
        setInvestorWallet(invw)
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
    setComplantotal(complanpayin + complanmerchandise)
    setTotalTrade(tradepayin + trademerchandise)
  },[complanpayin, complanmerchandise, tradepayin, trademerchandise])
    return(
        <MDBContainer fluid>
        {/* Cards */}
        <br/>
        <MDBTypography tag={`h2`}>Income Wallets</MDBTypography>
        <hr/><MDBRow className="my-2">
          <MDBCol className="my-2">
            <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Grand Launch Sales`}
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
          <MDBCol className="my-2">
          <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Soft Launch Sales`}
              cardtoptext={softlaunchtotal  ? softlaunchtotal?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }): 0}
              txtsup={``} 
              td1={true}
              td1txttop={softlaunchmanual ? `${softlaunchmanual?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} `: "0 "}
              td1txtbot={`Manual`} 
              td2={true}
              td2txttop={softlaunchauto ? `${softlaunchauto?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} `: "0 "}
              td2txtbot={`Automated`} 
              />
          </MDBCol>
          <MDBCol className="my-2">
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
          </MDBCol>
        </MDBRow>
        <MDBRow className="my-2">
          {/* <MDBCol className="my-2">
            <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Total Sales`}
              cardtoptext={AutoAndManual  ? AutoAndManual?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }): 0}
              txtsup={``} 
              td1={true}
              td1txttop={ManualPayment ? `${ManualPayment?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} `: "0 "}
              td1txtbot={`Manual`} 
              td2={true}
              td2txttop={autopayment ? `${autopayment?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} `: "0 "}
              td2txtbot={`Automated`} 
              />
          </MDBCol> */}
          <MDBCol className="my-2">
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
          <MDBCol className="my-2">
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
          <MDBCol className="my-2">
            <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Total Admin Fee`}
              cardtoptext={adminfee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            //   txtsup={`USDT`} 
              td0={true}
              td0txttop={withdrawalfee ? `${withdrawalfee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              td0txtbot={`Withdrawal Fee`} 
              />
          </MDBCol>
        </MDBRow>
        <MDBRow>
        
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
              thtitle={`Total Dragon Pay-out`}
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
        <br/>
        <MDBTypography tag={`h2`}>Products</MDBTypography>
        <hr/>
        <MDBRow>
        <MDBCol className="col-lg-4 my-2">
            <DashCard 
              colSpan="4"
              icon={`user`} 
              thtitle={`Subscription User`} 
              cardtoptext={totalsubsuser}
              td1={true}
              td1txttop={pearl ? pearl : 0 }
              td1txtbot={`Pearl`} 
              td2={true}
              td2txttop={ruby ? ruby : 0}
              td2txtbot={`Ruby`} 
              td3={true}
              td3txttop={emerald ? emerald : 0}
              td3txtbot={`Emerald`}
              td4={true}
              td4txttop={diamond ? diamond : 0}
              td4txtbot={`Diamond`}
              />
          </MDBCol>
          {/* <MDBCol className="col-lg-4 my-2">
            <DashCard 
              colSpan="4"
              icon={`chart-line`} 
              thtitle={`Trade`}
              cardtoptext={totaltrade?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              td1={true}
              td1txttop={tradepayin?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              td1txtbot={`Payin`} 
              td2={true}
              td2txttop={trademerchandise?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              td2txtbot={`Merchandise`}
              />
          </MDBCol> */}
          {/* <MDBCol className="col-lg-4 my-2">
            <DashCard 
              colSpan="4"
              icon={`clipboard-list`} 
              thtitle={`Complan`}
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
              />
          </MDBCol> */}
        </MDBRow>
        <MDBRow>
        {/* <MDBCol className="col-lg-4 my-2">
            <DashCard 
              colSpan="4"
              icon={`wallet`} 
              thtitle={`Sponsor Wallet`}
              cardtoptext={sponsorwallet?.toLocaleString('en-US', {
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
              />
          </MDBCol> */}
        </MDBRow>
        <br/>
        <MDBTypography tag={`h2`}>Complan</MDBTypography>
        <hr/>
        <MDBRow>
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
          <MDBCol className="my-2">
          <DashCard 
              colSpan="4"
              icon={`chart-line`}
              thtitle={`Leaderboard`}
              cardtoptext={leaderboard ? `${leaderboard.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              />
          </MDBCol>
          
        </MDBRow>
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
              colSpan="4"
              icon={`gem`}
              thtitle={`Diamond Pools`}
              cardtoptext={diamondpool ? `${diamondpool.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              />
          </MDBCol>
          
        </MDBRow>
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
          <MDBCol className="my-2">
          <DashCard 
              colSpan="3"
              icon={`plane-departure`}
              thtitle={`Travel / Incentives`}
              cardtoptext={incentives ? `${incentives.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
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
        <MDBRow>
        <MDBCol lg={4} className="my-2">
          <DashCard 
              colSpan="3"
              icon={`hand-holding-usd`}
              thtitle={`Investor Fund`}
              cardtoptext={investorwallet ? `${investorwallet.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              />
          </MDBCol>  
          {/* <MDBCol className="my-2">
          <DashCard 
              colSpan="3"
              icon={`plane-departure`}
              thtitle={`Travel / Incentives`}
              cardtoptext={incentives ? `${incentives.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              />
          </MDBCol> 
          <MDBCol className="my-2">
          <DashCard 
              colSpan="3"
              icon={`coins`}
              thtitle={`Monster Gem`}
              cardtoptext={monstergem ? `${monstergem.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              />
          </MDBCol> */}
        </MDBRow>
        </MDBContainer>
    )
}

export default Masterdashboard;