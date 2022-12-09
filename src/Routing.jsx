import { ReactDOM } from "react";
import { HashRouter, BrowserRouter, Route } from "react-router-dom";
import App from "./Components/App";
import Form from "./Components/Form";
export default function Routing() {
  return (
    <BrowserRouter>
      <Route path="/tech-tips" exact component={App} />
      <Route path="/tech-tips/form" exact component={Form} />
    </BrowserRouter>
  );
}
