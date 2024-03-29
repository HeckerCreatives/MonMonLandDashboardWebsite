import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon, MDBCard, MDBCardBody, MDBTypography, MDBCardText, MDBInput } from "mdb-react-ui-kit";
import React , {useState, useEffect} from "react";
import Swal from "sweetalert2";
const PlayerChangePass = () => {

    const changepassword = async (e) => {
        e.preventDefault();
        const specialchar = /^[a-zA-Z0-9]+$/;
        const {currentpassword, newpassword, confirmpassword} = e.target
        if(!specialchar.test(newpassword.value)){
          Swal.fire({
            title: "Failed",
            icon: "error",
            text: "Special Characters is not allowed"
          })
          return
        } else {
          if (newpassword.value !== confirmpassword.value){
            Swal.fire({
              title: "Warning",
              icon: "error",
              text: "There is an error typing your password"
            })
            return 
          } else if (currentpassword.value === newpassword.value) {
            Swal.fire({
              title: "Warning",
              icon: "error",
              text: "Old password must not be the same with new password."
            })
            return
          } else {
           await fetch(`${process.env.REACT_APP_API_URL}gameusers/changepassword`,{
              method: "POST",
              credentials: 'include',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                password: newpassword.value,
                oldpassword: currentpassword.value
              })
            })
            .then(result => result.json())
            .then(data => {
              if(data.message == "duallogin" || data.message == "banned" || data.message == "Unathorized"){
                Swal.fire({
                  icon: "error",
                  title: data.message == "duallogin" ? "Dual Login" : data.message == "banned" ? "Account Banned." : data.message,
                  text: data.message == "duallogin" ? "Hi Master, it appears that your account has been accessed from a different device." : data.message == "banned" ? "Hi Master please contact admin" : "You Will Redirect to Login",
                  allowOutsideClick: false,
                  allowEscapeKey: false
                }).then(ok => {
                  if(ok.isConfirmed){
                    window.location.replace("/gamelogin");
                  }
                })
              }
              
              if(data.message === "success"){
                Swal.fire({
                  title: data.message,
                  icon: "success",
                  text: data.data
                }).then(ok => {
                  if(ok.isConfirmed){
                    window.location.reload()
                  }
                })
              } else {
                Swal.fire({
                  title: "Warning",
                  icon: "info",
                  text: "Something went wrong please try again."
                })
              }
            })
            .catch(error => {
              Swal.fire({
                title: "Warning",
                icon: "info",
                text: "There's a problem with your network! Please try again"
              })
            });
          }
        }
  
        
  
    }
 return(
    <MDBContainer>
    <MDBCard shadow="5" style={{background: '#FCF2E1'}}>
      <MDBCardBody>
      <MDBRow>
        <MDBCol>
            <div>
              <MDBTypography tag={'h2'} className="my-2">
                Change Password
              </MDBTypography>
              <MDBCard>
              <form autoComplete="off" onSubmit={changepassword}>
                <MDBCardBody>
                  <div className="row d-flex align-items-center my-1">
                    <div className="col-md-2">
                    <MDBCardText className="m-0">Current Password:</MDBCardText>
                    </div>
                    
                    <div className="col-md-3">
                      <MDBInput type="password" name="currentpassword" required/>
                    </div>
                  </div>
                  <div className="row d-flex align-items-center my-1">
                    <div className="col-md-2">
                      <MDBCardText className="m-0">New Password:</MDBCardText>
                    </div>
                    
                    <div className="col-md-3">
                      <MDBInput type="password" name="newpassword" required/>
                    </div>
                  </div>
                  <div className="row d-flex align-items-center my-1">
                    <div className="col-md-2">
                      <MDBCardText className="m-0">Confirm Password:</MDBCardText>
                    </div>
                    
                    <div className="col-md-3">
                      <MDBInput type="password" name="confirmpassword" required/>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <MDBBtn type="submit">Change Password</MDBBtn>
                  </div>
                </MDBCardBody>
              </form>
              </MDBCard>
            </div>
          </MDBCol>

        </MDBRow>
      </MDBCardBody>
    </MDBCard>
    
    </MDBContainer>
    
 )
}

export default PlayerChangePass;