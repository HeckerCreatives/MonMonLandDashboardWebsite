import React from "react";
import { Route, Routes } from "react-router-dom";
import Error from "./page/404";

//Home
import Initial from "./page/home";

import UpdateProgressBar from "./page/dashboard/progressbar/progressbar";
import UpdateSubs from "./page/dashboard/subscription/subscription";
import UpdateNews from "./page/dashboard/news/news";
import UpdateRoadmap from "./page/dashboard/roadmap/roadmap";

const Routers = () => {
  return (
    <Routes>
      {/* Initial */}
      <Route path="/" element={<Initial />} />
      <Route path="/updateprogressbar" element={<UpdateProgressBar />} />
      <Route path="/updatesubs" element={<UpdateSubs />} />
      <Route path="/updatenews" element={<UpdateNews />} />
      <Route path="/updateroadmap" element={<UpdateRoadmap />} />

      {/* Error 404 */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Routers;