import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBFile,
  MDBIcon,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
  MDBRow,
  MDBTextArea,
  MDBSpinner
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
const CreateCashier = () => {
  // const auth = JSON.parse(Cookies.get("auth"))
  const [adminaccounts, setAdminAcc] = useState([]);
  const [csraccounts, setCsrAcc] = useState([]);
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [isloading, setIsLoading] = useState(false);

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}user/find`,{
      credentials: 'include',
    })
    .then(result => result.json())
    .then(data => {

      const filteradmin = data.filter(e => e.roleId.display_name === "SubAdministrator" && e.banned === false)
      const filtercsr = data.filter(e => e.roleId.display_name === "Agent" && e.banned === false)
      setAdminAcc(filteradmin)
      setCsrAcc(filtercsr)
    })
    },[])
  
  const paymethod = {
    Gcash: "Gcash",
    Bank: "Bank",
    Binance: "Binance"
  }

  function addcashier (e) {
    e.preventDefault()
    setIsLoading(true)
    const {userId, paymentmethod, paymentdetail, paymentlimit} = e.target
    fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/add`, {
      method:'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({
          userId: userId.value,
          paymentmethod: paymentmethod.value,
          paymentdetail: paymentdetail.value,
          // paymentlimit: paymentlimit.value,
      })
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
            Cookies.remove("auth", { path: '/' });;
            Cookies.remove("playfabAdminAuthToken", { path: '/' });
            window.location.replace("/login");
          }
        })
      } else {
        if (!data.expired) {
          setIsLoading(false)
          Swal.fire({
            title: "Cashier Created Successfully",
            icon: "success",
            text: "You Successfully Created a Cashier"
          }).then(ok => {
            if(ok.isConfirmed){
              window.location.reload()
            }
          })
          
        } else {
          setIsLoading(false)
          Swal.fire({
            title: "Cashier Creation Unsuccessfully",
            icon: "error",
            text: "There is an error Creating the Account"
          })
        }
      }

      
    })
  }

return (
    <>
      <MDBBtn
        outline
        onClick={toggleShow}
        className='mt-1 mx-2 fw-bold' 
        color='dark'
      >
        <MDBIcon fas icon="plus" />
        &nbsp; Add Cashier
      </MDBBtn>
      <MDBModal show={show} setShow={setShow} tabIndex="-1" staticBackdrop>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className={``}>
            <form autoComplete="off" onSubmit={addcashier}>
              <MDBModalHeader style={{background:"#A57552"}}>
                <MDBModalTitle className="text-light">Create Cashier</MDBModalTitle>
              </MDBModalHeader>
              <MDBModalBody>
                {/* <MDBCardText className="text-dark mb-0 fw-bold">Game Information</MDBCardText> */}
                <MDBCard style={{background: "#EDCAB4",}}>
                <MDBCardBody> 
                <MDBRow>
                <MDBCol className="">
                    <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Select Cashier :
                    </MDBCardText>
                    <select className="square bordercolor rounded mb-2 p-1" name="userId" style={{width:'100%'}} required>
                    <option >-- Select an account --</option>
                    {adminaccounts.concat(csraccounts).map(account => (
                      <option key={account._id} value={account._id}>{account.userName}</option>
                    ))}
                    </select>
                    <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Select Payment Method :
                    </MDBCardText>
                    <select className="square bordercolor rounded mb-2 p-1" name="paymentmethod" style={{width:'100%'}} required>
                    <option>-- Select a payment method --</option>
                    {Object.entries(paymethod).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                    </select> 
                    <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Enter Wallet Address:
                    </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1" name="paymentdetail" style={{width:'100%'}} required></input> 
                    {/* <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Payment Limit :
                    </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1" name="paymentlimit" style={{width:'100%'}} required></input>   */}
                </MDBCol>
                </MDBRow>
                </MDBCardBody>                
                </MDBCard>
                
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn className='text-dark' type="button" color="light" onClick={toggleShow}>
                Cancel
                </MDBBtn>
                <MDBBtn type="submit" className={``}>
                {isloading ? <MDBSpinner size="sm" role='status' grow/> : "Create Cashier"}
                </MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default CreateCashier;