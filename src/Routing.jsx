import { ReactDOM } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Form from "./Form";
export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tech-tips" element={<App />}></Route>
        <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}
