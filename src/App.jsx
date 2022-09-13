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
  const [count, setCount] = useState(alltips.length);
  var random = Math.floor(Math.random() * (toBe.length - 1));
  const del = () => {
    changeClick(!click);
    setIsFirst(false);
    setCount(count - 1);
  };
  useEffect(() => {
    // let random = Math.floor(Math.random() * (toBe.length - 1));
    setCurrent(toBe[random]);
  }, [click]);
  useEffect(() => {
    if (!isFirst) {
      const remaining = toBe.filter((ele) => ele !== current);
      setToBe(remaining);
    }
  }, [current]);
  return (
    <div>
      {isFirst && <About />}
      {!isFirst && count > -1 && <Tip {...current} />}
      {count > -1 ? (
        <div className=" text-center  fixed_button">
          <button className="btn btn-secondary" onClick={del}>
            Next
          </button>
        </div>
      ) : (
        <div className="col-md-12 text-center mt-3 end">
          <div className="d-flex  justify-content-center mt-5">
            <div className=" text-center  my-4">
              <marquee behavior="scroll" direction="left">
                <h1>You have completed all tips</h1>
              </marquee>
              <h2>Happy Learning</h2>
              <marquee behavior="scroll" direction="right">
                <h3>Bye Bye</h3>
              </marquee>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
