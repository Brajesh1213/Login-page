// import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Sinup from "./pages/Sinup";
import Profile from "./Profile";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter className=" text-red-400">
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Sinup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
