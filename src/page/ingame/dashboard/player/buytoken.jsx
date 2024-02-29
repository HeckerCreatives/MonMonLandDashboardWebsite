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
    MDBTypography,
 } from "mdb-react-ui-kit";
import React, {useState, useEffect, useRef} from "react";
import Swal from "sweetalert2";
import PaginationPager from "../../../../component/pagination";
import mmticon from "../../../../assets/Ingame/assetsdashboard/Monster Monies icon.png"
import mcticon from "../../../../assets/Ingame/assetsdashboard/MML TOKEN.png"
import wbicon from "../../../../assets/Ingame/assetsdashboard/wallet icon.png"
import mgicon from "../../../../assets/header/Monster GEM.png"
import bnbicon from "../../../../assets/Ingame/bnbicon.png"
import busdicon from "../../../../assets/Ingame/busdicon.png"
import usdcicon from "../../../../assets/Ingame/usdcicon.png"
import xrpicon from "../../../../assets/Ingame/xrpicon.png"
import dogeicon from "../../../../assets/Ingame/dogeicon.png"
import usdticon from "../../../../assets/usdt.png"

import FlipCountdown from '@rumess/react-flip-countdown';
import { useBalance, useAccount, useSendTransaction, useWriteContract, useWaitForTransactionReceipt  } from 'wagmi'
import { parseEther , parseGwei} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { bscTestnet } from 'wagmi/chains' 
import { abi,Toast } from "../../../../component/utils"
import { SendTransactionReturnType, getTransactionReceipt } from '@wagmi/core'
import Web3 from "web3";
import { abort } from "process";
import { isgamelogin } from "../../../../component/utils";
const BuyToken = () => {
    const { address } = useAccount();
    const usdtcontract = "0x55d398326f99059fF775485246999027B3197955"
    const busdcontract = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    const usdccontract = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
    const xrpcontract = "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE"
    const dogecontract = "0xba2ae424d960c26247dd6c32edc70b295c744c43"

    // const usdtcontract = process.env.REACT_APP_MMTADDRESS
    // const busdcontract = process.env.REACT_APP_MMTADDRESS
    // const usdccontract = process.env.REACT_APP_MMTADDRESS
    // const xrpcontract = process.env.REACT_APP_MMTADDRESS
    // const dogecontract = process.env.REACT_APP_MCTADDRESS
    const userbnbbalance = useBalance({
      address: address,
    })
    const userusdtbalance = useBalance({
      address: address,
      token: usdtcontract
    })
    const userbusdbalance = useBalance({
      address: address,
      token: busdcontract
    })
    const userusdcbalance = useBalance({
      address: address,
      token: usdccontract
    })
    const userxrpbalance = useBalance({
      address: address,
      token: xrpcontract
    })
    const userdogebalance = useBalance({
      address: address,
      token: dogecontract
    })
    const [bnbpricetoday, setBnbPriceToday] = useState(0)
    const [usdtpricetoday, setUsdtPriceToday] = useState(0)
    const [busdpricetoday, setBusdPriceToday] = useState(0)
    const [usdcpricetoday, setUsdcPriceToday] = useState(0)
    const [xrppricetoday, setXrpPriceToday] = useState(0)
    const [dogepricetoday, setDogePriceToday] = useState(0)

    const [dbwallet, setDbWallet] = useState('')

    const [tokenselected, setTokenSelected] = useState("MMT")
    const [soldmmt, setSoldMmt] = useState(0);
    const [soldmct, setSoldMct] = useState(0);
    const [balance, setBalance] = useState(0);
    const [amawnt, setAmawnt] = useState(0);
    const [tokenamawntconversion, setTokenAmawnt] = useState(0);
    const [tokenhistory, setTokenHistory] = useState([]);
    const [isloading, setIsLoading] = useState(false),
          [checkedItems, setCheckedItems] = useState("walletbalance"),
          [page, setPage] = useState(1),
          [total, setTotal] = useState(0);
    const { sendTransaction, data: hash} = useSendTransaction()
    
    const { writeContract, isError } = useWriteContract() 
    const userWallet = address;
    const craetorwallet = process.env.REACT_APP_MARKETING
    
    const handleCheckboxChange = (itemId) => {
      setCheckedItems(itemId.target.value)
    };

    useEffect(()=> {
      isgamelogin()
      .then(data => {
        setDbWallet(data.walletaddress)
      })

      if(isError){
        setIsLoading(false)
      }
    },[isError])

    

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
        fetch("https://api.diadata.org/v1/quotation/USDC")
        .then(result => result.json())
        .then(data => {
          setUsdcPriceToday(data.Price)
        })
        fetch("https://api.diadata.org/v1/quotation/XRP")
        .then(result => result.json())
        .then(data => {
          setXrpPriceToday(data.Price)
        })
        fetch("https://api.diadata.org/v1/quotation/DOGE")
        .then(result => result.json())
        .then(data => {
          setDogePriceToday(data.Price)
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

    let amountconversion = useRef(0);
    const sample = 5000001;
    let mmtconversion = (soldmmt + amountconversion) <= 5000000 ? 200 : 100;
    const mctconversion = 2000
    
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
    } else if(checkedItems == "usdc"){
      if(tokenselected == "MMT"){
        amountconversion = (amawnt / usdcpricetoday) * mmtconversion
      } else if (tokenselected == "MCT"){
        amountconversion = (amawnt / usdcpricetoday) * mctconversion
      }
    } else if(checkedItems == "xrp"){
      if(tokenselected == "MMT"){
        amountconversion = (amawnt / (usdtpricetoday / xrppricetoday)) * mmtconversion
      } else if (tokenselected == "MCT"){
        amountconversion = (amawnt / (usdtpricetoday / xrppricetoday)) * mctconversion
      }
    } else if(checkedItems == "doge"){
      if(tokenselected == "MMT"){
        amountconversion = (amawnt / ( usdcpricetoday/ dogepricetoday)) * mmtconversion
      } else if (tokenselected == "MCT"){
        amountconversion = (amawnt / ( usdcpricetoday/ dogepricetoday)) * mctconversion
      }
    }

   

    mmtconversion = (soldmmt + amountconversion) <= 5000000 ? 200 : 100;

    const handlerecompute = () => {
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
      } else if(checkedItems == "usdc"){
        if(tokenselected == "MMT"){
          amountconversion = (amawnt / usdcpricetoday) * mmtconversion
        } else if (tokenselected == "MCT"){
          amountconversion = (amawnt / usdcpricetoday) * mctconversion
        }
      } else if(checkedItems == "xrp"){
        if(tokenselected == "MMT"){
          amountconversion = (amawnt / (usdtpricetoday / xrppricetoday)) * mmtconversion
        } else if (tokenselected == "MCT"){
          amountconversion = (amawnt / (usdtpricetoday / xrppricetoday)) * mctconversion
        }
      } else if(checkedItems == "doge"){
        if(tokenselected == "MMT"){
          amountconversion = (amawnt / ( usdcpricetoday/ dogepricetoday)) * mmtconversion
        } else if (tokenselected == "MCT"){
          amountconversion = (amawnt / ( usdcpricetoday/ dogepricetoday)) * mctconversion
        }
      }
    }

    if((soldmmt + amountconversion) <= 5000000){
      handlerecompute()
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
      
      if(checkedItems !== "walletbalance" && checkedItems !== "monstergem" && checkedItems !== "bnb" && checkedItems !== "usdt" && checkedItems !== "busd" && checkedItems !== "usdc" && checkedItems !== "xrp" && checkedItems !== "doge"){
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
              // if(dbwallet != address){
              //   setIsLoading(false)
              //   Swal.fire({
              //     icon: "warning",
              //     title: "Warning",
              //     text: "Attention: The wallet address you're using now does not match your wallet address in your account"
              //   })
              //   return
              // }

              if(parseFloat(userbnbbalance.data.formatted) > parseFloat(amount.value)){
                await sendTransaction({
                  to: craetorwallet,
                  value: parseEther(amount.value)
                },{
                  onSettled: (data, error) => {
                    if(data && error == null){
                      buymmtoken()
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
                  }
                })

                
              } else {
                setIsLoading(false)
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Not Enough Balance Please check your wallet balance"
                })
              }
            } else if (tokentype.value == "MCT" && checkedItems == "bnb"){
              // if(dbwallet != address){
              //   setIsLoading(false)
              //   Swal.fire({
              //     icon: "warning",
              //     title: "Warning",
              //     text: "Attention: The wallet address you're using now does not match your wallet address in your account"
              //   })
              //   return
              // }
              if(parseFloat(userbnbbalance.data.formatted) > parseFloat(amount.value)){
                sendTransaction({
                  to: craetorwallet,
                  value: parseEther(amount.value)
                },{
                  
                  onSettled: (data, error) => {
                    if(data && error == null){
                      buymctoken()
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
                  }
                })

              } else {
                setIsLoading(false)
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Not Enough Balance Please check your wallet balance"
                })
              }
            } else if (tokentype.value == "MMT" && checkedItems == "usdt"){
              // if(dbwallet != address){
              //   setIsLoading(false)
              //   Swal.fire({
              //     icon: "warning",
              //     title: "Warning",
              //     text: "Attention: The wallet address you're using now does not match your wallet address in your account"
              //   })
              //   return
              // }

              if(parseFloat(userusdtbalance.data.formatted) > parseFloat(amount.value)){
                
                writeContract({
                  abi,
                  address: usdtcontract,
                  functionName: 'transfer',
                  args: [
                    craetorwallet,
                    parseEther(amount.value),
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
                  }
                })
              } else {
                setIsLoading(false)
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Not Enough Balance Please check your wallet balance"
                })
              }
            } else if (tokentype.value == "MCT" && checkedItems == "usdt"){
              // if(dbwallet != address){
              //   setIsLoading(false)
              //   Swal.fire({
              //     icon: "warning",
              //     title: "Warning",
              //     text: "Attention: The wallet address you're using now does not match your wallet address in your account"
              //   })
              //   return
              // }

              if(parseFloat(userusdtbalance.data.formatted) > parseFloat(amount.value)){
                
                writeContract({
                  abi,
                  address: usdtcontract,
                  functionName: 'transfer',
                  args: [
                    craetorwallet,
                    parseEther(amount.value),
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
                  }
                })
              } else {
                setIsLoading(false)
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Not Enough Balance Please check your wallet balance"
                })
              }
            } else if (tokentype.value == "MMT" && checkedItems == "busd"){
              // if(dbwallet != address){
              //   setIsLoading(false)
              //   Swal.fire({
              //     icon: "warning",
              //     title: "Warning",
              //     text: "Attention: The wallet address you're using now does not match your wallet address in your account"
              //   })
              //   return
              // }

              if(parseFloat(userbusdbalance.data.formatted) > parseFloat(amount.value)){
                
                writeContract({
                  abi,
                  address: busdcontract,
                  functionName: 'transfer',
                  args: [
                    craetorwallet,
                    parseEther(amount.value),
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
                  }
                })
              } else {
                setIsLoading(false)
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Not Enough Balance Please check your wallet balance"
                })
              }
            } else if (tokentype.value == "MCT" && checkedItems == "busd"){
              // if(dbwallet != address){
              //   setIsLoading(false)
              //   Swal.fire({
              //     icon: "warning",
              //     title: "Warning",
              //     text: "Attention: The wallet address you're using now does not match your wallet address in your account"
              //   })
              //   return
              // }

              if(parseFloat(userbusdbalance.data.formatted) > parseFloat(amount.value)){
                
                writeContract({
                  abi,
                  address: busdcontract,
                  functionName: 'transfer',
                  args: [
                    craetorwallet,
                    parseEther(amount.value),
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
                  }
                })
              } else {
                setIsLoading(false)
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Not Enough Balance Please check your wallet balance"
                })
              }
            } else if (tokentype.value == "MMT" && checkedItems == "usdc"){
              // if(dbwallet != address){
              //   setIsLoading(false)
              //   Swal.fire({
              //     icon: "warning",
              //     title: "Warning",
              //     text: "Attention: The wallet address you're using now does not match your wallet address in your account"
              //   })
              //   return
              // }

              if(parseFloat(userusdcbalance.data.formatted) > parseFloat(amount.value)){
                
                writeContract({
                  abi,
                  address: usdccontract,
                  functionName: 'transfer',
                  args: [
                    craetorwallet,
                    parseEther(amount.value),
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
                  }
                })
              } else {
                setIsLoading(false)
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Not Enough Balance Please check your wallet balance"
                })
              }
            } else if (tokentype.value == "MCT" && checkedItems == "usdc"){
              // if(dbwallet != address){
              //   setIsLoading(false)
              //   Swal.fire({
              //     icon: "warning",
              //     title: "Warning",
              //     text: "Attention: The wallet address you're using now does not match your wallet address in your account"
              //   })
              //   return
              // }

              if(parseFloat(userusdcbalance.data.formatted) > parseFloat(amount.value)){
                
                writeContract({
                  abi,
                  address: usdccontract,
                  functionName: 'transfer',
                  args: [
                    craetorwallet,
                    parseEther(amount.value),
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
                  }
                })
              } else {
                setIsLoading(false)
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Not Enough Balance Please check your wallet balance"
                })
              }
            } else if (tokentype.value == "MMT" && checkedItems == "xrp"){
              // if(dbwallet != address){
              //   setIsLoading(false)
              //   Swal.fire({
              //     icon: "warning",
              //     title: "Warning",
              //     text: "Attention: The wallet address you're using now does not match your wallet address in your account"
              //   })
              //   return
              // }

              if(parseFloat(userxrpbalance.data.formatted) > parseFloat(amount.value)){
                
                writeContract({
                  abi,
                  address: xrpcontract,
                  functionName: 'transfer',
                  args: [
                    craetorwallet,
                    parseEther(amount.value),
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
                          amount: amawnt * xrppricetoday,
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
                  }
                })
              } else {
                setIsLoading(false)
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Not Enough Balance Please check your wallet balance"
                })
              }
            } else if (tokentype.value == "MCT" && checkedItems == "xrp"){
              // if(dbwallet != address){
              //   setIsLoading(false)
              //   Swal.fire({
              //     icon: "warning",
              //     title: "Warning",
              //     text: "Attention: The wallet address you're using now does not match your wallet address in your account"
              //   })
              //   return
              // }

              if(parseFloat(userxrpbalance.data.formatted) > parseFloat(amount.value)){
                
                writeContract({
                  abi,
                  address: xrpcontract,
                  functionName: 'transfer',
                  args: [
                    craetorwallet,
                    parseEther(amount.value),
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
                          amount: amawnt * xrppricetoday,
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
                  }
                })
              } else {
                setIsLoading(false)
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Not Enough Balance Please check your wallet balance"
                })
              }
            } else if (tokentype.value == "MMT" && checkedItems == "doge"){
              // if(dbwallet != address){
              //   setIsLoading(false)
              //   Swal.fire({
              //     icon: "warning",
              //     title: "Warning",
              //     text: "Attention: The wallet address you're using now does not match your wallet address in your account"
              //   })
              //   return
              // }

              if(parseFloat(userdogebalance.data.formatted) > parseFloat(amount.value)){
                
                writeContract({
                  abi,
                  address: dogecontract,
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
                          amount: amawnt * dogepricetoday,
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
                  }
                })
              } else {
                setIsLoading(false)
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Not Enough Balance Please check your wallet balance"
                })
              }
            } else if (tokentype.value == "MCT" && checkedItems == "doge"){
              // if(dbwallet != address){
              //   setIsLoading(false)
              //   Swal.fire({
              //     icon: "warning",
              //     title: "Warning",
              //     text: "Attention: The wallet address you're using now does not match your wallet address in your account"
              //   })
              //   return
              // }

              if(parseFloat(userdogebalance.data.formatted) > parseFloat(amount.value)){
                
                writeContract({
                  abi,
                  address: dogecontract,
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
                          amount: amawnt * dogepricetoday,
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
                  }
                })
              } else {
                setIsLoading(false)
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
        {
            isloading &&
            <MDBTypography tag={'h2'} className="text-danger mt-2 text-center">Please do not refresh while processing</MDBTypography>
        }
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
              <p>$1 = {mmtconversion} MMT</p>
              }
              {
                tokenselected == "MCT" &&
                <p>$1 = {mctconversion} MCT</p>
              }
              {
                tokenselected == "" &&
                <p> $1 = {mmtconversion} MMT</p>
              }
              </div>
              <form onSubmit={buyToken}>
              <div className="row text-center mb-1">
              <input 
              type="checkbox" 
              id="wb" 
              value='walletbalance'
              checked={checkedItems == "walletbalance"} 
              onChange={handleCheckboxChange}
              style={{display: "none"}}
              />

              <input 
              type="checkbox" 
              id="mg" 
              checked={checkedItems == "monstergem"} 
              value='monstergem'
              onChange={handleCheckboxChange}
              style={{display: "none"}}
              />

              <input 
              type="checkbox" 
              id="bnb" 
              checked={checkedItems == "bnb"} 
              value='bnb'
              onChange={handleCheckboxChange}
              style={{display: "none"}}
              />      

              <input 
              type="checkbox" 
              id="usdt" 
              checked={checkedItems == "usdt"}
              value='usdt'
              onChange={handleCheckboxChange}
              style={{display: "none"}}
              />

              <input 
              type="checkbox" 
              id="busd" 
              checked={checkedItems == "busd"}
              value='busd'
              onChange={handleCheckboxChange}
              style={{display: "none"}}
              />  

              <input 
              type="checkbox" 
              id="usdc" 
              checked={checkedItems == "usdc"}
              value='usdc'
              onChange={handleCheckboxChange}
              style={{display: "none"}}
              /> 

              <input 
              type="checkbox" 
              id="xrp" 
              checked={checkedItems == "xrp"}
              value='xrp'
              onChange={handleCheckboxChange}
              style={{display: "none"}}
              /> 

              <input 
              type="checkbox" 
              id="doge" 
              checked={checkedItems == "doge"}
              value='doge'
              onChange={handleCheckboxChange}
              style={{display: "none"}}
              /> 

              <MDBCol lg={3}>
              <div className={checkedItems == "walletbalance" ? `tokenselect my-2` : "border my-2"} style={{ borderRadius: "10px"}}>
              <label htmlFor="wb" className="">
              <span style={{fontSize: "10px"}}>Wallet Balance</span>&nbsp;
              <img alt="" src={wbicon} style={{height: "32px", width: "32px"}}/>
              </label>
              </div>
              </MDBCol>
              <MDBCol lg={3}>
              <div className={checkedItems == "monstergem" ? `tokenselect my-2` : "border my-2"} style={{ borderRadius: "10px"}}>
              <label htmlFor="mg" className="">
              <span style={{fontSize: "10px"}}>Monster Gem</span>&nbsp;
              <img alt="" src={mgicon} style={{height: "32px", width: "32px"}}/>
              </label>
              </div>
              </MDBCol>
              <MDBCol lg={3}>
              <div className={checkedItems == "bnb" ? `tokenselect my-2` : "border my-2"} style={{ borderRadius: "10px"}}>
              <label htmlFor="bnb" className="">
              <span style={{fontSize: "10px"}}>BNB</span>&nbsp;
              <img alt="" src={bnbicon} style={{height: "32px", width: "32px"}}/>
              </label>
              </div>
              </MDBCol>
              <MDBCol lg={3}>
              <div className={checkedItems == "usdt" ? `tokenselect my-2` : "border my-2"} style={{ borderRadius: "10px"}}>
              <label htmlFor="usdt" className="">
              <span style={{fontSize: "10px"}}>USDT</span>&nbsp;
              <img alt="" src={usdticon} style={{height: "32px", width: "32px"}}/>
              </label>
              </div>
              </MDBCol>
              </div>

              <div className="row text-center mb-4">
              <MDBCol lg={3}>
              <div className={checkedItems == "busd" ? `tokenselect my-2` : "border my-2"} style={{borderRadius: "10px"}}>
              <label htmlFor="busd" className="">
              <span style={{fontSize: "10px"}}>BUSD</span>&nbsp;
              <img alt="" src={busdicon} style={{height: "32px", width: "32px"}}/>
              </label>
              </div>
              </MDBCol>

              <MDBCol lg={3}>
              <div className={checkedItems == "usdc" ? `tokenselect my-2` : "border my-2"} style={{borderRadius: "10px"}}>
              <label htmlFor="usdc" className="">
              <span style={{fontSize: "10px"}}>USDC</span>&nbsp;
              <img alt="" src={usdcicon} style={{height: "32px", width: "32px"}}/>
              </label>
              </div>
              </MDBCol>

              <MDBCol lg={3}>
              <div className={checkedItems == "xrp" ? `tokenselect my-2` : "border my-2"} style={{borderRadius: "10px"}}>
              <label htmlFor="xrp" className="">
              <span style={{fontSize: "10px"}}>XRP</span>&nbsp;
              <img alt="" src={xrpicon} style={{height: "32px", width: "32px"}}/>
              </label>
              </div>
              </MDBCol>

              <MDBCol lg={3}>
              <div className={checkedItems == "doge" ? `tokenselect my-2` : "border my-2"} style={{borderRadius: "10px"}}>
              <label htmlFor="doge" className="">
              <span style={{fontSize: "10px"}}>DOGE</span>&nbsp;
              <img alt="" src={dogeicon} style={{height: "32px", width: "32px"}}/>
              </label>
              </div>
              </MDBCol>
              
              </div>
              
              <div className="row ">
              <div className="col-lg-6 my-2">
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

              <div className="my-2 col-lg-6">

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
                              `$${data.amount.toLocaleString('en-US', {
                              style: 'decimal',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                              })} (WB)` : data.transactiontype == "monstergem" ? `$${data.amount.toLocaleString('en-US', {
                              style: 'decimal',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                              })} (MG)` : data.transactiontype == "bnb" ? `$${data.amount.toLocaleString('en-US', {
                              style: 'decimal',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                              })} (BNB)` : data.transactiontype == "usdt" ? `$${data.amount.toLocaleString('en-US', {
                              style: 'decimal',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                              })} (USDT)`: data.transactiontype == "busd" ? `$${data.amount.toLocaleString('en-US', {
                              style: 'decimal',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                              })} (BUSD)`: data.transactiontype == null || data.transactiontype == undefined ? `$${data.amount}` : 0
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