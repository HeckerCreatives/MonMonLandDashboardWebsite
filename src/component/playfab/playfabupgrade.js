import { PlayFabClient } from "playfab-sdk";
import Swal from "sweetalert2";

export const UpgradeSubscriptionApi = async (playerPlayfabId, playerUsername, subscriptionType, subscriptionAmount) => {
    const playFabUserData = {
        // TitleId: "261D1",
        Username: "monmonland",            
        Password: "monmonlandgames",           
    };
    return(
        PlayFabClient.LoginWithPlayFab( playFabUserData, (error, result) => {
            
            if(result){
               
                PlayFabClient.ExecuteCloudScript({
                    FunctionName: "Subscription",
                    FunctionParameter: {
                        playerPlayfabId: playerPlayfabId,
                        playerUsername: playerUsername,
                        subscriptionType: subscriptionType,
                        subscriptionAmount: subscriptionAmount,
                    },
                    ExecuteCloudScript: true,
                    GeneratePlayStreamEvent: true,
                }, (error1, result1) => {
                    if(result1.message === "success"){
                        Swal.fire({
                            title: "Upgrade Success",
                            icon: "success",
                            text: "Account Subscription Upgraded Successfully"
                        })
                    } else {
                        Swal.fire({
                            title: "Upgrade Unsuccessfull",
                            icon: "error",
                            text: error1.data
                        })
                    }
                })
            } else {
                Swal.fire({
                    title: "Upgrade Unsuccessfull",
                    icon: "error",
                    text: error.data
                })
            }
            
            
        })
        
    )
}