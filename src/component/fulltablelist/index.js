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
const FullTable = ({txtHeader, txtTable , button, btn1text, btn2text,btn1onclick}) => {
    

    return (
    <MDBContainer fluid>
         
    <MDBContainer fluid className="p-0 my-4">
    {button  && 
    <><MDBBtn outline color='dark' size="sm" className="rounded m-1" onClick={btn1onclick}>
    <MDBIcon fas icon="plus" />
    &nbsp; {btn1text}</MDBBtn>
    <MDBBtn size="sm" className="rounded m-1 btn-danger">{btn2text}</MDBBtn>
    </>}
    <MDBTable className="mt-2">
      <MDBTableHead className="head">
      <tr >
        {txtHeader.map((txthd, i) => (        
            <th className="fw-bold" scope='col' key={i}>{txthd.title}</th>        
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