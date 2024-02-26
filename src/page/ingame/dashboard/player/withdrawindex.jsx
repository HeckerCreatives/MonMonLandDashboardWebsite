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
                    <MDBCard style={{background: "#EDCAB4"}}>
                        <MDBCardBody>
                        <div className="row text-center">
                        <input 
                        type="checkbox" 
                        id="mmt" 
                        value='MMT'
                        checked={tokenselected == "MMT"} 
                        onChange={(e) => setTokenSelected(e.target.value)}
                        style={{display: "none"}}
                        />

                        <input 
                        type="checkbox" 
                        id="mct" 
                        checked={tokenselected == "MCT"} 
                        value='MCT'
                        onChange={(e) => setTokenSelected(e.target.value)}
                        style={{display: "none"}}
                        />

                        <MDBCol lg={6}>
                        <div className={tokenselected == "MMT" ? `tokenselect my-2 py-2` : "border my-2 py-2"} style={{ borderRadius: "10px"}}>
                        <label htmlFor="mmt" className="d-flex flex-column justify-content-center align-items-center">
                        <img alt="" src={mmticon} style={{height: "65px", width: "65px"}}/>
                        <span>Monster Monies Token</span>
                        </label>
                        </div>
                        </MDBCol>
                        <MDBCol lg={6}>
                        <div className={tokenselected == "MCT" ? `tokenselect my-2 py-2` : "border my-2 py-2"} style={{ borderRadius: "10px"}}>
                        <label htmlFor="mct" className="d-flex flex-column justify-content-center align-items-center">
                        <img alt="" src={mcticon} style={{height: "65px", width: "65px"}}/>
                        <span className="px-2">Monster Coin Token</span>
                        {/* Monster Coin Token */}
                        </label>
                        
                        </div>
                        </MDBCol>
                        </div>

                        <div className="text-center mt-3">
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