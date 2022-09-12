import React from "react";

export const Tip = ({ id, title = "", description = "", link = ["", ""] }) => {
  return (
    <div className="container-fluid  h-5">
      <div className="card" style={{ width: "100%", alignItems: "center" }}>
        <div className="card-body">
          {title !== "" && <h4 className="card-title">{title}</h4>}
          <p className="card-text">{description}</p>
          {link[0] !== "" && (
            <a href={link[1]} className="btn btn-secondary">
              {link[0]}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
