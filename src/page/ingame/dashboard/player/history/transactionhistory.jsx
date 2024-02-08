import React, {useState, useEffect} from "react";
import 
  {   
    MDBContainer, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
    MDBIcon,
    MDBCard,
    MDBCardBody
  } 
from "mdb-react-ui-kit";
import { handlePagination } from "../../../../../component/utils"
import PaginationPager from "../../../../../component/pagination";
import walleticon from "../../../../../assets/Ingame/transaction history title tab.png"
import Swal from "sweetalert2";
const PlayerTransactionHistory = () => {
    const [history, sethistory] = useState([]),
    [page, setPage] = useState(1),
    [total, setTotal] = useState(0);
      
      useEffect(() => {
        let totalPages = Math.floor(history.length / 10);
        if (history.length % 10 > 0) totalPages += 1;
        setTotal(totalPages);
      }, [history])

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API_URL}gamewallet/findtransactionhistory`, {
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

    const filtertransaction = (e) => {
      const str = e.target.value
      if(str !== 'All'){
        fetch(`${process.env.REACT_APP_API_URL}gamewallet/filtertransaction`, {
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
        fetch(`${process.env.REACT_APP_API_URL}gamewallet/findtransactionhistory`, {
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
            <div class="select-container">
            <MDBIcon fas icon="filter" fixed/> &nbsp;
                <select name="filter" onChange={filtertransaction}>
                    <option value="All">All</option>
                    <option value="Tools">Tools</option>
                    <option value="Clock">Clock</option>
                    <option value="Subscription">Subscription</option>
                    <option value="Cosmetics">Cosmetics</option>
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
                            {item.type}
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

export default PlayerTransactionHistory;