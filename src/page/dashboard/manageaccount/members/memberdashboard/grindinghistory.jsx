import React, {useState, useEffect} from "react";
import 
  {   
    MDBContainer, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
    MDBIcon,
    MDBInput
  } 
from "mdb-react-ui-kit";
import { handlePagination } from "../../../../../component/utils"
import PaginationPager from "../../../../../component/pagination";
const MemberGrindingHistory = ({username}) => {
    const [history, sethistory] = useState([]),
    [page, setPage] = useState(1),
    [total, setTotal] = useState(0);
    const [dateValue, setDateValue] = useState('');

      useEffect(() => {
        let totalPages = Math.floor(history.length / 10);
        if (history.length % 10 > 0) totalPages += 1;
        setTotal(totalPages);
      }, [history])

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API_URL}members/getgrindinghistory`, {
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

    const handleDateChange = (e) => {
        const value = e.target.value;
        setDateValue(value);
        filtergrinding(value);
    }

    const filtergrinding = (filterValue) => {
        const str = filterValue;
      if(str !== 'All'){
        fetch(`${process.env.REACT_APP_API_URL}members/filtergrinding`, {
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
        fetch(`${process.env.REACT_APP_API_URL}members/getgrindinghistory`, {
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
        setDateValue('');
      }
    }
    
return(
    <>
    <MDBContainer>
    {/* <label for="fruits">Choose a fruit:</label> */}
    <div className="d-flex align-items-center">
        <MDBIcon fas icon="filter" fixed /> &nbsp;
        <div className="col-lg-2">
            <MDBInput name="filter" type="date" value={dateValue} onChange={handleDateChange}/>
        </div>
        &nbsp;
        <div className="col-lg-2">
            <MDBIcon value="All" fas icon="redo-alt" onClick={() =>filtergrinding('All')} style={{cursor: "pointer"}}/>
        </div>
    </div>
      <MDBTable small responsive className="text-mute mt-5 mb-0">
         <MDBTableHead>
              <tr className="text-center">
              <th className="fw-bold" scope='col'>Date</th>
              <th className="fw-bold" scope='col'>Time Started</th>
              <th className="fw-bold" scope='col'>End Time</th>
              <th className="fw-bold" scope='col'>Monster Coin</th>
              <th className="fw-bold" scope='col'>Monster Gem</th>
              <th className="fw-bold" scope='col'>Activity Points</th>
              </tr>
          </MDBTableHead>
          <MDBTableBody className="fw-bold text-center">
              {
                handlePagination(history, page, 10)?.map((item, i) => (
                  <tr key={i} className="text-center">
                      <td>{new Date(item.createdAt).toLocaleString()}</td>  
                      <td>
                      {new Date(item.timestarted * 1000).toLocaleString()}
                      </td>
                      <td>
                      {new Date(item.endttime * 1000).toLocaleString()}
                      </td>
                      <td>
                        {item.harvestmc.toFixed(6)}
                      </td>
                      <td>
                        {item.harvestmg.toFixed(6)}
                      </td>
                      <td>
                        {item.harvestap.toFixed(6)}
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

export default MemberGrindingHistory;