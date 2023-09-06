import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBInput, MDBRow, MDBCollapse,MDBIcon} from "mdb-react-ui-kit";
import React, { useEffect , useState} from "react";
// import Home from "../../../../../component/minichatapp/Home";
import ChatPage from "../../../../component/minichatapp/ChatPage";
import { Toast } from "../../../../component/utils";

const CashierStep2 = ({user, step2toggle, setstep2toggle, recipientId, room, buyer, socket}) => {
    const kapy = (text) => {
        navigator.clipboard.writeText(text)
        Toast.fire({
            icon: 'success',
            title: 'Copy successfully'
        })
      }
    
    return(
        <>
        <MDBCollapse show={step2toggle}>       
        <MDBRow>
            <MDBCol lg={6} className="mb-lg-0 mb-5">
                <MDBCard className="h-100 mb-lg-0 mb-sm-5">
                    <MDBCardBody>
                        <MDBRow >
                            <MDBCol className="text-center">
                            <MDBCardText className="fw-bold">Cashier: {user.userId.userName}</MDBCardText>                            
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
                                <MDBCardText className="text-mute">Account Number : {user.paymentdetail}
                                &nbsp;<MDBIcon far icon="copy" className="icon-zoom"  onClick={() =>kapy(user.paymentdetail)}/>
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
                                onClick={() => window.location.href = "/"}
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
            <ChatPage socket={socket} recipientId={recipientId} room={room} buyer={buyer}/>
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