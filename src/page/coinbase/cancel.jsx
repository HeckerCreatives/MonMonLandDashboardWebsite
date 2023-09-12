import { MDBContainer,  MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn, 
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBSpinner} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import logo from '../../assets/header/big logo.png'
const CancelPage = () => {
    const [item, setItem] = useState("")
    const [data, setData] = useState("")
    useEffect(()=> {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const ids = params.get('id');
        fetch(`${process.env.REACT_APP_API_URL}coin/cancel`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: ids})
        })
        .then(result => result.json())
        .then(data => {
            setItem(data.message)
            setData(data.data)
        })
    },[])
    const redirect = () => {
        window.location.href ="/"
    }
return (
<MDBContainer className="vh-100 d-flex justify-content-center align-items-center">
<MDBRow className="">
    <MDBCol className="">
    <MDBCard alignment="center">
        <MDBCardBody>
        <MDBCardImage src={logo} style={{width: "50%"}}/>
        <MDBCardTitle className="mt-5">
        { item === "success" ?
        "Canceled Successfully"
        :
        item === "failed" ? 
        "Cancel Failed"
        :
        "Canceling Subscription"
        }
        </MDBCardTitle>
        <MDBCardText>
        { item === "success" ?
        "Thank you for your interest in monmonland hope to see you soon."
        :
        item === "failed" ? 
        data
        :
        "Canceling Subscription Please Wait"
        }
        </MDBCardText>
        { item !== "" ?
        <MDBBtn onClick={redirect}>Ok</MDBBtn>
        :
        <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
        }
        
        </MDBCardBody>
    </MDBCard>
    </MDBCol>
</MDBRow>
</MDBContainer>
)
}

export default CancelPage;