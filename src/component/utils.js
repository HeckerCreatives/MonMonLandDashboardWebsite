
import React, { useRef, useEffect, useState } from 'react';
import Swal from "sweetalert2"
// const DataContext = React.createContext();
import { PlayFabClient } from "playfab-sdk";
// export default DataContext;
let increment = 3;
// const auth = JSON.parse(localStorage.getItem("auth"))

export const handlePagination = (data, page, size) =>
    data?.slice((page - 1) * size, size + (page - 1) * size);


export const useActiveLinkObserver = (targetId) => {
    const targetRef = useRef(null);
    const [isIntersecting, setIsIntersecting] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      });
  
      if (targetRef.current) {
        observer.observe(targetRef.current);
      }
  
      return () => {
        observer.disconnect();
      };
    }, []);
  
    return { targetRef, isIntersecting };
  }
  
export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export const isLogin = async () => {
  return fetch(`${process.env.REACT_APP_API_URL}auth/islogin`,{
      credentials: 'include'
    })
    .then(result => result.json())
    .then(data => {
      return data
    })
}

export const logout = async () => {
  return fetch(`${process.env.REACT_APP_API_URL}auth/logout`,{
    credentials: 'include'
  })
}

//////////  For InGame ////////////

export const isgamelogin = async () => {
  return fetch(`${process.env.REACT_APP_API_URL}gameauth/islogin`,{
    credentials: 'include'
  })
  .then(result => result.json())
  .then(data => {
    return data
  })
}

