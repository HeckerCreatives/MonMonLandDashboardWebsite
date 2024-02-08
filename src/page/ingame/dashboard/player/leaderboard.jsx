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
import lbtitle from "../../../../assets/Ingame/leaderboardtitle.png"
import Swal from "sweetalert2";
const PlayerLeaderboard = () => {
    // const user = JSON.parse(localStorage.getItem("user"))
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API_URL}ingameleaderboard/find`,{
            credentials: 'include',
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

          if(data.message === "success"){
            setLeaderboard(data.data) 
          }
        })
            
    },[]) 

return(
    <>
    <MDBContainer>
    <div className="text-center my-3">
        <img src={lbtitle} alt="" className="img-fluid"/>
    </div>
    <MDBCard className="my-3" shadow="5">
      <MDBCardBody>
      <MDBTable responsive className="text-mute mt-5 mb-0">
                <MDBTableHead >
                    <tr className="text-center">
                    <th className="fw-bold" scope='col'>Rank</th>
                    <th className="fw-bold" scope='col'>Username</th>
                    <th className="fw-bold" scope='col'>Total Points</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="">
                {
                    leaderboard.map((data, i) => (
                    <tr key={i} className="text-center">
                        <th>
                            {i+1}
                        </th>
                        <td>
                            {data.username}
                        </td>
                        <td>
                            {data.amount?.toLocaleString('en-US', {
                            style: 'decimal',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                            })}
                        </td>
                    </tr>
                    ))
                }
                    
                </MDBTableBody>
            </MDBTable>
      </MDBCardBody>
    </MDBCard>
    
    </MDBContainer>
      </>
)
}

export default PlayerLeaderboard;