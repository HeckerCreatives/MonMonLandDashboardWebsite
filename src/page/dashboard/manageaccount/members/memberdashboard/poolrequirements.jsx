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

const DiamondPoolRequirements = ({grouppoints, purchasepoints, recruitpoints, rank, poolstatus}) => {
    let pp;
    let dp;
    let gp;

    switch(rank){
        case "Diamond":
        pp = 50.00
        dp = 64.00
        gp = 200.00
        break
        case "Diamond Pink":
        pp = 150.00
        dp = 128.00
        gp = 500.00
        break
        case "Diamond Blue":
        pp = 300.00
        dp = 256.00
        gp = 750.00
        break
        default:
        pp = 0.00
        dp = 0.00
        gp = 0.00
    }
return(
    <>
    <MDBCard className="text-mute fw-bold">          
          <MDBCardBody>
          <MDBTable responsive className="text-mute mb-0">
                <MDBTableHead >
                    <tr className="text-center">
                    <th className="fw-bold" scope='col' colSpan={2}>Diamond Pool Requirements</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="">
                    <tr>
                        <th>
                            Pool Status
                        </th>
                        <td>
                            {poolstatus}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Rank
                        </th>
                        <td>
                            {rank}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Purchase Points
                        </th>
                        <td>
                            {purchasepoints} / {pp.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Direct Points
                        </th>
                        <td>
                            {recruitpoints} / {dp.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Group Points
                        </th>
                        <td>
                            {grouppoints} / {gp.toFixed(2)}
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