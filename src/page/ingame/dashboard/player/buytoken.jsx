import { 
    MDBContainer,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBBtn,
    MDBSpinner,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBInput, 
    MDBProgress, 
    MDBProgressBar,
    MDBInputGroup,
    MDBCheckbox,
    MDBRadio,
    MDBBtnGroup,
 } from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import Swal from "sweetalert2";
import PaginationPager from "../../../../component/pagination";
import mmticon from "../../../../assets/Ingame/assetsdashboard/Monster Monies icon.png"
import mcticon from "../../../../assets/Ingame/assetsdashboard/MML TOKEN.png"
import FlipCountdown from '@rumess/react-flip-countdown';
import { useBalance, useAccount, useSendTransaction, useWriteContract, useWaitForTransactionReceipt  } from 'wagmi'
import { parseEther , parseGwei} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { bscTestnet } from 'wagmi/chains' 
import { abi,Toast } from "../../../../component/utils"
import { SendTransactionReturnType, getTransactionReceipt } from '@wagmi/core'
import Web3 from "web3";
import { abort } from "process";
const BuyToken = () => {
    const { address } = useAccount();
    const usdtcontract = "0xdac17f958d2ee523a2206206994597c13d831ec7"
    const busdcontract = "0x4fabb145d64652a948d72533023f6e7a623c7c53"

    const userbnbbalance = useBalance({
      address: address,
    })
    const userusdtbalance = useBalance({
      address: address,
      token: "0x9BF873Cb0f017C492498B35071465FC7D210b13B"
    })
    const userbusdbalance = useBalance({
      address: address,
      token: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    })
    const [bnbpricetoday, setBnbPriceToday] = useState(0)
    const [usdtpricetoday, setUsdtPriceToday] = useState(0)
    const [busdpricetoday, setBusdPriceToday] = useState(0)

    const [tokenselected, setTokenSelected] = useState("MMT")
    const [soldmmt, setSoldMmt] = useState(0);
    const [soldmct, setSoldMct] = useState(0);
    const [balance, setBalance] = useState(0);
    const [amawnt, setAmawnt] = useState(0);
    const [tokenhistory, setTokenHistory] = useState([]);
    const [isloading, setIsLoading] = useState(false),
          [checkedItems, setCheckedItems] = useState("walletbalance"),
          [page, setPage] = useState(1),
          [total, setTotal] = useState(0);
    const { sendTransaction, data: hash} = useSendTransaction()
    
    const { writeContract } = useWriteContract() 
    const userWallet = address;
    const craetorwallet = process.env.REACT_APP_DEVWALLET
    const mmtconversion = 200;
    const mctconversion = 2000;
    
    const handleCheckboxChange = (itemId) => {
      setCheckedItems(itemId.target.value)
    };


    useEffect(() => {
        fetch("https://api.diadata.org/v1/quotation/BNB")
        .then(result => result.json())
        .then(data => {
          setBnbPriceToday(data.Price)
        })
        fetch("https://api.diadata.org/v1/quotation/USDT")
        .then(result => result.json())
        .then(data => {
          setUsdtPriceToday(data.Price)
        })
        fetch("https://api.diadata.org/v1/quotation/BUSD")
        .then(result => result.json())
        .then(data => {
          setBusdPriceToday(data.Price)
        })
    },[])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}gamewallet/find`, {
            method: "GET",
            credentials: 'include',
            headers:{
              "Content-Type": 'application/json'
            }
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
              setBalance(data.data.balance)
              
            }
               
          })

          fetch(`${process.env.REACT_APP_API_URL}gamewallet/tokenbuyhistory?page=${page-1}`, {
            method: "GET",
            credentials: 'include',
            headers:{
              "Content-Type": 'application/json'
            }
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
              setTokenHistory(data.data)
              setTotal(data.pages)
            }
               
          })
    },[page])

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}gamewallet/totaltoken`, {
        method: "GET",
        credentials: 'include',
        headers:{
          "Content-Type": 'application/json'
        }
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

        setSoldMmt(data.data)
        setSoldMct(data.data2)
      })

    },[])

    const price = usdtpricetoday / bnbpricetoday
    // console.log((amawnt / price)  * mmtconversion)
    // console.log(amawnt * bnbpricetoday)

    let amountconversion = 0;
    if(checkedItems == "walletbalance" || checkedItems == "monstergem"){
      if(tokenselected == "MMT"){
        amountconversion = amawnt * mmtconversion
      } else if (tokenselected == "MCT"){
        amountconversion = amawnt * mctconversion
      }
    } else if (checkedItems == "usdt"){
      if(tokenselected == "MMT"){
        amountconversion = (amawnt / usdtpricetoday) * mmtconversion
      } else if (tokenselected == "MCT"){
        amountconversion = (amawnt / usdtpricetoday) * mctconversion
      }
    } else if (checkedItems == "busd"){
      if(tokenselected == "MMT"){
        amountconversion = (amawnt / busdpricetoday) * mmtconversion
      } else if (tokenselected == "MCT"){
        amountconversion = (amawnt / busdpricetoday) * mctconversion
      }
    } else if(checkedItems == "bnb"){
      if(tokenselected == "MMT"){
        amountconversion = (amawnt / price) * mmtconversion
      } else if (tokenselected == "MCT"){
        amountconversion = (amawnt / price) * mctconversion
      }
    }

    const buymmtoken = async () => {
      return await fetch(`${process.env.REACT_APP_API_URL}gamewallet/buymmt`, {
        method: "POST",
        credentials: 'include',
        headers:{
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          amount: amawnt * bnbpricetoday,
          tokenreceive: amountconversion,
          transactiontype: checkedItems
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
          return
        }

        if(data.message === "success"){
          setIsLoading(false)
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Buy Token Successfully",
            allowEscapeKey: false,
            allowOutsideClick: false
          }).then(ok => {
            if(ok.isConfirmed){
              window.location.reload()
            }
          })
          return
        } else {
          setIsLoading(false)
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: data.data,
            allowEscapeKey: false,
            allowOutsideClick: false
          })
          return
        }

      })
    }

    const buymctoken = async () => {
      return await fetch(`${process.env.REACT_APP_API_URL}gamewallet/buymmc`, {
        method: "POST",
        credentials: 'include',
        headers:{
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          amount: amawnt * bnbpricetoday,
          tokenreceive: amountconversion,
          transactiontype: checkedItems
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
          return
        }

        if(data.message === "success"){
          setIsLoading(false)
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Buy Token Successfully",
            allowEscapeKey: false,
            allowOutsideClick: false
          }).then(ok => {
            if(ok.isConfirmed){
              window.location.reload()
            }
          })
          return
        } else {
          setIsLoading(false)
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: data.data,
            allowEscapeKey: false,
            allowOutsideClick: false
          })
          return
        }

      })
    }

    const buyToken = async (e) => {
      e.preventDefault();

      const { tokentype, amount } = e.target
      setIsLoading(true)
      
      if(checkedItems !== "walletbalance" && checkedItems !== "monstergem" && checkedItems !== "bnb" && checkedItems !== "usdt" && checkedItems !== "busd"){
        setIsLoading(false)
        Swal.fire({
          icon: "info",
          title: "Coming Soon",
          text: "This feature is coming soon"
        })
      } else {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes!"
        }).then(async (result) => {
          if (result.isConfirmed) {
            if(tokentype.value == "MMT" && checkedItems == "walletbalance" || checkedItems == "monstergem"){
              fetch(`${process.env.REACT_APP_API_URL}gamewallet/buymmt`, {
                method: "POST",
                credentials: 'include',
                headers:{
                  "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                  amount: amount.value,
                  tokenreceive: amount.value * mmtconversion,
                  transactiontype: checkedItems
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
                    text: "Buy Token Successfully",
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
            } else if (tokentype.value == "MCT" && checkedItems == "walletbalance" || checkedItems == "monstergem"){
              fetch(`${process.env.REACT_APP_API_URL}gamewallet/buymmc`, {
                method: "POST",
                credentials: 'include',
                headers:{
                  "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                  amount: amount.value,
                  tokenreceive: amount.value * mctconversion,
                  transactiontype: checkedItems
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
                    text: "Buy Token Successfully",
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
            } else if (tokentype.value == "MMT" && checkedItems == "bnb"){
              if(userbnbbalance > amount.value){
                await sendTransaction({
                  to: craetorwallet,
                  value: parseEther(amount.value)
                },{
                  onSuccess: (transactionData, variables, context) => {
                    console.log('Transaction succeeded:', transactionData);
                    // Do something with the successful transaction data
                    buymmtoken()
                  }
                })

                
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Not Enough Balance Please check your wallet balance"
                })
              }
            } else if (tokentype.value == "MCT" && checkedItems == "bnb"){
              if(userbnbbalance > amount.value){
                sendTransaction({
                  to: craetorwallet,
                  value: parseEther(amount.value)
                },{
                  onSuccess: (transactionData, variables, context) => {
                    console.log('Transaction succeeded:', transactionData);
                    // Do something with the successful transaction data
                    buymctoken()
                  }
                })

              } else {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Not Enough Balance Please check your wallet balance"
                })
              }
            } else if (tokentype.value == "MMT" && checkedItems == "usdt"){
              if(userusdtbalance > amount.value){
                
                writeContract({
                  abi,
                  address: usdtcontract,
                  functionName: 'transfer',
                  args: [
                    craetorwallet,
                    parseGwei(amount.value),
                  ],
                },{
                  onSettled: (data, error) => {
                    if(data && error == null){
                      fetch(`${process.env.REACT_APP_API_URL}gamewallet/buymmt`, {
                        method: "POST",
                        credentials: 'include',
                        headers:{
                          "Content-Type": 'application/json'
                        },
                        body: JSON.stringify({
                          amount: amawnt,
                          tokenreceive: amountconversion,
                          transactiontype: checkedItems
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
                          return
                        }
                
                        if(data.message === "success"){
                          setIsLoading(false)
                          Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Buy Token Successfully",
                            allowEscapeKey: false,
                            allowOutsideClick: false
                          }).then(ok => {
                            if(ok.isConfirmed){
                              window.location.reload()
                            }
                          })
                          return
                        } else {
                          setIsLoading(false)
                          Swal.fire({
                            icon: "error",
                            title: "Oops..",
                            text: data.data,
                            allowEscapeKey: false,
                            allowOutsideClick: false
                          })
                          return
                        }
                
                      })
                    } else if (error){

                      Swal({
                        icon: "info",
                        title: "Warning",
                        text: error.message.includes("User denied") ? "You rejected the transaction" : error.message
                      })

                    } else {
                      Swal({
                        icon: "info",
                        title: "Warning",
                        text: "Please Try Again Later"
                      })
                    }
                  }
                })
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Not Enough Balance Please check your wallet balance"
                })
              }
            } else if (tokentype.value == "MCT" && checkedItems == "usdt"){
              if(userusdtbalance > amount.value){
                
                writeContract({
                  abi,
                  address: usdtcontract,
                  functionName: 'transfer',
                  args: [
                    craetorwallet,
                    parseGwei(amount.value),
                  ],
                },{
                  
                  onSettled: (data, error) => {
                    if(data && error == null){
                      fetch(`${process.env.REACT_APP_API_URL}gamewallet/buymmc`, {
                        method: "POST",
                        credentials: 'include',
                        headers:{
                          "Content-Type": 'application/json'
                        },
                        body: JSON.stringify({
                          amount: amawnt,
                          tokenreceive: amountconversion,
                          transactiontype: checkedItems
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
                          return
                        }
                
                        if(data.message === "success"){
                          setIsLoading(false)
                          Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Buy Token Successfully",
                            allowEscapeKey: false,
                            allowOutsideClick: false
                          }).then(ok => {
                            if(ok.isConfirmed){
                              window.location.reload()
                            }
                          })
                          return
                        } else {
                          setIsLoading(false)
                          Swal.fire({
                            icon: "error",
                            title: "Oops..",
                            text: data.data,
                            allowEscapeKey: false,
                            allowOutsideClick: false
                          })
                          return
                        }
                
                      })
                    } else if (error){

                      Swal({
                        icon: "info",
                        title: "Warning",
                        text: error.message.includes("User denied") ? "You rejected the transaction" : error.message
                      })

                    } else {
                      Swal({
                        icon: "info",
                        title: "Warning",
                        text: "Please Try Again Later"
                      })
                    }
                  }
                })
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Not Enough Balance Please check your wallet balance"
                })
              }
            } else if (tokentype.value == "MMT" && checkedItems == "busd"){
              if(userusdtbalance > amount.value){
                
                writeContract({
                  abi,
                  address: busdcontract,
                  functionName: 'transfer',
                  args: [
                    craetorwallet,
                    parseGwei(amount.value),
                  ],
                },{
                  onSettled: (data, error) => {
                    if(data && error == null){
                      fetch(`${process.env.REACT_APP_API_URL}gamewallet/buymmt`, {
                        method: "POST",
                        credentials: 'include',
                        headers:{
                          "Content-Type": 'application/json'
                        },
                        body: JSON.stringify({
                          amount: amawnt,
                          tokenreceive: amountconversion,
                          transactiontype: checkedItems
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
                          return
                        }
                
                        if(data.message === "success"){
                          setIsLoading(false)
                          Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Buy Token Successfully",
                            allowEscapeKey: false,
                            allowOutsideClick: false
                          }).then(ok => {
                            if(ok.isConfirmed){
                              window.location.reload()
                            }
                          })
                          return
                        } else {
                          setIsLoading(false)
                          Swal.fire({
                            icon: "error",
                            title: "Oops..",
                            text: data.data,
                            allowEscapeKey: false,
                            allowOutsideClick: false
                          })
                          return
                        }
                
                      })
                    } else if (error){

                      Swal({
                        icon: "info",
                        title: "Warning",
                        text: error.message.includes("User denied") ? "You rejected the transaction" : error.message
                      })

                    } else {
                      Swal({
                        icon: "info",
                        title: "Warning",
                        text: "Please Try Again Later"
                      })
                    }
                  }
                })
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Not Enough Balance Please check your wallet balance"
                })
              }
            } else if (tokentype.value == "MCT" && checkedItems == "busd"){
              if(userusdtbalance > amount.value){
                
                writeContract({
                  abi,
                  address: busdcontract,
                  functionName: 'transfer',
                  args: [
                    craetorwallet,
                    parseGwei(amount.value),
                  ],
                },{

                  onSettled: (data, error) => {
                    if(data && error == null){
                      fetch(`${process.env.REACT_APP_API_URL}gamewallet/buymmc`, {
                        method: "POST",
                        credentials: 'include',
                        headers:{
                          "Content-Type": 'application/json'
                        },
                        body: JSON.stringify({
                          amount: amawnt,
                          tokenreceive: amountconversion,
                          transactiontype: checkedItems
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
                          return
                        }
                
                        if(data.message === "success"){
                          setIsLoading(false)
                          Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Buy Token Successfully",
                            allowEscapeKey: false,
                            allowOutsideClick: false
                          }).then(ok => {
                            if(ok.isConfirmed){
                              window.location.reload()
                            }
                          })
                          return
                        } else {
                          setIsLoading(false)
                          Swal.fire({
                            icon: "error",
                            title: "Oops..",
                            text: data.data,
                            allowEscapeKey: false,
                            allowOutsideClick: false
                          })
                          return
                        }
                
                      })
                    } else if (error){

                      Swal({
                        icon: "info",
                        title: "Warning",
                        text: error.message.includes("User denied") ? "You rejected the transaction" : error.message
                      })

                    } else {
                      Swal({
                        icon: "info",
                        title: "Warning",
                        text: "Please Try Again Later"
                      })
                    }
                  }
                })
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Not Enough Balance Please check your wallet balance"
                })
              }
            }
             else {
              setIsLoading(false)
            }
          } else {
            setIsLoading(false)
          }
        });
      }

      

      
      
    }

    const mmtseedsale = soldmmt < 10000000 ? (soldmmt / 10000000) * 60 : soldmmt >= 10000000 ? 60 : 0
    const mmtprivatesale = soldmmt > 10000000 && soldmmt < 15000000 ? ((soldmmt - 10000000) / 5000000) * 20 : soldmmt >= 15000000 ? 20 : 0
    const mmtpublicsale = soldmmt > 15000000 && soldmmt < 20000000 ? ((soldmmt - 15000000) / 5000000) * 20 : soldmmt >= 20000000 ? 20 : 0
    
    const mctstratsale = soldmct < 50000000 ? (soldmct / 50000000) * 100 : soldmct >= 50000000 ? 100 : 0

    

    return (
        <MDBContainer fluid>
        <MDBRow>
          <MDBCol lg={5} className="offset-lg-1 mt-5">
          <MDBCard>
            <MDBCardBody>
              <div className="text-center border py-3" style={{background: "#EDCAB4", borderRadius: "10px"}}>
                <h2>Pre Sale Ending In</h2>
                <FlipCountdown
                endAtZero
                hideYear
                // hideMonth
                // hideDay
                size='small'
                endAt={"2024-06-01"} // Date/Time // jun 1 2024
                onTimeUp={() => console.log("ew")}/>
              </div>

              <div className="text-center  my-2">
              {
                tokenselected == "MMT" &&
                <p>Total Sold: {soldmmt.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })} / 20,000,000</p>
              }
              {

                tokenselected == "MCT" &&

                <p>Total Sold: {soldmct.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })} / 50,000,000</p>
              }
              {
                tokenselected == "" &&
                <p>Total Sold: {soldmmt.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })} / 20,000,000</p>
              }

              
              </div>

              <div className="my-2">
              {
                tokenselected == "MMT" &&
              <MDBProgress  height='20' tag={'div'} style={{borderRadius: "10px"}}>
                <MDBProgressBar  width={mmtseedsale}  valuemin={0} valuemax={100}></MDBProgressBar>
                <MDBProgressBar bgColor='success' width={mmtprivatesale} valuemin={0} valuemax={100}></MDBProgressBar>
                <MDBProgressBar bgColor='info' width={mmtpublicsale} valuemin={0} valuemax={100}></MDBProgressBar>
              </MDBProgress>
              }
              {
                tokenselected == "" &&
              <MDBProgress  height='20' tag={'div'} style={{borderRadius: "10px"}}>
                <MDBProgressBar  width={mmtseedsale}  valuemin={0} valuemax={100}></MDBProgressBar>
                <MDBProgressBar bgColor='success' width={mmtprivatesale} valuemin={0} valuemax={100}></MDBProgressBar>
                <MDBProgressBar bgColor='info' width={mmtpublicsale} valuemin={0} valuemax={100}></MDBProgressBar>
              </MDBProgress>
              }
              {
                tokenselected == "MCT" &&
              <MDBProgress  height='20' tag={'div'} style={{borderRadius: "10px"}}>
                <MDBProgressBar bgColor='warning' width={mctstratsale} valuemin={0} valuemax={100}></MDBProgressBar>
              </MDBProgress>
              }
              
              
              </div>

              <div className="row text-center my-2">
              {
                tokenselected == "MMT" &&
              <p>$1 = 200 MMT</p>
              }
              {

                tokenselected == "MCT" &&

                <p>$1 = 2000 MCT</p>
              }
              {
                tokenselected == "" &&
                <p> $1 = 200 MMT</p>
              }
              </div>
              <form onSubmit={buyToken}>
              <div className=" row text-center mb-4">
              <MDBBtnGroup shadow='0'>
                <MDBCheckbox
                // defaultChecked={checkedItems == "walletbalance"}
                className="mx-2"  
                checked={checkedItems == "walletbalance"} 
                
                value='walletbalance' 
                label='Wallet Balance'
                onChange={handleCheckboxChange}
                />
                
                 <MDBCheckbox
                className="mx-2"  
                checked={checkedItems == "monstergem"} 
                
                value='monstergem' 
                label='Monster Gem' 
                onChange={handleCheckboxChange}
                />
                <MDBCheckbox
                className="mx-2"  
                checked={checkedItems == "bnb"} 
                
                value='bnb' 
                label='BNB'
                onChange={handleCheckboxChange}
                />

                <MDBCheckbox
                className="mx-2"  
                checked={checkedItems == "usdt"} 
                
                value='usdt' 
                label='USDT'
                onChange={handleCheckboxChange}
                />

                <MDBCheckbox
                className="mx-2"  
                checked={checkedItems == "busd"} 
                
                value='busd' 
                label='BUSD'
                onChange={handleCheckboxChange}
                />
               
                
              </MDBBtnGroup>
              </div>

              
              <div className="row ">
              <div className="col-6">
              <MDBInput 
              name="amount" type="number" 
              label='Input Amount' 
              // min={'10'} max={'999'}
              maxLength={'3'}
              step="any" 
              pattern="[0-9]+([.,][0-9]+)?"
              required
              onChange={(e) => setAmawnt(e.target.value)}
              />
              </div>

              <div className="col-6">

              <MDBInputGroup>
              <MDBInput 
              type="number" 
              label='Amount to Receive' 
              step="any" 
              pattern="[0-9]+([.,][0-9]+)?"
              value={amountconversion}
              disabled
              />
              <select id="tokentype" name="tokentype" required onChange={(e) => setTokenSelected(e.target.value)}> 
                
                <option selected value="MMT">
                <img alt="" src={mmticon}/>
                MMT
                </option>

                <option value="MCT" style={{backgroundImage: mcticon, height: "35px"}}>
                MCT
                </option>
              </select> 
              </MDBInputGroup>
              
              </div>

              </div>
              <div className="my-2 text-center">
              <MDBBtn type="submit" className="mt-3" disabled={isloading}>
              {isloading ? <MDBSpinner grow size="sm"/> : "Buy"}
              </MDBBtn>
              </div>
              </form>
            </MDBCardBody>
          </MDBCard>
          </MDBCol>
          {
            tokenselected == "MMT" || tokenselected == "" ?
            <MDBCol lg={5} className="mt-5">
          <MDBCard>
            <MDBCardBody>
              <div className="text-center border py-3" style={{background: "#EDCAB4", borderRadius: "10px"}}>
                <h4>Monster Monies Token Official Contract Address</h4>
                <p>0x8162e18648de9D1856bc2192d3A09bb1430e2425</p>
              </div>
              <MDBTable align="middle" responsive className="mt-3 text-center">
                <MDBTableBody className="">
                    <tr>
                        <th className="text-start">
                            Blockchain
                        </th>
                        <td>
                            Binance Smart Chain (BEP-20)
                        </td>
                    </tr>
                    <tr>
                        <th className="text-start">
                            Token Name
                        </th>
                        <td>
                            Monster Monies Token
                        </td>
                    </tr>
                    <tr>
                        <th className="text-start">
                            Pre-Sell Supply
                        </th>
                        <td>
                            20 million
                        </td>
                    </tr>
                    <tr>
                        <th className="text-start">
                            Your Wallet Address
                        </th>
                        <td>
                          {address ? address : "Please connect your wallet"}
                        </td>
                    </tr>
                    <tr>
                        <th className="text-start">
                            Your BNB Balance
                        </th>
                        <td>
                            {address ? userbnbbalance.data?.formatted : "Please connect your wallet"}
                        </td>
                    </tr>
                </MDBTableBody>
            </MDBTable>
              
            </MDBCardBody>
          </MDBCard>
          </MDBCol>
            :
            <MDBCol lg={5} className="mt-5">
          <MDBCard>
            <MDBCardBody>
              <div className="text-center border py-3" style={{background: "#EDCAB4", borderRadius: "10px"}}>
                <h4>Monster Coin Token Official Contract Address</h4>
                <p>0x8162e18648de9D1856bc2192d3A09bb1430e2425</p>
              </div>
              <MDBTable align="middle" responsive className="mt-3 text-center">
                <MDBTableBody className="">
                    <tr>
                        <th className="text-start">
                            Blockchain
                        </th>
                        <td>
                            Binance Smart Chain (BEP-20)
                        </td>
                    </tr>
                    <tr>
                        <th className="text-start">
                            Token Name
                        </th>
                        <td>
                            Monster Coin Token
                        </td>
                    </tr>
                    <tr>
                        <th className="text-start">
                            Pre-Sell Supply
                        </th>
                        <td>
                            20 million
                        </td>
                    </tr>
                    <tr>
                        <th className="text-start">
                            Your Wallet Address
                        </th>
                        <td>
                          {address ? address : "Please connect your wallet"}
                        </td>
                    </tr>
                    <tr>
                        <th className="text-start">
                            Your BNB Balance
                        </th>
                        <td>
                            {address ? userbnbbalance.data?.formatted : "Please connect your wallet"}
                        </td>
                    </tr>
                </MDBTableBody>
            </MDBTable>
              
            </MDBCardBody>
          </MDBCard>
          </MDBCol>
          }
          
        </MDBRow>

            {/* <MDBRow>
                <MDBCol lg={4} className="offset-lg-4 mt-5">
                <form onSubmit={buyToken}>
                    <MDBCard>
                    
                        <MDBCardBody>
                        
                        
                            <MDBCardTitle>Buy Token: balance:({balance?.toLocaleString('en-US', {
                            style: 'decimal',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                            })}) </MDBCardTitle>

                            <div className="my-3">
                            <label for="tokentype">Select Token Type:</label>&nbsp;
                            <select id="tokentype" name="tokentype" required> 
                              <option disabled selected value="">Select Token</option>
                              <option value="MCT">Monster Coin Token</option>
                              <option value="MMT">Monster Monies Token</option>
                            </select>
                            </div>


                            <MDBInput 
                            name="amount" type="number" 
                            label='Input Amount' 
                            min={'10'} max={'500'}
                            maxLength={'3'}
                            step="any" 
                            pattern="[0-9]+([.,][0-9]+)?"
                            />
                            <MDBBtn type="submit" className="mt-3" disabled={isloading}>
                            {isloading ? <MDBSpinner grow size="sm"/> : "Buy"}
                            </MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </form>
                </MDBCol>
                <MDBCol lg={4} className="mt-5">
                    Legends
                    <p>MMT : $1 = 200 MMT</p>
                    <p>MCT : $1 = 1000 MCT</p>
                </MDBCol>
            </MDBRow> */}
            <MDBTable align="middle" responsive className="mt-5 text-center">
                <MDBTableHead style={{background: "#EDCAB4"}}>
                    <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Token Name</th>
                    <th scope='col'>Date</th>
                    <th scope='col'>Amount</th>
                    <th scope='col'>Token</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="">
                { tokenhistory.length != 0 ?
                    tokenhistory.map((data,i) => {
                        return(
                        <tr key={`request-${i}`}>
                            
                            <td>{data.id}</td>
                            <td>{data.type == "MMT" ? "Monster Monies Token" : "Monster Coin Token"}</td>
                            <td>{new Date(data.createdAt).toLocaleString()}</td>
                            <td>
                            {
                              data.transactiontype == "walletbalance" ? 
                              `${data.amount.toLocaleString('en-US', {
                              style: 'decimal',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                              })} (WB)` : data.transactiontype == "monstergem" ? `${data.amount.toLocaleString('en-US', {
                              style: 'decimal',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                              })} (MG)` : data.transactiontype == "bnb" ? `${data.amount.toLocaleString('en-US', {
                              style: 'decimal',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                              })} (BNB)` : data.transactiontype == "usdt" ? `${data.amount.toLocaleString('en-US', {
                              style: 'decimal',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                              })} (USDT)`: data.transactiontype == "busd" ? `${data.amount.toLocaleString('en-US', {
                              style: 'decimal',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                              })} (BUSD)`: data.transactiontype == null || data.transactiontype == undefined ? data.amount : 0
                            }
                            </td>
                            <td>{data.tokenreceive.toLocaleString('en-US', {
                            style: 'decimal',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                            })}</td>
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

export default BuyToken;