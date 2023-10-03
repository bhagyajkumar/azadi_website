import { useState } from "react";
import Header from "./components/Header";
import { useModalStore } from "./lib/zustand";
import Modals from "./components/Modals";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Home from "./pages/Home";


function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
      
      <Modals />
    </div>
  );
}

export default App;
