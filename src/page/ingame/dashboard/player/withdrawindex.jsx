import { 
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBTable,
    MDBTableHead,
    MDBTableBody
} from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import PaginationPager from "../../../../component/pagination";
import mmticon from "../../../../assets/Ingame/assetsdashboard/Monster Monies icon.png"
import mcticon from "../../../../assets/Ingame/assetsdashboard/MML TOKEN.png"
import Swal from "sweetalert2";
import WithdrawToken from "./withdrawtoken";
const WithdrawTokenIndex = () => {
    const [tokenselected, setTokenSelected] = useState("MMT")
    const [withdrawhistory, setWithdrawHistory] = useState([])
    const [isloading, setIsLoading] = useState(false),
          [page, setPage] = useState(1),
          [total, setTotal] = useState(0);
    
        useEffect(() => {
            setIsLoading(true)
            fetch(`${process.env.REACT_APP_API_URL}gamewallet/withdrawhistory?page=${page-1}`, {
                method: "GET",
                credentials: 'include',
                headers:{
                  "Content-Type": 'application/json'
                },
            })
            .then(result => result.json())
            .then(data => {
                if(data.message == "duallogin" || data.message == "banned" || data.message == "Unathorized"){
                    setIsLoading(false)
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
                    setIsLoading(false)
                    setWithdrawHistory(data.data)
                    setTotal(data.pages)
                }
            })
        },[page])

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol lg={4} className="offset-lg-4 mt-5">
                    <MDBCard>
                        <MDBCardBody>
                            <div className="text-center">
                                <img src={tokenselected == "MMT" ? mmticon : mcticon} alt="" style={{height: "65px", width: "65px"}}/>
                            </div>
                            <MDBCardText className="mt-2 text-center fw-bold">Select Token to Withdraw</MDBCardText>
                            <div className="mt-2 text-center">
                            <select id="tokentype" name="tokentype" required 
                            onChange={(e) => setTokenSelected(e.target.value)}
                            > 
                                <option selected value="MMT">
                                MMT
                                </option>

                                <option value="MCT">
                                MCT
                                </option>
                            </select>
                            </div>
                            <div className="text-end mt-3">
                            <WithdrawToken tokenselected={tokenselected}/>
                            </div>    
                           
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>

            <MDBTable align="middle" responsive className="mt-5 text-center">
                <MDBTableHead style={{background: "#EDCAB4"}}>
                    <tr>
                    <th scope='col'>Txn Hash</th>
                    <th scope='col'>Token Name</th>
                    <th scope='col'>Deposit Date</th>
                    <th scope='col'>Quantity</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="">
                { withdrawhistory.length !== 0 ?
                    withdrawhistory.map((data,i) => {
                        return(
                        <tr key={`request-${i}`}>
                            
                            <td>{data.hash}</td>
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
                        <td colSpan={5}>
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

export default WithdrawTokenIndex;