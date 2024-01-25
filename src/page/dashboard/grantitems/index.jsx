import { 
    MDBCol, 
    MDBContainer, 
    MDBRow, 
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn, 
    MDBTextArea,
    MDBInput,
    MDBSpinner} from "mdb-react-ui-kit";
import React, { useState } from "react";
import Swal from "sweetalert2";
const GrantItems = () => {
    const [isloading, setIsLoading] = useState(false)

    const energyitem = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const { energytype, username, quantity } = e.target
        fetch(`${process.env.REACT_APP_API_URL}members/grantenergy`,{
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username.value,
                name: energytype.value,
                quantity: quantity.value
            })
        })
        .then(result => result.json())
        .then(data => {
            if(data.message === "success"){
                setIsLoading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: `Energy Granted to ${username.value}`
                }).then(ok => {
                    if(ok.isConfirmed){
                        window.location.reload()
                    }
                })
            } else if (data.message === "failed"){
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: data.data
                }).then(ok => {
                    if(ok.isConfirmed){
                        window.location.reload()
                    }
                })
            } else {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: data.data
                }).then(ok => {
                    if(ok.isConfirmed){
                        window.location.reload()
                    }
                })
            }
            
        })
    }

    const toolitem = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const { tooltype, username, expiration } = e.target
        fetch(`${process.env.REACT_APP_API_URL}members/granttool`,{
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username.value,
                type: tooltype.value,
                expiration: expiration.value
            })
        })
        .then(result => result.json())
        .then(data => {
            if(data.message === "success"){
                setIsLoading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: `Tool Granted to ${username.value}`
                }).then(ok => {
                    if(ok.isConfirmed){
                        window.location.reload()
                    }
                })
            } else if (data.message === "failed"){
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: data.data
                }).then(ok => {
                    if(ok.isConfirmed){
                        window.location.reload()
                    }
                })
            } else {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: data.data
                }).then(ok => {
                    if(ok.isConfirmed){
                        window.location.reload()
                    }
                })
            }
            
        })
    }

    const clockitem = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const { clocktype, username, expiration } = e.target
        fetch(`${process.env.REACT_APP_API_URL}members/grantclock`,{
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username.value,
                type: clocktype.value,
                expiration: expiration.value
            })
        })
        .then(result => result.json())
        .then(data => {
            if(data.message === "success"){
                setIsLoading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: `Clock Granted to ${username.value}`
                }).then(ok => {
                    if(ok.isConfirmed){
                        window.location.reload()
                    }
                })
            } else if (data.message === "failed"){
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: data.data
                }).then(ok => {
                    if(ok.isConfirmed){
                        window.location.reload()
                    }
                })
            } else {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: data.data
                }).then(ok => {
                    if(ok.isConfirmed){
                        window.location.reload()
                    }
                })
            }
            
        })
    }

    const cosmeticitem = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const { cosmetictype, username, expiration } = e.target
        fetch(`${process.env.REACT_APP_API_URL}members/grantcosmetic`,{
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username.value,
                name: cosmetictype.value,
                expiration: expiration.value
            })
        })
        .then(result => result.json())
        .then(data => {
            if(data.message === "success"){
                setIsLoading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: `Clock Granted to ${username.value}`
                }).then(ok => {
                    if(ok.isConfirmed){
                        window.location.reload()
                    }
                })
            } else if (data.message === "failed"){
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: data.data
                }).then(ok => {
                    if(ok.isConfirmed){
                        window.location.reload()
                    }
                })
            } else {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: data.data
                }).then(ok => {
                    if(ok.isConfirmed){
                        window.location.reload()
                    }
                })
            }
            
        })
    }

    return (
        <MDBContainer>
        <MDBRow>
            <MDBCol md={3} className=" mt-5 ">
            <form onSubmit={energyitem}>
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle className="text-center">Grant Energy</MDBCardTitle>
                    <select 
                    name="energytype"
                    style={{width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}
                    required
                    >
                        <option disabled selected value="">Please Select Energy</option>
                        <option value="1">Energy 1</option>
                        <option value="2">Energy 5</option>
                        <option value="3">Energy 10</option>
                        <option value="4">Energy 20</option>
                        <option value="5">Energy 50</option>
                    </select>

                    <MDBInput name="username" className="mt-3" label='Input Players Username' required/>
                    <MDBInput name="quantity" className="mt-3" label='Input Energy Quantity' type="number" min={"1"} max={"999"} maxLength={"3"} required/>
                    
                    <MDBBtn type="submit" className="mt-3">
                        {
                            isloading ?
                            <MDBSpinner size="sm"/>
                            :
                            "Grant"
                        }
                    </MDBBtn>
                </MDBCardBody>
            </MDBCard>
            </form>
            </MDBCol>
            <MDBCol md={3} className=" mt-5 ">
            <form onSubmit={toolitem}>
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle className="text-center">Grant Tool</MDBCardTitle>
                    <select 
                    name="tooltype"
                    style={{width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}
                    required
                    >
                        <option disabled selected value="">Please Select Tool</option>
                        {/* <option value="1">Energy 1</option> */}
                        <option value="2">Iron</option>
                        <option value="3">Steel</option>
                        <option value="4">Mithril</option>
                        <option value="5">Adamant</option>
                    </select>

                    <MDBInput name="username" className="mt-3" label='Input Players Username' required/>
                    <MDBInput name="expiration" className="mt-3" label='Input Days To Be Granted' type="number" min={"1"} max={"999"} maxLength={"3"} required/>
                    
                    <MDBBtn type="submit" className="mt-3">
                        {
                            isloading ?
                            <MDBSpinner size="sm"/>
                            :
                            "Grant"
                        }
                    </MDBBtn>
                </MDBCardBody>
            </MDBCard>
            </form>
            </MDBCol>
            <MDBCol md={3} className=" mt-5 ">
            <form onSubmit={clockitem}>
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle className="text-center">Grant Clock</MDBCardTitle>
                    <select 
                    name="clocktype"
                    style={{width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}
                    required
                    >
                        <option disabled selected value="">Please Select Clock</option>
                        <option value="1">Basic</option>
                        <option value="2">Intermediate</option>
                        <option value="3">Master</option>
                        <option value="4">Advance</option>
                    </select>

                    <MDBInput name="username" className="mt-3" label='Input Players Username' required/>
                    <MDBInput name="expiration" className="mt-3" label='Input Days To Be Granted' type="number" min={"1"} max={"999"} maxLength={"3"} required/>
                    
                    <MDBBtn type="submit" className="mt-3">
                        {
                            isloading ?
                            <MDBSpinner size="sm"/>
                            :
                            "Grant"
                        }
                    </MDBBtn>
                </MDBCardBody>
            </MDBCard>
            </form>
            </MDBCol>
            <MDBCol md={3} className=" mt-5 ">
            <form onSubmit={cosmeticitem}>
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle className="text-center">Grant Cosmetic</MDBCardTitle>
                    <select 
                    name="cosmetictype"
                    style={{width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}
                    required
                    >
                        <option disabled selected value="">Please Select Cosmetic</option>
                        <option value="Ruby">Ruby Ring</option>
                        <option value="Emerald">Emerald Ring</option>
                        <option value="Diamond">Diamond Ring</option>
                        <option value="Energy">Energy Ring</option>
                    </select>

                    <MDBInput name="username" className="mt-3" label='Input Players Username' required/>
                    <MDBInput name="expiration" className="mt-3" label='Input Energy Quantity' type="number" min={"1"} max={"999"} maxLength={"3"} required/>
                    
                    <MDBBtn type="submit" className="mt-3">
                        {
                            isloading ?
                            <MDBSpinner size="sm"/>
                            :
                            "Grant"
                        }
                    </MDBBtn>
                </MDBCardBody>
            </MDBCard>
            </form>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
    )
}

export default GrantItems;