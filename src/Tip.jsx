import React from "react";

export const Tip = ({ id, title = "instagram", description = "hello" }) => {
  return (
    <div className="container-fluid  h-5">
      <div className="card" style={{ width: "100%", alignItems: "center" }}>
        <div className="card-body">
          {/* <h4 className="card-title">{title}</h4> */}
          <p className="card-text">{description}</p>
          <a href="./" className="btn btn-primary">
            See Profile
          </a>
        </div>
      </div>
    </div>
  );
};
