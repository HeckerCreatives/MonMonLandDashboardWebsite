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

const Routers = () => {
  return (
    <Routes>
    
      {/* Initial */}
      <Route path="/" element={<Initial />} />

      <Route path="/dashboard" element={<Dashboard />}>
       
        <Route path="superadmin" element={""}>
        <Route path="home" element={<AdminDashboard />}/>
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
        

        <Route path="settings">
          <Route path="updateprogressbar" element={<UpdateProgressBar/>}/>
          <Route path="updatesubs" element={<UpdateSubs/>}/>
          <Route path="updatenews" element={<UpdateNews/>}/>
          <Route path="updateroadmap" element={<UpdateRoadmap/>}/>
        </Route>        
        </Route>  

        <Route path="user" element={""}>
            <Route path="home" element={<UserDashboard/>}/>
        </Route>
      </Route>
      
      
      
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/verification" element={<StepVerification />}/>
    </Routes>
  );
};

export default Routers;