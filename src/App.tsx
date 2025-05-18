//import React from "react";
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
import CommunityPage from "@/pages/community";
import CommunityUploadPage from "@/pages/community/upload";
import CommunityPostPage from "@/pages/community/post";
import NotificationPage from "@/pages/notification";
import NotificationPostPage from "@/pages/notification/post";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/recall" element={<RecallPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          {/* <Route path="/main" element={<MainPage />}></Route> */}
          <Route path="/calendar" element={<CalendarPage />}></Route>
          <Route path="/candidate/:id" element={<CandidatePage />}></Route>
          <Route path="/politician/:id" element={<PoliticianPage />}></Route>
          <Route path="/edit" element={<EditPage />}></Route>
          <Route path="/news" element={<NewsPage />}></Route>
          <Route path="/faq" element={<FaqPage />}></Route>
          <Route path="/inquiry" element={<InquiryPage />}></Route>
          <Route path="/community" element={<CommunityPage />}></Route>
          <Route path="/community/upload" element={<CommunityUploadPage />}></Route>
          <Route path="/community/post/:id" element={<CommunityPostPage />}></Route>
          <Route path="/notification" element={<NotificationPage />}></Route>
          <Route path="/notification/post/:id" element={<NotificationPostPage />}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
