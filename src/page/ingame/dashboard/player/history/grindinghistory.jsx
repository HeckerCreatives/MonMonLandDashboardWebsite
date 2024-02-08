import React, {useState, useEffect} from "react";
import 
  {   
    MDBContainer, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
    MDBIcon,
    MDBInput,
    MDBCard,
    MDBCardBody
  } 
from "mdb-react-ui-kit";
import { handlePagination } from "../../../../../component/utils"
import PaginationPager from "../../../../../component/pagination";
import walleticon from "../../../../../assets/Ingame/Grinding History title tab.png"
import Swal from "sweetalert2";
const PlayerGrindingHistory = () => {
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
        fetch(`${process.env.REACT_APP_API_URL}gamewallet/findgrindinghistory`, {
            method: "GET",
            credentials: 'include',
            headers:{
              "Content-Type": 'application/json'
            },
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
        fetch(`${process.env.REACT_APP_API_URL}gamewallet/filtergrinding`, {
          method: "POST",
          credentials: 'include',
          headers:{
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            filter: str
          })
        })
        .then(result => result.json())
        .then(data => {
          sethistory(data.data)
        })
      } else {
        fetch(`${process.env.REACT_APP_API_URL}gamewallet/findgrindinghistory`, {
          method: "GET",
          credentials: 'include',
          headers:{
            "Content-Type": 'application/json'
          },
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
    <div className="text-center my-3">
        <img src={walleticon} alt="" className="img-fluid"/>
    </div>
    <MDBCard shadow="5">
        <MDBCardBody>
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
        </MDBCardBody>
    </MDBCard>
    
    </MDBContainer>
      </>
)
}

export default PlayerGrindingHistory;