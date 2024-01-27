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

const Dashboardstatistics = ({image, title, number, number1}) => {
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
      setMc(data.data)
    })
  },[])

  const peso = Math.floor(number) * rate
  const mcval = (number1 * mc)
  const mcpeso = (number1 * rate)
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
                  number &&
                  <h2 className="text-end">${number}</h2>
                }
                {
                  number1 &&
                  <h2 className="text-end">{number1}</h2>
                }
              </div>
              {
                number &&
                <p className="text-end">₱ {peso?.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}</p>
              }
              {
                number1 &&
                <p className="text-end">${mcval?.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })} (₱{mcpeso?.toLocaleString('en-US', {
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