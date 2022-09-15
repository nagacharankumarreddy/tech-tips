import { useState, useEffect } from "react";
import alltips from "./alltips";
import { About } from "./About";
import "./App.css";
import { Tip } from "./Tip";

const App = () => {
  const [toBe, setToBe] = useState(alltips); //[{},{}]
  let randomList = toBe;
  const [isFirst, setIsFirst] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentTip, setCurrentTip] = useState(null);
  const prev = () => {
    setIsFirst(false);
    setCurrentIndex(currentIndex - 1);
  };
  const next = () => {
    if (isFirst) setCurrentIndex(0);
    setIsFirst(false);
    setCurrentIndex(currentIndex + 1);
  };
  useEffect(() => {
    setCurrentTip(randomList[currentIndex]);
  }, [currentIndex]);
  return (
    <div>
      {isFirst && <About />}
      {!isFirst && currentIndex < alltips.length && <Tip {...currentTip} />}
      {currentIndex < alltips.length ? (
        <div className="fixed_button d-flex justify-content-between">
          {currentIndex > 0 && (
            <button className="btn btn-secondary btn-lg m-1" onClick={prev}>
              Previous
            </button>
          )}
          <button className="btn btn-secondary btn-lg m-1" onClick={next}>
            &nbsp;&nbsp;Next&nbsp;&nbsp;
          </button>
        </div>
      ) : (
        <div className="col-md-12 text-center end">
          <div className="d-flex  justify-content-center">
            <div className=" text-center  my-5">
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
