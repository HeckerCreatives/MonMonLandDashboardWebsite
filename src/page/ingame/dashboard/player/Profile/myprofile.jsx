import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon, MDBCard, MDBCardBody, MDBTypography, MDBCardText, MDBInput } from "mdb-react-ui-kit";
import React , {useState, useEffect} from "react";
import Swal from "sweetalert2";
import { Toast } from "../../../../../component/utils.js";
const PlayerMyProfile = ({user}) => {
    const [details, setDetails] = useState([]);

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API_URL}playerdetails/find`,{
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          },
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
  
        fetch(`${process.env.REACT_APP_API_URL}playerdetails/update`,{
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email ? email.value : details.email,
            phone: phone ? phone.value : details.phone
          })
        })
        .then(result => result.json())
        .then(data => {
          if(data.message === "success"){
            Swal.fire({
              title: data.message,
              icon: "success",
              text: "You updated your details"
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

      const kapy = (text) => {
        
        if(text){
            navigator.clipboard.writeText(text)
            Toast.fire({
                icon: 'success',
                title: 'Copy successfully'
            })
        } else {
            Toast.fire({
                icon: 'error',
                title: 'No text to copy'
            }) 
        }
        
      }
 return(
    <MDBContainer>
      <MDBRow>
          <MDBCol>
          <div>
          <MDBTypography tag={'h2'} className="my-2">
            My Profile
          </MDBTypography>
          <MDBCard>
            <MDBCardBody>
            <div className="">
              <div className="row d-flex align-items-center my-2">
                <div className="col-md-1 pe-0">
                <MDBCardText className="m-0">Username:</MDBCardText>
                </div>
                <div className="col-md-3">
                <MDBInput label={user} disabled/>
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

            <div className="row d-flex align-items-center">
                <div className="col-md-1">
                  <MDBTypography className="m-0">Referral Link:</MDBTypography>
                </div>

                <div className="col-md-3">
                  <MDBInput required name="email" value={`${window.location.origin}/register?id=${details.owner}`} readOnly/>
                </div>

                <div className="col-md-3">
                  <MDBBtn floating tag={'a'} size="sm" 
                  onClick={() => kapy(`${window.location.origin}/register?id=${details.owner}`)}
                  >
                  <MDBIcon fas icon="clone" />
                  </MDBBtn>
                </div>
              </div>
              
            
            </MDBCardBody>
          </MDBCard>
          </div>
          
          </MDBCol>
          
      </MDBRow>
      <MDBRow>
          <MDBCol>
          <div>
          <MDBTypography tag={'h2'} className="my-2">
            Migration Link
          </MDBTypography>
          <MDBCard>
            <MDBCardBody>
            

            <div className="row d-flex align-items-center">
                <div className="col-md-1">
                  <MDBTypography className="m-0">Migration Link:</MDBTypography>
                </div>

                <div className="col-md-3">
                  <MDBInput required name="email" value={`${window.location.origin}/migrateph1?username=${user}`} readOnly/>
                </div>

                <div className="col-md-3">
                  <MDBBtn floating tag={'a'} size="sm" 
                  onClick={() => kapy(`${window.location.origin}/migrateph1?username=${user}`)}
                  >
                  <MDBIcon fas icon="clone" />
                  </MDBBtn>
                </div>
              </div>
              
            
            </MDBCardBody>
          </MDBCard>
          </div>
          
          </MDBCol>
          
      </MDBRow>
    </MDBContainer>
    
 )
}

export default PlayerMyProfile;