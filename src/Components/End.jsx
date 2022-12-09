import { Link } from "react-router-dom";
function End() {
  return (
    <div className="d-flex  justify-content-center">
      <div className=" text-center  my-5">
        <marquee behavior="scroll" direction="left">
          <h1>You have completed all tips</h1>
        </marquee>
        <h2>Happy Learning</h2>
        <h3>Bye Bye &#x1F44B;</h3>
        <marquee behavior="scroll" direction="right">
          <h5 className="text-light">
            If you have any tips that you'd like to share, I would be happy to
            hear them &#128521;
          </h5>
        </marquee>

        <Link to="/tech-tips/form">
          <button className="btn btn-outline-primary mt-5">
            Share your Tip Here
          </button>
        </Link>
      </div>
    </div>
  );
}
export default End;
