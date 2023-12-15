import React, {useState, useEffect} from "react";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon, MDBCard, MDBCardBody, MDBTypography, MDBCardText, MDBInput } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PlayerProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [details, setDetails] = useState([]);

    const [request, setRequest] = useState(0)
    const [done, setDone] = useState(0)
    const [processed, setProcessed] = useState(0);
  
    // useEffect(() => {
    //   if (auth) {
    //     if (auth.roleId.display_name !== "SubAdministrator") {
    //       localStorage.removeItem("auth");
    //       navigate("/sessions/login");
    //     }
    //   }
    // }, [auth, navigate]);

    useEffect(()=> {
      fetch(`${process.env.REACT_APP_API_URL}playerdetails/find`,{
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: user._id
        })
      })
      .then(result => result.json())
      .then(data => {
        if(data.message === "success"){
          setDetails(data.data) 
        }
      })
          
    },[]) 
    


    return (
        <MDBContainer >
        <MDBRow>
          <MDBCol>
          <div>
          <MDBTypography tag={'h2'} className="my-2">
            My Profile
          </MDBTypography>
          <MDBCard>
            <MDBCardBody>
            <div className="d-flex align-items-center my-1">
            <MDBCardText className="m-0">Username:</MDBCardText>
            <div className="mx-2">
            <MDBInput label={user.username} disabled/>
            </div>
            </div>
            <div className="d-flex align-items-center">
              <MDBTypography className="m-0">Phone:</MDBTypography>

              <div className="mx-2">
              <MDBInput label={details.phone} disabled/>
              </div>
              
              <div className="mx-2">
              <MDBBtn size="sm">Change Phone number</MDBBtn>
              </div>
              
            </div>
              <div className="d-flex align-items-center">
              <MDBTypography className="m-0">Email:</MDBTypography>

              <div className="mx-2">
              <MDBInput label={details.email} disabled/>
              </div>
              
              <div className="mx-2">
              <MDBBtn size="sm">Change Email</MDBBtn>
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
            Change Password
          </MDBTypography>
          <MDBCard>
            <MDBCardBody>
            <div className="d-flex align-items-center my-1">
            <MDBCardText className="m-0">Current Password:</MDBCardText>
            <div className="mx-2">
            <MDBInput disabled/>
            </div>
            </div>
            <div className="d-flex align-items-center my-1">
            <MDBCardText className="m-0">New Password:</MDBCardText>
            <div className="mx-2">
            <MDBInput disabled/>
            </div>
            </div>
            <div className="d-flex align-items-center my-1">
            <MDBCardText className="m-0">Confirm Password:</MDBCardText>
            <div className="mx-2">
            <MDBInput disabled/>
            </div>
            </div>
              <div className="d-flex justify-content-end">
              <MDBBtn>Change Password</MDBBtn>
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
            My Payment Details
          </MDBTypography>
          <MDBCard>
            <MDBCardBody>
            <div className="d-flex align-items-center my-1">
            <MDBCardText className="m-0">First Name:</MDBCardText>
            <div className="mx-2">
            <MDBInput disabled/>
            </div>
            </div>
            <div className="d-flex align-items-center my-1">
            <MDBCardText className="m-0">Middle Name:</MDBCardText>
            <div className="mx-2">
            <MDBInput disabled/>
            </div>
            </div>
            <div className="d-flex align-items-center my-1">
            <MDBCardText className="m-0">Last Name:</MDBCardText>
            <div className="mx-2">
            <MDBInput disabled/>
            </div>
            </div>
            <div className="d-flex align-items-center my-1">
            <MDBCardText className="m-0">Email:</MDBCardText>
            <div className="mx-2">
            <MDBInput disabled/>
            </div>
            </div>
            <div className="d-flex align-items-center my-1">
            <MDBCardText className="m-0">Mobile Number:</MDBCardText>
            <div className="mx-2">
            <MDBInput disabled/>
            </div>
            </div>
            <div className="d-flex align-items-center my-1">
            <MDBCardText className="m-0">Birthdate:</MDBCardText>
            <div className="mx-2">
            <MDBInput disabled/>
            </div>
            </div>
              <div>
              <MDBTypography tag={'h4'}>Address:</MDBTypography>
              <MDBCol className="offset-1">
              <div className="d-flex align-items-center my-1">
              <MDBCardText className="m-0">Street1:</MDBCardText>
              <div className="mx-2">
              <MDBInput disabled/>
              </div>
              </div>
              <div className="d-flex align-items-center my-1">
              <MDBCardText className="m-0">Street2:</MDBCardText>
              <div className="mx-2">
              <MDBInput disabled/>
              </div>
              </div>
              <div className="d-flex align-items-center my-1">
              <MDBCardText className="m-0">Barangay:</MDBCardText>
              <div className="mx-2">
              <MDBInput disabled/>
              </div>
              </div>
              <div className="d-flex align-items-center my-1">
              <MDBCardText className="m-0">City:</MDBCardText>
              <div className="mx-2">
              <MDBInput disabled/>
              </div>
              </div>
              <div className="d-flex align-items-center my-1">
              <MDBCardText className="m-0">Province:</MDBCardText>
              <div className="mx-2">
              <MDBInput disabled/>
              </div>
              </div>
              <div className="d-flex align-items-center my-1">
              <MDBCardText className="m-0">Country:</MDBCardText>
              <div className="mx-2">
              <MDBInput disabled/>
              </div>
              </div>
              </MDBCol>
              </div>
              <div className="d-flex justify-content-end">
                <MDBBtn className="mx-2">
                  Edit
                </MDBBtn>
                <MDBBtn className="mx-2">
                  Save
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
          </div>
          </MDBCol>
        </MDBRow>

        </MDBContainer>
        
    )
}

export default PlayerProfile;