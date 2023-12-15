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

const Dashboardstatistics = ({txtsup, icon, cardtoptext, colSpan, thtitle, td1, td1txttop, td1txtbot, td2, td2txttop, td2txtbot,td3, td3txttop, td3txtbot, td4, td4txttop, td4txtbot, td0, td0txttop, td0txtbot, flipbtn, basicModal, setBasicModal,txtsup1}) => {
    
return(
    <>
    <MDBCard className="text-mute fw-bold">          
          <MDBCardBody>
          { flipbtn &&
            <div className="d-flex justify-content-end">
                <MDBBtn onClick={() => setBasicModal(true)}>
                <MDBIcon fas icon="book-open" size="2x"/>
                </MDBBtn>
            </div>
          }
          {/* <div className="mt-2">
          <MDBIcon size="3x" icon={icon}></MDBIcon>          
          </div> */}
        <MDBCardText tag="h3" className="mb-0">
            {cardtoptext}
        </MDBCardText>
        <hr/>
        <MDBCardText tag="h3" className="mb-0">
        {txtsup}
        </MDBCardText>
        <MDBCardText tag="h3" className="mt-2 mb-0 text-primary">
        {txtsup1}
        </MDBCardText>
          <MDBTable responsive borderless className="text-mute mb-0">
                <MDBTableHead >
                    <tr>
                    <th className="fw-bold" colSpan={colSpan} scope='col'>{thtitle}</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="fw-bold">
                    <tr>
                    {td0 && 
                    <td style={{borderTop:"1px solid",}}>                    
                    <div>{td0txttop}
                    </div>
                    <div>{td0txtbot}</div>
                    </td>
                    } 
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
      </>
)
}

export default Dashboardstatistics;