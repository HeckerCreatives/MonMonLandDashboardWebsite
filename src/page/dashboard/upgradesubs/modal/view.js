import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBTypography,
  MDBCardText,
  MDBRow,
  MDBCol
} from "mdb-react-ui-kit";

const ViewCashier = ({ theme, id, checkedItems}) => {
  const [show, setShow] = useState(false);
  const [user, setuser] = useState('');
  const toggleShow = () => setShow(!show);
  
  useEffect(()=>{
    if(!checkedItems){
    fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/findone/${id}`)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      setuser(result)
    })
    } else {
      // 
    }
  },[checkedItems, id])
  return (
    <>
      <MDBBtn
        // outline
        onClick={toggleShow}
        className='mt-1 mx-2 fw-bold' 
        color='success'
        disabled={checkedItems}
      >
        {/* <MDBIcon fas icon="plus" /> */}
        View
      </MDBBtn>

      <MDBModal show={show} setShow={setShow} tabIndex="-1" staticBackdrop>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className={``}>
            <MDBModalHeader style={{background:"#A57552"}}>
              <MDBModalTitle className="text-light">
                View
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>              
            </MDBModalHeader>
            <MDBModalBody>
              <MDBCard className="px-0 mb-3" style={{background: "#EDCAB4",}}>
                <MDBCardBody
                >
                <MDBRow>
                <MDBCol className="">
                    <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Cashier :
                    </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1" style={{width:'100%'}} defaultValue={user ? user.userId.userName : null} disabled></input>
                    <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Payment Method :
                    </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1" defaultValue={user.paymentmethod} style={{width:'100%'}} disabled></input>
                    <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Number of Transaction :
                    </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1" defaultValue={user.numberoftransaction} style={{width:'100%'}} disabled></input> 
                    <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Payment Detail:
                    </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1" defaultValue={user.paymentdetail} style={{width:'100%'}} disabled></input> 
                    <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Payment Limit :
                    </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1" defaultValue={user.paymentlimit} style={{width:'100%'}} disabled></input>  
                    <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Status :
                    </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1" defaultValue={user.status} style={{width:'100%'}} disabled></input> 
                </MDBCol>
                </MDBRow>
                </MDBCardBody>
              
              </MDBCard>
              
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default ViewCashier;
