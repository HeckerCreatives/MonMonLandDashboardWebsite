import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import PaginationPager from "../../../../../../component/pagination";

const WithdrawTokenHistory = ({username}) => {
    const [withdrawhistory, setWithdrawHistory] = useState([]),
    [isloading, setIsLoading] = useState(false),
    [page, setPage] = useState(1),
    [total, setTotal] = useState(0);

    useEffect(() => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}members/memberwithdrawtokenhistory?page=${page-1}`, {
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
                if(data.message == "success"){
                    setIsLoading(false)
                    setWithdrawHistory(data.data)
                    setTotal(data.pages)
                }
          })
    },[page])

    return (
        <MDBContainer>
            <MDBTable small responsive className="text-mute mt-5 mb-0">
                <MDBTableHead>
                    <tr className="text-center">
                    <th className="fw-bold" scope='col'>Txn Hash</th>
                    <th className="fw-bold" scope='col'>Token Name</th>
                    <th className="fw-bold" scope='col'>Date</th>
                    <th className="fw-bold" scope='col'>Quantity</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="fw-bold text-center">
                { withdrawhistory.length !== 0 ?
                    withdrawhistory.map((data,i) => {
                        return(
                        <tr key={`request-${i}`}>
                            
                            <td>{data.mmthash ? data.mmthash : data.hash}</td>
                            <td>{data.type == "MMT" ? "Monster Monies Token" : "Monster Coin Token"}</td>
                            <td>{new Date(data.claimedAt).toLocaleString()}</td>
                            <td>
                            {data.amount}
                            </td>
                        </tr>
                        )
                })
                :
                    <tr>
                        <td colSpan={4}>
                            No Data
                        </td>
                    </tr>
                }
                    
                </MDBTableBody>
            </MDBTable>
            <PaginationPager
                total={total} 
                page={page} 
                setPage={setPage}
                isloading={isloading}
            />
        </MDBContainer>
    )
}

export default WithdrawTokenHistory;