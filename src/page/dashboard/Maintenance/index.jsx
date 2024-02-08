import { 
    MDBCol, 
    MDBContainer,
    MDBRow, 
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBSwitch } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
const Maintenance = () => {
    const [maintenancefullgame, setmaintenancefullgame] = useState("")
    const [maintenancegrinding, setmaintenancegrinding] = useState("")
    const [maintenancesubscription, setmaintenancesubscription] = useState("")
    const [maintenanceitems, setmaintenanceitems] = useState("")
    const [maintenancefiestagame, setmaintenancefiestagame] = useState("")
    const [maintenancesponsor, setmaintenancesponsor] = useState("")
    const [maintenancecashoutmanual, setmaintenancecashoutmanual] = useState("")
    const [maintenancecashoutautomated, setmaintenancecashoutautomated] = useState("")
    const [maintenancecashinmanual, setmaintenancecashinmanual] = useState("")
    const [maintenancecashinautomated, setmaintenancecashinautomated] = useState("")

    useEffect(() => {
        
        fetch(`${process.env.REACT_APP_API_URL}members/gamemaintenancevalue`, {
            credentials: 'include',
        })
        .then(result => result.json())
        .then(data => {
            if(data.message == 'success'){
                setmaintenancefullgame(data.data.maintenancefullgame.value)
                setmaintenancegrinding(data.data.maintenancegrinding.value)
                setmaintenancesubscription(data.data.maintenancesubscription.value)
                setmaintenanceitems(data.data.maintenanceitems.value)
                setmaintenancefiestagame(data.data.maintenancefiestagame.value)
                setmaintenancesponsor(data.data.maintenancesponsor.value)
                setmaintenancecashoutmanual(data.data.maintenancecashoutmanual.value)
                setmaintenancecashoutautomated(data.data.maintenancecashoutautomated.value)
                setmaintenancecashinmanual(data.data.maintenancecashinmanual.value)
                setmaintenancecashinautomated(data.data.maintenancecashinautomated.value)
            }
        })
    },[])

    const gamemaintenance = (type, ischecked) => {
        Swal.fire({
            title: "Are you sure?",
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!",
            allowEscapeKey: false,
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}members/gamemaintenance`, {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        type: type,
                        value: ischecked
                    })
                })
                .then(result => result.json())
                .then(data => {
                    if (data.message === 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: "Success"
                        }).then(ok => {
                            window.location.reload()
                        })
                    }
                })
            }
          });
       
    }
    

    return(
        <MDBContainer>
        <MDBRow className="mt-5 ">
        <MDBCol md={2} className="my-2 offset-md-1">
        <MDBCard className="h-100">
        <MDBCardBody>
            <div className="d-flex justify-content-end align-items-end mb-2">
            <MDBSwitch checked={maintenancefullgame == "1" ? true : false} name="maintenancefullgame" id='flexSwitchCheckDefault' label='' onChange={(e) => gamemaintenance(e.target.name,e.target.checked ? 1 : 0)}/>
            </div>
            <MDBCardTitle>Maintenance Full Game</MDBCardTitle>
        </MDBCardBody>
        </MDBCard>
        </MDBCol>
        <MDBCol md={2} className="my-2">
        <MDBCard className="h-100">
        <MDBCardBody>
            <div className="d-flex justify-content-end align-items-end mb-2">
            <MDBSwitch checked={maintenanceitems == "1" ? true : false} name="maintenanceitems" id='flexSwitchCheckDefault' label='' onChange={(e) => gamemaintenance(e.target.name,e.target.checked ? 1 : 0)}/>
            </div>
            <MDBCardTitle>Maintenance Items</MDBCardTitle>
        </MDBCardBody>
        </MDBCard>
        </MDBCol>
        <MDBCol md={2} className="my-2">
        <MDBCard className="h-100">
        <MDBCardBody>
            <div className="d-flex justify-content-end align-items-end mb-2">
            <MDBSwitch checked={maintenancesubscription  == "1" ? true : false} name="maintenancesubscription" id='flexSwitchCheckDefault' label='' onChange={(e) => gamemaintenance(e.target.name,e.target.checked ? 1 : 0)}/>
            </div>
            <MDBCardTitle>Maintenance Subscription</MDBCardTitle>
        </MDBCardBody>
        </MDBCard>
        </MDBCol>
        <MDBCol md={2} className="my-2">
        <MDBCard className="h-100">
        <MDBCardBody>
            <div className="d-flex justify-content-end align-items-end mb-2">
            <MDBSwitch checked={maintenancesponsor  == "1" ? true : false} name="maintenancesponsor" id='flexSwitchCheckDefault' label='' onChange={(e) => gamemaintenance(e.target.name,e.target.checked ? 1 : 0)}/>
            </div>
            <MDBCardTitle>Maintenance Sponsor Game</MDBCardTitle>
        </MDBCardBody>
        </MDBCard>
        </MDBCol>
        <MDBCol md={2} className="mt-2">
        <MDBCard className="h-100">
        <MDBCardBody>
            <div className="d-flex justify-content-end align-items-end mb-2">
            <MDBSwitch checked={maintenancefiestagame  == "1" ? true : false} name="maintenancefiestagame" id='flexSwitchCheckDefault' label=''  onChange={(e) => gamemaintenance(e.target.name,e.target.checked ? 1 : 0)}/>
            </div>
            <MDBCardTitle>Maintenance Fiesta Game</MDBCardTitle>
        </MDBCardBody>
        </MDBCard>
        </MDBCol>
        </MDBRow>

        <MDBRow className="mt-5">
       
        <MDBCol md={2} className="mb-2 offset-md-1">
        <MDBCard className="h-100">
        <MDBCardBody>
            <div className="d-flex justify-content-end align-items-end mb-2">
            <MDBSwitch checked={maintenancegrinding  == "1" ? true : false}  name="maintenancegrinding" id='flexSwitchCheckDefault' label='' onChange={(e) => gamemaintenance(e.target.name,e.target.checked ? 1 : 0)}/>
            </div>
            <MDBCardTitle>Maintenance Grinding</MDBCardTitle>
        </MDBCardBody>
        </MDBCard>
        </MDBCol>

        <MDBCol md={2} className="my-2">
        <MDBCard className="h-100">
        <MDBCardBody>
            <div className="d-flex justify-content-end align-items-end mb-2">
            <MDBSwitch checked={maintenancecashoutmanual  == "1" ? true : false} name="maintenancecashoutmanual" id='flexSwitchCheckDefault' label='' onChange={(e) => gamemaintenance(e.target.name,e.target.checked ? 1 : 0)}/>
            </div>
            <MDBCardTitle>Maintenance Cashout Manual</MDBCardTitle>
        </MDBCardBody>
        </MDBCard>
        </MDBCol>
        <MDBCol md={2} className="my-2">
        <MDBCard className="h-100">
        <MDBCardBody>
            <div className="d-flex justify-content-end align-items-end mb-2">
            <MDBSwitch checked={maintenancecashoutautomated  == "1" ? true : false} name="maintenancecashoutautomated" id='flexSwitchCheckDefault' label='' onChange={(e) => gamemaintenance(e.target.name,e.target.checked ? 1 : 0)}/>
            </div>
            <MDBCardTitle>Maintenance Cashout Automated</MDBCardTitle>
        </MDBCardBody>
        </MDBCard>
        </MDBCol>
        <MDBCol md={2} className="my-2">
        <MDBCard className="h-100">
        <MDBCardBody>
            <div className="d-flex justify-content-end align-items-end mb-2">
            <MDBSwitch checked={maintenancecashinmanual  == "1" ? true : false} name="maintenancecashinmanual" id='flexSwitchCheckDefault' label='' onChange={(e) => gamemaintenance(e.target.name,e.target.checked ? 1 : 0)}/>
            </div>
            <MDBCardTitle>Maintenance Cashin Manual</MDBCardTitle>
        </MDBCardBody>
        </MDBCard>
        </MDBCol>
        <MDBCol md={2} className="my-2">
        <MDBCard className="h-100">
        <MDBCardBody>
            <div className="d-flex justify-content-end align-items-end mb-2">
            <MDBSwitch checked={maintenancecashinautomated  == "1" ? true : false} name="maintenancecashinautomated" id='flexSwitchCheckDefault' label='' onChange={(e) => gamemaintenance(e.target.name,e.target.checked ? 1 : 0)}/>
            </div>
            <MDBCardTitle>Maintenance Cashin Automated</MDBCardTitle>
            
            
        </MDBCardBody>
        </MDBCard>
        </MDBCol>
        </MDBRow>

        
        </MDBContainer>
    )
}

export default Maintenance;