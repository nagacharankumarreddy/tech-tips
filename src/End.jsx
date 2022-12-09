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
          If you have any tips that you'd like to share, I would be happy to
          hear them &#128521;
        </marquee>

        <a href="/tech-tips/form">
          <button className="btn btn-outline-primary mt-5">
            Share your Tip Here
          </button>
        </a>
      </div>
    </div>
  );
}
export default End;
