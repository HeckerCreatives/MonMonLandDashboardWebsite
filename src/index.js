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

PlayFab.settings.titleId = process.env.REACT_APP_PLAYFABTITLEID;
const root = ReactDOM.createRoot(document.getElementById('root'));
if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}
root.render(
  <ThemeContextWrapper>
   <App />
  {/* <React.StrictMode>
  </React.StrictMode> */}
  </ThemeContextWrapper>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
