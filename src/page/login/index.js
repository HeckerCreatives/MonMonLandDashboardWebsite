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
import logo from "../../assets/header/small logo for navi.png"
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { PlayFabClient } from "playfab-sdk";
const Login = () =>{
  const [email, setEmail]= useState('');
  const [password, setPassword] = useState("");
  const auth = JSON.parse(localStorage.getItem("auth"))
  const navigate = useNavigate();
  // const {userId} = useParams();
  useEffect(()=>{
    if(auth){
      
      window.location.href = `/dashboard/${auth.roleId?.display_name}/home`
    } 
  },[auth])

  const login = (e) =>{
    e.preventDefault()
    fetch(`${process.env.REACT_APP_API_URL}auth/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(result => result.json())
    .then(data =>{
      if (data.message !== "success") {        
				Swal.fire({
          title: data.message,
          icon: "info",
          text: data.data
        })
			} else {
        const playFabUserData = {
          CreateAccount: false,            
          CustomId: data.data.playfabid,           
        }
        PlayFabClient.LoginWithCustomID(playFabUserData, (error, result) => {
          console.log(result)
          if (result){
            localStorage.setItem("playfabAdminAuthToken", result.data.SessionTicket)
            console.log(result)
            localStorage.setItem('auth', JSON.stringify(data.data))
            Swal.fire({
              title: "Login Successfully",
              icon: "success",
              text: `Welcome ${data.data.firstName}`
            })
            .then(result1 => {
              if(result1.isConfirmed)
              window.location.reload()
            })
          } else if (error) {
            Swal.fire({
                icon: "warning",
                title: error.error,
                allowOutsideClick: false,
                allowEscapeKey: false
            })
            // setIsLoading(false)
          }
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
        <h1 >Welcome Admin</h1>
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
      <MDBTypography >No account yet? <a href={`/register?sponsor=monmonland&id=${process.env.REACT_APP_MONMONID}`}>Register now</a></MDBTypography>
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
                />
                </MDBCol>                
                <MDBRow className="mx-0 my-3">
                  <MDBCol size={12} className="px-0 position-relative">
                  <MDBTypography className="mb-0">
                  Password        
                  </MDBTypography>
                    <MDBInput label={<span className="">Password</span>} type="password" onChange={e => setPassword(e.target.value)} required/>
                  </MDBCol>
                </MDBRow>
                <MDBCol>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Keep me Login'/> 
                </MDBCol>                
            </MDBRow>
          </MDBCardBody>
        </MDBCard>

        
        <MDBTypography className="d-flex align-items-center justify-content-end mt-4">
          <a href="https://www.google.com/">Recover password</a>
          <MDBBtn className='ms-3' type="submit">
          Login to dashboard
        </MDBBtn>
        </MDBTypography>
        </form>
        </MDBContainer>
      </MDBCol>
    </MDBRow>
      
    
    </MDBContainer>
  )
}

export default Login;