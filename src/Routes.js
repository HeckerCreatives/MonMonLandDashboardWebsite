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
const Routers = () => {
  return (
    <Routes>
      {/* Initial */}
      <Route path="/" element={<Initial />} />
      <Route path="/admin/dashboard/updateprogressbar" element={<UpdateProgressBar />} />
      <Route path="/admin/dashboard/updatesubs" element={<UpdateSubs />} />
      <Route path="/admin/dashboard/updatenews" element={<UpdateNews />} />
      <Route path="/admin/dashboard/updateroadmap" element={<UpdateRoadmap />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />}/>


      {/* Error 404 */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Routers;