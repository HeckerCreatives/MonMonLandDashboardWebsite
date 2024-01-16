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
    MDBIcon,
    MDBCard,
    MDBCardHeader, 
    MDBCardBody,
    MDBTypography,
    MDBSpinner} from "mdb-react-ui-kit";
import React, {useEffect, useState} from "react";
import FlipCountdown from '@rumess/react-flip-countdown';
import { PlayFabClient } from "playfab-sdk";
import Swal from "sweetalert2";
import workerScript from "../../worker";
import logins from "../../../assets/header/login BUTTON1.png"
const Phase1 = () => {
    const [basicModal, setBasicModal] = useState(false);
    const [isOk, setIsOk] = useState(false);
    const [id, setid] = useState('');
    const [ref, setref] = useState('');
    const toggleOpen = () => setBasicModal(!basicModal);
    const data = JSON.parse(localStorage.getItem('uid'))
    const thetime = new Date();
    const desiredDate = new Date('Fri Dec 29 2023 15:45:54 GMT+0800');

    useEffect(()=> {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    
    const username = params.get('username');
    setref(username)
        fetch(`${process.env.REACT_APP_API_URL}gameusers/migrationreferrer/${username}`)
        .then(result => result.json())
        .then(data => {
            if(data.message === 'success'){
                setid(data.data)
            } else {
                Swal.fire({
                    title: "Warning",
                    icon: "info",
                    text: data.data,
                  })
            }
            
        })
        
    },[])

    const setreferral = (e) => {
        const {username} = e.target
        fetch(`${process.env.REACT_APP_API_URL}gameusers/migrationreferrer/${username.value}`)
        .then(result => result.json())
        .then(data => {
            if(data.message === 'success'){
                setid(data.data)
            } else {
                Swal.fire({
                    title: "Warning",
                    icon: "info",
                    text: data.data,
                  })
            }
            
        })
    }
    
    const login = (e) => {
        e.preventDefault()
        setIsOk(true)
        const { username, password } = e.target

        const userdata = {
            username: username.value,
            password: password.value
        }

        PlayFabClient.LoginWithPlayFab(userdata, (error, result) => {
            if(result){
                setIsOk(false)
                const user = {
                    name: username.value,
                    code: btoa(password.value),
                    session: result.data.SessionTicket
                }

                localStorage.setItem("uid", JSON.stringify(user))
                window.location.reload()

            } else {
                setIsOk(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: "Username or Password is incorrect please try again."
                })
            }
        })
    }

    const wew = new Worker(workerScript)

    const migrates = (username, password, session, referral) => {
        
        return () => {
            setIsOk(true)
            wew.postMessage([username, password, session, thetime, referral]);
        };
    };
    
    wew.onmessage = (m) => {
        if(m.data[0] === 'success'){
            setIsOk(false)
            Swal.fire({
                title: m.data[0],
                icon: 'success',
                text: m.data[1],
                allowEscapeKey: false,
                allowOutsideClick: false
            }).then(async ok => {
                await fetch(`${process.env.REACT_APP_API_URL}gameauth/login`,{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      username: data.name,
                      password: atob(data.code)
                    })
                }).then(result => result.json())
                .then(data => {
                    if(data.message === "success"){
                        localStorage.removeItem("uid")
                        window.location.href = `/Dashboard/User/home`
                    }
                })
                
            })

        } else if (m.data[0] === 'failed') {
            setIsOk(false)
            Swal.fire({
                title: m.data[0],
                icon: 'warning',
                text: m.data[1],
                allowEscapeKey: false,
                allowOutsideClick: false
            }).then(ok => {
                localStorage.removeItem("uid")
                window.location.href='/'
            })
        }
        
        else {
            setIsOk(false)
            Swal.fire({
                title: m.data[0],
                icon: 'warning',
                text: "Please try again later",
                allowEscapeKey: false,
                allowOutsideClick: false
            }).then(ok => {
                localStorage.removeItem("uid")
                window.location.href='/'
            })
        }
    }

    const setlink = (e) => {
        e.preventDefault()
        const {link} = e.target
        window.location.href = link.value
    }
    
    return (
        <>
        <div className="kontainer">
        </div>
        <div className="" style={{backgroundColor: "#432808"}}>
            <div className="d-flex justify-content-end align-items-center">
                <MDBIcon fas icon="user-circle"/>
                <div className="d-lg-block d-none text-white me-3">
                &nbsp;{data?.name}
                </div>
            </div>  
        
        </div>
        <MDBContainer>
        <MDBCard className="mt-5 px-0" >
            <MDBCardHeader className="text-center" style={{background: "#8D5513", color: "white", fontSize: '2rem'}}>Account Migration</MDBCardHeader>
            <MDBCardBody>
            <MDBRow>
                <MDBCol>
                    <div className="text-center">
                    <p>Get ready for the Grand Launch! Upgrade your account from Version 1 to Version 2, Starting January 16, 2024 valid until January 31, 2024.</p>
                     <p>Visit our Official Website at www.monmonland.games, log in, and migrate your account. Choose the Upline you want to be, and you will use their migration referral link into your account. Additionally, If you haven't switched your account yet, it's time to do so! Starting from Version 2, accounts that haven't migrated will no longer be available. Make sure to migrate soon to keep enjoying all the great features without any interruptions.</p>
                    </div>
                </MDBCol>
            </MDBRow>
            </MDBCardBody>
            <MDBCardBody>
            <MDBRow>
                <MDBCol md={6} className="offset-md-3">
                <form onSubmit={setreferral}>
                <div className="row d-flex justify-content-center align-items-center">
                
                <div className="col-md-2">
                <MDBCardText className="mx-2">Referral:</MDBCardText>
                </div>
                
                <div className="col-md-4 flex-wrap">
                <MDBInput name="username" className="" value={ref} readOnly/>
                </div>
                {/* <div className="col-md-2">
                    <MDBBtn type="submit"  className="m-2" size="sm" 
                    >Set</MDBBtn>
                </div> */}
                
                </div>
                </form>

                
                <div className="text-center">
                {
                    data ? 
                    ( isOk ? 
                    <MDBSpinner className="mt-3" color="primary"/> 
                    : 
                    <MDBBtn 
                    type='button' 
                    className="mt-3" 
                    onClick={migrates(data.name, atob(data.code), data.session, id)}
                    disabled={id !== '' ? false: true}
                    >Migrate Account</MDBBtn>
                    )
                    
                    :
                    <div className="text-center">
                        <MDBBtn className="mt-3" onClick={toggleOpen}>Login Here</MDBBtn>
                    </div>
                }
                </div>
                
                </MDBCol>
            </MDBRow>
            </MDBCardBody>
        </MDBCard>
        </MDBContainer>
        <MDBModal show={basicModal}  tabIndex='-1' staticBackdrop closeOnEsc>
            <MDBModalDialog>
            <form autoComplete="off" onSubmit={login}>
            <MDBModalContent>
                <MDBModalHeader>
                <MDBModalTitle>Monmonland Account Login</MDBModalTitle>
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
                isOk ? 
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
        </>
    )
}

export default Phase1;