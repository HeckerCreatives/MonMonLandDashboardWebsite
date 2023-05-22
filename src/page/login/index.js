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
      console.log(data.isVerified)
      if (data === false) {        
				Swal.fire({
          title: "Password Not Match",
          icon: "error",
          text: "Incorrect Password"
        })
			} 
      if(!data.isVerified) {
        localStorage.setItem('auth', JSON.stringify(data))
        Swal.fire({
					title: "Login Successfully",
					icon: "success",
					text: `Welcome ${data.firstName}`
				}).then(result => {
          if(result.isConfirmed)
          navigate(`/verification/${data._id}`)
        })
      } else {			
        localStorage.setItem('auth', JSON.stringify(data))	
        Swal.fire({
					title: "Login Successfully",
					icon: "success",
					text: `Welcome ${data.firstName}`
				})
        .then(result => {
          if(result.isConfirmed)
          window.location.reload()
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
        <h1 >Lorem Ipsum</h1>
          <p >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
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
      <MDBTypography >No account yet? <a href={`/referral/player/${process.env.REACT_APP_PLAYERID}/register`}>Register now</a></MDBTypography>
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
          <a href="https://www.facebook.com/">Recover password</a>
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