import React, {useState, useEffect} from "react";
import 
{   MDBContainer, 
    MDBBtn, 
    MDBRow, 
    MDBCol,
    MDBIcon, 
    MDBCard, 
    MDBCardBody,
    MDBTypography, 
    MDBCardText,
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter, } 
from "mdb-react-ui-kit";

const DashCard = ({txtsup, icon, cardtoptext, colSpan, thtitle, td1, td1txttop, td1txtbot, td2, td2txttop, td2txtbot,td3, td3txttop, td3txtbot, td4, td4txttop, td4txtbot, td0, td0txttop, td0txtbot, flipbtn, basicModal, setBasicModal, tokenkind, flipbtn1, flipbtn1icon, ismasteradmin}) => {
  const [mmttoken, setMmtToken] = useState([])
  const [mcttoken, setMctToken] = useState([])
  const [basicModal1, setBasicModal1] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}token/totaltokenpertype`,{
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      }
    }).then(result => result.json())
    .then(data => {
      if(data.message == "success"){
        setMmtToken(data.data)
        setMctToken(data.data2)
      }
    })
  },[])

return(
    <>
    <MDBCard className="text-center text-light fw-bold" style={{background: "linear-gradient(to right, #fd9566 , #feb697)"}}>          
          <MDBCardBody>
          { flipbtn &&
            <div className="d-flex justify-content-end">
                <MDBBtn onClick={() => setBasicModal(true)}>
                <MDBIcon fas icon="book-open" size="2x"/>
                </MDBBtn>
            </div>
          }
          { flipbtn1 &&
            <div className="d-flex justify-content-end">
                <MDBBtn onClick={() => setBasicModal1(!basicModal1)}>
                <MDBIcon fas icon={flipbtn1icon} size="2x"/>
                </MDBBtn>
            </div>
          }
          <div className="mt-2">
          <MDBIcon size="3x" icon={icon} color="white"></MDBIcon>          
          </div>
          <MDBCardText style={{fontSize: "50px"}} className="mb-0">
            {cardtoptext}
            &nbsp;{txtsup}
         </MDBCardText>
          <MDBTable responsive borderless className="text-light mb-0">
                <MDBTableHead >
                    <tr>
                    <th className="fw-bold" colSpan={colSpan} scope='col'>{thtitle}</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="fw-bold">
                    <tr>
                    {td0 && 
                    <td style={{borderTop:"1px solid",}}>                    
                    <div>{td0txttop}
                    </div>
                    <div>{td0txtbot}</div>
                    </td>
                    } 
                    {td1 && 
                    <td style={{borderTop:"1px solid", borderRight: "1px solid"}}>                    
                    <div>{td1txttop}
                    </div>
                    <div>{td1txtbot}</div>
                    </td>
                    }                   
                    {td2 && 
                    <td style={{borderTop: "1px solid",}}>
                    <div>{td2txttop}
                    </div>
                    <div>{td2txtbot}</div>
                    </td>
                    }                   
                    {td3 && 
                    <td style={{borderTop: "1px solid", borderLeft: "1px solid"}}>
                    <div>{td3txttop}
                    </div>
                    <div>{td3txtbot}</div>
                    </td>
                    }                   
                    {td4 && 
                    <td style={{borderTop: "1px solid", borderLeft: "1px solid"}}>
                    <div>{td4txttop}
                    </div>
                    <div>{td4txtbot}</div>
                    </td>
                    }                   
                    </tr>
                </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
    </MDBCard>

      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Distribution</MDBModalTitle>
              {/* <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn> */}
            </MDBModalHeader>
            <MDBModalBody>
            <MDBTable hover bordered small responsive className="text-center mb-0">
                <MDBTableHead >
                    <tr>
                    <th className="fw-bold" scope='col'>Particular</th>
                    <th className="fw-bold" scope='col'>Complan 
                    </th>

                    <th className="fw-bold" scope='col'>Leaderboard
                    </th>

                    <th className="fw-bold" scope='col'>Grinding / Games
                    </th>

                    <th className="fw-bold" scope='col'>Quest Reward</th>

                    <th className="fw-bold" scope='col'>Top Earner Rewards</th>
                    
                    <th className="fw-bold" scope='col'>Developer Share</th>

                    <th className="fw-bold" scope='col'>Company Share</th>

                    <th className="fw-bold" scope='col'>Officers</th>

                    <th className="fw-bold" scope='col'>Marketing Arm</th>

                    <th className="fw-bold" scope='col'>Travel / Special Incentives</th>
                    <th className="fw-bold" scope='col'>Monster Gem</th>
                    <th className="fw-bold" scope='col'>Investor Fund</th>
                    <th className="fw-bold" scope='col'>System Fund</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="text-center">
                    <tr>
                     <td className="fw-bold text-warning">
                        Payin
                     </td>
                     <td>
                     40%  {/* complan */}
                     </td>
                     <td>
                     0% {/* leaderboard */}
                     </td>
                     <td>
                     20% {/* grinding */}
                     </td>
                     <td>
                     0% {/* 0% quest */}
                     </td>
                     <td>
                     5% {/* 1% diamond pool/top earner */}
                     </td>
                     <td>
                     5% {/*  dev share */}
                     </td>
                     <td>
                     2% {/* company share */}
                     </td>
                     <td>
                     15% {/* officers */}
                     </td>
                     <td>
                     3% {/* marketing arm */}
                     </td>
                     <td>
                     5% {/* incentives */}
                     </td>  
                     <td>
                     0% {/* monster gem */}
                     </td> 
                     <td>
                     2% {/* investor fund */}
                     </td> 
                     <td>
                     3% {/* system fund */}
                     </td>  
                    </tr>
                    <tr>
                     <td className="fw-bold text-warning">
                        Merchandise
                     </td>
                     <td>
                     19% {/* complan */}
                     </td>
                     <td>
                     2% {/* leaderboard */}
                     </td>
                     <td>
                     20% {/* grinding */}
                     </td>
                     <td>
                     0% {/* 0% quest */}
                     </td>
                     <td>
                     1% {/* 1% diamond pool/top earner */}
                     </td>
                     <td>
                     5% {/*  dev share */}
                     </td>
                     <td>
                     2% {/* company share */}
                     </td>
                     <td>
                     5% {/* officers */}
                     </td>
                     <td>
                      1% {/* marketing arm */}
                     </td>
                     <td>
                      2% {/* incentives */}
                     </td> 
                     <td>
                      40% {/* monster gem */}
                     </td> 
                     <td>
                     1% {/* investor fund */}
                     </td>  
                     <td>
                     2% {/* system fund */}
                     </td>   
                    </tr>
                    <tr>
                     <td className="fw-bold text-warning">
                        Tools
                     </td>
                     <td>
                     19% {/* complan */}
                     </td>
                     <td>
                     2% {/* leaderboard */}
                     </td>
                     <td>
                     20% {/* grinding */}
                     </td>
                     <td>
                     0% {/* 0% quest */}
                     </td>
                     <td>
                     1% {/* 1% diamond pool/top earner */}
                     </td>
                     <td>
                     5% {/*  dev share */}
                     </td>
                     <td>
                     2% {/* company share */}
                     </td>
                     <td>
                     5% {/* officers */}
                     </td>
                     <td>
                      1% {/* marketing arm */}
                     </td>
                     <td>
                      2% {/* incentives */}
                     </td> 
                     <td>
                      40% {/* monster gem */}
                     </td> 
                     <td>
                     1% {/* investor fund */}
                     </td>  
                     <td>
                     2% {/* system fund */}
                     </td>    
                    </tr>
                    <tr>
                     <td className="fw-bold text-warning">
                        Shop
                     </td>
                     {/* <td>
                     17%
                     </td>
                     <td>
                     3%
                     </td>
                     <td>
                     15%
                     </td>
                     <td>
                     0%
                     </td>
                     <td>
                     3%
                     </td>
                     <td>
                     5%
                     </td>
                     <td>
                     5%
                     </td>
                     <td>
                     10%
                     </td>
                     <td>
                      1%
                     </td>
                     <td>
                      1%
                     </td> 
                     <td>
                      40%
                     </td> 
                     <td>
                     0%
                     </td>        */}
                     <td>
                     19% {/* complan */}
                     </td>
                     <td>
                     2% {/* leaderboard */}
                     </td>
                     <td>
                     20% {/* grinding */}
                     </td>
                     <td>
                     0% {/* 0% quest */}
                     </td>
                     <td>
                     1% {/* 1% diamond pool/top earner */}
                     </td>
                     <td>
                     5% {/*  dev share */}
                     </td>
                     <td>
                     2% {/* company share */}
                     </td>
                     <td>
                     5% {/* officers */}
                     </td>
                     <td>
                      1% {/* marketing arm */}
                     </td>
                     <td>
                      2% {/* incentives */}
                     </td> 
                     <td>
                      40% {/* monster gem */}
                     </td> 
                     <td>
                     1% {/* investor fund */}
                     </td>  
                     <td>
                     2% {/* system fund */}
                     </td>  
                    </tr>
                    <tr>
                     <td className="fw-bold text-warning">
                        Ads
                     </td>
                     <td>
                     0% {/* complan */}
                     </td>
                     <td>
                     0% {/* leaderboard */}
                     </td>
                     <td>
                     35% {/* grinding */}
                     </td>
                     <td>
                     0%  {/* 0% quest */}
                     </td>
                     <td>
                     0% {/* 1% diamond pool/top earner */}
                     </td>
                     <td>
                     5% {/*  dev share */}
                     </td>
                     <td>
                     3% {/* company share */}
                     </td>
                     <td>
                     10% {/* officers */}
                     </td>
                     <td>
                      1% {/* marketing arm */}
                     </td>
                     <td>
                      1% {/* incentives */}
                     </td>  
                     <td>
                       35% {/* monster gem */}
                     </td> 
                     <td>
                       10% {/* investor fund */}
                     </td>       
                    </tr>
                    {/* <tr>
                     <td className="fw-bold text-warning">
                      Trade
                     </td>
                     <td>
                     0%
                     </td>
                     <td>
                     4%
                     </td>
                     <td>
                     40%
                     </td>
                     <td>
                     0%
                     </td>
                     <td>
                     5%
                     </td>
                     <td>
                     4%
                     </td>
                     <td>
                     3%
                     </td>
                     <td>
                     0%
                     </td>
                     <td>
                      0%
                     </td>
                     <td>
                      4%
                     </td>   
                     <td>
                       40%
                     </td> 
                     <td>
                       0%
                     </td>      
                    </tr> */}
                </MDBTableBody>
            </MDBTable>
            </MDBModalBody>
            <MDBModalFooter>
              {/* <MDBBtn color='secondary' onClick={}>
                Close
              </MDBBtn> */}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal show={basicModal1} setShow={setBasicModal1} tabIndex='-1'>
        <MDBModalDialog size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Token Distribution</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
            <MDBTable hover bordered small responsive className="text-center mb-0">
                <MDBTableHead >
                    <tr>
                    <th className="fw-bold" scope='col'>Token Name</th>
                    <th className="fw-bold" scope='col'>Wallet Balance</th>
                    <th className="fw-bold" scope='col'>Monster Gem</th>
                    <th className="fw-bold" scope='col'>BNB</th>
                    <th className="fw-bold" scope='col'>USDT</th>
                    <th className="fw-bold" scope='col'>BUSD</th>
                    <th className="fw-bold" scope='col'>USDC</th>
                    <th className="fw-bold" scope='col'>XRP</th>
                    <th className="fw-bold" scope='col'>DOGE</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="text-center">
                  {/* for masteradmin */}
                  {
                  tokenkind == "MMT" && ismasteradmin &&
                  <tr>
                      <th>Monster Monies Token</th>
                      <td>${mmttoken.walletbalance != undefined ? (mmttoken.walletbalance - (mmttoken.walletbalance * .30))?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }) : 0}</td>
                      <td>${mmttoken.monstergem != undefined ? (mmttoken.monstergem - (mmttoken.monstergem * .30))?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                      <td>${mmttoken.bnb != undefined ? (mmttoken.bnb - (mmttoken.bnb * .30))?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                      <td>${mmttoken.usdt != undefined ? (mmttoken.usdt - (mmttoken.usdt * .30))?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                      <td>${mmttoken.busd != undefined ? (mmttoken.busd - (mmttoken.busd * .30))?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }) : 0}</td>
                      <td>${mmttoken.usdc != undefined ? (mmttoken.usdc - (mmttoken.usdc * .30))?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                      <td>${mmttoken.xrp != undefined ? (mmttoken.xrp - (mmttoken.xrp * .30))?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                      <td>${mmttoken.doge != undefined ? (mmttoken.doge - (mmttoken.doge * .30))?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                  </tr>
                  }
                  {
                  tokenkind == "MCT" && ismasteradmin &&
                  <tr>
                      <th>Monster Monies Token</th>
                      <td>${mcttoken.walletbalance != undefined ? (mcttoken.walletbalance - (mcttoken.walletbalance * .30))?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }) : 0}</td>
                      <td>${mcttoken.monstergem != undefined ? (mcttoken.monstergem - (mcttoken.monstergem * .30))?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                      <td>${mcttoken.bnb != undefined ? (mcttoken.bnb - (mcttoken.bnb * .30))?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                      <td>${mcttoken.usdt != undefined ? (mcttoken.usdt - (mcttoken.usdt * .30))?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                      <td>${mcttoken.busd != undefined ? (mcttoken.busd - (mcttoken.busd * .30))?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }) : 0}</td>
                      <td>${mcttoken.usdc != undefined ? (mcttoken.usdc - (mcttoken.usdc * .30))?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                      <td>${mcttoken.xrp != undefined ? (mcttoken.xrp - (mcttoken.xrp * .30))?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                      <td>${mcttoken.doge != undefined ? (mcttoken.doge - (mcttoken.doge * .30))?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                  </tr>
                  }
                  {/* end of masteradmin */}
                {
                  tokenkind == "MMT" && !ismasteradmin &&
                  <tr>
                      <th>Monster Monies Token</th>
                      <td>${mmttoken.walletbalance != undefined ? mmttoken.walletbalance?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }) : 0}</td>
                      <td>${mmttoken.monstergem != undefined ? mmttoken.monstergem?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                      <td>${mmttoken.bnb != undefined ? mmttoken.bnb?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                      <td>${mmttoken.usdt != undefined ? mmttoken.usdt?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                      <td>${mmttoken.busd != undefined ? mmttoken.busd?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }) : 0}</td>
                      <td>${mmttoken.usdc != undefined ? mmttoken.usdc?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                      <td>${mmttoken.xrp != undefined ? mmttoken.xrp?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                      <td>${mmttoken.doge != undefined ? mmttoken.doge?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                    </tr>
                }
                 {
                  tokenkind == "MCT" && !ismasteradmin &&
                  <tr>
                      <th>Monster Coin Token</th>
                      <td>${mcttoken.walletbalance != undefined ? mcttoken.walletbalance?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }) : 0}</td>
                      <td>${mcttoken.monstergem != undefined ? mcttoken.monstergem?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                      <td>${mcttoken.bnb != undefined ? mcttoken.bnb?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                      <td>${mcttoken.usdt != undefined ? mcttoken.usdt?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                      <td>${mcttoken.busd != undefined ? mcttoken.busd?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }) : 0}</td>
                      <td>${mcttoken.usdc != undefined ? mcttoken.usdc?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                      <td>${mcttoken.xrp != undefined ? mcttoken.xrp?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                      <td>${mcttoken.doge != undefined ? mcttoken.doge?.toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                      }): 0}</td>
                    </tr>
                 }   
                    
               </MDBTableBody>
            </MDBTable>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      </>
)
}

export default DashCard;