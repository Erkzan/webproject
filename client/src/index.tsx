import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);
