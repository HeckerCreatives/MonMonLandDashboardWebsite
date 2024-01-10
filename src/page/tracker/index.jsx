import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow,  MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBTypography, } from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";

const Tracker = () => {
    const [info, setInfo] = useState([])
    const [err, setErr] = useState('')
    const [ kwery, setKery] = useState('')
    useEffect(()=>{
        const url = new URL(window.location.href);
        const value = new URLSearchParams(url.search);
        const refnum = value.get('txnid')

        if(refnum){
            setKery(refnum)
            fetch(`${process.env.REACT_APP_API_URL}dragonpay/track`,{
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    refno: refnum
                })
            })
            .then(result => result.json())
            .then(data => {
                if(data.message === "success"){
                    setInfo(data.data)
                } else {
                    setErr(data.data)
                }
            })
        }
        
    },[])

    const track = (e) => {
        e.preventDefault();
        const {refno} = e.target
        fetch(`${process.env.REACT_APP_API_URL}dragonpay/track`,{
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refno: refno.value
            })
        })
        .then(result => result.json())
        .then(data => {
            if(data.message === "success"){
                setInfo(data.data)
            } else {
                setErr(data.data)
            }
        })
    }

    return (
        <MDBContainer fluid>
        <MDBTypography className="text-center">Payment Transaction Tracker</MDBTypography>
        <MDBRow>
            <MDBCol md={4} className="offset-4 mt-3">
            <MDBCard width='50%'>
            <MDBCardBody>
            <form onSubmit={track}>
            <MDBInput name="refno" label='Ref no/ Order no' value={kwery ? kwery : ""}/>
            <MDBBtn type="submit" className="mt-3">
                    Search
            </MDBBtn>
            </form>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>
        </MDBRow>
        <MDBRow>
            <MDBCol md={4} className="offset-4 mt-3">
            <MDBCard>
            <MDBCardBody>
                <MDBCardTitle>STATUS</MDBCardTitle>
                {
                    err ?
                    <MDBCardText>
                    {err}
                    </MDBCardText>
                    :
                    <>
                    <MDBCardText>
                    Transaction Number: {info.transactionnumber}
                    </MDBCardText>
                    <MDBCardText>
                    Amount: {info.amount}
                    </MDBCardText>
                    <MDBCardText>
                    Date: {info.date ? new Date(info?.date).toLocaleString() : ""}
                    </MDBCardText>
                    <MDBCardText>
                    Status: {info.status}
                    </MDBCardText>
                    </>
                }
                
            </MDBCardBody>
            </MDBCard>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
    )
}

export default Tracker;