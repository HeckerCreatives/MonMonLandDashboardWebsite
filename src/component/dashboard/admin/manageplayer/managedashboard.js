import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow, MDBIcon, MDBCardHeader, MDBTypography } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Cards from "../../../cards";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const ManageDashboard = () => {
const [userdetail, setUserDetail] = useState("");
const { userId } = useParams();
const [isInputEnabled, setIsInputEnabled] = useState(false);
// const [email, setEmail] = useState('');
const [getemail, setGetEmail] = useState('');
// const [firstname, setFirstName] = useState('');
const [getfirstname, setGetFirstName] = useState('');
// const [lastname, setLastName] = useState('');
const [getlastname, setGetLastName] = useState('');
const ban = true;
const unban = false;

useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}manage/oneuser/${userId}`,{
        method:'GET',
        headers:{
            "Content": "application/json"
        }
    }).then(result => result.json())
    .then(data => {
        setUserDetail(data)
        setGetEmail(data.email)
        setGetFirstName(data.firstName)
        setGetLastName(data.lastName)
    })
},[userId])

const handleButton = (e) => {
    e.preventDefault();
    setIsInputEnabled(!isInputEnabled)
}

function handleUpdate  (e) {
    e.preventDefault();
    const {email, firstname, lastname} = e.target;
    fetch(`${process.env.REACT_APP_API_URL}manage/update/${userId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email.value,
            firstName: firstname.value,
            lastName: lastname.value
        })
    }).then(result => result.json())
    .then(data => {
        
        if (data) {
            Swal.fire({
                title: "Updated Successfully",
                icon: "success",
                text: "Successfully Update"
            })
            window.location.reload();
        } else {
            Swal.fire({
                title: "Update Unsuccessfully",
                icon: "error",
                text: "There is an error Updating This"
            })
        }
        
    })
}

function handleunban (e) {
    e.preventDefault();
    if(userdetail.banned){
        Swal.fire({
            title: `Are you sure you want to Unbanned ${userdetail.userName}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result)=>{
            if(result.isConfirmed){
                
                if(result.isConfirmed){                    
                    fetch(`${process.env.REACT_APP_API_URL}manage/ban/${userId}`, {
                        method: 'PUT',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            banned: unban
                        })
                    }).then(result => result.json())
                    .then(data => {                        
                        console.log(data)
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'UnBanned!',
                            text: `${userdetail.userName} been Unbanned`,
                            showConfirmButton: false,
                            timer: 1500
                        })  
                        window.location.reload();                       
                    })
                    
                    }
            }
        })
    }  
    
}

function handleban (e) {
    if(!userdetail.banned) {
        Swal.fire({
            title: `Are you sure you want to Unbanned ${userdetail.userName}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result)=>{
                 
                if(result.isConfirmed){
                    fetch(`${process.env.REACT_APP_API_URL}manage/ban/${userId}`, {
                        method: 'PUT',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            banned: ban
                        })
                    }).then(result => result.json())
                    .then(data => {                        
                        console.log(data)  
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Banned!',
                            text: `${userdetail.userName} been Banned`,
                            showConfirmButton: false,
                            timer: 1500
                        })  
                        window.location.reload();                         
                    })               
                }
                
            })
    }
}

