import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn,MDBRow, MDBCol, MDBTypography } from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import PaginationPager from "../../../../component/pagination";
import Swal from "sweetalert2";
const CsrPayoutDone = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const [page, setPage] = useState(1),
    [total, setTotal] = useState(0),
    [done, setDone] = useState([]);

    useEffect(() => {
        let totalPages = Math.floor(done.length / 5);
        if (done.length % 5 > 0) totalPages += 1;
        setTotal(totalPages);
    }, [done]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}payout/agentfind`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: "done",
                admin: auth.userName
            })
        }).then(result => result.json())
        .then(data => {
            if(data.message === "success"){
                setDone(data.data)
            }
        })
    })

    const handleReprocessed = (id) => {
        Swal.fire({
            icon: "warning",
            title: "Are you sure you want to mark as done this payout?",
            text: "You won't be able to revert this",
            showDenyButton: true,
            confirmButtonText: "Confirm",
            denyButtonText: "Cancel",
        }).then(ok => {
            if(ok.isConfirmed){
                fetch(`${process.env.REACT_APP_API_URL}payout/reprocess/${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(result => result.json())
                .then(data => {
                    if(data.message === "success"){
                        Swal.fire({
                            icon: "success",
                            title: "Payout is now in reprocess",
                        }).then(ok=> {
                            if(ok.isConfirmed){
                                window.location.reload()
                            }
                        })
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: data.data,
                        }).then(ok=> {
                            if(ok.isConfirmed){
                                window.location.reload()
                            }
                        })
                    }
                })
            }
        })
    }

    return (
        <MDBContainer fluid>
        <MDBRow className="mt-5">
            <MDBCol md={6}>
            <div>
                <MDBTypography className="fw-bold m-0">Filter:</MDBTypography>
            </div>
            <div>
            <select name="example">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            </select>
            </div>
            </MDBCol>
        </MDBRow>
            <MDBTable responsive className="mt-3 text-center">
                <MDBTableHead style={{background: "#EDCAB4"}}>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Username</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'>Requested At</th>
                        <th scope='col'>Wallet Address</th>
                        <th scope='col'>Network</th>
                        <th scope='col'>Payment Method</th>
                        <th scope='col'>Admin</th>
                        <th scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                { done.length !== 0 ?
                    done.map((data,i) => (
                    <tr key={`done-${i}`}>
                        <td>{data.id}</td>
                        <td>{data.username}</td>
                        <td>{data.amount}</td>
                        <td>{new Date(data.createdAt).toLocaleString()}</td>
                        <td>{data.walletaddress}</td>
                        <td>{data.network}</td>
                        <td>{data.paymentmethod}</td>
                        <td>{data.admin}</td>
                        <td>
                            <MDBBtn onClick={() => handleReprocessed(data._id)}>Re-Processed</MDBBtn>
                        </td>
                    </tr>
                    ))
                :
                    <tr>
                        <td colSpan={9}>
                            No Data
                        </td>
                    </tr>
                }
                </MDBTableBody>
            </MDBTable>
            <PaginationPager
                total={total} page={page} setPage={setPage}
            />
        </MDBContainer>
    )
}

export default CsrPayoutDone;