export const getpearl = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}gameusers/getpearl`, {
        credentials: 'include'
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // You can choose to handle the error or rethrow it
    }
  };

export const abi = [
  {
    "type": "constructor",
    "stateMutability": "nonpayable",
    "inputs": []
  },
  {
    "type": "event",
    "name": "Airdrop",
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "holder", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
    ]
  },
  {
    "type": "event",
    "name": "Approval",
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "spender", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }
    ]
  },
  {
    "type": "event",
    "name": "EnableAccountStaking",
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "account", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "duration", "type": "uint256" }
    ]
  },
  {
    "type": "event",
    "name": "EnableStaking",
    "inputs": [
      { "indexed": false, "internalType": "bool", "name": "enabled", "type": "bool" }
    ]
  },
  {
    "type": "event",
    "name": "EnableSwapAndLiquify",
    "inputs": [
      { "indexed": false, "internalType": "bool", "name": "enabled", "type": "bool" }
    ]
  },
  {
    "type": "event",
    "name": "ExcludeFromFees",
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "account", "type": "address" },
      { "indexed": false, "internalType": "bool", "name": "isExcluded", "type": "bool" }
    ]
  },
  {
    "type": "event",
    "name": "GasForProcessingUpdated",
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "newValue", "type": "uint256" },
      { "indexed": true, "internalType": "uint256", "name": "oldValue", "type": "uint256" }
    ]
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }
    ]
  },
  {
    "type": "event",
    "name": "ProcessedDividendTracker",
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "iterations", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "claims", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "lastProcessedIndex", "type": "uint256" },
      { "indexed": true, "internalType": "bool", "name": "automatic", "type": "bool" },
      { "indexed": false, "internalType": "uint256", "name": "gas", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "processor", "type": "address" }
    ]
  },
  {
    "type": "event",
    "name": "SendDividends",
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "opAmount", "type": "uint256" },
      { "indexed": false, "internalType": "bool", "name": "success", "type": "bool" }
    ]
  },
  {
    "type": "event",
    "name": "SetAutomatedMarketMakerPair",
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "pair", "type": "address" },
      { "indexed": true, "internalType": "bool", "name": "value", "type": "bool" }
    ]
  },
  {
    "type": "event",
    "name": "SetPreSaleWallet",
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "wallet", "type": "address" }
    ]
  },
  {
    "type": "event",
    "name": "SwapAndLiquify",
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "tokensSwapped", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "ethReceived", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "tokensIntoLiqudity", "type": "uint256" }
    ]
  },
  {
    "type": "event",
    "name": "TradingEnabled",
    "inputs": []
  },
  {
    "type": "event",
    "name": "Transfer",
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "from", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "to", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }
    ]
  },
  {
    "type": "event",
    "name": "UpdateDividendTracker",
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "newAddress", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "oldAddress", "type": "address" }
    ]
  },
  {
    "type": "event",
    "name": "UpdateFees",
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "sellDeadFees", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "sellMarketingFees", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "sellLiquidityFee", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "sellRewardsFee", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "buyDeadFees", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "buyMarketingFees", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "buyLiquidityFee", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "buyRewardsFee", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "buyDevFee", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "sellDevFee", "type": "uint256" }
    ]
  },
  {
    "type": "event",
    "name": "UpdatePayoutToken",
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "token", "type": "address" }
    ]
  },
  {
    "type": "event",
    "name": "UpdateStakingAmounts",
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "duration", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
    ]
  },
  {
    "type": "event",
    "name": "UpdateTransferFee",
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "transferFee", "type": "uint256" }
    ]
  },
  {
    "type": "event",
    "name": "UpdateUniswapV2Router",
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "newAddress", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "oldAddress", "type": "address" }
    ]
  },
  {
    "type": "function",
    "name": "DEAD",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }]
  },
  {
    "type": "function",
    "name": "airdropToWallets",
    "stateMutability": "nonpayable",
    "inputs": [
      { "internalType": "address[]", "name": "airdropWallets", "type": "address[]" },
      { "internalType": "uint256[]", "name": "amount", "type": "uint256[]" }
    ],
    "outputs": []
  },
  {
    "type": "function",
    "name": "allowance",
    "stateMutability": "view",
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "address", "name": "spender", "type": "address" }
    ],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "approve",
    "stateMutability": "nonpayable",
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
  },
  {
    "type": "function",
    "name": "automatedMarketMakerPairs",
    "stateMutability": "view",
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
  },
  {
    "type": "function",
    "name": "balanceOf",
    "stateMutability": "view",
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "buyAmount",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "buyDeadFees",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "buyDevFee",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "buyLiquidityFee",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "buyMarketingFees",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "buyRewardsFee",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "claim",
    "stateMutability": "nonpayable",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "function",
    "name": "cooldowntimer",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "decimals",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }]
  },
  {
    "type": "function",
    "name": "decreaseAllowance",
    "stateMutability": "nonpayable",
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }
    ],
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
  },
  {
    "type": "function",
    "name": "devWallet",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }]
  },
  {
    "type": "function",
    "name": "dividendTokenBalanceOf",
    "stateMutability": "view",
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "dividendTracker",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "contract MonMonTestDividendTracker", "name": "", "type": "address" }]
  },
  {
    "type": "function",
    "name": "enableStaking",
    "stateMutability": "nonpayable",
    "inputs": [{ "internalType": "bool", "name": "enable", "type": "bool" }],
    "outputs": []
  },
  {
    "type": "function",
    "name": "enableSwapAndLiquify",
    "stateMutability": "nonpayable",
    "inputs": [{ "internalType": "bool", "name": "enabled", "type": "bool" }],
    "outputs": []
  },
  {
    "type": "function",
    "name": "enableTrading",
    "stateMutability": "nonpayable",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "function",
    "name": "forceSwapAndSendDividends",
    "stateMutability": "nonpayable",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "function",
    "name": "gasForProcessing",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "getAccountDividendsInfo",
    "stateMutability": "view",
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" },
      { "internalType": "int256", "name": "", "type": "int256" },
      { "internalType": "int256", "name": "", "type": "int256" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ]
  },
  {
    "type": "function",
    "name": "getAccountDividendsInfoAtIndex",
    "stateMutability": "view",
    "inputs": [
      { "internalType": "uint256", "name": "index", "type": "uint256" }
    ],
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" },
      { "internalType": "int256", "name": "", "type": "int256" },
      { "internalType": "int256", "name": "", "type": "int256" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ]
  },
  {
    "type": "function",
    "name": "getClaimWait",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "getContractClaimWait",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "getDeadFee",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "getDevFee",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "getLiquidityFee",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "getMarketingFee",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "getMaxTransactionAmount",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "getMinTokenBalance",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "getPayoutToken",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }]
  },
  {
    "type": "function",
    "name": "getRewardCycleExtensionThreshold",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "getRewardCycleExtensionThresholdEnabled",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "getSellFeeIncreaseFactor",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "getSwapAndLiquifyEnabled",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
  },
  {
    "type": "function",
    "name": "getSwapThreshold",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "getTotalDividendsDistributed",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "getTotalDividendsDistributedInPayoutToken",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "getTotalFees",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "getTotalFeeValues",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      { "internalType": "uint256", "name": "sellDeadFees", "type": "uint256" },
      { "internalType": "uint256", "name": "sellMarketingFees", "type": "uint256" },
      { "internalType": "uint256", "name": "sellLiquidityFee", "type": "uint256" },
      { "internalType": "uint256", "name": "sellRewardsFee", "type": "uint256" },
      { "internalType": "uint256", "name": "buyDeadFees", "type": "uint256" },
      { "internalType": "uint256", "name": "buyMarketingFees", "type": "uint256" },
      { "internalType": "uint256", "name": "buyLiquidityFee", "type": "uint256" },
      { "internalType": "uint256", "name": "buyRewardsFee", "type": "uint256" },
      { "internalType": "uint256", "name": "buyDevFee", "type": "uint256" },
      { "internalType": "uint256", "name": "sellDevFee", "type": "uint256" }
    ]
  },
  {
    "type": "function",
    "name": "getTradingIsEnabled",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
  },
  {
    "type": "function",
    "name": "getTradingIsEnabledTimestamp",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "getTransferFee",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "getUniswapV2Pair",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }]
  },
  {
    "type": "function",
    "name": "increaseAllowance",
    "stateMutability": "nonpayable",
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "addedValue", "type": "uint256" }
    ],
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
  },
  {
    "type": "function",
    "name": "isAccountExcludedFromFees",
    "stateMutability": "view",
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
  },
  {
    "type": "function",
    "name": "isDividendExempt",
    "stateMutability": "view",
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
  },
  {
    "type": "function",
    "name": "isExcludedFromAutoLiquidity",
    "stateMutability": "view",
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
  },
  {
    "type": "function",
    "name": "isExcludedFromAutoSwap",
    "stateMutability": "view",
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
  },
  {
    "type": "function",
    "name": "isExcludedFromFees",
    "stateMutability": "view",
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
  },
  {
    "type": "function",
    "name": "isExcludedFromLimits",
    "stateMutability": "view",
    "inputs": [
    { "internalType": "address", "name": "account", "type": "address" }
    ],
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
    },
    {
      "type": "function",
      "name": "isExcludedFromPayouts",
      "stateMutability": "view",
      "inputs": [
        { "internalType": "address", "name": "account", "type": "address" }
      ],
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
    },
    {
      "type": "function",
      "name": "isSniper",
      "stateMutability": "view",
      "inputs": [
        { "internalType": "address", "name": "account", "type": "address" }
      ],
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
    },
    {
      "type": "function",
      "name": "isTaxless",
      "stateMutability": "view",
      "inputs": [
        { "internalType": "address", "name": "account", "type": "address" }
      ],
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
    },
    {
      "type": "function",
      "name": "lastTransfer",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "lastTransferTimestamp",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "lastTx",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "liquidityProviderFee",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "liquidityProvisionVote",
    "stateMutability": "nonpayable",
    "inputs": [
    { "internalType": "address", "name": "provisionAddress", "type": "address" }
    ],
    "outputs": []
    },
    {
      "type": "function",
      "name": "marketingWallet",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }]
    },
    {
      "type": "function",
      "name": "minimumTokenBalanceForDividends",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "minimumTokensBeforeSwapAndLiquify",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "minimumTokensBeforeSwapAndLiquifyAmount",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "name",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "string", "name": "", "type": "string" }]
    },
    {
      "type": "function",
      "name": "owner",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }]
    },
    {
      "type": "function",
      "name": "payoutToken",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }]
    },
    {
      "type": "function",
      "name": "payoutTokenDividendTracker",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "contract MonMonTestDividendTracker", "name": "", "type": "address" }]
    },
    {
      "type": "function",
      "name": "payoutTokenDividendEnabled",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
    },
    {
      "type": "function",
      "name": "reflectionFromToken",
      "stateMutability": "view",
      "inputs": [
      { "internalType": "uint256", "name": "tAmount", "type": "uint256" },
      { "internalType": "bool", "name": "deductTransferFee", "type": "bool" }
      ],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "renounceOwnership",
      "stateMutability": "nonpayable",
      "inputs": [],
      "outputs": []
    },
    {
      "type": "function",
      "name": "router",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }]
    },
    {
      "type": "function",
      "name": "sellAdditionalFee",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "sellDeadFees",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "sellFees",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [
        { "internalType": "uint256", "name": "reflection", "type": "uint256" },
        { "internalType": "uint256", "name": "pairReflection", "type": "uint256" },
        { "internalType": "uint256", "name": "deadTokens", "type": "uint256" },
        { "internalType": "uint256", "name": "marketing", "type": "uint256" },
        { "internalType": "uint256", "name": "liquidity", "type": "uint256" },
        { "internalType": "uint256", "name": "dividends", "type": "uint256" },
        { "internalType": "uint256", "name": "totalSellFees", "type": "uint256" }
      ]
    },
    {
      "type": "function",
      "name": "sellFeesMultiplierNumerator",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "sellFeesMultiplierDenominator",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "sellLiquidityFee",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "sellMarketingFees",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "sellMinimumBeforeSwap",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "sellToMarketingWallet",
      "stateMutability": "nonpayable",
      "inputs": [],
      "outputs": []
    },
    {
      "type": "function",
      "name": "sellToLiquidityWallet",
      "stateMutability": "nonpayable",
      "inputs": [],
      "outputs": []
    },
    {
      "type": "function",
      "name": "sellToPayoutWallet",
      "stateMutability": "nonpayable",
      "inputs": [],
      "outputs": []
    },
    {
      "type": "function",
      "name": "sellToSwap",
      "stateMutability": "nonpayable",
      "inputs": [],
      "outputs": []
    },
    {
      "type": "function",
      "name": "setAutomatedMarketMakerPair",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "address", "name": "pair", "type": "address" },
        { "internalType": "bool", "name": "value", "type": "bool" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "setDevWallet",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "address", "name": "newWallet", "type": "address" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "setLiquidationThreshold",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "uint256", "name": "threshold", "type": "uint256" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "setMaxWalletToken",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "uint256", "name": "maxWalletToken", "type": "uint256" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "swapAndLiquifyEnabled",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
    },
    {
      "type": "function",
      "name": "swapAndLiquifyThreshold",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "symbol",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "string", "name": "", "type": "string" }]
    },
    {
      "type": "function",
      "name": "teamFee",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [
        { "internalType": "uint256", "name": "reflection", "type": "uint256" },
        { "internalType": "uint256", "name": "marketing", "type": "uint256" },
        { "internalType": "uint256", "name": "liquidity", "type": "uint256" },
        { "internalType": "uint256", "name": "totalTeamFee", "type": "uint256" }
      ]
    },
    {
      "type": "function",
      "name": "totalFees",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [
        { "internalType": "uint256", "name": "reflection", "type": "uint256" },
        { "internalType": "uint256", "name": "marketing", "type": "uint256" },
        { "internalType": "uint256", "name": "liquidity", "type": "uint256" },
        { "internalType": "uint256", "name": "totalSellFees", "type": "uint256" },
        { "internalType": "uint256", "name": "totalTeamFee", "type": "uint256" }
      ]
    },
    {
      "type": "function",
      "name": "totalPayouts",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "totalSupply",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "totalTeamFees",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [
        { "internalType": "uint256", "name": "reflection", "type": "uint256" },
        { "internalType": "uint256", "name": "marketing", "type": "uint256" },
        { "internalType": "uint256", "name": "liquidity", "type": "uint256" },
        { "internalType": "uint256", "name": "totalTeamFee", "type": "uint256" }
      ]
    },
    {
      "type": "function",
      "name": "transfer",
      "stateMutability": "view",
      "inputs": [
        { "internalType": "address", "name": "recipient", "type": "address" },
        { "internalType": "uint256", "name": "amount", "type": "uint256" }
      ],
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
    },
    {
      "type": "function",
      "name": "transferOwnership",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "address", "name": "newOwner", "type": "address" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "transferToAddressETH",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "address", "name": "target", "type": "address" },
        { "internalType": "uint256", "name": "amount", "type": "uint256" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "transferToAddressMarketing",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "address", "name": "target", "type": "address" },
        { "internalType": "uint256", "name": "amount", "type": "uint256" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "transferToAddressPayout",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "address", "name": "target", "type": "address" },
        { "internalType": "uint256", "name": "amount", "type": "uint256" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "updateClaimWait",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "uint256", "name": "claimWait", "type": "uint256" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "updateDividendTracker",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "address", "name": "newAddress", "type": "address" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "updateGasForProcessing",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "uint256", "name": "gaspForProcessing", "type": "uint256" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "updateMaxSellTransactionAmount",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "uint256", "name": "maxSellAmount", "type": "uint256" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "updateMinBalanceToSell",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "uint256", "name": "newMinBalance", "type": "uint256" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "updatePayoutToken",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "address", "name": "newToken", "type": "address" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "updatePayoutTokenDividendEnabled",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "bool", "name": "enabled", "type": "bool" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "updateSellFees",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "uint256", "name": "newReflectionFee", "type": "uint256" },
        { "internalType": "uint256", "name": "newMarketingFee", "type": "uint256" },
        { "internalType": "uint256", "name": "newLiquidityFee", "type": "uint256" },
        { "internalType": "uint256", "name": "newDividendFee", "type": "uint256" },
        { "internalType": "uint256", "name": "newTotalSellFee", "type": "uint256" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "updateSellFeesMultiplier",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "uint256", "name": "numerator", "type": "uint256" },
        { "internalType": "uint256", "name": "denominator", "type": "uint256" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "updateSellLiquidityFee",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "uint256", "name": "newFee", "type": "uint256" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "updateSwapAndLiquifyThreshold",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "uint256", "name": "newThreshold", "type": "uint256" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "updateSwapAndLiquifyEnabled",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "bool", "name": "enabled", "type": "bool" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "updateTeamFee",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "uint256", "name": "newReflectionFee", "type": "uint256" },
        { "internalType": "uint256", "name": "newMarketingFee", "type": "uint256" },
        { "internalType": "uint256", "name": "newLiquidityFee", "type": "uint256" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "updateToken",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "address", "name": "newAddress", "type": "address" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "updateUniswapV2Router",
      "stateMutability": "nonpayable",
      "inputs": [
        { "internalType": "address", "name": "newRouter", "type": "address" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "withdrawableDividendOf",
      "stateMutability": "view",
      "inputs": [
        { "internalType": "address", "name": "account", "type": "address" }
      ],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "withdrawableDividendOfUser",
      "stateMutability": "view",
      "inputs": [
        { "internalType": "address", "name": "account", "type": "address" }
      ],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "withdrawableFees",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }]
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokens", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "success", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
]


