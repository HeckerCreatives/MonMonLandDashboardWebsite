import { MDBContainer, MDBInput, MDBRow, MDBCol,MDBIcon,MDBTypography,MDBBtn, MDBCard, MDBCardTitle, MDBCardBody, MDBCheckbox,MDBSpinner } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import logo from "../../assets/header/small logo for navi.png"
import './signup.css'
import Swal from "sweetalert2";

const SignUp = () => {
  const [phone, setPhone] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')  
  const [confirmpassword, setconfirmPassword] = useState('')
  const [referrer, setReferrer] = useState('');
  const [referrerid, setReferrerId] = useState('');
  const [isloading, setIsLoading] = useState(false);

  useEffect(()=> {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    const sponsor = params.get('sponsor');
    const id = params.get('id');
    setReferrerId(id)
    setReferrer(sponsor)

    // if(sponsor && id){
      
    // } else {
    //   Swal.fire({
    //     icon: "warning",
    //     title:"Please do not alter the registration link",
    //     text: "Please Use Ingame Registration Link Thank You",
    //     allowOutsideClick: false,
    //     allowEscapeKey: false,
    //   })
    //   .then(ok => {
    //     if(ok.isConfirmed){
    //       window.location.href="https://monmonland.games/"
    //     }
    //   })
    // }
    
    
  },[])
  
  const register = (e) => {
    e.preventDefault();
    
    if(password !== confirmpassword){
      Swal.fire({
        title: "Password Not Match",
        icon: "error",
        text: "There is an error typing your password"
      })
      return 
    }
    setIsLoading(true)
    fetch(`${process.env.REACT_APP_API_URL}monmon/register`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sponsor: referrerid,
        username: userName,
        phone: phone,
        email: email,
        password: password
      })
    }).then(result => result.json())
    .then(data =>{
      if (data.message === "success") {
        setIsLoading(false)        
				Swal.fire({
					title: "Registered Successfully",
					icon: "success",
					text: "You Successfully Registered"
				}).then(ok => {
          if(ok.isConfirmed){
            window.location.href="https://monmonland.games/"
          }
        })
			} else {
				Swal.fire({
          title: data.message,
          icon: "error",
          text: data.data
        })
        setIsLoading(false)
			}
    })
  }

    return(
        <MDBContainer 
        fluid 
        className="min-vh-100 text-black align-items-stretch d-flex" 
               
        >
        <MDBRow className="">
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
          // lg={6}
          // className="offset-lg-3 offset-md-2 offset-sm-1"
          className="d-flex align-items-center"
          >
          <MDBContainer>
          <MDBCol className="text-center text-lg-start mt-5 mt-lg-0">
          <img alt="" src={logo}/>
          <MDBTypography className="mb-0 mt-3 fw-bold">Welcome,</MDBTypography>
          <MDBTypography className="fw-bold">Create your account in <span className="text-warning">few seconds</span></MDBTypography>
          </MDBCol>
          
          <form  autoComplete="off" onSubmit={register}>
          <MDBCard className="shadow-3 ">
          <MDBCardBody>
          
          {/* <MDBCardTitle tag={'h1'} className="">Sign Up</MDBCardTitle> */}
          <MDBRow>
          <MDBCol lg={6}>
          <MDBTypography className="mb-0">
            Username        
          </MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" onChange={e => setUserName(e.target.value)} style={{width:'100%'}} placeholder="Enter Username here" required></input>
          
          </MDBCol>
          <MDBCol lg={6}>
          <MDBTypography className="mb-0">Email</MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" onChange={e => setEmail(e.target.value)} style={{width:'100%'}} placeholder="Enter E-mail Address here" type="email" required></input>
          
          </MDBCol>
          
          <MDBCol md={6}>
          <MDBTypography className="mb-0">Password</MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" onChange={e => setPassword(e.target.value)} style={{width:'100%'}} placeholder="Enter Password here" type='password' required></input>
          
          </MDBCol>
          <MDBCol md={6}>
          <MDBTypography className="mb-0">Confirm Password</MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" onChange={e => setconfirmPassword(e.target.value)} style={{width:'100%'}} placeholder="Confirm Password here" type="password"></input>
          </MDBCol>
          <MDBCol md={6}>

          <MDBTypography className="mb-0">Phone</MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" onChange={e => setPhone(e.target.value)} style={{width:'100%'}} placeholder="Enter Phone Number here" type="tel" required></input>
          </MDBCol>

          <MDBCol lg={6}>   
          <MDBTypography className="mb-0">
          Referral
          </MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" style={{width:'100%'}} defaultValue={referrer} readOnly></input>
          </MDBCol>         

          </MDBRow>
          <MDBCol>
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Accept our Terms and Condition' required/>
          </MDBCol>     

          
          </MDBCardBody>

          </MDBCard>
          <MDBRow>
          <MDBCol>
          <MDBBtn type="submit" color="primary" className="mt-3 ms-md-auto d-flex" disabled={isloading}>
            {isloading ? <MDBSpinner grow size="sm" /> : "Create Account"}  
          </MDBBtn>
          </MDBCol>
          
          </MDBRow>
          </form>
                  
          
          </MDBContainer>
          </MDBCol>

        </MDBRow>
        
        
        
        </MDBContainer>
    )
}

export default SignUp;