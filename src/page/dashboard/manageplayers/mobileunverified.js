import { MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import Breadcrumb from "../../../component/breadcrumb";
import FullTable from "../../../component/fulltablelist";



const MobileUnverified = () => {
    const [txthead, setTxtHead] = useState([]),
    [txttable, setTxtTable] = useState([]);

useEffect(()=>{
setTxtHead(
[
  {
    title:'User'
  },
  {
    title:'Email-Phone'
  },
  {
    title:'Country'
  },
  {
    title:'Joined At'
  },
  {
    title:'Balance'
  },
  {
    title:'Action'
  },

]
)
setTxtTable(
[
  [
    'row 1, col 1',
    'row 1, col 2',
    'row 1, col 3',
    'row 1, col 3',
    'row 1, col 3',
    <MDBBtn outline>
      <MDBIcon fas icon="desktop" />
      &nbsp; Details
    </MDBBtn>,
  ],
  [
    'row 1, col 1',
    'row 1, col 2',
    'row 1, col 3',
    'row 1, col 3',
    'row 1, col 3',
    <MDBBtn outline>
      <MDBIcon fas icon="desktop" />
      &nbsp; Details
    </MDBBtn>,
  ],
  [
    'row 1, col 1',
    'row 1, col 2',
    'row 1, col 3',
    'row 1, col 3',
    'row 1, col 3',
    <MDBBtn outline>
      <MDBIcon fas icon="desktop" />
      &nbsp; Details
    </MDBBtn>,
  ],
  [
    'row 1, col 1',
    'row 1, col 2',
    'row 1, col 3',
    'row 1, col 3',
    'row 1, col 3',
    <MDBBtn outline>
      <MDBIcon fas icon="desktop" />
      &nbsp; Details
    </MDBBtn>,
  ],
]
)
},[])


    return(
        <MDBContainer fluid>
        <MDBRow>
        <MDBCol>
        <Breadcrumb title="Mobile Unverified Users"/>
        </MDBCol>        
        <MDBCol md={3} className="">
            <MDBInput type="search"                
            label="Search">
            </MDBInput>        
        {/* <MDBIcon fas icon="search" /> */}        
        </MDBCol>
        </MDBRow>     
        <FullTable txtHeader={txthead} txtTable={txttable}/>
        
        </MDBContainer>
    )
}

export default MobileUnverified;