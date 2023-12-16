import { 
    MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBRow, MDBCol, MDBTypography, 
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBSpinner } from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import PaginationPagerQuery from "../../../component/pagination/query";
import Swal from "sweetalert2";
import { handlePagination } from "../../../component/utils";
import Cookies from 'js-cookie';
const AdminPayoutRequest = () => {
    // const auth = JSON.parse(Cookies.get("auth"))
    const playfabToken = Cookies.get("playfabAdminAuthToken")
    const [page, setPage] = useState(0),
    [total, setTotal] = useState(0),
    [payoutid, setPayoutId] = useState(""),
    [selectedcashier, setSelectedCashier] = useState([]),
    [cashier, setCashier] = useState([]),
    [request, setRequest] = useState([]);
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
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
                // Authorization: `Bearer ${auth?.token}`,
            },
            body: JSON.stringify({
                status: "pending"
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
                    Cookies.remove("auth", { path: '/' });;
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
    },[setPage,total, page])

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/find`,{
            credentials: 'include',
        })
        .then(result => result.json())
        .then(data => {
            if(data){
                setCashier(data)
            }
        })
    },[])

    const handleCashierData = (id) => {
        toggleShow()
        setPayoutId(id)
    }

    const handleProcess = () => {
        if(selectedcashier === ""){
            Swal.fire({
                icon: "warning",
                title: "Please select cashier first",
            })
        } else {
            setIsLoading(true)
            Swal.fire({
                icon: "warning",
                title: "Are you sure you want to assign this payout to this cashier?",
                text: "You won't be able to revert this",
                showDenyButton: true,
                confirmButtonText: "Confirm",
                denyButtonText: "Cancel",
            }).then(ok => {
                if(ok.isConfirmed){
                    fetch(`${process.env.REACT_APP_API_URL}payout/process/${payoutid}`, {
                        method: "POST",
                        credentials: 'include',
                        headers: {
                            "Content-Type": "application/json",
                            // Authorization: `Bearer ${auth?.token}`,
                        },
                        body: JSON.stringify({
                            admin: selectedcashier?.userId?.userName,
                            adminId: selectedcashier._id,
                            playfabToken: playfabToken
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
                                Cookies.remove("auth", { path: '/' });;
                                Cookies.remove("playfabAdminAuthToken", { path: '/' });
                                window.location.replace("/login");
                              }
                            })
                        }

                        if(data.message === "success" && !data.expired){
                            setIsLoading(false)
                            Swal.fire({
                                icon: "success",
                                title: "Payout is now in process",
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
                    })
                } else {
                    setIsLoading(false)
                }
            })
            
        }
       
        
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
                            <MDBBtn onClick={() => handleCashierData(data._id)}>
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
                total={total} 
                page={page} 
                setPage={setPage} 
                isLoading={isloading}
            />
        </MDBContainer>
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1' staticBackdrop closeOnEsc={false}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Please Select Cashier</MDBModalTitle>
            </MDBModalHeader>

            <MDBModalBody>
            <div>
                <select  onChange={(e) => setSelectedCashier(e.target.value)} style={{width: "100%"}}>
                <option selected disabled>Select</option>
                {cashier.map((data, i) =>(
                    <option key={`cashier-${i}`} value={data}>{data.userId.userName}</option>
                ))}
                </select>
            </div>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleProcess}>
              {isloading ? <MDBSpinner size="sm" role='status' grow/> : "Save changes"}
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
        </>
    )
}

export default AdminPayoutRequest;