import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBIcon, MDBRow, MDBCollapse, MDBInput,MDBTable, MDBTableHead, MDBTableBody,} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import ruby from "../../../../../assets/subscription/ruby badge png.png"
import emerald from "../../../../../assets/subscription/emerald png.png"
import diamond from "../../../../../assets/subscription/diamond.png"
import ChatPage from "../../../../../component/minichatapp/ChatPage";
import Swal from "sweetalert2"
import { handlePagination } from "../../../../../component/utils";
import PaginationPager from "../../../../../component/pagination/index"
const Step2 = ({user, step2toggle, setstep2toggle, Buyer, socket, buyer, room}) => {
  const [rubyChecked, setRubyChecked] = useState(false);
  const [emeraldChecked, setEmeraldChecked] = useState(false);
  const [diamondChecked, setDiamondChecked] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState("");
  const [price, setPrice] = useState("");
  const [history, setHistory] = useState("");
  const [page, setPage] = useState(1),
        [total, setTotal] = useState(0);

    useEffect(() => {
        let totalPages = Math.floor(history.length / 2);
        if (history.length % 2 > 0) totalPages += 1;
        setTotal(totalPages);
    }, [history]);

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/findbuyer`)
        .then(response => response.json())
        .then(result => {
            const data = result.filter(e => e.cashier === user.userId.userName)
            setHistory(data)
        })
    },[])

    const handleCheckboxChange = (checkboxName) => {
        if (checkboxName === 'ruby') {
        setSubscriptionId(process.env.REACT_APP_RUBY)
        setPrice("20")
        setRubyChecked(true);
        setEmeraldChecked(false);
        setDiamondChecked(false);
        } else if (checkboxName === 'emerald') {
        setSubscriptionId(process.env.REACT_APP_EMERALD)
        setPrice("45")
        setRubyChecked(false);
        setEmeraldChecked(true);
        setDiamondChecked(false);
        } else if (checkboxName === 'diamond') {
        setSubscriptionId(process.env.REACT_APP_DIAMOND)
        setPrice("100")  
        setRubyChecked(false);
        setEmeraldChecked(false);
        setDiamondChecked(true);
        }
    };

    const cancelorder = (id) => {
    Swal.fire({
        icon: "warning",
        title: "Are you sure to delete these items?",
        text: "You won't be able to revert this",
        showDenyButton: true,
        confirmButtonText: "Delete",
        denyButtonText: "Cancel",
        }).then(result => {
            if(result.isConfirmed){
                fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/${id}/destroybuyer`,{
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(result => result.json())
                .then(data => {
                    if(data){
                    setstep2toggle()
                    }
                })
            }
        })     
    
    //        
    }

    const upgradebuyer = (e) => {
        e.preventDefault();
        const {username} = e.target
        Swal.fire({
            icon: "warning",
            title: "Are you sure this is the right user?",
            text: "You won't be able to revert this",
            showDenyButton: true,
            confirmButtonText: "Confirm",
            denyButtonText: "Cancel",
        }).then(result =>{
            if(result.isConfirmed){
                fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/updatebuyer/${Buyer._id}`,{
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username.value,
                        subscription: subscriptionId,
                        cashierId: user._id,
                        amount: price,
                        cashier: user.userId.userName,
                        subscriptionlevel: subscriptionId,
                        price: price,
                        clientusername: username.value
                    })
                }).then(data =>{
                    if (data) {
                    Swal.fire({
                        title: "User Upgraded Successfully",
                        icon: "success",
                        text: "You Successfully Upgraded a User"
                    }).then(ok => {
                    if(ok.isConfirmed){
                        window.location.reload()
                    }
                    })
                        
                    } else {
                        Swal.fire({
                            title: "User Upgraded Unsuccessfully",
                            icon: "error",
                            text: "There is an error Upgrading the Account"
                        })
                    }
                })
            }
        })
        
    }

    return(
        <>
        <MDBCollapse show={step2toggle}>
        <MDBRow>
            <MDBCol lg={6}>
                <MDBCard className="h-100">
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol className="">
                            <MDBCardText className="fw-bold">Cashier Username: {user.userId.userName}</MDBCardText>
                            <MDBCardText className="text-mute">Created Time: {new Date(Buyer.createdAt).toLocaleString()}</MDBCardText>
                            </MDBCol>
                            <MDBCol className="">
                            <MDBCardText className="d-flex fw-bold" >
                            Cashier Status: 
                            &nbsp;<span style={{ color: user.status === 'Close' ? 'red' : user.status === 'Open' ? 'green' : 'blue' }}>{user.status}</span>
                            <MDBBtn className="mx-2" outline color="dark" size="sm">{user.status}</MDBBtn>
                                <MDBBtn
                                type="button"
                                className="mx-2" 
                                outline color="dark" size="sm" 
                                onClick={() => cancelorder(Buyer._id)}>
                                Close
                                </MDBBtn> 
                            </MDBCardText>
                            <MDBCardText className="text-mute">Transaction Number: {Buyer.transactionnumber}
                            &nbsp;<MDBIcon far icon="copy" />
                            </MDBCardText>                             
                            </MDBCol>
                        </MDBRow>

                        <MDBRow>
                            <MDBCol className="d-flex justify-content-between text-center mt-2">
                            <div>
                            <MDBCardText className="text-mute">Number of Transaction</MDBCardText>
                            <MDBCardText className="fw-bold">{user.numberoftransaction}</MDBCardText>

                            </div>                            
                            <div>
                            <MDBCardText className="text-mute">Payment Limit</MDBCardText>
                            <MDBCardText className="fw-bold">{user.paymentlimit} USDT</MDBCardText>
                            </div>                            
                            <div>
                            <MDBCardText className="text-mute">Quantity</MDBCardText>
                            <MDBCardText className="fw-bold">{user.paymentcollected} USDT</MDBCardText>
                            </div>                            
                            </MDBCol>
                        </MDBRow>
                        <hr/>
                        <MDBRow>
                            <MDBCol className="mt-2">
                                <div>
                                <MDBCardText className="fw-bold">Payment Details</MDBCardText>
                                </div>
                                <div className="offset-2 col-lg-10">
                                <MDBCardText className="text-mute">Payment Gateway : {user.paymentmethod}</MDBCardText>
                                </div>                            
                                <div className="offset-2 col-lg-10">
                                <MDBCardText className="text-mute">Account Number : {user.paymentdetail}</MDBCardText>
                                </div>                 
                            </MDBCol>
                        </MDBRow>
                        <hr/>
                        <MDBRow>
                            <form autoComplete="off" onSubmit={upgradebuyer}>
                            <MDBCol className="mt-2">
                                <div>
                                <MDBCardText className="fw-bold">Subscription Details</MDBCardText>
                                </div>
                                <div className="offset-2 col-lg-10">
                                <MDBCardText className="text-mute d-flex">Enter Subscriber Username :
                                &nbsp; <MDBInput size="sm" name="username"/>
                                </MDBCardText>                                
                                </div>

                                <div className="offset-2 col-lg-10 mt-2">
                                <MDBCardText className="text-mute d-flex">Select Subscription Level :
                                <div className="mx-2 d-flex justify-content-center align-items-center flex-column">
                                <img src={ruby} alt="" style={{height: "60px", width: "60px"}}/>
                                <label className="d-flex justify-content-center align-items-center flex-column">
                                <span className="pb-2">Ruby</span>
                                <input type="checkbox" checked={rubyChecked} onChange={() => handleCheckboxChange('ruby')} className="mx-2"/>                        
                                </label>
                                </div>

                                <div className="mx-2 d-flex justify-content-center align-items-center flex-column">
                                <img src={emerald} alt="" style={{height: "60px", width: "60px"}}/>
                                <label className="d-flex justify-content-center align-items-center flex-column">
                                <span className="pb-2">Emerald</span>
                                <input type="checkbox" checked={emeraldChecked} onChange={() => handleCheckboxChange('emerald')} className="mx-2"/>                        
                                </label>
                                </div>

                                <div className="mx-2 d-flex justify-content-center align-items-center flex-column">
                                <img src={diamond} alt="" style={{height: "60px", width: "60px"}}/>
                                <label className="d-flex justify-content-center align-items-center flex-column">
                                <span className="pb-2">Diamond</span>
                                <input type="checkbox" checked={diamondChecked} onChange={() => handleCheckboxChange('diamond')} className="mx-2"/>                        
                                </label>
                                </div>
                                </MDBCardText>
                                </div>

                                <div className="offset-2 col-lg-10 mt-2">
                                <MDBCardText className="text-mute">Subscription Price : {price ? "$"+price: ""}</MDBCardText>
                                </div>
                                <div className="d-flex justify-content-end mt-4">
                                <MDBBtn className="mx-2" type="submit">Upgrade Subscription</MDBBtn>
                                <MDBBtn className="mx-2" color="danger" type="button" onClick={() => cancelorder(Buyer._id)}>Cancel Order</MDBBtn>
                                </div>                  
                            </MDBCol>
                            </form>
                        </MDBRow>
                        <hr/>
                        <MDBRow>
                            <MDBCol>
                            <div>
                            <MDBCardText className="fw-bold">Payment History</MDBCardText>
                            </div>
                            <MDBTable align='middle' className="border mt-4" responsive>
                <MDBTableHead className="head text-center">
                    <tr >
                    <th className="fw-bold" scope='col'>Date Created</th>
                    <th className="fw-bold" scope='col'>Cashier Username</th>
                    <th className="fw-bold" scope='col'>Transaction Number</th>
                    <th className="fw-bold" scope='col'>Subscription Level</th>
                    <th className="fw-bold" scope='col'>Price</th>
                    <th className="fw-bold" scope='col'>Client Username</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="text-center">                
                {history ? 
                    <>
                {handlePagination(history, page, 2)?.map((data,i) =>(
                <tr key={`game-${i}`}>
                <td>{new Date(data.createdAt).toLocaleString()}</td>
                <td>
                    {data.cashier}
                </td>
                <td>
                    {data.transactionnumber}
                </td>
                <td>
                    {data.subscriptionlevel?.subscriptionName}
                </td>
                <td>
                    {`$${data.price}`}
                </td>
                <td>
                    {data.clientusername}
                </td>                
                </tr>
                ))}
                </>
                : null}
                </MDBTableBody>
                            </MDBTable>
                            <PaginationPager
                            total={total} page={page} setPage={setPage}/>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>

            <MDBCol>
            <MDBCard className="h-100">
            <MDBCardBody>
            <ChatPage socket={socket} user={user} buyer={buyer} room={room}/>
                {/* <MDBRow>
                    <MDBCol>
                        
                    </MDBCol>
                </MDBRow> */}
            </MDBCardBody>
        </MDBCard>
            </MDBCol>
        </MDBRow> 
       </MDBCollapse>

        
        </>
    )
}

export default Step2;