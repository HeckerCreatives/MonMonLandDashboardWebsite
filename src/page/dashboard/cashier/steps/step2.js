import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBInput, MDBRow, MDBCollapse,MDBIcon} from "mdb-react-ui-kit";
import React, { useEffect } from "react";
// import Home from "../../../../../component/minichatapp/Home";
import ChatPage from "../../../../component/minichatapp/ChatPage";
import io from "socket.io-client"
import Swal from "sweetalert2";
const CashierStep2 = ({user, step2toggle, setstep2toggle, recipientId, room, buyer, socket}) => {

    
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
                            <MDBCardText className="text-mute">Created Time:</MDBCardText>
                            </MDBCol>
                            <MDBCol className="">
                            <MDBCardText className="d-flex fw-bold" >
                            Cashier Status: 
                            &nbsp;<span style={{ color: user ? user.status : null === 'Close' ? 'red' : user ? user.status : null === 'Open' ? 'green' : 'blue' }}> {user ? user.status : null}</span>
                            </MDBCardText>
                            <MDBCardText className="text-mute">Transaction Number: DSSA235SD15S3A
                            &nbsp;<MDBIcon far icon="copy" />
                            </MDBCardText>                             
                            </MDBCol>
                        </MDBRow>

                        <MDBRow>
                            <MDBCol className="d-flex justify-content-between text-center mt-2">
                            <div>
                            <MDBCardText className="text-mute">Number of Transaction</MDBCardText>
                            <MDBCardText className="fw-bold">100</MDBCardText>

                            </div>                            
                            <div>
                            <MDBCardText className="text-mute">Payment Limit</MDBCardText>
                            <MDBCardText className="fw-bold">100000 USDT</MDBCardText>
                            </div>                            
                            <div>
                            <MDBCardText className="text-mute">Quantity</MDBCardText>
                            <MDBCardText className="fw-bold">123456 USDT</MDBCardText>
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
                                <MDBCardText className="text-mute">Account Number : {user.paymentdetail}
                                &nbsp;<MDBIcon far icon="copy" />
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
                                <MDBBtn className="mx-3" color="danger">Cancel Order</MDBBtn>
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
                <MDBRow>
                    <MDBCol>
                        <ChatPage socket={socket} recipientId={recipientId} room={room} buyer={buyer}/>
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>
        </MDBCard>
            </MDBCol>
        </MDBRow>
       </MDBCollapse>

        
        </>
    )
}

export default CashierStep2;