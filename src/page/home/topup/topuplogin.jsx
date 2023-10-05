import React, { useEffect, useState } from "react";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBTypography,
    MDBInput,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBSpinner,
    MDBCardText,
    MDBCardImage
  } from 'mdb-react-ui-kit';
  import TopUpRedirect from "./redirect";
  import { PlayFabClient } from "playfab-sdk";
  import Swal from "sweetalert2";
  import { useNavigate } from "react-router-dom";
  import logo from '../../../assets/header/big logo.png'
const TopUpLogin = ({basicModal, setBasicModal, amount, selectedtopup, bundle , bundledes,bundlesubs}) =>{
    const [toggleTwoModal, setToggleTwoModal] = useState(false);
    const handleClose = (e) =>{
        setBasicModal(e)
    }

    // useEffect(() => {
    //     console.log(amount)
    //     console.log(selectedtopup)
    //     console.log(bundle)
    //     console.log(bundledes)
    //     console.log(bundlesubs)
    // },[amount,selectedtopup,bundle,bundledes,bundlesubs])

    const login = (e) => {
        e.preventDefault();
        const {username, password} = e.target;
        const playFabUserData = {
            Username: username.value,            
            Password: password.value,           
        };
        setToggleTwoModal(!toggleTwoModal)
        if(selectedtopup === "funds"){
            PlayFabClient.LoginWithPlayFab(playFabUserData, (error, result) => {

                if(result){
                    fetch(`${process.env.REACT_APP_API_URL}coin/funds`, {
                        method:"POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: username.value,
                            playfabId: result.data.PlayFabId,
                            amount: amount,
                        })
                    })
                    .then(result => result.json())
                    .then(data => {
                        const url = data.hosted_url
                        window.location.href = url
                    })
                    .catch(error =>{
                        Swal.fire({
                            icon: "warning",
                            title: error,
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        })
                    })
    
                } else if (error) {
                    Swal.fire({
                        icon: "warning",
                        title: error.errorMessage,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    })
                }
            })
        } else if (selectedtopup === "bundles"){
            PlayFabClient.LoginWithPlayFab(playFabUserData, (error, result) => {

                if(result){
                    fetch(`${process.env.REACT_APP_API_URL}coin/bundles`, {
                        method:"POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: username.value,
                            playfabId: result.data.PlayFabId,
                            amount: amount,
                            bundle: bundle,
                            bundledescription: bundledes,
                            subs:bundlesubs
                        })
                    })
                    .then(result => result.json())
                    .then(data => {
                        const url = data.hosted_url
                        window.location.href = url
                    })
                    .catch(error =>{
                        Swal.fire({
                            icon: "warning",
                            title: error,
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        })
                    })
    
                } else if (error) {
                    Swal.fire({
                        icon: "warning",
                        title: error.errorMessage,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    })
                }
            })
        }
        
    }

    return(
        <>
        <MDBModal show={basicModal} tabIndex='-1' staticBackdrop closeOnEsc="false">
        <MDBModalDialog centered>
          <MDBModalContent>
          <form autoComplete="off" onSubmit={login}>
            <MDBModalHeader>
              <MDBModalTitle>Login</MDBModalTitle>
              <MDBBtn type="button" className='btn-close' color='none' onClick={() => handleClose(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <MDBTypography>Username</MDBTypography>
                <MDBInput name="username" required/>
                <MDBTypography >Password</MDBTypography>
                <MDBInput name="password" type="password" required/>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn type="submit">Login</MDBBtn>
            </MDBModalFooter>
        </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal show={toggleTwoModal} setShow={setToggleTwoModal} tabIndex='-1' staticBackdrop closeOnEsc="false">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
            </MDBModalHeader>
            <MDBModalBody>
            <MDBCard alignment="center">
            <MDBCardBody>
            <MDBCardImage src={logo} style={{width: "50%"}}/>
                <MDBCardText tag="h1">
                    YOU ARE NOW 
                </MDBCardText>
                <MDBCardText tag="h1">
                    REDIRECTING TO COINBASE
                </MDBCardText>
                <MDBSpinner/>
            </MDBCardBody>
            </MDBCard>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
    )
}

export default TopUpLogin;