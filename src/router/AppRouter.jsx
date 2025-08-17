import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Notes from "../pages/Notes";
import Editor from "../pages/Editor";



export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:id" element={<Notes />} />
          <Route path="/editor/:id" element={<Editor />} />
          <Route path="/editor" element={<Editor />} />
   
                 
        </Routes>
    </BrowserRouter>
  );
}
