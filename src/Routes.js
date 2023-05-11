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
const Routers = () => {
  return (
    <Routes>
    
      {/* Initial */}
      <Route path="/" element={<Initial />} />

      <Route path="/dashboard" element={<Dashboard />}>
       <Route path="superadmin" element={""}>
        <Route path="home" element={<AdminDashboard />}/>
        <Route path="settings">
          <Route path="updateprogressbar" element={<UpdateProgressBar/>}/>
          <Route path="updatesubs" element={<UpdateSubs/>}/>
          <Route path="updatenews" element={<UpdateNews/>}/>
          <Route path="updateroadmap" element={<UpdateRoadmap/>}/>
        </Route>
        
       </Route> 
      </Route>
      
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/login" element={<Login />}/>
    </Routes>
  );
};

export default Routers;