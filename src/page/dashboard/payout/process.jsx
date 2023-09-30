import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn,MDBRow, MDBCol, MDBTypography } from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import PaginationPager from "../../../component/pagination";
import Swal from "sweetalert2";
import { Toast } from "../../../component/utils"
import UploadWidget from "../../../component/uploadwidget/uploadwidet";
const AdminPayoutProcess = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const [page, setPage] = useState(1),
    [total, setTotal] = useState(0),
    [image, setImage] = useState(""),
    [filename, setFilename] = useState(""),
    [processed, setProcessed] = useState([]);
    const [selectedColor, setSelectedColor] = useState('all'); // Initialize with an empty string

    const filteredRequest = processed.filter((data) => {
        const rowColorClass = getRowColorClass(data.createdAt);
        return selectedColor === 'all' || rowColorClass === selectedColor;
    });
    const [imageStatus, setImageStatus] = useState(false)

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
                status: "process"
            })
        }).then(result => result.json())
        .then(data => {
            if(data.message === "success"){
                setProcessed(data.data)
            }
        })
    },[])

    const handleDone = (id) => {
        Swal.fire({
            icon: "warning",
            title: "Are you sure you want to mark as done this payout?",
            text: "You won't be able to revert this",
            showDenyButton: true,
            confirmButtonText: "Confirm",
            denyButtonText: "Cancel",
        }).then(ok => {
            if(ok.isConfirmed){
                fetch(`${process.env.REACT_APP_API_URL}payout/done/${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        admin: auth.userName,
                        receipt: image,
                    })
                }).then(result => result.json())
                .then(data => {
                    if(data.message === "success"){
                        Swal.fire({
                            icon: "success",
                            title: "Payout is now mark as done",
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

    const copywallet = (text) => {
        navigator.clipboard
        .writeText(text)
        .then(
            Toast.fire({
                icon: "success",
                text: "Copied Successfully"
            })
        )
    }

    const handleImgUrl = (url,rowIndex) => {
    // Use the uploaded image URL in the parent component or pass it to another component
    // When an image is uploaded for a specific row, update the imageStatus state
    setImageStatus(prevStatus => ({
        ...prevStatus,
        [rowIndex]: true, // Set the upload status for the specific row to true
      }));
    setImage(url);
    };

    const handleFilename = (url) => {
    // Use the uploaded image URL in the parent component or pass it to another component
    setFilename(url);
    };

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
                    <th scope='col'>Admin</th>
                    <th scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="text-white">
                { filteredRequest.length !== 0 ?
                    filteredRequest.map((data,i) => (
                    <tr key={`processed-${i}`} className={`bg-${getRowColorClass(data.createdAt)}`}>
                        <td>{data.id}</td>
                        <td>{data.username}</td>
                        <td>{data.amount}</td>
                        <td>{new Date(data.createdAt).toLocaleString()}</td>
                        <td>{data.walletaddress}</td>
                        <td>{data.network}</td>
                        <td>{data.paymentmethod}</td>
                        <td>{data.admin}</td>
                        <td>
                            <MDBBtn disabled={!imageStatus[i]} className="mx-1" onClick={() => handleDone(data._id)}>Done</MDBBtn>
                            <MDBBtn className="mx-1" onClick={() => copywallet(data.walletaddress)}>Copy Wallet</MDBBtn>
                            <UploadWidget
                            setfileName={handleFilename} 
                            setImgUrl={(url) => handleImgUrl(url, i)}
                            />
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

export default AdminPayoutProcess;