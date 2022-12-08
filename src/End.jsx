function End(){
    return(
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
    )
}
export default End;