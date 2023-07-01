import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBInput, MDBRow, MDBCollapse} from "mdb-react-ui-kit";
import React from "react";
import Home from "../../../../../component/minichatapp/Home";
import ChatPage from "../../../../../component/minichatapp/ChatPage";
import socketIO from "socket.io-client"

const socket = socketIO.connect("https://monmontestserver-lotk.onrender.com");
const Step2 = ({user, step2toggle, setstep2toggle}) => {

    return(
        <>
        <MDBCollapse show={step2toggle}>       
        <MDBCard>
            <MDBCardBody>
                <MDBRow>
                    <MDBCol>
                    <MDBCardText>Buy Me</MDBCardText>
                    <MDBCardText>Bank Details</MDBCardText>
                        <MDBInput />
                        <MDBInput disabled/>
                        <MDBBtn>Transferred</MDBBtn>
                        <MDBBtn onClick={setstep2toggle}>Cancel</MDBBtn>
                    </MDBCol>
                    <MDBCol>
                        Chat system Here
                        <ChatPage socket={socket} user={user}/>
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>
        </MDBCard>
       </MDBCollapse>

        
        </>
    )
}

export default Step2;