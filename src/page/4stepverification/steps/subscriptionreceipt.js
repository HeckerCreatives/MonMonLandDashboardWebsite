import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import React, {useEffect, useState} from "react";
import './subscriptionreceipt.css'
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const SubscriptionReceipt = ({values}) => {
    const [substitle, setSubsTitle] = useState('');
    const [subsamount, setSubsAmount] = useState('');
    const auth = JSON.parse(localStorage.getItem('auth'))
    const firstName = auth.firstName;
    const lastName = auth.lastName;
    const { userId } = useParams();
    const navigate = useNavigate();
    const { subsid } = values;
    const totalamount = subsamount;
    const payment = 0;
    const amountdue = payment - totalamount;
    const verify = true;
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}subscription/${subsid.subsid}/find`)
        .then(result => result.json())
        .then(data => {
            // console.log(data)
            setSubsTitle(data.subscriptionName)
            setSubsAmount(data.amount)
        })
    },[subsid.subsid])

    const finish = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}user/update/${userId}`,{
            method:"PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                isVerified: verify,
                subscriptionId: subsid.subsid
            })
        }).then(result => result.json())
        .then(data => {
            Swal.fire({
                title: "Login Successfully",
                icon: "success",
                text: `Welcome ${data.firstName}`
            })
            .then(result => {
            if(result.isConfirmed)
            navigate(`/login`)
    })
        })
    }
    // console.log(subsid)
    return (
        <MDBContainer className="text-black  mt-5 w-50">
        <MDBTypography tag='h2' className="fw-bold text-center">Subscription Receipt</MDBTypography>
        <form onSubmit={finish}>
        <MDBCard>
            <MDBCardBody>
            <MDBRow>
                <MDBCol>
                    <MDBCardText className="mb-0 fw-bold">Billed to</MDBCardText>
                    <MDBCardText className="mb-0">{firstName} {lastName}</MDBCardText>
                </MDBCol>
                <MDBCol md={5}>
                <MDBCardText className="mb-0 fw-bold">Subscription</MDBCardText>
                <MDBCardText className="mb-0">ID <span className="bluecol">{userId}</span></MDBCardText>
                <MDBCardText className="mb-0">Billing Date <span className="bluecol">{new Date().toLocaleString()}</span></MDBCardText>
                </MDBCol>
            </MDBRow>
            <MDBRow>
            <MDBCol className="mt-1 receiptborder fw-bold">                
                <MDBCardText>
                Description
                </MDBCardText>
                 
            </MDBCol>
            <MDBCol className=" text-end mt-1 receiptborder fw-bold">                
                <MDBCardText>                
                Amount
                </MDBCardText>       
            </MDBCol>
            </MDBRow>

            <MDBRow>
            <MDBCol className="mt-3 receiptborder1">                
                <MDBCardText className="fw-bold mb-0">
                    {substitle} Subscription - {subsamount}                    
                </MDBCardText>
                <MDBCardText>
                {new Date().toLocaleString()}                   
                </MDBCardText>
            </MDBCol>
            <MDBCol className=" text-end mt-3 receiptborder1">                
                <MDBCardText className="fw-bold">                
                Php {subsamount}
                </MDBCardText>       
            </MDBCol>
            </MDBRow>

            <MDBRow className="justify-content-end">
            <MDBCol md={4}>
            <MDBCol  className="d-flex justify-content-between mt-3 ">                
                <MDBCardText className="fw-bold">                
                Total 
                </MDBCardText>
                <span>Php {totalamount}</span>
                
            </MDBCol>
            <MDBCol className="d-flex justify-content-between receiptborder1">
                <MDBCardText className="fw-bold">                
                Payments 
                </MDBCardText>
                <span>- Php {payment}</span>
            </MDBCol>
            <MDBCol className="d-flex justify-content-between  ">
            <MDBCardText className="fw-bold">                
                Amount Due 
                </MDBCardText>
                <span className="fw-bold">Php {amountdue}</span> 
            </MDBCol>
            </MDBCol>
            
            </MDBRow>
            </MDBCardBody>
            <MDBCol className="text-end m-3">
            <MDBBtn className="btnblue" type="submit">Finish</MDBBtn>
            </MDBCol>
            
        </MDBCard>
        </form>
        </MDBContainer>
    )
}

export default SubscriptionReceipt;