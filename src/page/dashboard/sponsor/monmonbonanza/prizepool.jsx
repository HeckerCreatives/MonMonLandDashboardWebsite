import React, {useState, useEffect} from "react";
import 
{   MDBContainer, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBIcon} 
from "mdb-react-ui-kit";

const PrizePool = () => {
    const [prizepool, setPrizePool] = useState([]);

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API_URL}members/sponsor`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                type: 'monmonbonanza'
            })
        })
        .then(result => result.json())
        .then(data => {
          if(data.message === "success"){
            setPrizePool(data.data) 
          }
        })
            
    },[]) 

return(
    <>
    <MDBContainer>
    <div className="col-md-6 offset-3">
    <MDBCard>
      <MDBCardBody className="d-flex justify-content-between">
      <div>
      <MDBIcon fas icon="dollar-sign" size="4x"/>
      </div>
      <div className="d-flex align-items-center">
      <MDBIcon fas icon="dollar-sign" size="3x"/>
        <MDBCardText className="ms-2 fw-bold">
          {prizepool}
        </MDBCardText>
      </div>
      
      </MDBCardBody>
    </MDBCard>
    </div>
    <MDBTable small responsive className="text-mute mt-5 mb-0">
                <MDBTableHead >
                    <tr className="text-center">
                    <th className="fw-bold" scope='col'>Date</th>
                    <th className="fw-bold" scope='col'>Username</th>
                    <th className="fw-bold" scope='col'>Subscription</th>
                    <th className="fw-bold" scope='col'>Total Points</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="fw-bold text-center">
                { prizepool.length !== 0 ?
                    prizepool.map((data, i) => (
                    <tr key={i} className="">
                        <td>
                            {i+1}
                        </td>
                        <td>
                            {data.owner.username}
                        </td>
                        <td>
                            {/* {data.owner.username} */}
                        </td>
                        <td>
                            {data.amount}
                        </td>
                    </tr>
                    ))
                    :
                    <tr>
                        <td colSpan={4}>
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

export default PrizePool;