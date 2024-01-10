import React, {useState, useEffect} from "react";
import 
  {   
    MDBContainer, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
    MDBIcon
  } 
from "mdb-react-ui-kit";
import { handlePagination } from "../../../../../component/utils"
import PaginationPager from "../../../../../component/pagination";
const MemberWalletHistory = ({username}) => {
    const [history, sethistory] = useState([]),
    [page, setPage] = useState(1),
    [total, setTotal] = useState(0);
      
      useEffect(() => {
        let totalPages = Math.floor(history.length / 10);
        if (history.length % 10 > 0) totalPages += 1;
        setTotal(totalPages);
      }, [history])

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API_URL}members/memberwallethistory`, {
            method: "POST",
            credentials: 'include',
            headers:{
              "Content-Type": 'application/json'
            },
            body: JSON.stringify({
              username: username
            })
          })
          .then(result => result.json())
          .then(data => {
            sethistory(data.data)
          })
    },[])

    const filterwallet = (e) => {
      const str = e.target.value
      if(str !== 'All'){
        fetch(`${process.env.REACT_APP_API_URL}members/filterwallet`, {
          method: "POST",
          credentials: 'include',
          headers:{
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            username: username,
            filter: str
          })
        })
        .then(result => result.json())
        .then(data => {
          sethistory(data.data)
        })
      } else {
        fetch(`${process.env.REACT_APP_API_URL}members/memberwallethistory`, {
          method: "POST",
          credentials: 'include',
          headers:{
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            username: username
          })
        })
        .then(result => result.json())
        .then(data => {
          sethistory(data.data)
        })
      }
    }
    
return(
    <>
    <MDBContainer>
    {/* <label for="fruits">Choose a fruit:</label> */}
    <div class="select-container">
        <MDBIcon fas icon="filter" fixed/> &nbsp;
        <select name="filter" onChange={filterwallet}>
            <option value="All">All</option>
            <option value="Top Up">Top Up</option>
            <option value="Tools Unilevel">Tools Unilevel</option>
            <option value="Missed Clock Unilevel">Missed Clock Unilevel</option>
            <option value="Missed Tools Unilevel">Missed Tools Unilevel</option>
            <option value="Unilevel Bonus">Unilevel Bonus</option>
            <option value="Clock Unilevel">Clock Unilevel</option>
        </select>
    </div>
      <MDBTable small responsive className="text-mute mt-5 mb-0">
         <MDBTableHead>
              <tr className="text-center">
              <th className="fw-bold" scope='col'>Date</th>
              <th className="fw-bold" scope='col'>Amount</th>
              <th className="fw-bold" scope='col'>Description</th>
              </tr>
          </MDBTableHead>
          <MDBTableBody className="fw-bold text-center">
              {
                handlePagination(history, page, 10)?.map((item, i) => (
                  <tr key={i} className="text-center">
                      <td>{new Date(item.createdAt).toLocaleString()}</td>  
                      <td>
                      {item.amount.toFixed(2)}
                      </td>
                      <td>
                      {item.description}
                      </td>
                  </tr>
                  ))
              }
              
          </MDBTableBody>
      </MDBTable>
      <PaginationPager
              total={total} page={page} setPage={setPage}
      />
    </MDBContainer>
      </>
)
}

export default MemberWalletHistory;