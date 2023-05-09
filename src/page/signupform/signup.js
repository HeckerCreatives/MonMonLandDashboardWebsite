import { MDBContainer, MDBInput, MDBRow, MDBCol,MDBIcon,MDBTypography,MDBBtn, MDBCard, MDBCardTitle, MDBCardBody } from "mdb-react-ui-kit";
import React from "react";

const SignUp = () => {
    return(
        <MDBContainer 
        fluid 
        className="d-flex align-items-center min-vh-100 dark-skin"        
        >

        <MDBCol
        size={12}
        sm={10}
        md={8}
        lg={6}
        className="offset-lg-3 offset-md-2 offset-sm-1"
        >

        <MDBCard className="bg-dark tex-white">
        <MDBCardBody>
        <form  autoComplete="off">
        <MDBCardTitle tag={'h1'} className="text-white">Sign Up</MDBCardTitle>
        <MDBInput
          type="email"
          label={<span className="text-white">E-mail Address</span>}
          name="email"
          className="my-3 text-white"
          minLength={5}
        //   defaultValue={user.email}
          required
        />
        <MDBInput
          type="text"
          label={<span className="text-white">Username</span>}
          name="username"
          className="my-3 text-white"
        //   defaultValue={user.username}
          minLength={5}
          required
        />
        <MDBRow className="mx-0">
          <MDBCol size={12} className="px-0 position-relative">
            <MDBInput
            //   type={!show.password ? "password" : "text"}
              label={<span className="text-white">Password</span>}
              name="password"
              className="text-white"
              minLength={6}
            //   defaultValue={user.password}
              required
            />
            <MDBIcon
              fas
            //   icon={show.password ? "eye" : "eye-slash"}
              className="custom-register-eye cursor-pointer"
            //   onMouseOver={() => setShow({ ...show, password: true })}
            //   onMouseOut={() => setShow({ ...show, password: false })}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mx-0">
          <MDBCol size={12} className="px-0 position-relative">
            <MDBInput
            //   type={!show.confirm_password ? "password" : "text"}
              label={<span className="text-white">Confirm Password</span>}
              name="confirm_password"
              className="text-white"
            //   defaultValue={user.confirm_password}
              minLength={6}
              required
            />
            <MDBIcon
              fas
            //   icon={show.confirm_password ? "eye" : "eye-slash"}
              className="custom-register-eye cursor-pointer"
            //   onMouseOver={() => setShow({ ...show, confirm_password: true })}
            //   onMouseOut={() => setShow({ ...show, confirm_password: false })}
            />
          </MDBCol>
        </MDBRow>
        <MDBTypography className="mb-0 d-flex justify-content-between">
          <MDBBtn
            type="button"
            className="shadow-0"
            // onClick={() => handleActive(false)}
          >
            <MDBIcon icon="arrow-left" />
            &nbsp; GO BACK
          </MDBBtn>

          <MDBBtn type="submit" color="warning">
            Proceed
          </MDBBtn>
        </MDBTypography>
      </form>
        </MDBCardBody>
        
        </MDBCard>
        </MDBCol>
        
        
        </MDBContainer>
    )
}

export default SignUp;