console.log(userdetail)
    return( 
        <MDBContainer fluid className="fw-bold">
        <MDBTypography className="mt-3">User Detail - {userdetail.userName}</MDBTypography>
            <MDBRow>
                <Cards
                itemcol={`d-flex align-items-center gap-3`}
                textstyle={{color: "white"}}
                titlestyle={{color: "white", marginTop:"10px",marginBottom:"0px"}}
                cardstyle={{background: "#342EAD"}}
                iconstyle={{background: "#4943B5", padding: "10px", borderRadius: "5px"}}
                icon='money-bill-alt'
                title={`${userdetail.balance}`}
                texts='Balance'
                />
                <Cards
                itemcol={`d-flex align-items-center gap-3`}
                textstyle={{color: "white"}}
                titlestyle={{color: "white", marginTop:"10px",marginBottom:"0px"}}
                cardstyle={{background: "#4634FF"}}
                iconstyle={{background: "#5949FF", padding: "10px", borderRadius: "5px"}}                
                icon='wallet'
                title='0'
                texts='Deposits'
                />
                <Cards
                itemcol={`d-flex align-items-center gap-3`}
                textstyle={{color: "white"}}
                titlestyle={{color: "white", marginTop:"10px",marginBottom:"0px"}}
                cardstyle={{background: "#127681"}}
                iconstyle={{background: "#2A848E", padding: "10px", borderRadius: "5px"}}
                icon='wallet'
                title='0'
                texts='Withdrawals'
                />
                <Cards
                itemcol={`d-flex align-items-center gap-3`}
                textstyle={{color: "white"}}
                titlestyle={{color: "white", marginTop:"10px",marginBottom:"0px"}}
                cardstyle={{background: "#035AA6"}}
                iconstyle={{background: "#1D6BAF", padding: "10px", borderRadius: "5px"}}
                icon='exchange-alt'
                title='0'
                texts='Transactions'
                />
            </MDBRow>
            <MDBRow>
                <Cards
                itemcol={`d-flex align-items-center gap-3`}
                textstyle={{color: "white"}}
                titlestyle={{color: "white", marginTop:"10px",marginBottom:"0px"}}
                cardstyle={{background: "#035AA6"}}
                iconstyle={{background: "#1D6BAF", padding: "10px", borderRadius: "5px"}}
                icon='money-bill-alt'
                title={`${userdetail.balance}`}
                texts='More Cards info here soon'
                />
                <Cards
                itemcol={`d-flex align-items-center gap-3`}
                textstyle={{color: "white"}}
                titlestyle={{color: "white", marginTop:"10px",marginBottom:"0px"}}
                cardstyle={{background: "#0779E4"}}
                iconstyle={{background: "#2087E7", padding: "10px", borderRadius: "5px"}}                
                icon='wallet'
                title='0'
                texts='More Cards info here soon'
                />
                <Cards
                itemcol={`d-flex align-items-center gap-3`}
                textstyle={{color: "white"}}
                titlestyle={{color: "white", marginTop:"10px",marginBottom:"0px"}}
                cardstyle={{background: "#10375C"}}
                iconstyle={{background: "#284B6D", padding: "10px", borderRadius: "5px"}}
                icon='wallet'
                title='0'
                texts='More Cards info here soon'
                />
                <Cards
                itemcol={`d-flex align-items-center gap-3`}
                textstyle={{color: "white"}}
                titlestyle={{color: "white", marginTop:"10px",marginBottom:"0px"}}
                cardstyle={{background: "#4F8A8B"}}
                iconstyle={{background: "#619697", padding: "10px", borderRadius: "5px"}}
                icon='exchange-alt'
                title='0'
                texts='More Cards info here soon'
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
                {userdetail.banned === false ? 
                    <div className="flex-fill">
                <MDBBtn color="warning" className="w-100" onClick={handleban}>
                <MDBIcon fas icon="ban" />
                &nbsp; Ban User</MDBBtn>
                </div>
                :
                <div className="flex-fill">
                <MDBBtn className="w-100" color="success" onClick={handleunban}>
                <MDBIcon fas icon="undo" />
                &nbsp; Unbanned User</MDBBtn>
                </div>
                }                
                <div className="flex-fill">
                <MDBBtn className="w-100" color="success">
                <MDBIcon fas icon="project-diagram" />
                &nbsp; View Genealogy</MDBBtn>
                </div>
            </div>

            
            <MDBCard className="mt-4">
            <MDBCardHeader>Users Info</MDBCardHeader>
            <form onSubmit={e => handleUpdate(e)}>
                <MDBCardBody>
                <MDBRow>
                <MDBCol md={6}>
                    <label className="mt-2">  Username                  
                    </label>
                    <input className="w-100"  defaultValue={userdetail.userName} disabled/>
                    
                </MDBCol>
                <MDBCol md={6}>
                    
                    <label className="mt-2"> Email                  
                    </label>
                    <input className="w-100" name="email"  defaultValue={getemail} disabled={!isInputEnabled} type="email" />
                </MDBCol>
                <MDBCol md={6}>
                    
                    <label className="mt-2">First Name                    
                    </label>
                    <input className="w-100" name="firstname" defaultValue={getfirstname} disabled={!isInputEnabled} type="text" />
                </MDBCol>
                <MDBCol md={6}>
                    
                    <label className="mt-2">Last Name                   
                    </label>
                    <input className="w-100" name="lastname" defaultValue={getlastname} disabled={!isInputEnabled} type="text" />
                </MDBCol>
                <MDBCol md={6}>                    
                    <label className="mt-2">Subscription Level                   
                    </label>
                    <select id="subslevel" name="subslevel" disabled={!isInputEnabled} className="w-100 p-2">
                        <option value="Pearl">Pearl</option>
                        <option value="Ruby">Ruby</option>
                        <option value="Emerald">Emerald</option>
                        <option value="Diamond">Diamond</option>
                    </select>
                </MDBCol>
                </MDBRow>
                
                

                <MDBRow className="mt-3 mb-3 text-center">
                <MDBCol md={6}>
                <label>Email Verification</label>
                <div className={userdetail.isVerified === true ? `w-100 bg-success text-white rounded p-2` : `w-100 bg-danger text-white rounded p-2`}>
                {userdetail.isVerified === true ? `Verified` : `Not Verified`}
                </div>
                </MDBCol>
                {/* <MDBCol md={4}>
                <label>2FA Verification</label>
                <div className="w-100 bg-success text-white rounded p-2">
                Verified
                </div>
                </MDBCol> */}
                <MDBCol md={6}>
                <label>Active Status</label>
                <div className={userdetail.isActive === true && userdetail.banned === false ? "w-100 bg-success text-white rounded p-2" : "w-100 bg-danger text-white rounded p-2"}>
                {userdetail.isActive === true && userdetail.banned === false ? `Active` : `Not Active`}
                </div>
                </MDBCol>
                </MDBRow>
                {isInputEnabled ? 
                <div >
                <MDBBtn onClick={handleButton} type="button">
                Cancel                   
                </MDBBtn>
                <MDBBtn  className="ms-3" type="submit">
                Update                   
                </MDBBtn>
                </div> 
                 :                 
                <MDBBtn onClick={handleButton} type="button">
                Edit User Details                    
                </MDBBtn>
                 }                  
                </MDBCardBody>
            </form>
                
            </MDBCard>
            
        </MDBContainer>
    )
}

export default ManageDashboard;