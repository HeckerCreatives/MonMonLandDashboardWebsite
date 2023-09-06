import React, {useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBCardText, } from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import PaginationPager from "../../../component/pagination/index"
import { handlePagination } from "../../../component/utils"

const SubAdminPaymentHistory = () => {
    const auth = JSON.parse(localStorage.getItem("auth"))
    const [history, setHistory] = useState("");
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

    return (
<MDBContainer>
    <MDBRow>
        <MDBCol>
            <div>
            <MDBCardText className="fw-bold">Payment History</MDBCardText>
            </div>
            <MDBTable align='middle' className="border mt-4" responsive>
            <MDBTableHead className="head text-center">
            <tr >
            <th className="fw-bold" scope='col'>Date Created</th>
            <th className="fw-bold" scope='col'>Cashier Username</th>
            <th className="fw-bold" scope='col'>Transaction Number</th>
            <th className="fw-bold" scope='col'>Subscription Level</th>
            <th className="fw-bold" scope='col'>Price</th>
            <th className="fw-bold" scope='col'>Client Username</th>
            <th className="fw-bold" scope='col'>Receipt</th>
            </tr>
            </MDBTableHead>
            <MDBTableBody className="text-center">                
            {history ? 
            <>
            {handlePagination(history, page, 10)?.map((data,i) =>(
            <tr key={`game-${i}`}>
            <td>{new Date(data.createdAt).toLocaleString()}</td>
            <td>
            {data.cashier}
            </td>
            <td>
            {data.transactionnumber}
            </td>
            <td>
            {data.subscriptionlevel?.subscriptionName}
            </td>
            <td>
            {`$${data.price}`}
            </td>
            <td>
            {data.clientusername}
            </td>
            <td>
            {data.image ? <img src={data.image} alt="resibo" className="img-fluid"/>  : 
            "nag antay ka ? wala na"}
            </td>                
            </tr>
            ))}
            </>
            : null}

            </MDBTableBody>
            </MDBTable>
            <PaginationPager
            total={total} page={page} setPage={setPage}/>
        </MDBCol>
    </MDBRow>
</MDBContainer>

    )
    
                    
}

export default SubAdminPaymentHistory;