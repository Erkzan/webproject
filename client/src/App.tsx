import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
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
        <Route path="/search/:query" element={<Search />} />
        <Route path="/UserProfile/:username" element={<UserProfile />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;