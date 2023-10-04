import React, {useEffect, useState } from "react";
import { 
    MDBContainer, 
    MDBRow, 
    MDBCol, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody, 
    MDBCardText,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter, 
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import PaginationPager from "../../../component/pagination/index"
import { handlePagination } from "../../../component/utils"

const SubAdminPaymentHistory = () => {
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    const auth = JSON.parse(localStorage.getItem("auth"))
    const [history, setHistory] = useState("");
    const [view, setView] = useState("");
    const [page, setPage] = useState(1),
          [total, setTotal] = useState(0);

    useEffect(() => {
        let totalPages = Math.floor(history.length / 10);
        if (history.length % 10 > 0) totalPages += 1;
        setTotal(totalPages);
    }, [history]);

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/findbuyer`)
        .then(response => response.json())
        .then(result => {
            const data = result.filter(e => e.cashier === auth.userName)
            setHistory(data)
        })
    },[])
    const handleview = (data) => {
        setView(data)
        toggleShow()
    }
    return (
<>
    <MDBContainer>
        <MDBRow>
            <MDBCol>
                <div>
                <MDBCardText className="fw-bold mt-3">Payment History</MDBCardText>
                </div>
                <MDBTable align='middle' className="border mt-4" responsive>
                <MDBTableHead className="head text-center">
                <tr >
                <th className="fw-bold" scope='col'>Date Created</th>
                <th className="fw-bold" scope='col'>Cashier Username</th>
                <th className="fw-bold" scope='col'>Transaction Number</th>
                <th className="fw-bold" scope='col'>Price</th>
                <th className="fw-bold" scope='col'>Client Username</th>
                <th className="fw-bold" scope='col'>Receipt</th>
                </tr>
                </MDBTableHead>
                <MDBTableBody className="text-center">                
                {history.length !== 0 ? 
                <>
                {handlePagination(history, page, 10)?.map((data,i) =>(
                <tr 
                key={`game-${i}`}
                className="table-zoom"
                onClick={() => handleview(data)}
                >
                <td>{new Date(data.createdAt).toLocaleString()}</td>
                <td>
                {data.cashier}
                </td>
                <td>
                {data.transactionnumber}
                </td>
                <td>
                {`$${data.price}`}
                </td>
                <td>
                {data.clientusername}
                </td>
                <td>
                {data.image ? <img src={data.image} alt="resibo" style={{width: "100px", height: "100px"}}/>  : 
                "no reciept attached"}
                </td>                
                </tr>
                ))}
                </>
                : <tr>
                    <td colSpan={6}>No Data</td>
                  </tr>}

                </MDBTableBody>
                </MDBTable>
                <PaginationPager
                total={total} page={page} setPage={setPage}/>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
    <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>View</MDBModalTitle>
              {/* <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn> */}
            </MDBModalHeader>

            <MDBModalBody>
            <MDBCard>
            <MDBCardBody>
                <MDBCardText>
                Date Created: &nbsp;{new Date(view.createdAt).toLocaleString()}
                </MDBCardText>
                <MDBCardText>
                Cashier: &nbsp;{view.cashier}
                </MDBCardText>
                <MDBCardText>
                Transaction Number: &nbsp;{view.transactionnumber}
                </MDBCardText>
                <MDBCardText>
                Price: &nbsp;{view.price}
                </MDBCardText>
                <MDBCardText>
                Clients Username: &nbsp;{view.clientusername}
                </MDBCardText>
                <div>
                Receipt: &nbsp; {view.image ? <a href={view.image} target="_blank" rel="noreferrer"><img src={view.image} alt="resibo" style={{width: "100px", height: "100px"}}/>  </a> : 
                "no reciept attached"}
                </div>
            </MDBCardBody>
            </MDBCard>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
</>
    )
    
                    
}

export default SubAdminPaymentHistory;