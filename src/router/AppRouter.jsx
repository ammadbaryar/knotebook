import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Notes from "../pages/Notes";
import Search from "../pages/Search";
import Editor from "../pages/Editor";
// import Diagram from "../pages/Diagram";



export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/search" element={<Search />} />
          <Route path="/editor" element={<Editor />} />
          {/* <Route path="/diagram" element={<Diagram />} /> */}
                 
        </Routes>
    </BrowserRouter>
  );
}
