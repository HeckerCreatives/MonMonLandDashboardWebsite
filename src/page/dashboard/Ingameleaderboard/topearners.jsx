import React, {useState, useEffect} from "react";
import 
{   MDBContainer, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
    MDBTypography} 
from "mdb-react-ui-kit";

const TopEarners = () => {
    const [topearners, setTopEarners] = useState([]);

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API_URL}members/topearners`,{
            credentials: 'include',
        })
        .then(result => result.json())
        .then(data => {
          if(data.message === "success"){
            setTopEarners(data.data) 
          }
        })
            
    },[]) 

return(
    <>
    <MDBContainer>
    <div className="text-center my-3">
        <MDBTypography tag={'h1'}>Top 15 Earner's</MDBTypography>
    </div>
    <MDBTable small responsive className="text-mute mt-3 mb-0">
                <MDBTableHead >
                    <tr className="text-center">
                        <th className="fw-bold" scope='col'>Rank</th>
                        <th className="fw-bold" scope='col'>Name</th>
                        <th className="fw-bold" scope='col'>Total Points</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="">
                {
                    topearners.map((data, i) => (
                    <tr key={i} className="text-center">
                        <th>
                            {i+1}
                        </th>
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

export default TopEarners;