import { useState, useEffect } from "react";
import { About } from "./About";
import "./App.css";
import { Tip } from "./Tip";
import End from "./End";
import { Link } from "react-router-dom";
import $ from "jquery";

const App = () => {
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);
  const [currentTip, setCurrentTip] = useState({});
  const [index, setIndex] = useState(-1);
  const [alltips, setAlltips] = useState(null);
  useEffect(() => {
    fetch("https://tech-tips-dc902-default-rtdb.firebaseio.com/tips.json")
      .then((res) => res.json())
      .then((data) => {
        data.sort(() => Math.random() - 0.5);
        setAlltips(data);
      });
  }, []);

  useEffect(() => {
    if (alltips) setCurrentTip(alltips[index]);
  }, [index]);
  const prev = () => {
    if (index > 0) {
      setIndex((index) => index - 1);
      $(".prev").removeAttr("disabled");
    } else {
      $(".prev").attr("disabled", "disabled");
    }
  };
  const next = () => {
    setIsFirst(false);
    if (index < alltips.length - 1) {
      setIndex((index) => index + 1);
      $(".prev").removeAttr("disabled");
    } else {
      setIsLast(true);
      console.log("last tip");
    }
  };

  return (
    <div>
      {isFirst && <About />}
      {!isLast ? (
        <div>
          <Link to="/tech-tips/form">
            <button
              className="btn btn-warning mt-2 float-right"
              style={{ float: "right" }}
            >
              Share your Tip Here
            </button>
          </Link>
          {alltips && <Tip {...currentTip} />}
          <div className="fixed_button d-flex justify-content-between">
            <button
              className="btn btn-secondary btn-lg m-1 prev"
              onClick={prev}
            >
              Previous
            </button>
            <button
              className="btn btn-secondary btn-lg m-1 next"
              onClick={next}
            >
              &nbsp;&nbsp;Next&nbsp;&nbsp;
            </button>
          </div>
        </div>
      ) : (
        <End />
      )}
    </div>
  );
};

export default App;
