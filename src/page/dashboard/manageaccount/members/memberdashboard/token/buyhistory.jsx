import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import PaginationPager from "../../../../../../component/pagination";

const BuyTokenHistory = ({username}) => {
    const [buyhistory, setBuyHistory] = useState([]),
    [isloading, setIsLoading] = useState(false),
    [page, setPage] = useState(1),
    [total, setTotal] = useState(0);

    useEffect(() => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}members/memberbuytokenhistory?page=${page-1}`, {
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
                    setBuyHistory(data.data)
                    setTotal(data.pages)
                }
          })
    },[page])

    return (
        <MDBContainer>
        <MDBTable small responsive className="text-mute mt-5 mb-0">
         <MDBTableHead>
              <tr className="text-center">
              <th className="fw-bold" scope='col'>ID</th>
              <th className="fw-bold" scope='col'>Token Name</th>
              <th className="fw-bold" scope='col'>Date</th>
              <th className="fw-bold" scope='col'>Amount</th>
              <th className="fw-bold" scope='col'>Token</th>
              </tr>
          </MDBTableHead>
          <MDBTableBody className="fw-bold text-center">
              { buyhistory.length !== 0 ?
                buyhistory?.map((item, i) => (
                  <tr key={i} className="text-center">
                      <td>
                        {item.id}
                      </td>
                      <td>{item.type == "MMT" ? "Monster Monies Token" : "Monster Coin Token"}</td>
                      <td>{new Date(item.createdAt).toLocaleString()}</td> 
                      <td>
                            {
                              item.transactiontype == "walletbalance" ? 
                              `$${item.amount.toLocaleString('en-US', {
                              style: 'decimal',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                              })} (WB)` : item.transactiontype == "monstergem" ? `$${item.amount.toLocaleString('en-US', {
                              style: 'decimal',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                              })} (MG)` : item.transactiontype == "bnb" ? `$${item.amount.toLocaleString('en-US', {
                              style: 'decimal',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                              })} (BNB)` : item.transactiontype == "usdt" ? `$${item.amount.toLocaleString('en-US', {
                              style: 'decimal',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                              })} (USDT)`: item.transactiontype == "busd" ? `$${item.amount.toLocaleString('en-US', {
                              style: 'decimal',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                              })} (BUSD)`: item.transactiontype == null || item.transactiontype == undefined ? `$${item.amount}` : 0
                            }
                            </td>
                            <td>{item.tokenreceive.toLocaleString('en-US', {
                            style: 'decimal',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                            })}</td>
                  </tr>
                  ))
                :
                <tr>
                    <td colSpan={5}>No Data</td>
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

export default BuyTokenHistory;