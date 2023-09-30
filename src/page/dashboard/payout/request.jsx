import { 
    MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBRow, MDBCol, MDBTypography, 
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter, } from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import PaginationPager from "../../../component/pagination";
import Swal from "sweetalert2";
const AdminPayoutRequest = () => {
    const [page, setPage] = useState(1),
    [total, setTotal] = useState(0),
    [payoutid, setPayoutId] = useState(""),
    [selectedcashier, setSelectedCashier] = useState(""),
    [cashier, setCashier] = useState([]),
    [request, setRequest] = useState([]);
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    const [selectedColor, setSelectedColor] = useState('all'); // Initialize with an empty string

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
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: "pending"
            })
        }).then(result => result.json())
        .then(data => {
            if(data.message === "success"){
                setRequest(data.data)
            }
        })
    },[])

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/find`)
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
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            admin: selectedcashier
                        })
                    }).then(result => result.json())
                    .then(data => {
                        if(data.message === "success"){
                            Swal.fire({
                                icon: "success",
                                title: "Payout is now in process",
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
                            <MDBBtn onClick={() => handleCashierData(data._id)}>Process</MDBBtn>
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
                    <option key={`cashier-${i}`} value={data.userId.userName}>{data.userId.userName}</option>
                ))}
                </select>
            </div>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleProcess}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
        </>
    )
}

export default AdminPayoutRequest;