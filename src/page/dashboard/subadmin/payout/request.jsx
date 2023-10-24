import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBRow, MDBCol, MDBTypography, MDBSpinner, } from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import PaginationPager from "../../../../component/pagination";
import Swal from "sweetalert2";
import { handlePagination } from "../../../../component/utils"
const SubAdminPayoutRequest = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const playfabToken = localStorage.getItem("playfabAdminAuthToken")
    const [page, setPage] = useState(1),
    [total, setTotal] = useState(0),
    [request, setRequest] = useState([]);
    const [selectedColor, setSelectedColor] = useState('all'); // Initialize with an empty string
    const [isloading, setIsLoading] = useState(false);

    const filteredRequest = request.filter((data) => {
        const rowColorClass = getRowColorClass(data.createdAt);
        return selectedColor === 'all' || rowColorClass === selectedColor;
    });

    useEffect(() => {
        let totalPages = Math.floor(filteredRequest.length / 5);
        if (filteredRequest.length % 5 > 0) totalPages += 1;
        setTotal(totalPages);
    }, [filteredRequest]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}payout/adminfind`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token}`,
            },
            body: JSON.stringify({
                status: "pending",
            })
        }).then(result => result.json())
        .then(data => {
            if(data.expired){
                Swal.fire({
                  icon: "error",
                  title: data.expired,
                  text: "You Will Redirect to Login",
                  allowOutsideClick: false,
                  allowEscapeKey: false
                }).then(ok => {
                  if(ok.isConfirmed){
                    localStorage.removeItem("auth");
                    localStorage.removeItem("playfabAdminAuthToken")
                    window.location.replace("/login");
                  }
                })
              }

            if(data.message === "success" && !data.expired){
                setRequest(data.data)
            }
        })
    },[])

    const handleRequest = (id) => {
        setIsLoading(true)
        Swal.fire({
            icon: "warning",
            title: "Are you sure you want to mark as done this payout?",
            text: "You won't be able to revert this",
            showDenyButton: true,
            confirmButtonText: "Confirm",
            denyButtonText: "Cancel",
        }).then(ok => {
            if(ok.isConfirmed){
                setIsLoading(false)
                fetch(`${process.env.REACT_APP_API_URL}payout/process/${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth?.token}`,
                    },
                    body: JSON.stringify({
                        admin: auth.userName,
                        adminId: auth._id,
                        playfabid: auth.playfabid,
                        playfabToken: playfabToken,
                    })
                }).then(result => result.json())
                .then(data => {
                    if(data.expired){
                        Swal.fire({
                          icon: "error",
                          title: data.expired,
                          text: "You Will Redirect to Login",
                          allowOutsideClick: false,
                          allowEscapeKey: false
                        }).then(ok => {
                          if(ok.isConfirmed){
                            localStorage.removeItem("auth");
                            localStorage.removeItem("playfabAdminAuthToken")
                            window.location.replace("/login");
                          }
                        })
                      } else {
                        if(data.message === "success" && !data.expired){
                            setIsLoading(false)
                            Swal.fire({
                                icon: "success",
                                title: "Payout is now on process",
                            }).then(ok=> {
                                if(ok.isConfirmed){
                                    window.location.reload()
                                }
                            })
                        } else {
                            setIsLoading(false)
                            Swal.fire({
                                icon: "error",
                                title: data.data,
                            }).then(ok=> {
                                if(ok.isConfirmed){
                                    window.location.reload()
                                }
                            })
                        }
                      }

                    
                })
            } else {
                setIsLoading(false)
            }
        })
    }

    const handleReject = (id) => {
        setIsLoading(true)
        Swal.fire({
            icon: "warning",
            title: "Are you sure you want to reject this payout?",
            text: "You won't be able to revert this",
            showDenyButton: true,
            confirmButtonText: "Confirm",
            denyButtonText: "Cancel",
        }).then(ok => {
            if(ok.isConfirmed){
                setIsLoading(false)
                fetch(`${process.env.REACT_APP_API_URL}payout/reject/${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth?.token}`,
                    },
                    body: JSON.stringify({
                        admin: auth.userName,
                        adminId: auth._id,
                        playfabid: auth.playfabid,
                        playfabToken: playfabToken,
                    })
                }).then(result => result.json())
                .then(data => {
                    if(data.expired){
                        Swal.fire({
                          icon: "error",
                          title: data.expired,
                          text: "You Will Redirect to Login",
                          allowOutsideClick: false,
                          allowEscapeKey: false
                        }).then(ok => {
                          if(ok.isConfirmed){
                            localStorage.removeItem("auth");
                            localStorage.removeItem("playfabAdminAuthToken")
                            window.location.replace("/login");
                          }
                        })
                    } else {
                        if(data.message === "success" && !data.expired){
                            setIsLoading(false)
                            Swal.fire({
                                icon: "success",
                                title: "Payout Rejected",
                            }).then(ok=> {
                                if(ok.isConfirmed){
                                    window.location.reload()
                                }
                            })
                        } else {
                            setIsLoading(false)
                            Swal.fire({
                                icon: "error",
                                title: data.data,
                            }).then(ok=> {
                                if(ok.isConfirmed){
                                    window.location.reload()
                                }
                            })
                        }
                    }

                    
                })
            } else {
                setIsLoading(false)
            }
        })
    }

    // Define a function to calculate the time difference in hours
    function calculateTimeDifference(createdAt) {
        const createdAtDate = new Date(createdAt);
        const currentDate = new Date();
        const timeDifferenceInMilliseconds = currentDate - createdAtDate;
        const timeDifferenceInHours = timeDifferenceInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
        return timeDifferenceInHours;
    }

    // Define a function to determine the CSS class based on the time difference
    function getRowColorClass(createdAt) {
        const timeDifference = calculateTimeDifference(createdAt);
        if (timeDifference <= 24) {
        return 'success';
        } else if (timeDifference <= 32) {
        return 'warning';
        } else {
        return 'danger';
        }
    }

    return (
        <MDBContainer fluid>
        <MDBRow className="mt-5">
            
            <MDBCol md={6}>
            <div>
                <MDBTypography className="fw-bold m-0">Filter:</MDBTypography>
            </div>
            <div>
            <select
                name="colorFilter"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
            >
                <option value="all">All</option>
                <option value="success">Green</option>
                <option value="warning">Orange</option>
                <option value="danger">Red</option>
            </select>
            </div> 
            </MDBCol>
        </MDBRow>
            <MDBTable align="middle" responsive className="mt-3 text-center">
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
                <MDBTableBody className="text-white">
                { filteredRequest.length !== 0 ?
                    handlePagination(filteredRequest, page, 5)?.map((data,i) => (
                    <tr key={`request-${i}`} className={`bg-${getRowColorClass(data.createdAt)}`}>
                        <td>{data.id}</td>
                        <td>{data.username}</td>
                        <td>{data.amount}</td>
                        <td>{new Date(data.createdAt).toLocaleString()}</td>
                        <td>{data.walletaddress}</td>
                        <td>{data.network}</td>
                        <td>{data.paymentmethod}</td>
                        <td>
                            <MDBBtn onClick={() => handleRequest(data._id)}>
                            {isloading ? <MDBSpinner size="sm" role='status' grow/> : "Process"}
                            </MDBBtn>
                            <MDBBtn onClick={() => handleReject(data._id)}>
                            {isloading ? <MDBSpinner size="sm" role='status' grow/> : "Reject"}
                            </MDBBtn>
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