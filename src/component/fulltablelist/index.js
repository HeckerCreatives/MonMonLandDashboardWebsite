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
const FullTable = ({txtHeader, txtTable}) => {
    

    return (
    <MDBContainer fluid>
         
    <MDBContainer fluid className="p-0 my-4 border">
    <MDBBtn rounded size="sm" className="m-1">filter</MDBBtn>
    <MDBBtn rounded size="sm" className="m-1">filter</MDBBtn>
    <MDBTable striped>
      <MDBTableHead>
      <tr>
        {txtHeader.map((txthd, i) => (
        
            <th scope='col' key={i}>{txthd.title}</th>
        
        ))}
     </tr>
      </MDBTableHead>
      <MDBTableBody>      
        
        {txtTable.map((txttd,i) => (
        <tr key={i}>
          {txttd.map((cell,j)=> (
            <td key={j}>{cell}</td>
          ))}
        </tr>  
        ))}
      
      </MDBTableBody>
    </MDBTable>
    </MDBContainer>
    </MDBContainer>
    
    )
}

export default FullTable;