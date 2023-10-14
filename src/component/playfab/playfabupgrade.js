import { PlayFabClient } from "playfab-sdk";
import Swal from "sweetalert2";

function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
  
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }
  
    return randomString;
}

export const UpgradeSubscriptionApi = async (playerPlayfabId, subscriptionAmount) => {
    const playFabUserData = {
        CreateAccount: true,            
        CustomId: generateRandomString(10),           
    };

    return new Promise((resolve, reject) => {
        PlayFabClient.LoginWithCustomID(playFabUserData, (error, result) => {
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

