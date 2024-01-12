import { 
    MDBContainer, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody, 
    MDBBtn, 
    MDBRow, 
    MDBCol, 
    MDBTypography, 
    MDBSpinner, 
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import Swal from "sweetalert2";
import { handlePagination } from "../../../../component/utils"
import PaginationPager from "../../../../component/pagination/index";
import Cookies from 'js-cookie';
import { isLogin } from "../../../../component/utils";
const SubAdminPayoutDragonDone = () => {
    // const auth = JSON.parse(Cookies.get("auth"))
    const playfabToken = Cookies.get("playfabAdminAuthToken")
    const [page, setPage] = useState(1),
    [total, setTotal] = useState(0),
    [request, setRequest] = useState([]);
    const [paymentdetail, setPaymentdetail] = useState([]);
    const [selectedColor, setSelectedColor] = useState('all'); // Initialize with an empty string
    const [isloading, setIsLoading] = useState(false);
    const [role, setrole]= useState('');
    const [name, setname]= useState('');
    const [id, setid]= useState('');
    const [basicModal1, setBasicModal1] = useState(false);
    const toggleShow1 = () => setBasicModal1(!basicModal1);

    useEffect(() => {
        isLogin()
        .then(data => {
            setrole(data.role)
            setname(data.name)
            setid(data.id)
        })
    },[role, id, name])

    const filteredRequest = request.filter((data) => {
        const rowColorClass = getRowColorClass(data.createdAt);
        return selectedColor === 'all' || rowColorClass === selectedColor;
    });

    useEffect(() => {
        let totalPages = Math.floor(filteredRequest.length / 10);
        if (filteredRequest.length % 10 > 0) totalPages += 1;
        setTotal(totalPages);
    }, [filteredRequest]);

    useEffect(() => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}dragonpayout/find`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: "success",
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
                    Cookies.remove("auth", { path: '/' });
                    Cookies.remove("playfabAdminAuthToken", { path: '/' });
                    window.location.replace("/login");
                  }
                })
              }

            if(data.message === "success" && !data.expired){
                setIsLoading(false)
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
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
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
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
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
        <>
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
                        <th scope='col'>Id</th>
                        <th scope='col'>Username</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'>Payment Details</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Request At</th>
                        
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="text-white">
                { filteredRequest.length !== 0 ?
                    handlePagination(filteredRequest, page, 10)?.map((data,i) => (
                    <tr key={`request-${i}`}>
                        <td>{data.id}</td>
                        <td>{data.username}</td>
                        <td>{data.amount}</td>
                        <td>
                        <MDBBtn onClick={() => {
                            toggleShow1()
                            setPaymentdetail(data.paymentdetails)
                        }}>View</MDBBtn>
                        </td>
                        <td>{data.status}</td>
                        <td>{new Date(data.createdAt).toLocaleString()}</td>
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
        <MDBModal show={basicModal1} setShow={setBasicModal1} tabIndex='-1' staticBackdrop closeOnEsc={false}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader className="justify-content-center">
              <MDBModalTitle>User Payment Details</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
            <MDBTable>
                <MDBTableBody>
                <tr>
                    <th scope='col'>First Name</th>
                    <td>{paymentdetail.firstname}</td>
                </tr>
                <tr>
                    <th scope='col'>Middle Name</th>
                    <td>{paymentdetail.middlename}</td>
                </tr>
                <tr>
                    <th scope='col'>Last Name</th>
                    <td>{paymentdetail.lastname}</td>
                </tr>
                <tr>
                    <th scope='col'>Email</th>
                    <td>{paymentdetail.email}</td>
                </tr>
                <tr>
                    <th scope='col'>Mobile #</th>
                    <td>{paymentdetail.mobilenumber}</td>
                </tr>   
                <tr>
                    <th scope='col'>Birthdate</th>
                    <td>{paymentdetail.birthdate}</td>
                </tr> 
                <tr>
                    <th scope='col'>Nationality</th>
                    <td>{paymentdetail.nationality}</td>
                </tr> 
                <tr>
                <th scope='col'>Payment Method</th>
                    <td>{paymentdetail.paymentmethod}</td>
                </tr> 
                <tr>
                <th scope='col'>Payment Detail</th>
                    <td>{paymentdetail.paymentdetail}</td>
                </tr> 
                <tr>
                <th scope='col'>Address</th>
                    <td>{paymentdetail?.address?.Street1}, {paymentdetail?.address?.Street2}, {paymentdetail?.address?.Barangay}, {paymentdetail?.address?.City}, {paymentdetail?.address?.Province}, {paymentdetail?.address?.Country}</td>
                </tr> 
                </MDBTableBody>
            </MDBTable>
            
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow1}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
        </>
    )
}

export default SubAdminPayoutDragonDone;