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
  import loginbtn from "../../../assets/header/login BUTTON.png"
  import logoutbtn from "../../../assets/header/logout BUTTON.png"
  import topupbtn from "../../../assets/header/TOP UP BUTTON.png"
  import signupbtn from "../../../assets/header/sign up BUTTON.png"
  import clsbtn from "../../../assets/header/X BUTTON.png"
const AddFundsModal = ({basicModal, setBasicModal}) => {
    const auth = JSON.parse(localStorage.getItem("auth"))
    const user = JSON.parse(localStorage.getItem("user"))
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
                    PlayfabId: result.data.PlayFabId,
                    code: btoa(password)
                }
                setIsLoading(false)
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("playfabAuthToken", result.data.SessionTicket)
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
            <MDBModalHeader className='d-flex justify-content-end'>
              <MDBBtn  className="border-0 bg-transparent" color='none' onClick={() =>handleClose(false)}>
              <img src={clsbtn} alt="" className="img-fluid"/>
              </MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <MDBModalTitle className="text-center">
            { user && 
                `Login As: ${user.Username}`
            }
            </MDBModalTitle>
            <MDBRow className="my-2">
                <MDBCol className="d-flex justify-content-between align-items-center">
                    {user ? 
                    <img src={logoutbtn} alt="" className="zoom-playnow img-fluid" onClick={lagawts}/>
                    :
                    <img src={loginbtn} alt="" className="zoom-playnow img-fluid" onClick={toggleShow1}/>
                    
                    }
                    
                </MDBCol>
                <MDBCol className="d-flex justify-content-between align-items-center">
                <img src={signupbtn} alt="" className="zoom-playnow img-fluid"
                 
                 onClick={() => {
                     window.location.href = `${window.location.origin}/register?sponsor=monmonland&id=27557BB301ABB773`;
                 }}/>
                </MDBCol>
            </MDBRow>
            <MDBRow className="my-2">
                <MDBCol>
                    <MDBBtn className="bg-transparent p-0 " block disabled={user ? false: true} href={`/topup`}>
                    <img src={topupbtn} alt="" className="zoom-playnow img-fluid"/>
                    </MDBBtn>
                </MDBCol>
            </MDBRow>
            </MDBModalBody>
            <MDBModalBody className="text-center">
            <div className="text-white p-1" style={{backgroundColor: "#40290A", textAlign: "justify"}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </div>
            
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
            <MDBModalHeader className='d-flex justify-content-end'>
            <MDBBtn className="border-0 bg-transparent" color='none' 
            onClick={() => {
            toggleShow1()
            handleClose(false)
            }}
            >
             <img src={clsbtn} alt="" className="img-fluid"/>   
            </MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <MDBCard alignment="center">
            <MDBCardBody>
            {/* <MDBCardImage src={logo} style={{width: "50%"}}/> */}
                <MDBTypography>Username</MDBTypography>
                <MDBInput name="username" required onChange={(e) => setUsername(e.target.value)}/>
                <MDBTypography >Password</MDBTypography>
                <MDBInput name="password" type="password" required onChange={(e) => setPassword(e.target.value)}/>
                <MDBRow className="mt-3">
                <MDBCol>
                <MDBBtn  disabled={isloading} type="submit" className="bg-transparent p-0 my-2">
                   {isloading ? <MDBSpinner grow color='dark'/> : <img src={loginbtn} alt="" className="img-fluid"/>}
                </MDBBtn>
                </MDBCol>
                
                <MDBCol className="d-flex justify-content-between align-items-center">
                    <MDBBtn className="bg-transparent p-0" href={`${window.location.origin}/register?sponsor=monmonland&id=27557BB301ABB773`} block>
                    <img src={signupbtn} alt="" className="img-fluid"/>
                    </MDBBtn>
                </MDBCol>
                </MDBRow>
                
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