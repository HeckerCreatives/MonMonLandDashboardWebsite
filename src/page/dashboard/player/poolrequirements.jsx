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

const DiamondPoolRequirements = () => {
    
return(
    <>
    <MDBCard className="text-mute fw-bold">          
          <MDBCardBody>
          <MDBTable responsive className="text-mute mb-0">
                <MDBTableHead >
                    <tr>
                    <th className="fw-bold" scope='col'>Diamond Pool Requirements</th>
                    <th className="fw-bold" scope='col'></th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="fw-bold">
                    <tr>
                        <td>
                            Watch Ads Points
                        </td>
                        <td>
                            0
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Purchase Points
                        </td>
                        <td>
                            0
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Recruit Points
                        </td>
                        <td>
                            0
                        </td>
                    </tr>
                </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
    </MDBCard>
      </>
)
}

export default DiamondPoolRequirements;