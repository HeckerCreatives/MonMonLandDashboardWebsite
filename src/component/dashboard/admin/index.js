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
    const [banusers, setBanUsers] = useState([]);
    const [paidusers, setPaidUsers] = useState([]);
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
              cardtoptext={`1000`}
              txtsup={`USDT`} 
              td1={true}
              td1txttop={`300`}
              td1txtbot={`Ruby`} 
              td2={true}
              td2txttop={`400`}
              td2txtbot={`Emerald`} 
              td3={true}
              td3txttop={`300`}
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
              cardtoptext={`1400`}
              td1={true}
              td1txttop={`300`}
              td1txtbot={`Pearl`} 
              td2={true}
              td2txttop={`400`}
              td2txtbot={`Ruby`} 
              td3={true}
              td3txttop={`350`}
              td3txtbot={`Emerald`}
              td4={true}
              td4txttop={`350`}
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
            />
          </MDBCol>          
        </MDBRow>
        
        

        </MDBContainer>
        
    )
}

export default AdminDashboard;