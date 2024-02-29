import { MDBBtn, MDBContainer,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter, } from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import { useBalance, useAccount, useSendTransaction, useDisconnect , useTransaction } from 'wagmi'
import { parseEther , parseGwei} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { bscTestnet } from 'wagmi/chains' 
import { abi , isgamelogin} from "../../../../component/utils"
import Web3 from "web3";
import { encodeFunctionData, createWalletClient, http, createPublicClient } from 'viem'
import Swal from "sweetalert2";
import leaf from "../../../../assets/Ingame/leafloading.png"
const WithdrawToken = ({tokenselected, leafload}) => {
    const [basicModal, setBasicModal] = useState(false);
    const [isloading, setIsLoading] = useState(false)
    const [dbwallet, setDbWallet] = useState('')
    const [mmt, setMMT] = useState(0)
    const [mct, setMCT] = useState(0)
    const { address } = useAccount();
    const { sendTransaction } = useSendTransaction()
    const { disconnect } = useDisconnect()
    let tokentowithdraw = 0;
    // const [encodedata, setEncodeData] = useState('')
    
    const privateKey = process.env.REACT_APP_PRIVATEKEY
    const Mmtaddress = process.env.REACT_APP_MMTADDRESS
    const mctaddress = process.env.REACT_APP_MCTADDRESS
    const craetorwallet = process.env.REACT_APP_MARKETING
    window.web3 = new Web3(window.ethereum)
    const account = privateKeyToAccount(privateKey)
    const client = createWalletClient({
      account: account,
      chain: bscTestnet,
      transport: http()
    })
    const publicClient = createPublicClient({ 
      chain: bscTestnet,
      transport: http()
    })

    const userbnbbalance = useBalance({
      address: address,
      chainId: 97
    })

    useEffect(() => {
      // Simulating some asynchronous operation
      const fetchData = async () => {
        // Set loading to true before the operation starts
        if(isloading){
          leafload(true)
        }
  
        // Simulate some asynchronous operation
        await new Promise((resolve) => setTimeout(resolve, 2000));
  
        // Set loading to false after the operation is complete
        leafload(false);
      };
  
      fetchData();
    }, [leafload, isloading])


    useEffect(()=> {
      isgamelogin()
      .then(data => {
        setDbWallet(data.walletaddress)
      })
      // disconnect()
    },[disconnect])

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}gamewallet/mytoken`, {
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
          setMCT(data.data2)
          setMMT(data.data)
        }
        
      })
    },[])

    
    const handleWithdraw = async () => {

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

      const inputValue = ""
      const { value: tokenamount } = await Swal.fire({
        title: "Enter your desired amount to withdraw",
        input: "number",
        inputLabel: `Token Amount to withdraw: Balance (${tokenselected == "MMT" ? mmt : mct})`,
        inputPlaceholder: tokenselected == "MMT" ? mmt : mct,
        inputValue,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "Please Input Token Amount";
          }
        }
      });

      const checkbalance = tokenselected == "MMT" ? tokenamount > mmt : tokenamount > mct
      
      if(checkbalance){
        setIsLoading(false)
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Not Enough Balance"
        })
        return
      }
      
      if(tokenamount){
        tokentowithdraw = tokenamount
        handleKopit()
      } else {
        setIsLoading(false)
      }
    }

    const handleKopit = async () => {
      let requiredFee = 0;
      setIsLoading(true)
      
      if(isloading){
        leafload(true)
      }

      if (tokentowithdraw < 100000) {
        requiredFee = 0.0012;
      } else if (tokentowithdraw >= 100000 && tokentowithdraw < 200000) {
        requiredFee = 0.0015;
      } else if (tokentowithdraw >= 200000 && tokentowithdraw < 300000) {
        requiredFee = 0.002;
      } else if (tokentowithdraw >= 300000 && tokentowithdraw < 400000) {
        requiredFee = 0.0022;
      } else if (tokentowithdraw >= 400000 && tokentowithdraw < 500000) {
        requiredFee = 0.0024;
      } else if (tokentowithdraw >= 500000 && tokentowithdraw < 600000) {
        requiredFee = 0.0026;
      } else if (tokentowithdraw >= 600000 && tokentowithdraw < 700000) {
        requiredFee = 0.003;
      } else if (tokentowithdraw >= 700000 && tokentowithdraw < 800000) {
        requiredFee = 0.0032;
      } else if (tokentowithdraw >= 800000 && tokentowithdraw < 900000) {
        requiredFee = 0.0035;
      } else if (tokentowithdraw >= 900000 && tokentowithdraw < 1000000) {
        requiredFee = 0.0038;
      } else if (tokentowithdraw >= 1000000) {
        requiredFee = 0.004;
      }

      if(parseFloat(userbnbbalance.data.formatted) > requiredFee){
        sendTransaction({
          to: craetorwallet,
          value: parseEther(requiredFee.toString())
        },{
          onSettled: async (data, error) => {
            if(data && error == null){
              await fetch(`${process.env.REACT_APP_API_URL}gamewallet/createwithdrawhistory`, {
                method: "POST",
                credentials: 'include',
                headers:{
                  "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    token: tokenselected, 
                    amount: tokentowithdraw,
                    walletaddress: address, 
                    gasfeehash: data,
                })
              })
              .then(jemme(data))
            } else if (error){
              setIsLoading(false)
              leafload(false)
              Swal.fire({
                icon: "error",
                title: "Oops..",
                text: error.message.includes("User denied") ? "You rejected the transaction" : error.message,
                allowEscapeKey: false,
                allowOutsideClick: false
              }).then(ok => {
                if(ok.isConfirmed){
                  window.location.reload()
                }
              })
              // fetch(`${process.env.REACT_APP_API_URL}gamewallet/withdrawerror`, {
              //   method: "POST",
              //   credentials: 'include',
              //   headers:{
              //     "Content-Type": 'application/json'
              //   },
              //   body: JSON.stringify({
              //       token: tokenselected, 
              //       amount: tokentowithdraw,
              //   })
              // })
              // .then(result => result.json())
              // .then(data => {
              //     if(data.message == "success"){
              //       Swal.fire({
              //         icon: "error",
              //         title: "Oops..",
              //         text: error.message.includes("User denied") ? "You rejected the transaction" : error.message,
              //         allowEscapeKey: false,
              //         allowOutsideClick: false
              //       }).then(ok => {
              //         if(ok.isConfirmed){
              //           window.location.reload()
              //         }
              //       })
                    
              //     }
              // })
            } else {
              setIsLoading(false)
              leafload(false)
              Swal.fire({
                icon: "error",
                title: "Oops..",
                text: "Please try again later",
                allowEscapeKey: false,
                allowOutsideClick: false
              })
            }
          }
        })
      } else {
        leafload(false)
        setIsLoading(false)
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Insufficient funds, at least 0.0008 BNB Required!",
          allowEscapeKey: false,
          allowOutsideClick: false
        })
      }
    }

    const jemme = async (gasfeehash) => {
      const tokencontract = tokenselected == "MMT" ? Mmtaddress : mctaddress
      // const amountvalue = tokenselected == "MMT" ? parseEther(tokentowithdraw.toString()) : parseGwei(tokentowithdraw.toString())
      const encodedata = await encodeFunctionData({
        abi: abi,
        functionName: 'transfer',
        args: [
          address,
          parseEther(tokentowithdraw.toString()),
        ],
      })

      const transactionCount = await publicClient.getTransactionCount({  
        address: craetorwallet,
      })

      const txObject = await client.prepareTransactionRequest({
        nonce: transactionCount,
        maxFeePerGas: parseGwei('20'),
        // maxPriorityFeePerGas: parseGwei('3'),
        to: tokencontract,
        data: encodedata,
        chain: bscTestnet,
      });

      const sign = await  client.signTransaction(txObject)

      const balance = await publicClient.getBalance({ 
        address: craetorwallet,
      })

      if(parseEther(balance.toString()) < 0.01 ){
        Swal.fire({
          icon: 'warning',
          title: "Warning!",
          text: "Insufficient gas fee from devwallet"
        })
      } else {
        const hashes = await client.sendRawTransaction({
          serializedTransaction: sign
        })

        await fetch(`${process.env.REACT_APP_API_URL}gamewallet/withdrawtoken`, {
          method: "POST",
          credentials: 'include',
          headers:{
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
              token: tokenselected, 
              amount: tokentowithdraw,
          })
        })
        .then(result => result.json())
        .then(data => {
          if(data.message == "duallogin" || data.message == "banned" || data.message == "Unathorized"){
            // setIsLoading(false)
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
            // setIsLoading(false)
            
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

        await fetch(`${process.env.REACT_APP_API_URL}gamewallet/tokenwithdrawhistory`, {
          method: "POST",
          credentials: 'include',
          headers:{
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            gasfeehash: gasfeehash,
            hash: hashes, 
            claimedAt: new Date().toLocaleString()
        })
        })
        .then(result => result.json())
        .then(data => {
            if(data.message == "duallogin" || data.message == "banned" || data.message == "Unathorized"){
              // setIsLoading(false)
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
              leafload(false)
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Token Withdrawal Successfull",
                allowEscapeKey: false,
                allowOutsideClick: false
              }).then(ok => {
                if(ok.isConfirmed){
                  window.location.reload()
                }
              })
            } else {
              setIsLoading(false)
              leafload(false)
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
      

    }
    
   
    return(
      <>
      <MDBBtn type="button" size="sm"
      color="warning"
      disabled={isloading} 
      onClick={handleWithdraw}
      >
        {isloading ? "Processing.." : "Withdraw"}
      </MDBBtn>
      </>
        
    )
}

export default WithdrawToken;