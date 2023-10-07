import React, {useState, useEffect} from "react";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon, MDBCard, MDBCardBody, MDBTypography } from "mdb-react-ui-kit";
import DashCard from "../../../component/cards/dashcard";
import Graph from "../../../component/graph";
import Breadcrumb from "../../../component/breadcrumb";
import { useNavigate } from "react-router-dom";


const CsrDashboard = () => {
    const auth = JSON.parse(localStorage.getItem("auth"))
    const [users, setUsers] = useState([]);
    const [autopayment, setAutoPayment] = useState([]);
    const [paidusers, setPaidUsers] = useState([]);

    const [totalautopayment, setTotalAutoPayment] = useState([]);
    const [AutoAndManual, setAutoAndManual] = useState([]);
    const [totalpaidusers, setTotalPaidUsers] = useState([]);
    const navigate = useNavigate()

    const [request, setRequest] = useState([])
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
    fetch(`${process.env.REACT_APP_API_URL}payout/adminfind`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: "pending"
      })
    }).then(result => result.json())
    .then(data => {
        if(data.message === "success"){
            setRequest(data.data)
        }
    })

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




  // useEffect(()=> {
  //   fetch(`${process.env.REACT_APP_API_URL}user/find`)
  //   .then(result => result.json())
  //   .then(data => {
  //     const active = data.filter(e => e.isVerified === true)
  //     const inactive = data.filter(e => e.isVerified === false)
  //     setUsers(data)
  //     // setActiveUsers(active)
  //     // setInActiveUsers(inactive)        
  //   })    
  // },[]) 

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/findbuyer`)
    .then(result => result.json())
    .then(data => {
      const cashier = data.filter(e => e.cashier === auth.userName)
      setPaidUsers(cashier)
    })

    fetch(`${process.env.REACT_APP_API_URL}coin/find`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({status: "success"})
    })
    .then(result => result.json())
    .then(data => {
      setAutoPayment(data.data)
    })


  },[])

  useEffect(()=>{
      let totalPrice = 0;
      let autoPrice = 0;

      for (let i = 0; i < paidusers.length; i++) {
        totalPrice += paidusers[i].price;
      }
      

      for (let i = 0; i < autopayment.length; i++) {
        autoPrice += autopayment[i].amount;
      }
      
      setTotalAutoPayment(autoPrice)
      setTotalPaidUsers(totalPrice)
      setAutoAndManual(totalPrice + autoPrice)
  },[autopayment,paidusers])

    return (
        <MDBContainer fluid>
        <Breadcrumb title='Dashboard' paths={[]}/>
        {/* Cards */}
        <MDBRow className="my-2">
          <MDBCol className="my-2">
            <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Total Top-Up`}
              cardtoptext={totalpaidusers.toLocaleString()}
              txtsup={`USDT`} 
              td1={true}
              td1txttop={totalpaidusers.toLocaleString()}
              td1txtbot={`Manual`} 
              td2={true}
              td2txttop={"0"}
              td2txtbot={`Automated`} 
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
              td1txttop={request.length}
              td1txtbot={`Request`} 
              td2={true}
              td2txttop={processed.length}
              td2txtbot={`Process`}
              td3={true}
              td3txttop={done.length}
              td3txtbot={`Done`}
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