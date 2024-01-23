import React, {useState, useEffect} from "react";
import 
{   MDBContainer, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,} 
from "mdb-react-ui-kit";

const SuperMonmon = () => {
    const [supermonmon, setSupermonmon] = useState([]);

    // useEffect(()=> {
    //     fetch(`${process.env.REACT_APP_API_URL}members/fiesta`,{
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         credentials: 'include',
    //         body: JSON.stringify({
    //             type: 'supermonmon'
    //         })
    //     })
    //     .then(result => result.json())
    //     .then(data => {
    //       if(data.message === "success"){
    //         // setSupermonmon(data.data) 
    //         // console.log(data.data)
    //       }
    //     })
            
    // },[]) 

return(
    <>
    <MDBContainer>
    <MDBTable small responsive className="text-mute mb-0">
                <MDBTableHead >
                    <tr className="text-center">
                    <th className="fw-bold" scope='col'>Rank</th>
                    <th className="fw-bold" scope='col'>Name</th>
                    <th className="fw-bold" scope='col'>Total Points</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="fw-bold text-center">
                { supermonmon.length !== 0 ?
                    supermonmon.map((data, i) => (
                    <tr key={i}>
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

export default SuperMonmon;