import React, {useState, useEffect} from "react";
import 
{   MDBContainer, 
    MDBBtn, 
    MDBRow, 
    MDBCol,
    MDBIcon, 
    MDBCard, 
    MDBCardBody,
    MDBTypography, 
    MDBCardText,
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter, } 
from "mdb-react-ui-kit";
import Swal from "sweetalert2";
const Dashboardstatistics = ({image, title, number, number1, txtonly, txtonly1}) => {
    const [rate, setRate] = useState(0)
    const [mc, setMc] = useState(0)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}usdrate/findpayoutrate`, {
      method: "GET",
      credentials: 'include',
      headers:{
        "Content-Type": 'application/json'
      }
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
      

      setRate(data.data)
    })
    fetch(`${process.env.REACT_APP_API_URL}communityactivy/mcvalue`, {
      method: "GET",
      credentials: 'include',
      headers:{
        "Content-Type": 'application/json'
      }
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

      setMc(data.data)
    })
  },[])
  const peso = (number * rate)
  const mcval = (number1 * mc)
  const mcpeso = (mcval * rate)
return(
    <>
    <MDBCard className="text-mute h-100">          
          <MDBCardBody>
            <MDBRow className="justify-content-between align-items-center">
              <MDBCol lg={3} className="text-center">
              <img src={image} alt=""/>
              </MDBCol>
              <MDBCol className="my-2 p-0">
              <div>
                <p className="text-end">{title}</p>
                {
                  txtonly1 &&
                  <h2 className="text-end">{txtonly1.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}</h2>
                }
                {
                  txtonly &&
                  <h2 className="text-end">{txtonly}</h2>
                }
                {
                  number &&
                  <h2 className="text-end">${number.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}</h2>
                }
                {
                  number1 &&
                  <h2 className="text-end">{number1.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}</h2>
                }
              </div>
              {
                number &&
                <p className="text-end">₱ {peso.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}</p>
              }
              {
                number1 &&
                <p className="text-end">${mcval.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })} (₱{mcpeso.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })})</p>
              }
                
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
    </MDBCard>
      </>
)
}

export default Dashboardstatistics;