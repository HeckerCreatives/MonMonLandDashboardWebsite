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
import { abi, isgamelogin } from "../../../../component/utils"
import { parseEther , parseGwei} from 'viem'
import "./dash.css"

const DepositToken = () => {
    const [tokenselected, setTokenSelected] = useState("MMT")
    const [deposithistory, setDepositHistory] = useState([])
    const [isloading, setIsLoading] = useState(false),
          [page, setPage] = useState(1),
          [total, setTotal] = useState(0);
    const { address } = useAccount();
    const [dbwallet, setDbWallet] = useState('')
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

    const { writeContract,  isError, } = useWriteContract() 

    useEffect(()=> {
      isgamelogin()
      .then(data => {
        setDbWallet(data.walletaddress)
      })

      if(isError){
        Swal.fire({
          icon: "error",
          title: "Warning",
          text: "Please Enter Valid Amount"
        })
      }
    },[isError])


    

    const deposittoken = async (e) => {
        // e.preventDefault();
        // const {amount} = e.target
        setIsLoading(true)

        if(dbwallet != address){
          setIsLoading(false)
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Attention: The wallet address you're using now does not match your wallet address in your account"
          })
          return
        }

        if(dbwallet == undefined){
          setIsLoading(false)
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Attention: Please connect your account to your wallet address first"
          })
          return
        }

        const inputValue = tokenselected == "MMT" ? usermmtbalance?.data?.formatted : usermctbalance?.data?.formatted
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
            // const amountvalue = tokenselected == "MMT" ? parseEther(tokenamount) : parseGwei(tokenamount)
             writeContract({
                abi,
                address: tokencontract,
                functionName: 'transfer',
                args: [
                  craetorwallet,
                  parseEther(tokenamount),
                ],
            },{
                onSettled: (data, error) => {
                  if(data && error == null){
                    fetch(`${process.env.REACT_APP_API_URL}gamewallet/deposittoken`, {
                      method: "POST",
                      credentials: 'include',
                      headers:{
                        "Content-Type": 'application/json'
                      },
                      body: JSON.stringify({
                          token: tokenselected, 
                          amount: tokenamount, 
                          hash: data, 
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
                  } else if (error){
                    setIsLoading(false)
                    Swal({
                      icon: "info",
                      title: "Warning",
                      text: error.message.includes("User denied") ? "You rejected the transaction" : error.message
                    })

                  } else {
                    setIsLoading(false)
                    Swal({
                      icon: "info",
                      title: "Warning",
                      text: "Please Try Again Later"
                    })
                  }
                },
                
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
                            <div className="text-center mt-3" >
                            <MDBBtn size="sm" type="button" onClick={deposittoken}>
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