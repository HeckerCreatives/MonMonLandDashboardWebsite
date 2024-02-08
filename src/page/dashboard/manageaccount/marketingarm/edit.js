import { 
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBCard,
    MDBCardBody,
    MDBCardText, } from "mdb-react-ui-kit";
  import React, {useState, useEffect} from "react";
//   import "../index.css"
  import Swal from "sweetalert2";
  import Cookies from 'js-cookie';
  const UpdateMarketingAccount = ({account}) => {
    const [confirmpass, setConfirmPass] = useState("")
    const [centredModal, setCentredModal] = useState(false);
    // const auth = JSON.parse(Cookies.get("auth"))
    const toggleShow = () => setCentredModal(!centredModal);
    
  
      const updatemarketingacc = (e) => {
        e.preventDefault()
        const {firstName, lastName, userName, email, password, phone} = e.target

        const requestBody = {
            firstName: firstName.value ? firstName.value : account.firstName,
            lastName: lastName.value ? lastName.value : account.lastName,
            userName: userName.value ? userName.value : account.userName,
            email: email.value ? email.value : account.email,
            phone: phone.value ? phone.value : account.phone,
        };

        if (password.value) {
            requestBody.password = password.value;
        }

          fetch(`${process.env.REACT_APP_API_URL}user/update/${account._id}`,{
            method: "PUT",
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              // Authorization: `Bearer ${auth?.token}`,
            },
            body: JSON.stringify(requestBody)
          }).then(result => result.json())
          .then(data => {
            if(data.expired){
              Swal.fire({
                icon: "error",
                title: data.expired == "duallogin" ? "Dual Login" : data.expired,
                text: "You Will Redirect to Login",
                allowOutsideClick: false,
                allowEscapeKey: false
              }).then(ok => {
                if(ok.isConfirmed){
                  Cookies.remove("auth", { path: '/' });
                  Cookies.remove("playfabAdminAuthToken", { path: '/' });
                  window.location.replace("/login");
                }
              })
            } else {
              if (!data.expired) {
                Swal.fire({
                  title: "Updated Successfully",
                  icon: "success",
                  text: "You Successfully Updated This  Account"
                }).then(result1 => {
                  if(result1.isConfirmed){
                    window.location.reload()
                  }
                })
                
              } else {
                Swal.fire({
                  title: "Unsuccessfull",
                  icon: "error",
                  text: "There is an error Updating Account"
                })
              }
            }

            
          })
        
        
      }
  
      return(
        <>         
          <MDBBtn 
          className=" mt-1 mx-2 fw-bold" 
          type="button" 
          outline color="dark" 
          onClick={toggleShow}> 
          Edit
          </MDBBtn>
          <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
          <MDBModalDialog centered size="lg">
            <MDBModalContent>
              <form autoComplete="off" onSubmit={updatemarketingacc}>
              <MDBModalHeader style={{background:"#A57552"}}>
                <MDBModalTitle className="text-light">Edit Account</MDBModalTitle>
                {/* <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn> */}
              </MDBModalHeader>
              <MDBModalBody>
              <MDBCardText className="text-dark mb-0 fw-bold">
                  Account Information
              </MDBCardText>
              <MDBCard style={{background: "#EDCAB4",}}>
                <MDBCardBody>
                <MDBCardText className="text-color mb-0 fw-bold" >
                  Username:
                </MDBCardText>
                <input name="userName" defaultValue={account.userName} className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}}  required></input>
                <MDBCardText className="text-color mb-0 fw-bold">
                  Password:
                </MDBCardText>
                <input name="password" type="password" className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}}></input>
                {/* <MDBCardText className="text-color mb-0 fw-bold">
                  Confirm Password:
                </MDBCardText>
                <input  className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}} onChange={e => setConfirmPass(e.target.value)}  required></input> */}
                </MDBCardBody>
              </MDBCard>
              <MDBCardText className="mt-5 text-dark mb-0 fw-bold">
                  Basic Information
              </MDBCardText>
              <MDBCard style={{background: "#EDCAB4"}}>
                <MDBCardBody>
                <MDBCardText className="text-color mb-0 fw-bold">
                Fisrt Name:
              </MDBCardText>
              <input name="firstName" defaultValue={account.firstName} className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}}  required></input>
              <MDBCardText className="text-color mb-0 fw-bold">
                Last Name:
              </MDBCardText>
              <input name="lastName" defaultValue={account.lastName} className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}}  required></input>
                <MDBCardText className="text-color mb-0 fw-bold">
                  Email:
                </MDBCardText>
                <input name="email" defaultValue={account.email} className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}}  required></input>
                <MDBCardText className="text-color mb-0 fw-bold">
                 Phone:
                </MDBCardText>
                <input name="phone" defaultValue={account.phone} className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}}  required></input>
                </MDBCardBody>
              </MDBCard>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn type="button" color='secondary' onClick={toggleShow}>
                  Cancel
                </MDBBtn>
                <MDBBtn type="submit">Save Changes</MDBBtn>
              </MDBModalFooter>
              </form>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
          </>
      )
  }
  
  export default UpdateMarketingAccount;