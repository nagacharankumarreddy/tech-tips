import { useState, useEffect } from "react";
import { alltips } from "./alltips";
import { About } from "./About";
import "./App.css";
import { Tip } from "./Tip";

const App = () => {
  const [toBe, setToBe] = useState(alltips); //[{},{}]
  const [current, setCurrent] = useState(null);
  const [isFirst, setIsFirst] = useState(true);
  const [click, changeClick] = useState(true);
  const del = () => {
    changeClick(!click);
    setIsFirst(false);
  };
  useEffect(() => {
    let random = Math.floor(Math.random() * (toBe.length - 1));
    setCurrent(toBe[random]);
    console.log("click", current);
  }, [click]);
  useEffect(() => {
    if (!isFirst) {
      const remaining = toBe.filter((ele) => ele !== current);
      setToBe(remaining);
      console.log("rem", remaining);
    }
  }, [current]);
  return (
    <div>
      {isFirst && <About />}
      {!isFirst && <Tip {...current} />}
      <div className="col-md-12 text-center mt-3">
        <button className="btn btn-primary " onClick={del}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
