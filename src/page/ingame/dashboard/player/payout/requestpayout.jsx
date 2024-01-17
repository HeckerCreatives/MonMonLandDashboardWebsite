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
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
const PlayerRequestPayout = () => {
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}gamewallet/find`, {
            method: "GET",
            credentials: 'include',
            headers:{
              "Content-Type": 'application/json'
            }
          })
          .then(result => result.json())
          .then(data => {
            if(data.message === "success"){
              setBalance(data.data.balance)
              
            }
               
          })
    },[])
    
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
            } 
            
            else if (data.message === 'maintenance'){
                Swal.fire({
                    title: data.message,
                    text: "Payout is Currently Maintenance",
                    icon: "error"
                })
            }
            
            else if (data.message === 'failed'){
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
                            <MDBCardTitle>Request Payout: Balance:({balance?.toLocaleString('en-US', {
                            style: 'decimal',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                            })}) </MDBCardTitle>
                            <MDBInput name="amount" type="number" label='Input Amount' min={'10'} max={'999'} maxLength={'3'}/>
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