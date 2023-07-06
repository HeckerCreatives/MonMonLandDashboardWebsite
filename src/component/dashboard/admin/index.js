import React, {useState, useEffect} from "react";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon, MDBCard, MDBCardBody, MDBTypography } from "mdb-react-ui-kit";
import DashCard from "../../cards/dashcard";
import Graph from "../../graph";
import MiniTableList from "../../minitablelist";
import MiniDescription from "../../minidescription";
import FullTable from "../../fulltablelist";
import Breadcrumb from "../../breadcrumb";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
    const [minithtitle, setMiniThTitle] = useState([]),
    [minitdtext, setMiniTdText] = useState([]);
    const auth = JSON.parse(localStorage.getItem("auth"))
    const [viewdetails, setviewdetails] = useState(true)
    const [users, setUsers] = useState([]);
    const [activeusers, setActiveUsers] = useState([]);
    const [inactiveusers, setInActiveUsers] = useState([]);
    const [ruby, setRuby] = useState([]);
    const [emerald, setEmerald] = useState([]);
    const [diamond, setDiamond] = useState([]);
    const [paidusers, setPaidUsers] = useState([]);

    const [totalruby, setTotalRuby] = useState([]);
    const [totalemerald, setTotalEmerald] = useState([]);
    const [totaldiamond, setTotalDiamond] = useState([]);
    const [totalpaidusers, setTotalPaidUsers] = useState([]);
    const navigate = useNavigate()
    
  useEffect(() => {
      if (auth) {
        if (auth.roleId.display_name !== "Administrator") {
          localStorage.removeItem("auth");
          navigate("/sessions/login");
        }
      }
    }, [auth, navigate]);


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

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/findbuyer`)
    .then(result => result.json())
    .then(data => {
      const finaldata = data.filter(e => e.transactionnumber && e.clientusername)
      const ruby = finaldata.filter(e => e.subscriptionlevel?.subscriptionName
      === "Ruby")
      const emerald = finaldata.filter(e => e.subscriptionlevel?.subscriptionName
      === "Emerald")
      const diamond = finaldata.filter(e => e.subscriptionlevel?.subscriptionName
      === "Diamond")  
      setPaidUsers(finaldata)
      setRuby(ruby)
      setEmerald(emerald)
      setDiamond(diamond)
      // console.log(cashier)
    })
  },[])

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
              cardtoptext={totalpaidusers}
              txtsup={`USDT`} 
              td1={true}
              td1txttop={totalruby}
              td1txtbot={`Ruby`} 
              td2={true}
              td2txttop={totalemerald}
              td2txtbot={`Emerald`} 
              td3={true}
              td3txttop={totaldiamond}
              td3txtbot={`Diamond`}
              />
          </MDBCol>
          <MDBCol className="my-2">
          <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Total Pay-out`}
              cardtoptext={`1050`}
              txtsup={`USDT`}  
              td1={true}
              td1txttop={`300`}
              td1txtbot={`Pending`} 
              td2={true}
              td2txttop={`350`}
              td2txtbot={`Approved`} 
              td3={true}
              td3txttop={`400`}
              td3txtbot={`Reject`}
              />
          </MDBCol>
          
        </MDBRow>
        <MDBRow>
        <MDBCol className="my-2">
            <DashCard 
              colSpan="4"
              icon={`user`} 
              thtitle={`Total User`} 
              cardtoptext={paidusers ? paidusers.length : 0}
              td1={true}
              td1txttop={`0`}
              td1txtbot={`Pearl`} 
              td2={true}
              td2txttop={ruby ? ruby.length : 0}
              td2txtbot={`Ruby`} 
              td3={true}
              td3txttop={emerald ? emerald.length : 0}
              td3txtbot={`Emerald`}
              td4={true}
              td4txttop={diamond ? diamond.length : 0}
              td4txtbot={`Diamond`}
              />
          </MDBCol>
          <MDBCol className="my-2">
          <DashCard 
              colSpan="4"
              icon={`user`}
              thtitle={`Total Member`}
              cardtoptext={users ? users.length : 0}
              td1={true}
              td1txttop={activeusers ? activeusers.length : 0}
              td1txtbot={`Active`} 
              td2={true}
              td2txttop={inactiveusers ? inactiveusers.length : 0}
              td2txtbot={`Inactive`}
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

export default AdminDashboard;