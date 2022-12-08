import { Link } from "react-router-dom";
import "./Thankyou.css";
function Thankyou() {
  return (
    <>
      <div className="thankyoucontent">
        <div className="wrapper-1">
          <div className="wrapper-2">
            <img
              src="https://i.ibb.co/Lkn7rkG/thank-you-envelope.png"
              alt="thank-you-envelope"
              border="0"
            />
            <h1>Thank you!</h1>
            <p>
              Thanks a bunch for sharing the tip. It means a lot to me. <br />I
              really appreciate you giving us a moment of your time.
            </p>
            <button className="go-home">
              <a href="/tech-tips">Home</a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Thankyou;
