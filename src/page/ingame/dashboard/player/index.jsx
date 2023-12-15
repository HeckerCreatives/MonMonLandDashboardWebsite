import React, {useState, useEffect} from "react";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon, MDBCard, MDBCardBody, MDBTypography,MDBTable, 
  MDBTableHead, 
  MDBTableBody, } from "mdb-react-ui-kit";
import LeaderboardRequirements from "./lbrequirements";
import Dashboardstatistics from "./statistics";
import Breadcrumb from "../../../../component/breadcrumb";
import { useNavigate } from "react-router-dom";
import DiamondPoolRequirements from "./poolrequirements";

const PlayerDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [wallets, setWallets] = useState([]);
    const [paidusers, setPaidUsers] = useState(0);

    // const [totalautopayment, setTotalAutoPayment] = useState([]);
    // const [AutoAndManual, setAutoAndManual] = useState([]);
    // const [autopayment, setAutoPayment] = useState([]);
    // const [totalpaidusers, setTotalPaidUsers] = useState([]);
    const navigate = useNavigate()

    const [request, setRequest] = useState(0)
    const [done, setDone] = useState(0)
    const [processed, setProcessed] = useState(0);
  
    // useEffect(() => {
    //   if (auth) {
    //     if (auth.roleId.display_name !== "SubAdministrator") {
    //       localStorage.removeItem("auth");
    //       navigate("/sessions/login");
    //     }
    //   }
    // }, [auth, navigate]);


  useEffect(()=> {
    fetch(`${process.env.REACT_APP_API_URL}gamewallet/find`, {
      method: "POST",
      credentials: 'include',
      headers:{
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        id: user._id
      })
    })
    .then(result => result.json())
    .then(data => {
      if(data.message === "success"){
        setWallets(data.data)
      }
         
    })
        
  },[]) 


    return (
        <MDBContainer fluid>
        <Breadcrumb title='Dashboard' paths={[]}/>
        {/* Cards */}
        <MDBRow className="my-2">
          <MDBCol className="my-2">
            <Dashboardstatistics 
              colSpan="4"
              icon={`dollar-sign`}
              cardtoptext={'Current Wallet Balance'}
              txtsup={wallets.balance}
              />
          </MDBCol>
          <MDBCol className="my-2">
          <Dashboardstatistics 
              colSpan="4"
              icon={`dollar-sign`}
              cardtoptext={'Total Monster Coin'}
              txtsup={wallets.monstercoin}
              txtsup1='0'
              />
          </MDBCol>
          <MDBCol className="my-2">
          <Dashboardstatistics 
              colSpan="4"
              icon={`dollar-sign`}
              cardtoptext={'Total Monster Gem'}
              txtsup={wallets.monstergem}
              txtsup1='0'
              />
          </MDBCol>
          
        </MDBRow>

        <MDBRow className="my-2">

          <MDBCol md={6} className="my-2">
          <LeaderboardRequirements
            activitypoints={wallets.personalpoints}
            taskpoints={wallets.taskpoints}
            recruitpoints={wallets.recruitpoints}
          />
          </MDBCol>
          <MDBCol md={6} className="my-2">
          <DiamondPoolRequirements
            adspoints={wallets.adspoints}
            purchasepoints={wallets.purchasepoints}
            recruitpoints={wallets.recruitpoints}
          />
          </MDBCol>
          
        </MDBRow>

        <MDBRow className="my-2">

          <MDBCol md={6} className="my-2">
          <MDBCard className="text-mute fw-bold">          
                <MDBCardBody>
                  <MDBTable responsive borderless className="text-mute mb-0">
                
                      <MDBTableBody className="fw-bold">
                          <tr>
                              <td>
                                  Total Points
                              </td>
                              <td>
                              {wallets.totalpoints}
                              </td>
                          </tr>
                      </MDBTableBody>
                  </MDBTable>
                </MDBCardBody>
          </MDBCard>
          </MDBCol>

          <MDBCol md={6} className="my-2">
          <MDBCard className="text-mute fw-bold">          
                <MDBCardBody>
                  <MDBTable responsive borderless className="text-mute mb-0">
                
                      <MDBTableBody className="fw-bold">
                          <tr>
                              <td>
                                  Current Rank
                              </td>
                              <td>
                                  0
                              </td>
                          </tr>
                      </MDBTableBody>
                  </MDBTable>
                </MDBCardBody>
          </MDBCard>
          </MDBCol>
          
        </MDBRow>
        
        

        </MDBContainer>
        
    )
}

export default PlayerDashboard;