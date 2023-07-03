import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBIcon, MDBRow, MDBCollapse, MDBInput,MDBTable, MDBTableHead, MDBTableBody,} from "mdb-react-ui-kit";
import React from "react";
import ruby from "../../../../../assets/subscription/ruby badge png.png"
import emerald from "../../../../../assets/subscription/emerald png.png"
import diamond from "../../../../../assets/subscription/diamond.png"
import ChatPage from "../../../../../component/minichatapp/ChatPage";
import socketIO from "socket.io-client"

const socket = socketIO.connect("https://monmontestserver-lotk.onrender.com");
const Step2 = ({user, step2toggle, setstep2toggle}) => {
    // console.log(user[0].status)
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
                            <MDBBtn className="mx-2" outline color="dark" size="sm">Open</MDBBtn>
                                <MDBBtn
                                className="mx-2" 
                                outline color="dark" size="sm" 
                                onClick={setstep2toggle}>
                                Close
                                </MDBBtn> 
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
                                <MDBCardText className="text-mute">Account Number :</MDBCardText>
                                </div>                 
                            </MDBCol>
                        </MDBRow>
                        <hr/>
                        <MDBRow>
                            <MDBCol className="mt-2">
                                <div>
                                <MDBCardText className="fw-bold">Subscription Details</MDBCardText>
                                </div>
                                <div className="offset-2 col-lg-10">
                                <MDBCardText className="text-mute d-flex">Enter Subscriber Username :
                                &nbsp; <MDBInput size="sm"/>
                                </MDBCardText>                                
                                </div>

                                <div className="offset-2 col-lg-10 mt-2">
                                <MDBCardText className="text-mute d-flex">Select Subscription Level :
                                <div className="mx-2 d-flex justify-content-center align-items-center flex-column">
                                <img src={ruby} alt="" style={{height: "60px", width: "60px"}}/>
                                <label className="d-flex justify-content-center align-items-center flex-column">
                                <span className="pb-2">Ruby</span>
                                <input type="checkbox" className="mx-2"/>                        
                                </label>
                                </div>

                                <div className="mx-2 d-flex justify-content-center align-items-center flex-column">
                                <img src={emerald} alt="" style={{height: "60px", width: "60px"}}/>
                                <label className="d-flex justify-content-center align-items-center flex-column">
                                <span className="pb-2">Emerald</span>
                                <input type="checkbox" className="mx-2"/>                        
                                </label>
                                </div>

                                <div className="mx-2 d-flex justify-content-center align-items-center flex-column">
                                <img src={diamond} alt="" style={{height: "60px", width: "60px"}}/>
                                <label className="d-flex justify-content-center align-items-center flex-column">
                                <span className="pb-2">Diamond</span>
                                <input type="checkbox" className="mx-2"/>                        
                                </label>
                                </div>
                                </MDBCardText>
                                </div>

                                <div className="offset-2 col-lg-10 mt-2">
                                <MDBCardText className="text-mute">Subscription Price :</MDBCardText>
                                </div>
                                <div className="d-flex justify-content-end mt-4">
                                <MDBBtn className="mx-2">Upgrade Subscription</MDBBtn>
                                <MDBBtn className="mx-2" color="danger">Cancel Order</MDBBtn>
                                </div>                  
                            </MDBCol>
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
                <>
                {/* {user.map((game,i) =>(
                <tr key={`game-${i}`}>
                <td>{new Date(game.createdAt).toLocaleString()}</td>
                <td>
                    {game.userId.userName}
                </td>
                <td> 
                <div className="d-flex flex-column align-items-center justify-content-center">
                <span>{game.paymentmethod}</span>
                <span>{game.paymentdetail}</span>
                </div>
                </td>
                <td>{game.numberoftransaction}</td>
                <td>{game.paymentlimit}</td>
                <td style={{ color: game.status === 'Close' ? 'red' : game.status === 'Open' ? 'green' : 'blue' }}>
                {game.status}
                </td>
                </tr>
                ))} */}
                </>
                                
                
                    
                </MDBTableBody>
            </MDBTable>
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

export default Step2;