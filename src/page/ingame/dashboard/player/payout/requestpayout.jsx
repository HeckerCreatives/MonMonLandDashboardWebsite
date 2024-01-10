import { 
    MDBCol, 
    MDBContainer, 
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn, 
    MDBInput} from "mdb-react-ui-kit";
import React from "react";
import Swal from "sweetalert2";
const PlayerRequestPayout = () => {
    
    const requestpayout = (e) => {
       e.preventDefault()
       const { amount } = e.target
       fetch(`${process.env.REACT_APP_API_URL}payout/requestpayout`, {
        method: "POST",
            credentials: 'include',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            amount: amount.value
            })
       })
       .then(result => result.json())
       .then(data => {
            if(data.message === 'success'){
                Swal.fire({
                    title: data.message,
                    text: data.data,
                    icon: "success"
                })
            } else if (data.message === 'failed'){
                Swal.fire({
                    title: data.message,
                    text: data.data,
                    icon: "error"
                })
            }
       })
       .catch(err => {
            Swal.fire({
                title: 'Failed',
                text: 'Please try again',
                icon: "error"
            })
       })
    }

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md={4} className="offset-4 mt-5">
                <form onSubmit={requestpayout}>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle>Request Payout</MDBCardTitle>
                            <MDBInput name="amount" type="number" label='Input Amount' min={'0'} maxLength={'3'}/>
                            <MDBBtn type="submit" className="mt-3">Request</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default PlayerRequestPayout;