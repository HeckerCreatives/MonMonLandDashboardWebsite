import React, {useState, useEffect} from "react";
import 
{   MDBContainer, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBIcon} 
from "mdb-react-ui-kit";
import mcicon from "../../../../assets/header/MC coin.png"
const FiestaGame = ({game, prizepool}) => {
    
return(
    <>
    <MDBContainer>
    <div className="col-md-4 offset-4">
    <MDBCard>
      <MDBCardBody className="d-flex justify-content-center">
      <div className="d-flex align-items-center">
      {/* <MDBIcon fas icon="dollar-sign" size="4x"/> */}
      <img src={mcicon} alt="" style={{width: "50px", height: '50px'}}/>
        <MDBCardText className="ms-2 fw-bold">
          {prizepool?.toLocaleString('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </MDBCardText>
      </div>
      {/* <div>
      <MDBIcon fas icon="dollar-sign" size="4x"/>
      </div>
      <div className="d-flex align-items-center">
      <MDBIcon fas icon="dollar-sign" size="3x"/>
        <MDBCardText className="ms-2 fw-bold">
          {prizepool?.toLocaleString('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </MDBCardText>
      </div> */}
      
      </MDBCardBody>
    </MDBCard>
    </div>
    
    <MDBTable small responsive className="text-mute mt-5 mb-0">
                <MDBTableHead >
                    <tr className="text-center">
                        <th className="fw-bold" scope='col'>Rank</th>
                        <th className="fw-bold" scope='col'>Name</th>
                        <th className="fw-bold" scope='col'>Total Points</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="fw-bold text-center">
                { game?.leaderboard !== undefined && game?.leaderboard !== null ?
                    Object.keys(game?.leaderboard).map((key) => {
                        const entry = game?.leaderboard[key];
                        return (
                        <tr key={key}>
                            <td>{Math.floor(key) + 1}</td>
                            <td>{entry.username}</td>
                            <td>{entry.score}</td>
                        </tr>
                        );
                    })
                        :
                        <tr>
                            <td colSpan={3}>
                            No Data
                            </td>
                        </tr>
                }
                </MDBTableBody>
            </MDBTable>
    </MDBContainer>
      </>
)
}

export default FiestaGame;