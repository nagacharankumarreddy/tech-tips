import React from "react";

export const Tip = ({
  id,
  title = "",
  description = "",
  link = ["", ""],
  list,
}) => {
  return (
    <div className="container  h-5">
      <h1 className="text-center text-warning">Tech Tips</h1>
      <div className="card mt-3 text-bg-dark" style={{ width: "100%" }}>
        <div className="card-body">
          {title !== "" && <h4 className="card-title">{title}</h4>}
          <p className="card-text">{description}</p>
          <ol>
            {list &&
              list.map((item, id) => {
                return <li key={id}>{item}</li>;
              })}
          </ol>
          {link[0] !== "" && (
            <div className="text-center">
              <a href={link[1]} className="btn btn-secondary ">
                {link[0]}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
