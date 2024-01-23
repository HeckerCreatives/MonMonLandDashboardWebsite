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
    MDBModalFooter,
    MDBCardTitle, } 
from "mdb-react-ui-kit";
import announcetitle from "../../../../assets/Ingame/announcementtitle.png"
const PlayerNews = () => {
  const [announcement, setAnnouncement] = useState([])

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}gameusers/gameannouncement`, {
        method: "GET",
        credentials: 'include',
        headers:{
          "Content-Type": 'application/json'
        }
      })
      .then(result => result.json())
      .then(data => {
        if(data.message === "success"){
          setAnnouncement(data.data)
        } else if(data.message === "noannouncement"){
          setAnnouncement("No Announcement")
        }
           
      })
    },[])
return(
    <>
    <MDBContainer>
    <div className="text-center my-3">
        <img src={announcetitle} alt="" className="img-fluid"/>
    </div>
    <MDBRow>
        <MDBCol md={6} className="offset-md-3">
        <MDBCard>
      <MDBCardBody className="text-center">
      <MDBCardTitle>{announcement.title}</MDBCardTitle>
        <MDBCardText>
        {announcement.description}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
        </MDBCol>
    </MDBRow>
    
    </MDBContainer>
      </>
)
}

export default PlayerNews;