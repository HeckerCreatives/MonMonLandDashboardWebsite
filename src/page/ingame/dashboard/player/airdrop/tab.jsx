import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBCardText, MDBProgress, MDBProgressBar, MDBTypography, MDBCardFooter } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import FlipCountdown from '@rumess/react-flip-countdown';
import Swal from "sweetalert2";
import { useBalance, useAccount, useSendTransaction,} from 'wagmi'
import { abi , isgamelogin} from "../../../../../component/utils"
import { parseEther , parseGwei} from 'viem'
const AirDropTab = ({usersubscription}) => {
    const [mmtairdrop, setMmtAirDrop] = useState(0)
    const [mctairdrop, setMctAirDrop] = useState(0)
    const [quest1, setQuest1] = useState([])
    const [quest2, setQuest2] = useState([])
    const [quest3, setQuest3] = useState([])
    const [quest4, setQuest4] = useState([])
    const [quest5, setQuest5] = useState([])
    const [quest6, setQuest6] = useState([])
    const [quest7, setQuest7] = useState([])
    const [quest8, setQuest8] = useState([])
    const [quest9, setQuest9] = useState([])
    const [quest10, setQuest10] = useState([])
    const [quest11, setQuest11] = useState([])
    const [quest12, setQuest12] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const [questclaim, setQuestClaimable] = useState([])
    const { address } = useAccount();
    const [dbwallet, setDbWallet] = useState('')
    const userbnbbalance = useBalance({
        address: address,
    })
    const { sendTransaction } = useSendTransaction()
    const craetorwallet = process.env.REACT_APP_MARKETING

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
                const quest1 = data.data.filter(e => e.questid == 1)
                const quest2 = data.data.filter(e => e.questid == 2)
                const quest3 = data.data.filter(e => e.questid == 3)
                const quest4 = data.data.filter(e => e.questid == 4)
                const quest5 = data.data.filter(e => e.questid == 5)
                const quest6 = data.data.filter(e => e.questid == 6)
                const quest7 = data.data.filter(e => e.questid == 7)
                const quest8 = data.data.filter(e => e.questid == 8)
                const quest9 = data.data.filter(e => e.questid == 9)
                const quest10 = data.data.filter(e => e.questid == 10)
                const quest11 = data.data.filter(e => e.questid == 11)
                const quest12 = data.data.filter(e => e.questid == 12)
                setQuest1(quest1)
                setQuest2(quest2)
                setQuest3(quest3)
                setQuest4(quest4)
                setQuest5(quest5)
                setQuest6(quest6)
                setQuest7(quest7)
                setQuest8(quest8)
                setQuest9(quest9)
                setQuest10(quest10)
                setQuest11(quest11)
                setQuest12(quest12)
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
            case 2:
            acceptquest = {
                questid: 2,
                questtitle: "Get total of 20 Direct Points",
                mmttokenreward: usersubscription == "Pearlplus" ? 200 : usersubscription == "Ruby" ? 500 : usersubscription == "Emerald" ? 1000 : 2000,
                mcttokenreward: usersubscription == "Pearlplus" ? 400 : usersubscription == "Ruby" ? 1000 : usersubscription == "Emerald" ? 2000 : 4000,
                acceptAt: new Date().toLocaleString(),
                expiredAt: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleString(),
            }
            break;
            case 3:
            acceptquest = {
                questid: 3,
                questtitle: "Get 10k Account Total Points",
                mmttokenreward: usersubscription == "Pearlplus" ? 200 : usersubscription == "Ruby" ? 500 : usersubscription == "Emerald" ? 1000 : 2000,
                mcttokenreward: usersubscription == "Pearlplus" ? 400 : usersubscription == "Ruby" ? 1000 : usersubscription == "Emerald" ? 2000 : 4000,
                acceptAt: new Date().toLocaleString(),
                expiredAt: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleString(),
            }
            break;
            case 4:
            acceptquest = {
                questid: 4,
                questtitle: "Buy any Clock Merchandies",
                mmttokenreward: 0,
                mcttokenreward: 0,
                acceptAt: new Date().toLocaleString(),
                expiredAt: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleString(),
            }
            break;
            case 5:
            acceptquest = {
                questid: 5,
                questtitle: "Buy any Tools Merchandies",
                mmttokenreward: 0,
                mcttokenreward: 0,
                acceptAt: new Date().toLocaleString(),
                expiredAt: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleString(),
            }
            break;
            case 6:
            acceptquest = {
                questid: 6,
                questtitle: "Buy Ring of Energy",
                mmttokenreward: 1000 ,
                mcttokenreward:  2000 ,
                acceptAt: new Date().toLocaleString(),
                expiredAt: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleString(),
            }
            break;
            case 7:
            acceptquest = {
                questid: 7,
                questtitle: "Buy 100k MMT Token",
                mcttokenreward:  10000,
                acceptAt: new Date().toLocaleString(),
                expiredAt: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleString(),
            }
            break;
            case 8:
            acceptquest = {
                questid: 8,
                questtitle: "Buy 100k MCT Token",
                mmttokenreward:  3000,
                acceptAt: new Date().toLocaleString(),
                expiredAt: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleString(),
            }
            break;
            case 9:
            acceptquest = {
                questid: 9,
                questtitle: "Owned atleast 500k MMT Token",
                mcttokenreward:  10000,
                acceptAt: new Date().toLocaleString(),
                expiredAt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleString(),
            }
            break;
            case 10:
            acceptquest = {
                questid: 10,
                questtitle: "Owned atleast 500k MCT Token",
                mmttokenreward:  10000,
                acceptAt: new Date().toLocaleString(),
                expiredAt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleString(),
            }
            break;
            case 11:
            acceptquest = {
                questid: 11,
                questtitle: "Top 1 Leaderboard (end of the month)",
                mmttokenreward:  5000,
                mcttokenreward:  10000,
                acceptAt: new Date().toLocaleString(),
                // expiredAt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleString(),
            }
            break;
            case 12:
            acceptquest = {
                questid: 12,
                questtitle: "Top 1 Leaderboard for Fiesta (end of the month)",
                mmttokenreward:  500,
                mcttokenreward:  1000,
                acceptAt: new Date().toLocaleString(),  
                // expiredAt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleString(),
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

        if(mmtairdrop >= 1000000 && mctairdrop >= 10000000){
            setIsLoading(false)
            Swal.fire({
                icon: "warning",
                title: "Warning",
                text: "Attention: Can't Claim Rewards Airdrop Already Full"
            })
            return
        }

        if(mmtairdrop >= 1000000 && mctairdrop < 10000000){
            Swal.fire({
                icon: "warning",
                title: "Warning",
                text: "Attention: Some Rewards Can't be claim do you want to proceed?"
            })
            Swal.fire({
                title: "Warning!",
                text: "Attention: Some Rewards Can't be claim do you want to proceed?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then((result) => {
                if (result.isConfirmed) {
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
                        text: "Insufficient funds, at least 0.0018 BNB Required!",
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    })
                    }
                }
              });
        } else {
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
                  text: "Insufficient funds, at least 0.0018 BNB Required!",
                  allowEscapeKey: false,
                  allowOutsideClick: false
                })
              }
        }

        

       
    }

    const mmtair = mmtairdrop < 1000000 ? (mmtairdrop / 1000000) * 100 : 100
    const mctair = mctairdrop < 10000000 ? (mctairdrop / 10000000) * 100 : 100
    const currentDateTime = new Date();
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
                        200 MMT + 400 MCT
                        </MDBCardText>
                        {   usersubscription == "Pearlplus" ?

                            quest1.length != 0 && questclaim.Quest1 == "notclaimable" && currentDateTime < new Date(quest1[0].expiredAt) && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-primary">On Going</span>
                            </MDBCardText>
                            :
                            quest1.length != 0 && questclaim.Quest1 == "claimable" && currentDateTime < new Date(quest1[0].expiredAt) && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-success">{quest1[0]?.claimedAt != null ? "Claimed" : "Claimable"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText>Status: &nbsp;
                            <span className={quest1.length != 0 && usersubscription == "Pearlplus" ? "text-danger" : "text-warning"}>{quest1.length != 0 && usersubscription == "Pearlplus" ? "Expired" : "Not Accepted"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText className="text-info">For Pearlplus Users Only</MDBCardText>
                        }
                        {
                            quest1[0]?.claimedAt == null && usersubscription == "Pearlplus" &&
                            <MDBCardText className="text-info">Claim Before: {quest1[0]?.expiredAt}</MDBCardText>
                        }
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div className="">
                            {
                                quest1.length != 0 && usersubscription == "Pearlplus" ?
                                <MDBBtn disabled={quest1[0].claimedAt != null || currentDateTime > new Date(quest1[0].expiredAt) || questclaim.Quest1 == "notclaimable"} color="warning" onClick={(e) => handleClaimQuest(e,1)}>{quest1[0].claimedAt != null ? "Claimed" : currentDateTime > new Date(quest1[0].expiredAt) ? "Expired" : questclaim.Quest1 == "notclaimable" ? "On Going": "Claim Now"}</MDBBtn>
                                :
                                <MDBBtn disabled={usersubscription != "Pearlplus"} color="warning" onClick={(e) => handleAcceptQuest(e,1)}>Accept</MDBBtn>
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
                        500 MMT + 1000 MCT
                        </MDBCardText>
                        {   usersubscription == "Pearlplus" ?

                            quest2.length != 0 && questclaim.Quest2 == "notclaimable" && currentDateTime < new Date(quest2[0].expiredAt) && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-primary">On Going</span>
                            </MDBCardText>
                            :
                            quest2.length != 0 && questclaim.Quest2 == "claimable" && currentDateTime < new Date(quest2[0].expiredAt) && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-success">{quest2[0]?.claimedAt != null ? "Claimed" : "Claimable"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText>Status: &nbsp;
                            <span className={quest2.length != 0 && usersubscription == "Pearlplus" ? "text-danger" : "text-warning"}>{quest2.length != 0 && usersubscription == "Pearlplus" ? "Expired" : "Not Accepted"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText className="text-info">For Pearlplus Users Only</MDBCardText>
                        }
                        {
                            quest2[0]?.claimedAt == null && usersubscription == "Pearlplus" && 
                            <MDBCardText className="text-info">Claim Before: {quest2[0]?.expiredAt}</MDBCardText>
                        }
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            {/* <MDBBtn color="warning" disabled>Accept</MDBBtn> */}
                            {
                                quest2.length != 0 && usersubscription == "Pearlplus" ?
                                <MDBBtn disabled={quest2[0].claimedAt != null || currentDateTime > new Date(quest2[0].expiredAt) || questclaim.Quest2 == "notclaimable"} color="warning" onClick={(e) => handleClaimQuest(e,2)}>{quest2[0].claimedAt != null ? "Claimed" : currentDateTime > new Date(quest2[0].expiredAt) ? "Expired" : questclaim.Quest2 == "notclaimable" ? "On Going": "Claim Now"}</MDBBtn>
                                :
                                <MDBBtn disabled={usersubscription != "Pearlplus"} color="warning" onClick={(e) => handleAcceptQuest(e,2)}>Accept</MDBBtn>
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
                        <MDBCardText className="text-center fw-bold">Get 10k Account Total Points</MDBCardText>
                        <MDBCardText>Quest Duration: 30 Days</MDBCardText>
                        <MDBCardText>Claimable Token: &nbsp;
                        500 MMT + 1000 MCT
                        </MDBCardText>
                        {   usersubscription == "Pearlplus" ?

                            quest3.length != 0 && questclaim.Quest3 == "notclaimable" && currentDateTime < new Date(quest3[0].expiredAt) && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-primary">On Going</span>
                            </MDBCardText>
                            :
                            quest3.length != 0 && questclaim.Quest3 == "claimable" && currentDateTime < new Date(quest3[0].expiredAt) && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-success">{quest3[0]?.claimedAt != null ? "Claimed" : "Claimable"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText>Status: &nbsp;
                            <span className={quest3.length != 0 && usersubscription == "Pearlplus" ? "text-danger" : "text-warning"}>{quest3.length != 0 && usersubscription == "Pearlplus" ? "Expired" : "Not Accepted"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText className="text-info">For Pearlplus Users Only</MDBCardText>
                        }
                        {
                            quest3[0]?.claimedAt == null && usersubscription == "Pearlplus" && 
                            <MDBCardText className="text-info">Claim Before: {quest3[0]?.expiredAt}</MDBCardText>
                        }
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            {/* <MDBBtn color="warning" disabled>Accept</MDBBtn> */}
                            {
                                quest3.length != 0 && usersubscription == "Pearlplus" ?
                                <MDBBtn disabled={quest3[0].claimedAt != null || currentDateTime > new Date(quest3[0].expiredAt) || questclaim.Quest3 == "notclaimable"} color="warning" onClick={(e) => handleClaimQuest(e,3)}>{quest3[0].claimedAt != null ? "Claimed" : currentDateTime > new Date(quest3[0].expiredAt) ? "Expired" : questclaim.Quest3 == "notclaimable" ? "On Going": "Claim Now"}</MDBBtn>
                                :
                                <MDBBtn disabled={usersubscription != "Pearlplus"} color="warning" onClick={(e) => handleAcceptQuest(e,3)}>Accept</MDBBtn>
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
                        <MDBCardText className="text-center fw-bold">Buy any Clock Merchandies</MDBCardText>
                        <MDBCardText>Quest Duration: 30 Days</MDBCardText>
                        <MDBCardText>Claimable Token: &nbsp;
                        <p style={{fontSize: "10px"}}>Basic: 200 MMT + 400 MCT</p>
                        <p style={{fontSize: "10px"}}>Intermediate: 500 MMT + 1000 MCT</p>
                        <p style={{fontSize: "10px"}}>Master: 1000 MMT + 2000 MCT</p>
                        <p style={{fontSize: "10px"}}>Advance: 2000 MMT + 4000 MCT</p>
                        </MDBCardText>
                        {   usersubscription == "Pearlplus" ?

                            quest4.length != 0 && questclaim.Quest4 == "notclaimable" && currentDateTime < new Date(quest4[0].expiredAt) && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-primary">On Going</span>
                            </MDBCardText>
                            :
                            quest4.length != 0 && questclaim.Quest4 == "claimable" && currentDateTime < new Date(quest4[0].expiredAt) && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-success">{quest4[0]?.claimedAt != null ? "Claimed" : "Claimable"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText>Status: &nbsp;
                            <span className={quest4.length != 0 && usersubscription == "Pearlplus" ? "text-danger" : "text-warning"}>{quest4.length != 0 && usersubscription == "Pearlplus" ? "Expired" : "Not Accepted"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText className="text-info">For Pearlplus Users Only</MDBCardText>
                        }
                        {
                            quest4[0]?.claimedAt == null && usersubscription == "Pearlplus" && 
                            <MDBCardText className="text-info">Claim Before: {quest4[0]?.expiredAt}</MDBCardText>
                        }
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            {
                                quest4.length != 0 && usersubscription == "Pearlplus" ?
                                <MDBBtn disabled={quest4[0].claimedAt != null || currentDateTime > new Date(quest4[0].expiredAt) || questclaim.Quest4 == "notclaimable"} color="warning" onClick={(e) => handleClaimQuest(e,4)}>{quest4[0].claimedAt != null ? "Claimed" : currentDateTime > new Date(quest4[0].expiredAt) ? "Expired" : questclaim.Quest4 == "notclaimable" ? "On Going": "Claim Now"}</MDBBtn>
                                :
                                <MDBBtn disabled={usersubscription != "Pearlplus"} color="warning" onClick={(e) => handleAcceptQuest(e,4)}>Accept</MDBBtn>
                            }
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
                        {   usersubscription == "Pearlplus" ?

                            quest5.length != 0 && questclaim.Quest5 == "notclaimable" && currentDateTime < new Date(quest5[0].expiredAt) && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-primary">On Going</span>
                            </MDBCardText>
                            :
                            quest5.length != 0 && questclaim.Quest5 == "claimable" && currentDateTime < new Date(quest5[0].expiredAt) && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-success">{quest5[0]?.claimedAt != null ? "Claimed" : "Claimable"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText>Status: &nbsp;
                            <span className={quest5.length != 0 && usersubscription == "Pearlplus" ? "text-danger" : "text-warning"}>{quest5.length != 0 && usersubscription == "Pearlplus" ? "Expired" : "Not Accepted"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText className="text-info">For Pearlplus Users Only</MDBCardText>
                        }
                        {
                            quest5[0]?.claimedAt == null && usersubscription == "Pearlplus" && 
                            <MDBCardText className="text-info">Claim Before: {quest5[0]?.expiredAt}</MDBCardText>
                        }
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            {
                                quest5.length != 0 && usersubscription == "Pearlplus" ?
                                <MDBBtn disabled={quest5[0].claimedAt != null || currentDateTime > new Date(quest5[0].expiredAt) || questclaim.Quest5 == "notclaimable"} color="warning" onClick={(e) => handleClaimQuest(e,5)}>{quest5[0].claimedAt != null ? "Claimed" : currentDateTime > new Date(quest5[0].expiredAt) ? "Expired" : questclaim.Quest5 == "notclaimable" ? "On Going": "Claim Now"}</MDBBtn>
                                :
                                <MDBBtn disabled={usersubscription != "Pearlplus"} color="warning" onClick={(e) => handleAcceptQuest(e,5)}>Accept</MDBBtn>
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
                        <MDBCardText className="text-center fw-bold">Buy Ring of Energy</MDBCardText>
                        <MDBCardText>Quest Duration: 30 Days</MDBCardText>
                        <MDBCardText>Claimable Token: &nbsp;
                        1,000 MMT + 2,000 MCT
                        </MDBCardText>
                        {   usersubscription == "Pearlplus" ?

                            quest6.length != 0 && questclaim.Quest6 == "notclaimable" && currentDateTime < new Date(quest6[0].expiredAt) && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-primary">On Going</span>
                            </MDBCardText>
                            :
                            quest6.length != 0 && questclaim.Quest6 == "claimable" && currentDateTime < new Date(quest6[0].expiredAt) && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-success">{quest6[0]?.claimedAt != null ? "Claimed" : "Claimable"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText>Status: &nbsp;
                            <span className={quest6.length != 0 && usersubscription == "Pearlplus" ? "text-danger" : "text-warning"}>{quest6.length != 0 && usersubscription == "Pearlplus" ? "Expired" : "Not Accepted"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText className="text-info">For Pearlplus Users Only</MDBCardText>
                        }
                        {
                            quest6[0]?.claimedAt == null && usersubscription == "Pearlplus" && 
                            <MDBCardText className="text-info">Claim Before: {quest6[0]?.expiredAt}</MDBCardText>
                        }
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            {/* <MDBBtn color="warning" disabled>Accept</MDBBtn> */}
                            {
                                quest6.length != 0 && usersubscription == "Pearlplus" ?
                                <MDBBtn disabled={quest6[0]?.claimedAt != null || currentDateTime > new Date(quest6[0]?.expiredAt) || questclaim.Quest6 == "notclaimable"} color="warning" onClick={(e) => handleClaimQuest(e,6)}>{quest6[0]?.claimedAt != null ? "Claimed" : currentDateTime > new Date(quest6[0]?.expiredAt) ? "Expired" : questclaim.Quest6 == "notclaimable" ? "On Going" : "Claim Now"}</MDBBtn>
                                :
                                <MDBBtn disabled={usersubscription != "Pearlplus"} color="warning" onClick={(e) => handleAcceptQuest(e,6)}>Accept</MDBBtn>
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
                        <MDBCardText className="text-center fw-bold">Buy 100k MMT Token</MDBCardText>
                        <MDBCardText>Quest Duration: 2 Days</MDBCardText>
                        <MDBCardText>Claimable Token: &nbsp;
                        10,000 MCT
                        </MDBCardText>
                        {   usersubscription == "Pearlplus" ?

                            quest7.length != 0 && questclaim.Quest7 == "notclaimable" && currentDateTime < new Date(quest7[0].expiredAt) && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-primary">On Going</span>
                            </MDBCardText>
                            :
                            quest7.length != 0 && questclaim.Quest7 == "claimable" && currentDateTime < new Date(quest7[0].expiredAt) && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-success">{quest7[0]?.claimedAt != null ? "Claimed" : "Claimable"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText>Status: &nbsp;
                            <span className={quest7.length != 0 && usersubscription == "Pearlplus" ? "text-danger" : "text-warning"}>{quest7.length != 0 && usersubscription == "Pearlplus" ? "Expired" : "Not Accepted"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText className="text-info">For Pearlplus Users Only</MDBCardText>
                        }
                        {
                            quest7[0]?.claimedAt == null && usersubscription == "Pearlplus" && 
                            <MDBCardText className="text-info">Claim Before: {quest7[0]?.expiredAt}</MDBCardText>
                        }
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            {/* <MDBBtn color="warning" disabled>Accept</MDBBtn> */}
                            {
                                quest7.length != 0 && usersubscription == "Pearlplus" ?
                                <MDBBtn disabled={quest7[0]?.claimedAt != null || currentDateTime > new Date(quest7[0]?.expiredAt) || questclaim.Quest7 == "notclaimable"} color="warning" onClick={(e) => handleClaimQuest(e,7)}>{quest7[0]?.claimedAt != null ? "Claimed" : currentDateTime > new Date(quest7[0]?.expiredAt) ? "Expired" : questclaim.Quest7 == "notclaimable" ? "On Going" : "Claim Now"}</MDBBtn>
                                :
                                <MDBBtn disabled={usersubscription != "Pearlplus"} color="warning" onClick={(e) => handleAcceptQuest(e,7)}>Accept</MDBBtn>
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
                        <MDBCardText className="text-center fw-bold">Buy 100k MCT Token</MDBCardText>
                        <MDBCardText>Quest Duration: 2 Days</MDBCardText>
                        <MDBCardText>Claimable Token: &nbsp;
                        3,000 MMT
                        </MDBCardText>
                        {   usersubscription == "Pearlplus" ?

                            quest8.length != 0 && questclaim.Quest8 == "notclaimable" && currentDateTime < new Date(quest8[0].expiredAt) && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-primary">On Going</span>
                            </MDBCardText>
                            :
                            quest8.length != 0 && questclaim.Quest8 == "claimable" && currentDateTime < new Date(quest8[0].expiredAt) && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-success">{quest8[0]?.claimedAt != null ? "Claimed" : "Claimable"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText>Status: &nbsp;
                            <span className={quest8.length != 0 && usersubscription == "Pearlplus" ? "text-danger" : "text-warning"}>{quest8.length != 0 && usersubscription == "Pearlplus" ? "Expired" : "Not Accepted"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText className="text-info">For Pearlplus Users Only</MDBCardText>
                        }
                        {
                            quest8[0]?.claimedAt == null && usersubscription == "Pearlplus" && 
                            <MDBCardText className="text-info">Claim Before: {quest8[0]?.expiredAt}</MDBCardText>
                        }
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            {/* <MDBBtn color="warning" disabled>Accept</MDBBtn> */}
                            {
                                quest8.length != 0 && usersubscription == "Pearlplus" ?
                                <MDBBtn disabled={quest8[0]?.claimedAt != null || currentDateTime > new Date(quest8[0]?.expiredAt) || questclaim.Quest8 == "notclaimable"} color="warning" onClick={(e) => handleClaimQuest(e,8)}>{quest8[0]?.claimedAt != null ? "Claimed" : currentDateTime > new Date(quest8[0]?.expiredAt) ? "Expired" : questclaim.Quest8 == "notclaimable" ? "On Going" : "Claim Now"}</MDBBtn>
                                :
                                <MDBBtn disabled={usersubscription != "Pearlplus"} color="warning" onClick={(e) => handleAcceptQuest(e,8)}>Accept</MDBBtn>
                            }
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
                        <MDBCardText className="text-center fw-bold">Owned atleast 500k MMT Token</MDBCardText>
                        <MDBCardText>Quest Duration: 7 Days</MDBCardText>
                        <MDBCardText>Claimable Token: &nbsp;
                        10,000 MCT
                        </MDBCardText>
                        {   usersubscription == "Pearlplus" ?

                            quest9.length != 0 && questclaim.Quest9 == "notclaimable" && currentDateTime < new Date(quest9[0].expiredAt) && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-primary">On Going</span>
                            </MDBCardText>
                            :
                            quest9.length != 0 && questclaim.Quest9 == "claimable" && currentDateTime < new Date(quest9[0].expiredAt) && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-success">{quest9[0]?.claimedAt != null ? "Claimed" : "Claimable"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText>Status: &nbsp;
                            <span className={quest9.length != 0 && usersubscription == "Pearlplus" ? "text-danger" : "text-warning"}>{quest9.length != 0 && usersubscription == "Pearlplus" ? "Expired" : "Not Accepted"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText className="text-info">For Pearlplus Users Only</MDBCardText>
                        }
                        {
                            quest9[0]?.claimedAt == null && usersubscription == "Pearlplus" && 
                            <MDBCardText className="text-info">Claim Before: {quest9[0]?.expiredAt}</MDBCardText>
                        }
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            {/* <MDBBtn color="warning" disabled>Accept</MDBBtn> */}
                            {
                                quest9.length != 0 && usersubscription == "Pearlplus" ?
                                <MDBBtn disabled={quest9[0]?.claimedAt != null || currentDateTime > new Date(quest9[0]?.expiredAt) || questclaim.Quest9 == "notclaimable"} color="warning" onClick={(e) => handleClaimQuest(e,9)}>{quest9[0]?.claimedAt != null ? "Claimed" : currentDateTime > new Date(quest9[0]?.expiredAt) ? "Expired" : questclaim.Quest9 == "notclaimable" ? "On Going" : "Claim Now"}</MDBBtn>
                                :
                                <MDBBtn disabled={usersubscription != "Pearlplus"} color="warning" onClick={(e) => handleAcceptQuest(e,9)}>Accept</MDBBtn>
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
                        <MDBCardText className="text-center fw-bold">Owned atleast 500k MCT Token</MDBCardText>
                        <MDBCardText>Quest Duration: 7 Days</MDBCardText>
                        <MDBCardText>Claimable Token: &nbsp;
                        10,000 MMT
                        </MDBCardText>
                        {   usersubscription == "Pearlplus" ?

                            quest10.length != 0 && questclaim.Quest10 == "notclaimable" && currentDateTime < new Date(quest10[0].expiredAt) && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-primary">On Going</span>
                            </MDBCardText>
                            :
                            quest10.length != 0 && questclaim.Quest10 == "claimable" && currentDateTime < new Date(quest10[0].expiredAt) && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-success">{quest10[0]?.claimedAt != null ? "Claimed" : "Claimable"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText>Status: &nbsp;
                            <span className={quest10.length != 0 && usersubscription == "Pearlplus" ? "text-danger" : "text-warning"}>{quest10.length != 0 && usersubscription == "Pearlplus" ? "Expired" : "Not Accepted"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText className="text-info">For Pearlplus Users Only</MDBCardText>
                        }
                        {
                            quest10[0]?.claimedAt == null && usersubscription == "Pearlplus" && 
                            <MDBCardText className="text-info">Claim Before: {quest10[0]?.expiredAt}</MDBCardText>
                        }
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            {/* <MDBBtn color="warning" disabled>Accept</MDBBtn> */}
                            {
                                quest10.length != 0 && usersubscription == "Pearlplus" ?
                                <MDBBtn disabled={quest10[0]?.claimedAt != null || currentDateTime > new Date(quest10[0]?.expiredAt) || questclaim.Quest10 == "notclaimable"} color="warning" onClick={(e) => handleClaimQuest(e,10)}>{quest10[0]?.claimedAt != null ? "Claimed" : currentDateTime > new Date(quest10[0]?.expiredAt) ? "Expired" : questclaim.Quest10 == "notclaimable" ? "On Going" : "Claim Now"}</MDBBtn>
                                :
                                <MDBBtn disabled={usersubscription != "Pearlplus"} color="warning" onClick={(e) => handleAcceptQuest(e,10)}>Accept</MDBBtn>
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
                        <MDBCardText className="text-center fw-bold">Top 1 Leaderboard (end of the month)</MDBCardText>
                        {/* <MDBCardText>Quest Duration: 2 Days</MDBCardText> */}
                        <MDBCardText>Claimable Token: &nbsp;
                        5,000 MMT + 10,000 MCT
                        </MDBCardText>
                        {   usersubscription == "Pearlplus" ?

                            quest11.length != 0 && questclaim.Quest11 == "notclaimable"  && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-primary">On Going</span>
                            </MDBCardText>
                            :
                            quest11.length != 0 && questclaim.Quest11 == "claimable"  && usersubscription == "Pearlplus" ?
                            <MDBCardText>Status: &nbsp;
                            <span className="text-success">{quest11[0]?.claimedAt != null ? "Claimed" : "Claimable"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText>Status: &nbsp;
                            <span className={quest11.length != 0 && usersubscription == "Pearlplus" ? "text-danger" : "text-warning"}>{quest11.length != 0 && usersubscription == "Pearlplus" ? "Expired" : "Not Accepted"}</span>
                            </MDBCardText>
                            :
                            <MDBCardText className="text-info">For Pearlplus Users Only</MDBCardText>
                        }
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            {
                                quest11.length != 0 && usersubscription == "Pearlplus" ?
                                <MDBBtn disabled={quest11[0]?.claimedAt != null || questclaim.Quest11 == "notclaimable"} color="warning" onClick={(e) => handleClaimQuest(e,11)}>{quest11[0]?.claimedAt != null ? "Claimed" : questclaim.Quest11 == "notclaimable" ? "On Going" : "Claim Now"}</MDBBtn>
                                :
                                <MDBBtn disabled={usersubscription != "Pearlplus"} color="warning" onClick={(e) => handleAcceptQuest(e,11)}>Accept</MDBBtn>
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
                        <MDBCardText className="text-center fw-bold">Top 1 Leaderboard for Fiesta (end of the month)</MDBCardText>
                        {/* <MDBCardText>Quest Duration: 7 Days</MDBCardText> */}
                        <MDBCardText>Claimable Token: &nbsp;
                        500 MMT + 1,000 MCT
                        </MDBCardText>
                        {   usersubscription == "Pearlplus" ?

                        quest12.length != 0 && questclaim.Quest12 == "notclaimable"  && usersubscription == "Pearlplus" ?
                        <MDBCardText>Status: &nbsp;
                        <span className="text-primary">On Going</span>
                        </MDBCardText>
                        :
                        quest12.length != 0 && questclaim.Quest12 == "claimable"  && usersubscription == "Pearlplus" ?
                        <MDBCardText>Status: &nbsp;
                        <span className="text-success">{quest12[0]?.claimedAt != null ? "Claimed" : "Claimable"}</span>
                        </MDBCardText>
                        :
                        <MDBCardText>Status: &nbsp;
                        <span className={quest12.length != 0 && usersubscription == "Pearlplus" ? "text-danger" : "text-warning"}>{quest12.length != 0 && usersubscription == "Pearlplus" ? "Expired" : "Not Accepted"}</span>
                        </MDBCardText>
                        :
                        <MDBCardText className="text-info">For Pearlplus Users Only</MDBCardText>
                        }
                        </MDBCardBody>
                        <MDBCardFooter>
                        <div>
                            {
                                quest12.length != 0 && usersubscription == "Pearlplus" ?
                                <MDBBtn disabled={quest12[0]?.claimedAt != null || questclaim.Quest12 == "notclaimable"} color="warning" onClick={(e) => handleClaimQuest(e,12)}>{quest12[0]?.claimedAt != null ? "Claimed" : questclaim.Quest12 == "notclaimable" ? "On Going" : "Claim Now"}</MDBBtn>
                                :
                                <MDBBtn disabled={usersubscription != "Pearlplus"} color="warning" onClick={(e) => handleAcceptQuest(e,12)}>Accept</MDBBtn>
                            }
                        </div>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>
                
                
            </MDBRow>
        </MDBContainer>
    )
}

export default AirDropTab;