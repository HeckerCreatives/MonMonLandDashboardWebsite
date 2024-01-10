import React, {useState, useEffect} from "react";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon, MDBCard, MDBCardBody, MDBTypography,MDBTable, 
  MDBTableHead, 
  MDBTableBody, } from "mdb-react-ui-kit";
import LeaderboardRequirements from "./lbrequirements";
import Dashboardstatistics from "./statistics";
import Breadcrumb from "../../../../component/breadcrumb";
import { useNavigate } from "react-router-dom";
import DiamondPoolRequirements from "./poolrequirements";
import { isgamelogin } from "../../../../component/utils";
import ChooseReferrer from "./setreferrer";
import PointDetails from "./pointdetail";
const PlayerDashboard = () => {
    const [wallets, setWallets] = useState([]);
    const [walletscutoff, setWalletsCutOff] = useState([]);
    const [basicModal, setBasicModal] = useState(false);

    useEffect(()=> {
      isgamelogin()
      .then(data => {
        if(!data.referrer) {
          setBasicModal(true)
        }
      })
    },[])


  useEffect(()=> {
    fetch(`${process.env.REACT_APP_API_URL}gamewallet/find`, {
      method: "GET",
      credentials: 'include',
      headers:{
        "Content-Type": 'application/json'
      }
    })
    .then(result => result.json())
    .then(data => {
      if(data.message === "success"){
        setWallets(data.data)
        setWalletsCutOff(data.data2)
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
              cardtoptext={'Total Monster Gem'}
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
            poolstatus={wallets.poolstatus}
            rank={wallets.rank}
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
          <PointDetails
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
                              {walletscutoff.totalpoints?.toLocaleString('en-US', {
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
        
        <ChooseReferrer 
        // setBasicModal={setBasicModal} 
        basicModal={basicModal}/>
        
        </MDBContainer>
    )
}

export default PlayerDashboard;