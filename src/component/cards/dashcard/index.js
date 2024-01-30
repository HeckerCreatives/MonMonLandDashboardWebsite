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

const DashCard = ({txtsup, icon, cardtoptext, colSpan, thtitle, td1, td1txttop, td1txtbot, td2, td2txttop, td2txtbot,td3, td3txttop, td3txtbot, td4, td4txttop, td4txtbot, td0, td0txttop, td0txtbot, flipbtn, basicModal, setBasicModal,distri, leaderboard, grinding, quest}) => {
   
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

                    <th className="fw-bold" scope='col'>Diamond Pools Rewards</th>
                    
                    <th className="fw-bold" scope='col'>Developer Share</th>

                    <th className="fw-bold" scope='col'>Company Share</th>

                    <th className="fw-bold" scope='col'>Officers</th>

                    <th className="fw-bold" scope='col'>Marketing Arm</th>

                    <th className="fw-bold" scope='col'>Travel / Special Incentives</th>
                    <th className="fw-bold" scope='col'>Monster Gem</th>
                    <th className="fw-bold" scope='col'>Investor Fund</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="text-center">
                    <tr>
                     <td className="fw-bold text-warning">
                        Payin
                     </td>
                     <td>
                     40%
                     </td>
                     <td>
                     2%
                     </td>
                     <td>
                     20%
                     </td>
                     <td>
                     0%
                     </td>
                     <td>
                     1%
                     </td>
                     <td>
                     5%
                     </td>
                     <td>
                     2%
                     </td>
                     <td>
                     8%
                     </td>
                     <td>
                      2%
                     </td>
                     <td>
                       3%
                     </td>  
                     <td>
                       15%
                     </td> 
                     <td>
                       2%
                     </td>   
                    </tr>
                    <tr>
                     <td className="fw-bold text-warning">
                        Merchandise
                     </td>
                     <td>
                     30% 
                     </td>
                     <td>
                     3%
                     </td>
                     <td>
                     20%
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
                      30%
                     </td> 
                     <td>
                     0%
                     </td>   
                    </tr>
                    <tr>
                     <td className="fw-bold text-warning">
                        Tools
                     </td>
                     <td>
                     22%
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
                      35%
                     </td> 
                     {/* <td>
                     0%
                     </td>         */}
                    </tr>
                    <tr>
                     <td className="fw-bold text-warning">
                        Shop
                     </td>
                     <td>
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
                     {/* <td>
                     0%
                     </td>        */}
                    </tr>
                    {/* <tr>
                     <td className="fw-bold text-warning">
                        Ads
                     </td>
                     <td>
                     0%
                     </td>
                     <td>
                     5%
                     </td>
                     <td>
                     50%
                     </td>
                     <td>
                     5%
                     </td>
                     <td>
                     5%
                     </td>
                     <td>
                     5%
                     </td>
                     <td>
                     5%
                     </td>
                     <td>
                     20%
                     </td>
                     <td>
                      3%
                     </td>
                     <td>
                      2%
                     </td>  
                     <td>
                       0%
                     </td> 
                     <td>
                       0%
                     </td>       
                    </tr> */}
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
      </>
)
}

export default DashCard;