import { MDBCol, MDBContainer, MDBRow, MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn, 
    MDBInput,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,} from "mdb-react-ui-kit";
import React, {useState} from "react";
import Swal from "sweetalert2";
const ChooseReferrer = ({basicModal, setBasicModal}) => {
    

    const setreferrer = (e) => {
        e.preventDefault();
        const {referrer} = e.target

        fetch(`${process.env.REACT_APP_API_URL}gameusers/setreferrer`,{
            method: "POST",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                referrer: referrer.value
            })
        })
        .then(result => result.json())
      .then(data => {
        if(data.message === "success"){
            Swal.fire({
                title: "Success",
                icon: "success",
                text: data.data,
                allowEscapeKey: false,
                allowOutsideClick: false
            }).then(ok => {
                if(ok.isConfirmed){
                    window.location.reload()
                }
            })
        } else if(data.message === "failed"){
            Swal.fire({
                title: "Error",
                icon: "error",
                text: data.data
            })
        }
      })
    }

    return (
        <>
        <MDBModal className="bg-dark" closeOnEsc='false' staticBackdrop show={basicModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Choose Your Referrer</MDBModalTitle>
              {/* <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn> */}
            </MDBModalHeader>
            <form autoComplete="off" onSubmit={setreferrer}>
            <MDBModalBody>
            <MDBCardText className="fw-bold bg-success text-danger">
            PS: Please be reminded that you can do this only once so choose wisely.
            </MDBCardText>
            <MDBInput name="referrer" required label={`Enter Referrer Username`} defaultValue={'monmonland'}/>
            <MDBBtn className="mt-3" type="submit">Save</MDBBtn>
            </MDBModalBody>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
</>
    )
}

export default ChooseReferrer;