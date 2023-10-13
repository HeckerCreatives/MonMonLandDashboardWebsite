import React, {useState, useEffect} from "react";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBRow,
    MDBCol,
    MDBTypography,
    MDBInput,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBSpinner,
    MDBCardText,
    MDBCardImage
  } from 'mdb-react-ui-kit';
  import { PlayFabClient } from "playfab-sdk";
  import Swal from "sweetalert2";
const AddFundsModal = ({basicModal, setBasicModal}) => {
    const auth = JSON.parse(localStorage.getItem("auth"))
    const [toggleTwoModal, setToggleTwoModal] = useState(false);
    const toggleShow1 = () => setToggleTwoModal(!toggleTwoModal);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isloading, setIsLoading] = useState(false)

    useEffect(() => {

    },[])

    const handleClose = (e) =>{
        setBasicModal(e)
    }

    const login = (e) => {
        e.preventDefault();
        const playFabUserData = {
            Username: username,            
            Password: password,           
        };
        setIsLoading(true)
        PlayFabClient.LoginWithPlayFab(playFabUserData, (error, result) => {
            if(result){
                const user = {
                    Username: username,
                    Password: btoa(password)
                }
                setIsLoading(false)
                localStorage.setItem("auth", JSON.stringify(user))
                window.location.href = "/topup"
            } else if (error) {
                Swal.fire({
                    icon: "warning",
                    title: error.error,
                    allowOutsideClick: false,
                    allowEscapeKey: false
                })
                setIsLoading(false)
            }
        })

    }
    const lagawts = () => {
        localStorage.clear()
        window.location.reload()
    }

    return (
        <>
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBBtn className='btn-close' color='none' onClick={() =>handleClose(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <MDBModalTitle className="text-center">
            { auth && 
                `Login As: ${auth.Username}`
            }
            </MDBModalTitle>
            <MDBRow className="my-2">
                <MDBCol className="d-flex justify-content-between align-items-center">
                    {auth ? 
                    <MDBBtn block onClick={lagawts}>Logout</MDBBtn>
                    :
                    <MDBBtn block onClick={toggleShow1}>Login</MDBBtn>
                    }
                    
                </MDBCol>
                <MDBCol className="d-flex justify-content-between align-items-center">
                    <MDBBtn href={`${window.location.origin}/register?sponsor=monmonland&id=ECBFE0CB217B1E12`} block>Sign Up</MDBBtn>
                </MDBCol>
            </MDBRow>
            <MDBRow className="my-2">
                <MDBCol>
                    <MDBBtn block disabled={auth ? false: true} href={`/topup`}>Top Up</MDBBtn>
                </MDBCol>
            </MDBRow>
            </MDBModalBody>
            <MDBModalBody className="text-center">
            WELCOME POGI
            </MDBModalBody>

          </MDBModalContent>
        </MDBModalDialog>
        </MDBModal>

        <MDBModal 
        show={toggleTwoModal} 
        tabIndex='-1' staticBackdrop>
        <MDBModalDialog centered>
          <MDBModalContent>
          <form autoComplete="off" onSubmit={login}>
            <MDBModalHeader>
            <MDBBtn className='btn-close' color='none' 
            onClick={() => {
            toggleShow1()
            handleClose(false)
            }}
            ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <MDBCard alignment="center">
            <MDBCardBody>
            {/* <MDBCardImage src={logo} style={{width: "50%"}}/> */}
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
      </MDBModal>

        </>
    )
}

export default AddFundsModal;