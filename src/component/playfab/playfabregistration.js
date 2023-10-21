import React from "react";
import { PlayFabClient, PlayFabAdmin, PlayFab } from "playfab-sdk";

export const Monmonregister = (username, password, phone, email, sponsor) => {
  return new Promise((resolve, reject) => {
    const playFabUserData = {
      TitleId: process.env.monmontitleid,
      Username: username,
      DisplayName: username,
      Password: password,
      Email: email,
    };

    PlayFabClient.RegisterPlayFabUser(playFabUserData, (error, result) => {
      if (result) {
        PlayFab._internalSettings.sessionTicket = result.data.SessionTicket;
        PlayFabClient.ExecuteCloudScript({
          FunctionName: "FinishRegistration",
          FunctionParameter: {
            sponsor: sponsor,
            phone: phone,
            email: email,
            playerUsername: username,
          },
          ExecuteCloudScript: true,
          GeneratePlayStreamEvent: true,
        }, (error2, result2) => {
          if (result2.data.FunctionResult.message !== "success") {
            PlayFabAdmin.DeleteMasterPlayerAccount({ PlayFabId: result.data.PlayFabId }, (error3, result3) => {
              if (result3) {
                reject({ message: "failed", data: "There is a problem in registration of your account please try again" });
              } else if (error3) {
                reject({ message: "failed", data: error3.errorMessage });
              }
            });
          } else if (error2) {
            PlayFabAdmin.DeleteMasterPlayerAccount({ PlayFabId: result.data.PlayFabId }, (error3, result3) => {
              if (result3) {
                reject({ message: "failed", data: "There is a problem in registration of your account please try again" });
              } else if (error3) {
                reject({ message: "failed", data: error3.errorMessage });
              }
            });
            reject({ message: "failed", data: error2.errorMessage });
          } else {
            resolve({ message: "success" });
          }
        });
      } else if (error) {
        reject({ message: "failed", data: error });
      }
    });
  });
};

