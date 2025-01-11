import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitialPage from "@/pages/initial";
import LoginPage from "@/pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<InitialPage />}></Route>
        <Route index path="/login" element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
