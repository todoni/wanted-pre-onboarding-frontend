import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SigninPage from "./0_presentation/SigninPage";
import SignupPage from "./0_presentation/SignupPage";
import TodoPage from "./0_presentation/TodoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
