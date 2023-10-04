import { PlayFabClient } from "playfab-sdk";
import Swal from "sweetalert2";

export const UpgradeSubscriptionApi = async (playerPlayfabId, subscriptionAmount) => {
    const playFabUserData = {
        Username: "monmonland",            
        Password: "monmonlandgames",           
    };

    return new Promise((resolve, reject) => {
        PlayFabClient.LoginWithPlayFab(playFabUserData, (error, result) => {
            if (error) {
                reject(error);
            } else {
                PlayFabClient.ExecuteCloudScript({
                    FunctionName: "Topup",
                    FunctionParameter: {
                        playerId: playerPlayfabId,
                        topupAmount: subscriptionAmount,
                    },
                    ExecuteCloudScript: true,
                    GeneratePlayStreamEvent: true,
                }, (error1, result1) => {
                    if (error1) {
                        reject(error1);
                    } else if (result1.data.FunctionResult.message === "success") {
                        resolve("success");
                    } else {
                        resolve(result1);
                    }
                });
            }
        });
    });
};

