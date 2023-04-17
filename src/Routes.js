import React from "react";
import { Route, Routes } from "react-router-dom";
import Error from "./page/404";

//Home
import Initial from "./page/home";

const Routers = () => {
  return (
    <Routes>
      {/* Initial */}
      <Route path="/" element={<Initial />} />

      {/* Error 404 */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Routers;