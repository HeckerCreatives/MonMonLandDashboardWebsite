import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBRow, MDBCol, MDBTypography } from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import PaginationPager from "../../../../component/pagination";
import Swal from "sweetalert2";
const SubAdminPayoutRequest = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const [page, setPage] = useState(1),
    [total, setTotal] = useState(0),
    [request, setRequest] = useState([]);

    useEffect(() => {
        let totalPages = Math.floor(request.length / 5);
        if (request.length % 5 > 0) totalPages += 1;
        setTotal(totalPages);
    }, [request]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}payout/adminfind`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: "pending",
            })
        }).then(result => result.json())
        .then(data => {
            if(data.message === "success"){
                setRequest(data.data)
            }
        })
    },[])

    const handleRequest = (id) => {
        Swal.fire({
            icon: "warning",
            title: "Are you sure you want to mark as done this payout?",
            text: "You won't be able to revert this",
            showDenyButton: true,
            confirmButtonText: "Confirm",
            denyButtonText: "Cancel",
        }).then(ok => {
            if(ok.isConfirmed){
                fetch(`${process.env.REACT_APP_API_URL}payout/process/${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        admin: auth.userName
                    })
                }).then(result => result.json())
                .then(data => {
                    if(data.message === "success"){
                        Swal.fire({
                            icon: "success",
                            title: "Payout is now on process",
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
                    <th scope='col'>Request At</th>
                    <th scope='col'>Wallet Address</th>
                    <th scope='col'>Network</th>
                    <th scope='col'>Payment Method</th>
                    <th scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                { request.length !== 0 ?
                    request.map((data,i) => (
                    <tr key={`request-${i}`}>
                        <td>{data.id}</td>
                        <td>{data.username}</td>
                        <td>{data.amount}</td>
                        <td>{new Date(data.createdAt).toLocaleString()}</td>
                        <td>{data.walletaddress}</td>
                        <td>{data.network}</td>
                        <td>{data.paymentmethod}</td>
                        <td>
                            <MDBBtn onClick={() => handleRequest(data._id)}>Process</MDBBtn>
                        </td>
                    </tr>
                    ))
                :
                    <tr>
                        <td colSpan={8}>
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

export default SubAdminPayoutRequest;