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
    } 
from "mdb-react-ui-kit";
import { handlePagination } from "../../../../../component/utils"
import PaginationPager from "../../../../../component/pagination";

const PlayerPayoutHistory = () => {
    const [ payouthistory, setPayouthistory ] = useState([]),
    [page, setPage] = useState(1),
    [total, setTotal] = useState(0);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}gamewallet/findcashouthistory`,{
            credentials: 'include'
        })
        .then(result => result.json())
        .then(data => {
            if(data.message === 'success'){
                setPayouthistory(data.data)
            }
        })
    },[])

return(
    <>
    <MDBContainer>
    <div className="text-center my-3">
        <MDBTypography tag={'h1'}>Payout History</MDBTypography>
    </div>
    <MDBRow>
        <MDBCol>
        <MDBTable small responsive className="text-mute mb-0">
                <MDBTableHead >
                    <tr className="text-center">
                    <th className="fw-bold" scope='col'>Date</th>
                    <th className="fw-bold" scope='col'>Amount</th>
                    <th className="fw-bold" scope='col'>Status</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="text-center">
                { payouthistory.length !== 0 ?
                    handlePagination(payouthistory, page, 10)?.map((item,i) => (
                    <tr key={i}>
                        <td>
                            {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                            {item.amount}
                        </td>
                        <td>
                            {item.status}
                        </td>
                    </tr>
                    ))
                    :
                    <tr>
                        <td colSpan={3}>
                            No Data
                        </td>
                    </tr>
                }
                    
                </MDBTableBody>
            </MDBTable>
            <PaginationPager
              total={total} page={page} setPage={setPage}
            />
        </MDBCol>
    </MDBRow>
    
    </MDBContainer>
      </>
)
}

export default PlayerPayoutHistory;