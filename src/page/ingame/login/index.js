import React, { useEffect, useState } from "react";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBSpinner,
    MDBRow,
    MDBIcon,
    MDBTypography,
    MDBCheckbox
  } from "mdb-react-ui-kit";
import logo from "../../../assets/header/small logo for navi.png"
import { isgamelogin } from "../../../component/utils";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useAccount, useDisconnect } from 'wagmi'
const IngameLogin = () =>{
  const [user, setuser] = useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
      window.location.href = `/Dashboard/User/home`
    } 
  },[user])

  useEffect(()=> {
    isgamelogin()
    .then(data => {
      setuser(data.name)
    })
  },[user])

  useEffect(()=> {
    if(address){
      setLoading(true)
    fetch(`${process.env.REACT_APP_API_URL}gameauth/login`,{
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        address: address
      })
    }).then(result => result.json())
    .then(data =>{
      if(data.message === "success"){
        setLoading(false)
        Swal.fire({
          title: "Login Successfully",
          icon: "success",
          text: `Welcome Monmon`,
          allowEscapeKey: false,
          allowOutsideClick: false
        })
        .then(result1 => {
          if(result1.isConfirmed)
          window.location.href = `/Dashboard/User/home`
        })
      }

      else {
        setLoading(false)
        disconnect()
        Swal.fire({
          title: data.message,
          icon: "info",
          text: data.data
        })
      }
      
        })
    }
  },[address])

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search)

    const user = params.get("username")
    const pass = params.get("password")
    const path = params.get("path")
    if(user && pass && path){
      setLoading(true)

      fetch(`${process.env.REACT_APP_API_URL}gameauth/login`,{
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: user,
          password: pass
        })
      }).then(result => result.json())
      .then(data =>{
        if(data.message === "success"){
          setLoading(false)
          Swal.fire({
            title: "Login Successfully",
            icon: "success",
            text: `Welcome Monmon`,
            allowEscapeKey: false,
            allowOutsideClick: false
          })
          .then(result1 => {
            if(result1.isConfirmed)
            window.location.href = path
          })
        }
  
        else {
          setLoading(false)
          disconnect()
          Swal.fire({
            title: data.message,
            icon: "info",
            text: data.data
          })
        }
        
      })
    }
    
  },[])

  const login = (e) =>{
    e.preventDefault()
    setLoading(true)
    fetch(`${process.env.REACT_APP_API_URL}gameauth/login`,{
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        password: password
      })
    }).then(result => result.json())
    .then(data =>{
      if(data.message === "success"){
        setLoading(false)
        Swal.fire({
          title: "Login Successfully",
          icon: "success",
          text: `Welcome Monmon`,
          allowEscapeKey: false,
          allowOutsideClick: false
        })
        .then(result1 => {
          if(result1.isConfirmed)
          window.location.href = `/Dashboard/User/home`
        })
      }

      else if(data.message === "adminsuccess"){
        setLoading(false)
        Swal.fire({
          title: "Login Successfully",
          icon: "success",
          text: `Welcome Admin`,
          allowEscapeKey: false,
          allowOutsideClick: false
        })
        .then(result1 => {
          if(result1.isConfirmed)
          window.location.href = `/Dashboard/Admin/home/grandlaunch`
        })
      }

      else {
        setLoading(false)
        Swal.fire({
          title: data.message,
          icon: "info",
          text: data.data
        })
      }
      
        })
  }

  return(
    <MDBContainer
    fluid
    className="d-flex align-items-stretch min-vh-100 text-black"
    >
    <MDBRow>
      <MDBCol lg={4} className="sidebg d-flex align-items-center text-dark text-center">
        <MDBContainer fluid >
        <MDBCol className="text fs-6">
        <h1 >Welcome Monmon</h1>
          <p >Join us on this extraordinary adventure, and together, let's travel on an epic journey that will lead us through the lands of Monmonland.  Become a Monmon master, honing our skills and forging unbreakable bonds with our Money Monsters. Create your account by filling up the requirements. So, what are you waiting for? Let's band together and make our mark on the ever-expanding tapestry of Monmonland, creating unforgettable memories and stories that will be told for generations to come!</p>
        </MDBCol>          
          </MDBContainer>
      </MDBCol>


      <MDBCol
        // size={12}
        // sm={10}
        // md={8}
        lg={4}
        // className="offset-lg-4 offset-md-2 offset-sm-1"
        className="d-flex align-items-center offset-lg-2"
      >
      <MDBContainer fluid>

      
      <MDBCol  className="text-center mt-5 mt-lg-0">
      <img src={logo} alt=""/>
      <MDBTypography className="mb-0 mt-4">Welcome back,</MDBTypography>
      <MDBTypography className="mb-0">Please sign in to your account</MDBTypography>
      <MDBTypography >No account yet? <a href={`/register?id=${process.env.REACT_APP_MONMONID}`}>Register now</a></MDBTypography>
      </MDBCol>
      
        <form onSubmit={login}>
        <MDBCard className="">
          <MDBCardBody>
            <MDBRow className="d-flex align-items-center">
              
              <MDBCol>
              <MDBTypography className="mb-0">
              Username/Email        
              </MDBTypography>
                <MDBInput 
                label={
                  <span className="">
                  Username
                  </span>
                } 
                type="text"
                className=""
                onChange={e => setEmail(e.target.value)} 
                required
                disabled={loading}
                />
                </MDBCol>                
                <MDBRow className="mx-0 my-3">
                  <MDBCol size={12} className="px-0 position-relative">
                  <MDBTypography className="mb-0">
                  Password        
                  </MDBTypography>
                    <MDBInput label={<span className="">Password</span>} type="password" onChange={e => setPassword(e.target.value)} required disabled={loading}/>
                  </MDBCol>
                </MDBRow>
                <MDBCol>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Keep me Login'/> 
                </MDBCol>  
                <MDBCol className="col-3">
                <MDBBtn className='ms-3' type="submit" disabled={loading}>
                {loading ? <MDBSpinner/> : "Login"
                }
                </MDBBtn>
                </MDBCol>              
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
        <div className="mt-2" style={{textAlign: "center"}}>
          <span>
          OR
          </span>
        </div>
        <center className="mt-2" >
        <w3m-connect-button 
        size="md"
        label="Login using wallet"
        />
        </center>
        
        {/* <MDBTypography className="d-flex align-items-center justify-content-end mt-4">
          <a href="#">Recover password</a>
       
        
        
        </MDBTypography> */}
        </form>
        </MDBContainer>
      </MDBCol>
    </MDBRow>
      
    
    </MDBContainer>
  )
}

export default IngameLogin;