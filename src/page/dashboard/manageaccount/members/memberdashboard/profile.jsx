import React, {useState, useEffect} from "react";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon, MDBCard, MDBCardBody, MDBTypography, MDBCardText, MDBInput } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { isgamelogin } from "../../../../../component/utils";
const MemberProfile = ({username}) => {
    const [details, setDetails] = useState([]);

    useEffect(()=> {
      fetch(`${process.env.REACT_APP_API_URL}members/findprofile`,{
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username
        })
      })
      .then(result => result.json())
      .then(data => {
        if(data.message === "success"){
          setDetails(data.data) 
        }
      })
          
    },[]) 
    
    const changedetails = (e) => {
      e.preventDefault();
      const { email, phone } = e.target

      fetch(`${process.env.REACT_APP_API_URL}members/updatememberdetail`,{
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email ? email.value : details.email,
          phone: phone ? phone.value : details.phone,
          username: username
        })
      })
      .then(result => result.json())
      .then(data => {
        if(data.message === "success"){
          Swal.fire({
            title: data.message,
            icon: "success",
            text: `You updated ${username} details`
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
    }

    const changepassword = async (e) => {
      e.preventDefault();
      const specialchar = /^[a-zA-Z0-9]+$/;
      const {newpassword, confirmpassword} = e.target
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
        }  else {
         await fetch(`${process.env.REACT_APP_API_URL}members/changepassmember`,{
            method: "POST",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              password: newpassword.value,
              username: username
            })
          })
          .then(result => result.json())
          .then(data => {
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



    return (
        <MDBContainer >
        <MDBRow>
          <MDBCol>
          <div>
          <MDBTypography tag={'h2'} className="my-2">
            {username.charAt(0).toUpperCase() + username.slice(1)} Profile
          </MDBTypography>
          <MDBCard>
            <MDBCardBody>
            <div className="">
              <div className="row d-flex align-items-center my-2">
                <div className="col-md-1 pe-0">
                <MDBCardText className="m-0">Username:</MDBCardText>
                </div>
                <div className="col-md-3">
                <MDBInput label={username} disabled/>
                </div>
              </div>
            </div>
            
            <form onSubmit={changedetails} className=" my-2">
              <div className="row d-flex align-items-center">
                <div className="col-md-1">
                  <MDBTypography className="m-0">Phone:</MDBTypography>
                </div>

                <div className="col-md-3">
                  <MDBInput required name="phone" label={details.phone} />
                </div>

                <div className="col-md-3">
                  <MDBBtn type="submit" size="sm">
                    Change Phone
                  </MDBBtn>
                </div>
              </div>
            </form>

            <form onSubmit={changedetails} className=" my-2">
              <div className="row d-flex align-items-center">
                <div className="col-md-1">
                  <MDBTypography className="m-0">Email:</MDBTypography>
                </div>

                <div className="col-md-3">
                  <MDBInput required name="email" label={details.email} />
                </div>

                <div className="col-md-3">
                  <MDBBtn type="submit" size="sm">
                    Change Email
                  </MDBBtn>
                </div>
              </div>
            </form>

              
            
            </MDBCardBody>
          </MDBCard>
          </div>
          
          </MDBCol>
        </MDBRow>
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
        </MDBContainer>
        
    )
}

export default MemberProfile;