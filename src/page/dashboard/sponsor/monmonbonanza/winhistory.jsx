import React, {useState, useEffect} from "react";
import 
{   MDBContainer, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,} 
from "mdb-react-ui-kit";

const WinHistory = () => {
    const [winhistory, setWinhistory] = useState([]);

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
            setWinhistory(data.data) 
          }
        })
            
    },[]) 

return(
    <>
    <MDBContainer>
    <MDBTable small responsive className="text-mute mb-0">
                <MDBTableHead >
                    <tr className="text-center">
                    <th className="fw-bold" scope='col'>Date</th>
                    <th className="fw-bold" scope='col'>Username</th>
                    <th className="fw-bold" scope='col'>Item Won</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="fw-bold text-center">
                { winhistory.length !== 0 ?
                    winhistory.map((data, i) => (
                    <tr key={i} className="">
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

export default WinHistory;