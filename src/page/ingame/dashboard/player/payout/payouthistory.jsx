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
import PaginationPager from "../../../../../component/pagination/index";

const PlayerPayoutHistory = () => {
    const [ payouthistory, setPayouthistory ] = useState([]),
    [page, setPage] = useState(1),
    [total, setTotal] = useState(0);

    useEffect(() => {
        let totalPages = Math.floor(payouthistory.length / 10 );
        if (payouthistory.length % 10 > 0 ) totalPages += 1;
        setTotal(totalPages);
    },[payouthistory])


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
                    handlePagination(payouthistory, page, 10)?.map((item,i) => {
                        const tenpercent = item.amount * 0.10
                        const fivepercent = item.amount * 0.05
                        const bawas10 = item.amount - tenpercent
                        const bawas5 = item.amount - fivepercent
                        return(
                        <tr key={i}>
                            <td>
                                {new Date(item.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                            {item.payoutHistoryStatus !== null ? bawas5 : bawas10}
                            </td>
                            <td>
                            {item.payoutHistoryStatus !== null ? item.payoutHistoryStatus : item.payoutRequestStatus}
                            </td>
                        </tr>
                        )
                    
                })
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