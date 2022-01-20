import React, { useEffect, useState } from "react";
import Org from "./Treenode";

let eleArr = [];
let allEle = [];
export default function Treenode(props) {
  const [showTreeNode, setShowTreeNode] = useState("");
  let treeWidth = 0;
  useEffect(() => {
    // console.log("All Elements:" + allEle);
    console.log("Show Elements:" + eleArr);
    for (let i = 0; i < allEle.length; i++) {
      var showNode = document.querySelector("." + allEle[i]);
      if (showNode) showNode.style.display = "none";
    }

    let nodesLength;
    for (let i = 0; i < eleArr.length; i++) {
      // alert("I am here");
      var showNode = document.querySelector("." + eleArr[i]);
      if (showNode) showNode.style.display = "";
      if (showNode)
        nodesLength = document.querySelectorAll("." + eleArr[i] + " li").length;
      console.log("NodesLength:" + nodesLength);
    }

    treeWidth =
      document.querySelector(".undefined").scrollWidth + nodesLength * 300;
    document.querySelector("#orgtreeul").style.width = treeWidth + "px";
  });
  if (props.tobj.length == 0) {
    return <></>;
  }

  function toggleTreeNode(event) {
    if (event.target.id) {
      if (event.target.checked) {
        eleArr.push(event.target.id);
      } else {
        var index = eleArr.indexOf(event.target.id);
        if (index !== -1) {
          eleArr.splice(index, 1);
        }
      }
    }
    setShowTreeNode(eleArr.length);

    console.log(eleArr);
  }

  let i = 0;
  const li = props.tobj.map((ch) => {
    if (ch.id) allEle.push(ch.id);
    return (
      <li key={i++}>
        <a href="#">
          <div className="orgTreecard" title={ch.role}>
            <div className="orgTreeheader">
              <img
                src={ch.imgurl ? ch.imgurl : "#"}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50px",
                }}
              />
              <h3 class="mt-3">{ch.name}</h3>
            </div>

            <div className="container">
              <h5 className="treeNodeDetails">
                <b>Role: </b>
                {ch.role}
              </h5>
              <h5 className="treeNodeDetails">
                <b>Exp: </b>
                {ch.exp}
              </h5>
              <div className="form-check form-switch">
                <input
                  className="form-check-input treeShowContact"
                  type="checkbox"
                  role="switch"
                  onClick={toggleTreeNode}
                  id={ch.id}
                />
                <label
                  className="form-check-label "
                  htmlFor={ch.id}
                  style={{ marginLeft: "10px" }}
                >
                  <h5> Show Contacts</h5>
                </label>
              </div>
            </div>
          </div>
        </a>
        <Org tobj={ch.child} id={ch.id}></Org>
      </li>
    );
  });
  //   const li = JSON.stringify(props.tobj);
  return (
    <>
      <ul className={`nested ${props.id}`}>{li}</ul>
    </>
  );
}
