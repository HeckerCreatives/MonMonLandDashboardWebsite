import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBRow, MDBCol, MDBTypography, MDBSpinner } from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import PaginationPagerQuery from "../../../../component/pagination/query";
import Swal from "sweetalert2";
import { handlePagination } from "../../../../component/utils";
import Cookies from 'js-cookie';
const CsrPayoutRequest = () => {
    const auth = JSON.parse(Cookies.get("auth"))
    const playfabToken = Cookies.get("playfabAdminAuthToken")
    const [page, setPage] = useState(0),
    [total, setTotal] = useState(0),
    [request, setRequest] = useState([]);
    const [selectedColor, setSelectedColor] = useState('all'); // Initialize with an empty string
    const [isloading, setIsLoading] = useState(false);

    const filteredRequest = request.filter((data) => {
        const rowColorClass = getRowColorClass(data.createdAt);
        return selectedColor === 'all' || rowColorClass === selectedColor;
    });
      

    // useEffect(() => {
    //     let totalPages = Math.floor(filteredRequest.length / 5);
    //     if (filteredRequest.length % 5 > 0) totalPages += 1;
    //     setTotal(totalPages);
    // }, [filteredRequest]);

    useEffect(() => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}payout/adminfind?page=${page}&limit=5`, {
            method: "POST",
            credentials: 'include',
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
                  title: data.expired == "duallogin" ? "Dual Login" : data.expired,
                  text: "You Will Redirect to Login",
                  allowOutsideClick: false,
                  allowEscapeKey: false
                }).then(ok => {
                  if(ok.isConfirmed){
                    Cookies.remove("auth", { path: '/' });
                    Cookies.remove("playfabAdminAuthToken", { path: '/' });
                    window.location.replace("/login");
                  }
                })
              }

            if(data.message === "success" && !data.expired){
                setIsLoading(false)
                setRequest(data.data)
                setTotal(data.pages)
            }
        })
    },[page, total])

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
                
                fetch(`${process.env.REACT_APP_API_URL}payout/process/${id}`, {
                    method: "POST",
                    credentials: 'include',
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
                          title: data.expired == "duallogin" ? "Dual Login" : data.expired,
                          text: "You Will Redirect to Login",
                          allowOutsideClick: false,
                          allowEscapeKey: false
                        }).then(ok => {
                          if(ok.isConfirmed){
                            Cookies.remove("auth", { path: '/' });
                            Cookies.remove("playfabAdminAuthToken", { path: '/' });
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
                        <th scope='col'>Requested At</th>
                        <th scope='col'>Wallet Address</th>
                        <th scope='col'>Network</th>
                        <th scope='col'>Payment Method</th>
                        <th scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="text-white">
                { filteredRequest.length > 0 ?
                    filteredRequest.map((data,i) => (
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
            <PaginationPagerQuery
                total={total} page={page} setPage={setPage} isLoading={isloading}
            />
        </MDBContainer>
    )
}

export default CsrPayoutRequest;