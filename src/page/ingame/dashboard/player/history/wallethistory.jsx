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

const PlayerWalletHistory = () => {
    
return(
    <>
    <MDBContainer>
    <MDBTable responsive className="text-mute mb-0">
                <MDBTableHead >
                    <tr className="text-center">
                    <th className="fw-bold" scope='col'>Date</th>
                    <th className="fw-bold" scope='col'>Amount</th>
                    <th className="fw-bold" scope='col'>Status</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="fw-bold">
                    <tr className="text-center">
                        <td>
                            sample
                        </td>
                        <td>
                           sample
                        </td>
                        <td>
                            sample
                        </td>
                    </tr>
                </MDBTableBody>
            </MDBTable>
    </MDBContainer>
      </>
)
}

export default PlayerWalletHistory;