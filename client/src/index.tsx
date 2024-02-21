import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Pages
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Friends from "./pages/Friends";

// CSS
import "./index.css";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/friends" element={<Friends />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
