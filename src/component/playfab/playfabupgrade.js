import { PlayFabClient, PlayFab } from "playfab-sdk";
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

export const UpgradeSubscriptionApi = async (playerPlayfabId, subscriptionAmount, playfabToken) => {
    console.log("hello")
    return new Promise((resolve, reject) => {
        console.log("hello3")
        PlayFab._inter = playfabToken
        console.log("hello1")
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
    });
};

