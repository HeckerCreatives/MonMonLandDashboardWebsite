import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBInput, MDBRow, MDBCollapse,MDBIcon} from "mdb-react-ui-kit";
import React from "react";
// import Home from "../../../../../component/minichatapp/Home";
import ChatPage from "../../../../component/minichatapp/ChatPage";
import socketIO from "socket.io-client"

const socket = socketIO.connect("https://monmontestserver-lotk.onrender.com");
const CashierStep2 = ({user, step2toggle, setstep2toggle}) => {

    return(
        <>
        <MDBCollapse show={step2toggle}>       
        <MDBRow>
            <MDBCol lg={6}>
                <MDBCard className="h-100">
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol className="">
                            <MDBCardText className="fw-bold">Cashier Username: {user.userName}</MDBCardText>
                            <MDBCardText className="text-mute">Created Time:</MDBCardText>
                            </MDBCol>
                            <MDBCol className="">
                            <MDBCardText className="d-flex fw-bold" >
                            Cashier Status: 
                            &nbsp;<span style={{ color: user.status === 'Close' ? 'red' : user.status === 'Open' ? 'green' : 'blue' }}>{user.status}</span>
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
                                <MDBCardText className="text-mute">Payment Gateway :</MDBCardText>
                                </div>                            
                                <div className="offset-2 col-lg-10">
                                <MDBCardText className="text-mute">Account Number :
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
                        <ChatPage socket={socket} user={user}/>
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