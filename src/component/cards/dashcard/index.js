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
    const [payin1, setpayin1] = useState(0)
    const [payin2, setpayin2] = useState(0)
    const [payin3, setpayin3] = useState(0)
    const [payin4, setpayin4] = useState(0)
    const [payin5, setpayin5] = useState(0)
    const [payin6, setpayin6] = useState(0)
    const [payin7, setpayin7] = useState(0)
    const [payin8, setpayin8] = useState(0)
    const [payin9, setpayin9] = useState(0)
    const [payin10, setpayin10] = useState(0)
    // const distri = 20
    useEffect(()=>{
        setpayin1(distri * .25)
        setpayin2(distri * .02)
        setpayin3(distri * .12)
        setpayin4(distri * .05)
        setpayin5(distri * .01)
        setpayin6(distri * .05)
        setpayin7(distri * .05)
        setpayin8(distri * .40)
        setpayin9(distri * .03)
        setpayin10(distri * .02)
    },[distri])
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
                    <span className="text-warning">(25%)</span></th>

                    <th className="fw-bold" scope='col'>Leaderboard
                    <span className="text-warning">(2%)</span></th>

                    <th className="fw-bold" scope='col'>Grinding / Games
                    <span className="text-warning">(12%)</span></th>

                    <th className="fw-bold" scope='col'>Quest Reward<span className="text-warning">(5%)</span></th>

                    <th className="fw-bold" scope='col'>Diamond Pools Rewards<span className="text-warning">(1%)</span></th>
                    
                    <th className="fw-bold" scope='col'>Developer Share<span className="text-warning">(5%)</span></th>

                    <th className="fw-bold" scope='col'>Company Share<span className="text-warning">(5%)</span></th>

                    <th className="fw-bold" scope='col'>Officers<span className="text-warning">(40%)</span></th>

                    <th className="fw-bold" scope='col'>Marketing Arm<span className="text-warning">(3%)</span></th>

                    <th className="fw-bold" scope='col'>Travel / Special Incentives<span className="text-warning">(2%)</span></th>

                    </tr>
                </MDBTableHead>
                <MDBTableBody className="">
                    <tr>
                     <td className="fw-bold text-warning">
                        Payin
                     </td>
                     <td>
                     {payin1.toLocaleString()}
                     </td>
                     <td>
                     {payin2.toLocaleString()}
                     </td>
                     <td>
                     {payin3.toLocaleString()}
                     </td>
                     <td>
                     {payin4.toLocaleString()}
                     </td>
                     <td>
                     {payin5.toLocaleString()}
                     </td>
                     <td>
                     {payin6.toLocaleString()}
                     </td>
                     <td>
                     {payin7.toLocaleString()}
                     </td>
                     <td>
                     {payin8.toLocaleString()}
                     </td>
                     <td>
                        {payin9.toLocaleString()}
                     </td>
                     <td>
                        {payin10.toLocaleString()}
                     </td>           
                    </tr>
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