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
  let treeWidth = 1500;
  const [zoomTree, setzoomTree] = useState(0.4);
  const [progressTree, setprogressTree] = useState(5);
  const handleWidth = null;

  const zoomIn = () => {
    setzoomTree(zoomTree + 0.1);
    setprogressTree(progressTree + 5);
  };

  const zoomout = () => {
    setzoomTree(zoomTree - 0.1);
    setprogressTree(progressTree - 5);
  };
  
  const baseURL = "http://localhost:4000/posts/1";
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
      // console.log("From Carousels.js Response Data : " + response.data);

      // var a = document.querySelectorAll(".tree a");
      // var lastNodes = 0;
      // for (let i = 0; i < a.length; i++) {
      //   console.log("display:--" + a[i].style.display);
      //   if (!a[i].nextSibling) lastNodes++;
      // }
      // console.log(lastNodes);
      // treeWidth = 300 * lastNodes;
      // document.querySelector("#orgtreeul").style.width = treeWidth + "px";

      //set scroll in the middle
      var outerContent = document.querySelector("#treeStart");
      var innerContent = document.querySelector("#orgtreeul");

      outerContent.scrollLeft = outerContent.scrollWidth / 3;

      // scroll using mouse drag drop
      const ele = document.getElementById("treeStart");
      ele.style.cursor = "grab";

      let pos = { top: 0, left: 0, x: 0, y: 0 };

      const mouseDownHandler = function (e) {
        ele.style.cursor = "grabbing";
        ele.style.userSelect = "none";

        pos = {
          left: ele.scrollLeft,
          top: ele.scrollTop,
          // Get the current mouse position
          x: e.clientX,
          y: e.clientY,
        };

        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
      };

      const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
      };

      const mouseUpHandler = function () {
        ele.style.cursor = "grab";
        ele.style.removeProperty("user-select");

        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      };

      // Attach the handler
      ele.addEventListener("mousedown", mouseDownHandler);

      // show hide childs

      // var toggler = document.querySelector("#treeStart");
      // toggler.onclick = function (event) {
      //   // if (this.checked == true) {
      //   // console.log("I am checked" + event.target);
      //   if ((event.target.type = "checkbox"))
      //     event.target.parentElement.parentElement.parentElement.parentElement.nextSibling.style.display =
      //       event.target.checked ? "" : "none";

      //   // }
      // };

      //useeffect end
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
    <div className="treeOrgContain">
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
        id="treeStart"
        style={{
          scrollSnapAlign: "center",
          overflow: "auto",
          whiteSpace: "nowrap",
          paddingBottom: "100px",
        }}
      >
        <ul
          id="orgtreeul"
          style={{ width: treeWidth, zoom: zoomTree, margin: "auto" }}
        >
          <li>
            <a href="#">
              <div className="orgTreecard">
                <h1 className="treeParent">
                  <b>
                    <span style={{ color: "#3058a5" }}>Join</span>
                    <span style={{ color: "#50a0c9" }}>Path</span>{" "}
                  </b>
                </h1>
              </div>
            </a>
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
