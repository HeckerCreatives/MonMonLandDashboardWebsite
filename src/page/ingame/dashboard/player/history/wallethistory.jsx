import React, {useState, useEffect} from "react";
import 
{   MDBContainer, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
    MDBTypography,
    MDBIcon} 
from "mdb-react-ui-kit";
import { handlePagination } from "../../../../../component/utils";
import PaginationPager from "../../../../../component/pagination";
const PlayerWalletHistory = () => {
    const [wallethistory, setWalletHistory] = useState([]),
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
          if(data.message === "success"){
            setWalletHistory(data.data)
          }
        })
    },[])
    
return(
    <>
    <MDBContainer>
    <div className="text-center my-3">
        <MDBTypography tag={'h1'}>Wallet History</MDBTypography>
    </div>
    <div class="select-container">
        <MDBIcon fas icon="filter" fixed/> &nbsp;
        <select name="filter" >
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
                {wallethistory.length !== 0 ?
                    handlePagination(wallethistory, page, 10)?.map((item,i) =>(
                        <tr key={i}>
                            <td>
                            {new Date(item.createdAt).toLocaleString()}
                            </td>
                            <td>
                            {item.amount.toFixed(2)}
                            </td>
                            <td>
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
    </MDBContainer>
      </>
)
}

export default PlayerWalletHistory;