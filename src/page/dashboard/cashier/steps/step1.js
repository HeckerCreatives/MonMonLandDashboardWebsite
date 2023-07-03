import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBInput, MDBRow, MDBCollapse} from "mdb-react-ui-kit";
import React from "react";
import Swal from "sweetalert2";

const CashierStep1 = ({user, toggle, settoggle, setstep2toggle, socket}) => {
    const userName = user ? user.userName : 
    Swal.fire({
        title: "You need to Login first",
        icon: "info",
        text: `you need to login`
      }).then(result => {
        if(result.isConfirmed)
        window.location.href = `/login`
      }) ;

    const handleSubmit = (e) => {
        e.preventDefault()
        if(user){
        setstep2toggle()
        socket.emit("newUser", {userName, socketID: socket.id})
        } else {
            Swal.fire({
                title: "You need to Login first",
                icon: "info",
                text: `you need to login`
              }).then(result => {
                if(result.isConfirmed)
                window.location.href = `/login`
              }) ;
        }
        
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

export default CashierStep1;