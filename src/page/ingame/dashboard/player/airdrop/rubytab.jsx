import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBCardText, MDBProgress, MDBProgressBar, MDBTypography, MDBCardFooter } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import FlipCountdown from '@rumess/react-flip-countdown';
import Swal from "sweetalert2";
import { useBalance, useAccount, useSendTransaction,} from 'wagmi'
import { abi , isgamelogin} from "../../../../../component/utils"
import { parseEther , parseGwei} from 'viem'
const AirDropTabRuby = ({usersubscription}) => {
    const [mmtairdrop, setMmtAirDrop] = useState(0)
    const [mctairdrop, setMctAirDrop] = useState(0)
    const [quest, setQuest] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const [questclaim, setQuestClaimable] = useState([])
    const { address } = useAccount();
    const [dbwallet, setDbWallet] = useState('')
    const userbnbbalance = useBalance({
        address: address,
    })
    const { sendTransaction } = useSendTransaction()
    const craetorwallet = process.env.REACT_APP_DEVWALLET

    useEffect(()=> {
        isgamelogin()
        .then(data => {
            setDbWallet(data.walletaddress)
        })
    },[])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}gamewallet/getquest`, {
            method: "GET",
            credentials: 'include',
            headers:{
              "Content-Type": 'application/json'
            },
        })
        .then(result => result.json())
        .then(data => {
            if(data.message == "success"){
                setQuest(data.data)
                setQuestClaimable(data.data2)
            }
        })

        fetch(`${process.env.REACT_APP_API_URL}gamewallet/totalairdrop`, {
            method: "GET",
            credentials: 'include',
            headers:{
              "Content-Type": 'application/json'
            },
        })
        .then(result => result.json())
        .then(data => {
            if(data.message == "success"){
                setMmtAirDrop(data.data)
                setMctAirDrop(data.data2)
            }
        })
    },[])

    const handleAcceptQuest = (e,id) => {
        e.preventDefault();
        let acceptquest = {}
        switch(id){
            case 1:
            acceptquest = {
                questid: 1,
                questtitle: "Account Status Must Be Active",
                mmttokenreward: usersubscription == "Pearlplus" ? 100 : usersubscription == "Ruby" ? 200 : usersubscription == "Emerald" ? 500 : 1000,
                mcttokenreward: usersubscription == "Pearlplus" ? 200 : usersubscription == "Ruby" ? 400 : usersubscription == "Emerald" ? 1000 : 2000,
                acceptAt: new Date().toLocaleString(),
                expiredAt: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleString(),
            }
            break;
            default:
            break;
        }

        fetch(`${process.env.REACT_APP_API_URL}gamewallet/acceptquest`, {
            method: "POST",
            credentials: 'include',
            headers:{
              "Content-Type": 'application/json'
            },
            body: JSON.stringify(acceptquest)
        })
        .then(result => result.json())
        .then(data => {
            if(data.message == "success"){
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: data.data
                }).then(ok => {
                    if(ok.isConfirmed){
                        window.location.reload()
                    }
                })
            }
        })
    }

    const handleClaimQuest = (e, id) => {
        e.preventDefault();
        let requiredFee = 0.0018;
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

        if(parseFloat(userbnbbalance.data.formatted) > requiredFee){
            sendTransaction({
              to: craetorwallet,
              value: parseEther(requiredFee.toString())
            },{
              onSettled: (data, error) => {
                if(data && error == null){
                    fetch(`${process.env.REACT_APP_API_URL}gamewallet/claimquest`, {
                        method: "POST",
                        credentials: 'include',
                        headers:{
                          "Content-Type": 'application/json'
                        },
                        body: JSON.stringify({
                            questid: id,
                            claimedAt: new Date().toLocaleString()
                        })
                    })
                    .then(result => result.json())
                    .then(data => {
                        if(data.message == "success"){
                            Swal.fire({
                                icon: "success",
                                title: "Successfully",
                                text: "Airdrop successfully claim"
                            }).then(ok => {
                                if(ok.isConfirmed){
                                    window.location.reload()
                                }
                            })
                        }
                    })
                } else if (error){
                  setIsLoading(false)
                  console.log(error)
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
    const mmtair = mmtairdrop < 1000000 ? (mmtairdrop / 1000000) * 100 : 100
    const mctair = mctairdrop < 10000000 ? (mctairdrop / 10000000) * 100 : 100
    return(
        <MDBContainer>

            <FlipCountdown
            endAtZero
            hideYear
            // hideMonth
            // hideDay
            size='small'
            endAt={"2024-06-01"} // Date/Time // jun 1 2024
            onTimeUp={() => console.log("ew")}/>

            
              <MDBRow>
            <MDBCol lg={6} className="mt-2">
                <p>MMT Total Claimed: &nbsp;
                {mmtairdrop} / 1,000,000</p>
                <MDBProgress  height='20' tag={'div'} style={{borderRadius: "10px"}}>
                    <MDBProgressBar bgColor='warning' width={mmtair} valuemin={0} valuemax={100}></MDBProgressBar>
                </MDBProgress>
            </MDBCol>
            <MDBCol lg={6} className="mt-2">
                <p>MCT Total Claimed: &nbsp;
                {mctairdrop} / 10,000,000</p>
                <MDBProgress  height='20' tag={'div'} style={{borderRadius: "10px"}}>
                    <MDBProgressBar bgColor='warning' width={mctair} valuemin={0} valuemax={100}></MDBProgressBar>
                </MDBProgress>
            </MDBCol>
            
            </MDBRow>
              <MDBTypography  tag={"h1"} className="mt-5 text-center">Airdrop Quest</MDBTypography>
            <MDBRow>
                
                <MDBCol lg={3} className="my-2">
                    <MDBCard alignment="center">
                        <MDBCardBody>
                        {/* <div>
                            <img src={pearlicon} alt="" style={{height: "65px", width: "65px"}}/>
                        </div> */}
                        <MDBCardText className="text-center fw-bold">Account Status Must Be Active</MDBCardText>
                        <MDBCardText>Quest Duration: 3 Days</MDBCardText>
                        <MDBCardText>Claimable Token: &nbsp;
                        {usersubscription == "Pearlplus" && "100 MMT + 200 MCT"}
                        {usersubscription == "Ruby" && "200 MMT + 400 MCT"}
                        {usersubscription == "Emerald" && "500 MMT + 1000 MCT"}
                        {usersubscription == "Diamond" && "1000 MMT + 2000 MCT"}
                        </MDBCardText>
                        
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div className="">
                            {
                                questclaim?.Quest1 == "claimable" && usersubscription == "Ruby"?
                                <MDBBtn disabled={quest[0]?.claimedAt != null} color="warning" onClick={(e) => handleClaimQuest(e,1)}>Claim</MDBBtn>
                                :
                                <MDBBtn disabled={usersubscription != "Ruby"} color="warning" onClick={(e) => handleAcceptQuest(e,1)}>Accept</MDBBtn>
                            }
                        </div>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>
                <MDBCol lg={3} className="my-2">
                    <MDBCard alignment="center">
                        <MDBCardBody>
                        {/* <div>
                            <img src={pearlicon} alt="" style={{height: "65px", width: "65px"}}/>
                        </div> */}
                        <MDBCardText className="text-center fw-bold">Get total of 20 Direct Points</MDBCardText>
                        <MDBCardText>Quest Duration: 30 Days</MDBCardText>
                        <MDBCardText>Claimable Token: &nbsp;
                        {usersubscription == "Pearlplus" && "200 MMT + 400 MCT"}
                        {usersubscription == "Ruby" && "500 MMT + 1000 MCT"}
                        {usersubscription == "Emerald" && "1000 MMT + 2000 MCT"}
                        {usersubscription == "Diamond" && "2000 MMT + 4000 MCT"}
                        </MDBCardText>
                        
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            <MDBBtn color="warning" disabled>Accept</MDBBtn>
                        </div>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>
                <MDBCol lg={3} className="my-2">
                    <MDBCard alignment="center">
                        <MDBCardBody>
                        {/* <div>
                            <img src={pearlicon} alt="" style={{height: "65px", width: "65px"}}/>
                        </div> */}
                        <MDBCardText className="text-center fw-bold">Get 10k Account Total Points</MDBCardText>
                        <MDBCardText>Quest Duration: 30 Days</MDBCardText>
                        <MDBCardText>Claimable Token: &nbsp;
                        {usersubscription == "Pearlplus" && "200 MMT + 400 MCT"}
                        {usersubscription == "Ruby" && "500 MMT + 1000 MCT"}
                        {usersubscription == "Emerald" && "1000 MMT + 2000 MCT"}
                        {usersubscription == "Diamond" && "2000 MMT + 4000 MCT"}
                        </MDBCardText>
                        
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            <MDBBtn color="warning" disabled>Accept</MDBBtn>
                        </div>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>
                <MDBCol lg={3} className="my-2">
                    <MDBCard alignment="center">
                        <MDBCardBody>
                        {/* <div>
                            <img src={pearlicon} alt="" style={{height: "65px", width: "65px"}}/>
                        </div> */}
                        <MDBCardText className="text-center fw-bold">Buy any Clock Merchandies</MDBCardText>
                        <MDBCardText>Quest Duration: 30 Days</MDBCardText>
                        <MDBCardText>Claimable Token: &nbsp;
                        <p style={{fontSize: "10px"}}>Basic: 200 MMT + 400 MCT</p>
                        <p style={{fontSize: "10px"}}>Intermediate: 500 MMT + 1000 MCT</p>
                        <p style={{fontSize: "10px"}}>Master: 1000 MMT + 2000 MCT</p>
                        <p style={{fontSize: "10px"}}>Advance: 2000 MMT + 4000 MCT</p>
                        </MDBCardText>
                        
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            <MDBBtn color="warning" disabled>Accept</MDBBtn>
                        </div>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>
            </MDBRow>

            <MDBRow className="mt-5">
            <MDBCol lg={3} className="my-2">
                    <MDBCard alignment="center">
                        <MDBCardBody>
                        {/* <div>
                            <img src={pearlicon} alt="" style={{height: "65px", width: "65px"}}/>
                        </div> */}
                        <MDBCardText className="text-center fw-bold">Buy any Tools Merchandies</MDBCardText>
                        <MDBCardText>Quest Duration: 30 Days</MDBCardText>
                        <MDBCardText>Claimable Token: &nbsp;
                        <p style={{fontSize: "10px"}}>Iron: 200 MMT + 400 MCT</p>
                        <p style={{fontSize: "10px"}}>Steel: 500 MMT + 1000 MCT</p>
                        <p style={{fontSize: "10px"}}>Mithril: 1000 MMT + 2000 MCT</p>
                        <p style={{fontSize: "10px"}}>Adamant: 2000 MMT + 4000 MCT</p>
                        </MDBCardText>
                        
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            <MDBBtn color="warning" disabled>Accept</MDBBtn>
                        </div>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>
                <MDBCol lg={3} className="my-2">
                    <MDBCard alignment="center">
                        <MDBCardBody>
                        {/* <div>
                            <img src={pearlicon} alt="" style={{height: "65px", width: "65px"}}/>
                        </div> */}
                        <MDBCardText className="text-center fw-bold">Buy Ring of Energy</MDBCardText>
                        <MDBCardText>Quest Duration: 30 Days</MDBCardText>
                        <MDBCardText>Claimable Token: &nbsp;
                        1,000 MMT + 2,000 MCT
                        </MDBCardText>
                        
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            <MDBBtn color="warning" disabled>Accept</MDBBtn>
                        </div>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>
                <MDBCol lg={3} className="my-2">
                    <MDBCard alignment="center">
                        <MDBCardBody>
                        {/* <div>
                            <img src={pearlicon} alt="" style={{height: "65px", width: "65px"}}/>
                        </div> */}
                        <MDBCardText className="text-center fw-bold">Buy 100k MMT Token</MDBCardText>
                        <MDBCardText>Quest Duration: 2 Days</MDBCardText>
                        <MDBCardText>Claimable Token: &nbsp;
                        10,000 MCT
                        </MDBCardText>
                        
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            <MDBBtn color="warning" disabled>Accept</MDBBtn>
                        </div>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>
                <MDBCol lg={3} className="my-2">
                    <MDBCard alignment="center">
                        <MDBCardBody>
                        {/* <div>
                            <img src={pearlicon} alt="" style={{height: "65px", width: "65px"}}/>
                        </div> */}
                        <MDBCardText className="text-center fw-bold">Buy 200k MCT Token</MDBCardText>
                        <MDBCardText>Quest Duration: 2 Days</MDBCardText>
                        <MDBCardText>Claimable Token: &nbsp;
                        3,000 MMT
                        </MDBCardText>
                        
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            <MDBBtn color="warning" disabled>Accept</MDBBtn>
                        </div>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>
                
            </MDBRow>

            <MDBRow className="mt-5">
            <MDBCol lg={3} className="my-2">
                    <MDBCard alignment="center">
                        <MDBCardBody>
                        {/* <div>
                            <img src={pearlicon} alt="" style={{height: "65px", width: "65px"}}/>
                        </div> */}
                        <MDBCardText className="text-center fw-bold">Owned atleast 100k MMT Token</MDBCardText>
                        <MDBCardText>Quest Duration: 7 Days</MDBCardText>
                        <MDBCardText>Claimable Token: &nbsp;
                        10,000 MCT
                        </MDBCardText>
                        
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            <MDBBtn color="warning" disabled>Accept</MDBBtn>
                        </div>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>
                <MDBCol lg={3} className="my-2">
                    <MDBCard alignment="center">
                        <MDBCardBody>
                        {/* <div>
                            <img src={pearlicon} alt="" style={{height: "65px", width: "65px"}}/>
                        </div> */}
                        <MDBCardText className="text-center fw-bold">Owned atleast 100k MCT Token</MDBCardText>
                        <MDBCardText>Quest Duration: 7 Days</MDBCardText>
                        <MDBCardText>Claimable Token: &nbsp;
                        10,000 MMT
                        </MDBCardText>
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            <MDBBtn color="warning" disabled>Accept</MDBBtn>
                        </div>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>
                <MDBCol lg={3} className="my-2">
                    <MDBCard alignment="center">
                        <MDBCardBody>
                        {/* <div>
                            <img src={pearlicon} alt="" style={{height: "65px", width: "65px"}}/>
                        </div> */}
                        <MDBCardText className="text-center fw-bold">Leaderboard (end of the month)</MDBCardText>
                        {/* <MDBCardText>Quest Duration: 2 Days</MDBCardText> */}
                        <MDBCardText>Claimable Token: &nbsp;
                        5,000 MMT + 10,000 MCT
                        </MDBCardText>
                      
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            <MDBBtn color="warning" disabled>Accept</MDBBtn>
                        </div>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>
                <MDBCol lg={3} className="my-2">
                    <MDBCard alignment="center">
                        <MDBCardBody>
                        {/* <div>
                            <img src={pearlicon} alt="" style={{height: "65px", width: "65px"}}/>
                        </div> */}
                        <MDBCardText className="text-center fw-bold">Top Leaderboard for Fiesta (end of the month)</MDBCardText>
                        {/* <MDBCardText>Quest Duration: 7 Days</MDBCardText> */}
                        <MDBCardText>Claimable Token: &nbsp;
                        500 MMT + 1,000 MCT
                        </MDBCardText>
                       
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            <MDBBtn color="warning" disabled>Accept</MDBBtn>
                        </div>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>
                
                
            </MDBRow>
        </MDBContainer>
    )
}

export default AirDropTabRuby;