import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SigninPage from "./pages/SignupPage";
import SignupPage from "./pages/SigninPage";
import TodoPage from "./pages/TodoPage";
import Home from "./0_presentation/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
