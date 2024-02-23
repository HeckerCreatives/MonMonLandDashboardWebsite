import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "mdb-react-ui-kit/dist/css/mdb.min.css"; // eslint-disable-next-line
import '@fortawesome/fontawesome-free/css/all.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ThemeContextWrapper from './component/theme/themewrapper';
import { PlayFab } from "playfab-sdk";
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import process from 'process';
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { WagmiProvider } from 'wagmi'
import {  bsc, bscTestnet,} from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 0. Setup queryClient
const queryClient = new QueryClient()
// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '37ab97f76d08c02a0d7024d96661cc37'

// 2. Create wagmiConfig
const metadata = {
  name: 'Monmonland',
  description: 'Monmonland',
  url: 'https://monmonland.games/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [bscTestnet]

const config = defaultWagmiConfig({
  chains, // required
  projectId, // required
  metadata,
  
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chains, // Optional - defaults to your Cloud configuration
  allWallets: 'ONLY_MOBILE',
  tokens: {
    97: {
        address: "0x8162e18648de9D1856bc2192d3A09bb1430e2425"
    },
  }
})

PlayFab.settings.titleId = process.env.REACT_APP_PLAYFABTITLEID;
const root = ReactDOM.createRoot(document.getElementById('root'));
if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}
root.render(
  <ThemeContextWrapper>
  <WagmiProvider config={config}>
  <QueryClientProvider client={queryClient}>
  <App />
  </QueryClientProvider>
  </WagmiProvider>
  {/* <React.StrictMode>
  </React.StrictMode> */}
  </ThemeContextWrapper>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
