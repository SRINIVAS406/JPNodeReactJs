import React from "react";
import Org from "./Treenode";

export default function Treenode(props) {
  if (props.tobj.length == 0) {
    return <></>;
  }

  let i = 0;
  const li = props.tobj.map((ch) => {
    return (
      <li key={i++}>
        <a href="#">
          <div className="orgTreecard">
            <div className="orgTreeheader">
              <h1>{ch.name}</h1>
            </div>

            <div className="container">
              <p>January 1, 2021</p>
            </div>
          </div>
        </a>
        <Org tobj={ch.child}></Org>
      </li>
    );
  });
  //   const li = JSON.stringify(props.tobj);
  

  return (
    <>
      <ul>{li}</ul>
    </>
  );
}
