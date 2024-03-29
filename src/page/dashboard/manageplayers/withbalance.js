import { MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBBtn} from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import Breadcrumb from "../../../component/breadcrumb";
import FullTable from "../../../component/fulltablelist";
import { Link } from "react-router-dom";


const WithBalance = () => {
    const [txthead, setTxtHead] = useState([]),
    [txttable, setTxtTable] = useState([]);

useEffect(()=>{
setTxtHead(
[
  {
    title:'User'
  },
  {
    title:'Email'
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
fetch(`${process.env.REACT_APP_API_URL}manage/userwithbalance`,{
  credentials: 'include',
})
.then(result => result.json())
.then(data =>{
  setTxtTable(data)
})
},[])


    return(
        <MDBContainer fluid>
        <MDBRow>
        <MDBCol>
        <Breadcrumb title="Users with Balance"/>
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

export default WithBalance;