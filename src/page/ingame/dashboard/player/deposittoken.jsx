import { 
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead
 } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PaginationPager from "../../../../component/pagination";
import mmticon from "../../../../assets/Ingame/assetsdashboard/Monster Monies icon.png"
import mcticon from "../../../../assets/Ingame/assetsdashboard/MML TOKEN.png"
import { useBalance, useAccount, useSendTransaction, useWriteContract, useWaitForTransactionReceipt  } from 'wagmi'
import { abi,Toast } from "../../../../component/utils"
import { parseEther , parseGwei} from 'viem'
import "./dash.css"
const DepositToken = () => {
    const [tokenselected, setTokenSelected] = useState("MMT")
    const [deposithistory, setDepositHistory] = useState([])
    const [isloading, setIsLoading] = useState(false),
          [page, setPage] = useState(1),
          [total, setTotal] = useState(0);
    const { address } = useAccount();
    const mmtcontract = process.env.REACT_APP_MMTADDRESS
    const mctcontract = process.env.REACT_APP_MCTADDRESS
    const craetorwallet = process.env.REACT_APP_DEVWALLET
    const usermmtbalance = useBalance({
        address: address,
        token: mmtcontract
    })
    const usermctbalance = useBalance({
    address: address,
    token: mctcontract
    })

    const { writeContract } = useWriteContract() 

    const deposittoken = async (e) => {
        // e.preventDefault();
        // const {amount} = e.target
        setIsLoading(true)
        const inputValue = tokenselected == "MMT" ? usermmtbalance.data.formatted : usermctbalance.data.formatted
        const tokencontract = tokenselected == "MMT" ? mmtcontract : mctcontract
        const { value: tokenamount } = await Swal.fire({
            title: "Enter your desired amount to deposit",
            input: "number",
            inputLabel: "Token Amount",
            inputValue,
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return "Please Input Token Amount";
              }
            }
          });
          if (tokenamount) {
            const amountvalue = tokenselected == "MMT" ? parseEther(tokenamount) : parseGwei(tokenamount)
             writeContract({
                abi,
                address: tokencontract,
                functionName: 'transfer',
                args: [
                  craetorwallet,
                  amountvalue,
                ],
            },{
                onSuccess: (transactionData, variables, context) => {
                    console.log('Transaction succeeded:', transactionData);
                    // Do something with the successful transaction data
                    fetch(`${process.env.REACT_APP_API_URL}gamewallet/deposittoken`, {
                        method: "POST",
                        credentials: 'include',
                        headers:{
                          "Content-Type": 'application/json'
                        },
                        body: JSON.stringify({
                            token: tokenselected, 
                            amount: tokenamount, 
                            hash: transactionData, 
                            walletaddress: address, 
                            depositAt: new Date().toLocaleString()
                        })
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
                            Swal.fire({
                              icon: "success",
                              title: "Success",
                              text: "Token Deposit Successfully",
                              allowEscapeKey: false,
                              allowOutsideClick: false
                            }).then(ok => {
                              if(ok.isConfirmed){
                                window.location.reload()
                              }
                            })
                          } else {
                            setIsLoading(false)
                            Swal.fire({
                              icon: "error",
                              title: "Oops..",
                              text: data.data,
                              allowEscapeKey: false,
                              allowOutsideClick: false
                            })
                          }
                    })
                }
            })
          }
        
        
    }

    useEffect(() => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}gamewallet/deposithistory?page=${page-1}`, {
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
                setDepositHistory(data.data)
                setTotal(data.pages)
            }
        })
    },[page])

    return(
        <MDBContainer>
            <MDBRow>
                <MDBCol lg={4} className="offset-lg-4 mt-5">
                    <MDBCard>
                        <MDBCardBody>
                            <div className="text-center">
                                <img src={tokenselected == "MMT" ? mmticon : mcticon} alt="" style={{height: "65px", width: "65px"}}/>
                            </div>
                            <MDBCardText className="mt-2 text-center fw-bold">Select Token to Deposit</MDBCardText>
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
                            
                            {/* <MDBInput
                            className="mt-2" 
                            name="amount" 
                            label="Input amount to be deposit"
                            step="any" 
                            pattern="[0-9]+([.,][0-9]+)?"
                            /> */}
                            <div className="text-end mt-3">
                            <MDBBtn type="button" onClick={deposittoken}>
                                Deposit
                            </MDBBtn>
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
                { deposithistory.length !== 0 ?
                    deposithistory.map((data,i) => {
                        return(
                        <tr key={`request-${i}`}>
                            
                            <td>{data.hash}</td>
                            <td>{data.type == "MMT" ? "Monster Monies Token" : "Monster Coin Token"}</td>
                            <td>{new Date(data.depositAt).toLocaleString()}</td>
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

export default DepositToken;