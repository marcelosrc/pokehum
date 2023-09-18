import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styling/Common.scss";
import Home from "./pages/Home";
import Greetings from "./components/greetings/Greetings";
import Shelter from "./components/shelter/Shelter";
import People from "./components/people/People";
import Inventory from "./components/inventory/Inventory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Greetings />} />
          <Route path="shelter" element={<Shelter />} />
          <Route path="people" element={<People />} />
          <Route path="inventory" element={<Inventory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
