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

const MemberPointDetails = ({watchadspoints ,taskpoints ,activitypoints ,grouppoints, purchasepoints, recruitpoints}) => {
    
return(
    <>
    <MDBCard className="text-mute fw-bold">          
          <MDBCardBody>
          <MDBTable responsive className="text-mute mb-0">
                <MDBTableHead >
                    <tr className="text-center">
                    <th className="fw-bold" scope='col' colSpan={2}>Point Details</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="">
                    <tr>
                        <th>
                            Activity Points
                        </th>
                        <td>
                            {activitypoints}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Task Points
                        </th>
                        <td>
                            {taskpoints}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Purchase Points
                        </th>
                        <td>
                            {purchasepoints}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Watch Ads Points
                        </th>
                        <td>
                            {watchadspoints}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Direct Points
                        </th>
                        <td>
                            {recruitpoints}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Group Points
                        </th>
                        <td>
                            {grouppoints}
                        </td>
                    </tr>
                </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
    </MDBCard>
      </>
)
}

export default MemberPointDetails;