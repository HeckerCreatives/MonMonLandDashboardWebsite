import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn,MDBRow, MDBCol, MDBTypography,MDBSpinner  } from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import PaginationPagerQuery from "../../../component/pagination/query";
import Swal from "sweetalert2";
import { Toast } from "../../../component/utils"
import UploadWidget from "../../../component/uploadwidget/uploadwidet";
import { handlePagination } from "../../../component/utils";
import Cookies from 'js-cookie';
const AdminPayoutProcess = () => {
    const auth = JSON.parse(Cookies.get("auth"))
    const playfabToken = Cookies.get("playfabAdminAuthToken")
    const [page, setPage] = useState(0),
    [total, setTotal] = useState(0),
    [image, setImage] = useState(""),
    [filename, setFilename] = useState(""),
    [processed, setProcessed] = useState([]);
    const [selectedColor, setSelectedColor] = useState('all'); // Initialize with an empty string
    const [isloading, setIsLoading] = useState(false);

    const filteredRequest = processed.filter((data) => {
        const rowColorClass = getRowColorClass(data.createdAt);
        return selectedColor === 'all' || rowColorClass === selectedColor;
    });
    const [imageStatus, setImageStatus] = useState(false)

    // useEffect(() => {
    //     let totalPages = Math.floor(filteredRequest.length / 5);
    //     if (filteredRequest.length % 5 > 0) totalPages += 1;
    //     setTotal(totalPages);
    // }, [filteredRequest]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}payout/adminfind?page=${page}&limit=5`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token}`,
            },
            body: JSON.stringify({
                status: "process"
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
                setProcessed(data.data)
                setTotal(data.pages)
            }
        })
    },[page,total])

    const handleDone = (id) => {
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
                const data = new FormData()
                data.append("admin", auth.userName)
                data.append("file", image)
                data.append("adminId", auth._id)
                data.append("playfabid", auth.playfabid)
                data.append("playfabToken", playfabToken)
                
                fetch(`${process.env.REACT_APP_API_URL}payout/done/${id}`, {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        "Accept": "application/json",
                        Authorization: `Bearer ${auth?.token}`,
                    },
                    body: data
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
                            title: "Payout is now mark as done",
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
    const file = url.target.files[0];
    // Use the uploaded image URL in the parent component or pass it to another component
    // When an image is uploaded for a specific row, update the imageStatus state
    setImageStatus(prevStatus => ({
        ...prevStatus,
        [rowIndex]: true, // Set the upload status for the specific row to true
    }));

      if(file){
        setImage(file);
      }
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
                            <div>
                                <input
                                    type="file"
                                    className="m-1"
                                    accept="image/*" // Limit to image files only
                                    onChange={(url) => handleImgUrl(url, i)}
                                />
                            </div>
                            <MDBBtn block className="mx-1" onClick={() => copywallet(data.walletaddress)}>Copy Wallet</MDBBtn>
                            <MDBBtn block disabled={!imageStatus[i]} className="mx-1" onClick={() => handleDone(data._id)}>
                            {isloading ? <MDBSpinner size="sm" role='status' grow/> : "Done"}
                            </MDBBtn>
                            
                            {/* <UploadWidget
                            setfileName={handleFilename} 
                            setImgUrl={(url) => handleImgUrl(url, i)}
                            /> */}
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
            <PaginationPagerQuery
                total={total} page={page} setPage={setPage} isLoading={isloading}
            />
        </MDBContainer>
    )
}

export default AdminPayoutProcess;