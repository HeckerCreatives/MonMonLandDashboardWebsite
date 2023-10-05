import React, {useState, useEffect} from "react";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon, MDBCard, MDBCardBody, MDBTypography } from "mdb-react-ui-kit";
import DashCard from "../../../component/cards/dashcard";
import Graph from "../../../component/graph";
import Breadcrumb from "../../../component/breadcrumb";
import { useNavigate } from "react-router-dom";


const CsrDashboard = () => {
    const [minithtitle, setMiniThTitle] = useState([]),
    [minitdtext, setMiniTdText] = useState([]);
    const auth = JSON.parse(localStorage.getItem("auth"))
    const [viewdetails, setviewdetails] = useState(true)
    const [users, setUsers] = useState([]);
    const [activeusers, setActiveUsers] = useState([]);
    const [inactiveusers, setInActiveUsers] = useState([]);
    const [banusers, setBanUsers] = useState([]);

    const [ruby, setRuby] = useState([]);
    const [emerald, setEmerald] = useState([]);
    const [diamond, setDiamond] = useState([]);
    const [paidusers, setPaidUsers] = useState([]);

    const [totalruby, setTotalRuby] = useState([]);
    const [totalemerald, setTotalEmerald] = useState([]);
    const [totaldiamond, setTotalDiamond] = useState([]);
    const [totalpaidusers, setTotalPaidUsers] = useState([]);
    const navigate = useNavigate()
    
    const [done, setDone] = useState([])
    const [processed, setProcessed] = useState([]);
    const [pendings, setPendings] = useState("");
    const [approved, setApproved] = useState("");

  useEffect(() => {
      if (auth) {
        if (auth.roleId.display_name !== "Agent") {
          localStorage.removeItem("auth");
          navigate("/login");
        }
      }
  }, [auth, navigate]);


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}payout/agentfind`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: "done",
            admin: auth.userName
        })
    }).then(result => result.json())
    .then(data => {
        if(data.message === "success"){
            setDone(data.data)
        }
    })

    fetch(`${process.env.REACT_APP_API_URL}payout/agentfind`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          status: "process",
          admin: auth.userName
      })
  }).then(result => result.json())
  .then(data => {
      if(data.message === "success"){
        setProcessed(data.data)
      }
  })
  },[])

  useEffect(()=>{
    let pending = 0;
    let approve = 0;

    for (let i = 0; i < processed.length; i++) {
      pending += processed[i].amount;
    }

    for (let i = 0; i < done.length; i++) {
      approve += done[i].amount;
    }

    setPendings(pending)
    setApproved(approve)
  },[processed, done])




  useEffect(()=> {
    fetch(`${process.env.REACT_APP_API_URL}user/find`)
    .then(result => result.json())
    .then(data => {
      const active = data.filter(e => e.isVerified === true)
      const inactive = data.filter(e => e.isVerified === false)
      setUsers(data)
      setActiveUsers(active)
      setInActiveUsers(inactive)        
    })    
  },[]) 

  // useEffect(()=>{
  //   fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/findbuyer`)
  //   .then(result => result.json())
  //   .then(data => {
  //     const cashier = data.filter(e => e.cashier === auth.userName)
  //     const ruby = cashier.filter(e => e.subscriptionlevel.subscriptionName
  //     === "Ruby")
  //     const emerald = cashier.filter(e => e.subscriptionlevel.subscriptionName
  //     === "Emerald")
  //     const diamond = cashier.filter(e => e.subscriptionlevel.subscriptionName
  //     === "Diamond")  
  //     setPaidUsers(cashier)
  //     setRuby(ruby)
  //     setEmerald(emerald)
  //     setDiamond(diamond)
  //   })
  // },[])

  useEffect(()=>{
      let totalPrice = 0;
      let rubyPrice = 0;
      let emeraldPrice = 0;
      let diamondPrice = 0;

      for (let i = 0; i < paidusers.length; i++) {
        totalPrice += paidusers[i].price;
      }
      

      for (let i = 0; i < ruby.length; i++) {
        rubyPrice += ruby[i].price;
      }
      

      for (let i = 0; i < emerald.length; i++) {
        emeraldPrice += emerald[i].price;
      }
      

      for (let i = 0; i < diamond.length; i++) {
        diamondPrice += diamond[i].price;
      }
      
      setTotalRuby(rubyPrice)
      setTotalEmerald(emeraldPrice)
      setTotalDiamond(diamondPrice)
      setTotalPaidUsers(totalPrice)
  },[diamond,ruby,emerald,paidusers])
    return (
        <MDBContainer fluid>
        <Breadcrumb title='Dashboard' paths={[]}/>
        {/* Cards */}
        <MDBRow className="my-2">
          <MDBCol className="my-2">
            <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Total Pay-in`}
              cardtoptext={totalpaidusers.toLocaleString()}
              txtsup={`USDT`} 
              td1={true}
              td1txttop={totalruby.toLocaleString()}
              td1txtbot={`Ruby`} 
              td2={true}
              td2txttop={totalemerald.toLocaleString()}
              td2txtbot={`Emerald`} 
              td3={true}
              td3txttop={totaldiamond.toLocaleString()}
              td3txtbot={`Diamond`}
              />
          </MDBCol>
          <MDBCol className="my-2">
          <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Total Pay-out`}
              cardtoptext={approved.toLocaleString()}
              txtsup={`USDT`}  
              td1={true}
              td1txttop={pendings.toLocaleString()}
              td1txtbot={`Pending`} 
              td2={true}
              td2txttop={approved.toLocaleString()}
              td2txtbot={`Approved`}
              />
          </MDBCol>
          
        </MDBRow>
        <MDBRow>
        <MDBCol className="my-2">
            <DashCard 
              colSpan="4"
              icon={`user`} 
              // thtitle={`Total User`} 
              cardtoptext={"Coming Soon"}
              // td1={true}
              // td1txttop={0}
              // // td1txttop={paidusers ? paidusers.length : 0}
              // td1txtbot={`Pearl`} 
              // td2={true}
              // td2txttop={ruby ? ruby.length : 0}
              // td2txtbot={`Ruby`} 
              // td3={true}
              // td3txttop={emerald ? emerald.length : 0}
              // td3txtbot={`Emerald`}
              // td4={true}
              // td4txttop={diamond ? diamond.length : 0}
              // td4txtbot={`Diamond`}
              />
          </MDBCol>
          <MDBCol className="my-2">
          <DashCard 
              colSpan="4"
              icon={`shopping-bag`}
              // thtitle={`Total Member`}
              cardtoptext={"Merchandise Soon"}
              // td1={true}
              // td1txttop={activeusers ? activeusers.length : 0}
              // td1txtbot={`Active`} 
              // td2={true}
              // td2txttop={inactiveusers ? inactiveusers.length : 0}
              // td2txtbot={`Inactive`}
              />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <Graph
              users={users}
              payin={paidusers}
            />
          </MDBCol>          
        </MDBRow>
        
        

        </MDBContainer>
        
    )
}

export default CsrDashboard;