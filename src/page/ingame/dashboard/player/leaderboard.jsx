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

const PlayerLeaderboard = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API_URL}ingameleaderboard/find`,{
            credentials: 'include',
        })
        .then(result => result.json())
        .then(data => {
          if(data.message === "success"){
            setLeaderboard(data.data) 
          }
        })
            
    },[]) 

return(
    <>
    <MDBContainer>
    <MDBTable responsive className="text-mute mb-0">
                <MDBTableHead >
                    <tr className="text-center">
                    <th className="fw-bold" scope='col'>Rank</th>
                    <th className="fw-bold" scope='col'>Name</th>
                    <th className="fw-bold" scope='col'>Total Points</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="fw-bold">
                {
                    leaderboard.map((data, i) => (
                    <tr key={i} className="text-center">
                        <td>
                            {i+1}
                        </td>
                        <td>
                            {data.owner.username}
                        </td>
                        <td>
                            {data.amount}
                        </td>
                    </tr>
                    ))
                }
                    
                </MDBTableBody>
            </MDBTable>
    </MDBContainer>
      </>
)
}

export default PlayerLeaderboard;