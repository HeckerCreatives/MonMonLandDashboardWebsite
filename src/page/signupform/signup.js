import { MDBContainer, MDBInput, MDBRow, MDBCol,MDBIcon,MDBTypography,MDBBtn, MDBCard, MDBCardTitle, MDBCardBody, MDBCheckbox } from "mdb-react-ui-kit";
import React from "react";
import logo from "../../assets/header/small logo for navi.png"
import './signup.css'
const SignUp = () => {
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
          

          <MDBCard className="shadow-3 ">
          <MDBCardBody>
          <form  autoComplete="off">
          {/* <MDBCardTitle tag={'h1'} className="">Sign Up</MDBCardTitle> */}
          <MDBRow>
          <MDBCol lg={6}>
          <MDBTypography className="mb-0">
          Username        
          </MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" size='50' style={{width:'100%'}} placeholder="Enter Username here"></input>
          {/* <MDBInput
            type="text"
            label={<span className="">Enter Username here</span>}
            name="username"
            className="my-3 border border-dark"
          //   defaultValue={user.username}
            minLength={5}
            required
          /> */}
          </MDBCol>
          <MDBCol lg={6}>
          <MDBTypography className="mb-0">Email</MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" size='50' style={{width:'100%'}} placeholder="Enter E-mail Address here"></input>
          {/* <MDBInput
            type="email"
            label={<span className="">Enter E-mail Address here</span>}
            name="email"
            className="my-3 "
            minLength={5}
          //   defaultValue={user.email}
            required
          /> */}
          </MDBCol>
          <MDBCol md={6}>
          <MDBTypography className="mb-0">First Name</MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" size='50' style={{width:'100%'}} placeholder="Enter First Name here"></input>
          {/* <MDBInput
            type="text"
            label={<span className="">Enter First Name here</span>}
            name="firstName"
            className="my-3 "
          //   defaultValue={user.username}
            // minLength={5}
            required
          /> */}
          </MDBCol>
          <MDBCol md={6}>
          <MDBTypography className="mb-0">Last Name</MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" size='50' style={{width:'100%'}} placeholder="Enter Last Name here"></input>
          {/* <MDBInput
            type="text"
            label={<span className="">Enter Last Name here</span>}
            name="lastName"
            className="my-3 "
            //   defaultValue={user.username}
            // minLength={5}
            required
          /> */}
          </MDBCol>
          <MDBCol md={6}>
          <MDBTypography className="mb-0">Password</MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" size='50' style={{width:'100%'}} placeholder="Enter Password here"></input>
          {/* <MDBInput
          //   type={!show.password ? "password" : "text"}
            label={<span className="">Enter Password here</span>}
            name="password"
            className=""
            minLength={6}
          //   defaultValue={user.password}
            required
          /> */}
          </MDBCol>
          <MDBCol md={6}>
          <MDBTypography className="mb-0">Confirm Password</MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" size='50' style={{width:'100%'}} placeholder="Enter Password here"></input>
          {/* <MDBInput
          //   type={!show.confirm_password ? "password" : "text"}
            label={<span className="">Confirm Password here</span>}
            name="confirm_password"
            className="my-3"
          //   defaultValue={user.confirm_password}
            minLength={6}
            required
          /> */}
          </MDBCol>
          <MDBCol lg={6}>   
          <MDBTypography className="mb-0">
          Referral
          {/* <MDBInput
            //   type={!show.confirm_password ? "password" : "text"}
              label={<span className="">Enter Referral here</span>}
              name="referral"
              className="my-3"
            //   defaultValue={user.confirm_password}
              // minLength={6}
              required
            /> */}
          </MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" size='50' style={{width:'100%'}} placeholder="Enter Referral here"></input>
          </MDBCol>         

          </MDBRow>
          <MDBCol>
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Accept our Terms and Condition'/>
          </MDBCol>     

          </form>
          </MDBCardBody>

          </MDBCard>
          <MDBRow>
          <MDBCol md={6}>
          <MDBTypography className="mt-3 fw-bold">
            Already have an account? <span className="text-primary">Login</span>          
          </MDBTypography>

          </MDBCol>
          <MDBCol md={6}>
          <MDBBtn type="submit" color="primary" className="mt-3 ms-md-auto d-flex">
              Create Account
          </MDBBtn>
          </MDBCol>

          </MDBRow>

                  
          
          </MDBContainer>
          </MDBCol>

        </MDBRow>
        
        
        
        </MDBContainer>
    )
}

export default SignUp;