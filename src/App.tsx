import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/login/LoginPage";
import RecallPage from "@/pages/recall";
import RegisterPage from "@/pages/register/RegisterPage";
import MainPage from "@/pages/main/MainPage";
import CalendarPage from "@/pages/calendar/CalendarView";
import CandidatePage from "@/pages/candidate/CandidateView";
import PoliticianPage from "@/pages/politician/PoliticianInfo";
import EditPage from "@/pages/editprofile/EditProfilePage";
import NewsPage from "@/pages/news/NewsPage";
import FaqPage from "@/pages/faq/Faq";
import InquiryPage from "@/pages/inquiry/Inquiry";
import CommunityPage from "@/pages/community/CommunityPage";
import NotificationPage from "@/pages/notification/Notification";
import NotificationPostPage from "@/pages/notification/post";
import { RecoilRoot } from "recoil";
import CommunityWritePage from "./pages/community/write/CommunityWritePage";
import CommunityPostPage from "./pages/community/post/CommunityPostPage";
import PrivacyPage from "./pages/privacy/PrivacyPage";
import TosPage from "./pages/tos/TosPage";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route index path="/tos" element={<TosPage />}></Route>
          <Route index path="/privacy" element={<PrivacyPage />}></Route>
          <Route index path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/recall" element={<RecallPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/calendar" element={<CalendarPage />}></Route>
          <Route path="/candidate/:id" element={<CandidatePage />}></Route>
          <Route path="/politician/:id" element={<PoliticianPage />}></Route>
          <Route path="/edit" element={<EditPage />}></Route>
          <Route path="/news" element={<NewsPage />}></Route>
          <Route path="/faq" element={<FaqPage />}></Route>
          <Route path="/inquiry" element={<InquiryPage />}></Route>
          <Route path="/community" element={<CommunityPage />}></Route>
          <Route path="/community/write" element={<CommunityWritePage />}></Route>
          <Route path="/community/post/:postId" element={<CommunityPostPage />}></Route>
          <Route path="/notification" element={<NotificationPage />}></Route>
          <Route path="/notification/post/:id" element={<NotificationPostPage />}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
