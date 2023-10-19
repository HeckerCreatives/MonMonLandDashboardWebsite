import { MDBContainer, MDBInput, MDBRow, MDBCol,MDBIcon,MDBTypography,MDBBtn, MDBCard, MDBCardTitle, MDBCardBody, MDBCheckbox,MDBSpinner,MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter, } from "mdb-react-ui-kit";
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
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);
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
      <>
        <MDBContainer 
        fluid 
        className="min-vh-100 text-black align-items-stretch d-flex" 
               
        >
        <MDBRow className="">
        <MDBCol lg={4} className="sidebg d-flex align-items-center text-dark text-center">
        <MDBContainer fluid >
        <MDBCol className="text fs-6">
        <h1 >Register Now!</h1>
          <p >Join us on this extraordinary adventure, and together, let's travel on an epic journey that will lead us through the lands of Monmonland.  Become a Monmon master, honing our skills and forging unbreakable bonds with our Money Monsters. Create your account by filling up the requirements. So, what are you waiting for? Let's band together and make our mark on the ever-expanding tapestry of Monmonland, creating unforgettable memories and stories that will be told for generations to come!</p>
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
          <input className="square border border-dark rounded mb-2 p-1" onChange={e => setUserName(e.target.value)} style={{width:'100%'}} placeholder="Enter Username here" maxLength={15} required></input>
          
          </MDBCol>
          <MDBCol lg={6}>
          <MDBTypography className="mb-0">Email</MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" onChange={e => setEmail(e.target.value)} style={{width:'100%'}} placeholder="Enter E-mail Address here" type="email" required></input>
          
          </MDBCol>
          
          <MDBCol md={6}>
          <MDBTypography className="mb-0">Password</MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" onChange={e => setPassword(e.target.value)} style={{width:'100%'}} placeholder="Enter Password here" type='password' maxLength={15} required></input>
          
          </MDBCol>
          <MDBCol md={6}>
          <MDBTypography className="mb-0">Confirm Password</MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" onChange={e => setconfirmPassword(e.target.value)} style={{width:'100%'}} placeholder="Confirm Password here" type="password" maxLength={15}></input>
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
          <MDBCol className="d-flex">
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' required/>
          <span>Accept our</span>&nbsp;<span style={{color: "blue", cursor: "pointer"}} onClick={toggleShow}>Terms and Condition</span>
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

        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Terms and Condition</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>Bleh Bleh Bleh</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      </>
    )
}

export default SignUp;