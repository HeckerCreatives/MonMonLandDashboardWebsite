import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import { useBalance, useAccount, useSendTransaction, useWriteContract, useTransactionReceipt, useTransactionCount, usePrepareTransactionRequest } from 'wagmi'
import { parseEther , parseGwei} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { bscTestnet } from 'wagmi/chains' 
import { abi } from "../../../../component/utils"
import { SendTransactionReturnType, getTransactionReceipt } from '@wagmi/core'
import Web3 from "web3";
import { Chain, Common, Hardfork } from '@ethereumjs/common'
import { LegacyTransaction } from '@ethereumjs/tx'
// const LegacyTransaction = require("ethereumjs-tx").Transaction;
import { encodeFunctionData, createWalletClient, http, createPublicClient } from 'viem'
import { writeContract } from "viem/actions";
import Swal from "sweetalert2";
const WithdrawToken = ({tokenselected}) => {
    const [isloading, setIsLoading] = useState(false)
    const [mmt, setMMT] = useState(0)
    const [mct, setMCT] = useState(0)
    const { address } = useAccount();
    const { sendTransaction } = useSendTransaction()
    let tokentowithdraw = 0;
    // const [encodedata, setEncodeData] = useState('')
    const privateKey = process.env.REACT_APP_PRIVATEKEY
    const Mmtaddress = process.env.REACT_APP_MMTADDRESS
    const mctaddress = process.env.REACT_APP_MCTADDRESS
    const craetorwallet = process.env.REACT_APP_DEVWALLET
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
      setIsLoading(true)
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

      if(tokenamount){
        tokentowithdraw = tokenamount
        
        fetch(`${process.env.REACT_APP_API_URL}gamewallet/withdrawtoken`, {
          method: "POST",
          credentials: 'include',
          headers:{
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
              token: tokenselected, 
              amount: tokenamount,
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
            handleKopit()
          } else {
            // setIsLoading(false)
            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: data.data,
              allowEscapeKey: false,
              allowOutsideClick: false
            })
          }
        })
      } else {
        setIsLoading(false)
      }
    }

    const handleKopit = async () => {
      let requiredFee = 0;

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
          onSettled: (data, error) => {
            if(data && error == null){
              jemme()
            } else if (error){
              setIsLoading(false)
              
              fetch(`${process.env.REACT_APP_API_URL}gamewallet/withdrawerror`, {
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
                  if(data.message == "success"){
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
                    
                  }
              })
            } else {
              setIsLoading(false)
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

    const jemme = async () => {
      const tokencontract = tokenselected == "MMT" ? Mmtaddress : mctaddress
      const amountvalue = tokenselected == "MMT" ? parseEther(tokentowithdraw.toString()) : parseGwei(tokentowithdraw.toString())
      const encodedata = await encodeFunctionData({
        abi: abi,
        functionName: 'transfer',
        args: [
          address,
          amountvalue,
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

        await fetch(`${process.env.REACT_APP_API_URL}gamewallet/tokenwithdrawhistory`, {
          method: "POST",
          credentials: 'include',
          headers:{
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            token: tokenselected, 
            amount: tokentowithdraw, 
            hash: hashes, 
            metamaskwallet: address, 
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
              Swal.fire({
                icon: "error",
                title: "Oops..",
                text: data.data,
                allowEscapeKey: false,
                allowOutsideClick: false
              })
            }
        })

        // Swal.fire({
        //   icon: 'success',
        //   title: "Success!",
        //   text: hashes
        // })
      }
      

    }
    
    // const handleClaim = async () => {
    //     // let claimable = parseFloat(transaction.vnt) * percentage;
    //     // let remaining = parseFloat(transaction.remaining) - claimable;
    
    //     const hexPrivateKey = new Buffer.from(privateKey, "hex");
    //     const MmtAmount = parseGwei("200");
    //     const contract = new window.web3.eth.Contract(abi, Mmtaddress);
    //     console.log(window.web3.utils.toHex(window.web3.utils.toWei("0.001", "ether")))
    //     const data = await contract.methods
    //       .transfer(
    //         address,
    //         window.web3.utils.toHex(MmtAmount)
    //       )
    //       .encodeABI();
    //     console.log(data)
    //     await window.web3.eth.getTransactionCount(
    //       craetorwallet, "latest",
    //       async (error, txCount) => {
    //         console.log(txCount)
    //         const txObject = {
    //           nonce: window.web3.utils.toHex(txCount),
    //           gasLimit: window.web3.utils.toHex(800000),
    //           gasPrice: window.web3.utils.toHex(
    //             window.web3.utils.toWei("10", "gwei")
    //           ),
    //           to: Mmtaddress,
    //           data: data,
    //         };

    //         const customCommon = new Common.forCustomChain(
    //           "mainnet",
    //           {
    //             name: "Smart chain Testnet",
    //             chainId: 97,
    //             networkId: 97,
    //           },
    //         //   {
    //         //     name: "Binance Smart chain",
    //         //     chainId: 56,
    //         //     networkId: 56,
    //         //   },
    //           "petersburg"
    //         );
    
    //         const tx = LegacyTransaction.fromTxData(txObject, { common: customCommon });
    //         tx.sign(hexPrivateKey);
    
    //         const serializedTx = tx.serialize();
    //         const raw = `0x${serializedTx.toString("hex")}`;
    //         console.log(tx)  
    //         console.log(serializedTx)
    //         console.log(raw)
    //         await window.web3.eth.getBalance(craetorwallet).then(bal => {
    //           if (bal < 0.01) {
    //             alert("Insufficient gas fee from owner.");
    //             // setClaim(false);
    //             // setLoading(false);
    //           } else {
    //             window.web3.eth.sendSignedTransaction(raw).then(() => {
    //                 console.log("SUCCESS NICE")
    //             //   dispatch(
    //             //     UPDATE({
    //             //       id: transaction._id,
    //             //       data: {
    //             //         remaining,
    //             //         claimedAt: new Date().toLocaleDateString(),
    //             //       },
    //             //     })
    //             //   );
    //             //   setLoading(false);
    //             });
    //           }
    //         });
    //       }
    //     );
    //   };

    return(
        <MDBBtn type="button" size="sm"
        disabled={isloading} 
        onClick={handleWithdraw}
        >
          {isloading ? "Processing.." : "Withdraw"}
        </MDBBtn>
    )
}

export default WithdrawToken;