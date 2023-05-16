import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow, MDBIcon, MDBCardHeader, MDBTypography } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Cards from "../../../cards";
import { useParams } from "react-router-dom";

const ManageDashboard = () => {
const [userdetail, setUserDetail] = useState("");
const id = useParams();
console.log(userdetail.toString())

useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}manage/oneuser/${id}}`,{
        method:'GET',
        headers:{
            "Content": "application/json"
        }
    }).then(result => result.json())
    .then(data => {
        console.log(data)
    })
},[id])

    return( 
        <MDBContainer fluid className="fw-bold">
        <MDBTypography className="mt-3">User Detail - {userdetail.balance}</MDBTypography>
            <MDBRow>
                <Cards
                color='primary'
                icon='hotel'
                title='Players'
                texts='Madami hehe'
                />
                <Cards
                color='primary'
                icon='hotel'
                title='Players'
                texts='Madami hehe'
                />
                <Cards
                color='primary'
                icon='hotel'
                title='Players'
                texts='Madami hehe'
                />
                <Cards
                color='primary'
                icon='hotel'
                title='Players'
                texts='Madami hehe'
                />
                <Cards
                color='primary'
                icon='hotel'
                title='Players'
                texts='Madami hehe'
                />
                <Cards
                color='primary'
                icon='hotel'
                title='Players'
                texts='Madami hehe'
                />
            </MDBRow>
            <div className="d-flex flex-wrap gap-3 mt-3">
                <div className="flex-fill">
                <MDBBtn color="success" className="w-100">
                <MDBIcon far icon="plus" />
                &nbsp; Balance
                </MDBBtn>
                </div>
                <div className="flex-fill">
                <MDBBtn color="danger" className="w-100">
                <MDBIcon fas icon="minus" />
                &nbsp; Balance</MDBBtn>
                </div>
                <div className="flex-fill">
                <MDBBtn color="warning" className="w-100">
                <MDBIcon fas icon="ban" />
                &nbsp; Ban User</MDBBtn>
                </div>
                <div className="flex-fill">
                <MDBBtn className="w-100" color="success">
                <MDBIcon fas icon="undo" />
                &nbsp; Unbanned User</MDBBtn>
                </div>
            </div>
            <form>
            <MDBCard className="mt-4">
            <MDBCardHeader>Users Info</MDBCardHeader>
                <MDBCardBody>
                <MDBRow>
                <MDBCol md={6}>
                    <label>  Username                  
                    </label>
                    <input className="w-100"/>
                    
                </MDBCol>
                <MDBCol md={6}>
                    
                    <label>  Email                  
                    </label>
                    <input className="w-100"/>
                </MDBCol>
                <MDBCol md={6}>
                    
                    <label>First Name                    
                    </label>
                    <input className="w-100"/>
                </MDBCol>
                <MDBCol md={6}>
                    
                    <label>Last Name                   
                    </label>
                    <input className="w-100"/>
                </MDBCol>
                <MDBCol>
                    
                    <label>Subscription Level                   
                    </label>
                    <input className="w-100"/>
                </MDBCol>
                </MDBRow>
                
                

                <MDBRow className="mt-3 mb-3 text-center">
                <MDBCol md={4}>
                <label>Email Verification</label>
                <div className="w-100 bg-success text-white rounded p-2">
                Verified
                </div>
                </MDBCol>
                <MDBCol md={4}>
                <label>2FA Verification</label>
                <div className="w-100 bg-success text-white rounded p-2">
                Verified
                </div>
                </MDBCol>
                <MDBCol md={4}>
                <label>Active Status</label>
                <div className="w-100 bg-danger text-white rounded p-2">
                Not Active
                </div>
                </MDBCol>
                </MDBRow>
                   
                </MDBCardBody>
                
                
            </MDBCard>
            </form>
        </MDBContainer>
    )
}

export default ManageDashboard;