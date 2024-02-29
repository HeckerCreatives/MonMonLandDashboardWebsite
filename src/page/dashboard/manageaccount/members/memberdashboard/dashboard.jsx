import React, {useState, useEffect} from "react";
import { 
    MDBContainer, 
    MDBBtn, 
    MDBRow, 
    MDBCol,
    MDBIcon, 
    MDBCard, 
    MDBCardBody, 
    MDBTypography,
    MDBTable, 
    MDBTableHead,  
    MDBTableBody, } from "mdb-react-ui-kit";
import LeaderboardRequirements from "./lbrequirements";
import Dashboardstatistics from "./statistics";
import DiamondPoolRequirements from "./poolrequirements";
import MemberPointDetails from "./pointdetail";
const MembersDashboard = ({username}) => {
    const [rank, setRank] = useState(0);
    const [wallets, setWallets] = useState([]);
    const [walletscutoff, setWalletsCutOff] = useState([]);


  useEffect(()=> {
    fetch(`${process.env.REACT_APP_API_URL}members/findprofile`, {
      method: "POST",
      credentials: 'include',
      headers:{
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        username: username
      })
    })
    .then(result => result.json())
    .then(data => {
      if(data.message === "success"){
        setWallets(data.data)
        setWalletsCutOff(data.data2)
      }
    })

    fetch(`${process.env.REACT_APP_API_URL}members/getcurrentrank`, {
      method: "POST",
      credentials: 'include',
      headers:{
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        username: username
      })
    })
    .then(result => result.json())
    .then(data => {
      if(data.message === "success"){
        setRank(data.data)
      }
    })
  },[]) 


    return (
        <MDBContainer fluid>
        {/* Cards */}
        <MDBRow className="my-2">
          <MDBCol className="my-2">
            <Dashboardstatistics 
              colSpan="4"
              icon={`dollar-sign`}
              cardtoptext={'Current Wallet Balance'}
              txtsup={wallets.balance?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              />
          </MDBCol>
          <MDBCol className="my-2">
          <Dashboardstatistics 
              colSpan="4"
              icon={`dollar-sign`}
              cardtoptext={'Total Monster Coin'}
              txtsup={wallets.monstercoin?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              txtsup1={wallets.subscriberincome?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              />
          </MDBCol>
          <MDBCol className="my-2">
          <Dashboardstatistics 
              colSpan="4"
              icon={`dollar-sign`}
              cardtoptext={'Monster Gem Commission'}
              txtsup={wallets.monstergemunilevel?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              txtsup1={wallets.monstergemunilevel?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              />
          </MDBCol>
          <MDBCol className="my-2">
          <Dashboardstatistics 
              colSpan="4"
              icon={`dollar-sign`}
              cardtoptext={'Monster Gem Grinding'}
              txtsup={wallets.monstergemfarm?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              txtsup1={wallets.monstergemfarm?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              />
          </MDBCol>
          
        </MDBRow>
        <MDBRow>
        <MDBCol lg={3} className="my-2">
            <Dashboardstatistics 
              colSpan="4"
              // icon={`dollar-sign`}
              cardtoptext={'Monster Monies Token'}
              txtsup={wallets.mmt?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              />
          </MDBCol>
          <MDBCol lg={3} className="my-2">
            <Dashboardstatistics 
              colSpan="4"
              // icon={`dollar-sign`}
              cardtoptext={'Monster Coin Token'}
              txtsup={wallets.mct?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              />
          </MDBCol>
        </MDBRow>
        <MDBRow className="my-2">

          <MDBCol md={4} className="my-2">
          <LeaderboardRequirements
            activitypoints={walletscutoff.activitypoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
            taskpoints={walletscutoff.taskpoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
            recruitpoints={walletscutoff.recruitpoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
            purchasepoints={walletscutoff.purchasepoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
            watchadspoints={walletscutoff.adspoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
          />
          </MDBCol>
          <MDBCol md={4} className="my-2">
          <DiamondPoolRequirements
            rank={wallets.poolrank}
            poolstatus={wallets.poolstatus}
            grouppoints={wallets.grouppoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
            purchasepoints={wallets.purchasepoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
            recruitpoints={wallets.recruitpoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
          />
          </MDBCol>
          <MDBCol md={4} className="my-2">
          <MemberPointDetails
            grouppoints={wallets.grouppoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
            purchasepoints={wallets.purchasepoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
            recruitpoints={wallets.recruitpoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              watchadspoints={wallets.adspoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              activitypoints={wallets.activitypoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
              taskpoints={wallets.taskpoints?.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
              })}
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
                              {wallets.totalpoints?.toLocaleString('en-US', {
                              style: 'decimal',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                              })}
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
                              {walletscutoff.recruitpoints !== 0 ? 
                              <td>
                              {rank}
                              </td>
                                : 
                              <td>
                                1 Direct point required
                              </td>
                                
                              }
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

export default MembersDashboard;