import React, {useState, useEffect} from "react";
import 
{   MDBContainer, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
    MDBTypography,
    MDBIcon,
    MDBCard,
    MDBCardBody} 
from "mdb-react-ui-kit";
import { handlePagination } from "../../../../../component/utils";
import PaginationPager from "../../../../../component/pagination";
import walleticon from "../../../../../assets/Ingame/wallethistory.png"
import Swal from "sweetalert2";
const PlayerWalletHistory = () => {
    const [wallethistory, setWalletHistory] = useState([]),
    [backup, setBackup] = useState([]),
    [page, setPage] = useState(1),
    [total, setTotal] = useState(0);
      
    useEffect(() => {
        let totalPages = Math.floor(wallethistory.length / 10);
        if (wallethistory.length % 10 > 0) totalPages += 1;
        setTotal(totalPages);
    },[wallethistory])
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}gamewallet/findwallethistory`,{
            credentials: 'include',
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

          if(data.message === "success"){
            setWalletHistory(data.data)
            setBackup(data.data)
          }
        })
    },[])

    const filterwallet = (e) => {
        const str = e.target.value
        if(str !== 'All'){
          fetch(`${process.env.REACT_APP_API_URL}gamewallet/filterwallet`, {
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
            
            setWalletHistory(data.data)
          })
        } else {
            setWalletHistory(backup)
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
    <div class="col-md-4">
        <MDBIcon fas icon="filter" fixed/> &nbsp;
        <select 
        name="filter" 
        onChange={filterwallet}
        style={{width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}
        >
            <option value="All">All</option>
            <option value="Monster Gem Farm Convert">Monster Gem Farm Convert</option>
            <option value="Monster Gem Unilevel Convert">Monster Gem Unilevel Convert</option>
            <option value="Monster Coin Convert">Monster Coin Convert</option>
            <option value="Leaderboards Convert">Leaderboards Convert</option>
            <option value="Clocks Unilevel">Clocks Unilevel</option>
            <option value="Tools Unilevel">Tools Unilevel</option>
            <option value="Missed Clocks Unilevel">Missed Clocks Unilevel</option>
            <option value="Missed Tools Unilevel">Missed Tools Unilevel</option>
            <option value="Missed Monster Gem Farm Convert">Missed Monster Gem Farm Convert</option>
            <option value="Missed Monster Gem Unilevel Convert">Missed Monster Gem Unilevel Convert</option>
            <option value="Missed Monster Coin Convert">Missed Monster Coin Convert</option>
            <option value="Topup Balance">Topup Balance</option>
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
                {wallethistory.length !== 0 ?
                    handlePagination(wallethistory, page, 10)?.map((item,i) =>(
                        <tr key={i}>
                            <td>
                            {new Date(item.createdAt).toLocaleString()}
                            </td>
                            <td>
                            {item.amount.toFixed(2)}
                            </td>
                            <td style={item.description.includes('Missed') ? { color: 'red'} : {}}>
                             {item.description}
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
            <PaginationPager
              total={total} page={page} setPage={setPage}
            />
        </MDBCardBody>
    </MDBCard>
   
    </MDBContainer>
      </>
)
}

export default PlayerWalletHistory;