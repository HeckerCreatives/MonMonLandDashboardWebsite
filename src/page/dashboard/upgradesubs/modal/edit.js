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
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
const UpdateCashier = ({checkedItems, id}) => {
  const [user, setuser] = useState('');
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  useEffect(()=>{
    if(!checkedItems){
    fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/findone/${id}`)
    .then(response => response.json())
    .then(result => {
      setuser(result)
    })
    } else {
      // 
    }
  },[checkedItems, id])

  const paymethod = {
    Gcash: "Gcash",
    Bank: "Bank",
    Binance: "Binance"
  }

  function updatecashier (e) {
    e.preventDefault()
    const {paymentmethod, paymentdetail, paymentlimit} = e.target
    fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/update/${user._id}`, {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          paymentmethod: paymentmethod.value ? paymentmethod.value : user.paymentmethod,
          paymentdetail: paymentdetail.value ? paymentdetail.value : user.paymentdetail,
          paymentlimit: paymentlimit.value ? paymentlimit.value : user.paymentlimit,
      })
    }).then(result => result.json())
    .then(data => {
      if (data) {
				Swal.fire({
					title: "Cashier Updated Successfully",
					icon: "success",
					text: "You Successfully Updated a Cashier"
				}).then(ok => {
          if(ok.isConfirmed){
            window.location.reload()
          }
        })
				
			} else {
				Swal.fire({
					title: "Cashier Update Unsuccessfully",
					icon: "error",
					text: "There is an error Updating the Account"
				})
			}
    })
  }

return (
    <>
      <MDBBtn
        // outline
        onClick={toggleShow}
        className='mt-1 mx-2 fw-bold' 
        color='primary'
        disabled={checkedItems}
      >
        {/* <MDBIcon fas icon="plus" /> */}
        Update
      </MDBBtn>
      <MDBModal show={show} setShow={setShow} tabIndex="-1" staticBackdrop>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className={``}>
            <form autoComplete="off" onSubmit={updatecashier}>
              <MDBModalHeader style={{background:"#A57552"}}>
                <MDBModalTitle className="text-light">Update Cashier</MDBModalTitle>
              </MDBModalHeader>
              <MDBModalBody>
                {/* <MDBCardText className="text-dark mb-0 fw-bold">Game Information</MDBCardText> */}
                <MDBCard style={{background: "#EDCAB4",}}>
                <MDBCardBody> 
                <MDBRow>
                <MDBCol className="">
                    <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Cashier :
                    </MDBCardText>
                    <select className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}} disabled>
                    <option>{user ? user.userId.userName : null}</option>
                    </select>
                    <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Update Payment Method :
                    </MDBCardText>
                    <select className="square bordercolor rounded mb-2 p-1" name="paymentmethod" style={{width:'100%'}}>
                    {Object.entries(paymethod).map(([key, value]) => (
                      <option key={key} value={key} selected={user.paymentmethod === key}>{value}</option>
                    ))}
                    </select> 
                    <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Update Payment Detail:
                    </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1" name="paymentdetail" defaultValue={user.paymentdetail} style={{width:'100%'}} ></input> 
                    <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Update Payment Limit :
                    </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1" name="paymentlimit" defaultValue={user.paymentlimit} style={{width:'100%'}} ></input>  
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
                Save Changes
                </MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default UpdateCashier;