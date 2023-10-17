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
const TopUpLogin = ({toggleTwoModal, setToggleTwoModal,basicModal, setBasicModal, amount, selectedtopup, bundle , bundledes,bundlesubs}) =>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isloading, setIsLoading] = useState(false)
    const auth = JSON.parse(localStorage.getItem("user"))
    // const [toggleTwoModal, setToggleTwoModal] = useState(false);
    const handleClose = (e) =>{
        setBasicModal(e)
    }

    useEffect(() => {
    const queryParams = new URL(window.location.href);
    const value = new URLSearchParams(queryParams.search);
    const decrypt = value.get('value');
    if(decrypt){
        const final = atob(decrypt)
        const decrypted = new URLSearchParams(final);
        const username = decrypted.get('username');
        const password = decrypted.get('password');
        setUsername(username)
        setPassword(password)
    } else if (auth){
        const pazz = atob(auth.Password)
        setUsername(auth.Username)
        setPassword(pazz)
    }
    },[])

    const login = (e) => {
        e.preventDefault();
        const playFabUserData = {
            Username: username,            
            Password: password,           
        };
        setIsLoading(true)
        if(selectedtopup === "funds"){
            PlayFabClient.LoginWithPlayFab(playFabUserData, (error, result) => {

                if(result){
                    fetch(`${process.env.REACT_APP_API_URL}coin/funds`, {
                        method:"POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: username,
                            playfabId: result.data.PlayFabId,
                            amount: amount,
                        })
                    })
                    .then(result => result.json())
                    .then(data => {
                        setIsLoading(false)
                        const url = data.hosted_url
                        window.location.href = url
                    })
                    .catch(error =>{
                        Swal.fire({
                            icon: "warning",
                            title: "Please Do Not Tamper The URL",
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        })
                        setIsLoading(false)
                    })
    
                } else if (error) {
                    Swal.fire({
                        icon: "warning",
                        title: "Please Do Not Tamper The URL",
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    })
                    setIsLoading(false)
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
                            name: username,
                            playfabId: result.data.PlayFabId,
                            amount: amount,
                            bundle: bundle,
                            bundledescription: bundledes,
                            subs: bundlesubs
                        })
                    })
                    .then(result => result.json())
                    .then(data => {
                        setIsLoading(false)
                        const url = data.hosted_url
                        window.location.href = url
                        
                    })
                    .catch(error =>{
                        Swal.fire({
                            icon: "warning",
                            title: "Please Do Not Tamper The URL",
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        })
                        setIsLoading(false)
                    })
    
                } else if (error) {
                    Swal.fire({
                        icon: "warning",
                        title: "Please Do Not Tamper The URL",
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    })
                    setIsLoading(false)
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
              <MDBBtn type="button" className='btn-close' color='none' onClick={() => handleClose(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <MDBCard alignment="center">
            <MDBCardBody>
            <MDBCardImage src={logo} style={{width: "50%"}}/>
                <MDBCardText tag="h1">
                    PRESS OK TO
                </MDBCardText>
                <MDBCardText tag="h1">
                    REDIRECT TO COINBASE
                </MDBCardText>
                <MDBBtn disabled={isloading}>
                   {isloading ? <MDBSpinner grow/> : "OK"}
                </MDBBtn>
            </MDBCardBody>
            </MDBCard>
            </MDBModalBody>

            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      {/* <MDBModal show={toggleTwoModal} tabIndex='-1' staticBackdrop>
        <MDBModalDialog centered>
          <MDBModalContent>
          <form autoComplete="off" onSubmit={login}>
            <MDBModalHeader>
            </MDBModalHeader>
            <MDBModalBody>
            <MDBCard alignment="center">
            <MDBCardBody>
            <MDBCardImage src={logo} style={{width: "50%"}}/>
                <MDBTypography>Username</MDBTypography>
                <MDBInput name="username" required onChange={(e) => setUsername(e.target.value)}/>
                <MDBTypography >Password</MDBTypography>
                <MDBInput name="password" type="password" required onChange={(e) => setPassword(e.target.value)}/>
                <MDBBtn disabled={isloading} type="submit" className="my-2">
                   {isloading ? <MDBSpinner grow/> : "Login"}
                </MDBBtn>
            </MDBCardBody>
            </MDBCard>
            </MDBModalBody>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal> */}
    </>
    )
}

export default TopUpLogin;