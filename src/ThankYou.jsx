import { Link } from "react-router-dom";
import "./Thankyou.css";
function Thankyou({ user }) {
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
            <h1>Thank you! {user}</h1>
            <p>
              Thanks a bunch for sharing the tip. It means a lot to me. <br />I
              really appreciate you giving us a moment of your time.
            </p>
            <button className="go-home">
              <Link to="/tech-tips">Home</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Thankyou;
