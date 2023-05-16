import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import Breadcrumb from "../../../component/breadcrumb";
import FullTable from "../../../component/fulltablelist";
import { Link } from "react-router-dom";
// import ManageDashboard from "../../../component/dashboard/admin/manageplayer/managedashboard"


const ActiveUsers = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [username, setUsername] = useState('');
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

// setTxtTable(
// [
//   [
//     'row 1, col 1',
//     'row 1, col 2',
//     'row 1, col 3',
//     'row 1, col 3',
//     'row 1, col 3',
//     <Link to = "/dashboard/superadmin/manageplayers/usersdetails">
//       <MDBBtn outline>
//       <MDBIcon fas icon="desktop" />
//       &nbsp; Details
//     </MDBBtn>
//     </Link>,
//   ],
//   [
//     'row 1, col 1',
//     'row 1, col 2',
//     'row 1, col 3',
//     'row 1, col 3',
//     'row 1, col 3',
//     <Link to = "/dashboard/superadmin/manageplayers/usersdetails">
//       <MDBBtn outline>
//       <MDBIcon fas icon="desktop" />
//       &nbsp; Details
//     </MDBBtn>
//     </Link>,
//   ],
//   [
//     'row 1, col 1',
//     'row 1, col 2',
//     'row 1, col 3',
//     'row 1, col 3',
//     'row 1, col 3',
//     <Link to = "/dashboard/superadmin/manageplayers/usersdetails">
//       <MDBBtn outline>
//       <MDBIcon fas icon="desktop" />
//       &nbsp; Details
//     </MDBBtn>
//     </Link>,
//   ],
//   [
//     'row 1, col 1',
//     'row 1, col 2',
//     'row 1, col 3',
//     'row 1, col 3',
//     'row 1, col 3',
//     <Link to = "/dashboard/superadmin/manageplayers/usersdetails">
//       <MDBBtn outline>
//       <MDBIcon fas icon="desktop" />
//       &nbsp; Details
//     </MDBBtn>
//     </Link>,
//   ],
// ]
// )

fetch(`${process.env.REACT_APP_API_URL}manage/activeuser`)
.then(result => result.json())
.then(data => {
  setTxtTable(data)
})


},[])


    return(
        <MDBContainer fluid>
        <MDBRow>
        <MDBCol>
        <Breadcrumb title="Active Users"/>
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

export default ActiveUsers;