import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn,MDBRow, MDBCol, MDBTypography, MDBInput, MDBModal,
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
const AdminPayoutDone = () => {
    // const auth = JSON.parse(Cookies.get("auth"))
    const [page, setPage] = useState(0),
    [total, setTotal] = useState(0),
    [done, setDone] = useState([]),
    [receipt, setReceipt] = useState(""),
    [backup, setBackup] = useState([]);
    const [basicModal, setBasicModal] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const playfabToken = Cookies.get("playfabAdminAuthToken")

    const toggleShow = () => setBasicModal(!basicModal);
    // useEffect(() => {
    //     let totalPages = Math.floor(done.length / 5);
    //     if (done.length % 5 > 0) totalPages += 1;
    //     setTotal(totalPages);
    // }, [done]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}payout/adminfind?page=${page}&limit=5`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${auth?.token}`,
            },
            body: JSON.stringify({
                status: "done"
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
                setDone(data.data)
                setBackup(data.data)
                setTotal(data.pages)
            }
        })
    },[page,total])

    const handleReprocessed = (id,admin) => {
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
                fetch(`${process.env.REACT_APP_API_URL}payout/reprocess/${id}`, {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${auth?.token}`,
                    },
                    body: JSON.stringify({admin: admin, playfabToken: playfabToken})
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
                            title: "Payout is now in reprocess",
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

    const handleSearch = e => {
        const str = e.target.value;
        if (str) {
          const regex = new RegExp(str, "i"); 
          setDone(
            backup.filter(e =>
              regex.test(e.username)
            )
          );
        } else {
          setDone(backup);
        }
    };
      
    return (
    <>
        <MDBContainer fluid>
        <MDBRow className="mt-5">
            <MDBCol md={6}>
            <div>
                <MDBTypography className="fw-bold m-0">Search Username:</MDBTypography>
                <MDBInput type="search" size="sm" onChange={handleSearch}/>
            </div>
            </MDBCol>
        </MDBRow>
            <MDBTable responsive className="mt-3 text-center " align="middle">
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
                    <th scope='col'>Receipt</th>
                    <th scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody >
                { done.length !== 0 ?
                    done.map((data,i) => {
                        const tenpercent = data.amount * 0.05;
                        const bawas = data.amount - tenpercent
                    return(
                        <tr key={`done-${i}`}>
                        <td >{data.id}</td>
                        <td>{data.username}</td>
                        <td>{bawas}</td>
                        <td>{new Date(data.createdAt).toLocaleString()}</td>
                        <td>{data.walletaddress}</td>
                        <td>{data.network}</td>
                        <td>{data.paymentmethod}</td>
                        <td>{data.admin}</td>
                        <td>
                        <MDBBtn 
                        onClick={() => {
                        toggleShow()
                        setReceipt(data.receipt)
                        }}
                        >View Receipt</MDBBtn>
                        </td>
                        <td>
                            <MDBBtn onClick={() => handleReprocessed(data._id,data.admin)}>
                            
                            {isloading ? <MDBSpinner size="sm" role='status' grow/> : "Re-Processed"}
                            </MDBBtn>
                        </td>
                    </tr>
                    )
                })
                :
                    <tr>
                        <td colSpan={10}>
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

        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1' staticBackdrop closeOnEsc="false">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Receipt Image</MDBModalTitle>
              {/* <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn> */}
            </MDBModalHeader>
            <MDBModalBody>
            <img src={receipt} alt="" className="img-fluid"/>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
    )
}

export default AdminPayoutDone;