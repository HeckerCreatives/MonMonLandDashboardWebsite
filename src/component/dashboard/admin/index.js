import React, {useState, useEffect} from "react";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon, } from "mdb-react-ui-kit";
import DashCard from "../../cards/dashcard";
import Graph from "../../graph";
import MiniTableList from "../../minitablelist";
import MiniDescription from "../../minidescription";
import FullTable from "../../fulltablelist";
import Breadcrumb from "../../breadcrumb";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
    const auth = JSON.parse(localStorage.getItem("auth"))
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    const [users, setUsers] = useState([]);
    const [unilevel, setUnilevel] = useState(0);
    const navigate = useNavigate()
    
    const [request, setRequest] = useState(0);
    const [processed, setProcessed] = useState(0);
    const [done, setDone] = useState(0);
    const [autopayment, setAutoPayment] = useState(0);
    const [AutoAndManual, setAutoAndManual] = useState(0);
    const [ManualPayment, setManualPayment] = useState(0);

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
    const [totalmerchandise, setTotalMerchandise] = useState(0);

    const [adminfee, setAdminFee] = useState(0);
  useEffect(() => {
    if (auth) {
      if (auth.roleId.display_name !== "Administrator") {
        localStorage.removeItem("auth");
        navigate("/sessions/login");
      }
    }
  }, [auth, navigate]);
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}payout/payoutwallet`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        adminId: auth._id,
        name: "request"
      })
    }).then(result => result.json())
    .then(data => {
        if(data.message === "success"){
            setRequest(data?.data[0]?.amount)
        }
    })

    fetch(`${process.env.REACT_APP_API_URL}payout/payoutwallet`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        adminId: auth._id,
        name: "process"
      })
    }).then(result => result.json())
    .then(data => {
        if(data.message === "success"){
            setProcessed(data?.data[0]?.amount)
        }
    })

    fetch(`${process.env.REACT_APP_API_URL}payout/payoutwallet`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        adminId: auth._id,
        name: "done"
      })
    }).then(result => result.json())
    .then(data => {
        if(data.message === "success"){
            setDone(data?.data[0]?.amount)
        }
    })

    fetch(`${process.env.REACT_APP_API_URL}coin/topupwallet`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "automatic"
      })
    }).then(result => result.json())
    .then(data => {
      
      if(data?.data !== null){
        setAutoPayment(data?.data[0]?.amount)
      }
      
    })
    fetch(`${process.env.REACT_APP_API_URL}coin/topupwallet`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "manual"
      })
    }).then(result => result.json())
    .then(data => {
      setManualPayment(data?.data[0]?.amount)
    })
    const total = autopayment ? autopayment + ManualPayment : 0 + ManualPayment
    setAutoAndManual(total)
  },[autopayment, ManualPayment])


  useEffect(()=> {
    fetch(`${process.env.REACT_APP_API_URL}user/find`)
    .then(result => result.json())
    .then(data => {
      const active = data.filter(e => e.isVerified === true)
      const inactive = data.filter(e => e.isVerified === false)
      setUsers(data)
      // setActiveUsers(active)
      // setInActiveUsers(inactive)        
    })    
  },[]) 

  useEffect(()=> {
    const total = pearl + ruby + emerald + diamond
    setTotalSubsUser(total)
    fetch(`${process.env.REACT_APP_API_URL}subsuser/find`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({subsname: "pearl"})
    })
    .then(result => result.json())
    .then(data => {
      setPearl(data.data)
    })
    fetch(`${process.env.REACT_APP_API_URL}subsuser/find`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({subsname: "ruby"})
    })
    .then(result => result.json())
    .then(data => {
      setRuby(data.data)
    })
    fetch(`${process.env.REACT_APP_API_URL}subsuser/find`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({subsname: "emerald"})
    })
    .then(result => result.json())
    .then(data => {
      setEmerald(data.data)
    })
    fetch(`${process.env.REACT_APP_API_URL}subsuser/find`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({subsname: "diamond"})
    })
    .then(result => result.json())
    .then(data => {
      setDiamond(data.data)
    })
  },[ruby,pearl,emerald,diamond])

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}subsaccu/find`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({subsname: "pearl"})
    })
    .then(result => result.json())
    .then(data => {
      setPearlAccumulated(data.data)
    })
    fetch(`${process.env.REACT_APP_API_URL}subsaccu/find`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({subsname: "ruby"})
    })
    .then(result => result.json())
    .then(data => {
      setRubyAccumulated(data.data)
    })
    fetch(`${process.env.REACT_APP_API_URL}subsaccu/find`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({subsname: "emerald"})
    })
    .then(result => result.json())
    .then(data => {
      setEmeraldAccumulated(data.data)
    })
    fetch(`${process.env.REACT_APP_API_URL}subsaccu/find`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({subsname: "diamond"})
    })
    .then(result => result.json())
    .then(data => {
      setDiamondAccumulated(data.data)
    })

    const total =  pearlaccumulated + rubyaccumulated + emeraldaccumulated + diamondaccumulated
    setTotalAccumulated(total)
  },[pearlaccumulated, rubyaccumulated, emeraldaccumulated,diamondaccumulated])

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}merchandise/find`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({item: "tools"})
    })
    .then(result => result.json())
    .then(data => {
      setTools(data.data)
    })
    fetch(`${process.env.REACT_APP_API_URL}merchandise/find`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({item: "clock"})
    })
    .then(result => result.json())
    .then(data => {
      setClock(data.data)
    })
    const total = tools + clock
    setTotalMerchandise(total)
  },[tools,clock])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/adminfee`)
    .then(result => result.json())
    .then(data => {
      setAdminFee(data.data)
    })

    fetch(`${process.env.REACT_APP_API_URL}wallet/find`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id: auth._id})
    })
    .then(result => result.json())
    .then(data => {
        setUnilevel(data?.data[0]?.commission)
    })
  })
    return (
      <>
        <MDBContainer fluid>
        <Breadcrumb title='Dashboard' paths={[]}/>
        {/* Cards */}
        <MDBRow className="my-2">
          <MDBCol className="my-2">
            <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Total Top-Up`}
              cardtoptext={AutoAndManual  ? AutoAndManual?.toLocaleString(): 0}
              txtsup={`USDT`} 
              td1={true}
              td1txttop={ManualPayment ? `${ManualPayment?.toLocaleString()} USDT`: "0 USDT"}
              td1txtbot={`Manual`} 
              td2={true}
              td2txttop={autopayment ? `${autopayment?.toLocaleString()} USDT`: "0 USDT"}
              td2txtbot={`Automated`} 
              />
          </MDBCol>
          <MDBCol className="my-2">
            <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Total Admin Fee`}
              cardtoptext={adminfee}
              txtsup={`USDT`} 
              />
          </MDBCol>
          <MDBCol className="my-2">
          <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Total Pay-out`}
              cardtoptext={done ? done?.toLocaleString() : 0}
              txtsup={`USDT`}  
              td1={true}
              td1txttop={ request ? `${request?.toLocaleString()} USDT`: `0 USDT`}
              td1txtbot={`Request`} 
              td2={true}
              td2txttop={ processed? `${processed?.toLocaleString()} USDT`: `0 USDT`}
              td2txtbot={`Process`}
              td3={true}
              td3txttop={done ? `${done?.toLocaleString()} USDT`: `0 USDT` }
              td3txtbot={`Done`}
              />
          </MDBCol>
          
        </MDBRow>
        <MDBRow>
        <MDBCol className="my-2">
            <DashCard 
              colSpan="4"
              icon={`user`} 
              thtitle={`Subscription User`} 
              cardtoptext={totalsubsuser}
              td1={true}
              td1txttop={pearl}
              td1txtbot={`Pearl`} 
              td2={true}
              td2txttop={ruby}
              td2txtbot={`Ruby`} 
              td3={true}
              td3txttop={emerald}
              td3txtbot={`Emerald`}
              td4={true}
              td4txttop={diamond}
              td4txtbot={`Diamond`}
              />
          </MDBCol>
          <MDBCol className="my-2">
            <DashCard
              flipbtn={true}
              basicModal={basicModal}
              setBasicModal={setBasicModal}
              distri={totalaccumulated}
              colSpan="4"
              icon={`dollar-sign`} 
              thtitle={`Subscription Accumulated`} 
              cardtoptext={totalaccumulated}
              td1={true}
              td1txttop={pearlaccumulated}
              td1txtbot={`Pearl`} 
              td2={true}
              td2txttop={rubyaccumulated}
              td2txtbot={`Ruby`} 
              td3={true}
              td3txttop={emeraldaccumulated}
              td3txtbot={`Emerald`}
              td4={true}
              td4txttop={diamondaccumulated}
              td4txtbot={`Diamond`}
              />
          </MDBCol>
          <MDBCol className="my-2">
          <DashCard 
              colSpan="4"
              icon={`shopping-bag`}
              thtitle={`Merchandise`}
              cardtoptext={totalmerchandise ? `${totalmerchandise}`: 0}
              td1={true}
              td1txttop={tools}
              td1txtbot={`Tools`} 
              td2={true}
              td2txttop={clock}
              td2txtbot={`Clock`}
              />
          </MDBCol>
          
        </MDBRow>
        <MDBRow>
         <MDBCol className="col-lg-4 my-2">
          <DashCard 
              colSpan="4"
              icon={`coins`}
              thtitle={`Unilevel Bonus`}
              cardtoptext={unilevel ? `${unilevel}`: 0}
              />
          </MDBCol>         
        </MDBRow>
        </MDBContainer>
    </>  
    )
}

export default AdminDashboard;