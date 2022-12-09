import { ReactDOM } from "react";
import { HashRouter, BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import Form from "./Form";
export default function Routing() {
  return (
    <BrowserRouter>
      <Route path="/tech-tips" component={App} />
      <Route path="/tech-tips/form" component={Form} />
    </BrowserRouter>
  );
}
