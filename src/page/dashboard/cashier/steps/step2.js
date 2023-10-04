import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBInput, MDBRow, MDBCollapse,MDBIcon} from "mdb-react-ui-kit";
import React, { useEffect , useState} from "react";
// import Home from "../../../../../component/minichatapp/Home";
import ChatPage from "../../../../component/minichatapp/ChatPage";
import { Toast } from "../../../../component/utils";
import Swal from "sweetalert2";
import ruby from "../../../../assets/subscription/ruby badge.png"
import emerald from "../../../../assets/subscription/emerald.png"
import diamond from "../../../../assets/subscription/diamond.png"
const CashierStep2 = ({user, step2toggle, setstep2toggle, recipientId, room, buyer, socket, transactionno}) => {
    const [image, setImage] = useState("");
    const [cashier, setcashier] = useState([]);
    const [bibiliuser, setBibiliUser] = useState("");
    const [bibiliuserplayfabid, setBibiliUserPlayfabid] = useState("");

    const kapy = (text) => {
        navigator.clipboard.writeText(text)
        Toast.fire({
            icon: 'success',
            title: 'Copy successfully'
        })
      }
    
    const cancel = () => {
        Swal.fire({
            icon: "warning",
            title: "Are you sure ?",
            text: "You will cancel the transaction",
            showDenyButton: true,
            confirmButtonText: "Confirm",
            denyButtonText: "Cancel",
        }).then(e => {
            if(e.isConfirmed){
            socket.emit('cancelTransactionUser')
            window.location.reload()
            }
        })

        
    }
    useEffect(()=> {
        
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);

        const username = params.get('username');
        const id = params.get('id');
        setBibiliUser(username)
        setBibiliUserPlayfabid(id)
        socket.on('badge', ({item}) => {
            
            const coma = item.toLocaleString()
            setImage(coma)
        })

        socket.on("admindetails", (data) => {
            setcashier(data)
        })
        socket.on("donegetlist", () => {
            socket.emit("refreshque", {room: room})
        })
        return () => {
            // Clean up your socket event listener when the component unmounts
            socket.off('badge');
            socket.off('refreshque');
            socket.off('admindetails');
            
        }
    },[socket])
    return(
        <>
        <MDBCollapse show={step2toggle}>       
        <MDBRow>
            <MDBCol lg={6} className="mb-lg-0 mb-5">
                <MDBCard className="h-100 mb-lg-0 mb-sm-5">
                    <MDBCardBody>
                        <MDBRow >
                            <MDBCol className="text-center">
                            <MDBCardText className="fw-bold">Cashier: {cashier?.user}</MDBCardText>                            
                            </MDBCol>
                            
                            <MDBCol className="text-center">
                            <MDBCardText className="fw-bold" >
                            Status: 
                            &nbsp;<span style={{ color: user ? user.status : null === 'Close' ? 'red' : user ? user.status : null === 'Open' ? 'green' : 'blue' }}> {user ? user.status : null}</span>
                            </MDBCardText>                           
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol className="d-flex justify-content-between align-items-center mt-2">
                            <div>
                            <MDBCardText className="text-mute">Number of Transaction</MDBCardText>
                            
                            <MDBCardText className="fw-bold"> {cashier.length !== 0 ? cashier?.item[0]?.numberoftransaction : ""}</MDBCardText>
                            </div>                            
                            <div>
                            <MDBCardText className="text-mute">Payment Limit</MDBCardText>
                            <MDBCardText className="fw-bold">{cashier.length !== 0 ? cashier?.item[0]?.paymentlimit : ""} USDT</MDBCardText>
                            </div>                            
                            <div>
                            <MDBCardText className="text-mute">Quantity</MDBCardText>
                            <MDBCardText className="fw-bold">{cashier.length !== 0 ? cashier?.item[0]?.paymentcollected: ""} USDT</MDBCardText>
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
                                <MDBCardText className="text-mute">Payment Gateway : {cashier.length !== 0 ? cashier?.item[0]?.paymentmethod: ""}</MDBCardText>
                                </div>                            
                                <div className="offset-2 col-lg-10">
                                <MDBCardText className="text-mute">Wallet Address : {cashier.length !== 0 ? cashier?.item[0]?.paymentdetail: ""}
                                &nbsp;<MDBIcon far icon="copy" className="icon-zoom"  onClick={() =>kapy(cashier.length !== 0 ? cashier?.item[0]?.paymentdetail: "")}/>
                                </MDBCardText>
                                </div>                 
                            </MDBCol>
                        </MDBRow>
                        <hr/>
                        <MDBRow>
                            <MDBCol className="mt-2">
                                <div>
                                <MDBCardText className="fw-bold">Top Up Amount Details</MDBCardText>
                                </div>
                                <div className="offset-2 col-lg-10">
                                <MDBCardText className="text-mute">Transaction Number: {transactionno}</MDBCardText>
                                </div>
                                <div className="offset-2 col-lg-10">
                                <MDBCardText className="text-mute">Username: {bibiliuser}</MDBCardText>
                                </div>                            
                                <div className="offset-2 col-lg-10">
                                <MDBCardText className="text-mute">Id: {bibiliuserplayfabid}
                                </MDBCardText>
                                </div>
                                <div className="offset-2 col-lg-10">
                                <MDBCardText className="text-mute">Top Up Amount:
                                &nbsp; {image}
                                </MDBCardText>
                                </div>                  
                            </MDBCol>
                        </MDBRow>
                        <hr/>
                        <MDBRow>
                            <MDBCol className="mt-2">
                                <div className="head p-3">
                                <MDBCardText className="fw-bold">Payment to be made: Timer here</MDBCardText>
                                </div> 
                                <div className="p-3">
                                <MDBCardText tag="p" className="d-flex">Please make a payment within 60:00 mins. otherwise, the order will be cancelled
                                <div className="d-flex align-items-center">
                                <MDBBtn 
                                className="mx-3" 
                                color="danger"
                                onClick={cancel}
                                >Cancel Order</MDBBtn>
                                </div>
                                </MDBCardText>
                                </div>               
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>

            <MDBCol>
            <MDBCard>
            <MDBCardBody>
            <ChatPage socket={socket} recipientId={recipientId} room={room} buyer={buyer} msguser={bibiliuser} rcvrid={cashier.length !== 0 ? cashier.id : ""}/>
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

export default CashierStep2;