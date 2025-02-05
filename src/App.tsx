import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitialPage from "@/pages/initial";
import LoginPage from "@/pages/login";
import RecallPage from "@/pages/recall";
import RegisterPage from "@/pages/register";
import MainPage from "@/pages/main";
import CalendarPage from "@/pages/calendar";
import CandidatePage from "@/pages/candidate";
import PoliticianPage from "@/pages/politician";
import EditPage from "@/pages/editprofile";
import NewsPage from "@/pages/news";
import FaqPage from "@/pages/faq";
import InquiryPage from "@/pages/inquiry";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<InitialPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/recall" element={<RecallPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/main" element={<MainPage />}></Route>
          <Route path="/calendar" element={<CalendarPage />}></Route>
          <Route path="/candidate/:id" element={<CandidatePage />}></Route>
          <Route path="/politician/:id" element={<PoliticianPage />}></Route>
          <Route path="/edit" element={<EditPage />}></Route>
          <Route path="/news" element={<NewsPage />}></Route>
          <Route path="/faq" element={<FaqPage />}></Route>
          <Route path="/inquiry" element={<InquiryPage />}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
