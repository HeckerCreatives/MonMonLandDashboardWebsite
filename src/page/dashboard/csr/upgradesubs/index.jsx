import React, {useEffect, useState, useContext} from "react";
import { 
    MDBContainer, 
    MDBBtn, 
    MDBBadge, 
    MDBRow, 
    MDBCol, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody, 
    MDBTypography, 
    MDBCard, MDBCardBody, MDBCardText, MDBIcon, MDBCollapse, MDBInput,} from "mdb-react-ui-kit";
import ruby from "../../../../assets/subscription/ruby badge png.png"
import emerald from "../../../../assets/subscription/emerald png.png"
import diamond from "../../../../assets/subscription/diamond.png"
import Swal from "sweetalert2"
import Breadcrumb from "../../../../component/breadcrumb";
import PaginationPager from "../../../../component/pagination/index"
import Step2 from "./steps/step2";
import { handlePagination } from "../../../../component/utils";
import ChatPage from "../../../../component/minichatapp/ChatPage";
import io from "socket.io-client"
const socket = io(process.env.REACT_APP_API_URL)
const CsrUpgradeSubscriptionManual = () => {
    
    const [cashier, setCashier] = useState(''); 
    const [buyer, setBuyer] = useState([]);
    const [games, setGames] = useState([]),
          [page, setPage] = useState(1),
          [user, setUser] = useState([]),
          [notif, setNotif] = useState(""),
          [total, setTotal] = useState(0);
    const auth = JSON.parse(localStorage.getItem("auth"))
    const [rubyChecked, setRubyChecked] = useState(false);
    const [emeraldChecked, setEmeraldChecked] = useState(false);
    const [diamondChecked, setDiamondChecked] = useState(false);
    const [subscriptionId, setSubscriptionId] = useState("");
    const [price, setPrice] = useState("");
    const [history, setHistory] = useState("");


    function generateRandomString() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let randomString = '';
    
      for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
      }
    
      return randomString;
    }

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
                    const stats = "Open"
                    fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/${id}/destroybuyer`,{
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({stats: stats, cashierId: user._id})
                    }).then(result => result.json())
                    .then(data => {
                        if(data){
                        window.location.reload()
                        }
                    })
                }
            })     
        
        //        
    }
    
    const upgradebuyer = (e) => {
        e.preventDefault();
        const {username} = e.target
        const stats = "Open"
        Swal.fire({
            icon: "warning",
            title: "Are you sure this is the right user?",
            text: "You won't be able to revert this",
            showDenyButton: true,
            confirmButtonText: "Confirm",
            denyButtonText: "Cancel",
        }).then(result =>{
            if(result.isConfirmed){
                fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/updatebuyer/${buyer._id}`,{
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
                        clientusername: username.value,
                        stats: stats,
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

    useEffect(() => {
        let totalPages = Math.floor(history.length / 5);
        if (history.length % 5 > 0) totalPages += 1;
        setTotal(totalPages);
        }, [history]);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/find`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
        })
        .then(response => response.json())
        .then(result => {
            const filter = result.filter(e => e.userId._id === auth._id)            
            setUser(filter[0])            
        })
        
    },[auth])

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/findbuyer`)
        .then(response => response.json())
        .then(result => {
            const data = result.filter(e => e.cashier === auth.userName)
            setHistory(data)
        })
    },[])

    // useEffect(() => {
          
         
    //     // Add event listener for 'receive_message'
    //     socket.on('receive_notification', (data) => {
    //         setNotif(data.message); // You can handle the received data here
    //     });
    
    //     // Cleanup the socket connection on component unmount
    //     return () => {
    //         socket.off('receive_notification');
    //         // socket.off('join_room')
    //     };
        
    //   }, [socket]);

    
    const buy = (id) => {
        const stats = "Processing"
        fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/addbuyer`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    transactionnumber: generateRandomString(),
                    cashierId: id, 
                    stats: stats,
                })
                }).then(result => result.json())
                .then(data => {
                setBuyer(data)
                socket.emit('join_room', { username: auth.userName, room: auth.userName});
            })
        
    }
    return (
        <MDBContainer fluid className="">
        <Breadcrumb title="Upgrade Subscription" paths={[]}/>
        <MDBTypography className="fw-bold">Manual</MDBTypography>
        <MDBTypography className=" text-center text-success fw-bold">{notif}</MDBTypography>
        <MDBRow>
        <MDBCol>
        <>
        <MDBRow>
            <MDBCol lg={6}>
                <MDBCard className="h-100">
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol className="">
                            <MDBCardText className="fw-bold mt-2">Cashier Username: {auth.userName}</MDBCardText>
                            <MDBCardText className="text-mute">Created Time: {buyer.createdAt ? new Date(buyer.createdAt).toLocaleString(): ""}</MDBCardText>
                            </MDBCol>
                            <MDBCol className="">
                            <MDBCardText className="d-flex fw-bold mt-2" >
                            Cashier Status: 
                            &nbsp;<span style={{ color: user.status === 'Close' ? 'red' : user.status === 'Open' ? 'green' : 'blue' }}>{user.status}</span>
                            <MDBBtn 
                            className="mx-2" 
                            outline color="dark"
                            size="sm" 
                            onClick={() => buy(auth._id)}>
                            Create
                            </MDBBtn>

                            <MDBBtn
                            type="button"
                            className="mx-2" 
                            outline color="dark" size="sm" 
                            onClick={() => cancelorder(buyer._id)}>
                            Close
                            </MDBBtn> 
                            </MDBCardText>
                            <MDBCardText className="text-mute">Transaction Number: {buyer.transactionnumber}
                            &nbsp;<MDBIcon far icon="copy" />
                            </MDBCardText>                             
                            </MDBCol>
                        </MDBRow>

                        <MDBRow>
                            <MDBCol className="d-flex justify-content-between text-center mt-2">
                            <div>
                            <MDBCardText className="text-mute">No. of Transaction</MDBCardText>
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
                                <div className="offset-lg-2 col-lg-10">
                                <MDBCardText className="text-mute d-flex">Enter Subscriber Username :
                                &nbsp; <MDBInput size="sm" name="username"/>
                                </MDBCardText>                                
                                </div>

                                <div className="offset-lg-2 col-lg-10 mt-2">
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

                                <div className="offset-lg-2 col-lg-10 mt-2">
                                <MDBCardText className="text-mute">Subscription Price : {price ? "$"+price: ""}</MDBCardText>
                                </div>
                                <div className="d-flex justify-content-end mt-4">
                                <MDBBtn className="mx-2" type="submit">Upgrade Subscription</MDBBtn>
                                <MDBBtn className="mx-2" color="danger" type="button" onClick={() => cancelorder(buyer._id)}>Cancel Order</MDBBtn>
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
            <ChatPage socket={socket} user={user} buyer={buyer} room={auth.userName}/>
                
            </MDBCardBody>
        </MDBCard>
            </MDBCol>
        </MDBRow>
                
        </>
        
        </MDBCol>
        </MDBRow>
            
        </MDBContainer>
    )
}

export default CsrUpgradeSubscriptionManual;