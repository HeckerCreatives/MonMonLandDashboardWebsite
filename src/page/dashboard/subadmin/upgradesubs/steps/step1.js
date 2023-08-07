import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBInput, MDBRow, MDBCollapse} from "mdb-react-ui-kit";
import React from "react";

const Step1 = ({user, toggle, settoggle, setstep2toggle, socket}) => {
    const userName = user.userName;
    const handleSubmit = (e) => {
        e.preventDefault()
        setstep2toggle()
        // localStorage.setItem("userName", user.userName)
        socket.emit("newUser", {userName, socketID: socket.id})
    }

    return(
        <>
        <MDBCollapse show={toggle}>       
        <MDBCard>
            <MDBCardBody>
                <MDBRow>
                    <MDBCol>
                    <MDBCardText>username here</MDBCardText>
                    </MDBCol>
                    <MDBCol>
                    <MDBCardText>price?</MDBCardText>
                    </MDBCol>
                    <MDBCol>
                    <MDBCardText>limit here</MDBCardText>
                    </MDBCol>
                    <MDBCol>
                    <MDBCardText>payment method here</MDBCardText>
                    </MDBCol>
                </MDBRow>
                <hr/>
                <MDBRow>
                    <MDBCol>
                        <MDBCardText>I want to buy</MDBCardText>
                        <MDBInput />
                        <MDBInput disabled/>
                        <MDBBtn onClick={handleSubmit}>Buy</MDBBtn>
                        <MDBBtn onClick={settoggle}>Cancel</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>
        </MDBCard>
       </MDBCollapse>

        
        </>
    )
}

export default Step1;