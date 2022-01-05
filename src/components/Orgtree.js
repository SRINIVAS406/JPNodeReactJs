import React, { useState, useEffect } from "react";
import "../JS_CSS/orgtree.css";
import Org from "./Treenode";
import axios from "axios";
// import "../JS_CSS/tree.js";
// import React from "react";
// import ReactDOM from "react-dom";

// const myelement = React.createElement("h1", { id: "user" }, "Great GrandChild");
// ReactDOM.render(myelement, document.querySelector("#ram1"));
export default function OrgTree() {
  let treeWidth = 0;
  const [zoomTree, setzoomTree] = useState(1);
  const [progressTree, setprogressTree] = useState(50);
  const handleWidth = null;
  // useEffect(() => {
  //   var a = document.querySelectorAll(".tree a");
  //   var lastNodes = 0;
  //   for (let i = 0; i < a.length; i++) {
  //     if (!a[i].nextSibling) lastNodes++;
  //   }
  //   console.log(lastNodes);
  //   treeWidth = 300 * lastNodes;
  //   document.querySelector("#orgtreeul").style.width = treeWidth + "px";
  // });

  const zoomIn = () => {
    setzoomTree(zoomTree + 0.1);
    setprogressTree(progressTree + 5);
  };

  const zoomout = () => {
    setzoomTree(zoomTree - 0.1);
    setprogressTree(progressTree - 5);
  };
  let obj2 = null;
  const baseURL = "http://localhost:4000/posts/1";
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
      // console.log("From Carousels.js Response Data : " + response.data);

      var a = document.querySelectorAll(".tree a");
      var lastNodes = 0;
      for (let i = 0; i < a.length; i++) {
        if (!a[i].nextSibling) lastNodes++;
      }
      console.log(lastNodes);
      treeWidth = 300 * lastNodes;
      document.querySelector("#orgtreeul").style.width = treeWidth + "px";
    });
  }, []);
  if (!post) return null;

  const obj1 = {
    name: "parent",
    child: [
      {
        name: "C1",
        child: [
          { name: "C3", child: [] },
          { name: "C4", child: [] },
          { name: "C5", child: [] },
        ],
      },
      {
        name: "C2",
        child: [
          { name: "C6", child: [] },
          { name: "C7", child: [] },
        ],
      },
    ],
  };

  var a = document.querySelectorAll(".tree");
  for (let i = 0; i < a.length; i++) {
    console.log(a[i].nextSibling ? "Yes" : "No");
  }
  return (
    <div>
      <div style={{ width: "350px", margin: "auto" }}>
        <button
          className="btn btn-danger mt-5 mb-5"
          onClick={zoomout}
          style={{ marginRight: "10px" }}
        >
          -
        </button>
        {/* style={{ marginLeft: "5px", marginRight: "5px" }} */}
        <progress id="file" max="100" value={progressTree}></progress>{" "}
        {progressTree}%
        <button
          className="btn btn-primary mt-5 mb-5"
          onClick={zoomIn}
          style={{ marginLeft: "10px" }}
        >
          +
        </button>
      </div>
      <div
        className="tree"
        style={{
          overflow: "auto",
          whiteSpace: "nowrap",
          paddingBottom: "100px",
        }}
      >
        <ul id="orgtreeul" style={{ width: treeWidth, zoom: zoomTree }}>
          <li>
            <a href="#">Parent</a>
            <Org
              tobj={post.child}
              twidth={treeWidth}
              hwidth={handleWidth}
            ></Org>
            {/* <ul>
              <li>
                <a href="#">Child</a>
                <ul>
                  <li>
                    <a href="#">Grand Child</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Child</a>
                <ul>
                  <li>
                    <a href="#">Grand Child</a>
                  </li>
                  <li>
                    <a href="#">Grand Child</a>
                    <ul>
                      <li>
                        <a href="#">Great Grand Child</a>
                      </li>
                      <li>
                        <a href="#">Great Grand Child</a>
                      </li>
                      <li>
                        <a href="#">Great Grand Child</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#ram" id="ram1">
                      Grand Child
                    </a>
                  </li>
                </ul>
              </li>
            </ul> */}
          </li>
        </ul>
      </div>
    </div>
  );
}
