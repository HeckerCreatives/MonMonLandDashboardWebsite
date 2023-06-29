import React from "react";
import { Route, Routes } from "react-router-dom";
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
import UserDashboard from "./page/dashboard/user/userdashboard";
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


const Routers = () => {
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
        

        <Route path="settings">
          <Route path="updateprogressbar" element={<UpdateProgressBar/>}/>
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
        

        <Route path="settings">
          <Route path="updateprogressbar" element={<UpdateProgressBar/>}/>
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
        </Route>

        <Route path="Agent" element={""}>
            <Route path="home" element={<UserDashboard/>}/>
            <Route path="settings">
          <Route path="updateprogressbar" element={<UpdateProgressBar/>}/>
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
        </Route>
      </Route>
      
      
      <Route path="referral">
        <Route path="agent/:userId/register" element={<SignUp />}/>
        <Route path="player/:userId/register" element={<SignUpPlayer />}/>
      </Route>
      {/* <Route path="/signup" element={<SignUp />}/> */}
      <Route path="/login" element={<Login />}/>
      <Route path="/verification/:userId" element={<StepVerification />}/>
    </Routes>
  );
};

export default Routers;