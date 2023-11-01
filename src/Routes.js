import React, {useEffect, useState} from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Error from "./page/404";
//Home
import Initial from "./page/home";
import Dashboard from "./page/dashboard/dashboard"
import UpdateProgressBar from "./page/dashboard/progressbar/progressbar";
import UpdateSubs from "./page/dashboard/subscription/subscription";
import UpdateNews from "./page/dashboard/news/news";
import UpdateRoadmap from "./page/dashboard/roadmap/roadmap";
import Login from "./page/login";
import FullTable from "./component/fulltablelist";
import AdminDashboard from "./component/dashboard/admin";
import SignUp from "./page/signupform/signup";
import StepVerification from "./page/4stepverification";
// import UserDashboard from "./page/dashboard/user/userdashboard";
import ActiveUsers from "./page/dashboard/manageplayers/activeusers";
import BannedUsers from "./page/dashboard/manageplayers/bannedusers";
import PaidUsers from "./page/dashboard/manageplayers/paidusers";
import AllUsers from "./page/dashboard/manageplayers/allusers";
import EmailUnverified from "./page/dashboard/manageplayers/emailunverified";
// import MobileUnverified from "./page/dashboard/manageplayers/mobileunverified";
import WithBalance from "./page/dashboard/manageplayers/withbalance";
import ManageDashboard from "./component/dashboard/admin/manageplayer/managedashboard";
import SignUpPlayer from "./page/signupform/playersignup/signupplayer";
import CreateAdminAccount from "./page/dashboard/manageaccount/admin";
import CreateCSRAccount from "./page/dashboard/manageaccount/csr";
import Games from "./page/dashboard/games/games";
import UpdatePearl from "./page/dashboard/subscription/subs/pearl";
import UpdateFree from "./page/dashboard/subscription/subs/free";
import UpdateRuby from "./page/dashboard/subscription/subs/ruby";
import UpdateEmerald from "./page/dashboard/subscription/subs/emerald";
import UpdateDiamond from "./page/dashboard/subscription/subs/diamond";
import SubAdminDashboard from "./page/dashboard/subadmin/dashboard";
import UpgradeSubscriptionManual from "./page/dashboard/upgradesubs";
import SubAdminUpgradeSubscriptionManual from "./page/dashboard/subadmin/upgradesubs";
import Home from "./component/minichatapp/Home";
import ChatPage from "./component/minichatapp/ChatPage";
import AvailableCashiers from "./page/dashboard/cashier";
import CsrDashboard from "./page/dashboard/csr/dashboard";
import CsrUpgradeSubscriptionManual from "./page/dashboard/csr/upgradesubs";
import SubAdminPaymentHistory from "./page/dashboard/subadmin/paymenthistory";
import CsrPaymentHistory from "./page/dashboard/csr/paymenthistory";
import SuccessPage from "./page/coinbase/success";
import CancelPage from "./page/coinbase/cancel";
import AdminPayoutProcess from "./page/dashboard/payout/process";
import AdminPayoutDone from "./page/dashboard/payout/done";
import AdminPayoutRequest from "./page/dashboard/payout/request"
import SubAdminPayoutRequest from "./page/dashboard/subadmin/payout/request";
import SubAdminPayoutProcess from "./page/dashboard/subadmin/payout/process";
import SubAdminPayoutDone from "./page/dashboard/subadmin/payout/done";
import CsrPayoutRequest from "./page/dashboard/csr/payout/request";
import CsrPayoutProcess from "./page/dashboard/csr/payout/process";
import CsrPayoutDone from "./page/dashboard/csr/payout/done";
import TopUp from "./page/home/topup";
import TopUpRedirect from "./page/home/topup/redirect";
import AdminLoginLogs from "./page/dashboard/userloginlogs/adminlogs";
import CsrLoginLogs from "./page/dashboard/userloginlogs/csrlogs";
import SubadminCsrLoginLogs from "./page/dashboard/subadmin/csrloginlogs/csrlogs";
import FAQ from "./page/home/faq";
import Media from "./page/home/media";
import General1 from "./page/home/faq/contents/generalquestion/whatismml";
import General2 from "./page/home/faq/contents/generalquestion/whatismc";
import General3 from "./page/home/faq/contents/generalquestion/infoandsupport";
import General4 from "./page/home/faq/contents/generalquestion/mmlplatform";
import Mop1 from "./page/home/faq/contents/modeofpayment/autopayment";
import Mop2 from "./page/home/faq/contents/modeofpayment/manualpayment";
import Game1 from "./page/home/faq/contents/games/howtoearn";
import Game2 from "./page/home/faq/contents/games/createaccount";
import Game3 from "./page/home/faq/contents/games/howtosubs";
import Game4 from "./page/home/faq/contents/games/howtocashout";
import Game5 from "./page/home/faq/contents/games/binancewallet";
import Unilevel1 from "./page/home/faq/contents/unilevel/unilevel";
import Privacy1 from "./page/home/faq/contents/privacy/privacypolicy";
import TopUpResolver from "./page/dashboard/topupresolver";
import Advertisement from "./page/dashboard/Ads";
import Leaderboard from "./page/dashboard/Leaderboard";
import CreateMarketingAccount from "./page/dashboard/manageaccount/marketingarm";
import MarketingDashboard from "./page/dashboard/marketingarm/marketingdashboard";
const Routers = () => {
  const navigate = useNavigate();
  useEffect(()=> {
    const url = new URL(window.location.href);
    if(url.href === `${window.location.origin}/register`){
      navigate(`/register?sponsor=monmonland&id=${process.env.REACT_APP_MONMONID}`)
    } 
    
  },[])

  return (
    <Routes>
      <Route path="*" element={<Error/>}/>
      {/* Initial */}
      <Route path="/" element={<Initial />} />

      <Route path="/dashboard" element={<Dashboard />}>
       
        <Route path="Administrator" element={""}>
        <Route path="home" element={<AdminDashboard />}/>
        <Route path="manageaccount">
        <Route path="createadminacc" element={<CreateAdminAccount/>}/>
        <Route path="createcsracc" element={<CreateCSRAccount/>}/>
        <Route path="createmarketingacc" element={<CreateMarketingAccount/>}/>
        <Route path="manageplayers">
          <Route path="activeplayers" element={<ActiveUsers/>}/>
          <Route path="bannedplayers" element={<BannedUsers/>}/>
          <Route path="emailunverified" element={<EmailUnverified/>}/>
          {/* <Route path="mobileunverified" element={<MobileUnverified/>}/> */}
          <Route path="withbalance" element={<WithBalance/>}/>
          <Route path="paidusers" element={<PaidUsers/>}/>
          <Route path="allusers" element={<AllUsers/>}/>
          <Route path="usersdetails/:userId" element={<ManageDashboard/>}/>                           
        </Route>
        </Route>
        
        <Route path="upgradesubscription">
        <Route path="managetopup" element={<UpgradeSubscriptionManual/>}/>
        </Route>

        <Route path="payout">
        <Route path="request" element={<AdminPayoutRequest/>}/>
        <Route path="process" element={<AdminPayoutProcess/>}/>
        <Route path="done" element={<AdminPayoutDone/>}/>
        </Route>

        <Route path="settings">
          <Route path="updatetotalincome" element={<UpdateProgressBar/>}/>
          <Route path="updatesubs">
            <Route path="pearl"element={<UpdatePearl/>}/>
            <Route path="ruby"element={<UpdateRuby/>}/>
            <Route path="emerald"element={<UpdateEmerald/>}/>
            <Route path="diamond"element={<UpdateDiamond/>}/>
            <Route path="free"element={<UpdateFree/>}/>
          </Route>
          <Route path="updatenews" element={<UpdateNews/>}/>
          <Route path="updateroadmap" element={<UpdateRoadmap/>}/>
          <Route path="updategames" element={<Games/>}/>
          <Route path="updateads" element={<Advertisement />}/>
          <Route path="updateleaderboard" element={<Leaderboard />}/>
        </Route>

        <Route path="userlogs">
          <Route path="adminloginlogs" element={<AdminLoginLogs/>}/>
          <Route path="csrloginlogs" element={<CsrLoginLogs/>}/>
        </Route>
        <Route path="topupresolver" element={<TopUpResolver/>}/>
        </Route> 

        <Route path="SubAdministrator" element={""}>
        <Route path="home" element={<SubAdminDashboard />}/>
        <Route path="manageaccount">
        {/* <Route path="createadminacc" element={<CreateAdminAccount/>}/> */}
        <Route path="createcsracc" element={<CreateCSRAccount/>}/>
        <Route path="manageplayers">
          <Route path="activeplayers" element={<ActiveUsers/>}/>
          <Route path="bannedplayers" element={<BannedUsers/>}/>
          <Route path="emailunverified" element={<EmailUnverified/>}/>
          {/* <Route path="mobileunverified" element={<MobileUnverified/>}/> */}
          <Route path="withbalance" element={<WithBalance/>}/>
          <Route path="paidusers" element={<PaidUsers/>}/>
          <Route path="allusers" element={<AllUsers/>}/>
          <Route path="usersdetails/:userId" element={<ManageDashboard/>}/>                           
        </Route>
        </Route>
        
        <Route path="upgradesubscription" element={<SubAdminUpgradeSubscriptionManual/>}/>
        <Route path="payout">
        <Route path="request" element={<SubAdminPayoutRequest/>}/>
        <Route path="process" element={<SubAdminPayoutProcess/>}/>
        <Route path="done" element={<SubAdminPayoutDone/>}/>
        </Route>
        <Route path="paymenthistory" element={<SubAdminPaymentHistory/>}/>
        <Route path="settings">
          <Route path="updatetotalincome" element={<UpdateProgressBar/>}/>
          <Route path="updatesubs">
            <Route path="pearl"element={<UpdatePearl/>}/>
            <Route path="ruby"element={<UpdateRuby/>}/>
            <Route path="emerald"element={<UpdateEmerald/>}/>
            <Route path="diamond"element={<UpdateDiamond/>}/>
            <Route path="free"element={<UpdateFree/>}/>
          </Route>
          <Route path="updatenews" element={<UpdateNews/>}/>
          <Route path="updateroadmap" element={<UpdateRoadmap/>}/>
          <Route path="updategames" element={<Games/>}/>
        </Route>  

        <Route path="userlogs">
        <Route path="csrloginlogs" element={<SubadminCsrLoginLogs/>}/>
        </Route>  
        <Route path="topupresolver" element={<TopUpResolver/>}/>    
        </Route>

        <Route path="Agent" element={""}>
            <Route path="home" element={<CsrDashboard/>}/>
            <Route path="settings">
          <Route path="updatetotalincome" element={<UpdateProgressBar/>}/>
          <Route path="updatesubs">
            <Route path="pearl"element={<UpdatePearl/>}/>
            <Route path="ruby"element={<UpdateRuby/>}/>
            <Route path="emerald"element={<UpdateEmerald/>}/>
            <Route path="diamond"element={<UpdateDiamond/>}/>
            <Route path="free"element={<UpdateFree/>}/>
          </Route>
          
          <Route path="updatenews" element={<UpdateNews/>}/>
          <Route path="updateroadmap" element={<UpdateRoadmap/>}/>
          <Route path="updategames" element={<Games/>}/>
        </Route>
        <Route path="upgradesubscription" element={<CsrUpgradeSubscriptionManual/>}/>
        <Route path="payout">
        <Route path="request" element={<CsrPayoutRequest/>}/>
        <Route path="process" element={<CsrPayoutProcess/>}/>
        <Route path="done" element={<CsrPayoutDone/>}/>
        </Route>
        <Route path="paymenthistory" element={<CsrPaymentHistory/>}/>
        <Route path="topupresolver" element={<TopUpResolver/>}/>
        </Route>

        <Route path="Marketing" element={""}>
            <Route path="home" element={<MarketingDashboard/>}/>
        </Route>
      </Route>
      {/* <Route
          path="/register"
          element={<Navigate to="/register?sponsor=monmonland&id=ECBFE0CB217B1E12" replace />}
      /> */}
      <Route path="/register" element={<SignUp />}/>
      
      
      <Route path="referral">
        
        <Route path="player/:userId/register" element={<SignUpPlayer />}/>
      </Route>
      <Route path="/faq" element={<FAQ />}>
        <Route path="generalquestion">
          <Route path="whatismml" element={<General1 />}/>
          <Route path="whatismcmg" element={<General2 />}/>
          <Route path="infoandsupport" element={<General3 />}/>
          <Route path="mmlplatforms" element={<General4 />}/>
        </Route>
        <Route path="mop">
          <Route path="autopayment" element={<Mop1 />}/>
          <Route path="manualpayment" element={<Mop2 />}/>
        </Route>
        <Route path="game">
          <Route path="howtoearn" element={<Game1 />}/>
          <Route path="howtocreateacc" element={<Game2 />}/>
          <Route path="howtosubscribe" element={<Game3 />}/>
          <Route path="howtocashout" element={<Game4 />}/>
          <Route path="binancewallet" element={<Game5 />}/>
        </Route>
        <Route path="unilevel">
          <Route path="whatisunilevel" element={<Unilevel1/>}/>
        </Route>
        <Route path="privacy">
          <Route path="privacypolicy" element={<Privacy1/>}/>
        </Route>
      </Route>
      <Route path="/login" element={<Login />}/>
      <Route path="/media" element={<Media />}/>
      <Route path="/cashier" element={<AvailableCashiers/>}/>
      <Route path="/topup" element={<TopUp />}/>
      <Route path="/payment/success" element={<SuccessPage/>} />
      <Route path="/payment/cancel" element={<CancelPage/>} />
      <Route path="/redirect" element={<TopUpRedirect/>} />
    </Routes>
  );
};

export default Routers;