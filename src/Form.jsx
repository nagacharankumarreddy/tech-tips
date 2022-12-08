import $ from "jquery";
import { useState } from "react";
import Thankyou from "./ThankYou";
function Form() {
  const [thanks, saythanks] = useState(false);
  const posttip = (data) => {
    fetch("https://tech-tips-dc902-default-rtdb.firebaseio.com/TBC.json", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    saythanks(true);
  };
  const validate = (e) => {
    e.preventDefault();
    let name = $("#name").val();
    let link = $("#link").val();
    let description = $("#description").val();
    let data = { name, link, description };
    posttip(data);
  };
  return (
    <>
      {!thanks ? (
        <form
          className="row justify-content-center w-50 mx-auto"
          onSubmit={validate}
        >
          <div className="form-group">
            <label htmlFor="Name" className="text-info">
              Name
            </label>
            <input
              type="name"
              className="form-control"
              id="name"
              placeholder="Name"
              required
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="link" className="text-info">
              Link:
            </label>
            <input className="form-control" id="link" required></input>
          </div>
          <div className="form-group my-3">
            <label htmlFor="description" className="text-info">
              Description:
            </label>
            <textarea
              className="form-control"
              rows="5"
              id="description"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-outline-info w-50">
            Submit Tip
          </button>
        </form>
      ) : (
        <Thankyou />
      )}
    </>
  );
}

export default Form;
