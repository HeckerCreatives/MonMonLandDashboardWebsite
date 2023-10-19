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
    const [playfabId, setPlayfabID] = useState("")
    const [playfabtoken, setPlayfabToken] = useState("")
    const [isloading, setIsLoading] = useState(false)
    const auth = JSON.parse(localStorage.getItem("user"))
    const playfabToken = localStorage.getItem("playfabAuthToken")
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
        const playfabId = decrypted.get('playfabId');
        const playfabtoken = decrypted.get('sessionTicket')
        setPlayfabToken(playfabtoken)
        setUsername(username)
        setPlayfabID(playfabId)
    } else if (auth){
        setUsername(auth.Username)
        setPlayfabID(auth.PlayfabId)
        setPlayfabToken(playfabToken)
    }
    },[])

    const login = (e) => {
        e.preventDefault();
        setIsLoading(true)
        if(selectedtopup === "funds"){
            fetch(`${process.env.REACT_APP_API_URL}coin/funds`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: username,
                    playfabId: playfabId,
                    amount: amount,
                    playfabToken: playfabtoken
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
        } else if (selectedtopup === "bundles"){
            fetch(`${process.env.REACT_APP_API_URL}coin/bundles`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: username,
                    playfabId: playfabId,
                    amount: amount,
                    bundle: bundle,
                    bundledescription: bundledes,
                    subs: bundlesubs,
                    playfabToken: playfabToken
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
                    Press ok to Redirect to payment gateway
                </MDBCardText>
                {/* <MDBCardText tag="h1">
                    
                </MDBCardText> */}
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