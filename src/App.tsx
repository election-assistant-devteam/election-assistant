import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitialPage from "@/pages/initial";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<InitialPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
