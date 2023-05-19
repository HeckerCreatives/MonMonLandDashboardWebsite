import React, {useEffect, useState} from "react";
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody, 
    MDBContainer,
    MDBIcon,
    MDBBtn,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
import Sidebarnav from "../../component/sidebarnav";
import "./table.css"
import { Link } from "react-router-dom";
const FullTable = ({txtHeader, txtTable}) => {
    

    return (
    <MDBContainer fluid>
         
    <MDBContainer fluid className="p-0 my-4">
    {/* <MDBBtn rounded size="sm" className="m-1">filter</MDBBtn>
    <MDBBtn rounded size="sm" className="m-1">filter</MDBBtn> */}
    <MDBTable >
      <MDBTableHead className="head">
      <tr>
        {txtHeader.map((txthd, i) => (        
            <th scope='col' key={i}>{txthd.title}</th>        
        ))}
     </tr>
      </MDBTableHead>
      <MDBTableBody>      
      {txtTable ?
        <>  
        {txtTable.map((txttd,i) => (
        <tr key={i}>
          {/* {txttd.map((cell,j)=> (
            <td key={j}>{cell}</td>
          ))} */}
          <td>{txttd.userName}</td>
          <td>{txttd.email}</td>
          <td>{txttd.firstName}</td>
          <td>{new Date(txttd.createdAt).toLocaleString()}</td>
          <td>₱ {txttd.balance}</td>
          <td>
            <Link to = {`/dashboard/Administrator/manageplayers/usersdetails/${txttd._id}`}>
            <MDBBtn outline>
            <MDBIcon fas icon="desktop" />
            &nbsp; Details
            </MDBBtn>
            </Link>
          </td>
        </tr>  
        ))}
        </> 
        : 
        <span>No Data Found</span>
        }
      </MDBTableBody>
    </MDBTable>
    </MDBContainer>
    </MDBContainer>
    
    )
}

export default FullTable;