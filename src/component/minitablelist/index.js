import React from "react";
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody 
} from 'mdb-react-ui-kit';

const MiniTableList = ({miniThTitle,miniTdText}) => {
    return (
        <MDBTable className="my-4 border">
          <MDBTableHead>
          <tr>
              {miniThTitle.map((txthd, i) => (
              
                  <th scope='col' key={i}>{txthd.title}</th>
              
              ))}
          </tr>
          </MDBTableHead>
          <MDBTableBody>
          {miniTdText.map((txttd,i) => (
            <tr key={i}>
              {txttd.map((cell,j)=> (
                <td key={j}>{cell}</td>
              ))}
            </tr>  
            ))}
          </MDBTableBody>
        </MDBTable>
      );
}

export default MiniTableList;