import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Pages
import Friends from "./pages/Friends";
import HomePage from "./pages/HomePage";
import MyProfile from "./pages/MyProfile";
import RegisterPage from "./pages/RegisterPage";
import Search from "./pages/Search";
import UserProfile from "./pages/UserProfile";
import LoginPage from "./pages/LoginPage";

// CSS
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/MyProfile/:username" element={<MyProfile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/UserProfile/:username" element={<UserProfile />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;