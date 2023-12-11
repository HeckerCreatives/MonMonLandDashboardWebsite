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

const PlayerLeaderboard = () => {
    
return(
    <>
    <MDBContainer>
    <MDBTable responsive className="text-mute mb-0">
                <MDBTableHead >
                    <tr className="text-center">
                    <th className="fw-bold" scope='col'>Rank</th>
                    <th className="fw-bold" scope='col'>Name</th>
                    <th className="fw-bold" scope='col'>Total Points</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="fw-bold">
                    <tr className="text-center">
                        <td>
                            1
                        </td>
                        <td>
                            ebe
                        </td>
                        <td>
                            0
                        </td>
                    </tr>
                </MDBTableBody>
            </MDBTable>
    </MDBContainer>
      </>
)
}

export default PlayerLeaderboard;