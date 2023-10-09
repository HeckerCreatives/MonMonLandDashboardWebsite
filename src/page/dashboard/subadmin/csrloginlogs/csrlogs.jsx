import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBCardText, } from "mdb-react-ui-kit";
  import React, {useState, useEffect} from "react";
  import Breadcrumb from "../../../../component/breadcrumb";
  import PaginationPager from "../../../../component/pagination";
  import Swal from "sweetalert2";
  const SubadminCsrLoginLogs = () => {
    const [confirmpass, setConfirmPass] = useState(""),
          [adminaccounts, setAdminAcc] = useState([]);
    const [centredModal, setCentredModal] = useState(false),
    [page, setPage] = useState(1),
    [total, setTotal] = useState(0);
      
      useEffect(() => {
          let totalPages = Math.floor(adminaccounts.length / 5);
          if (adminaccounts.length % 5 > 0) totalPages += 1;
          setTotal(totalPages);
          }, [adminaccounts]);
  
      return(
        <>
          
          <MDBContainer fluid>
          
          <MDBTable align='middle' className="border mt-4" responsive>
                  <MDBTableHead className="head text-center">
                      <tr >
                      <th className="fw-bold" scope='col'>Username</th>
                      <th className="fw-bold" scope='col'>Ip Address</th>
                      <th className="fw-bold" scope='col'>Date</th>
                      </tr>
                  </MDBTableHead>
                  <MDBTableBody className="text-center">

                  </MDBTableBody>
                  </MDBTable>

          <PaginationPager
              total={total} page={page} setPage={setPage}
          />
          </MDBContainer>
          </>
      )
  }
  
  export default SubadminCsrLoginLogs;