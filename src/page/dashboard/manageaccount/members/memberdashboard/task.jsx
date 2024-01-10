import { 
    MDBContainer, 
    MDBRow, 
    MDBCol, 
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,} from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";

const Task = ({username}) => {
    const [task, setTask] = useState([])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}members/getmembertask`,{
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
            })
        })
        .then(result => result.json())
        .then(data => {
          if(data.message === "success"){
            setTask(data.data)
          }
        })
    },[])
    return(
        <MDBContainer>
        <MDBRow className="my-2">

          <MDBCol md={4} className="my-2">
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>Claim All Buton + 200 Monster Coin</MDBCardTitle>
                    <MDBTable small bordered>
                        <MDBTableBody className="text-center">
                        <tr>
                            <th scope='row'>
                            Watch Ads
                            </th>
                            <td>0 / 50</td>
                        </tr>
                        <tr>
                            <th scope='row'>
                            Participate Fiesta Game
                            </th>
                            <td>0 / 50</td>
                        </tr>
                        </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md={4} className="my-2">
          <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>Play All Buttton + 300 Monster Coin</MDBCardTitle>
                    <MDBTable small bordered>
                        <MDBTableBody className="text-center">
                        <tr>
                            <th scope='row'>
                            Watch Ads
                            </th>
                            <td>0 / 100</td>
                        </tr>
                        <tr>
                            <th scope='row'>
                            Participate Fiesta Game
                            </th>
                            <td>0 / 100</td>
                        </tr>
                        <tr>
                            <th scope='row'>
                            Participate Sponsor Game
                            </th>
                            <td>0 / 1</td>
                        </tr>
                        </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md={4} className="my-2">
          <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>Unlock Sponsor Game + 50 Monster Coin</MDBCardTitle>
                    <MDBTable small bordered>
                        <MDBTableBody className="text-center">
                        <tr>
                            <th scope='row'>
                            Diamond / Emerald / Ruby
                            </th>
                            <td>{task.subscription !== 'Pearl' ? 'Clear' : task.subscription}</td>
                        </tr>
                        <tr>
                            <th scope='row'>
                            Participate Fiesta Game
                            </th>
                            <td>0 / 20</td>
                        </tr>
                        <tr>
                            <th scope='row'>
                            Watch Ads
                            </th>
                            <td>0 / 20</td>
                        </tr>
                        </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow className="my-2">
          <MDBCol md={4} className="my-2">
          <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>Unlock Fiesta Game + 50 Monsetr Coin</MDBCardTitle>
                    <MDBTable small bordered>
                        <MDBTableBody className="text-center">
                        <tr>
                            <th scope='row'>
                            Subscriber
                            </th>
                            <td>{task.subscription  ? 'Clear' : task.subscription}</td>
                        </tr>
                        <tr>
                            <th scope='row'>
                            Watch Ads
                            </th>
                            <td>0 / 10</td>
                        </tr>
                        </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md={4} className="my-2">
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>Leaderboard Avatar + Discord Role + 400 Monster Coin</MDBCardTitle>
                    <MDBTable small bordered>
                        <MDBTableBody className="text-center">
                        <tr>
                            <th scope='row'>
                            Top 1 - 5
                            </th>
                            <td>Rank: </td>
                        </tr>
                        </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        </MDBContainer>
    )
}

export default Task;