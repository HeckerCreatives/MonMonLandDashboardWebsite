import { 
    MDBCol, 
    MDBContainer, 
    MDBRow, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody, 
    MDBInput, 
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBSpinner,} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
const TopUpResolver = () => {
    // const auth = JSON.parse(Cookies.get("auth"))
    const playfabToken = Cookies.get("playfabAdminAuthToken")
    const [pending, setpending] = useState(0)
    const [success, setsuccess] = useState(0)
    const [playfabid, setplayfabid] = useState("")
    const [username, setusername] = useState("")
    const [image, setImage] = useState("")
    const [resolvehistory, setresolvehistory] = useState([])
    const [receipt, setReceipt] = useState("");
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    const [isloading, setIsLoading] = useState(false)

    useEffect(() => {   
        fetch(`${process.env.REACT_APP_API_URL}topupresolver/find`,{
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            // body: JSON.stringify({admin: auth.userName})
        }).then(result => result.json())
        .then(data => {
            if(data.message === "success"){
                setresolvehistory(data.data)
            }
        })
    },[])

    const search = (e) => {
        e.preventDefault();
        setpending(0)
        setsuccess(0)
        setplayfabid("")
        setusername("")
        const {searchtype, input} = e.target
        fetch(`${process.env.REACT_APP_API_URL}topupresolver/search`,{
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${auth?.token}`,
            },
            body: JSON.stringify({
                searchtype: searchtype.value,
                input: input.value
            })
        })
        .then(result => result.json())
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
            } else {
                if(!data.expired && data.message === "success"){
                    const pending = data.data.filter(a => a.status === "pending")
                    const success = data.data.filter(a => a.status === "success")
                    setpending(pending.length)
                    setsuccess(success.length)
                    setplayfabid(data.data[0].playerPlayfabId)
                    setusername(data.data[0].username)
                }
            }
            
        })
    }

    const resolve = (e) => {
        e.preventDefault();
        const { playfabid , amount, username } = e.target
        setIsLoading(true)
        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            showDenyButton: true,
            confirmButtonText: "Confirm",
            denyButtonText: "Cancel",
        }).then(ok => {
            if(ok.isConfirmed){
                const data = new FormData()
                data.append("playfabid", playfabid.value)
                data.append("amount", amount.value)
                data.append("playfabToken", playfabToken)
                data.append("username", username.value)
                data.append("file", image)
                // data.append("admin", auth.userName)
                fetch(`${process.env.REACT_APP_API_URL}topupresolver/resolve`,{
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        "Accept": "application/json",
                        // Authorization: `Bearer ${auth?.token}`,
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
                    } else {
                        if(!data.expired && data.message === "success"){
                            setIsLoading(false)
                            Swal.fire({
                                title: "Resolve Successfully",
                                icon: "success",
                                text: "Resolve success please remind the player after this"
                            }).then(ok => {
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

    const handleImg = (e) => {
        const file = e.target.files[0];
        if (file) {
        // You can do further processing here, such as displaying a preview or uploading the image.
        setImage(file);
        }
    }

    return(
        <>
        <MDBContainer fluid>
            <MDBRow className="mt-5">
                <MDBCol lg={6}>
                <MDBCard alignment="center">
                <form onSubmit={(e) => search(e)}>
                <MDBCardBody>
                    <label for="searchtype">Search Type:</label>
                    &nbsp;
                    <select id="searchtype" name="searchtype" required>
                        <option value="" disabled selected>Please Select </option>
                        <option value="username">Username</option>
                        <option value="orderCode">Order Code</option>
                    </select>

                    <MDBInput name="input" label="Username/OrderCode" className="mt-3" required/>
                    <MDBBtn className="mt-3" type="submit" disabled={isloading}>
                    {isloading ? <MDBSpinner role='status' size="sm" grow/> : "Search"}
                    </MDBBtn>
                    </MDBCardBody>
                </form>
                </MDBCard>
                
                </MDBCol>

                <MDBCol lg={6}>
                    <MDBCard>
                        <MDBCardBody>
                        { username ? 
                        <>
                            <MDBCardTitle>Result</MDBCardTitle>
                            <MDBCardText>
                            RECEIPT EXISTING (PENDING): {pending}
                            </MDBCardText>
                            <MDBCardText>
                            RECEIPT EXISTING (SUCCESS): {success}
                            </MDBCardText>
                            <MDBCardText>
                            PlayfabId: {playfabid}
                            </MDBCardText>
                            <MDBCardText>
                            Username: {username}
                            </MDBCardText>
                        </>
                        :
                        <>
                            <MDBCardTitle>No Data</MDBCardTitle>
                        </>
                        }
                            
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol className="mt-5 col-lg-6 offset-3">
                <MDBCard alignment="center">
                        <form onSubmit={resolve}> 
                        <MDBCardBody>
                           <MDBInput name="username" label="username" className="mt-3" required/>
                           <MDBInput name="playfabid" label="playfabid" className="mt-3" required/>
                           <MDBInput name="amount" label="amount" className="mt-3" required/>
                           <div>
                           <input
                                type="file"
                                accept="image/*" // Limit to image files only
                                onChange={(e) => handleImg(e)}
                                className="mt-3" 
                                required
                            />
                           </div>
                           
                           <MDBBtn type="submit" className="mt-3" disabled={isloading}>
                           {isloading ? <MDBSpinner role='status' size="sm" grow/> : "Top Up"}
                           </MDBBtn>
                        </MDBCardBody>
                        </form>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol>
                    <MDBTable responsive className="text-center mt-5">
                        <MDBTableHead className="head">
                            <tr>
                            <th scope='col'>Username</th>
                            <th scope='col'>Game Id</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'>Admin</th>
                            <th scope='col'>Receipt</th>
                            <th scope='col'>Date</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                        {
                            resolvehistory.map((history,i) => (
                            <tr key={`index-${i}`}>
                            <td>{history.username}</td>
                            <td>{history.playfabid}</td>
                            <td>{history.amount}</td>
                            <td>{history.admin}</td>
                            <td>
                            <MDBBtn 
                            onClick={() => {
                                setReceipt(history.receipt)
                                toggleShow()
                            }}>
                            View Receipt
                            </MDBBtn>

                            </td>
                            
                            <td>{new Date(history.createdAt).toLocaleString()}</td>
                            </tr>
                            ))
                        
                        }
                            
                        </MDBTableBody>
                    </MDBTable>
                </MDBCol>
            </MDBRow>
        </MDBContainer>

        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Receipt</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            {receipt ? <img src={(`${process.env.REACT_APP_API_URL}${receipt}`)} alt="" className="img-fluid"/>  : 
            "no receipt attached"}
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

export default TopUpResolver;