import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitialPage from "@/pages/initial";
import LoginPage from "@/pages/login";
import RecallPage from "@/pages/recall";
import RegisterPage from "@/pages/register";
import MainPage from "@/pages/main";
import CalendarPage from "@/pages/calendar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<InitialPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/recall" element={<RecallPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/calendar" element={<CalendarPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
