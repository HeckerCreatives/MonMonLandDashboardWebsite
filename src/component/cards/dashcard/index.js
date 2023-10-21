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

const DashCard = ({txtsup, icon, cardtoptext, colSpan, thtitle, td1, td1txttop, td1txtbot, td2, td2txttop, td2txtbot,td3, td3txttop, td3txtbot, td4, td4txttop, td4txtbot, flipbtn, basicModal, setBasicModal,}) => {
    const [payin1, setpayin1] = useState(0)
    const [payin2, setpayin2] = useState(0)
    const [payin3, setpayin3] = useState(0)
    const [payin4, setpayin4] = useState(0)
    const [payin5, setpayin5] = useState(0)
    const [payin6, setpayin6] = useState(0)
    const [payin7, setpayin7] = useState(0)
    const [payin8, setpayin8] = useState(0)
    const [payin9, setpayin9] = useState(0)
    // const [payin10, setpayin10] = useState(0)
    const distri = 20
    useEffect(()=>{
        setpayin1(distri * .25)
        setpayin2(distri * .05)
        setpayin3(distri * .08)
        setpayin4(distri * .04)
        setpayin5(distri * .05)
        setpayin6(distri * .05)
        setpayin7(distri * .05)
        setpayin8(distri * .40)
        setpayin9(distri * .03)
        // setpayin10(distri * .5)
    },[distri])
return(
    <>
    <MDBCard className="text-center text-light fw-bold" style={{background: "linear-gradient(to right, #fd9566 , #feb697)"}}>          
          <MDBCardBody>
          { flipbtn &&
            <div>
                <MDBBtn onClick={() => setBasicModal(true)}>
                    Distribution
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
            <MDBTable small responsive className=" mb-0">
                <MDBTableHead >
                    <tr>
                    <th className="fw-bold" scope='col'>Particular</th>
                    <th className="fw-bold" scope='col'>Complan</th>
                    <th className="fw-bold" scope='col'>Leaderboard</th>
                    <th className="fw-bold" scope='col'>Grinding / Games</th>
                    <th className="fw-bold" scope='col'>Quest Reward</th>
                    <th className="fw-bold" scope='col'>Diamond Pools Rewards</th>
                    <th className="fw-bold" scope='col'>Developer Share</th>
                    <th className="fw-bold" scope='col'>Company Share</th>
                    <th className="fw-bold" scope='col'>Officers</th>
                    <th className="fw-bold" scope='col'>Marketing Arm</th>
                    <th className="fw-bold" scope='col'>Travel / Special Incentives</th>
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
                        0
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