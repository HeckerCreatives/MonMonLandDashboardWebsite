import React, {useState} from "react";
import { 
    MDBCol, 
    MDBContainer, 
    MDBRow,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBCardText,
    MDBInput,
    MDBSpinner, } from "mdb-react-ui-kit";
import { PlayFabClient } from "playfab-sdk";
import Swal from "sweetalert2";
import logins from "../../../assets/header/login BUTTON1.png"
const MigrateLogin = ({basicModal, setBasicModal}) => {
    const [loading, setLoading] = useState(false)
    const login = (e) => {
        e.preventDefault();
        setLoading(true)
        const { username, password } = e.target

        const userdata = {
            username: username.value,
            password: password.value
        }

        PlayFabClient.LoginWithPlayFab(userdata, (error, result) => {
            if(result){
                setLoading(false)
                const user = {
                    name: username.value,
                    code: btoa(password.value),
                    session: result.data.SessionTicket
                }

                localStorage.setItem("uid", JSON.stringify(user))
                window.location.href = '/migrateph1?username=monmonland'

            } else {
                setLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: "Username or Password is incorrect please try again."
                })
            }
        })
    }

    return (
        <MDBModal show={basicModal}  tabIndex='-1'>
            <MDBModalDialog>
            <form autoComplete="off" onSubmit={login}>
            <MDBModalContent>
                <MDBModalHeader>
                <MDBModalTitle>Monmonland Migrate Account Login</MDBModalTitle>
                <MDBBtn type="button" className='btn-close' color='none' onClick={() => setBasicModal(false)}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                <MDBCardText>Username:</MDBCardText>
                <MDBInput name="username" type="text"/>
                <MDBCardText>Password:</MDBCardText>
                <MDBInput name="password" type="password"/>
                </MDBModalBody>
                {/* <MDBModalBody className="text-center">
                <div className="text-white p-1" style={{backgroundColor: "#40290A", textAlign: "justify"}}>
                <h2 className="text-center">Monmonland Migration</h2>
                come and join us as we reach the world filled with adorable MonMons. Just click Login/Sign-up your account and start earning.
                </div>
                
                </MDBModalBody> */}
                <MDBModalFooter>
                {
                loading ? 
                <MDBSpinner color="success"/> 
                : 
                <MDBBtn type="submit" className="bg-transparent p-0 ">
                <img src={logins} id="joinnow" alt="" className=""></img>
                </MDBBtn>
                }
                
                </MDBModalFooter>
            </MDBModalContent>
            </form>
            </MDBModalDialog>
        </MDBModal>
    )
}

export default MigrateLogin;